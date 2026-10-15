import { test, expect, vi } from "vitest";
import { runInNewContext } from "node:vm";
import { REVEAL_FALLBACK, REVEAL_GRACE_MS, REVEAL_READY, revealBootScript } from "@/lib/reveal";

function boot(ready: string[], scrollReveals = true) {
  const classes = new Set<string>();
  const listeners: Record<string, () => void> = {};
  const html = { classList: { add: (c: string) => classes.add(c), contains: (c: string) => classes.has(c) } };
  vi.useFakeTimers();
  runInNewContext(revealBootScript, {
    document: { documentElement: html, querySelector: () => (scrollReveals ? {} : null) },
    addEventListener: (type: string, fn: () => void) => (listeners[type] = fn),
    setTimeout,
  });
  ready.forEach((c) => classes.add(c));
  listeners.load?.();
  vi.advanceTimersByTime(REVEAL_GRACE_MS + 1);
  vi.useRealTimers();
  return classes;
}

test("marks the document as scripted at once", () => {
  expect(boot([...REVEAL_READY]).has("js")).toBe(true);
});

test("leaves reveals to motion when motion and the reveals both started", () => {
  expect(boot([...REVEAL_READY]).has(REVEAL_FALLBACK)).toBe(false);
});

test("shows the content when the motion chunk never loaded", () => {
  expect(boot(["reveal-ready"]).has(REVEAL_FALLBACK)).toBe(true);
});

test("shows the content when the page chunk never hydrated", () => {
  expect(boot(["motion-ready"]).has(REVEAL_FALLBACK)).toBe(true);
});

test("pages without scroll reveals only need motion", () => {
  expect(boot(["motion-ready"], false).has(REVEAL_FALLBACK)).toBe(false);
});
