const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function storyProgress(p: number): { step: number; progress: number } {
  const c = Math.min(1, Math.max(0, p));
  const step = Math.min(3, Math.floor(c * 4));
  const local = c * 4 - step;
  const t = Math.min(1, Math.max(0, (local - 0.7) / 0.3));
  return { step, progress: step + 1 + (step < 3 ? smoothstep(t) : 0) };
}

/** Within a step's scroll window the clock holds its label, then ticks to the next one before the caption swaps at 0.85. */
const TICK_FROM = 0.7;
const TICK_TO = 0.85;

const toSeconds = (label: string) => {
  const [h, m, s] = label.split(/\D/).map(Number);
  return h * 3600 + m * 60 + s;
};

/** Scroll progress → wall-clock label; shows each step's own label while that step's caption is up. */
export function storyClock(p: number, labels: string[]): string {
  const c = Math.min(1, Math.max(0, p));
  const last = labels.length - 1;
  const step = Math.min(last, Math.floor(c * labels.length));
  const local = c * labels.length - step;
  const from = toSeconds(labels[step]);
  const to = toSeconds(labels[Math.min(last, step + 1)]);
  const t = Math.min(1, Math.max(0, (local - TICK_FROM) / (TICK_TO - TICK_FROM)));
  const secs = Math.floor(from + (to - from) * t);
  const sep = labels[0].charAt(2);
  return [Math.floor(secs / 3600), Math.floor(secs / 60) % 60, secs % 60].map((n) => String(n).padStart(2, "0")).join(sep);
}
