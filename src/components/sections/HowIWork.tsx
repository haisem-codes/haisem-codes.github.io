import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SectionHeader } from "@/components/ui/SectionHeader";

const folio = (i: number) => String(i + 1).padStart(2, "0");

/** Timeline with folio numbers; the progress line is drawn by a CSS view timeline (static where unsupported). */
export function HowIWork({ dict }: { dict: Dictionary["how"]; lang: Locale }) {
  const total = folio(dict.steps.length - 1);
  return (
    <section id="how" className="scroll-mt-24 border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} className="rise" />

        <div className="how-track relative mt-14 sm:mt-20">
          <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-border-hover lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full" />
          <span
            aria-hidden
            className="how-progress absolute top-0 bottom-0 left-[7px] w-px origin-top bg-accent lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full lg:origin-left"
          />
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {dict.steps.map((step, i) => (
              <li key={step.title} className="relative pl-10 lg:pt-12 lg:pl-0" style={{ "--i": i } as CSSProperties}>
                <span aria-hidden className="how-dot absolute top-[0.35rem] left-0 size-[15px] rounded-full border-2 border-accent bg-accent lg:top-0" />
                <div className="how-step">
                  <p className="flex items-baseline gap-3 font-mono text-xs tracking-[0.14em] text-text-secondary uppercase tabular-nums">
                    <span className="font-display text-5xl leading-none font-bold tracking-[-0.04em] text-text normal-case sm:text-6xl">
                      {folio(i)}
                    </span>
                    <span aria-hidden>/ {total}</span>
                  </p>
                  <p className="mt-5 font-mono text-xs tracking-[0.14em] text-accent uppercase">{step.when}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-balance text-text sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-text-secondary">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
