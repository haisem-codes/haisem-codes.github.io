import { OPTIONS, STEPS, requiredFor, type IntakeAnswers, type StepId } from "./schema";

type Field = keyof IntakeAnswers;
type Errors = Partial<Record<Field, "required" | "invalid">>;
type Clean = Partial<Record<Field, unknown>>;

const MULTI: ReadonlySet<Field> = new Set<Field>(["tasks", "websiteNeeds", "tools", "channels"]);
const TEXT_MAX: Partial<Record<Field, number>> = { businessName: 120, website: 200, name: 100, email: 200, phone: 40, notes: 2000 };
const KEYS: readonly Field[] = [...STEPS.flatMap((s) => s.fields), "lang"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HOST = /^([a-z0-9-]+\.)+[a-z]{2,}$/i;

function normalize(raw: unknown, multi: boolean): unknown {
  if (raw === null || raw === undefined) return undefined;
  if (typeof raw === "string") {
    const t = raw.trim();
    return t === "" ? undefined : t;
  }
  if (multi && Array.isArray(raw)) return [...new Set(raw)];
  return raw;
}

function validWebsite(v: string): boolean {
  if (v.length > TEXT_MAX.website!) return false;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return false;
  }
  return (url.protocol === "https:" || url.protocol === "http:") && HOST.test(url.hostname);
}

function check(k: Field, v: unknown, required: boolean): "required" | "invalid" | null {
  if (v === undefined || (Array.isArray(v) && v.length === 0)) return required ? "required" : null;
  if (MULTI.has(k)) {
    const allowed = OPTIONS[k as keyof typeof OPTIONS] as readonly string[];
    const ok = Array.isArray(v) && v.length <= allowed.length && v.every((x) => typeof x === "string" && allowed.includes(x));
    return ok ? null : "invalid";
  }
  if (k in OPTIONS) {
    const allowed = OPTIONS[k as keyof typeof OPTIONS] as readonly string[];
    return typeof v === "string" && allowed.includes(v) ? null : "invalid";
  }
  if (typeof v !== "string" || v.length > (TEXT_MAX[k] ?? 200)) return "invalid";
  if (k === "email" && !EMAIL.test(v)) return "invalid";
  if (k === "website" && !validWebsite(v)) return "invalid";
  return null;
}

function cleanAll(input: Record<string, unknown>): Clean {
  const out: Clean = {};
  for (const k of KEYS) out[k] = normalize(input[k], MULTI.has(k));
  return out;
}

function errorsFor(c: Clean, fields: readonly Field[], req: ReadonlySet<Field>): Errors {
  const errors: Errors = {};
  for (const k of fields) {
    const e = check(k, c[k], req.has(k));
    if (e) errors[k] = e;
  }
  return errors;
}

export function validateStep(step: StepId, a: Partial<IntakeAnswers>): Errors {
  const c = cleanAll(a as Record<string, unknown>);
  const req = new Set(requiredFor(c as Partial<IntakeAnswers>));
  return errorsFor(c, STEPS.find((s) => s.id === step)!.fields, req);
}

function toValue(c: Clean): IntakeAnswers {
  return {
    goal: c.goal,
    businessName: c.businessName ?? "",
    website: c.website ?? "",
    industry: c.industry,
    teamSize: c.teamSize,
    tasks: c.tasks ?? [],
    hours: c.hours,
    enquiries: c.enquiries,
    websiteState: c.websiteState,
    websiteNeeds: c.websiteNeeds ?? [],
    tools: c.tools ?? [],
    channels: c.channels ?? [],
    budget: c.budget,
    timeline: c.timeline,
    decision: c.decision,
    sensitive: c.sensitive,
    name: c.name ?? "",
    email: c.email ?? "",
    phone: c.phone ?? "",
    callLang: c.callLang,
    notes: c.notes ?? "",
    lang: c.lang,
    company_url_hp: "",
  } as IntakeAnswers;
}

export function validateIntake(input: unknown):
  | { ok: true; value: IntakeAnswers }
  | { ok: false; errors: Errors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, errors: {} };
  const raw = input as Record<string, unknown>;
  if (raw.company_url_hp !== undefined && raw.company_url_hp !== "") {
    return { ok: false, errors: { company_url_hp: "invalid" } };
  }
  const c = cleanAll(raw);
  const req = new Set<Field>(requiredFor(c as Partial<IntakeAnswers>));
  const errors = errorsFor(c, [...STEPS.flatMap((s) => s.fields), "lang"], req);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: toValue(c) };
}
