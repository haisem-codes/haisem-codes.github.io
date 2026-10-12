"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Dictionary } from "@/i18n";
import { readTier, type Tier } from "@/lib/capability";

const StoryPinned = dynamic(() => import("./StoryPinned"), { ssr: false });

type Story = Dictionary["story"];

function Heading({ dict }: { dict: Story }) {
  return (
    <div className="max-w-2xl">
      <h3 className="font-display text-3xl font-semibold tracking-tight text-balance text-text sm:text-4xl">{dict.title}</h3>
      <p className="mt-3 text-lg text-text-secondary">{dict.note}</p>
    </div>
  );
}

function Storyboard({ dict, frames }: { dict: Story; frames: ReactNode[] }) {
  return (
    <ol className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 md:gap-6">
      {dict.steps.map((s, i) => (
        <li key={s.title} className="flex flex-col rounded-[28px] border border-border bg-[#0D0E10] p-5 sm:p-6">
          <p className="font-mono text-xs tracking-[0.1em] text-live tabular-nums">{dict.clocks[i]}</p>
          <h4 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">{s.title}</h4>
          <p className="mt-2 text-base leading-relaxed text-text-secondary">{s.body}</p>
          <div aria-hidden className="mt-6 flex flex-1 items-center justify-center">
            {frames[i]}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function StoryTimeline({ dict, frames, onProgress }: { dict: Story; frames: ReactNode[]; onProgress?: (p: number) => void }) {
  const [tier, setTier] = useState<Tier>("static");
  useEffect(() => setTier(readTier()), []);
  const toStatic = useRef(() => setTier("static")).current;
  return (
    <div id="story" className="scroll-mt-24">
      <Heading dict={dict} />
      {tier === "static" ? (
        <Storyboard dict={dict} frames={frames} />
      ) : (
        <StoryPinned dict={dict} frames={frames} tier={tier} onProgress={onProgress} onFail={toStatic} />
      )}
    </div>
  );
}
