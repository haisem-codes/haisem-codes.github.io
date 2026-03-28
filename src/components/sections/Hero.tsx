"use client";

import { motion } from "motion/react";
import { letterReveal, silkEase } from "@/lib/animations";
import { personal } from "@/data/personal";

export function Hero() {
  const letters = personal.firstName.split("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent-glow) 0%, transparent 70%)",
        }}
      />

      {/* Name - letter by letter */}
      <div className="relative z-10 flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterReveal}
            initial="hidden"
            animate="visible"
            className="font-display text-6xl sm:text-8xl lg:text-[10rem] font-bold text-text tracking-tight"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="relative z-10 mt-6 text-lg sm:text-xl text-text-secondary font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: silkEase }}
      >
        {personal.title} &mdash; {personal.tagline}
      </motion.p>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-10 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-text-secondary"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
