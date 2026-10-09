import type { Dictionary } from "@/i18n";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function JakeCase({ dict }: { dict: Dictionary["jake"] }) {
  return (
    <section id="jake" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <ScrollReveal className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
          <video
            controls
            playsInline
            preload="none"
            poster="/testimonials/jake-poster.jpg"
            aria-label={dict.videoLabel}
            className="aspect-[9/16] w-full rounded-3xl border border-border bg-bg-card object-cover"
          >
            <source src="/testimonials/jake-720.webm" type="video/webm" />
            <source src="/testimonials/jake-720.mp4" type="video/mp4" />
          </video>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-sm font-medium tracking-widest text-accent uppercase">{dict.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-text sm:text-6xl">
            {dict.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">{dict.intro}</p>
          <ul className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-text">
            {dict.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-secondary">{dict.confidential}</p>
          <details className="mt-8 max-w-xl rounded-2xl border border-border bg-bg-card px-5 py-4">
            <summary className="flex min-h-[44px] cursor-pointer items-center text-base font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              {dict.transcriptLabel}
            </summary>
            <p lang="en" className="mt-3 text-base leading-relaxed text-text-secondary">
              {dict.transcript}
            </p>
            <p className="mt-3 text-sm text-text-secondary">{dict.transcriptNote}</p>
          </details>
        </ScrollReveal>
      </div>
    </section>
  );
}
