import { test, expect } from "vitest";
import { readFileSync } from "node:fs";
import { tokens, contrast } from "@/lib/tokens";

test("contrast helper", () => {
  expect(contrast("#000000", "#FFFFFF")).toBeCloseTo(21, 0);
  expect(contrast("#FFFFFF", "#FFFFFF")).toBeCloseTo(1, 5);
});
for (const mode of ["light", "night"] as const) {
  const t = tokens[mode];
  test(`${mode}: body text AA`, () => expect(contrast(t.text, t.bg)).toBeGreaterThanOrEqual(7));
  test(`${mode}: secondary AA`, () => expect(contrast(t.secondary, t.bg)).toBeGreaterThanOrEqual(4.5));
  test(`${mode}: accent AA`, () => expect(contrast(t.accent, t.bg)).toBeGreaterThanOrEqual(4.5));
  test(`${mode}: button AA`, () => expect(contrast(t.buttonText, t.button)).toBeGreaterThanOrEqual(4.5));
}
test("globals.css mirrors tokens", () => {
  const css = readFileSync("src/app/globals.css", "utf8").toLowerCase();
  for (const v of [...Object.values(tokens.light), ...Object.values(tokens.night)])
    if (v.startsWith("#")) expect(css).toContain(v.toLowerCase());
});
test("hero copy stays AA under the bulb's light cone", () => {
  const over = (hex: string, rgb: [number, number, number], a: number) =>
    "#" + [0, 1, 2].map((i) => Math.round(parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) * (1 - a) + rgb[i] * a).toString(16).padStart(2, "0")).join("");
  const lit = over(tokens.light.bg, [56, 189, 248], 0.18);
  expect(contrast(tokens.light.secondary, lit)).toBeGreaterThanOrEqual(4.5);
  expect(contrast(tokens.light.accent, lit)).toBeGreaterThanOrEqual(4.5);
  const dim = over(tokens.night.bg, [125, 211, 252], 0.1);
  expect(contrast(tokens.night.secondary, dim)).toBeGreaterThanOrEqual(4.5);
});
