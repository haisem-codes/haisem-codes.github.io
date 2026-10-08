export function canRender3D(env: { reducedMotion: boolean; webgl: boolean; cores: number; mobile: boolean }): boolean {
  if (env.reducedMotion || !env.webgl) return false;
  if (env.mobile && env.cores <= 4) return false;
  return true;
}

export function readEnv() {
  const c = document.createElement("canvas");
  return {
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl: !!(c.getContext("webgl2") || c.getContext("webgl")),
    cores: navigator.hardwareConcurrency ?? 4,
    mobile: matchMedia("(pointer: coarse)").matches,
  };
}
