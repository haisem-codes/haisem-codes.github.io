"use client";

import { useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { capList } from "@/lib/worklist";

/** Compact project list: every row is in the HTML, rows past `cap` stay `hidden` until expanded in place. */
export function WorkList({
  rows,
  cap,
  title,
  more,
  fewer,
}: {
  rows: { slug: string; row: ReactNode }[];
  cap: number;
  title: string;
  /** Toggle label with `{n}` for the number of rows it reveals. */
  more: string;
  fewer: string;
}) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const raf = useRef(0);
  const listId = useId();
  const state = capList(rows.length, cap, open);

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

  const toggle = () => {
    const opening = !open;
    setOpen(opening);
    if (!opening) return;
    requestAnimationFrame(() => listRef.current?.children[state.firstRevealed]?.querySelector("a")?.focus());
  };

  return (
    <div>
      <h3 className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{title}</h3>
      <ul id={listId} ref={listRef} onPointerMove={track} className="relative mt-6 border-b border-border">
        {rows.map((p, i) => (
          <li
            key={p.slug}
            hidden={state.hidden[i]}
            className={i >= cap ? "animate-[work-row-in_.5s_var(--ease-silk)_both] motion-reduce:animate-none" : undefined}
          >
            {p.row}
          </li>
        ))}
      </ul>
      {state.more > 0 && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={toggle}
          className="group mt-8 inline-flex min-h-[48px] cursor-pointer items-center gap-3 rounded-full border border-border-hover px-6 text-sm font-medium text-text transition-colors duration-200 hover:border-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {open ? fewer : more.replace("{n}", String(state.more))}
          <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-aria-expanded:-rotate-90 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      )}
    </div>
  );
}
