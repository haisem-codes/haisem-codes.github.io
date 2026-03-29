"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { silkEase } from "@/lib/animations";

export function FillingChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const heights = [0.4, 0.7, 0.5, 0.9, 0.6];

  return (
    <div ref={ref} className="flex items-end justify-center gap-1.5 h-10 sm:h-16">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-t bg-accent/50"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: silkEase,
          }}
          style={{
            height: `${h * 100}%`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}
