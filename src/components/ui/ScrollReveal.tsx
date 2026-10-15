"use client";

import { m, type Variants } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { useEffect, type ReactNode } from "react";
import { markRevealReady, SCROLL_REVEAL } from "@/lib/reveal";

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  variants = fadeInUp,
  className,
  delay = 0,
}: ScrollRevealProps) {
  useEffect(() => markRevealReady("reveal-ready"), []);
  return (
    <m.div
      data-reveal={SCROLL_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </m.div>
  );
}
