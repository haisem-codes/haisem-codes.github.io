import { describe, expect, it } from "vitest";
import { storyProgress } from "@/lib/story";

describe("storyProgress", () => {
  it("holds form shape at start", () => {
    expect(storyProgress(0)).toEqual({ step: 0, progress: 1 });
    expect(storyProgress(0.1)).toEqual({ step: 0, progress: 1 });
  });
  it("morphs in the last 30% of a window", () => {
    const r = storyProgress(0.24);
    expect(r.step).toBe(0);
    expect(r.progress).toBeGreaterThan(1);
    expect(r.progress).toBeLessThan(2);
  });
  it("next caption holds next shape", () => {
    expect(storyProgress(0.25)).toEqual({ step: 1, progress: 2 });
  });
  it("holds CRM through the final caption", () => {
    expect(storyProgress(0.99)).toEqual({ step: 3, progress: 4 });
    expect(storyProgress(1)).toEqual({ step: 3, progress: 4 });
  });
  it("clamps out-of-range input", () => {
    expect(storyProgress(-1)).toEqual({ step: 0, progress: 1 });
    expect(storyProgress(2)).toEqual({ step: 3, progress: 4 });
  });
});
