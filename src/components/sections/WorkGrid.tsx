"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import type { ProjectCategory } from "@/types";
import { silkEase } from "@/lib/animations";

type Filter = "all" | ProjectCategory;
const filters: Filter[] = ["all", "business", "products", "research"];

const layoutFeatures = () => import("@/lib/motion-features-max").then((mod) => mod.default);

export function WorkGrid({
  items,
  filterLabel,
  filterNames,
}: {
  items: { slug: string; category: ProjectCategory; card: ReactNode }[];
  filterLabel: string;
  filterNames: Record<Filter, string>;
}) {
  const [active, setActive] = useState<Filter>("all");
  const shown = items.filter((p) => active === "all" || p.category === active);

  return (
    <>
      <div role="group" aria-label={filterLabel} className="mt-10 flex flex-wrap gap-2 sm:mt-14">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className="min-h-[44px] cursor-pointer rounded-full border border-border px-5 text-sm text-text-secondary transition-colors duration-200 hover:border-border-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white"
          >
            {filterNames[f]}
          </button>
        ))}
      </div>

      <LazyMotion features={layoutFeatures}>
        <m.ul layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <m.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: silkEase }}
              >
                {p.card}
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </LazyMotion>
    </>
  );
}
