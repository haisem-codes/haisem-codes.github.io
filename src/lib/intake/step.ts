import type { IntakeAnswers, StepId } from "./schema";
import { validateStep } from "./validate";

type Field = keyof IntakeAnswers;
type Answers = Partial<IntakeAnswers>;
export type FieldErrors = Partial<Record<Field, "required" | "invalid">>;

export function visibleFields(fields: readonly Field[], a: Answers): Field[] {
  return fields.filter((f) => a.goal === "website" || (f !== "websiteState" && f !== "websiteNeeds"));
}

/** Errors for the fields shown on this step, and the first of them in on-screen order (where focus goes). */
export function stepIssues(step: StepId, fields: readonly Field[], a: Answers): { errors: FieldErrors; first: Field | null } {
  const found = validateStep(step, a);
  const shown = visibleFields(fields, a).filter((f) => found[f]);
  return { errors: Object.fromEntries(shown.map((f) => [f, found[f]])) as FieldErrors, first: shown[0] ?? null };
}
