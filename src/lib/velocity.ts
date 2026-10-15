/** Marquee offset is a fraction of one loop: 0 is the start, 1 is one full repeat of the line. */
export const MARQUEE_PERIOD = 1;
/** Seconds for one loop at rest; matches the CSS animation. */
export const MARQUEE_LOOP_S = 28;
export const MAX_SPEED = 6;
/** Scroll velocity (px per frame, as Lenis reports it) that adds 1x to the marquee speed. */
const VELOCITY_UNIT = 12;
const MAX_DT_MS = 64;
const REST_RATE = MARQUEE_PERIOD / (MARQUEE_LOOP_S * 1000);

export function speedFactor(velocity: number): number {
  const v = Math.abs(velocity);
  if (!Number.isFinite(v)) return v === Infinity ? MAX_SPEED : 1;
  return Math.min(1 + v / VELOCITY_UNIT, MAX_SPEED);
}

/** Extra marquee offset (fraction of a loop) on top of the CSS loop, so speed = rest speed × speedFactor. */
export function advancePhase(phase: number, velocity: number, dtMs: number): number {
  const next = phase + (speedFactor(velocity) - 1) * REST_RATE * Math.min(dtMs, MAX_DT_MS);
  return next % MARQUEE_PERIOD;
}
