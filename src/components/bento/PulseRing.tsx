"use client";

import { motion } from "motion/react";

export function PulseRing() {
  return (
    <div className="relative flex items-center justify-center h-16">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-full border border-accent/30"
          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="w-3 h-3 rounded-full bg-accent/60" />
    </div>
  );
}
