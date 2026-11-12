import type { Dictionary } from "@/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Now({ dict }: { dict: Dictionary["now"] }) {
  return (
    <section id="now" aria-labelledby="now-title" className="scroll-mt-24 border-t border-border px-6 pt-20 pb-20 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} titleId="now-title" className="rise" />
        <ul className="rise mt-12 grid divide-y divide-border border-y border-border sm:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0">
          {dict.columns.map((c) => (
            <li key={c.label} className="py-8 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0">
              <h3 className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{c.label}</h3>
              <p className="mt-5 text-lg leading-relaxed text-text sm:text-xl">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
