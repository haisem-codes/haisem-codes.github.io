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

/** Caption index (0–3) shown at scroll progress p; it switches at 85% of each step's window. */
export function activeStep(p: number): number {
  return Math.min(3, Math.round(storyProgress(p).progress) - 1);
}

type Cue = { at: number; dur: number };
const end = (c: Cue, stagger = 0) => c.at + stagger + c.dur;

const cues = {
  /** Panel i leaves and panel i + 1 arrives just before caption i + 1 takes over. */
  swapOut: (i: number) => i + 0.58,
  swapIn: (i: number) => i + 0.62,
  swapDur: 0.23,
  typing: { at: 0.02, dur: 0.38 },
  sent: { at: 0.44, dur: 0.25 },
  calling: { at: 0.86, dur: 0.08 },
  connected: { at: 0.88, dur: 0.1 },
  bars: { at: 0.86, dur: 0.2 },
  line: { at: 0.92, dur: 0.2 },
  booking: { at: 1.87, dur: 0.25 },
  confirmed: { at: 1.95, dur: 0.2 },
  old: { at: 2.86, dur: 0.22 },
  row: { at: 2.88, dur: 0.22 },
  pill: { at: 2.98, dur: 0.15 },
  tags: { at: 2.96, dur: 0.18 },
  tagStagger: 0.04,
  summary: { at: 3.0, dur: 0.18 },
};

/**
 * Timeline positions for the pinned story (one unit per step, four in all). Each step's payoff (the call line, the
 * booked slot, the new CRM row) is complete early in its caption's window, so a reader who stops there sees it.
 */
export const STORY_CUES = {
  ...cues,
  payoffs: [
    { step: 1, end: end(cues.line) },
    { step: 2, end: Math.max(end(cues.booking), end(cues.confirmed)) },
    { step: 3, end: Math.max(end(cues.row), end(cues.pill), end(cues.tags, cues.tagStagger), end(cues.summary)) },
  ],
};
