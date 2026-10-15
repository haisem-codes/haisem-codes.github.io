import { test, expect } from "vitest";
import { clampPct, dragIntent, scoreAt } from "@/lib/slider";

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

test("touch intent waits until the gesture clears the threshold", () => {
  expect(dragIntent(3, 2)).toBe("pending");
  expect(dragIntent(-7, 0)).toBe("pending");
});

test("touch intent drags on a mostly horizontal gesture", () => {
  expect(dragIntent(12, 4)).toBe("drag");
  expect(dragIntent(-20, -9)).toBe("drag");
});

test("touch intent yields to vertical scrolling", () => {
  expect(dragIntent(4, 14)).toBe("scroll");
  expect(dragIntent(10, -10)).toBe("scroll");
});
