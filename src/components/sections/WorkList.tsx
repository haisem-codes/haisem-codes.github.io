"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { ProjectCategory } from "@/types";

type Filter = "all" | ProjectCategory;
const order: Filter[] = ["all", "business", "products", "research"];

export function WorkList({
  items,
  title,
  filterLabel,
  filterNames,
}: {
  items: { slug: string; category: ProjectCategory; row: ReactNode }[];
  title: string;
  filterLabel: string;
  filterNames: Record<Filter, string>;
}) {
  const [active, setActive] = useState<Filter>("all");
  const listRef = useRef<HTMLUListElement>(null);
  const raf = useRef(0);
  const filters = order.filter((f) => f === "all" || items.some((p) => p.category === f));
  const shown = items.filter((p) => active === "all" || p.category === active);

  const track = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = listRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
    });
  };

  return (
    <div className="mt-24 sm:mt-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">{title}</h3>
        <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className="min-h-[40px] cursor-pointer rounded-full border border-border px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors duration-200 hover:border-border-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:border-text aria-pressed:bg-text aria-pressed:text-bg"
            >
              {filterNames[f]}
            </button>
          ))}
        </div>
      </div>
      <ul ref={listRef} onPointerMove={track} className="relative mt-8 border-b border-border">
        {shown.map((p) => (
          <li key={`${active}-${p.slug}`} className="animate-[work-row-in_.5s_var(--ease-silk)_both] motion-reduce:animate-none">
            {p.row}
          </li>
        ))}
      </ul>
    </div>
  );
}
