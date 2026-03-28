"use client";

import { motion } from "motion/react";
import { personal } from "@/data/personal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
            Let&apos;s build something
            <br />
            <span
              className="gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--color-accent), var(--color-accent-hover), var(--color-accent))",
              }}
            >
              extraordinary.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-text-secondary max-w-md mx-auto">
            Have an AI project in mind? I respond within hours and am happy to
            discuss your requirements before you commit.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {personal.socials.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target={social.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full glass text-sm font-medium text-text hover:text-accent transition-colors duration-200 min-w-[160px]"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px var(--color-accent-glow)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {social.platform}
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
