"use client";

import { motion } from "motion/react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function HowIWork({ dict }: { dict: Dictionary["how"]; lang: Locale }) {
  return (
    <section id="how" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-balance text-text sm:text-6xl">
            {dict.title}
          </h2>
        </ScrollReveal>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid sm:mt-20 lg:grid-cols-4"
        >
          {dict.steps.map((step, i) => {
            const last = i === dict.steps.length - 1;
            return (
              <motion.li key={step.title} variants={fadeInUp} className="relative pb-12 pl-16 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8">
                {!last && (
                  <span
                    aria-hidden
                    className="absolute top-11 bottom-0 left-[21.5px] w-px bg-border-hover lg:top-[21.5px] lg:right-0 lg:bottom-auto lg:left-11 lg:h-px lg:w-auto"
                  />
                )}
                <span className="absolute top-0 left-0 flex h-11 w-11 items-center justify-center rounded-full border border-border-hover bg-bg font-mono text-sm text-accent lg:static">
                  {i + 1}
                </span>
                <h3 className="pt-2 font-display text-xl font-semibold tracking-tight text-text lg:pt-8">{step.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-text-secondary">{step.body}</p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
