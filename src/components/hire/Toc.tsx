"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { pickActive } from "@/lib/toc";

type Item = { id: string; index: string; label: string };

/** Desktop table of contents. Observers only fire when a heading crosses the reading line; the rail fills to the active entry. */
export function Toc({ items, label, nav }: { items: Item[]; label: string; nav: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => el !== null);
    const end = document.querySelector("[data-toc-end]");
    const update = () => {
      const root = document.documentElement;
      const atBottom = innerHeight + root.scrollTop >= root.scrollHeight - 8;
      setActive(pickActive(sections.map((s) => s.getBoundingClientRect().top), innerHeight * 0.35, atBottom));
    };
    const line = new IntersectionObserver(update, { rootMargin: "-35% 0px -64% 0px" });
    const bottom = new IntersectionObserver(update, { threshold: [0, 1] });
    sections.forEach((s) => line.observe(s));
    if (end) bottom.observe(end);
    update();
    addEventListener("resize", update, { passive: true });
    return () => {
      line.disconnect();
      bottom.disconnect();
      removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label={nav}>
      <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{label}</p>
      <div className="relative mt-5">
        <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-border-hover" />
        <span
          aria-hidden
          className="toc-fill absolute inset-y-0 left-0 w-px origin-top bg-accent"
          style={{ "--p": items.length ? (active + 1) / items.length : 0 } as CSSProperties}
        />
        <ol>
          {items.map((it, i) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={i === active ? "location" : undefined}
                className="group flex items-baseline gap-3 py-2 pl-5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="font-mono text-xs text-accent tabular-nums">{it.index}</span>
                <span className={i === active ? "font-medium text-text" : "text-text-secondary group-hover:text-text"}>{it.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
