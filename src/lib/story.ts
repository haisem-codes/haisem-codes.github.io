const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function storyProgress(p: number): { step: number; progress: number } {
  const c = Math.min(1, Math.max(0, p));
  const step = Math.min(3, Math.floor(c * 4));
  const local = c * 4 - step;
  const t = Math.min(1, Math.max(0, (local - 0.7) / 0.3));
  return { step, progress: step + 1 + (step < 3 ? smoothstep(t) : 0) };
}

const CLOCK_AT = [0, 0.85, 1.85, 2.85].map((s) => s / 4);

const toSeconds = (label: string) => {
  const [h, m, s] = label.split(/\D/).map(Number);
  return h * 3600 + m * 60 + s;
};

/** Scroll progress → wall-clock label; reaches each step's label as that step's caption takes over. */
export function storyClock(p: number, labels: string[]): string {
  const keys = labels.map(toSeconds);
  const c = Math.min(1, Math.max(0, p));
  let i = 0;
  while (i < CLOCK_AT.length - 1 && c >= CLOCK_AT[i + 1]) i++;
  const span = (CLOCK_AT[i + 1] ?? 1) - CLOCK_AT[i];
  const next = keys[i + 1] ?? keys[i];
  const t = Math.min(1, (c - CLOCK_AT[i]) / span);
  const secs = Math.floor(keys[i] + (next - keys[i]) * t);
  const sep = labels[0].charAt(2);
  return [Math.floor(secs / 3600), Math.floor(secs / 60) % 60, secs % 60].map((n) => String(n).padStart(2, "0")).join(sep);
}
