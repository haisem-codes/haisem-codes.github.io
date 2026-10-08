import { OPTIONS, STEPS, requiredFor, type IntakeAnswers, type StepId } from "./schema";

type Errors = Partial<Record<keyof IntakeAnswers, "required" | "invalid">>;
const TEXT_MAX: Partial<Record<keyof IntakeAnswers, number>> = { businessName: 120, website: 200, name: 100, email: 200, phone: 40, notes: 2000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isEmpty = (v: unknown) => v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

function checkField(k: keyof IntakeAnswers, v: unknown, required: boolean): "required" | "invalid" | null {
  if (isEmpty(v)) return required ? "required" : null;
  if (k in OPTIONS) {
    const allowed = OPTIONS[k as keyof typeof OPTIONS] as readonly string[];
    const vals = Array.isArray(v) ? v : [v];
    return vals.every((x) => typeof x === "string" && allowed.includes(x)) ? null : "invalid";
  }
  if (typeof v !== "string") return "invalid";
  if (v.length > (TEXT_MAX[k] ?? 200)) return "invalid";
  if (k === "email" && !EMAIL.test(v)) return "invalid";
  if (k === "website" && !/^(https?:\/\/)?[^\s]+\.[^\s]+$/.test(v)) return "invalid";
  return null;
}

export function validateStep(step: StepId, a: Partial<IntakeAnswers>): Errors {
  const req = new Set(requiredFor(a));
  const errors: Errors = {};
  for (const k of STEPS.find((s) => s.id === step)!.fields) {
    const e = checkField(k, a[k], req.has(k));
    if (e) errors[k] = e;
  }
  return errors;
}

export function validateIntake(input: unknown):
  | { ok: true; value: IntakeAnswers }
  | { ok: false; errors: Errors } {
  if (!input || typeof input !== "object") return { ok: false, errors: {} };
  const a = input as Partial<IntakeAnswers>;
  if (a.company_url_hp) return { ok: false, errors: { company_url_hp: "invalid" } };
  const errors: Errors = {};
  for (const s of STEPS) Object.assign(errors, validateStep(s.id, a));
  const langErr = checkField("lang", a.lang, true);
  if (langErr) errors.lang = langErr;
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { websiteNeeds: [], channels: [], phone: "", notes: "", website: "", company_url_hp: "", ...a } as IntakeAnswers };
}
