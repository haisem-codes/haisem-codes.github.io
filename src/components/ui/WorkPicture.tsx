import type { CSSProperties } from "react";
import workImages from "@/data/workImages.json";
import { asset, cn } from "@/lib/utils";

type Meta = { w: number; h: number; blur: string; nightBlur: string };
const images: Record<string, Meta> = workImages;

function srcSet(base: string, ext: "avif" | "webp") {
  return `${asset(`${base}-800.${ext}`)} 800w, ${asset(`${base}-1600.${ext}`)} 1600w`;
}

function Variant({ base, sizes, w, h, className }: { base: string; sizes: string; w: number; h: number; className: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(base, "avif")} sizes={sizes} />
      <img
        src={asset(`${base}-1600.webp`)}
        srcSet={srcSet(base, "webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn("h-auto w-full", className)}
      />
    </picture>
  );
}

/** Light + night renders; the class-based theme hides one, and lazy + display:none keeps it from downloading. */
export function WorkPicture({ slug, sizes, className }: { slug: string; sizes: string; className?: string }) {
  const meta = images[slug];
  if (!meta) return null;
  return (
    <div
      className={cn(
        "bg-cover bg-center [background-image:var(--blur)] dark:[background-image:var(--blur-night)]",
        className,
      )}
      style={{ "--blur": `url(${meta.blur})`, "--blur-night": `url(${meta.nightBlur})` } as CSSProperties}
    >
      <Variant base={`/work/${slug}`} sizes={sizes} w={meta.w} h={meta.h} className="dark:hidden" />
      <Variant base={`/work/${slug}-night`} sizes={sizes} w={meta.w} h={meta.h} className="hidden dark:block" />
    </div>
  );
}
