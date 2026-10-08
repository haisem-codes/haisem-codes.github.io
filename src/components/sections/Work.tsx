"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { ProjectCategory } from "@/types";
import { projects, localize } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { silkEase } from "@/lib/animations";

type Filter = "all" | ProjectCategory;
const filters: Filter[] = ["all", "business", "products", "research"];
const sorted = [...projects].sort((a, b) => a.order - b.order);

export function Work({ dict, lang }: { dict: Dictionary["work"]; lang: Locale }) {
  const [active, setActive] = useState<Filter>("all");
  const shown = sorted.filter((p) => active === "all" || p.category === active);

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-6xl">{dict.title}</h2>
        </ScrollReveal>

        <div role="group" aria-label={dict.filterLabel} className="mt-10 flex flex-wrap gap-2 sm:mt-14">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className="min-h-[44px] cursor-pointer rounded-full border border-border px-5 text-sm text-text-secondary transition-colors duration-200 hover:border-border-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white"
            >
              {dict.filters[f]}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: silkEase }}
              >
                <ProjectCard
                  project={localize(p, lang)}
                  lang={lang}
                  viewLabel={dict.view}
                  employerNote={dict.employerNote}
                  eager={i < 3}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
