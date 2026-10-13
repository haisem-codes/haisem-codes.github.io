"use client";

import { useEffect, useRef, useState } from "react";

interface JakePlayerProps {
  play: string;
  videoLabel: string;
  pullQuote: string;
  quoteBy: string;
  duration: string;
}

export function JakePlayer({ play, videoLabel, pullQuote, quoteBy, duration }: JakePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!playing || !v) return;
    v.focus();
    v.play().catch(() => {});
  }, [playing]);

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-[#0A0A0B] shadow-[0_40px_80px_-32px_rgba(10,10,11,0.45)] ring-1 ring-black/5 dark:shadow-[0_40px_100px_-40px_rgba(56,189,248,0.35)] dark:ring-white/10">
      {playing ? (
        <video
          ref={video}
          controls
          autoPlay
          playsInline
          preload="auto"
          poster="/testimonials/jake-poster.jpg"
          aria-label={videoLabel}
          className="size-full bg-black object-cover focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
        >
          <source src="/testimonials/jake-720.webm" type="video/webm" />
          <source src="/testimonials/jake-720.mp4" type="video/mp4" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={play}
          className="group absolute inset-0 block size-full cursor-pointer text-left focus-visible:outline-none"
        >
          <img
            fetchPriority="low"
            src="/testimonials/jake-poster.jpg"
            alt=""
            width={720}
            height={1280}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-black from-40% via-black/75 via-62% to-transparent" />

          <span
            aria-hidden
            className="absolute top-[46%] left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[#0A0A0B] shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-8 ring-white/25 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-110 group-focus-visible:outline-3 group-focus-visible:outline-offset-4 group-focus-visible:outline-accent sm:size-24"
          >
            <svg viewBox="0 0 24 24" className="ml-1 size-8 sm:size-9" fill="currentColor">
              <path d="M7 4.8v14.4a1 1 0 0 0 1.52.85l11.5-7.2a1 1 0 0 0 0-1.7L8.52 3.95A1 1 0 0 0 7 4.8Z" />
            </svg>
          </span>

          <span aria-hidden className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-7">
            <span lang="en" className="font-display text-xl leading-snug font-semibold tracking-tight text-balance text-white sm:text-[1.375rem]">
              “{pullQuote}”
            </span>
            <span className="flex items-center justify-between gap-3 text-sm text-white/75">
              <span>{quoteBy}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-xs text-white backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="size-3" fill="currentColor">
                  <path d="M7 4.8v14.4a1 1 0 0 0 1.52.85l11.5-7.2a1 1 0 0 0 0-1.7L8.52 3.95A1 1 0 0 0 7 4.8Z" />
                </svg>
                {duration}
              </span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
