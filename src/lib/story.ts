const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function storyProgress(p: number): { step: number; progress: number } {
  const c = Math.min(1, Math.max(0, p));
  const step = Math.min(3, Math.floor(c * 4));
  const local = c * 4 - step;
  const t = Math.min(1, Math.max(0, (local - 0.7) / 0.3));
  return { step, progress: step + 1 + (step < 3 ? smoothstep(t) : 0) };
}
