"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type Ref } from "react";
import { animate, motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { cn } from "@/lib/utils";
import { readTier } from "@/lib/capability";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { Dictionary } from "@/i18n";

type BulbDict = Pick<Dictionary["nav"], "nightMode" | "pullHint">;

const CORD = 40;
const PULL = 40;
const MAX_PULL = 72;
const RETRACT_AT = 80;
const HINT_KEY = "lamp-hint-seen";

const SPRING_BACK = { type: "spring", stiffness: 420, damping: 14 } as const;
const SETTLE_MS = 800;

export function useBulbRetracted() {
  const [retracted, setRetracted] = useState(false);
  useEffect(() => {
    const onScroll = () => setRetracted((r) => (r ? scrollY > RETRACT_AT / 2 : scrollY > RETRACT_AT));
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return retracted;
}

/** Blocks re-entry while a pull, tug or reveal is still playing out. */
function useLatch() {
  const held = useRef(false);
  return () => {
    if (held.current) return false;
    held.current = true;
    setTimeout(() => (held.current = false), SETTLE_MS);
    return true;
  };
}

function useStill() {
  const [still, setStill] = useState(true);
  useEffect(() => setStill(readTier() === "static"), []);
  return still;
}

function useBulbToggle() {
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

export function HangingBulb({ dict }: { dict: BulbDict }) {
  const { theme, toggleFrom } = useBulbToggle();
  const still = useStill();
  const glassRef = useRef<HTMLSpanElement>(null);
  const dragged = useRef(false);
  const swingDir = useRef(1);
  const retracted = useBulbRetracted();
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
    const show = setTimeout(() => setHint(true), 2000);
    const hide = setTimeout(() => {
      setHint(false);
      try {
        localStorage.setItem(HINT_KEY, "1");
      } catch {}
    }, 8000);
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
    <div
      className="pointer-events-none absolute top-full left-[24%] hidden lg:block"
      style={{ clipPath: "inset(0 -100vw -100vh -100vw)" }}
    >
      <div
        inert={retracted}
        className="transition-[translate,opacity] duration-[var(--dur-ui)] ease-[var(--ease-silk)]"
        style={{ translate: retracted ? `0 -${CORD + 72}px` : "0 0", opacity: retracted ? 0 : 1 }}
      >
        <motion.div className="relative" style={{ rotate, transformOrigin: "50% 0" }}>
          {/* ceiling rose: where the cord meets the nav */}
          <span aria-hidden className="absolute -top-px left-0 h-[5px] w-3 -translate-x-1/2 rounded-b-full bg-text/80" />

          <motion.span
            aria-hidden
            className="absolute top-0 left-0 w-[2px] -translate-x-1/2 rounded-full bg-linear-to-b from-text/80 to-text/55"
            style={{ height: cordHeight }}
          />

          {/* light cone: only while lit (light theme) */}
          <motion.span
            aria-hidden
            className="absolute left-0 -translate-x-1/2 opacity-100 blur-2xl transition-opacity duration-500 dark:opacity-0"
            style={{ top: CORD + 34, y }}
          >
            <span
              className="block h-[min(72vh,640px)] w-[min(64vw,820px)]"
              style={{
                clipPath: "polygon(47% 0, 53% 0, 100% 100%, 0 100%)",
                background: "linear-gradient(to bottom, rgba(56,189,248,0.10) 0%, rgba(56,189,248,0.04) 55%, transparent 92%)",
              }}
            />
          </motion.span>

          <motion.button
            type="button"
            aria-pressed={theme === "dark"}
            aria-label={dict.nightMode}
            className="pointer-events-auto absolute left-0 flex w-11 -translate-x-1/2 cursor-grab touch-none flex-col items-center rounded-full pb-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:cursor-grabbing"
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
          </motion.button>

          <span
            aria-hidden
            className={cn(
              "absolute left-6 font-mono text-[11px] whitespace-nowrap text-text-secondary transition-opacity duration-500",
              hint ? "opacity-80" : "opacity-0",
            )}
            style={{ top: CORD + 24 }}
          >
            ← {dict.pullHint}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function Socket() {
  return (
    <span aria-hidden className="flex flex-col items-center">
      <span className="h-[6px] w-[12px] rounded-t-[3px] bg-linear-to-b from-[#5A5D66] to-[#3A3C43]" />
      <span className="h-[3px] w-[16px] bg-[#2E3036]" />
      <span className="h-[3px] w-[15px] bg-[#45474F]" />
      <span className="h-[3px] w-[16px] bg-[#2E3036]" />
    </span>
  );
}

function Glass({ ref }: { ref: Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "relative -mt-px block h-[42px] w-[34px] transition-[background,box-shadow] duration-500",
        "[background:radial-gradient(circle_at_45%_62%,#FFFFFF_0%,#E0F2FE_24%,#7DD3FC_64%,#38BDF8_100%)]",
        "shadow-[0_0_6px_1px_rgba(56,189,248,0.55),0_0_18px_5px_rgba(56,189,248,0.35),0_0_44px_12px_rgba(56,189,248,0.22),0_0_96px_28px_rgba(56,189,248,0.12)]",
        "dark:[background:radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.10)_0%,rgba(125,211,252,0.05)_55%,rgba(125,211,252,0.02)_100%)]",
        "dark:shadow-[inset_0_0_0_1px_rgba(125,211,252,0.28),inset_0_-8px_12px_rgba(0,0,0,0.4)]",
      )}
      style={{ borderRadius: "38% 38% 50% 50% / 26% 26% 74% 74%" }}
    >
      <svg viewBox="0 0 34 42" className="absolute inset-0 h-full w-full" fill="none" strokeLinecap="round">
        <g className="stroke-[#0369A1] transition-[stroke] duration-500 [filter:drop-shadow(0_0_2px_rgba(14,165,233,0.9))] dark:stroke-[#5B6170] dark:[filter:none]">
          <path d="M14 0v20M20 0v20" strokeWidth="1" />
          <path d="M14 20q1 -3 2 0t2 0t2 0" strokeWidth="1.4" />
        </g>
        <path d="M9 9q-2 6 0 13" stroke="white" strokeOpacity="0.55" strokeWidth="2" className="dark:[stroke-opacity:0.18]" />
      </svg>
    </span>
  );
}

export function BulbCord({ dict }: { dict: BulbDict }) {
  const { theme, toggleFrom } = useBulbToggle();
  const still = useStill();
  const retracted = useBulbRetracted();
  const latch = useLatch();
  const ref = useRef<HTMLButtonElement>(null);
  const y = useMotionValue(0);

  const onClick = () => {
    if (!latch()) return;
    if (still) return toggleFrom(ref.current);
    animate(y, 5, { duration: 0.1, ease: "easeOut" }).then(() => {
      toggleFrom(ref.current);
      animate(y, 0, SPRING_BACK);
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={theme === "dark"}
      aria-label={dict.nightMode}
      onClick={onClick}
      className={cn(
        "h-9 w-9 cursor-pointer items-start justify-center rounded-full text-text-secondary hover:text-text focus-visible:outline-2 focus-visible:outline-accent",
        "flex transition-[color,opacity,visibility] duration-[var(--dur-ui)]",
        !retracted && "lg:invisible lg:opacity-0",
      )}
    >
      <motion.svg style={{ y }} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="-mt-0.5">
        <path d="M12 0v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 9h4v2.5h-4z" fill="currentColor" />
        <path
          d="M12 11.5c-3.2 0-5 2.3-5 5 0 2.6 2.2 4.5 5 4.5s5-1.9 5-4.5c0-2.7-1.8-5-5-5Z"
          className="fill-[#7DD3FC] stroke-[#38BDF8] transition-[fill] duration-300 [filter:drop-shadow(0_0_4px_rgba(56,189,248,0.7))] dark:fill-transparent dark:stroke-current dark:[filter:none]"
          strokeWidth="1.2"
        />
      </motion.svg>
    </button>
  );
}
