export type Tier = "full" | "lite" | "static";

export function getTier(e: {
  reducedMotion: boolean;
  webgl: boolean;
  cores: number;
  mobile: boolean;
  saveData?: boolean;
}): Tier {
  if (e.reducedMotion || e.saveData) return "static";
  if (e.cores <= 2 && !e.webgl) return "static";
  if (!e.webgl) return "lite";
  if (e.mobile && e.cores <= 4) return "lite";
  return "full";
}

/**
 * Pre-paint copy of getTier's cheap static conditions (reduced motion, save-data), so CSS can show static
 * fallbacks on first paint. The WebGL-dependent case is left to LenisProvider, which adds the same class after hydration.
 */
export const staticTierBootScript = `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||(navigator.connection&&navigator.connection.saveData))document.documentElement.classList.add("tier-static")}catch(e){}`;

let tierMemo: Tier | undefined;

export function readTier(): Tier {
  if (tierMemo) return tierMemo;
  try {
    const env = readEnv();
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    tierMemo = getTier({ ...env, saveData });
  } catch {
    tierMemo = "static";
  }
  return tierMemo;
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
