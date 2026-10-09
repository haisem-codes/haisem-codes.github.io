export function canRender3D(env: { reducedMotion: boolean; webgl: boolean; cores: number; mobile: boolean }): boolean {
  if (env.reducedMotion || !env.webgl) return false;
  if (env.mobile && env.cores <= 4) return false;
  return true;
}

export function isSoftwareRenderer(name: string): boolean {
  return /swiftshader|llvmpipe|software|microsoft basic render driver|mesa offscreen/i.test(name);
}

let webglMemo: boolean | undefined;

function hasHardwareWebGL(): boolean {
  if (webglMemo !== undefined) return webglMemo;
  let ok = false;
  try {
    const gl = document.createElement("canvas").getContext("webgl2") || document.createElement("canvas").getContext("webgl");
    if (gl) {
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      ok = !info || !isSoftwareRenderer(String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    ok = false;
  }
  webglMemo = ok;
  return ok;
}

export function readEnv() {
  try {
    return readEnvUnsafe();
  } catch {
    return { reducedMotion: false, webgl: false, cores: 1, mobile: false };
  }
}

function readEnvUnsafe() {
  return {
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl: hasHardwareWebGL(),
    cores: navigator.hardwareConcurrency ?? 4,
    mobile: matchMedia("(pointer: coarse)").matches,
  };
}
