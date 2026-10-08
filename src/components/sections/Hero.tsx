"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { silkEase } from "@/lib/animations";
import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero({ dict, lang }: { dict: Dictionary["hero"]; lang: Locale }) {
  const reduce = useReducedMotion();
  const words = dict.title.split(" ");
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { delay, duration: 0.8, ease: silkEase },
  });
  const wordsDone = 0.2 + words.length * 0.04;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-6 pt-32 pb-20 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{ background: "radial-gradient(60% 50% at 75% 40%, var(--color-accent-glow) 0%, transparent 70%)" }}
      />
      <div data-hero-3d aria-hidden className="pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p {...fade(0)} className="flex items-center gap-3 text-sm font-medium tracking-wide text-text-secondary">
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
          {dict.eyebrow}
        </motion.p>

        <h1 className="mt-8 max-w-5xl font-display text-[2.6rem] leading-[1.04] font-semibold tracking-tight text-balance text-text sm:text-7xl lg:text-[5.5rem]">
          {words.map((word, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={reduce ? { duration: 0 } : { delay: 0.2 + i * 0.04, duration: 0.7, ease: silkEase }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        <motion.p {...fade(wordsDone)} className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
          {dict.sub}
        </motion.p>

        <motion.div {...fade(wordsDone + 0.15)} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Magnetic>
            <a
              href={localHref(lang, "/start/")}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-accent px-7 text-base font-medium text-white shadow-[0_8px_30px_-12px_var(--color-accent)] transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.ctaPrimary}
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={localHref(lang, "/hire/")}
              className="group inline-flex min-h-[44px] items-center gap-2 text-base font-medium text-text underline decoration-border-hover decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.ctaSecondary}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
