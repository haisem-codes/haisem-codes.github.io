import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { TestimonialPlayer, type TestimonialLabels } from "@/components/sections/TestimonialPlayer";
import { ClientBoundary } from "@/components/ui/ClientBoundary";
import { DERIN, JAKE, type TestimonialMedia } from "@/lib/testimonials";

const DEEPSEA_URL = "https://deepseamedia.ca/";

function Player({ media, labels, sizes, compact }: { media: TestimonialMedia; labels: TestimonialLabels; sizes: string; compact?: boolean }) {
  return (
    <ClientBoundary
      fallback={
        <a href={media.mp4} className="inline-flex min-h-[48px] items-center font-medium text-accent underline underline-offset-4">
          {labels.play}
        </a>
      }
    >
      <TestimonialPlayer media={media} labels={labels} sizes={sizes} compact={compact} />
    </ClientBoundary>
  );
}

/** Keeps one phrase on a single line inside a quote. */
function NoWrap({ text, phrase }: { text: string; phrase: string }) {
  const at = text.indexOf(phrase);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="whitespace-nowrap">{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}

function Transcript({ label, note, children }: { label: string; note: string; children: ReactNode }) {
  return (
    <details className="group mt-6 max-w-xl rounded-2xl border border-border bg-bg-card px-5 py-1">
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
        {label}
        <span aria-hidden className="text-xl leading-none text-text-secondary transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">
          +
        </span>
      </summary>
      <p lang="en" className="mt-2 text-base leading-relaxed text-text-secondary">
        {children}
      </p>
      <p className="mt-3 mb-4 text-sm text-text-secondary">{note}</p>
    </details>
  );
}

/** Jake leads with the full story; Derin follows as a compact row. One pull-quote each. */
export function ClientStories({ jake, derin }: { jake: Dictionary["jake"]; derin: Dictionary["derin"] }) {
  return (
    <section id="stories" className="scroll-mt-24 px-6 pt-20 pb-10 sm:pt-24 sm:pb-12">
      <div className="mx-auto grid max-w-6xl gap-y-10 lg:grid-cols-[360px_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
        <header className="rise lg:col-start-2 lg:row-start-1">
          <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">
            {jake.index} — {jake.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-2xl font-display leading-[1.02] font-bold tracking-[-0.03em] text-balance text-text"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            {jake.title}
          </h2>
        </header>

        <div className="mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:self-start">
          <div className="rise">
            <Player
              media={JAKE}
              sizes="(min-width: 1024px) 360px, 90vw"
              labels={{ play: jake.play, videoLabel: jake.videoLabel, posterLabel: jake.posterLabel, watch: jake.watch, name: jake.quoteBy, duration: jake.duration, captionsLabel: jake.captionsLabel }}
            />
          </div>
        </div>

        <div className="rise lg:col-start-2 lg:row-start-2 lg:pt-12">
          <figure className="relative max-w-2xl pt-10 sm:pt-0">
            <span aria-hidden className="absolute -top-8 -left-1 font-display text-[7rem] leading-none text-accent/25 select-none sm:-left-16">
              “
            </span>
            <blockquote lang="en" className="relative font-display text-[1.75rem] leading-[1.18] font-medium tracking-[-0.02em] text-balance text-text sm:text-[2.25rem]">
              {jake.quote}
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase">
              <span className="text-text">{jake.quoteBy}</span>
              <span aria-hidden className="h-px w-6 bg-border-hover" />
              <span>{jake.builtAt}</span>
            </figcaption>
          </figure>

          <p className="mt-12 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">{jake.intro}</p>
          <ul className="mt-8 max-w-xl divide-y divide-border border-y border-border">
            {jake.points.map((p) => (
              <li key={p} className="flex gap-5 py-4 text-base leading-relaxed text-text">
                <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-secondary">{jake.confidential}</p>
          <Transcript label={jake.transcriptLabel} note={jake.transcriptNote}>
            {jake.transcript}
          </Transcript>
        </div>
      </div>

      <article className="mx-auto mt-20 grid max-w-6xl gap-y-10 border-t border-border pt-14 sm:mt-28 sm:pt-20 lg:grid-cols-[360px_1fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-20 lg:gap-y-0">
        <div className="rise lg:col-start-2 lg:row-start-2">
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase">
            <span className="text-text">{derin.name}</span>
            <span aria-hidden className="h-px w-6 bg-border-hover" />
            <span>
              {derin.role},{" "}
              <a
                href={DEEPSEA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text underline decoration-border-hover underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {derin.company}
                <span className="sr-only"> {derin.newTab}</span>
              </a>
            </span>
          </h3>
          <figure className="mt-6">
            <blockquote lang="en" className="font-display text-[1.6rem] leading-[1.2] font-medium tracking-[-0.02em] text-balance text-text sm:text-[2rem]">
              <span aria-hidden className="text-accent">“</span>
              <NoWrap text={derin.quote} phrase="end-to-end" />
              <span aria-hidden className="text-accent">”</span>
            </blockquote>
            <figcaption className="mt-5 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase">{derin.builtAt}</figcaption>
          </figure>
        </div>
        <div className="rise mx-auto w-full max-w-[240px] lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:mr-0 lg:max-w-[260px]">
          <Player
            media={DERIN}
            compact
            sizes="(min-width: 1024px) 260px, 240px"
            labels={{
              play: derin.play,
              videoLabel: derin.videoLabel,
              posterLabel: derin.posterLabel,
              watch: derin.watch,
              name: derin.name,
              duration: derin.duration,
              captionsLabel: derin.captionsLabel,
            }}
          />
        </div>
        <div className="rise lg:col-start-2 lg:row-start-3">
          <Transcript label={derin.transcriptLabel} note={derin.transcriptNote}>
            {derin.transcript}
          </Transcript>
        </div>
      </article>
    </section>
  );
}
