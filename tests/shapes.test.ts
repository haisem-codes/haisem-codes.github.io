import { test, expect } from "vitest";
import * as S from "@/components/three/shapes";
for (const fn of [S.sphere, S.formShape, S.phoneShape, S.calendarShape, S.crmShape])
  test(fn.name, () => {
    const a = fn(1000);
    expect(a.length).toBe(3000);
    expect(a.every((v) => Number.isFinite(v) && Math.abs(v) <= 1.5)).toBe(true);
  });
