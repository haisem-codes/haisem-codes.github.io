"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";

type Mode = keyof Dictionary["cursor"];
const LERP = 0.22;

/** Decorative ring that trails the native cursor and turns into a labelled pill over `data-cursor` targets. */
export function Cursor({ dict }: { dict: Dictionary["cursor"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const to = { x: -100, y: -100 };
    const at = { ...to };
    let raf = 0;
    let visible = false;

    const step = () => {
      at.x += (to.x - at.x) * LERP;
      at.y += (to.y - at.y) * LERP;
      const done = Math.abs(to.x - at.x) < 0.1 && Math.abs(to.y - at.y) < 0.1;
      if (done) Object.assign(at, to);
      el.style.transform = `translate3d(${at.x}px,${at.y}px,0)`;
      raf = done ? 0 : requestAnimationFrame(step);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return setShown(false);
      if (!visible) Object.assign(at, { x: e.clientX, y: e.clientY });
      to.x = e.clientX;
      to.y = e.clientY;
      visible = true;
      setShown(true);
      if (!raf) raf = requestAnimationFrame(step);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-cursor]")?.getAttribute("data-cursor");
      setMode(t === "view" || t === "try" ? t : null);
    };
    const hide = () => {
      visible = false;
      setShown(false);
    };
    const leave = (e: PointerEvent) => {
      if (!e.relatedTarget) hide();
    };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", leave);
      removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] transition-opacity duration-[var(--dur-micro)]"
      style={{ opacity: shown ? 1 : 0, transform: "translate3d(-100px,-100px,0)" }}
    >
      <span
        className="absolute size-7 -translate-1/2 rounded-full border-[1.5px] border-[#38BDF8] transition-[scale,opacity] duration-[var(--dur-micro)] ease-[var(--ease-silk)]"
        style={{ scale: mode ? 2 : 1, opacity: mode ? 0 : 0.85 }}
      />
      <span
        className="absolute -translate-1/2 rounded-full bg-[#38BDF8] px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.16em] whitespace-nowrap text-[#04121C] uppercase shadow-[0_8px_24px_-8px_rgba(56,189,248,0.6)] transition-[scale,opacity] duration-[var(--dur-micro)] ease-[var(--ease-silk)]"
        style={{ scale: mode ? 1 : 0.4, opacity: mode ? 1 : 0 }}
      >
        {dict[mode ?? "view"]}
      </span>
    </div>
  );
}
