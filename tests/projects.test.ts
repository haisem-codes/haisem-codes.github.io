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
test("Metaviz work is attributed", () => {
  for (const s of ["ai-compliance-platform", "voice-agents-suite", "postura", "coach", "ai-real-estate-marketplace", "b2b-travel-saas", "ai-craftsmen-marketplace", "ai-tools-suite", "ai-video-pipeline"])
    expect(projects.find((p) => p.slug === s)?.employer).toBe("metaviz");
});
test("icore-careerhub removed", () => expect(projects.some((p) => p.slug === "icore-careerhub")).toBe(false));
