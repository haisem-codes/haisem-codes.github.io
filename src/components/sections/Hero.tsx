import { Fragment, type CSSProperties } from "react";
import { asset, cn } from "@/lib/utils";
import { type Locale } from "@/i18n/config";
import { personal } from "@/data/personal";
import type { Dictionary } from "@/i18n";
import { Magnetic } from "@/components/ui/Magnetic";
import { BulbCone } from "@/components/layout/BulbCone";

const PORTRAIT = asset("/haisem");
const SIZES = "(min-width: 1024px) 340px, 220px";
const srcSet = (ext: "avif" | "webp") => `${PORTRAIT}-600.${ext} 600w, ${PORTRAIT}-1200.${ext} 1200w`;

const delay = (s: number) => ({ "--d": `${Number(s.toFixed(2))}s` }) as CSSProperties;

function Words({ text, accent, from }: { text: string; accent?: boolean; from: number }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
        <span className={cn("hero-word inline-block", accent && "text-accent")} style={delay(0.15 + (from + i) * 0.05)}>
          {word}
        </span>
      </span>
    </Fragment>
  ));
}

export function Hero({ dict }: { dict: Dictionary["hero"]; lang: Locale }) {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-32 pb-20 sm:pt-40 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-56 lg:pb-16">
      <BulbCone />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <div>
          <p className="hero-fade flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-[0.08em] text-text-secondary uppercase" style={delay(0)}>
            <span className="inline-flex items-center gap-2 text-accent">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {dict.eyebrow}
            </span>
          </p>

          <h1
            className="mt-7 max-w-[50rem] font-display text-[3.25rem] leading-[0.95] font-bold tracking-[-0.035em] text-balance text-text sm:text-7xl lg:text-[clamp(3.75rem,5.4vw,4.75rem)]"
          >
            <Words text={dict.titleLead} from={0} /> {" "}
            <Words text={dict.titleAccent} accent from={dict.titleLead.split(" ").length} />
          </h1>

          <p className="hero-fade mt-8 max-w-[34rem] text-lg leading-relaxed text-text/70 sm:text-xl" style={delay(0.55)}>
            {dict.sub}
          </p>

          <div className="hero-fade mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8" style={delay(0.7)}>
            <Magnetic>
              <a
                href="#story"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-button px-7 text-base font-semibold text-button-text shadow-[0_10px_30px_-12px_var(--color-button)] transition-[filter] duration-[var(--dur-micro)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {dict.ctaPrimary}
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex min-h-[44px] items-center text-base font-medium text-text underline decoration-text-secondary decoration-1 underline-offset-[6px] transition-colors duration-[var(--dur-micro)] hover:decoration-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero-fade relative order-first lg:order-none" style={delay(0.45)}>
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, var(--color-glow), transparent)" }}
          />
          <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-[1.5rem] bg-bg-card sm:max-w-[220px] lg:max-w-[340px] lg:rounded-[2rem]">
            <picture>
              <source type="image/avif" srcSet={srcSet("avif")} sizes={SIZES} />
              <img
                src={`${PORTRAIT}-1200.webp`}
                srcSet={srcSet("webp")}
                sizes={SIZES}
                width={1200}
                height={1200}
                alt={dict.portraitAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full object-cover object-[50%_30%]"
                style={{ height: "100%" }}
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
