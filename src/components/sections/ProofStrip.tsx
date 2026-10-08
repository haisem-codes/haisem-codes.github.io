import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProofStrip({ dict }: { dict: Dictionary["proof"]; lang: Locale }) {
  return (
    <section className="border-y border-border px-6 py-12 sm:py-16">
      <ScrollReveal className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <figure>
          <blockquote className="font-display text-2xl leading-snug font-medium tracking-tight text-text sm:text-3xl">
            <span aria-hidden className="text-accent">“</span>
            {dict.quote}
            <span aria-hidden className="text-accent">”</span>
          </blockquote>
          <figcaption className="mt-4 text-sm text-text-secondary">{dict.quoteBy}</figcaption>
        </figure>
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-text-secondary lg:justify-end">
          {dict.items.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
