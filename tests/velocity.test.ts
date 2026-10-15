import { test, expect } from "vitest";
import { advancePhase, MARQUEE_PERIOD, MAX_SPEED, speedFactor } from "@/lib/velocity";

test("speed is 1x at rest and grows with velocity either way", () => {
  expect(speedFactor(0)).toBe(1);
  expect(speedFactor(10)).toBeGreaterThan(1);
  expect(speedFactor(-10)).toBe(speedFactor(10));
  expect(speedFactor(40)).toBeGreaterThan(speedFactor(10));
});

test("speed is capped", () => {
  expect(speedFactor(1e6)).toBe(MAX_SPEED);
  expect(speedFactor(Number.NaN)).toBe(1);
});

test("phase only moves with velocity and wraps within one period", () => {
  expect(advancePhase(0.3, 0, 16)).toBe(0.3);
  const p = advancePhase(0, 30, 16);
  expect(p).toBeGreaterThan(0);
  let q = 0;
  for (let i = 0; i < 10_000; i++) q = advancePhase(q, 1e6, 16);
  expect(q).toBeGreaterThanOrEqual(0);
  expect(q).toBeLessThan(MARQUEE_PERIOD);
});

test("a long gap between scroll events does not lurch", () => {
  expect(advancePhase(0, 30, 5000)).toBe(advancePhase(0, 30, 64));
});
