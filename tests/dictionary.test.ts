import { test, expect } from "vitest";
import { getDictionary } from "@/i18n";

function shape(o: unknown): unknown {
  if (Array.isArray(o)) return o.map(shape);
  if (o && typeof o === "object")
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, shape(v)]));
  return typeof o;
}

test("sv has identical shape to en (incl. array lengths)", () => {
  expect(shape(getDictionary("sv"))).toEqual(shape(getDictionary("en")));
});

test("no empty strings", () => {
  const walk = (o: unknown): string[] =>
    typeof o === "string" ? [o] : o && typeof o === "object" ? Object.values(o).flatMap(walk) : [];
  for (const l of ["en", "sv"] as const)
    for (const s of walk(getDictionary(l))) expect(s.trim().length).toBeGreaterThan(0);
});
