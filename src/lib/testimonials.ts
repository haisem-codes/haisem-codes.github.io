import { asset } from "@/lib/utils";

/** Client-video media; a plain module so server and client components share the paths. */
export interface TestimonialMedia {
  mp4: string;
  webm: string;
  /** Path stem: `${poster}.jpg` and `${poster}-${w}.{avif,webp}` exist in public/. */
  poster: string;
  posterWidths: readonly number[];
  width: number;
  height: number;
  captions?: string;
}

export const JAKE: TestimonialMedia = {
  mp4: asset("/testimonials/jake-720.mp4"),
  webm: asset("/testimonials/jake-720.webm"),
  poster: asset("/testimonials/jake-poster"),
  posterWidths: [360, 720],
  width: 720,
  height: 1280,
  captions: asset("/testimonials/jake-en.vtt"),
};

export const DERIN: TestimonialMedia = {
  mp4: asset("/testimonials/derin-720.mp4"),
  webm: asset("/testimonials/derin-720.webm"),
  poster: asset("/testimonials/derin-poster"),
  posterWidths: [360, 720],
  width: 720,
  height: 1280,
  captions: asset("/testimonials/derin-en.vtt"),
};

export function posterSrcSet(stem: string, widths: readonly number[], ext: "avif" | "webp") {
  return widths.map((w) => `${stem}-${w}.${ext} ${w}w`).join(", ");
}

type Playable = { paused: boolean; pause(): void };

/** One testimonial plays at a time. */
export function pauseOthers(videos: Iterable<Playable>, current: Playable) {
  for (const v of videos) if (v !== current && !v.paused) v.pause();
}
