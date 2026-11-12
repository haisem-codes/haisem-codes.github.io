import type { Dictionary } from "@/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Goals({ dict }: { dict: Dictionary["goals"] }) {
  return (
    <section id="goals" aria-labelledby="goals-title" className="scroll-mt-24 border-t border-border px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} titleId="goals-title" className="rise" />
        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-16">
          <div className="rise lg:col-span-7">
            <h3 className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{dict.goalsLabel}</h3>
            <ol className="mt-6 border-t border-text">
              {dict.goals.map((g, i) => (
                <li key={g} className="grid grid-cols-[4rem_1fr] items-center gap-x-4 border-b border-border py-5 sm:grid-cols-[6rem_1fr] sm:py-6">
                  <span aria-hidden className="font-display text-5xl leading-none font-bold tracking-[-0.04em] text-accent/70 tabular-nums sm:text-7xl">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl leading-[1.15] font-bold tracking-[-0.025em] text-balance text-text sm:text-3xl lg:text-[2rem]">{g}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rise lg:col-span-5 lg:pt-10">
            <h3 className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{dict.interestsLabel}</h3>
            <ul className="mt-6 space-y-4">
              {dict.interests.map((t) => (
                <li key={t} className="flex gap-4 text-lg leading-snug text-text-secondary sm:text-xl">
                  <span aria-hidden className="text-accent">&rarr;</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
