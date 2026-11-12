import type { Dictionary } from "@/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Goals({ dict }: { dict: Dictionary["goals"] }) {
  return (
    <section id="goals" aria-labelledby="goals-title" className="scroll-mt-24 border-t border-border px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} titleId="goals-title" className="rise" />
        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-16">
          <div className="rise lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{dict.goalsLabel}</p>
            <ol className="mt-6 border-t border-text">
              {dict.goals.map((g, i) => (
                <li key={g} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-border py-6 sm:grid-cols-[3.5rem_1fr] sm:py-8">
                  <span className="font-mono text-xs text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl leading-[1.15] font-bold tracking-[-0.025em] text-balance text-text sm:text-3xl lg:text-[2rem]">{g}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rise lg:col-span-5 lg:pt-10">
            <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{dict.interestsLabel}</p>
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
