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
        <div className="overflow-hidden">
          <ul className="-ml-7 flex flex-wrap gap-y-2 text-base text-text-secondary">
            {dict.items.map((item) => (
              <li
                key={item}
                className="relative pl-7 not-first:before:absolute not-first:before:top-[0.7em] not-first:before:left-3 not-first:before:size-1 not-first:before:rounded-full not-first:before:bg-accent not-first:before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
