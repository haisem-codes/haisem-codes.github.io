"use client";

import { useEffect, useRef, useState } from "react";

export const JAKE_VIDEO = "/testimonials/jake-720.mp4";
const POSTER = "/testimonials/jake-poster";

interface JakePlayerProps {
  play: string;
  videoLabel: string;
  posterLabel: string;
  watch: string;
  name: string;
  duration: string;
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 4.8v14.4a1 1 0 0 0 1.52.85l11.5-7.2a1 1 0 0 0 0-1.7L8.52 3.95A1 1 0 0 0 7 4.8Z" />
    </svg>
  );
}

export function JakePlayer({ play, videoLabel, posterLabel, watch, name, duration }: JakePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!playing || !v) return;
    v.focus();
    v.play().catch(() => {});
  }, [playing]);

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-[#0A0A0B] shadow-[0_40px_80px_-32px_rgba(10,10,11,0.45)] ring-1 ring-black/5 dark:shadow-[0_40px_100px_-40px_rgba(56,189,248,0.3)] dark:ring-white/10">
      {playing ? (
        <video
          ref={video}
          controls
          autoPlay
          playsInline
          preload="auto"
          poster={`${POSTER}.jpg`}
          aria-label={videoLabel}
          className="size-full bg-black object-cover focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
        >
          <source src="/testimonials/jake-720.webm" type="video/webm" />
          <source src={JAKE_VIDEO} type="video/mp4" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={play}
          className="group absolute inset-0 block size-full cursor-pointer text-left focus-visible:outline-none"
        >
          <picture>
            <source type="image/avif" srcSet={`${POSTER}-360.avif 360w, ${POSTER}-720.avif 720w`} sizes="(min-width: 1024px) 360px, 90vw" />
            <img
              src={`${POSTER}-720.webp`}
              srcSet={`${POSTER}-360.webp 360w, ${POSTER}-720.webp 720w`}
              sizes="(min-width: 1024px) 360px, 90vw"
              alt=""
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
            />
          </picture>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

          <span
            aria-hidden
            className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-white uppercase backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-[#7DD3FC]" />
            {posterLabel}
          </span>

          <span aria-hidden className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-5 sm:p-6">
            <span className="font-display text-lg leading-tight font-semibold tracking-tight text-white">{name}</span>
            <span className="inline-flex h-14 items-center gap-3 rounded-full bg-white/95 pr-5 pl-1.5 text-[#0A0A0B] shadow-[0_12px_32px_rgba(0,0,0,0.35)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-0.5 group-focus-visible:outline-3 group-focus-visible:outline-offset-3 group-focus-visible:outline-[#7DD3FC]">
              <span className="grid size-11 place-items-center rounded-full bg-[#0A0A0B] text-white">
                <PlayIcon className="ml-0.5 size-4" />
              </span>
              <span className="text-[15px] font-medium">{watch}</span>
              <span className="font-mono text-xs text-[#0A0A0B]/70 tabular-nums">{duration}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
