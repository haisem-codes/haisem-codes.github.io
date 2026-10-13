import type { Dictionary } from "@/i18n";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JakePlayer } from "@/components/sections/JakePlayer";

export function JakeCase({ dict }: { dict: Dictionary["jake"] }) {
  return (
    <section id="jake" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[360px_1fr] lg:gap-20">
        <ScrollReveal className="mx-auto w-full max-w-[360px] lg:mx-0">
          <JakePlayer
            play={dict.play}
            videoLabel={dict.videoLabel}
            pullQuote={dict.pullQuote}
            quoteBy={dict.quoteBy}
            duration={dict.duration}
          />
        </ScrollReveal>

        <ScrollReveal>
          <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {dict.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-2xl font-display leading-[1.04] font-bold tracking-[-0.03em] text-balance text-text"
            style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)" }}
          >
            {dict.title}
          </h2>

          <figure className="mt-10 max-w-xl border-l-2 border-accent pl-6">
            <blockquote lang="en" className="font-display text-2xl leading-snug font-medium tracking-tight text-text sm:text-[1.75rem]">
              “{dict.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-text-secondary">
              <span className="font-medium text-text">{dict.quoteBy}</span>
              <span aria-hidden className="mx-2 hidden sm:inline">·</span>
              <span className="block sm:inline">{dict.builtAt}</span>
            </figcaption>
          </figure>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">{dict.intro}</p>
          <ol className="mt-8 max-w-xl divide-y divide-border border-y border-border">
            {dict.points.map((p, i) => (
              <li key={p} className="flex gap-5 py-4 text-base leading-relaxed text-text">
                <span aria-hidden className="pt-1 font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
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
