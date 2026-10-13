/**
 * Stylised Stockholm waterfront, original artwork: Södermalm cliffs (west), the openwork Riddarholmen spire,
 * Gamla stan gables, a tower and a needle spire, a long palace block, and a domed church on the eastern heights.
 * Units are a 1440 × 260 view box; y grows downwards and the waterline sits at WATER_Y.
 */
export const VIEW_W = 1440;
export const VIEW_H = 260;
export const WATER_Y = 200;

type Pt = readonly [number, number];

const P = (s: string): Pt[] =>
  s
    .trim()
    .split(/\s+/)
    .map((p) => p.split(",").map(Number) as unknown as Pt);

/** Roofline from west to east; the shape closes along the waterline. */
export const SILHOUETTE: Pt[] = P(`
0,128 34,128 34,116 58,104 82,116 82,128 96,128 96,110 140,110 140,122 176,122 176,98 188,98 194,86 200,98 212,98
212,124 252,124 252,112 290,112 290,130 330,130 330,142 352,142 360,152 372,158 380,170 394,176 408,186 430,190
452,192 470,192 470,166 500,166 500,158 528,158 528,146 548,146 548,118 552,118 552,96 556,90 559,40 560,16 561,40
564,90 568,96 568,118 574,118 574,146 600,146 600,162 630,162 630,178 650,178 650,150 662,138 674,150 674,144
690,130 706,144 706,136 722,124 738,136 738,140 760,140 760,128 778,128 778,84 784,84 786,72 790,62 793,48 796,62
800,72 802,84 808,84 808,128 830,128 830,134 846,120 862,134 862,126 886,126 886,100 892,100 896,88 899,40 900,24
901,40 904,88 908,100 914,100 914,130 940,130 940,138 956,138 956,122 966,122 966,114 1100,114 1100,122 1112,122
1112,150 1140,150 1140,170 1180,170 1180,188 1220,188 1220,162 1240,162 1240,150 1268,150 1268,120 1276,120
1280,104 1290,92 1300,88 1300,74 1304,64 1308,74 1308,88 1318,92 1328,104 1332,120 1340,120 1340,140 1370,140
1370,126 1400,126 1400,134 1440,134 1440,${WATER_Y} 0,${WATER_Y}
`);

/** Far hills behind the town, seen over the low quays. */
export const RIDGE: Pt[] = P(`
0,146 120,138 260,132 420,124 520,134 640,128 760,134 880,126 1000,136 1140,122 1260,130 1440,138 1440,${WATER_Y} 0,${WATER_Y}
`);

/** Lit-window zones [x0, x1, yTop, yBottom], each inside the roofline above it. */
const FACADES: readonly (readonly [number, number, number, number])[] = [
  [4, 30, 134, 148], [100, 136, 118, 146], [146, 172, 128, 148], [214, 248, 130, 148], [256, 286, 118, 146],
  [294, 326, 136, 148], [474, 496, 172, 188], [504, 524, 164, 188], [532, 544, 152, 186], [578, 596, 152, 186],
  [604, 626, 168, 188], [654, 670, 154, 192], [678, 702, 150, 192], [710, 734, 142, 192], [742, 756, 146, 192],
  [762, 776, 134, 192], [812, 826, 134, 192], [834, 858, 138, 192], [866, 882, 132, 192], [918, 936, 136, 192],
  [944, 954, 144, 192], [970, 1096, 122, 150], [1116, 1136, 156, 192], [1144, 1176, 176, 192], [1224, 1236, 168, 192],
  [1244, 1264, 156, 192], [1342, 1366, 146, 190], [1374, 1396, 132, 190], [1404, 1436, 140, 190],
];

export const WIN_W = 5;
export const WIN_H = 7;

const hash = (n: number) => {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

/** Window top-left corners, ordered by the moment they switch on (a scattered, fixed order). */
export const WINDOWS: Pt[] = (() => {
  const out: { p: Pt; k: number }[] = [];
  let n = 0;
  for (const [x0, x1, y0, y1] of FACADES) {
    for (let y = y0 + 3; y + WIN_H <= y1; y += 14) {
      for (let x = x0 + 3; x + WIN_W <= x1; x += 11) {
        n++;
        if (hash(n * 7 + 1) < 0.34) continue;
        out.push({ p: [x, y], k: hash(n) });
      }
    }
  }
  return out.sort((a, b) => a.k - b.k).map((w) => w.p);
})();

/** The lead's route: ad → phone → calendar → CRM, each a point floating above the roofs. */
export const ANCHORS: Pt[] = [
  [214, 104],
  [520, 140],
  [1030, 100],
  [1304, 58],
];

/** Height of each hop's arc above its higher anchor. Kept low so the route stays under the story's step list. */
export const ARC_LIFT = 20;

export const windowsLit = (p: number, total: number) => Math.round(Math.min(1, Math.max(0, p)) * total);

/** Closed SVG path for a point list. */
export const toPath = (pts: Pt[]) => `M${pts.map((p) => p.join(" ")).join("L")}Z`;
