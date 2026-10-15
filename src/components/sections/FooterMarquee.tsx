import type { Dictionary } from "@/i18n";
import { localHref, type Locale } from "@/i18n/config";

/** Three identical halves: the CSS loop moves one half, scroll velocity can add up to one more (src/lib/velocity.ts). */
const HALVES = 3;
const PER_HALF = 2;

function Line({ dict }: { dict: Dictionary["marquee"] }) {
  return (
    <span className="marquee-item inline-flex shrink-0 items-baseline gap-[0.25em] pr-[0.5em]">
      <span className="marquee-outline">{dict.lead}</span>
      <span className="inline-flex items-baseline gap-[0.25em] whitespace-nowrap">
        <em className="marquee-em">{dict.em}</em>
        <span className="marquee-outline">→</span>
      </span>
    </span>
  );
}

/** Kinetic closing line: an outlined headline loops sideways and runs faster while the page scrolls. */
export function FooterMarquee({ dict, lang }: { dict: Dictionary["marquee"]; lang: Locale }) {
  return (
    <section className="marquee-band overflow-x-clip border-t border-border py-12 sm:py-20">
      <a
        href={localHref(lang, "/start/")}
        className="group block py-2 font-display leading-[1] font-bold tracking-[-0.04em] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      >
        <span className="sr-only">{dict.label}</span>
        <span aria-hidden className="velocity marquee-track flex w-max">
          {Array.from({ length: HALVES * PER_HALF }, (_, i) => (
            <Line key={i} dict={dict} />
          ))}
        </span>
      </a>
    </section>
  );
}
