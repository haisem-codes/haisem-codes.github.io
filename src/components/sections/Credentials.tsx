"use client";

import { motion } from "motion/react";
import { credentials } from "@/data/credentials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function Credentials() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Credentials" className="mb-16" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {credentials.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-bg-card border border-border hover:border-border-hover transition-colors duration-200"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  {item.label}
                </span>
                <span className="font-mono text-xs text-text-secondary whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              <h3 className="mt-3 text-base font-semibold text-text leading-snug">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {item.institution}
              </p>
              {item.detail && (
                <p className="mt-3 pt-3 border-t border-border text-xs text-text-secondary">
                  {item.detail}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
