"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { silkEase } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className }: SectionHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-text"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: silkEase }}
      >
        {title}
      </motion.h2>
      <svg
        className="mt-3"
        width="60"
        height="2"
        viewBox="0 0 60 2"
        fill="none"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="60"
          y2="1"
          stroke="var(--color-accent)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, ease: silkEase, delay: 0.2 }}
        />
      </svg>
    </div>
  );
}
