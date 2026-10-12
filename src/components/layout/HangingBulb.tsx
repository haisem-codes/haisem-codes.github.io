"use client";

import { useEffect, useRef, useState, type MouseEvent, type Ref } from "react";
import { animate, domMax, LazyMotion, m, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { cn } from "@/lib/utils";
import { CORD, GLASS_H, GLASS_W, SOCKET_H } from "@/lib/bulb";
import { useBulbToggle, useLatch, useStill, type BulbDict } from "@/components/layout/BulbCord";

const PULL = 40;
const MAX_PULL = 72;
const HINT_KEY = "lamp-hint-seen";
const SPRING_BACK = { type: "spring", stiffness: 420, damping: 14 } as const;

/** Desktop-only signature bulb. Loaded on demand so phones never download the drag physics. */
export function HangingBulb({ dict, retracted }: { dict: BulbDict; retracted: boolean }) {
  const { theme, toggleFrom } = useBulbToggle();
  const still = useStill();
  const glassRef = useRef<HTMLSpanElement>(null);
  const dragged = useRef(false);
  const swingDir = useRef(1);
  const latch = useLatch();
  const [hint, setHint] = useState(false);

  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const cordHeight = useTransform(y, (v) => CORD + v);

  useEffect(() => {
    try {
      if (localStorage.getItem(HINT_KEY)) return;
    } catch {
      return;
    }
    const show = setTimeout(() => setHint(true), 1200);
    const hide = setTimeout(() => {
      setHint(false);
      try {
        localStorage.setItem(HINT_KEY, "1");
      } catch {}
    }, 9000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const swing = (velocity: number) => {
    if (still) return;
    animate(rotate, 0, { type: "spring", stiffness: 80, damping: 4, velocity });
  };

  const flip = () => {
    setHint(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
    toggleFrom(glassRef.current);
    swingDir.current *= -1;
    swing(swingDir.current * 70);
  };

  const onClick = (e: MouseEvent) => {
    if (dragged.current && e.detail !== 0) return;
    if (!latch()) return;
    if (still) return flip();
    animate(y, 18, { duration: 0.12, ease: "easeOut" }).then(() => {
      flip();
      animate(y, 0, SPRING_BACK);
    });
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (y.get() >= PULL && latch()) {
      swingDir.current = info.velocity.x < 0 ? 1 : -1;
      flip();
    }
    if (still) y.set(0);
    else animate(y, 0, SPRING_BACK);
  };

  return (
    <LazyMotion features={domMax}>
      <div
        className="bulb-in pointer-events-none absolute top-full left-[calc(50%+var(--bulb-dx))] hidden lg:block"
        style={{ clipPath: "inset(0 -100vw -100vh -100vw)" }}
      >
        <div
          inert={retracted}
          className="transition-[translate,opacity] duration-[var(--dur-ui)] ease-[var(--ease-silk)]"
          style={{ translate: retracted ? `0 -${CORD + 96}px` : "0 0", opacity: retracted ? 0 : 1 }}
        >
          <m.div className="relative" style={{ rotate, transformOrigin: "50% 0" }}>
            {/* ceiling rose: where the cord meets the nav */}
            <span aria-hidden className="absolute -top-px left-0 h-[6px] w-4 -translate-x-1/2 rounded-b-full bg-text/80" />

            <m.span
              aria-hidden
              className="absolute top-0 left-0 w-[2px] -translate-x-1/2 rounded-full bg-linear-to-b from-text/70 to-text/50 dark:from-[#7DD3FC]/35 dark:to-[#7DD3FC]/60"
              style={{ height: cordHeight }}
            />

            <m.button
              type="button"
              aria-pressed={theme === "dark"}
              aria-label={dict.nightMode}
              className="pointer-events-auto absolute left-0 flex w-14 -translate-x-1/2 cursor-grab touch-none flex-col items-center rounded-full pb-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:cursor-grabbing"
              style={{ top: CORD, y }}
              drag="y"
              dragConstraints={{ top: 0, bottom: MAX_PULL }}
              dragElastic={0.12}
              dragMomentum={false}
              onPointerDown={() => (dragged.current = false)}
              onDragStart={() => (dragged.current = true)}
              onDragEnd={onDragEnd}
              onClick={onClick}
              onHoverStart={() => swing(swingDir.current * 18)}
            >
              <Socket />
              <Glass ref={glassRef} />
            </m.button>

            <m.span
              aria-hidden
              className={cn(
                "absolute left-0 -translate-x-1/2 font-mono text-[11px] tracking-[0.18em] whitespace-nowrap text-text-secondary uppercase transition-opacity duration-500 dark:text-[#7DD3FC]/80",
                hint ? "opacity-100" : "opacity-0",
              )}
              style={{ top: CORD + SOCKET_H + GLASS_H + 14, y }}
            >
              {dict.pullHint}
            </m.span>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}

function Socket() {
  return (
    <span aria-hidden className="flex flex-col items-center" style={{ height: SOCKET_H }}>
      <span className="h-[8px] w-[16px] rounded-t-[4px] bg-linear-to-b from-[#5A5D66] to-[#3A3C43]" />
      <span className="h-[4px] w-[21px] bg-[#2E3036]" />
      <span className="h-[4px] w-[19px] bg-[#45474F]" />
      <span className="h-[4px] w-[21px] bg-[#2E3036]" />
    </span>
  );
}

function Glass({ ref }: { ref: Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "relative -mt-px block transition-[background,box-shadow] duration-500",
        "[background:radial-gradient(circle_at_45%_62%,#FFFFFF_0%,#E0F2FE_26%,#7DD3FC_66%,#38BDF8_100%)]",
        "shadow-[0_0_8px_2px_rgba(56,189,248,0.6),0_0_26px_8px_rgba(56,189,248,0.38),0_0_64px_18px_rgba(56,189,248,0.2)]",
        "dark:[background:radial-gradient(circle_at_45%_60%,rgba(224,242,254,0.55)_0%,rgba(125,211,252,0.32)_42%,rgba(56,189,248,0.16)_100%)]",
        "dark:shadow-[inset_0_0_0_1px_rgba(125,211,252,0.5),0_0_10px_2px_rgba(125,211,252,0.32),0_0_40px_10px_rgba(56,189,248,0.14)]",
      )}
      style={{ width: GLASS_W, height: GLASS_H, borderRadius: "38% 38% 50% 50% / 26% 26% 74% 74%" }}
    >
      <svg viewBox="0 0 34 42" className="absolute inset-0 h-full w-full" fill="none" strokeLinecap="round">
        <g className="stroke-[#0369A1] transition-[stroke] duration-500 [filter:drop-shadow(0_0_2px_rgba(14,165,233,0.9))] dark:stroke-[#BAE6FD] dark:[filter:drop-shadow(0_0_2px_rgba(125,211,252,0.7))]">
          <path d="M14 0v20M20 0v20" strokeWidth="1" />
          <path d="M14 20q1 -3 2 0t2 0t2 0" strokeWidth="1.4" />
        </g>
        <path d="M9 9q-2 6 0 13" stroke="white" strokeOpacity="0.55" strokeWidth="2" className="dark:[stroke-opacity:0.3]" />
      </svg>
    </span>
  );
}
