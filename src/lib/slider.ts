export function clampPct(n: number): number {
  return Math.min(100, Math.max(0, n));
}

export function scoreAt(pct: number, from: number, to: number): number {
  return Math.round(from + ((to - from) * clampPct(pct)) / 100);
}

export type DragIntent = "pending" | "drag" | "scroll";

/** A touch on the slider only drags once it is clearly horizontal; anything else is a page scroll. */
export function dragIntent(dx: number, dy: number, threshold = 8): DragIntent {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (Math.max(ax, ay) < threshold) return "pending";
  return ax > ay ? "drag" : "scroll";
}
