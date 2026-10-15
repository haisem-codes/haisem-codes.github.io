import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Day axis from first call to launch; the line fills and an ice dot travels it on scroll (CSS view timeline, static fallback). */
export function HowIWork({ dict }: { dict: Dictionary["how"]; lang: Locale }) {
  return (
    <section id="how" className="scroll-mt-24 border-t border-border px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} className="rise" />

        <div className="how-track relative mt-14 sm:mt-16">
          <span aria-hidden className="how-rule absolute top-0 bottom-0 left-[7px] w-px bg-border-hover lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full" />
          <span
            aria-hidden
            className="how-progress absolute top-0 bottom-0 left-[7px] w-px origin-top bg-accent lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full lg:origin-left"
          />
          <span aria-hidden className="how-traveller" />
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {dict.steps.map((step, i) => (
              <li key={step.title} className="relative pl-10 [container-type:inline-size] lg:pt-10 lg:pl-0" style={{ "--i": i } as CSSProperties}>
                <span aria-hidden className="how-dot absolute top-[0.35rem] left-0 size-[15px] rounded-full border-2 border-accent bg-accent lg:top-0" />
                <div className="how-step">
                  <p className="how-day font-display leading-[0.9] font-bold tracking-[-0.045em] whitespace-nowrap text-text">{step.day}</p>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-balance text-text sm:text-2xl">{step.title}</h3>
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
