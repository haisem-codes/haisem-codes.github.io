"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const STRENGTH = 0.25;

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.translate = `${(e.clientX - (r.left + r.width / 2)) * STRENGTH}px ${(e.clientY - (r.top + r.height / 2)) * STRENGTH}px`;
  }

  function reset() {
    if (ref.current) ref.current.style.translate = "";
  }

  return (
    <span
      ref={ref}
      className={cn("inline-block transition-[translate] duration-300 ease-[var(--ease-silk)]", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </span>
  );
}
