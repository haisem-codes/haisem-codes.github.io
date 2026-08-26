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
        {personal.title} <span className="mx-2 text-text-muted">•</span> {personal.tagline}
      </motion.p>

      {/* Location + availability */}
      <motion.div
        className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: silkEase }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-border text-text-secondary">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-accent"
            aria-hidden
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {personal.location}
        </span>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-border text-text-secondary">
          <span className="relative flex w-2 h-2" aria-hidden>
            <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-70 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
          </span>
          {personal.availability}
        </span>
      </motion.div>

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
