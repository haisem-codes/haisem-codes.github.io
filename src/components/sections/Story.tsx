import type { Dictionary } from "@/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Story({ dict }: { dict: Dictionary["story"] }) {
  return (
    <section id="story" aria-labelledby="story-title" className="scroll-mt-24 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-7">
          <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} titleId="story-title" className="rise" />
          <div className="mt-10 max-w-[65ch] space-y-7">
            {dict.paragraphs.map((p) => (
              <p key={p} className="rise text-lg leading-[1.75] text-text/85 sm:text-xl sm:leading-[1.7]">
                {p}
              </p>
            ))}
          </div>
          <dl className="rise mt-12 max-w-[65ch] border-t border-border">
            <dt className="sr-only">{dict.skillsLabel}</dt>
            {dict.skills.map((g) => (
              <div key={g.label} className="grid gap-x-6 gap-y-1 border-b border-border py-4 sm:grid-cols-[9rem_1fr]">
                <dt className="font-mono text-xs leading-6 tracking-[0.14em] text-accent uppercase">{g.label}</dt>
                <dd className="text-base leading-6 text-text/85">{g.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="rise lg:sticky lg:top-28 lg:col-span-5 lg:self-start lg:pt-6" aria-label={dict.timelineLabel}>
          <p className="font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">{dict.timelineLabel}</p>
          <ol className="mt-5 border-t border-border">
            {dict.timeline.map((t) => (
              <li key={t.years + t.what} className="grid grid-cols-[4.75rem_1fr] gap-x-4 border-b border-border py-4">
                <span className="font-mono text-xs leading-6 text-accent tabular-nums">{t.years}</span>
                <span>
                  <span className="block text-base leading-6 font-medium text-text">{t.what}</span>
                  <span className="block text-sm leading-6 text-text-secondary">{t.where}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
