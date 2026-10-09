import Image from "next/image";
import { asset } from "@/lib/utils";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About({ dict }: { dict: Dictionary["about"]; lang: Locale }) {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-20">
        <ScrollReveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-bg-card">
            <Image
              src={asset("/haisem.webp")}
              alt="Haisem Naeem"
              fill
              sizes="(min-width: 768px) 384px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-6xl">{dict.title}</h2>
          <div className="mt-8 space-y-5">
            {dict.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-text-secondary">
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
