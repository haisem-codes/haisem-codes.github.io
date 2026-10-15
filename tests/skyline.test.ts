import { test, expect } from "vitest";
import { ANCHORS, SILHOUETTE, VIEW_W, WATER_Y, WIN_H, WIN_W, WINDOWS, windowsLit } from "@/components/three/skylineData";
test("windows light per story step", () => {
  expect(windowsLit(0, 40)).toBe(0);
  expect(windowsLit(0.25, 40)).toBe(10);
  expect(windowsLit(1, 40)).toBe(40);
  expect(windowsLit(-1, 40)).toBe(0);
  expect(windowsLit(2, 40)).toBe(40);
});

const inside = ([x, y]: readonly [number, number]) => {
  let hit = false;
  for (let i = 0, j = SILHOUETTE.length - 1; i < SILHOUETTE.length; j = i++) {
    const [xi, yi] = SILHOUETTE[i];
    const [xj, yj] = SILHOUETTE[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
};

test("every window sits inside the silhouette, above the water", () => {
  expect(WINDOWS.length).toBeGreaterThan(40);
  for (const [x, y] of WINDOWS) {
    for (const c of [[x, y], [x + WIN_W, y], [x, y + WIN_H], [x + WIN_W, y + WIN_H]] as const) expect(inside(c)).toBe(true);
    expect(y + WIN_H).toBeLessThan(WATER_Y);
  }
});

test("the lead route runs west to east across the view", () => {
  expect(ANCHORS).toHaveLength(4);
  ANCHORS.forEach(([x], i) => i && expect(x).toBeGreaterThan(ANCHORS[i - 1][0]));
  expect(ANCHORS.every(([x, y]) => x > 0 && x < VIEW_W && y < WATER_Y)).toBe(true);
});

test("every route anchor sits on a building, not in empty sky", () => {
  for (const a of ANCHORS) expect(inside(a), `${a}`).toBe(true);
});

test("the route stays west of the pinned card, which covers the east half on desktop", () => {
  expect(ANCHORS.at(-1)![0]).toBeLessThan(VIEW_W * 0.47);
});
