import type { Dictionary } from "@/i18n";
import { localHref, type Locale } from "@/i18n/config";
import { personal } from "@/data/personal";
import { Magnetic } from "@/components/ui/Magnetic";

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

/** Closing call to action: a kinetic outlined headline, then the one button the whole page leads to. */
export function FooterMarquee({ dict, lang }: { dict: Dictionary["marquee"]; lang: Locale }) {
  const start = localHref(lang, "/start/");
  return (
    <section aria-labelledby="close-title" className="marquee-band overflow-x-clip border-t border-border pt-20 pb-24 sm:pt-28 sm:pb-32">
      <h2 id="close-title" className="sr-only">
        {dict.label}
      </h2>
      <a
        href={start}
        tabIndex={-1}
        aria-hidden
        data-cursor="book"
        className="group block py-2 font-display leading-[1] font-bold tracking-[-0.04em]"
      >
        <span className="velocity marquee-track flex w-max">
          {Array.from({ length: HALVES * PER_HALF }, (_, i) => (
            <Line key={i} dict={dict} />
          ))}
        </span>
      </a>
      <div className="mt-12 px-6 sm:mt-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 border-t border-border pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{dict.note}</p>
            <p className="mt-3 text-lg leading-relaxed text-balance text-text sm:text-xl">{dict.sub}</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Magnetic>
              <a
                href={start}
                className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-button px-8 text-lg font-medium whitespace-nowrap text-button-text transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {dict.button}
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <p className="text-base text-text-secondary">
              {dict.orEmail}{" "}
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex min-h-[44px] items-center font-medium text-text underline decoration-border-hover underline-offset-[6px] transition-colors hover:decoration-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {personal.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
