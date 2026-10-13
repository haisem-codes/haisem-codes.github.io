export function clampPct(n: number): number {
  return Math.min(100, Math.max(0, n));
}

export function scoreAt(pct: number, from: number, to: number): number {
  return Math.round(from + ((to - from) * clampPct(pct)) / 100);
}
