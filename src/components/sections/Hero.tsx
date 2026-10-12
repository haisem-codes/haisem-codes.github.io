import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { Magnetic } from "@/components/ui/Magnetic";
import { DemoPhone } from "@/components/sections/DemoPhone";
import { BulbCone } from "@/components/layout/BulbCone";

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

export function Hero({ dict, phone, lang }: { dict: Dictionary["hero"]; phone: Dictionary["demoPhone"]; lang: Locale }) {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-32 pb-20 sm:pt-40 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-56 lg:pb-16">
      <BulbCone />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <div>
          <p className="hero-fade flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-[0.08em] text-text-secondary uppercase" style={delay(0)}>
            <span className="inline-flex items-center gap-2 text-accent">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {dict.eyebrow}
            </span>
            {dict.meta.map((m, i) => (
              <span key={m} className={cn(i > 0 && "hidden sm:inline")}>
                {m}
              </span>
            ))}
          </p>

          {/* desktop size also shrinks so the longest line (e.g. the Swedish accent line) still fits the text column */}
          <h1
            className="mt-7 max-w-[50rem] font-display text-[3.25rem] leading-[0.95] font-bold tracking-[-0.035em] text-balance text-text sm:text-7xl lg:text-[min(clamp(4.75rem,6.6vw,6rem),calc((min(1152px,100vw-48px)-380px)/(var(--chars)*0.47)))]"
            style={{ "--chars": Math.max(dict.titleLead.length, dict.titleAccent.length) } as CSSProperties}
          >
            <Words text={dict.titleLead} from={0} /> <br className="hidden lg:inline" />
            <Words text={dict.titleAccent} accent from={dict.titleLead.split(" ").length} />
          </h1>

          <p className="hero-fade mt-8 max-w-[34rem] text-lg leading-relaxed text-text/70 sm:text-xl" style={delay(0.55)}>
            {dict.sub}
          </p>

          <div className="hero-fade mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8" style={delay(0.7)}>
            <Magnetic>
              <a
                href={localHref(lang, "/start/")}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-button px-7 text-base font-semibold text-button-text shadow-[0_10px_30px_-12px_var(--color-button)] transition-[filter] duration-[var(--dur-micro)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {dict.ctaPrimary}
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <a
              href="#services"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-text underline decoration-text-secondary decoration-1 underline-offset-[6px] transition-colors duration-[var(--dur-micro)] hover:decoration-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero-fade relative" style={delay(0.45)}>
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, var(--color-glow), transparent)" }}
          />
          <DemoPhone dict={phone} autoplay />
        </div>
      </div>
    </section>
  );
}
