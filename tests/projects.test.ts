import { test, expect } from "vitest";
import { projects, localize } from "@/data/projects";
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
test("team and client work is labelled", () => {
  for (const s of ["ai-compliance-platform", "postura", "ai-real-estate-marketplace", "b2b-travel-saas", "ai-craftsmen-marketplace", "ai-tools-suite", "ai-video-pipeline"])
    expect(projects.find((p) => p.slug === s)?.context).toBe("team");
  for (const s of ["voice-agents-suite", "coach"]) expect(projects.find((p) => p.slug === s)?.context).toBe("client");
});
test("no former-employer branding in project copy", () => expect(JSON.stringify(projects)).not.toMatch(/metaviz/i));
test("icore-careerhub removed", () => expect(projects.some((p) => p.slug === "icore-careerhub")).toBe(false));
test("exactly three featured projects with rendered mockups", () => {
  const f = projects.filter((p) => p.featured);
  expect(f.map((p) => p.slug).sort()).toEqual(["ai-compliance-platform", "postura", "voice-agents-suite"]);
  for (const p of projects) expect(p.image.startsWith("/work/")).toBe(true);
});
