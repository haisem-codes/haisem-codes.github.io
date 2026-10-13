"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { readTier, type Tier } from "@/lib/capability";
import type { StoryPinnedProps } from "./StoryPinned";

type Story = Dictionary["story"];

/** Below this viewport height the pinned stage cannot show a frame legibly, so the storyboard is used. */
const PIN_MIN_HEIGHT = "(min-height: 600px)";

function Heading({ dict }: { dict: Story }) {
  return (
    <div className="max-w-2xl">
      <h3 className="font-display text-3xl font-semibold tracking-tight text-balance text-text sm:text-4xl">{dict.title}</h3>
      <p className="mt-3 text-lg text-text-secondary">{dict.note}</p>
    </div>
  );
}

function Storyboard({ dict, frames, still }: { dict: Story; frames: ReactNode[]; still?: ReactNode }) {
  return (
    <>
      <p className="mt-8 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-text-secondary uppercase">
        {dict.ui.business}
        <span className="rounded-full border border-border-hover px-2 py-0.5 text-[10px]">{dict.ui.demo}</span>
      </p>
      <ol className="mt-4 grid gap-5 md:grid-cols-2 md:gap-6">
        {dict.steps.map((s, i) => (
          <li key={s.title} className="flex flex-col rounded-[28px] border border-border bg-[#0D0E10] p-5 sm:p-6">
            <p className="font-mono text-xs tracking-[0.1em] text-live tabular-nums">{dict.clocks[i]}</p>
            <h4 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">{s.title}</h4>
            <p className="mt-2 text-base leading-relaxed text-text-secondary">{s.body}</p>
            <div aria-hidden className="mt-6 flex flex-1 items-center justify-center">
              {frames[i]}
            </div>
          </li>
        ))}
      </ol>
      {still && (
        <div aria-hidden className="relative left-1/2 mt-12 h-40 w-screen -translate-x-1/2 sm:h-56">
          {still}
        </div>
      )}
    </>
  );
}

type StoryTimelineProps = {
  dict: Story;
  frames: ReactNode[];
  onProgress?: (p: number) => void;
  /** Shown under the storyboard (static tier, short viewports). */
  still?: ReactNode;
  /** Rendered behind the pinned stage once the story is near. */
  backdrop?: StoryPinnedProps["backdrop"];
};

export function StoryTimeline({ dict, frames, onProgress, still, backdrop }: StoryTimelineProps) {
  const root = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<Tier>("static");
  const [Pinned, setPinned] = useState<ComponentType<StoryPinnedProps> | null>(null);
  const anchor = useRef<number | null>(null);
  const toStatic = useRef(() => setTier("static")).current;

  useEffect(() => {
    const t = readTier();
    if (t === "static") return;
    setTier(t);
    const mql = matchMedia(PIN_MIN_HEIGHT);
    let alive = true;
    const apply = () => {
      if (!mql.matches) return setPinned(null);
      import("./StoryPinned")
        .then((m) => {
          if (!alive || !mql.matches) return;
          const bottom = root.current?.getBoundingClientRect().bottom ?? 1;
          anchor.current = bottom <= 0 ? bottom : null;
          setPinned(() => m.default);
        })
        .catch(toStatic);
    };
    apply();
    mql.addEventListener("change", apply);
    return () => {
      alive = false;
      mql.removeEventListener("change", apply);
    };
  }, [toStatic]);

  // The storyboard and the pinned track differ in height; when the story sits above the viewport (hash link, reload
  // mid-page) keep whatever the reader was looking at in place.
  useLayoutEffect(() => {
    const before = anchor.current;
    anchor.current = null;
    if (before === null || !root.current) return;
    const delta = root.current.getBoundingClientRect().bottom - before;
    if (delta) window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
  }, [Pinned]);

  const pinned = tier !== "static" && Pinned;
  return (
    <div ref={root} id="story" className="scroll-mt-24">
      <Heading dict={dict} />
      {pinned ? (
        <Pinned dict={dict} frames={frames} tier={tier} onProgress={onProgress} onFail={toStatic} backdrop={backdrop} />
      ) : (
        <Storyboard dict={dict} frames={frames} still={still} />
      )}
    </div>
  );
}
