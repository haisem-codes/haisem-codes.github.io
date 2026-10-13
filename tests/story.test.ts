import { describe, expect, it } from "vitest";
import { storyClock, storyProgress } from "@/lib/story";

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

describe("storyClock", () => {
  const en = ["21:40:00", "21:41:30", "21:43:20", "21:44:00"];
  it("starts and ends on the first and last label", () => {
    expect(storyClock(0, en)).toBe("21:40:00");
    expect(storyClock(1, en)).toBe("21:44:00");
  });
  it("hits each step label where the caption changes", () => {
    expect(storyClock(0.85 / 4, en)).toBe("21:41:30");
    expect(storyClock(1.85 / 4, en)).toBe("21:43:20");
    expect(storyClock(2.85 / 4, en)).toBe("21:44:00");
  });
  it("ticks forward between labels and keeps the locale separator", () => {
    expect(storyClock(1.35 / 4, en)).toBe("21:42:25");
    expect(storyClock(0.5, ["21.40.00", "21.41.30", "21.43.20", "21.44.00"])).toMatch(/^21\.4[23]\.\d\d$/);
  });
});
