import { test, expect } from "vitest";
import { projects, textProjects, localize } from "@/data/projects";
test("slugs unchanged", () => {
  for (const s of ["ai-compliance-platform", "voice-agents-suite", "postura", "coach"]) expect(projects.some((p) => p.slug === s)).toBe(true);
});
test("every project has a category", () => projects.forEach((p) => expect(["business", "products", "research"]).toContain(p.category)));
test("featured projects have Swedish tagline", () => projects.filter((p) => p.featured).forEach((p) => expect(p.sv?.tagline).toBeTruthy()));
test("localize overlays sv", () => {
  const p = projects.find((x) => x.slug === "coach")!;
  expect(localize(p, "sv").tagline).toBe(p.sv!.tagline);
  expect(localize(p, "en").tagline).toBe(p.tagline);
});
test("Metaviz attribution", () => {
  for (const s of ["ai-compliance-platform", "postura", "ai-real-estate-marketplace", "b2b-travel-saas", "ai-craftsmen-marketplace", "ai-tools-suite", "dietapp"])
    expect(projects.find((p) => p.slug === s)?.context).toBe("metaviz");
  for (const s of ["voice-agents-suite", "coach"]) expect(projects.find((p) => p.slug === s)?.context).toBe("client");
  for (const p of projects.filter((x) => x.context)) expect(p.description).toMatch(/^Built at Metaviz/);
});
test("CV metrics are in the copy", () => {
  const all = (s: string) => JSON.stringify(projects.find((p) => p.slug === s));
  expect(all("ai-compliance-platform")).toMatch(/80%.*40%|40%.*80%/);
  expect(all("ai-compliance-platform")).toContain("132 FastAPI endpoints");
  expect(all("coach")).toMatch(/50%/);
  expect(all("coach")).toContain("21 Firestore collections");
  expect(all("voice-agents-suite")).toContain("more than five business owners");
  expect(all("postura")).toContain("71-photo");
});
test("ICore is a text-only list entry", () => {
  expect(projects.some((p) => p.slug === "icore-career-hub")).toBe(false);
  expect(textProjects.map((p) => p.slug)).toEqual(["icore-career-hub"]);
});
test("no LLM named for Jake's agents", () => expect(JSON.stringify(projects.find((p) => p.slug === "voice-agents-suite"))).not.toMatch(/gpt|claude|openai|gemini/i));
test("exactly three featured projects with rendered mockups", () => {
  const f = projects.filter((p) => p.featured);
  expect(f.map((p) => p.slug).sort()).toEqual(["ai-compliance-platform", "postura", "voice-agents-suite"]);
  for (const p of projects) expect(p.image.startsWith("/work/")).toBe(true);
});
