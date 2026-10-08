"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import type { Dictionary } from "@/i18n";
import { storyProgress } from "@/lib/story";
import { canRender3D, readEnv } from "@/lib/capability";

const StoryCanvas = dynamic(() => import("@/components/three/StoryCanvas"), { ssr: false });

type Story = Dictionary["story"];

const ICONS = [
  "M4 5h16v14H4zM8 10h8M8 14h5",
  "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z",
  "M4 6h16v14H4zM4 11h16M9 3v4M15 3v4",
  "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3",
];

function Heading({ dict }: { dict: Story }) {
  return (
    <>
      <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance text-text sm:text-6xl">
        {dict.title}
      </h2>
      <p className="mt-4 max-w-xl text-lg text-text-secondary">{dict.note}</p>
    </>
  );
}

function FallbackList({ dict }: { dict: Story }) {
  return (
    <section id="story" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Heading dict={dict} />
        <ol className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2 md:gap-6">
          {dict.steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl border border-border bg-bg-card p-8">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-8 w-8 fill-none stroke-accent"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICONS[i]} />
              </svg>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-text">{s.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-text-secondary">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PinnedStory({ dict }: { dict: Story }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const r = storyProgress(p);
    progress.current = r.progress;
    setActive(r.step);
  });

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setNear(e.isIntersecting);
        if (e.isIntersecting) setInView(true);
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="story" ref={ref} className="relative h-[300vh] lg:h-[400vh]">
      <div className="sticky top-0 grid h-screen items-center overflow-hidden px-6 lg:grid-cols-2 lg:gap-12">
        <div className="absolute inset-0 lg:left-1/2">{inView && <StoryCanvas progress={progress} active={near} />}</div>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-between py-20 lg:col-start-1 lg:row-start-1 lg:justify-center lg:gap-10 lg:py-0">
          <div>
            <Heading dict={dict} />
          </div>
          <ol className="space-y-3 rounded-2xl bg-bg/70 p-4 backdrop-blur-sm lg:space-y-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            {dict.steps.map((s, i) => (
              <li
                key={s.title}
                aria-current={i === active ? "step" : undefined}
                className={`transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-30"}`}
              >
                <h3 className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl lg:text-3xl">
                  <span aria-hidden className="mr-3 font-mono text-sm text-text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h3>
                <p className={`mt-1 max-w-md text-base leading-relaxed text-text-secondary lg:mt-2 lg:text-lg ${i === active ? "" : "max-lg:sr-only"}`}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function StoryScene({ dict }: { dict: Story }) {
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");
  useLayoutEffect(() => {
    setMode(canRender3D(readEnv()) ? "3d" : "fallback");
  }, []);
  return mode === "3d" ? <PinnedStory dict={dict} /> : <FallbackList dict={dict} />;
}
