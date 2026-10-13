import type { Dictionary } from "@/i18n";
import { localHref, type Locale } from "@/i18n/config";
import { projects, localize } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { WorkPicture } from "@/components/ui/WorkPicture";
import { WorkList } from "@/components/sections/WorkList";

type WorkDict = Dictionary["work"];

const sorted = [...projects].sort((a, b) => a.order - b.order);
const pad = (n: number) => String(n).padStart(2, "0");
const headline = (title: string) => title.split(":")[0];

function Arrow() {
  return (
    <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
      →
    </span>
  );
}

function FeaturedRow({ p, i, dict, lang }: { p: Project; i: number; dict: WorkDict; lang: Locale }) {
  const flip = i % 2 === 1;
  return (
    <li className="border-t border-border">
      <ScrollReveal>
        <a
          href={localHref(lang, `/projects/${p.slug}/`)}
          className="group grid items-center gap-10 py-14 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent sm:py-20 lg:grid-cols-12 lg:gap-14"
        >
          <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
            <p className="font-mono text-5xl font-medium leading-none tracking-tight text-accent sm:text-6xl">{pad(i + 1)}</p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">{dict.filters[p.category]}</p>
            <h3
              className="mt-3 text-balance font-display font-bold leading-[1.04] tracking-[-0.03em] text-text"
              style={{ fontSize: "clamp(2rem, 3vw, 2.625rem)" }}
            >
              {headline(p.title)}
            </h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-text-secondary">{p.outcome ?? p.tagline}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {p.techStack.slice(0, 4).map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-secondary">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                {dict.view} <Arrow />
              </span>
              {p.employer === "metaviz" && (
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary/70">{dict.employerNote}</span>
              )}
            </div>
          </div>
          <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
            <TiltCard>
              <div className="overflow-hidden rounded-2xl border border-border bg-bg-card p-1.5 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)] transition-[border-color,box-shadow] duration-500 group-hover:border-border-hover group-hover:shadow-[0_50px_100px_-40px_rgba(15,23,42,0.45)] dark:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
                <WorkPicture
                  slug={p.slug}
                  sizes="(min-width: 1280px) 680px, (min-width: 1024px) 56vw, 100vw"
                  className="overflow-hidden rounded-[11px]"
                />
              </div>
            </TiltCard>
          </div>
        </a>
      </ScrollReveal>
    </li>
  );
}

function ListRow({ p, n, dict, lang }: { p: Project; n: number; dict: WorkDict; lang: Locale }) {
  return (
    <a
      href={localHref(lang, `/projects/${p.slug}/`)}
      className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-t border-border py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:grid-cols-[3.5rem_1fr_15rem_2rem] sm:py-7"
    >
      <span className="hidden font-mono text-xs text-text-secondary sm:block">{pad(n)}</span>
      <span className="relative z-20 font-display text-xl font-semibold leading-snug tracking-tight text-text transition-transform duration-300 ease-out sm:text-2xl sm:group-hover:translate-x-2">
        {headline(p.title)}
      </span>
      <span className="col-start-1 row-start-2 flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary sm:col-start-auto sm:row-start-auto">
        <span>{dict.filters[p.category]}</span>
        {p.employer === "metaviz" && <span className="text-text-secondary/60">{dict.employerNote}</span>}
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

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} className="mb-12 sm:mb-16" />
        <ol>
          {featured.map((p, i) => (
            <FeaturedRow key={p.slug} p={p} i={i} dict={dict} lang={lang} />
          ))}
        </ol>
        <WorkList
          title={dict.more}
          filterLabel={dict.filterLabel}
          filterNames={dict.filters}
          items={rest.map((p, i) => ({
            slug: p.slug,
            category: p.category,
            row: <ListRow p={p} n={featured.length + i + 1} dict={dict} lang={lang} />,
          }))}
        />
      </div>
    </section>
  );
}
