import { test, expect, describe } from "vitest";
import { STEPS, type StepId } from "@/lib/intake/schema";
import { stepIssues, visibleFields } from "@/lib/intake/step";

const fields = (id: StepId) => STEPS.find((s) => s.id === id)!.fields;

describe("visibleFields", () => {
  test("hides the website branch unless the goal is a website", () => {
    expect(visibleFields(fields("time"), { goal: "missed_calls" })).toEqual(["tasks", "hours", "enquiries"]);
    expect(visibleFields(fields("time"), { goal: "website" })).toEqual(["tasks", "hours", "enquiries", "websiteState", "websiteNeeds"]);
  });
});

describe("stepIssues", () => {
  test("an empty first step points at the goal", () => {
    expect(stepIssues("goal", fields("goal"), {})).toEqual({ errors: { goal: "required" }, first: "goal" });
  });

  test("a complete step has no issues", () => {
    expect(stepIssues("goal", fields("goal"), { goal: "website" })).toEqual({ errors: {}, first: null });
  });

  test("first follows the on-screen field order", () => {
    const r = stepIssues("business", fields("business"), { website: "not a url", teamSize: "solo" });
    expect(r.first).toBe("businessName");
    expect(r.errors).toEqual({ businessName: "required", website: "invalid", industry: "required" });
  });

  test("an invalid optional field still blocks the step", () => {
    const r = stepIssues("business", fields("business"), { businessName: "Klinik", website: "nope", industry: "other", teamSize: "solo" });
    expect(r).toEqual({ errors: { website: "invalid" }, first: "website" });
  });

  test("hidden branch fields never block", () => {
    const base = { tasks: ["calls" as const], hours: "lt2" as const };
    expect(stepIssues("time", fields("time"), { ...base, goal: "admin_time" }).first).toBeNull();
    expect(stepIssues("time", fields("time"), { ...base, goal: "website" })).toEqual({ errors: { websiteState: "required" }, first: "websiteState" });
  });

  test("blank text counts as missing on the contact step", () => {
    const r = stepIssues("contact", fields("contact"), { name: "  ", email: "anna@example.se", callLang: "sv" });
    expect(r).toEqual({ errors: { name: "required" }, first: "name" });
  });
});
