"use client";

import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type { Tier } from "@/lib/capability";
import { SkylineSvg } from "./SkylineSvg";
import { WINDOWS, windowsLit } from "./skylineData";

/**
 * Story progress (0..1) shared by ref. `listen` lets the SVG re-render only when the lit count changes;
 * `wake` asks the on-demand canvas for a frame.
 */
export type SkylineProgress = { current: number; listen?: (p: number) => void; wake?: () => void };

type Night = ComponentType<{ progress: SkylineProgress; onReady?: () => void; onFail?: () => void }>;

/** Below lg the stage card hides most of the band, so the scene is not worth its download or GPU time. */
const SCENE_MIN = "(min-width: 1024px)";

class Fallback extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const N = WINDOWS.length;

/** Pinned-stage backdrop: three.js on full-tier desktops (SVG until the canvas is up, and if WebGL fails), SVG otherwise. */
export default function SkylineLayer({ tier, progress }: { tier: Tier; progress: SkylineProgress }) {
  const [lit, setLit] = useState(() => windowsLit(progress.current, N));
  const [Night, setNight] = useState<Night | null>(null);
  const [ready, setReady] = useState(false);
  const svgLive = useRef(true);
  svgLive.current = !ready;

  useEffect(() => {
    progress.listen = (p) => svgLive.current && setLit(windowsLit(p, N));
    return () => {
      progress.listen = undefined;
    };
  }, [progress]);

  useEffect(() => {
    if (tier !== "full" || !matchMedia(SCENE_MIN).matches) return;
    let alive = true;
    import("./NightSkyline")
      .then((m) => alive && setNight(() => m.default))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [tier]);

  const fail = () => {
    setReady(false);
    setNight(null);
    setLit(windowsLit(progress.current, N));
  };

  return (
    <>
      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 0 : 1 }}>
        <SkylineSvg litRatio={lit / N} />
      </div>
      {Night && (
        <Fallback onError={fail}>
          <Night progress={progress} onReady={() => setReady(true)} onFail={fail} />
        </Fallback>
      )}
    </>
  );
}
