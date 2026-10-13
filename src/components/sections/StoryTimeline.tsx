"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { readTier, type Tier } from "@/lib/capability";
import { ClientBoundary } from "@/components/ui/ClientBoundary";
import type { StoryPinnedProps } from "./StoryPinned";

type Story = Dictionary["story"];

/** Below this viewport height the pinned stage cannot show a frame legibly, so the storyboard is used. */
const PIN_MIN_HEIGHT = "(min-height: 600px)";

const SAVED_Y = "story-pinned-y";

/**
 * On reload and back/forward, the offset the reader left at (saved with the pinned layout in place), else null.
 * Browsers restore that offset inconsistently while the shorter storyboard is still shown, so it is re-applied after
 * the first swap. One-shot: the key is removed on read, so later swaps (rotation) fall back to bottom anchoring.
 */
function takeSavedOffset(): number | null {
  try {
    const raw = sessionStorage.getItem(SAVED_Y);
    sessionStorage.removeItem(SAVED_Y);
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type !== "reload" && nav?.type !== "back_forward") return null;
    const saved = JSON.parse(raw ?? "null") as { path: string; y: number } | null;
    return saved?.path === location.pathname ? saved.y : null;
  } catch {
    return null;
  }
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
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">{s.title}</h3>
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
  const anchor = useRef<{ el: Element; top: number } | { y: number } | null>(null);
  const toStatic = useRef(() => setTier("static")).current;
  const pinnedOn = useRef(false);

  useEffect(() => {
    const t = readTier();
    if (t === "static") return;
    setTier(t);
    const mql = matchMedia(PIN_MIN_HEIGHT);
    let alive = true;
    let saved = takeSavedOffset();
    // With the story above the viewport, whatever sits at the viewport's top edge is below it: keep that still.
    const hold = () => {
      if ((root.current?.getBoundingClientRect().bottom ?? 1) > 0) return (anchor.current = null);
      const el = document.elementFromPoint(innerWidth / 2, 1) ?? root.current!;
      anchor.current = { el, top: el.getBoundingClientRect().top };
    };
    const apply = () => {
      if (!mql.matches) return setPinned(null);
      import("./StoryPinned")
        .then((m) => {
          if (!alive || !mql.matches) return;
          hold();
          if (anchor.current && saved !== null) anchor.current = { y: saved };
          saved = null;
          setPinned(() => m.default);
        })
        .catch(toStatic);
    };
    const save = () => {
      if (!pinnedOn.current) return;
      try {
        sessionStorage.setItem(SAVED_Y, JSON.stringify({ path: location.pathname, y: scrollY }));
      } catch {}
    };
    apply();
    mql.addEventListener("change", apply);
    addEventListener("pagehide", save);
    return () => {
      alive = false;
      mql.removeEventListener("change", apply);
      removeEventListener("pagehide", save);
    };
  }, [toStatic]);

  useEffect(() => {
    pinnedOn.current = tier !== "static" && Pinned !== null;
  }, [tier, Pinned]);

  // The storyboard and the pinned track differ in height. With the story above the viewport, the swap to the pinned
  // track (hash link, rotating back) keeps what the reader sees in place; a reload or back/forward returns to the
  // saved offset once.
  useLayoutEffect(() => {
    const before = anchor.current;
    anchor.current = null;
    if (before === null || ("el" in before && !before.el.isConnected)) return;
    const top = "y" in before ? before.y : window.scrollY + before.el.getBoundingClientRect().top - before.top;
    if (top !== window.scrollY) window.scrollTo({ top, behavior: "instant" });
  }, [Pinned]);

  const pinned = tier !== "static" && Pinned;
  return (
    <div ref={root} id="story" className="scroll-mt-24">
      {pinned ? (
        <ClientBoundary onError={toStatic}>
          <Pinned dict={dict} frames={frames} tier={tier} onProgress={onProgress} onFail={toStatic} backdrop={backdrop} />
        </ClientBoundary>
      ) : (
        <Storyboard dict={dict} frames={frames} still={still} />
      )}
    </div>
  );
}
