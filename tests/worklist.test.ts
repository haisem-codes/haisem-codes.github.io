import { test, expect } from "vitest";
import { capList } from "@/lib/worklist";

test("hides rows past the cap and counts exactly what expanding reveals", () => {
  const s = capList(8, 4, false);
  expect(s.hidden).toEqual([false, false, false, false, true, true, true, true]);
  expect(s.more).toBe(4);
  expect(s.firstRevealed).toBe(4);
});

test("shows every row once expanded", () => {
  expect(capList(8, 4, true).hidden.every((h) => !h)).toBe(true);
});

test("needs no toggle when the list fits the cap", () => {
  const s = capList(3, 4, false);
  expect(s.more).toBe(0);
  expect(s.hidden).toEqual([false, false, false]);
});
