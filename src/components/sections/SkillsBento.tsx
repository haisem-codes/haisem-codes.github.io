import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

type SkillsDict = Dictionary["hire"]["skills"];
type Tile = SkillsDict["tiles"][number];

/** Before/after bars for a reduction; "after" is the share that remains. */
function Drop({ after, dict }: { after: number; dict: SkillsDict }) {
  return (
    <div aria-hidden className="space-y-2 font-mono text-[11px] tracking-[0.12em] text-text-secondary uppercase">
      {[
        { k: dict.before, w: 1, cls: "bg-border-hover" },
        { k: dict.after, w: after, cls: "bg-accent" },
      ].map((b) => (
        <div key={b.k} className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
          <span>{b.k}</span>
          <span className="h-2 bg-border">
            <span className={cn("dash-fill block h-full origin-left", b.cls)} style={{ width: `${b.w * 100}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** One dot per endpoint: 22 × 6 = 132, drawn by a repeating gradient. */
function Dots() {
  return (
    <div
      aria-hidden
      className="dash-reveal h-[72px] w-[264px] max-w-full"
      style={{ background: "radial-gradient(circle, var(--color-accent) 2px, transparent 2.5px) 0 0 / 12px 12px" }}
    />
  );
}

/** Spend rises per step, then flattens under the cap. Shape only; no data. */
function Cap({ dict }: { dict: SkillsDict }) {
  return (
    <svg aria-hidden viewBox="0 0 240 72" className="h-[72px] w-full max-w-[264px] overflow-visible">
      <path d="M0 14H240" className="stroke-live" strokeDasharray="4 4" strokeWidth={1.25} fill="none" />
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

function Viz({ id, dict }: { id: string; dict: SkillsDict }) {
  if (id === "rag") return <Drop after={0.6} dict={dict} />;
  if (id === "docai") return <Drop after={0.2} dict={dict} />;
  if (id === "api") return <Dots />;
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
      {"value" in tile && (
        <div className="mt-auto">
          <p className="font-display text-5xl leading-none font-bold tracking-[-0.04em] text-text tabular-nums">{tile.value}</p>
          <p className="mt-2 text-sm leading-snug text-text-secondary">{tile.label}</p>
        </div>
      )}
      <Viz id={tile.id} dict={dict} />
      <ul className={cn("flex flex-wrap gap-1.5", !("value" in tile) && "mt-auto")}>
        {tile.items.map((item) => (
          <li key={item} className="border border-border-hover px-2 py-1 font-mono text-[11px] leading-none text-text-secondary">
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Skills as small dashboards: each figure is a CV metric (at Metaviz), drawn as a CSS or SVG chart. */
export function SkillsBento({ dict }: { dict: SkillsDict }) {
  return (
    <ul className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {dict.tiles.map((tile) => (
        <SkillTile key={tile.id} tile={tile} dict={dict} />
      ))}
    </ul>
  );
}
