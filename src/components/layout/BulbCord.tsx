"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { readTier } from "@/lib/capability";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { Dictionary } from "@/i18n";

export type BulbDict = Pick<Dictionary["nav"], "nightMode" | "pullHint">;

const SETTLE_MS = 800;

/** Blocks re-entry while a pull, tug or reveal is still playing out. */
export function useLatch() {
  const held = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return () => {
    if (held.current) return false;
    held.current = true;
    timer.current = setTimeout(() => (held.current = false), SETTLE_MS);
    return true;
  };
}

export function useStill() {
  const [still, setStill] = useState(true);
  useEffect(() => setStill(readTier() === "static"), []);
  return still;
}

export function useBulbToggle() {
  const { theme, toggleTheme } = useTheme();
  const toggleFrom = useCallback(
    (el: Element | null) => {
      if (!el) return toggleTheme();
      const r = el.getBoundingClientRect();
      toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    },
    [toggleTheme],
  );
  return { theme, toggleFrom };
}

/** Compact bulb in the nav: phones, and desktop once the hanging bulb has retracted. */
export function BulbCord({ dict, retracted }: { dict: BulbDict; retracted: boolean }) {
  const { theme, toggleFrom } = useBulbToggle();
  const still = useStill();
  const latch = useLatch();
  const ref = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const onClick = () => {
    if (!latch()) return;
    toggleFrom(ref.current);
    if (!still)
      svgRef.current?.animate(
        [{ transform: "none" }, { transform: "translateY(5px)", offset: 0.25 }, { transform: "translateY(-2px)", offset: 0.6 }, { transform: "none" }],
        { duration: 520, easing: "ease-out" },
      );
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={theme === "dark"}
      aria-label={dict.nightMode}
      onClick={onClick}
      className={cn(
        "flex h-11 w-11 cursor-pointer items-start justify-center rounded-full text-text-secondary hover:text-text focus-visible:outline-2 focus-visible:outline-accent",
        "transition-[color,opacity,visibility] duration-[var(--dur-ui)]",
        !retracted && "lg:invisible lg:opacity-0",
      )}
    >
      <svg ref={svgRef} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className="-mt-1">
        <path d="M12 0v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 9h4v2.5h-4z" fill="currentColor" />
        <path
          d="M12 11.5c-3.2 0-5 2.3-5 5 0 2.6 2.2 4.5 5 4.5s5-1.9 5-4.5c0-2.7-1.8-5-5-5Z"
          className="fill-[#7DD3FC] stroke-[#38BDF8] transition-[fill] duration-300 [filter:drop-shadow(0_0_6px_rgba(56,189,248,0.8))] dark:fill-[#7DD3FC]/25 dark:stroke-[#7DD3FC]/70 dark:[filter:drop-shadow(0_0_4px_rgba(125,211,252,0.45))]"
          strokeWidth="1.2"
        />
      </svg>
    </button>
  );
}
