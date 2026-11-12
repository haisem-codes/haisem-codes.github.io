import type { Dictionary } from "@/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AfterHours({ dict }: { dict: Dictionary["afterHours"] }) {
  return (
    <section id="after-hours" aria-labelledby="after-hours-title" className="scroll-mt-24 px-6 pt-8 pb-20 sm:pt-12 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} titleId="after-hours-title" kicker={dict.sub} size="compact" />
        <ol className="mt-12 border-t border-text sm:mt-14">
          {dict.items.map((item) => (
            <li key={item.title} className="grid gap-x-12 gap-y-4 border-b border-border py-8 sm:py-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="font-display text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-text sm:text-4xl">{item.title}</h3>
                <p className="mt-2 text-base leading-snug text-text-secondary">{item.kind}</p>
              </div>
              <div className="lg:col-span-7 lg:pt-8">
                <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">{item.body}</p>
                <p className="mt-5 inline-block border border-border-hover px-2.5 py-1 font-mono text-xs text-text">{dict.tag}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
