import { RIDGE, SILHOUETTE, VIEW_H, VIEW_W, WATER_Y, WIN_H, WIN_W, WINDOWS, toPath, windowsLit } from "./skylineData";

const SKY = toPath(SILHOUETTE);
const HILLS = toPath(RIDGE);

function Windows({ lit }: { lit: number }) {
  return (
    <g fill="#FFB547">
      {WINDOWS.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={WIN_W}
          height={WIN_H}
          opacity={i < lit ? 1 : 0.07}
          style={{ transition: "opacity 600ms cubic-bezier(.16,1,.3,1)" }}
        />
      ))}
    </g>
  );
}

/** The skyline as inline SVG: windows switch on in order as `litRatio` (0..1) rises. */
export function SkylineSvg({ litRatio }: { litRatio: number }) {
  const lit = windowsLit(litRatio, WINDOWS.length);
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMax slice" aria-hidden className="block h-full w-full">
      <defs>
        <linearGradient id="skyline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E1B24" />
          <stop offset="1" stopColor="#080C11" />
        </linearGradient>
        <linearGradient id="skyline-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08090B" stopOpacity="0.35" />
          <stop offset="1" stopColor="#08090B" />
        </linearGradient>
      </defs>
      <path d={HILLS} fill="#0B1117" />
      <path d={SKY} fill="url(#skyline-fill)" stroke="#16323A" strokeWidth="1" />
      <Windows lit={lit} />
      <g transform={`matrix(1 0 0 -0.5 0 ${WATER_Y * 1.5})`} opacity="0.4">
        <path d={SKY} fill="#0B151C" />
        <Windows lit={lit} />
      </g>
      <rect x="0" y={WATER_Y} width={VIEW_W} height={VIEW_H - WATER_Y} fill="url(#skyline-water)" />
      <path d={`M0 ${WATER_Y}H${VIEW_W}`} stroke="#7DD3FC" strokeOpacity="0.22" />
    </svg>
  );
}
