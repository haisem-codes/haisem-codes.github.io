import { expect, test } from "vitest";
import { stockholmTime } from "@/lib/clock";

test("stockholmTime shows Stockholm wall-clock time in summer and winter", () => {
  expect(stockholmTime(new Date("2026-10-15T19:40:00Z"))).toBe("21:40");
  expect(stockholmTime(new Date("2026-12-01T20:05:00Z"))).toBe("21:05");
  expect(stockholmTime(new Date("2026-06-01T22:00:00Z"))).toBe("00:00");
});
