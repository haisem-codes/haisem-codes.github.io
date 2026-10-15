import { describe, expect, it } from "vitest";
import { activeStep, storyClock, STORY_CUES, storyProgress } from "@/lib/story";

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
  it("holds each step's label while its caption is shown", () => {
    expect(storyClock(0.5 / 4, en)).toBe("21:40:00");
    expect(storyClock(1.35 / 4, en)).toBe("21:41:30");
    expect(storyClock(1.65 / 4, en)).toBe("21:41:30");
    expect(storyClock(3.5 / 4, en)).toBe("21:44:00");
  });
  it("ticks forward between labels and keeps the locale separator", () => {
    expect(storyClock(1.775 / 4, en)).toBe("21:42:25");
    expect(storyClock(0.5, ["21.40.00", "21.41.30", "21.43.20", "21.44.00"])).toMatch(/^21\.4[23]\.\d\d$/);
  });
});

describe("activeStep", () => {
  it("switches caption at 85% of each scroll window", () => {
    expect(activeStep(0)).toBe(0);
    expect(activeStep(0.8 / 4)).toBe(0);
    expect(activeStep(0.86 / 4)).toBe(1);
    expect(activeStep(1.86 / 4)).toBe(2);
    expect(activeStep(2.86 / 4)).toBe(3);
    expect(activeStep(1)).toBe(3);
  });
});

describe("STORY_CUES", () => {
  // Timeline time t maps to scroll progress t / 4; find where each caption becomes active.
  const activeFrom = (k: number) => {
    for (let t = 0; t <= 4; t += 0.001) if (activeStep(t / 4) === k) return t;
    return Infinity;
  };
  const activeTo = (k: number) => (k === 3 ? 4 : activeFrom(k + 1));

  it("lands each new panel by the time its caption is active", () => {
    for (let k = 1; k < 4; k++) expect(STORY_CUES.swapIn(k - 1) + STORY_CUES.swapDur).toBeLessThanOrEqual(activeFrom(k) + 0.01);
  });
  it("reaches each step's payoff within the first 30% of its caption", () => {
    for (const { step, end } of STORY_CUES.payoffs) {
      const from = activeFrom(step);
      expect(end).toBeGreaterThan(from - 0.05);
      expect(end).toBeLessThanOrEqual(from + 0.3 * (activeTo(step) - from));
    }
  });
  it("covers the booking and the CRM row", () => {
    expect(STORY_CUES.payoffs.map((p) => p.step)).toEqual(expect.arrayContaining([2, 3]));
  });
});
