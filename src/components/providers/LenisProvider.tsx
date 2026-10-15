"use client";

import { useEffect, type ReactNode } from "react";
import type Lenis from "lenis";
import { readTier } from "@/lib/capability";
import { advancePhase } from "@/lib/velocity";

let instance: Lenis | null = null;

/** The running smooth-scroll instance, if it has loaded yet. */
export const getLenis = () => instance;

/** Smooth scroll is an enhancement, so its library loads after hydration instead of in the initial bundle. */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (readTier() === "static") {
      document.documentElement.classList.add("tier-static");
      return;
    }
    let cancelled = false;
    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        instance = new Lenis({ autoRaf: true, lerp: 0.1, duration: 1.2, smoothWheel: true, wheelMultiplier: 1 });
        // Scroll velocity drives elements with the `velocity` class through `--scroll-phase`, written only on scroll frames.
        const targets = document.getElementsByClassName("velocity") as HTMLCollectionOf<HTMLElement>;
        let phase = 0;
        let last = performance.now();
        instance.on("scroll", ({ velocity }) => {
          const now = performance.now();
          phase = advancePhase(phase, velocity, now - last);
          last = now;
          for (const el of targets) el.style.setProperty("--scroll-phase", phase.toFixed(4));
        });
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== "production") console.error(err);
      });
    return () => {
      cancelled = true;
      instance?.destroy();
      instance = null;
    };
  }, []);
  return children;
}
