"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { readTier } from "@/lib/capability";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n";

const PICK = 1;
const TILT = 8;
/** A replay fades the finished chat out, then shows an empty screen briefly before the first message. */
const FADE_MS = 250;
const EMPTY_MS = 450;
/** ms after the screen empties at which each step is reached: ask, typing, offer, slots, pick-slot, pick-msg, typing, booked, crm */
const TIMELINE = [EMPTY_MS, 1050, 1950, 2400, 3350, 3850, 4350, 5250, 5850];
const FINAL = TIMELINE.length;
/** The finished chat (and the SSR frame) stays up this long before the next replay. */
const HOLD_MS = 6500;
const LOOP_MS = FADE_MS + TIMELINE[TIMELINE.length - 1] + HOLD_MS;

export function DemoPhone({ dict, autoplay }: { dict: Dictionary["demoPhone"]; autoplay: boolean }) {
  const [step, setStep] = useState(FINAL);
  const [fading, setFading] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const phone = phoneRef.current;
    if (!root || !phone || readTier() === "static") return;

    let timers: ReturnType<typeof setTimeout>[] = [];
    const stop = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setFading(false);
    };
    const cycle = () => {
      stop();
      setFading(true);
      timers.push(
        setTimeout(() => {
          setStep(0);
          setFading(false);
        }, FADE_MS),
      );
      TIMELINE.forEach((at, i) => timers.push(setTimeout(() => setStep(i + 1), FADE_MS + at)));
      timers.push(setTimeout(cycle, LOOP_MS));
    };
    let held = false;
    const start = () => {
      if (held) return cycle();
      held = true;
      stop();
      timers.push(setTimeout(cycle, HOLD_MS));
    };
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      if (!autoplay) return;
      if (e.isIntersecting) start();
      else stop();
    });
    io.observe(root);

    const onVisibility = () => {
      if (!autoplay) return;
      if (document.hidden) stop();
      else if (inView.current) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      phone.style.setProperty("--ry", `${cx.toFixed(2)}deg`);
      phone.style.setProperty("--rx", `${cy.toFixed(2)}deg`);
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.02 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!inView.current) return;
      tx = (e.clientX / innerWidth - 0.5) * 2 * TILT;
      ty = -(e.clientY / innerHeight - 0.5) * 2 * TILT;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const fine = matchMedia("(pointer: fine)").matches;
    if (fine) addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, [autoplay]);

  const at = (n: number) => step >= n;

  return (
    <figure ref={rootRef} aria-label={dict.ariaLabel} className="relative mx-auto w-[min(340px,84vw)]">
      <div
        ref={phoneRef}
        className="relative rounded-[42px] border border-[#3A3E46] bg-[#2A2D33] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.06),0_50px_90px_-30px_rgba(3,105,161,0.28),0_30px_60px_-34px_rgba(10,10,11,0.35)] dark:border-[#1F2226] dark:bg-[#050506] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_50px_90px_-30px_rgba(56,189,248,0.35)]"
        style={{
          transform: "perspective(1200px) rotateY(calc(-14deg + var(--ry, 0deg))) rotateX(calc(6deg + var(--rx, 0deg)))",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="flex h-[520px] flex-col rounded-[32px] bg-bg-card px-4 pt-3 pb-4 text-[13.5px] text-text"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span aria-hidden className="mx-auto mb-4 h-[22px] w-[84px] shrink-0 rounded-full bg-[#050506]" />
          <div className="mb-1 flex shrink-0 items-center justify-between font-mono text-[11px] tracking-[0.08em] uppercase">
            <span className="text-text-secondary">
              {dict.business} · {dict.demoLabel}
            </span>
            <span className="flex items-center gap-1.5 text-live">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-live shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-live)_18%,transparent)]" />
              {dict.liveLabel}
            </span>
          </div>

          {/* bottom-anchored like a real chat; the top fade keeps any overflow from showing as a cut-off bubble */}
          <div
            className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden transition-opacity duration-[var(--dur-ui)] ease-[var(--ease-silk)] [mask-image:linear-gradient(to_bottom,transparent,black_40px)]"
            style={{ transform: "translateZ(20px)", opacity: fading ? 0 : 1 }}
          >
            <Chat dict={dict} step={step} />
          </div>

          <div aria-hidden className="mt-3 flex h-10 shrink-0 items-center justify-between rounded-full border border-border-hover pr-1.5 pl-4">
            <span className="h-1.5 w-24 rounded-full bg-border-hover" />
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-button text-button-text">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* CRM card breaks out of the frame, as in the style tile */}
        <div
          className="absolute right-6 -bottom-9 -left-3 rounded-[14px] border border-border-hover bg-bg-card p-3 shadow-[0_24px_40px_-14px_rgba(10,10,11,0.35)] transition-[opacity,transform] duration-[var(--dur-ui)] ease-[var(--ease-silk)] sm:-left-7 dark:bg-[#0D0E10] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]"
          style={{
            opacity: at(9) && !fading ? 1 : 0,
            transform: at(9) ? "translateZ(40px)" : "translateZ(0) translateY(14px)",
          }}
        >
          <p className="mb-1.5 font-mono text-[11px] tracking-[0.08em] text-accent uppercase">{dict.crm.title}</p>
          <dl className="text-xs">
            <Row k={dict.crm.status} v={dict.crm.statusValue} />
            <Row k={dict.crm.reply} v={dict.crm.replyValue} />
            <Row k={dict.crm.summary} v={dict.crm.summaryValue} />
          </dl>
        </div>
      </div>
    </figure>
  );
}

function Chat({ dict, step }: { dict: Dictionary["demoPhone"]; step: number }) {
  const at = (n: number) => step >= n;
  const m = dict.messages;
  return (
    <>
      <Reveal on={at(1)} className="flex justify-end">
        <Bubble me>{m.ask}</Bubble>
      </Reveal>
      <Reveal on={step === 2}>
        <Typing />
      </Reveal>
      <Reveal on={at(3)}>
        <Bubble>{m.offer}</Bubble>
      </Reveal>
      <Reveal on={at(4)} className="flex gap-1.5">
        {dict.slots.map((s, i) => (
          <span
            key={s}
            className={cn(
              "rounded-full border px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors duration-[var(--dur-ui)] ease-[var(--ease-silk)]",
              i === PICK && at(5) ? "border-live bg-live text-white dark:text-[#1A1205]" : "border-border-hover text-text-secondary",
            )}
          >
            {s}
          </span>
        ))}
      </Reveal>
      <Reveal on={at(6)} className="flex justify-end">
        <Bubble me>{m.pick}</Bubble>
      </Reveal>
      <Reveal on={step === 7}>
        <Typing />
      </Reveal>
      <Reveal on={at(8)}>
        <Bubble>{m.booked}</Bubble>
      </Reveal>
    </>
  );
}

/** Collapses while hidden so the chat grows from the bottom instead of leaving blank rows. */
function Reveal({ on, className, children }: { on: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className="grid transition-[grid-template-rows,opacity,translate] duration-[var(--dur-ui)] ease-[var(--ease-silk)]"
      style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0, translate: on ? "0 0" : "0 8px" }}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn("pt-2.5", className)}>{children}</div>
      </div>
    </div>
  );
}

function Bubble({ me, children }: { me?: boolean; children: ReactNode }) {
  return (
    <p
      className={cn(
        "w-fit max-w-[86%] rounded-2xl px-[13px] py-2.5 leading-[1.4] text-pretty",
        me ? "rounded-br-[4px] bg-button text-button-text" : "rounded-bl-[4px] bg-[#EEF1F5] text-text dark:bg-[#1D1F23]",
      )}
    >
      {children}
    </p>
  );
}

function Typing() {
  return (
    <span
      aria-hidden
      className="flex w-fit gap-1 rounded-2xl rounded-bl-[4px] bg-[#EEF1F5] px-3.5 py-3 dark:bg-[#1D1F23]"
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="demo-dot h-1.5 w-1.5 rounded-full bg-text-secondary" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 py-[3px]">
      <dt className="text-text-secondary">{k}</dt>
      <dd className="font-medium text-text">{v}</dd>
    </div>
  );
}
