"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Services({ dict }: { dict: Dictionary["services"]; lang: Locale }) {
  return (
    <section id="services" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance text-text sm:text-6xl">
            {dict.title}
          </h2>
        </ScrollReveal>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2 md:gap-6"
        >
          {dict.items.map((item, i) => (
            <motion.li
              key={item.id}
              variants={fadeInUp}
              className="flex flex-col rounded-3xl border border-border bg-bg-card p-8 transition-colors duration-300 hover:border-border-hover sm:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <span aria-hidden className="font-mono text-sm text-text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.id === "website" && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent-glow px-3 py-1 text-xs font-medium text-text">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {dict.exampleNote}
                  </span>
                )}
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight font-semibold tracking-tight text-text sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">{item.problem}</p>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {item.get.map((g) => (
                  <li key={g} className="flex gap-3 text-base leading-relaxed text-text">
                    <svg aria-hidden viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    {g}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8">
                <span className="inline-flex rounded-full border border-border px-3 py-1 text-sm text-text-secondary">
                  {item.time}
                </span>
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <ScrollReveal>
          <p className="mt-10 text-lg text-text-secondary">{dict.pricing}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
