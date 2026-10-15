import type { Dictionary } from "@/i18n";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JakePlayer } from "@/components/sections/JakePlayer";
import { ClientBoundary } from "@/components/ui/ClientBoundary";
import { JAKE_VIDEO } from "@/lib/jake";

export function JakeCase({ dict }: { dict: Dictionary["jake"] }) {
  return (
    <section id="jake" className="scroll-mt-24 px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-y-10 lg:grid-cols-[360px_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
        <ScrollReveal className="lg:col-start-2 lg:row-start-1">
          <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">
            {dict.index} — {dict.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-2xl font-display leading-[1.02] font-bold tracking-[-0.03em] text-balance text-text"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            {dict.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:self-start">
          <ClientBoundary
            fallback={
              <a href={JAKE_VIDEO} className="inline-flex min-h-[48px] items-center font-medium text-accent underline underline-offset-4">
                {dict.play}
              </a>
            }
          >
            <JakePlayer
              play={dict.play}
              videoLabel={dict.videoLabel}
              posterLabel={dict.posterLabel}
              watch={dict.watch}
              name={dict.quoteBy}
              duration={dict.duration}
            />
          </ClientBoundary>
        </ScrollReveal>

        <ScrollReveal className="lg:col-start-2 lg:row-start-2 lg:pt-12">
          <figure className="relative max-w-2xl pt-10 sm:pt-0">
            <span aria-hidden className="absolute -top-8 -left-1 font-display text-[7rem] leading-none text-accent/25 select-none sm:-left-16">
              “
            </span>
            <blockquote lang="en" className="relative font-display text-[1.75rem] leading-[1.18] font-medium tracking-[-0.02em] text-balance text-text sm:text-[2.25rem]">
              {dict.quote}
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase">
              <span className="text-text">{dict.quoteBy}</span>
              <span aria-hidden className="h-px w-6 bg-border-hover" />
              <span>{dict.builtAt}</span>
            </figcaption>
          </figure>

          <p className="mt-12 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">{dict.intro}</p>
          <ul className="mt-8 max-w-xl divide-y divide-border border-y border-border">
            {dict.points.map((p) => (
              <li key={p} className="flex gap-5 py-4 text-base leading-relaxed text-text">
                <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-secondary">{dict.confidential}</p>

          <details className="group mt-6 max-w-xl rounded-2xl border border-border bg-bg-card px-5 py-1">
            <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
              {dict.transcriptLabel}
              <span aria-hidden className="text-xl leading-none text-text-secondary transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">
                +
              </span>
            </summary>
            <p lang="en" className="mt-2 text-base leading-relaxed text-text-secondary">
              {dict.transcript}
            </p>
            <p className="mt-3 mb-4 text-sm text-text-secondary">{dict.transcriptNote}</p>
          </details>
        </ScrollReveal>
      </div>
    </section>
  );
}
