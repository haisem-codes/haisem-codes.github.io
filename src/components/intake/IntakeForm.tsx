"use client";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { OPTIONS, STEPS, type IntakeAnswers } from "@/lib/intake/schema";
import { validateIntake, validateStep } from "@/lib/intake/validate";
import { buildMailtoSummary } from "@/lib/intake/mailto";
import { track } from "@/lib/analytics";
import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { StepFields, fieldId, visibleFields, type FieldErrors } from "./StepFields";

type Answers = Partial<IntakeAnswers>;
type Status = "idle" | "sending" | "error" | "offline" | "done";

const STORAGE_KEY = "intake";
const EMAIL = "haisem.work@gmail.com";
const INTAKE_URL = process.env.NEXT_PUBLIC_INTAKE_URL;
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TOKEN_TIMEOUT_MS = 10_000;

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window { turnstile?: Turnstile }
}

function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return new Promise((resolve, reject) => {
    let s = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!s) {
      s = document.createElement("script");
      s.src = TURNSTILE_SRC;
      s.async = true;
      document.head.appendChild(s);
    }
    s.addEventListener("load", () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile missing"))));
    s.addEventListener("error", () => {
      s?.remove();
      reject(new Error("turnstile script failed to load"));
    });
  });
}

const MULTI: ReadonlySet<string> = new Set(["tasks", "websiteNeeds", "tools", "channels"]);
const TEXT_KEYS: ReadonlySet<string> = new Set(["businessName", "website", "name", "email", "phone", "notes"]);

function sanitize(raw: unknown): Answers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (TEXT_KEYS.has(k)) {
      if (typeof v === "string") out[k] = v;
      continue;
    }
    if (k === "lang" || !(k in OPTIONS)) continue;
    const allowed = OPTIONS[k as keyof typeof OPTIONS] as readonly string[];
    if (MULTI.has(k)) {
      if (Array.isArray(v)) out[k] = [...new Set(v.filter((x): x is string => typeof x === "string" && allowed.includes(x)))];
    } else if (typeof v === "string" && allowed.includes(v)) {
      out[k] = v;
    }
  }
  return out as Answers;
}

function withoutHiddenBranch(a: Answers): Answers {
  if (a.goal === "website") return a;
  const { websiteState: _s, websiteNeeds: _n, ...rest } = a;
  return rest;
}

export function IntakeForm({ dict, lang }: { dict: Dictionary["intake"]; lang: Locale }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [mailto, setMailto] = useState("");
  const [restored, setRestored] = useState(false);
  const navigated = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef("");
  const turnstileFailed = useRef(false);
  const tokenWaiters = useRef<((t: string) => void)[]>([]);
  const pendingFocus = useRef<keyof IntakeAnswers | null>(null);
  const lenis = useLenis();

  const total = STEPS.length;
  const current = STEPS[step];
  const isLast = step === total - 1;
  const headingId = `intake-step-${current.id}`;

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as { answers?: Answers; step?: number } | null;
      setAnswers(sanitize(saved?.answers));
      if (Number.isInteger(saved?.step) && saved!.step! >= 0 && saved!.step! < STEPS.length) setStep(saved!.step!);
    } catch {}
    setRestored(true);
    track("intake_opened");
  }, []);

  useEffect(() => {
    if (!restored || status === "done") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step }));
    } catch {}
  }, [answers, step, restored, status]);

  useEffect(() => {
    if (restored) track(`intake_step_${step + 1}`);
  }, [step, restored]);

  const scrollToForm = useCallback(() => {
    const el = rootRef.current;
    if (!el || el.getBoundingClientRect().top >= 0) return;
    if (lenis) lenis.scrollTo(el, { offset: -112, immediate: true });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 112 });
  }, [lenis]);

  useEffect(() => {
    if (!navigated.current) return;
    headingRef.current?.focus({ preventScroll: true });
    scrollToForm();
  }, [step, status, scrollToForm]);

  const done = status === "done";
  useEffect(() => {
    if (!TURNSTILE_KEY || current.id !== "contact" || done) return;
    let cancelled = false;
    const settle = (t: string) => {
      token.current = t;
      const waiters = tokenWaiters.current;
      tokenWaiters.current = [];
      waiters.forEach((w) => w(t));
    };
    turnstileFailed.current = false;
    loadTurnstile()
      .then((ts) => {
        if (cancelled || !turnstileRef.current) return;
        widgetId.current = ts.render(turnstileRef.current, {
          sitekey: TURNSTILE_KEY,
          appearance: "interaction-only",
          callback: (t: string) => settle(t),
          "expired-callback": () => (token.current = ""),
          "error-callback": () => (token.current = ""),
        });
      })
      .catch(() => {
        if (cancelled) return;
        turnstileFailed.current = true;
        settle("");
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      token.current = "";
    };
  }, [current.id, done]);

  function waitForToken(): Promise<string> {
    if (token.current || turnstileFailed.current) return Promise.resolve(token.current);
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        tokenWaiters.current = tokenWaiters.current.filter((w) => w !== onToken);
        resolve("");
      }, TOKEN_TIMEOUT_MS);
      const onToken = (t: string) => {
        clearTimeout(timer);
        resolve(t);
      };
      tokenWaiters.current.push(onToken);
    });
  }

  useEffect(() => {
    const f = pendingFocus.current;
    pendingFocus.current = null;
    if (!f) return;
    const el = document.getElementById(fieldId(f));
    const target = el?.matches("input, textarea") ? el : el?.querySelector<HTMLElement>('[tabindex="0"]');
    target?.focus();
  }, [errors]);

  function set(f: keyof IntakeAnswers, v: unknown) {
    setAnswers((a) => ({ ...a, [f]: v }));
    if (errors[f]) setErrors(({ [f]: _, ...rest }) => rest);
    if (status === "error" || status === "offline") setStatus("idle");
  }

  function goTo(i: number) {
    navigated.current = true;
    setErrors({});
    setStep(i);
  }

  async function submit() {
    const result = validateIntake({ ...withoutHiddenBranch(answers), lang, company_url_hp: honeypot });
    if (!result.ok) {
      if (result.errors.company_url_hp) {
        navigated.current = true;
        setStatus("done");
        return;
      }
      const at = STEPS.findIndex((s) => s.fields.some((f) => result.errors[f]));
      if (at === -1) return;
      navigated.current = true;
      pendingFocus.current = STEPS[at].fields.find((f) => result.errors[f]) ?? null;
      setStep(at);
      setErrors(result.errors);
      return;
    }
    if (!INTAKE_URL) {
      if (process.env.NODE_ENV === "development") {
        console.info("[intake] dry mode payload", result.value);
        finish();
      } else {
        const subject = `${dict.title}: ${result.value.businessName}`;
        setMailto(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailtoSummary(result.value, dict))}`);
        track("intake_offline");
        setStatus("offline");
      }
      return;
    }
    setStatus("sending");
    try {
      const turnstileToken = TURNSTILE_KEY ? await waitForToken() : "";
      if (TURNSTILE_KEY && !turnstileToken) throw new Error("turnstile");
      token.current = "";
      const res = await fetch(INTAKE_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: result.value, turnstileToken }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("intake_submitted");
      finish();
    } catch {
      track("intake_failed");
      setStatus("error");
      token.current = "";
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    }
  }

  function finish() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    navigated.current = true;
    setStatus("done");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validateStep(current.id, answers);
    const stepErrors = Object.fromEntries(
      visibleFields(current.fields, answers).filter((f) => found[f]).map((f) => [f, found[f]]),
    ) as FieldErrors;
    const first = visibleFields(current.fields, answers).find((f) => stepErrors[f]);
    if (first) {
      pendingFocus.current = first;
      setErrors(stepErrors);
      return;
    }
    if (isLast) void submit();
    else goTo(step + 1);
  }

  const progress = status === "done" ? 100 : 10 + (90 * step) / total;
  const stepLabel = dict.step.replace("{n}", String(step + 1)).replace("{total}", String(total));

  if (status === "done") {
    return (
      <div ref={rootRef} className="rounded-[2rem] border border-border bg-bg-card px-6 py-12 sm:px-12 sm:py-16" aria-live="polite">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-white" aria-hidden>✓</div>
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-3xl font-semibold tracking-tight text-text outline-none sm:text-4xl">
          {dict.successTitle}
        </h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-text-secondary">{dict.successBody}</p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="rounded-[2rem] border border-border bg-bg-card px-5 py-8 sm:px-12 sm:py-12">
      <div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
        <span aria-live="polite">{stepLabel}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border" aria-hidden>
        <div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out motion-reduce:transition-none" style={{ width: `${progress}%` }} />
      </div>

      <form noValidate onSubmit={onSubmit} aria-labelledby={headingId} className="mt-8">
        <motion.div
          key={step}
          data-reveal
          initial={navigated.current ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h2
            id={headingId}
            ref={headingRef}
            tabIndex={-1}
            className="mb-8 font-display text-2xl leading-tight font-semibold tracking-tight text-balance text-text outline-none sm:text-3xl"
          >
            {dict.steps[current.id].q}
          </h2>
          <StepFields step={current.id} fields={current.fields} answers={answers} errors={errors} dict={dict} headingId={headingId} set={set} />

          {isLast && (
            <>
              <div className="sr-only" aria-hidden>
                <label htmlFor="company_url_hp">Company URL</label>
                <input id="company_url_hp" name="company_url_hp" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>
              {TURNSTILE_KEY && <div ref={turnstileRef} className="mt-6" />}
              <p className="mt-9 text-sm leading-relaxed text-text-secondary">
                {dict.privacy}{" "}
                <a
                  href={localHref(lang, "/privacy/")}
                  className="font-medium text-text underline decoration-border-hover underline-offset-4 hover:decoration-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {dict.privacyLink}
                </a>
              </p>
            </>
          )}
        </motion.div>

        {status === "error" && (
          <p role="alert" className="mt-6 rounded-2xl border border-danger/40 px-4 py-3 text-base text-text">
            {dict.error}{" "}
            <a href={`mailto:${EMAIL}`} className="font-medium text-accent underline underline-offset-4">{EMAIL}</a>
          </p>
        )}

        {status === "offline" && (
          <div role="status" className="mt-6 rounded-2xl border border-border px-5 py-5">
            <p className="font-display text-lg font-semibold text-text">{dict.offlineTitle}</p>
            <p className="mt-2 text-base leading-relaxed text-text-secondary">{dict.offlineBody}</p>
            <a
              href={mailto}
              className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-accent px-6 text-base font-medium text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.offlineButton}
              <span aria-hidden>→</span>
            </a>
          </div>
        )}

        <div className="mt-10 flex flex-row-reverse items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-accent px-8 text-base font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-70"
          >
            {status === "sending" ? dict.sending : isLast ? dict.submit : dict.next}
            {status !== "sending" && <span aria-hidden>→</span>}
          </button>
          {step > 0 && (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-base font-medium text-text-secondary transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span aria-hidden>←</span>
              {dict.back}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
