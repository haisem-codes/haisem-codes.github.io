"use client";

import { useEffect, useRef, useState } from "react";
import { posterSrcSet, type TestimonialMedia } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export interface TestimonialLabels {
  play: string;
  videoLabel: string;
  posterLabel: string;
  watch: string;
  name: string;
  duration: string;
  captionsLabel?: string;
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 4.8v14.4a1 1 0 0 0 1.52.85l11.5-7.2a1 1 0 0 0 0-1.7L8.52 3.95A1 1 0 0 0 7 4.8Z" />
    </svg>
  );
}

/** Poster button that swaps in the real video on click; nothing heavy loads until then. */
export function TestimonialPlayer({ media, labels, sizes, compact = false }: { media: TestimonialMedia; labels: TestimonialLabels; sizes: string; compact?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const { poster, posterWidths } = media;
  const largest = posterWidths[posterWidths.length - 1];

  useEffect(() => {
    const v = video.current;
    if (!playing || !v) return;
    v.focus();
    v.play().catch(() => {});
  }, [playing]);

  return (
    <div
      className={cn(
        "relative aspect-[9/16] w-full overflow-hidden bg-[#0A0A0B] ring-1 ring-black/5 dark:ring-white/10",
        compact
          ? "rounded-[1.25rem] shadow-[0_28px_60px_-30px_rgba(10,10,11,0.45)]"
          : "rounded-[1.75rem] shadow-[0_40px_80px_-32px_rgba(10,10,11,0.45)] dark:shadow-[0_40px_100px_-40px_rgba(56,189,248,0.3)]",
      )}
    >
      {playing ? (
        <video
          ref={video}
          controls
          autoPlay
          playsInline
          preload="auto"
          poster={`${poster}.jpg`}
          aria-label={labels.videoLabel}
          className="testimonial-video size-full bg-black object-cover focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
        >
          <source src={media.webm} type="video/webm" />
          <source src={media.mp4} type="video/mp4" />
          {media.captions && <track kind="captions" src={media.captions} srcLang="en" label={labels.captionsLabel} default />}
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={labels.play}
          className="group absolute inset-0 block size-full cursor-pointer text-left focus-visible:outline-none"
        >
          <picture>
            <source type="image/avif" srcSet={posterSrcSet(poster, posterWidths, "avif")} sizes={sizes} />
            <img
              src={`${poster}-${largest}.webp`}
              srcSet={posterSrcSet(poster, posterWidths, "webp")}
              sizes={sizes}
              alt=""
              width={media.width}
              height={media.height}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              style={{ height: "100%" }}
              className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
            />
          </picture>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

          <span
            aria-hidden
            className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-white uppercase backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-[#7DD3FC]" />
            {labels.posterLabel}
          </span>

          <span aria-hidden className={cn("absolute inset-x-0 bottom-0 flex flex-col items-start", compact ? "gap-3 p-4" : "gap-4 p-5 sm:p-6")}>
            {!compact && <span className="font-display text-lg leading-tight font-semibold tracking-tight text-white">{labels.name}</span>}
            <span className="inline-flex h-14 items-center gap-3 rounded-full bg-white/95 pr-5 pl-1.5 text-[#0A0A0B] shadow-[0_12px_32px_rgba(0,0,0,0.35)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-0.5 group-focus-visible:outline-3 group-focus-visible:outline-offset-3 group-focus-visible:outline-[#7DD3FC]">
              <span className="grid size-11 place-items-center rounded-full bg-[#0A0A0B] text-white">
                <PlayIcon className="ml-0.5 size-4" />
              </span>
              <span className="text-[15px] font-medium">{labels.watch}</span>
              <span className="font-mono text-xs text-[#0A0A0B]/70 tabular-nums">{labels.duration}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
