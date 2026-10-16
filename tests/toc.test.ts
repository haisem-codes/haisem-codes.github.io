import { test, expect } from "vitest";
import { pickActive } from "@/lib/toc";

test("picks the last section whose top has passed the reading line", () => {
  expect(pickActive([-800, -100, 300, 900], 200)).toBe(1);
  expect(pickActive([-800, -100, 150, 900], 200)).toBe(2);
});

test("stays on the first section before any heading reaches the line", () => {
  expect(pickActive([400, 900], 200)).toBe(0);
});

test("lands on the last section once it reaches the line", () => {
  expect(pickActive([-3000, -2000, -900, 120], 200)).toBe(3);
});

test("selects the last section at the page bottom even when it never reaches the line", () => {
  expect(pickActive([-3000, -2000, 500], 200, true)).toBe(2);
});

test("returns -1 for no sections", () => {
  expect(pickActive([], 200)).toBe(-1);
});
