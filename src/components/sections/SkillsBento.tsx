import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

type SkillsDict = Dictionary["hire"]["skills"];
type Tile = SkillsDict["tiles"][number];

/** Spend rises per step, then flattens under the cap. Shape only; no data. */
function Cap({ dict }: { dict: SkillsDict }) {
  return (
    <svg aria-hidden viewBox="0 0 240 72" className="h-[72px] w-full max-w-[264px] overflow-visible">
      <path d="M0 14H240" className="stroke-text-secondary" strokeDasharray="4 4" strokeWidth={1.25} fill="none" />
      <text x={240} y={8} textAnchor="end" className="fill-text-secondary font-mono text-[10px] tracking-[0.12em] uppercase">
        {dict.cap}
      </text>
      <path d="M0 70L40 58L80 40L120 22L150 15H240" pathLength={1} className="dash-line stroke-accent" strokeWidth={2} fill="none" />
    </svg>
  );
}

function Wave() {
  return (
    <div aria-hidden className="flex h-[72px] items-center gap-1.5">
      {[0.35, 0.6, 1, 0.75, 0.45, 0.85, 0.55, 0.3, 0.7, 0.5].map((h, i) => (
        <span key={i} className="dash-wave block w-1.5 rounded-full bg-live" style={{ height: `${h * 100}%`, "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

/** The app stack as layers or a pipeline as steps, top to bottom. Layers repeat the tile's copy, so they stay hidden from screen readers. */
function Layers({ layers, hidden = true, className }: { layers: string[]; hidden?: boolean; className?: string }) {
  return (
    <ol aria-hidden={hidden || undefined} className={cn("border-t border-border font-mono text-[11px] tracking-[0.08em] text-text-secondary", className)}>
      {layers.map((l, i) => (
        <li key={l} className="flex items-center gap-3 border-b border-border py-2">
          <span className={cn("h-2 w-2 shrink-0", i === layers.length - 1 ? "bg-accent" : "bg-border-hover")} />
          {l}
        </li>
      ))}
    </ol>
  );
}

function Viz({ id, dict }: { id: string; dict: SkillsDict }) {
  if (id === "cost") return <Cap dict={dict} />;
  if (id === "voice") return <Wave />;
  return null;
}

function SkillTile({ tile, dict }: { tile: Tile; dict: SkillsDict }) {
  return (
    <li className="flex flex-col gap-6 bg-bg-card p-6 sm:p-7">
      <div>
        <h3 className="font-display text-xl leading-tight font-semibold tracking-[-0.01em] text-text">{tile.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{tile.body}</p>
      </div>
      {"steps" in tile && tile.steps && <Layers layers={tile.steps} hidden={false} className="mt-auto" />}
      <Viz id={tile.id} dict={dict} />
      {"layers" in tile && tile.layers && <Layers layers={tile.layers} />}
      <ul className={cn("flex flex-wrap gap-1.5", !("steps" in tile) && "mt-auto")}>
        {tile.items.map((item) => (
          <li key={item} className="border border-border-hover px-2 py-1 font-mono text-[11px] leading-none text-text-secondary">
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Skills as small dashboards: each tile shows the shape of a system it was used in, not a number. */
export function SkillsBento({ dict }: { dict: SkillsDict }) {
  return (
    <ul className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {dict.tiles.map((tile) => (
        <SkillTile key={tile.id} tile={tile} dict={dict} />
      ))}
    </ul>
  );
}
