import { test, expect } from "vitest";
import { posterSrcSet, pauseOthers, JAKE, DERIN } from "@/lib/testimonials";

test("posterSrcSet lists each width with its descriptor", () => {
  expect(posterSrcSet("/t/derin-poster", [360, 480], "avif")).toBe("/t/derin-poster-360.avif 360w, /t/derin-poster-480.avif 480w");
});

test("both clips ship a captions track at 720x1280", () => {
  for (const m of [JAKE, DERIN]) {
    expect(m.captions).toMatch(/\.vtt$/);
    expect([m.width, m.height]).toEqual([720, 1280]);
    expect(m.posterWidths.at(-1)).toBe(720);
  }
});

test("pauseOthers pauses every other playing video and leaves the current one alone", () => {
  const mk = (paused: boolean) => ({ paused, pause() { this.paused = true; } });
  const a = mk(false), b = mk(false), c = mk(true);
  pauseOthers([a, b, c], a);
  expect([a.paused, b.paused, c.paused]).toEqual([false, true, true]);
});
