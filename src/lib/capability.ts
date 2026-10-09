export function canRender3D(env: { reducedMotion: boolean; webgl: boolean; cores: number; mobile: boolean }): boolean {
  if (env.reducedMotion || !env.webgl) return false;
  if (env.mobile && env.cores <= 4) return false;
  return true;
}

function hasHardwareWebGL(): boolean {
  const gl = document.createElement("canvas").getContext("webgl2") || document.createElement("canvas").getContext("webgl");
  if (!gl) return false;
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  if (!info) return true;
  return !/swiftshader|llvmpipe|software/i.test(String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)));
}

export function readEnv() {
  return {
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl: hasHardwareWebGL(),
    cores: navigator.hardwareConcurrency ?? 4,
    mobile: matchMedia("(pointer: coarse)").matches,
  };
}
