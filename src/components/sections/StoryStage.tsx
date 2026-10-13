"use client";

import { lazy, Suspense, useCallback, useRef, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import type { Tier } from "@/lib/capability";
import type { SkylineProgress } from "@/components/three/SkylineLayer";
import { StoryTimeline } from "./StoryTimeline";

const SkylineLayer = lazy(() => import("@/components/three/SkylineLayer"));

/** The 21:40 story with the night skyline behind its pinned stage; `still` is the server-rendered fallback skyline. */
export function StoryStage({ dict, frames, still }: { dict: Dictionary["story"]; frames: ReactNode[]; still: ReactNode }) {
  const progress = useRef<SkylineProgress>({ current: 0 }).current;
  const onProgress = useCallback(
    (p: number) => {
      progress.current = p;
      progress.listen?.(p);
    },
    [progress],
  );
  const backdrop = useCallback(
    (tier: Tier) => (
      <Suspense fallback={null}>
        <SkylineLayer tier={tier} progress={progress} />
      </Suspense>
    ),
    [progress],
  );
  return <StoryTimeline dict={dict} frames={frames} still={still} backdrop={backdrop} onProgress={onProgress} />;
}
