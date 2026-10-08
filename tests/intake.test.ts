import { test, expect, describe } from "vitest";
import { validateIntake, validateStep } from "@/lib/intake/validate";
import { scoreIntake, buildBrief } from "@/lib/intake/score";
import type { IntakeAnswers } from "@/lib/intake/schema";

const good: IntakeAnswers = {
  goal: "missed_calls", businessName: "Klinik Söder", website: "https://example.se", industry: "clinic_health", teamSize: "6to20",
  tasks: ["calls", "booking"], hours: "10to20", enquiries: "50to200", websiteState: undefined, websiteNeeds: [],
  tools: ["bokadirekt", "google"], channels: ["phone"], budget: "25to50k", timeline: "1m", decision: "me", sensitive: "yes",
  name: "Anna", email: "anna@example.se", phone: "", callLang: "sv", notes: "", lang: "sv", company_url_hp: "",
};

describe("validateIntake", () => {
  test("accepts a complete answer", () => expect(validateIntake(good).ok).toBe(true));
  test("rejects missing required", () => {
    const r = validateIntake({ ...good, email: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBe("required");
  });
  test("rejects bad email", () => {
    const r = validateIntake({ ...good, email: "anna@" });
    expect(!r.ok && r.errors.email).toBe("invalid");
  });
  test("rejects unknown option code", () => {
    const r = validateIntake({ ...good, industry: "casino" });
    expect(!r.ok && r.errors.industry).toBe("invalid");
  });
  test("rejects honeypot", () => expect(validateIntake({ ...good, company_url_hp: "x" }).ok).toBe(false));
  test("website goal requires websiteState", () => {
    const r = validateIntake({ ...good, goal: "website", websiteState: undefined });
    expect(!r.ok && r.errors.websiteState).toBe("required");
  });
  test("caps notes length", () => expect(validateIntake({ ...good, notes: "x".repeat(2001) }).ok).toBe(false));
  test("budget optional", () => expect(validateIntake({ ...good, budget: undefined }).ok).toBe(true));
});

test("validateStep checks only that step", () => {
  expect(validateStep("goal", { goal: "website" })).toEqual({});
  expect(validateStep("contact", { name: "A" })).toEqual({ email: "required", callLang: "required" });
});

describe("scoreIntake", () => {
  test("strong lead is hot", () => {
    const s = scoreIntake(good);
    expect(s.tier).toBe("hot");
    expect(s.hoursPerWeek).toBe(15);
    expect(s.annualSek).toBe(15 * 52 * 450);
  });
  test("weak lead is cold", () => {
    const s = scoreIntake({ ...good, hours: "lt2", tools: ["paper"], timeline: "exploring", budget: "lt10k", decision: "other" });
    expect(s.tier).toBe("cold");
  });
  test("score bounded 0..100", () => {
    const s = scoreIntake(good);
    expect(s.score).toBeGreaterThanOrEqual(0);
    expect(s.score).toBeLessThanOrEqual(100);
  });
});

test("brief contains key facts and call questions", () => {
  const b = buildBrief(good);
  for (const s of ["Klinik Söder", "anna@example.se", "HOT", "Bokadirekt", "calls", "How do calls reach you today"]) expect(b).toContain(s);
});
