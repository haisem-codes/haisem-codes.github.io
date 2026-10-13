import { test, expect } from "vitest";
import { clampPct, scoreAt } from "@/lib/slider";

test("clamp", () => {
  expect(clampPct(-5)).toBe(0);
  expect(clampPct(140)).toBe(100);
  expect(clampPct(42.4)).toBe(42.4);
});

test("score interpolates", () => {
  expect(scoreAt(0, 38, 98)).toBe(38);
  expect(scoreAt(100, 38, 98)).toBe(98);
  expect(scoreAt(50, 38, 98)).toBe(68);
});

test("score clamps out-of-range percentages", () => {
  expect(scoreAt(-20, 38, 98)).toBe(38);
  expect(scoreAt(180, 38, 98)).toBe(98);
});
