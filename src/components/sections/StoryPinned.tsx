"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import type { Tier } from "@/lib/capability";
import { storyClock, storyProgress } from "@/lib/story";
import { cn } from "@/lib/utils";
import { getLenis } from "@/components/providers/LenisProvider";

type Story = Dictionary["story"];

type Gsap = typeof import("gsap").gsap;

function buildTimeline(gsap: Gsap, root: HTMLElement, track: HTMLElement, onUpdate: (p: number) => void) {
  const q = gsap.utils.selector(root);
  const typed = q("[data-type]") as HTMLElement[];
  const full = typed.map((el) => el.dataset.full ?? "");
  const total = full.reduce((n, s) => n + s.length, 0);
  const typing = { n: 0 };
  const type = () => {
    let left = Math.round(typing.n * total);
    typed.forEach((el, i) => {
      const take = Math.min(full[i].length, Math.max(0, left));
      el.textContent = full[i].slice(0, take);
      left -= full[i].length;
    });
  };

  const tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.25 },
    scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 0.6 },
    onUpdate: () => onUpdate(tl.progress()),
  });
  const panel = q("[data-panel]");
  tl.to(typing, { n: 1, duration: 0.55, ease: "none", onUpdate: type }, 0.05);
  tl.from(q("[data-s=sent]"), { autoAlpha: 0, scale: 0.92 }, 0.62);
  for (let i = 0; i < 3; i++) {
    tl.to(panel[i], { autoAlpha: 0, y: -28, scale: 0.96, duration: 0.22, ease: "power2.in" }, i + 0.7);
    tl.fromTo(panel[i + 1], { autoAlpha: 0, y: 36, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.25 }, i + 0.78);
  }
  tl.fromTo(q("[data-s=calling]"), { opacity: 1 }, { opacity: 0, duration: 0.1 }, 1.25)
    .from(q("[data-s=connected]"), { opacity: 0, duration: 0.1 }, 1.3)
    .from(q("[data-s=bar]"), { scaleY: 0.12, duration: 0.3, stagger: { each: 0.008, from: "center" } }, 1.28)
    .from(q("[data-s=line]"), { autoAlpha: 0, y: 14 }, 1.4)
    .from(q("[data-s=booking]"), { autoAlpha: 0, y: -56, scale: 1.08, duration: 0.3, ease: "back.out(1.7)" }, 2.1)
    .from(q("[data-s=confirmed]"), { autoAlpha: 0, y: 8 }, 2.4)
    .from(q("[data-s=old]"), { y: -50, duration: 0.3 }, 3.08)
    .from(q("[data-s=row]"), { autoAlpha: 0, x: 60, duration: 0.3 }, 3.1)
    .from(q("[data-s=pill]"), { autoAlpha: 0, scale: 0.6, duration: 0.15, ease: "back.out(2)" }, 3.35)
    .from(q("[data-s=tag]"), { autoAlpha: 0, y: 8, stagger: 0.06 }, 3.45)
    .from(q("[data-s=summary]"), { autoAlpha: 0, y: 8 }, 3.6)
    .to({}, { duration: 0.1 }, 3.9);
  return () => typed.forEach((el, i) => (el.textContent = full[i]));
}

export default function StoryPinned({
  dict,
  frames,
  tier,
  onProgress,
  onFail,
}: {
  dict: Story;
  frames: ReactNode[];
  tier: Tier;
  onProgress?: (p: number) => void;
  onFail: () => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const rail = useRef<HTMLSpanElement[]>([]);
  const report = useRef(onProgress);
  report.current = onProgress;
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let undo: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !stage.current || !track.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = getLenis();
        const unsync = lenis?.on("scroll", () => ScrollTrigger.update());
        const update = (p: number) => {
          const { progress } = storyProgress(p);
          setActive(Math.min(3, Math.round(progress) - 1));
          if (clock.current) clock.current.textContent = storyClock(p, dict.clocks);
          rail.current.forEach((r, i) => (r.style.transform = `scaleX(${Math.min(1, Math.max(0, p * 4 - i))})`));
          report.current?.(p);
        };
        let restore: () => void = () => {};
        const ctx = gsap.context(() => {
          restore = buildTimeline(gsap, stage.current!, track.current!, update);
        }, stage.current);
        undo = () => {
          unsync?.();
          ctx.revert();
          restore();
        };
      })
      .catch(onFail);
    return () => {
      cancelled = true;
      undo?.();
    };
  }, [near, dict.clocks, onFail]);

  return (
    <div ref={track} data-pinned className="relative mt-8" style={{ height: tier === "full" ? "300vh" : "200vh" }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center pt-28 pb-6 lg:pt-24 lg:pb-10">
        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-14">
          <ol className="max-lg:sr-only">
            {dict.steps.map((s, i) => (
              <li
                key={s.title}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "relative border-l py-4 pl-6 transition-[opacity,border-color] duration-[var(--dur-ui)]",
                  i === active ? "border-live opacity-100" : "border-border opacity-40",
                )}
              >
                <p className="font-mono text-xs tracking-[0.1em] text-live tabular-nums">{dict.clocks[i]}</p>
                <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-text">{s.title}</p>
                <p
                  className={cn(
                    "grid text-base leading-relaxed text-text-secondary transition-[grid-template-rows,opacity] duration-[var(--dur-ui)]",
                    i === active ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <span className="overflow-hidden">{s.body}</span>
                </p>
              </li>
            ))}
          </ol>

          <div aria-hidden className="min-h-[96px] lg:hidden">
            <p className="font-mono text-xs tracking-[0.1em] text-live tabular-nums">
              {String(active + 1).padStart(2, "0")} / 04 · {dict.clocks[active]}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-text">{dict.steps[active].title}</p>
            <p className="mt-1 text-[15px] leading-snug text-text-secondary">{dict.steps[active].body}</p>
          </div>

          <div ref={stage} aria-hidden className="relative flex h-full max-h-[640px] min-h-0 flex-col self-center overflow-hidden rounded-[32px] border border-border bg-[#0D0E10] bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:22px_22px]">
            <div className="flex items-center justify-between px-5 pt-4 font-mono text-[11px] tracking-[0.12em] uppercase sm:px-6 sm:pt-5">
              <span className="text-text-secondary">Salong Åsa</span>
              <span className="flex items-center gap-2 text-live tabular-nums">
                <span className="live-dot h-[7px] w-[7px] rounded-full bg-live" />
                <span ref={clock} className="text-sm tracking-[0.06em] lg:text-base">
                  {dict.clocks[0]}
                </span>
              </span>
            </div>
            <div className="relative min-h-0 flex-1">
              {frames.map((f, i) => (
                <div key={i} data-panel className={cn("absolute inset-0 flex items-center justify-center p-4 sm:p-8", i > 0 && "invisible opacity-0")}>
                  {f}
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 px-5 pb-4 sm:px-6 sm:pb-5">
              {dict.steps.map((s, i) => (
                <span key={s.title} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    ref={(el) => {
                      if (el) rail.current[i] = el;
                    }}
                    className="block h-full origin-left rounded-full bg-live"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** "21:40" story: a scroll-scrubbed timeline over real UI pieces; a storyboard of final frames on the static tier. */
