import { test, expect, describe } from "vitest";
import { validateIntake, validateStep } from "@/lib/intake/validate";
import { scoreIntake, buildBrief } from "@/lib/intake/score";
import type { IntakeAnswers } from "@/lib/intake/schema";
import { buildMailtoSummary, MAILTO_BODY_MAX } from "@/lib/intake/mailto";
import { getDictionary } from "@/i18n";

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

function okValue(input: unknown): IntakeAnswers {
  const r = validateIntake(input);
  if (!r.ok) throw new Error(JSON.stringify(r.errors));
  return r.value;
}

describe("strict shape at the public boundary", () => {
  test("extra keys and __proto__ are dropped from value", () => {
    const input: Record<string, unknown> = { ...good, evil: "x" };
    Object.defineProperty(input, "__proto__", { value: { polluted: true }, enumerable: true });
    const value = okValue(input) as unknown as Record<string, unknown>;
    expect(value).not.toHaveProperty("evil");
    expect(Object.keys(value)).not.toContain("__proto__");
    expect(Object.getPrototypeOf(value)).toBe(Object.prototype);
    expect(value).not.toHaveProperty("polluted");
  });
  test("single-select given an array is invalid", () => {
    const r = validateIntake({ ...good, goal: ["website"] });
    expect(!r.ok && r.errors.goal).toBe("invalid");
  });
  test("multi-select given a bare string is invalid", () => {
    const r = validateIntake({ ...good, tools: "google" });
    expect(!r.ok && r.errors.tools).toBe("invalid");
  });
  test("multi-select array longer than its option list is invalid", () => {
    const r = validateIntake({ ...good, tasks: Array.from({ length: 50 }, (_, i) => `x${i}`) });
    expect(r.ok).toBe(false);
  });
  test("duplicate multi-select codes are de-duplicated", () => {
    expect(okValue({ ...good, tasks: ["calls", "calls", "booking"] }).tasks).toEqual(["calls", "booking"]);
  });
  test("empty optional enum is treated as absent and score stays finite", () => {
    const value = okValue({ ...good, budget: "" });
    expect(value.budget).toBeUndefined();
    expect(Number.isFinite(scoreIntake(value).score)).toBe(true);
  });
  test("honeypot 0 is rejected", () => {
    expect(validateIntake({ ...good, company_url_hp: 0 as unknown as string }).ok).toBe(false);
  });
  test("whitespace-only name is required", () => {
    const r = validateIntake({ ...good, name: "   " });
    expect(!r.ok && r.errors.name).toBe("required");
  });
  test("website accepts bare domain and rejects javascript and ftp", () => {
    expect(okValue({ ...good, website: "example.se" }).website).toBe("example.se");
    expect(validateIntake({ ...good, website: "javascript:alert(1).x" }).ok).toBe(false);
    expect(validateIntake({ ...good, website: "ftp://x.se" }).ok).toBe(false);
  });
});

describe("buildMailtoSummary", () => {
  const en = getDictionary("en").intake;
  const sv = getDictionary("sv").intake;

  test("lists each answered question with its dictionary label and chosen option labels", () => {
    const body = buildMailtoSummary({ ...good, notes: "Ring helst efter lunch" }, en);
    expect(body).toContain(`${en.steps.goal.q}: ${en.options.goal.missed_calls}`);
    expect(body).toContain(`${en.steps.business.businessName}: Klinik Söder`);
    expect(body).toContain(`${en.steps.time.tasks}: ${en.options.tasks.calls}, ${en.options.tasks.booking}`);
    expect(body).toContain(`${en.steps.contact.email}: anna@example.se`);
    expect(body).toContain("Ring helst efter lunch");
  });

  test("uses the visitor's language", () => {
    const body = buildMailtoSummary(good, sv);
    expect(body).toContain(`${sv.steps.goal.q}: ${sv.options.goal.missed_calls}`);
  });

  test("skips empty optional answers and the hidden website branch", () => {
    const body = buildMailtoSummary({ ...good, phone: "", websiteNeeds: [] }, en);
    expect(body).not.toContain(en.steps.contact.phone);
    expect(body).not.toContain(en.steps.time.websiteState);
    expect(body).not.toContain(en.steps.time.websiteNeeds);
  });

  test("contains no internal scoring wording", () => {
    const body = buildMailtoSummary(good, en);
    for (const w of [/score/i, /tier/i, /hot|warm|cold/i, /SEK\/year/i, /\/100/, /ROI/]) expect(body).not.toMatch(w);
  });

  test("truncates long notes to keep the body under the limit", () => {
    const body = buildMailtoSummary({ ...good, notes: "x".repeat(2000) }, en);
    expect(body.length).toBeLessThanOrEqual(MAILTO_BODY_MAX);
    expect(body).toContain("…");
    expect(body).toContain(`${en.steps.contact.name}: Anna`);
  });
});
