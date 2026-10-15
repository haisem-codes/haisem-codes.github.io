import { asset } from "@/lib/utils";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PORTRAIT = asset("/haisem");
const SIZES = "(min-width: 1024px) 440px, (min-width: 640px) 60vw, 100vw";
const srcSet = (ext: "avif" | "webp") => `${PORTRAIT}-600.${ext} 600w, ${PORTRAIT}-1200.${ext} 1200w`;

export function About({ dict }: { dict: Dictionary["about"]; lang: Locale }) {
  return (
    <section id="about" className="scroll-mt-24 px-6 pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-x-16">
        <figure className="rise relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:mx-0 lg:max-w-none lg:self-start">
          <div className="duotone relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <picture>
              <source type="image/avif" srcSet={srcSet("avif")} sizes={SIZES} />
              <img
                src={`${PORTRAIT}-1200.webp`}
                srcSet={srcSet("webp")}
                sizes={SIZES}
                width={1200}
                height={1200}
                alt={dict.portraitAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full object-cover object-[50%_30%]"
                style={{ height: "100%" }}
              />
            </picture>
          </div>
          <figcaption className="mt-4 flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">
            <span>{dict.route.from}</span>
            <span aria-hidden className="h-px flex-1 bg-border-hover" />
            <span aria-hidden className="text-accent">→</span>
            <span className="text-text">{dict.route.to}</span>
          </figcaption>
        </figure>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} className="rise" />
          <div className="rise mt-8 max-w-2xl space-y-5">
            {dict.paragraphs.map((p, i) => (
              <p key={p} className={i === 0 ? "text-lg leading-relaxed text-text sm:text-xl" : "text-lg leading-relaxed text-text-secondary"}>
                {p}
              </p>
            ))}
          </div>
          <ul className="rise mt-10 max-w-2xl border-t border-border">
            {dict.facts.map((f) => (
              <li key={f.what} className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-border py-3.5 sm:grid-cols-[5.5rem_1fr_auto]">
                <span className="font-mono text-xs leading-6 text-accent tabular-nums">{f.years}</span>
                <span className="text-base leading-6 font-medium text-text">{f.what}</span>
                <span className="col-start-2 text-sm leading-6 text-text-secondary sm:col-start-3 sm:text-right">{f.where}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
