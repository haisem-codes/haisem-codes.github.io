import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";

type SystemDict = Dictionary["hire"]["system"];
type Box = { x: number; y: number };
type Layout = { w: number; h: number; node: { w: number; h: number }; at: Box[]; edges: string[]; sub: string };

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
    `M${at[0].x + node.w} ${mid(at[0])}H${at[1].x - 6}`,
    `M${at[1].x + node.w} ${mid(at[1])}H${at[2].x - 6}`,
    `M${at[2].x + node.w / 2} ${at[2].y + node.h}V${at[3].y - 6}`,
    `M${at[3].x} ${mid(at[3])}H${at[4].x + node.w + 6}`,
    `M${at[4].x} ${mid(at[4])}H${at[5].x + node.w + 6}`,
  ];
  return { w: 840, h: 232, node, at, edges, sub: "text-[10.5px]" };
})();

/** Phones: one column, so labels stay at their full size at 390px. */
const TALL: Layout = (() => {
  const node = { w: 300, h: 64 };
  const at = Array.from({ length: 6 }, (_, i) => ({ x: 20, y: 6 + i * 98 }));
  const edges = at.slice(0, -1).map((b, i) => `M${b.x + node.w / 2} ${b.y + node.h}V${at[i + 1].y - 6}`);
  return { w: 340, h: at[5].y + node.h + 6, node, at, edges, sub: "text-[11.5px]" };
})();

function Graph({ layout, dict, className }: { layout: Layout; dict: SystemDict; className: string }) {
  const { node } = layout;
  const id = layout === WIDE ? "w" : "t";
  return (
    <svg viewBox={`0 0 ${layout.w} ${layout.h}`} className={className} role="img" aria-label={dict.diagramLabel}>
      <defs>
        <marker id={`arch-head-${id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 0L8 4L0 8z" className="fill-accent" />
        </marker>
      </defs>
      {layout.edges.map((d, i) => (
        <g key={d} style={{ "--i": i } as CSSProperties}>
          <path d={d} pathLength={1} className="arch-line" markerEnd={`url(#arch-head-${id})`} />
          <path d={d} className="arch-flow" />
        </g>
      ))}
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
      <figcaption className="border-t border-border px-4 py-5 text-base leading-relaxed text-text-secondary sm:px-8">
        <span className="mr-2 font-mono text-xs tracking-[0.14em] text-text uppercase">{dict.diagramLabel}.</span>
        {dict.caption}
      </figcaption>
    </figure>
  );
}
