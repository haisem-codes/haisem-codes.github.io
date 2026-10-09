import { OPTIONS, STEPS, type IntakeAnswers, type StepId } from "./schema";

export const MAILTO_BODY_MAX = 1800;

export type MailtoLabels = {
  steps: Record<StepId, { q: string }>;
  options: { [K in keyof typeof OPTIONS]?: Record<string, string> };
};

export function buildMailtoSummary(a: IntakeAnswers, dict: MailtoLabels): string {
  const lines: string[] = [];
  let notesLabel = "";
  for (const step of STEPS) {
    const labels = dict.steps[step.id] as Record<string, string>;
    for (const f of step.fields) {
      if ((f === "websiteState" || f === "websiteNeeds") && a.goal !== "website") continue;
      const v = a[f];
      const opts = dict.options[f as keyof typeof OPTIONS];
      const text = Array.isArray(v) ? v.map((x) => opts?.[x] ?? x).join(", ") : typeof v === "string" ? (opts?.[v] ?? v) : "";
      if (!text) continue;
      const label = labels[f] ?? labels.q;
      if (f === "notes") notesLabel = label;
      else lines.push(`${label}: ${text}`);
    }
  }
  const body = lines.join("\n");
  if (!notesLabel) return body.slice(0, MAILTO_BODY_MAX);
  const prefix = `${body}\n\n${notesLabel}:\n`;
  const room = MAILTO_BODY_MAX - prefix.length;
  if (room < 2) return body.slice(0, MAILTO_BODY_MAX);
  const notes = a.notes.length > room ? `${a.notes.slice(0, room - 1)}…` : a.notes;
  return prefix + notes;
}
