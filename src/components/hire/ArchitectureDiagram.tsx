import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";

type SystemDict = Dictionary["hire"]["system"];
type Box = { x: number; y: number };
type Edge = { x1: number; y1: number; x2: number; y2: number };
type Layout = { w: number; h: number; node: { w: number; h: number }; at: Box[]; edges: Edge[]; sub: string };

const CAPTION_ID = "arch-caption";

/** The line stops short of the tip so the arrowhead, drawn per edge, can appear once its line has drawn in. */
function edgePaths({ x1, y1, x2, y2 }: Edge) {
  const dx = Math.sign(x2 - x1);
  const dy = Math.sign(y2 - y1);
  const line = `M${x1} ${y1}L${x2 - dx * 7} ${y2 - dy * 7}`;
  const bx = x2 - dx * 8;
  const by = y2 - dy * 8;
  const head = `M${x2} ${y2}L${bx - dy * 4} ${by + dx * 4}L${bx + dy * 4} ${by - dx * 4}z`;
  return { line, head };
}

const AGENT = 2;

/** Desktop: a U-shaped flow, three nodes out along the top and three back along the bottom. */
const WIDE: Layout = (() => {
  const node = { w: 230, h: 72 };
  const col = [0, 305, 610];
  const at = [
    { x: col[0], y: 8 },
    { x: col[1], y: 8 },
    { x: col[2], y: 8 },
    { x: col[2], y: 152 },
    { x: col[1], y: 152 },
    { x: col[0], y: 152 },
  ];
  const mid = (b: Box) => b.y + node.h / 2;
  const edges = [
    { x1: at[0].x + node.w, y1: mid(at[0]), x2: at[1].x - 5, y2: mid(at[0]) },
    { x1: at[1].x + node.w, y1: mid(at[1]), x2: at[2].x - 5, y2: mid(at[1]) },
    { x1: at[2].x + node.w / 2, y1: at[2].y + node.h, x2: at[2].x + node.w / 2, y2: at[3].y - 5 },
    { x1: at[3].x, y1: mid(at[3]), x2: at[4].x + node.w + 5, y2: mid(at[3]) },
    { x1: at[4].x, y1: mid(at[4]), x2: at[5].x + node.w + 5, y2: mid(at[4]) },
  ];
  return { w: 840, h: 232, node, at, edges, sub: "text-[10.5px]" };
})();

/** Phones: one column, so labels stay at their full size at 390px. */
const TALL: Layout = (() => {
  const node = { w: 300, h: 64 };
  const at = Array.from({ length: 6 }, (_, i) => ({ x: 20, y: 6 + i * 98 }));
  const cx = at[0].x + node.w / 2;
  const edges = at.slice(0, -1).map((b, i) => ({ x1: cx, y1: b.y + node.h, x2: cx, y2: at[i + 1].y - 5 }));
  return { w: 340, h: at[5].y + node.h + 6, node, at, edges, sub: "text-[11.5px]" };
})();

function Graph({ layout, dict, className }: { layout: Layout; dict: SystemDict; className: string }) {
  const { node } = layout;
  return (
    <svg viewBox={`0 0 ${layout.w} ${layout.h}`} className={className} role="img" aria-label={dict.diagramLabel} aria-describedby={CAPTION_ID}>
      {layout.edges.map((e, i) => {
        const { line, head } = edgePaths(e);
        return (
          <g key={line} style={{ "--i": i } as CSSProperties}>
            <path d={line} pathLength={1} className="arch-line" />
            <path d={line} className="arch-flow" />
            <path d={head} className="arch-head fill-accent" />
          </g>
        );
      })}
      {dict.nodes.map((n, i) => {
        const b = layout.at[i];
        const agent = i === AGENT;
        return (
          <g key={n.title} transform={`translate(${b.x} ${b.y})`}>
            <rect width={node.w} height={node.h} rx={6} className={agent ? "arch-node arch-agent" : "arch-node"} />
            <text x={18} y={node.h / 2 - 3} className="fill-accent font-mono text-[11px]">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={50} y={node.h / 2 - 3} className="fill-text font-display text-[16px] font-semibold">
              {n.title}
            </text>
            <text x={50} y={node.h / 2 + 16} className={`fill-text-secondary font-mono ${layout.sub} tracking-[0.08em] uppercase`}>
              {n.sub}
            </text>
            {agent && (
              <g transform={`translate(${node.w - 22} 18)`}>
                <circle r={4} className="arch-pulse fill-live" />
                <circle r={4} className="fill-live" />
                <text x={-10} y={4} textAnchor="end" className="fill-live font-mono text-[10.5px] font-medium">
                  {dict.liveLabel}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Lead → GoHighLevel → voice agent → n8n tools → calendar → follow-up. Connectors draw in on view (CSS only); the caption carries the same flow in words. */
export function ArchitectureDiagram({ dict }: { dict: SystemDict }) {
  return (
    <figure className="arch border border-border bg-accent-tint/55 dark:bg-accent-tint/30">
      <div className="px-4 py-6 sm:px-8 sm:py-10">
        <Graph layout={WIDE} dict={dict} className="hidden h-auto w-full md:block" />
        <Graph layout={TALL} dict={dict} className="mx-auto block h-auto w-full max-w-[22rem] md:hidden" />
      </div>
      <figcaption id={CAPTION_ID} className="border-t border-border px-4 py-5 text-base leading-relaxed text-text-secondary sm:px-8">
        <span className="mr-2 font-mono text-xs tracking-[0.14em] text-text uppercase">{dict.diagramLabel}.</span>
        {dict.caption}
      </figcaption>
    </figure>
  );
}
