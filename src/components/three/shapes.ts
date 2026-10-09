function rng(seed: number) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }
const clamp = (v: number) => Math.max(-1.5, Math.min(1.5, v));

export function sphere(n: number): Float32Array {
  const a = new Float32Array(n * 3), r = rng(1), g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), t = g * i, k = 1 + (r() - 0.5) * 0.12;
    a.set([clamp(Math.cos(t) * rad * k * 1.2), clamp(y * k * 1.2), clamp(Math.sin(t) * rad * k * 1.2)], i * 3);
  }
  return a;
}

function fromSampler(n: number, seed: number, sample: (r: () => number) => [number, number, number]) {
  const a = new Float32Array(n * 3), r = rng(seed);
  for (let i = 0; i < n; i++) a.set(sample(r).map(clamp), i * 3);
  return a;
}

// form: card with 4 input lines
export const formShape = (n: number) => fromSampler(n, 2, (r) => {
  const line = Math.floor(r() * 5);
  if (line === 4) { const e = r(); return [e < 0.5 ? (e * 4 - 1) * 0.9 : (r() > 0.5 ? 0.9 : -0.9), e < 0.5 ? (r() > 0.5 ? 1.2 : -1.2) : (r() * 2.4 - 1.2), (r() - 0.5) * 0.05]; }
  return [r() * 1.4 - 0.7, 0.75 - line * 0.5, (r() - 0.5) * 0.05];
});

// phone: rounded handset outline + sound arcs
export const phoneShape = (n: number) => fromSampler(n, 3, (r) => {
  if (r() < 0.6) { const t = r() * Math.PI * 2; return [Math.cos(t) * 0.45, Math.sin(t) * 1.1, (r() - 0.5) * 0.05]; }
  const ring = 1 + Math.floor(r() * 3), t = (r() - 0.5) * 1.2;
  return [0.55 + Math.cos(t) * ring * 0.25, Math.sin(t) * ring * 0.25 + 0.6, 0];
});

// calendar: 5x4 grid of dots in a frame
export const calendarShape = (n: number) => fromSampler(n, 4, (r) => {
  if (r() < 0.35) { const t = r(); const side = Math.floor(r() * 4); const x = t * 2.4 - 1.2; return side < 2 ? [x, side ? 1.1 : -1.1, 0] : [side === 2 ? 1.2 : -1.2, t * 2.2 - 1.1, 0]; }
  const c = Math.floor(r() * 5), row = Math.floor(r() * 4);
  return [-0.9 + c * 0.45 + (r() - 0.5) * 0.08, 0.6 - row * 0.45 + (r() - 0.5) * 0.08, 0];
});

// crm: three stacked records / bars
export const crmShape = (n: number) => fromSampler(n, 5, (r) => {
  const bar = Math.floor(r() * 3);
  return [r() * 2.2 - 1.1, 0.7 - bar * 0.7 + (r() - 0.5) * 0.25, (r() - 0.5) * 0.3];
});
