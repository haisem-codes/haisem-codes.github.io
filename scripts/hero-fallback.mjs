import { writeFileSync } from "node:fs";

const n = 300, g = Math.PI * (3 - Math.sqrt(5));
let seed = 1;
const r = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const dots = [];
for (let i = 0; i < n; i++) {
  const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), t = g * i;
  const x = Math.cos(t) * rad, z = Math.sin(t) * rad;
  const cx = (300 + x * 240).toFixed(1), cy = (300 + y * 240).toFixed(1);
  const depth = (z + 1) / 2;
  dots.push(`<circle cx="${cx}" cy="${cy}" r="${(1.5 + depth * 2.5 + r() * 0.5).toFixed(1)}" opacity="${(0.25 + depth * 0.65).toFixed(2)}"/>`);
}
writeFileSync(
  new URL("../public/hero-fallback.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" fill="#0D7C72">\n${dots.join("\n")}\n</svg>\n`,
);
