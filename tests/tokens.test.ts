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
