import type { Dictionary } from "@/i18n";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/** Facts band under the hero: three numerals on 1px rules, no quote (Jake gets one, in his own section). */
export function ProofStrip({ dict }: { dict: Dictionary["proof"] }) {
  return (
    <section aria-label={dict.label} className="border-y border-border px-6">
      <ScrollReveal>
        <ul className="mx-auto grid max-w-6xl divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {dict.facts.map((f) => (
            <li
              key={f.value}
              className="grid grid-cols-[6.5rem_1fr] items-center gap-5 py-7 sm:flex sm:flex-col sm:gap-5 sm:px-8 sm:py-12 sm:first:pl-0 lg:px-12 lg:py-14"
            >
              <span className="font-mono text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-accent tabular-nums sm:text-6xl lg:text-7xl">
                {f.value}
              </span>
              <span className="max-w-[17rem] text-[15px] leading-snug text-text-secondary sm:text-base">{f.label}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
