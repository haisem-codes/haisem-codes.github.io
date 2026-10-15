import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { localHref, type Locale } from "@/i18n/config";
import { projects, localize } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { WorkPicture } from "@/components/ui/WorkPicture";
import { ClientBoundary } from "@/components/ui/ClientBoundary";
import { WorkList } from "@/components/sections/WorkList";

type WorkDict = Dictionary["work"];
type Highlight = { value: string; label: string };

const LIST_CAP = 4;
const sorted = [...projects].sort((a, b) => a.order - b.order);
const pad = (n: number) => String(n).padStart(2, "0");
const headline = (title: string) => title.split(":")[0];

/** Band tones: ice tint, a night band that stays dark in both themes, warm paper. */
const BANDS = [
  "bg-accent-tint/55 dark:bg-accent-tint/30",
  "dark border-y border-white/5 bg-[#060E14] text-text [background-image:radial-gradient(60%_80%_at_85%_40%,rgba(56,189,248,0.14),transparent_70%)]",
  "bg-[#F1F0EB] dark:bg-bg-card",
];

/** Pushes the mockup from the container edge to the viewport edge (the band clips any scrollbar overshoot). */
const BLEED = { "--bleed": "calc(-1 * (max(0px, (100vw - 72rem) / 2) + 1.5rem))" } as CSSProperties;

function Arrow() {
  return (
    <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
      →
    </span>
  );
}

function FeaturedRow({ p, i, dict, lang }: { p: Project; i: number; dict: WorkDict; lang: Locale }) {
  const flip = i % 2 === 1;
  const h = (dict.highlights as Record<string, Highlight>)[p.slug];
  const titleId = `work-${p.slug}-title`;
  const ctaId = `work-${p.slug}-cta`;
  const picture = (
    <div
      className={cn(
        "overflow-hidden shadow-[0_40px_80px_-40px_rgba(15,23,42,0.4)] ring-1 ring-black/5 dark:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] dark:ring-white/10",
        flip ? "rounded-l-2xl lg:rounded-l-none lg:rounded-r-2xl" : "rounded-l-2xl",
      )}
    >
      <WorkPicture slug={p.slug} sizes="(min-width: 1024px) 60vw, 100vw" />
    </div>
  );

  return (
    <li className={cn("relative overflow-hidden", BANDS[i % BANDS.length])} style={BLEED}>
      <a
        href={localHref(lang, `/projects/${p.slug}/`)}
        aria-labelledby={`${titleId} ${ctaId}`}
        className="group block focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <ScrollReveal className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
            <span
              aria-hidden
              className="-ml-[0.04em] block font-display text-[7rem] leading-[0.78] font-bold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)] sm:text-[9rem] lg:text-[12.5rem]"
            >
              {pad(i + 1)}
            </span>
            <p className="mt-7 font-mono text-[11px] tracking-[0.18em] text-text-secondary uppercase">
              {dict.categories[p.category]}
              {p.employer === "metaviz" && <span className="before:mx-2 before:content-['·']">{dict.employerNote}</span>}
            </p>
            <h3
              id={titleId}
              className="mt-3 font-display leading-[1.02] font-bold tracking-[-0.03em] text-balance text-text"
              style={{ fontSize: "clamp(2rem, 3.1vw, 2.75rem)" }}
            >
              {headline(p.title)}
            </h3>
            {h && (
              <p className="mt-8 flex max-w-md items-baseline gap-5 border-t border-text/15 pt-6">
                <span className="shrink-0 font-display text-5xl leading-none font-bold tracking-[-0.04em] text-accent tabular-nums sm:text-6xl">{h.value}</span>
                <span className="text-sm leading-snug text-text-secondary sm:text-base">{h.label}</span>
              </p>
            )}
            <span id={ctaId} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
              {dict.view} <Arrow />
            </span>
          </ScrollReveal>
          <div className={cn("-mr-6 lg:col-span-7", flip ? "lg:order-1 lg:mr-0 lg:ml-[var(--bleed)]" : "lg:mr-[var(--bleed)]")}>
            <ClientBoundary fallback={picture}>
              <TiltCard max={4}>{picture}</TiltCard>
            </ClientBoundary>
          </div>
        </div>
      </a>
    </li>
  );
}

function ListRow({ p, dict, lang }: { p: Project; dict: WorkDict; lang: Locale }) {
  const titleId = `work-${p.slug}-title`;
  return (
    <a
      href={localHref(lang, `/projects/${p.slug}/`)}
      aria-labelledby={titleId}
      className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 border-t border-border py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:grid-cols-[1fr_16rem_2rem] sm:py-6"
    >
      <span
        id={titleId}
        className="relative z-20 font-display text-xl leading-snug font-semibold tracking-tight text-text transition-transform duration-300 ease-out sm:text-2xl sm:group-hover:translate-x-2"
      >
        {headline(p.title)}
      </span>
      <span className="col-start-1 row-start-2 font-mono text-[11px] tracking-[0.14em] text-text-secondary uppercase sm:col-start-auto sm:row-start-auto">
        {dict.categories[p.category]}
        {p.employer === "metaviz" && <span className="block sm:mt-1">{dict.employerNote}</span>}
      </span>
      <span className="col-start-2 row-span-2 row-start-1 justify-self-end text-xl text-text-secondary transition-colors duration-300 group-hover:text-accent sm:col-start-auto sm:row-span-1 sm:row-start-auto">
        <Arrow />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden w-72 transition-transform duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:block"
        style={{ transform: "translate3d(calc(var(--px, 50%) - 50%), calc(var(--py, 0px) - 50%), 0)" }}
      >
        <WorkPicture
          slug={p.slug}
          sizes="288px"
          className="animate-[work-preview-in_.35s_var(--ease-silk)_both] overflow-hidden rounded-xl border border-border shadow-[0_30px_60px_-20px_rgba(15,23,42,0.45)] motion-reduce:animate-none"
        />
      </span>
    </a>
  );
}

export function Work({ dict, lang }: { dict: WorkDict; lang: Locale }) {
  const featured = sorted.filter((p) => p.featured).map((p) => localize(p, lang));
  const rest = sorted.filter((p) => !p.featured).map((p) => localize(p, lang));
  const rows = rest.map((p) => ({ slug: p.slug, row: <ListRow p={p} dict={dict} lang={lang} /> }));

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} className="mb-12 sm:mb-16" />
      </div>
      <ol>
        {featured.map((p, i) => (
          <FeaturedRow key={p.slug} p={p} i={i} dict={dict} lang={lang} />
        ))}
      </ol>
      <div className="mx-auto mt-16 max-w-6xl px-6 sm:mt-20">
        <ClientBoundary
          fallback={
            <ul className="border-b border-border">
              {rows.map((r) => (
                <li key={r.slug}>{r.row}</li>
              ))}
            </ul>
          }
        >
          <WorkList
            rows={rows}
            title={dict.more}
            cap={LIST_CAP}
            more={dict.allProjects.replace("{n}", String(sorted.length))}
            fewer={dict.fewer}
          />
        </ClientBoundary>
      </div>
    </section>
  );
}
