"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { readTier } from "@/lib/capability";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n";

const PICK = 1;
const LOOP_MS = 12000;
const TILT = 8;
/** ms at which each step is reached: ask, typing, offer, slots, pick-slot, pick-msg, typing, booked, crm */
const TIMELINE = [400, 1000, 1900, 2350, 3300, 3800, 4300, 5200, 5800];
const FINAL = TIMELINE.length;

export function DemoPhone({ dict, autoplay }: { dict: Dictionary["demoPhone"]; autoplay: boolean }) {
  const [step, setStep] = useState(FINAL);
  const rootRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const phone = phoneRef.current;
    if (!root || !phone || readTier() === "static") return;

    let timers: ReturnType<typeof setTimeout>[] = [];
    const stop = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const cycle = () => {
      stop();
      setStep(0);
      TIMELINE.forEach((at, i) => timers.push(setTimeout(() => setStep(i + 1), at)));
      timers.push(setTimeout(cycle, LOOP_MS));
    };
    if (autoplay) setStep(0);

    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      if (!autoplay) return;
      if (e.isIntersecting) cycle();
      else stop();
    });
    io.observe(root);

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      phone.style.setProperty("--ry", `${cx.toFixed(2)}deg`);
      phone.style.setProperty("--rx", `${cy.toFixed(2)}deg`);
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.02 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!inView.current) return;
      tx = (e.clientX / innerWidth - 0.5) * 2 * TILT;
      ty = -(e.clientY / innerHeight - 0.5) * 2 * TILT;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const fine = matchMedia("(pointer: fine)").matches;
    if (fine) addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop();
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, [autoplay]);

  const at = (n: number) => step >= n;
  const m = dict.messages;

  return (
    <figure ref={rootRef} aria-label={dict.ariaLabel} className="relative mx-auto w-[min(340px,84vw)]">
      <div
        ref={phoneRef}
        className="rounded-[42px] border border-[#1F2226] bg-[#050506] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_50px_90px_-30px_rgba(3,105,161,0.45),0_30px_60px_-30px_rgba(10,10,11,0.45)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_50px_90px_-30px_rgba(56,189,248,0.35)]"
        style={{
          transform: "perspective(1200px) rotateY(calc(-14deg + var(--ry, 0deg))) rotateX(calc(6deg + var(--rx, 0deg)))",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="flex min-h-[500px] flex-col rounded-[31px] bg-bg-card px-4 pt-3 pb-5 text-[13.5px] text-text"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span aria-hidden className="mx-auto mb-4 h-[22px] w-[84px] rounded-full bg-[#050506]" />
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-[0.08em] uppercase">
            <span className="text-text-secondary">
              {dict.business} · {dict.demoLabel}
            </span>
            <span className="flex items-center gap-1.5 text-live">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-live shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-live)_18%,transparent)]" />
              {dict.liveLabel}
            </span>
          </div>

          <div className="flex flex-col gap-2.5" style={{ transform: "translateZ(20px)" }}>
            <Reveal on={at(1)} className="self-end">
              <Bubble me>{m.ask}</Bubble>
            </Reveal>
            <div className="relative self-start">
              <Typing on={step === 2} />
              <Reveal on={at(3)}>
                <Bubble>{m.offer}</Bubble>
              </Reveal>
            </div>
            <Reveal on={at(4)} className="flex gap-1.5">
              {dict.slots.map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    "rounded-full border px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors duration-[var(--dur-ui)]",
                    i === PICK && at(5)
                      ? "border-live bg-live text-white dark:text-[#1A1205]"
                      : "border-border-hover text-text-secondary",
                  )}
                >
                  {s}
                </span>
              ))}
            </Reveal>
            <Reveal on={at(6)} className="self-end">
              <Bubble me>{m.pick}</Bubble>
            </Reveal>
            <div className="relative self-start">
              <Typing on={step === 7} />
              <Reveal on={at(8)}>
                <Bubble>{m.booked}</Bubble>
              </Reveal>
            </div>
          </div>

          <div
            className="mt-auto rounded-[14px] border border-border-hover bg-bg-card p-3 shadow-[0_24px_40px_-14px_rgba(10,10,11,0.35)] transition-[opacity,transform] duration-[var(--dur-ui)] ease-[var(--ease-silk)] dark:bg-[#0D0E10] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]"
            style={{
              opacity: at(9) ? 1 : 0,
              transform: at(9) ? "translateZ(40px) translateX(-26px)" : "translateZ(0) translateY(14px)",
            }}
          >
            <p className="mb-1.5 font-mono text-[11px] tracking-[0.08em] text-accent uppercase">{dict.crm.title}</p>
            <dl className="text-xs">
              <Row k={dict.crm.status} v={dict.crm.statusValue} />
              <Row k={dict.crm.reply} v={dict.crm.replyValue} />
              <Row k={dict.crm.summary} v={dict.crm.summaryValue} />
            </dl>
          </div>
        </div>
      </div>
    </figure>
  );
}

function Reveal({ on, className, children }: { on: boolean; className?: string; children: ReactNode }) {
  const style: CSSProperties = { opacity: on ? 1 : 0, transform: on ? "none" : "translateY(8px)" };
  return (
    <div className={cn("transition-[opacity,transform] duration-[var(--dur-ui)] ease-[var(--ease-silk)]", className)} style={style}>
      {children}
    </div>
  );
}

function Bubble({ me, children }: { me?: boolean; children: ReactNode }) {
  return (
    <p
      className={cn(
        "max-w-[16rem] rounded-2xl px-[13px] py-2.5 leading-[1.4]",
        me ? "rounded-br-[4px] bg-button text-button-text" : "rounded-bl-[4px] bg-[#EEF1F5] text-text dark:bg-[#1D1F23]",
      )}
    >
      {children}
    </p>
  );
}

function Typing({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className="absolute top-0 left-0 flex gap-1 rounded-2xl rounded-bl-[4px] bg-[#EEF1F5] px-3.5 py-3 transition-opacity duration-[var(--dur-ui)] dark:bg-[#1D1F23]"
      style={{ opacity: on ? 1 : 0 }}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="demo-dot h-1.5 w-1.5 rounded-full bg-text-secondary" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 py-[3px]">
      <dt className="text-text-secondary">{k}</dt>
      <dd className="font-medium text-text">{v}</dd>
    </div>
  );
}
