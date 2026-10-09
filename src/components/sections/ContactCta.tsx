import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";

const EMAIL = "haisem.work@gmail.com";

export function ContactCta({ dict, lang }: { dict: Dictionary["cta"]; lang: Locale }) {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <ScrollReveal className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-bg-card px-6 py-16 sm:px-16 sm:py-24">
        <h2 className="max-w-4xl font-display text-5xl leading-[1.02] font-semibold tracking-tight text-balance text-text sm:text-7xl">
          {dict.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">{dict.sub}</p>
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
          <Magnetic>
            <a
              href={localHref(lang, "/start/")}
              className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-accent px-9 text-lg font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.button}
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
          <p className="text-base text-text-secondary">
            {dict.orEmail}{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-[44px] items-center font-medium text-text underline decoration-border-hover underline-offset-[6px] transition-colors hover:decoration-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
