"use client";

import { motion } from "motion/react";

export function SoundWave() {
  const bars = [0.3, 0.6, 1, 0.7, 0.4, 0.8];

  return (
    <div className="flex items-end justify-center gap-1 h-10 sm:h-16">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-accent/60"
          animate={{ scaleY: [0.3, height, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{ height: "100%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}
