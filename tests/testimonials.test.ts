import { test, expect } from "vitest";
import { posterSrcSet, pauseOthers, JAKE, DERIN } from "@/lib/testimonials";

test("posterSrcSet lists each width with its descriptor", () => {
  expect(posterSrcSet("/t/derin-poster", [360, 480], "avif")).toBe("/t/derin-poster-360.avif 360w, /t/derin-poster-480.avif 480w");
});

test("only Derin ships a captions track; both keep 9:16-ish intrinsic sizes", () => {
  expect(JAKE.captions).toBeUndefined();
  expect(DERIN.captions).toMatch(/\.vtt$/);
  for (const m of [JAKE, DERIN]) expect(m.height / m.width).toBeGreaterThan(1.7);
});

test("pauseOthers pauses every other playing video and leaves the current one alone", () => {
  const mk = (paused: boolean) => ({ paused, pause() { this.paused = true; } });
  const a = mk(false), b = mk(false), c = mk(true);
  pauseOthers([a, b, c], a);
  expect([a.paused, b.paused, c.paused]).toEqual([false, true, true]);
});
