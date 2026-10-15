"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { markRevealReady } from "@/lib/reveal";

const features = () =>
  import("@/lib/motion-features").then((mod) => {
    markRevealReady("motion-ready");
    return mod.default;
  });

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
