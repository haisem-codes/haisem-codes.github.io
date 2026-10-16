import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, localHref, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n";
import { projects, localize } from "@/data/projects";
import { personal } from "@/data/personal";
import { asset } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClientBoundary } from "@/components/ui/ClientBoundary";
import { SkillsBento } from "@/components/sections/SkillsBento";
import { Credentials } from "@/components/sections/Credentials";
import { ArchitectureDiagram } from "@/components/hire/ArchitectureDiagram";
import { DecisionTable } from "@/components/hire/DecisionTable";
import { CodeExcerpt } from "@/components/hire/CodeExcerpt";
import { Research } from "@/components/hire/Research";
import { Toc } from "@/components/hire/Toc";

type Props = { params: Promise<{ lang: string }> };
type HireDict = Dictionary["hire"];

const SECTIONS = ["summary", "system", "decisions", "code", "skills", "credentials", "research"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    title: d.meta.hireTitle,
    description: d.meta.hireDescription,
    alternates: {
      canonical: localHref(lang, "/hire/"),
      languages: { en: "/en/hire/", sv: "/sv/hire/", "x-default": "/en/hire/" },
    },
    openGraph: { title: d.meta.hireTitle, description: d.meta.hireDescription, url: localHref(lang, "/hire/"), type: "website" },
  };
}

function CvButton({ label }: { label: string }) {
  return (
    <a
      href={asset("/Haisem-Naeem-CV.pdf")}
      download
      className="inline-flex min-h-[52px] items-center gap-2 bg-button px-7 text-base font-medium text-button-text transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {label}
      <span aria-hidden>↓</span>
    </a>
  );
}

function Section({ id, dict, children }: { id: string; dict: { index: string; eyebrow: string; title: string }; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 py-14 first-of-type:pt-0 sm:py-20">
      <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} className="rise" titleId={`${id}-title`} size="compact" />
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

function Summary({ dict, work, lang }: { dict: HireDict["summary"]; work: Dictionary["work"]; lang: Locale }) {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .map((p) => localize(p, lang));
  return (
    <div className="grid gap-12 xl:grid-cols-[1fr_20rem] xl:gap-14">
      <div className="rise space-y-5">
        {dict.paragraphs.map((p, i) => (
          <p key={p} className={i === 0 ? "text-lg leading-relaxed text-text sm:text-xl" : "text-lg leading-relaxed text-text-secondary"}>
            {p}
          </p>
        ))}
        <h3 className="pt-6 font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">{dict.workTitle}</h3>
        <ul className="border-t border-border">
          {featured.map((p) => (
            <li key={p.slug}>
              <a
                href={localHref(lang, `/projects/${p.slug}/`)}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-border py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="font-display text-lg leading-snug font-semibold tracking-[-0.01em] text-text transition-transform duration-300 group-hover:translate-x-1">
                  {p.title.split(":")[0]}
                </span>
                <span className="text-sm font-medium text-accent">
                  {dict.view} <span aria-hidden>→</span>
                </span>
                <span className="col-span-2 font-mono text-[11px] tracking-[0.14em] text-text-secondary uppercase">
                  {work.categories[p.category]}
                  {p.employer === "metaviz" && ` · ${work.employerNote}`}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <dl className="rise self-start border-t border-border">
        {dict.facts.map((f) => (
          <div key={f.k} className="border-b border-border py-3.5">
            <dt className="font-mono text-[11px] tracking-[0.14em] text-text-secondary uppercase">{f.k}</dt>
            <dd className="mt-1 text-[15px] leading-snug text-text">{f.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function System({ dict }: { dict: HireDict["system"] }) {
  return (
    <>
      <p className="rise max-w-2xl text-lg leading-relaxed text-text-secondary">{dict.intro}</p>
      <div className="rise mt-10">
        <ArchitectureDiagram dict={dict} />
      </div>
      <dl className="rise mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
        {dict.notes.map((n) => (
          <div key={n.k} className="bg-bg p-5">
            <dt className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">{n.k}</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-text">{n.v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 flex items-center gap-3 text-sm text-text-secondary">
        <span aria-hidden className="h-px w-6 bg-border-hover" />
        {dict.confidential}
      </p>
    </>
  );
}

export default async function HirePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  const { hire } = d;
  const toc = SECTIONS.map((id) => ({ id, index: hire[id].index, label: hire[id].eyebrow }));

  return (
    <main>
      <header className="px-6 pt-36 pb-14 sm:pt-44 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">
            {hire.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
          <h1 className="mt-6 max-w-4xl font-display leading-[1.02] font-bold tracking-[-0.035em] text-balance text-text lg:max-w-[calc(50%+var(--bulb-dx)-5.5rem)]" style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.75rem)" }}>
            {hire.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">{hire.intro}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <CvButton label={hire.cv} />
            <a href="#system" className="inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {hire.readCase} <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </header>

      <div className="px-6 pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl border-t border-border pt-10 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-x-14 lg:pt-16 xl:gap-x-20">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <ClientBoundary>
                <Toc items={toc} label={hire.toc.label} nav={hire.toc.nav} />
              </ClientBoundary>
            </div>
          </div>

          <div className="min-w-0">
            <details className="toc-mobile mb-12 border-y border-border lg:hidden">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between font-mono text-xs tracking-[0.18em] text-text uppercase">
                {hire.toc.label}
                <span aria-hidden className="toc-mobile-icon text-accent">+</span>
              </summary>
              <nav aria-label={hire.toc.nav}>
                <ol className="pb-4">
                  {toc.map((it) => (
                    <li key={it.id}>
                      <a href={`#${it.id}`} className="flex min-h-11 items-center gap-3 text-[15px] text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                        <span className="font-mono text-xs text-accent tabular-nums">{it.index}</span>
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>

            <Section id="summary" dict={hire.summary}>
              <Summary dict={hire.summary} work={d.work} lang={lang} />
            </Section>
            <Section id="system" dict={hire.system}>
              <System dict={hire.system} />
            </Section>
            <Section id="decisions" dict={hire.decisions}>
              <DecisionTable dict={hire.decisions} />
            </Section>
            <Section id="code" dict={hire.code}>
              <p className="rise mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary">{hire.code.intro}</p>
              <div className="rise">
                <CodeExcerpt dict={hire.code} />
              </div>
            </Section>
            <Section id="skills" dict={hire.skills}>
              <SkillsBento dict={hire.skills} />
            </Section>
            <Section id="credentials" dict={hire.credentials}>
              <Credentials dict={hire.credentials} />
            </Section>
            <Section id="research" dict={hire.research}>
              <Research dict={hire.research} />
            </Section>

            <div data-toc-end className="rise mt-4 flex flex-col gap-6 bg-accent-tint/55 p-7 sm:p-10 md:flex-row md:items-end md:justify-between dark:bg-accent-tint/30">
              <div>
                <p className="font-display text-3xl leading-tight font-bold tracking-[-0.03em] text-balance text-text sm:text-4xl">{hire.close.title}</p>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{hire.close.sub}</p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-3">
                <CvButton label={hire.cv} />
                <a href={`mailto:${personal.email}`} className="text-sm text-text-secondary underline decoration-border-hover underline-offset-4 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  {hire.close.orEmail} {personal.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
