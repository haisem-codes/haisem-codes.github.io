"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { readTier, type Tier } from "@/lib/capability";
import { clampPct, scoreAt } from "@/lib/slider";
import { cn } from "@/lib/utils";

export type Score = { label: string; from: number; to: number };

export type SliderText = {
  concept: string;
  conceptNote: string;
  before: string;
  after: string;
  sliderLabel: string;
  valueText: string;
  hint: string;
  scoresLabel: string;
  scoresNote: string;
  from: string;
};

const START = 50;
const RING = 2 * Math.PI * 26;

const chip =
  "pointer-events-none absolute rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] shadow-sm ring-1 ring-black/5";

function ConceptChip({ label }: { label: string }) {
  return <span className={cn(chip, "top-2 right-2 z-20 bg-accent-tint text-accent sm:top-3 sm:right-3")}>{label}</span>;
}

function SideChip({ label, side }: { label: string; side: "left" | "right" }) {
  return (
    <span className={cn(chip, "bottom-2 bg-bg-card/90 text-text backdrop-blur-sm sm:bottom-3", side === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3")}>
      {label}
    </span>
  );
}

function Dial({ label, value, caption }: { label: string; value: number; caption: string }) {
  const tone = value >= 90 ? "text-accent" : value >= 50 ? "text-live" : "text-danger";
  return (
    <li className="flex flex-col items-center gap-2 text-center lg:flex-row lg:gap-4 lg:text-left">
      <span className="relative size-16 shrink-0 sm:size-[72px]">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r="26" fill="none" strokeWidth="5" className="stroke-text/10" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING * (1 - value / 100)}
            className={cn(tone, "stroke-current transition-[stroke-dashoffset,color] duration-150 ease-out motion-reduce:transition-none")}
          />
        </svg>
        <span aria-hidden className="absolute inset-0 grid place-items-center font-mono text-lg font-medium tabular-nums text-text sm:text-xl">
          {value}
        </span>
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-text">{label}</span>
        <span aria-hidden className="font-mono text-xs tabular-nums text-text-secondary">
          {caption}
        </span>
      </span>
    </li>
  );
}

function Dials({ scores, values, captions, t }: { scores: Score[]; values: number[]; captions: string[]; t: SliderText }) {
  const list = (pick: (s: Score) => number) => scores.map((s) => `${s.label} ${pick(s)}`).join(", ");
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">{t.scoresLabel}</p>
      <ul className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-6">
        {scores.map((s, i) => (
          <Dial key={s.label} label={s.label} value={values[i]} caption={captions[i]} />
        ))}
      </ul>
      <p className="sr-only">
        {t.before}: {list((s) => s.from)}. {t.after}: {list((s) => s.to)}.
      </p>
      <p className="mt-5 text-sm leading-relaxed text-text-secondary">{t.scoresNote}</p>
    </div>
  );
}

const frame = "overflow-hidden rounded-2xl border border-border bg-bg-card p-1.5 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)] dark:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]";

export function BeforeAfterSlider({ before, after, scores, t }: { before: ReactNode; after: ReactNode; scores: Score[]; t: SliderText }) {
  const [tier, setTier] = useState<Tier>("full");
  const [pct, setPct] = useState(START);
  const [dragging, setDragging] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);

  useEffect(() => setTier(readTier()), []);

  if (tier === "static") {
    return (
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center lg:gap-14">
        <div>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
            {[
              { img: before, label: t.before },
              { img: after, label: t.after },
            ].map(({ img, label }) => (
              <figure key={label}>
                <div className={frame}>
                  <div className="relative aspect-[8/5] overflow-hidden rounded-[11px]">
                    {img}
                    <ConceptChip label={t.concept} />
                  </div>
                </div>
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">{label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 font-mono text-xs text-text-secondary">{t.conceptNote}</p>
        </div>
        <Dials scores={scores} values={scores.map((s) => s.to)} captions={scores.map((s) => `${t.from} ${s.from}`)} t={t} />
      </div>
    );
  }

  const shown = 100 - pct;
  const now = Math.round(pct);
  const valueText = t.valueText.replace("{before}", String(now)).replace("{after}", String(100 - now));

  const fromX = (clientX: number) => {
    const r = track.current?.getBoundingClientRect();
    if (r && r.width > 0) setPct(clampPct(((clientX - r.left) / r.width) * 100));
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    fromX(e.clientX);
    handle.current?.focus({ preventScroll: true });
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    setDragging(true);
    fromX(e.clientX);
  };
  const end = () => setDragging(false);
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5;
    const next: Record<string, number> = {
      ArrowLeft: pct - step,
      ArrowDown: pct - step,
      ArrowRight: pct + step,
      ArrowUp: pct + step,
      PageDown: pct - 10,
      PageUp: pct + 10,
      Home: 0,
      End: 100,
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    setPct(clampPct(Math.round(next[e.key])));
  };
  const glide = dragging ? "" : "duration-200 ease-out motion-reduce:transition-none";

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center lg:gap-14">
      <div>
        <div className={frame}>
          <div
            ref={track}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
            className="relative aspect-[8/5] cursor-ew-resize touch-pan-y overflow-hidden rounded-[11px] select-none [&_img]:pointer-events-none"
            style={{ "--pct": `${pct}%` } as CSSProperties}
          >
            <div className="absolute inset-0">
              {after}
              <SideChip label={t.after} side="right" />
            </div>
            <div
              className={cn("absolute inset-0 transition-[clip-path]", glide)}
              style={{ clipPath: "inset(0 calc(100% - var(--pct)) 0 0)" }}
            >
              {before}
              <SideChip label={t.before} side="left" />
            </div>
            <ConceptChip label={t.concept} />
            <div
              ref={handle}
              role="slider"
              tabIndex={0}
              aria-label={t.sliderLabel}
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={now}
              aria-valuetext={valueText}
              onKeyDown={key}
              className={cn("group absolute inset-y-0 z-10 flex w-11 -translate-x-1/2 justify-center outline-none transition-[left]", glide)}
              style={{ left: "var(--pct)" }}
            >
              <span aria-hidden className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(10,10,11,0.18)]" />
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0A0A0B] shadow-[0_8px_24px_rgba(10,10,11,0.3)] ring-1 ring-black/10 group-focus-visible:outline-3 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-1 font-mono text-xs text-text-secondary sm:flex-row sm:justify-between sm:gap-6">
          <p>{t.conceptNote}</p>
          <p aria-hidden>{t.hint}</p>
        </div>
      </div>
      <Dials
        scores={scores}
        values={scores.map((s) => scoreAt(shown, s.from, s.to))}
        captions={scores.map((s) => `${s.from} → ${s.to}`)}
        t={t}
      />
    </div>
  );
}
