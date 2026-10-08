"use client";
import type { ReactNode } from "react";
import { OPTIONS, type IntakeAnswers, type StepId } from "@/lib/intake/schema";
import type { Dictionary } from "@/i18n";
import { Chips } from "./Chips";

type Field = keyof IntakeAnswers;
type Answers = Partial<IntakeAnswers>;
export type FieldErrors = Partial<Record<Field, "required" | "invalid">>;
type Dict = Dictionary["intake"];
type OptionField = keyof Dict["options"];

const MULTI = new Set<Field>(["tasks", "websiteNeeds", "tools", "channels"]);

type TextSpec = { type: "text" | "email" | "tel" | "url"; autoComplete: string; inputMode?: "url" | "email" | "tel" };
const TEXT: Partial<Record<Field, TextSpec>> = {
  businessName: { type: "text", autoComplete: "organization" },
  website: { type: "url", autoComplete: "url", inputMode: "url" },
  name: { type: "text", autoComplete: "name" },
  email: { type: "email", autoComplete: "email", inputMode: "email" },
  phone: { type: "tel", autoComplete: "tel", inputMode: "tel" },
};

export const fieldId = (f: Field) => `intake-${f}`;
const labelId = (f: Field) => `intake-${f}-label`;
const errorId = (f: Field) => `intake-${f}-error`;
const hintId = (f: Field) => `intake-${f}-hint`;

export function visibleFields(fields: readonly Field[], a: Answers): Field[] {
  return fields.filter((f) => a.goal === "website" || (f !== "websiteState" && f !== "websiteNeeds"));
}

type Props = {
  step: StepId;
  fields: readonly Field[];
  answers: Answers;
  errors: FieldErrors;
  dict: Dict;
  headingId: string;
  set: (f: Field, v: unknown) => void;
};

export function StepFields({ step, fields, answers, errors, dict, headingId, set }: Props) {
  const labels = dict.steps[step] as Record<string, string>;
  const hints: Partial<Record<Field, string>> = { budget: dict.whyBudget, phone: dict.whyPhone };
  const shown = visibleFields(fields, answers);

  function message(f: Field): string {
    if (errors[f] !== "invalid") return dict.required;
    if (f === "email") return dict.invalidEmail;
    if (f === "website") return dict.invalidWebsite;
    return dict.required;
  }

  function control(f: Field, describedBy: string | undefined, invalid: boolean, lblId: string): ReactNode {
    if (f in OPTIONS) {
      const labelsFor = dict.options[f as OptionField] as Record<string, string>;
      const options = (OPTIONS[f as keyof typeof OPTIONS] as readonly string[]).map((value) => ({ value, label: labelsFor[value] }));
      const common = { id: fieldId(f), labelId: lblId, options, describedBy, invalid };
      return MULTI.has(f) ? (
        <Chips {...common} multiple value={(answers[f] as string[] | undefined) ?? []} onChange={(v) => set(f, v)} />
      ) : (
        <Chips {...common} value={answers[f] as string | undefined} onChange={(v) => set(f, v)} />
      );
    }
    const base = {
      id: fieldId(f),
      name: f,
      value: (answers[f] as string | undefined) ?? "",
      "aria-describedby": describedBy,
      "aria-invalid": invalid || undefined,
      className:
        "mt-3 block w-full rounded-2xl border bg-bg-card px-4 py-3 text-base text-text placeholder:text-text-secondary/60 transition-colors focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
        (invalid ? "border-danger" : "border-border-hover"),
    };
    if (f === "notes") {
      return <textarea {...base} rows={4} maxLength={2000} onChange={(e) => set(f, e.target.value)} />;
    }
    const spec = TEXT[f]!;
    return (
      <input
        {...base}
        type={spec.type}
        autoComplete={spec.autoComplete}
        inputMode={spec.inputMode}
        autoCapitalize={spec.type === "text" ? "words" : "off"}
        spellCheck={spec.type === "text"}
        className={`${base.className} min-h-[52px]`}
        onChange={(e) => set(f, e.target.value)}
      />
    );
  }

  return (
    <div className="space-y-9">
      {shown.map((f) => {
        const isGoal = f === "goal";
        const lblId = isGoal ? headingId : labelId(f);
        const invalid = Boolean(errors[f]);
        const describedBy = [hints[f] ? hintId(f) : "", invalid ? errorId(f) : ""].filter(Boolean).join(" ") || undefined;
        const isChoice = f in OPTIONS;
        return (
          <div key={f}>
            {!isGoal &&
              (isChoice ? (
                <p id={lblId} className="mb-3 text-base font-medium text-text">{labels[f]}</p>
              ) : (
                <label id={lblId} htmlFor={fieldId(f)} className="block text-base font-medium text-text">{labels[f]}</label>
              ))}
            {hints[f] && (
              <p id={hintId(f)} className={`text-sm leading-relaxed text-text-secondary ${isChoice ? "-mt-1.5 mb-3" : "mt-1"}`}>
                {hints[f]}
              </p>
            )}
            {control(f, describedBy, invalid, lblId)}
            {invalid && (
              <p id={errorId(f)} className="mt-2 text-sm font-medium text-danger">
                {message(f)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
