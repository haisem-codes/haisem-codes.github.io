import { test, expect } from "vitest";
import { canRender3D } from "@/lib/capability";
const base = { reducedMotion: false, webgl: true, cores: 8, mobile: false };
test("desktop ok", () => expect(canRender3D(base)).toBe(true));
test("reduced motion off", () => expect(canRender3D({ ...base, reducedMotion: true })).toBe(false));
test("no webgl off", () => expect(canRender3D({ ...base, webgl: false })).toBe(false));
test("weak mobile off", () => expect(canRender3D({ ...base, mobile: true, cores: 4 })).toBe(false));
test("strong mobile ok", () => expect(canRender3D({ ...base, mobile: true, cores: 8 })).toBe(true));
test("weak desktop ok", () => expect(canRender3D({ ...base, cores: 2 })).toBe(true));

import { isSoftwareRenderer } from "@/lib/capability";
test("software renderers detected", () => {
  for (const n of ["ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device))", "llvmpipe (LLVM 15)", "Microsoft Basic Render Driver", "Mesa OffScreen", "Software Renderer"])
    expect(isSoftwareRenderer(n)).toBe(true);
});
test("hardware renderers pass", () => {
  for (const n of ["ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)", "NVIDIA GeForce RTX 3060"])
    expect(isSoftwareRenderer(n)).toBe(false);
});
