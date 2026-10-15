import { test, expect } from "vitest";
import { shouldIntercept } from "@/lib/transition";

const click = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, defaultPrevented: false };
const ctx = { href: "https://x.dev/en/", supported: true, reducedMotion: false };

test("intercepts a plain same-origin click", () => {
  expect(shouldIntercept(click, "/en/projects/postura/", ctx)).toBe(true);
});

test("leaves modifier, middle and handled clicks to the browser", () => {
  for (const k of ["metaKey", "ctrlKey", "shiftKey", "altKey"] as const) {
    expect(shouldIntercept({ ...click, [k]: true }, "/en/projects/postura/", ctx)).toBe(false);
  }
  expect(shouldIntercept({ ...click, button: 1 }, "/en/projects/postura/", ctx)).toBe(false);
  expect(shouldIntercept({ ...click, defaultPrevented: true }, "/en/projects/postura/", ctx)).toBe(false);
});

test("falls back without the API or with reduced motion", () => {
  expect(shouldIntercept(click, "/en/projects/postura/", { ...ctx, supported: false })).toBe(false);
  expect(shouldIntercept(click, "/en/projects/postura/", { ...ctx, reducedMotion: true })).toBe(false);
});

test("skips external, hash, new-tab and same-page links", () => {
  expect(shouldIntercept(click, "https://github.com/x", ctx)).toBe(false);
  expect(shouldIntercept(click, "/en/#work", ctx)).toBe(false);
  expect(shouldIntercept(click, "#work", ctx)).toBe(false);
  expect(shouldIntercept(click, "/en/projects/postura/", { ...ctx, target: "_blank" })).toBe(false);
  expect(shouldIntercept(click, "/en/", ctx)).toBe(false);
  expect(shouldIntercept(click, "mailto:a@b.se", ctx)).toBe(false);
});
