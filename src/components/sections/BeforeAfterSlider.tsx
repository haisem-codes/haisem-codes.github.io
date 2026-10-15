"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { readTier, type Tier } from "@/lib/capability";
import { clampPct, dragIntent, scoreAt } from "@/lib/slider";
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
  hintTouch: string;
  scoresLabel: string;
  scoresNote: string;
  from: string;
  compareLabel: string;
};

/** Starts left of centre so the redesign's headline is in view before anyone drags. */
const START = 42;
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
  const tone = value >= 50 ? "text-accent" : "text-text-secondary";
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

type Props = { before: ReactNode; after: ReactNode; scores: Score[]; t: SliderText };
type PhoneProps = { beforePhone: ReactNode; afterPhone: ReactNode; scores: Score[]; t: SliderText };

function StaticView({ before, after, scores, t }: Props) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center lg:gap-14">
      <div>
        <div className="grid grid-cols-2 gap-4">
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

function Slider({ before, after, scores, t }: Props) {
  const [pct, setPct] = useState(START);
  const [dragging, setDragging] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; dragging: boolean } | null>(null);

  const shown = 100 - pct;
  const now = Math.round(pct);
  const valueText = t.valueText.replace("{before}", String(now)).replace("{after}", String(100 - now));

  const fromX = (clientX: number) => {
    const r = track.current?.getBoundingClientRect();
    if (r && r.width > 0) setPct(clampPct(((clientX - r.left) / r.width) * 100));
  };
  /** Mouse jumps on press. Touch waits for a clearly horizontal drag (or a press on the handle), so scrolling past the slider leaves it alone. */
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      if (e.button !== 0) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dragging: true };
      fromX(e.clientX);
      handle.current?.focus({ preventScroll: true });
      return;
    }
    const onHandle = !!handle.current?.contains(e.target as Node);
    gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dragging: onHandle };
    if (onHandle) e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    if (!g.dragging) {
      const intent = dragIntent(e.clientX - g.x, e.clientY - g.y);
      if (intent === "pending") return;
      if (intent === "scroll") {
        gesture.current = null;
        return;
      }
      g.dragging = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setDragging(true);
    fromX(e.clientX);
  };
  const end = () => {
    gesture.current = null;
    setDragging(false);
  };
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
              className={cn("group absolute inset-y-0 z-10 flex w-11 -translate-x-1/2 touch-none justify-center outline-none transition-[left]", glide)}
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
          <p aria-hidden>
            <span className="sm:[@media(pointer:fine)]:hidden">{t.hintTouch}</span>
            <span className="hidden sm:[@media(pointer:fine)]:inline">{t.hint}</span>
          </p>
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

/** Phones get phone-sized renders and a Before/After toggle instead of a 300px-wide slider. No motion is needed, so every tier uses it. */
function PhoneCompare({ beforePhone, afterPhone, scores, t }: PhoneProps) {
  const [side, setSide] = useState<"before" | "after">("after");
  const after = side === "after";
  const layer = "absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none";
  return (
    <div className="grid gap-10">
      <div>
        <div role="group" aria-label={t.compareLabel} className="grid grid-cols-2 rounded-full border border-border bg-bg-card p-1">
          {(["before", "after"] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={side === s}
              onClick={() => setSide(s)}
              className="min-h-[44px] cursor-pointer rounded-full font-mono text-xs tracking-[0.14em] text-text-secondary uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:bg-text aria-pressed:text-bg"
            >
              {t[s]}
            </button>
          ))}
        </div>
        <div className={cn(frame, "mt-4")}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[11px]">
            <div aria-hidden={after} className={cn(layer, after ? "opacity-0" : "opacity-100")}>
              {beforePhone}
            </div>
            <div aria-hidden={!after} className={cn(layer, after ? "opacity-100" : "opacity-0")}>
              {afterPhone}
            </div>
            <ConceptChip label={t.concept} />
          </div>
        </div>
        <p className="mt-4 font-mono text-xs text-text-secondary">{t.conceptNote}</p>
      </div>
      <Dials
        scores={scores}
        values={scores.map((s) => (after ? s.to : s.from))}
        captions={scores.map((s) => `${s.from} → ${s.to}`)}
        t={t}
      />
    </div>
  );
}

/**
 * Below md: the phone toggle. From md: the slider, or side-by-side stills for the static tier. Before hydration
 * both md+ layouts render and CSS picks one by reduced motion, so the static tier rarely swaps layout.
 */
export function BeforeAfterSlider(props: Props & PhoneProps) {
  const [tier, setTier] = useState<Tier | null>(null);
  useEffect(() => setTier(readTier()), []);
  const isStatic = tier === "static";
  return (
    <>
      <div className="md:hidden">
        <PhoneCompare {...props} />
      </div>
      <div className={cn("hidden", tier === null ? "md:block md:motion-reduce:hidden" : !isStatic && "md:block")}>
        {!isStatic && <Slider {...props} />}
      </div>
      <div className={cn("hidden", tier === null ? "md:motion-reduce:block" : isStatic && "md:block")}>
        {(tier === null || isStatic) && <StaticView {...props} />}
      </div>
    </>
  );
}
