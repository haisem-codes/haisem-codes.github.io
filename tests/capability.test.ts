import { test, expect } from "vitest";
import { getTier, isSoftwareRenderer } from "@/lib/capability";
const env = { reducedMotion: false, webgl: true, cores: 8, mobile: false };
test("desktop with webgl → full", () => expect(getTier(env)).toBe("full"));
test("reduced motion → static", () => expect(getTier({ ...env, reducedMotion: true })).toBe("static"));
test("save-data → static", () => expect(getTier({ ...env, saveData: true })).toBe("static"));
test("no webgl desktop → lite", () => expect(getTier({ ...env, webgl: false })).toBe("lite"));
test("phone ≤4 cores → lite", () => expect(getTier({ ...env, mobile: true, cores: 4 })).toBe("lite"));
test("strong phone → full", () => expect(getTier({ ...env, mobile: true, cores: 8 })).toBe("full"));
test("very weak device → static", () => expect(getTier({ ...env, mobile: true, cores: 2, webgl: false })).toBe("static"));


test("software renderers detected", () => {
  for (const n of ["ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device))", "llvmpipe (LLVM 15)", "Microsoft Basic Render Driver", "Mesa OffScreen", "Software Renderer"])
    expect(isSoftwareRenderer(n)).toBe(true);
});
test("hardware renderers pass", () => {
  for (const n of ["ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)", "NVIDIA GeForce RTX 3060"])
    expect(isSoftwareRenderer(n)).toBe(false);
});

test("static boot script mirrors the cheap static conditions", async () => {
  const { staticTierBootScript } = await import("@/lib/capability");
  const run = (reduce: boolean, saveData: boolean) => {
    const classes = new Set<string>();
    const env = {
      matchMedia: () => ({ matches: reduce }),
      navigator: { connection: { saveData } },
      document: { documentElement: { classList: { add: (c: string) => classes.add(c) } } },
    };
    new Function("matchMedia", "navigator", "document", staticTierBootScript)(env.matchMedia, env.navigator, env.document);
    return classes.has("tier-static");
  };
  expect(run(true, false)).toBe(true);
  expect(run(false, true)).toBe(true);
  expect(run(false, false)).toBe(false);
});
