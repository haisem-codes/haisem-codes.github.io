import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, localize } from "@/data/projects";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Metadata } from "next";
import type { Project } from "@/types";
import { locales, isLocale, localHref, type Locale } from "@/i18n/config";
import { StartCta } from "@/components/sections/StartCta";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkPicture } from "@/components/ui/WorkPicture";
import { TransitionLink } from "@/components/ui/TransitionLink";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const found = projects.find((p) => p.slug === slug);
  if (!isLocale(lang)) return { title: "Not Found" };
  if (!found) return { title: getDictionary(lang).work.notFound };
  const project = localize(found, lang);
  const title = `${project.title} | Haisem N.`;
  const url = localHref(lang, `/projects/${slug}/`);
  return {
    title,
    description: project.tagline,
    alternates: {
      canonical: url,
      languages: {
        en: localHref("en", `/projects/${slug}/`),
        sv: localHref("sv", `/projects/${slug}/`),
        "x-default": localHref("en", `/projects/${slug}/`),
      },
    },
    openGraph: { title, description: project.tagline, url, type: "website" },
  };
}

type WorkDict = Dictionary["work"];
type Highlight = { value: string; label: string };

/**
 * Below 640px the mockup is shown at 1.6x so its UI text stays legible; this is the transform-origin
 * that keeps each screenshot's most telling region (issue card, live call, terminal...) in frame.
 */
const MOBILE_FOCUS: Record<string, string> = {
  "ai-compliance-platform": "100% 0%",
  "voice-agents-suite": "60% 15%",
  postura: "0% 50%",
  coach: "50% 50%",
  "ai-real-estate-marketplace": "100% 0%",
  "claude-code-mastery": "63% 37%",
  "b2b-travel-saas": "10% 10%",
  "ai-craftsmen-marketplace": "50% 37%",
  "ai-tools-suite": "63% 10%",
  "ai-video-pipeline": "0% 10%",
  dietapp: "50% 50%",
};

const SECTIONS = ["problem", "solution", "result"] as const;
const headline = (title: string) => title.split(":")[0];
const pad = (n: number) => String(n).padStart(2, "0");

function Pager({ p, dir, dict, lang }: { p: Project; dir: "prev" | "next"; dict: WorkDict; lang: Locale }) {
  const next = dir === "next";
  return (
    <TransitionLink
      href={localHref(lang, `/projects/${p.slug}/`)}
      data-cursor="view"
      className={`group grid grid-cols-[6.5rem_1fr] items-center gap-5 py-7 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:grid-cols-[9rem_1fr] sm:gap-7 sm:py-9 ${
        next ? "sm:border-l sm:border-border sm:pl-8" : "sm:pr-8"
      }`}
    >
      <div
        style={{ "--vt": `project-${p.slug}` } as CSSProperties}
        className="vt-shared overflow-hidden ring-1 ring-black/5 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:-translate-y-0.5 dark:ring-white/10"
      >
        <WorkPicture slug={p.slug} sizes="144px" />
      </div>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] tracking-[0.18em] text-text-secondary uppercase">
          {next ? (
            <>
              {dict.next} <span aria-hidden>→</span>
            </>
          ) : (
            <>
              <span aria-hidden>←</span> {dict.prev}
            </>
          )}
        </span>
        <span className="mt-2 block font-display text-lg leading-snug font-semibold tracking-tight text-balance text-text transition-colors group-hover:text-accent sm:text-xl">
          {headline(p.title)}
        </span>
      </span>
    </TransitionLink>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) notFound();
  const { work, cta } = getDictionary(lang);
  const project = localize(projects[currentIndex], lang);
  const prevProject = currentIndex > 0 ? localize(projects[currentIndex - 1], lang) : null;
  const nextProject = currentIndex < projects.length - 1 ? localize(projects[currentIndex + 1], lang) : null;
  const englishOnly = lang === "sv" && !project.sv?.problem;
  const highlight = (work.highlights as Record<string, Highlight>)[project.slug];
  const focus = MOBILE_FOCUS[project.slug];
  const copyLang = englishOnly ? "en" : undefined;

  return (
    <main className="pt-28 sm:pt-32">
      <div className="px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            href={localHref(lang, "/#work")}
            className="-ml-1 inline-flex min-h-[44px] items-center gap-2 px-1 text-sm text-text-secondary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden>←</span>
            {work.back}
          </Link>

          <header className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">
                <span className="tabular-nums">
                  {pad(currentIndex + 1)} / {pad(projects.length)}
                </span>{" "}
                — {work.categories[project.category]}
                {project.employer === "metaviz" && (
                  <>
                    <span aria-hidden> · </span>
                    <span className="whitespace-nowrap">{work.employerNote}</span>
                  </>
                )}
              </p>
              <h1
                className="mt-4 font-display leading-[1.02] font-bold tracking-[-0.03em] text-balance text-text"
                style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.75rem)" }}
              >
                {project.title}
              </h1>
            </div>
            <div className="lg:col-span-4">
              {highlight && (
                <p className="mb-6">
                  <span className="-ml-[0.04em] block font-display text-[3.5rem] leading-[0.85] font-bold tracking-[-0.05em] whitespace-nowrap text-transparent tabular-nums [-webkit-text-stroke:1.5px_var(--color-accent)] sm:text-[4.5rem]">
                    {highlight.value}
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-balance text-text-secondary">{highlight.label}</span>
                </p>
              )}
              <p lang={copyLang} className="text-lg leading-relaxed text-text-secondary">
                {project.tagline}
              </p>
              {(project.liveUrl || project.githubUrl) && (
                <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                      {work.live} <span aria-hidden>↗</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                      {work.github} <span aria-hidden>↗</span>
                    </a>
                  )}
                </p>
              )}
            </div>
          </header>
        </div>
      </div>

      <div className="mt-12 bg-accent-tint/55 px-6 py-8 sm:mt-16 sm:py-14 dark:bg-accent-tint/30">
        <div className="mx-auto max-w-6xl">
          <div
            style={{ "--vt": `project-${project.slug}`, "--focus": focus } as CSSProperties}
            className="vt-shared overflow-hidden shadow-[0_40px_80px_-40px_rgba(15,23,42,0.4)] ring-1 ring-black/5 dark:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] dark:ring-white/10"
          >
            <WorkPicture
              slug={project.slug}
              alt={project.title}
              sizes="(min-width: 1200px) 1152px, (min-width: 640px) calc(100vw - 48px), 160vw"
              className={focus ? "max-sm:origin-[var(--focus)] max-sm:scale-[1.6]" : undefined}
            />
          </div>
        </div>
      </div>

      <div className="px-6 pt-16 pb-4 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          {englishOnly && (
            <p lang="sv" className="mb-12 border-l-2 border-accent py-1 pl-4 text-sm text-text-secondary">
              {work.englishOnly}
            </p>
          )}
          {SECTIONS.map((k, i) => (
            <section
              key={k}
              aria-labelledby={`case-${k}`}
              className="grid gap-6 border-t border-border py-12 first-of-type:border-t-0 first-of-type:pt-0 sm:py-16 lg:grid-cols-12 lg:gap-12"
            >
              <SectionHeader index={pad(i + 1)} eyebrow={work.caseEyebrow[k]} title={work[k]} titleId={`case-${k}`} size="compact" className="lg:col-span-5" />
              <div className="lg:col-span-7 lg:pt-9">
                <p lang={copyLang} className="max-w-2xl text-lg leading-relaxed text-text-secondary">
                  {project[k]}
                </p>
                {k === "solution" && (
                  <div className="mt-10">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-text-secondary uppercase">{work.stack}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <li key={tech} className="border border-border-hover px-2.5 py-1 font-mono text-xs text-text">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          ))}

          {(prevProject || nextProject) && (
            <nav aria-label={work.more} className="mt-4 grid border-y border-border sm:grid-cols-2">
              {prevProject ? <Pager p={prevProject} dir="prev" dict={work} lang={lang} /> : <span aria-hidden className="hidden sm:block" />}
              {nextProject && (
                <div className={prevProject ? "border-t border-border sm:border-t-0" : undefined}>
                  <Pager p={nextProject} dir="next" dict={work} lang={lang} />
                </div>
              )}
            </nav>
          )}
        </div>
      </div>

      <StartCta dict={cta} lang={lang} />
    </main>
  );
}
