import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, localHref } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { projects } from "@/data/projects";
import { asset } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillsBento } from "@/components/sections/SkillsBento";
import { Credentials } from "@/components/sections/Credentials";
import { TechMarquee } from "@/components/sections/TechMarquee";

type Props = { params: Promise<{ lang: string }> };

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

export default async function HirePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { hire } = getDictionary(lang);
  const stats = [
    { value: 2, suffix: "+", label: hire.stats.years },
    { value: 9, suffix: "", label: hire.stats.systems },
    { value: 1, suffix: "", label: hire.stats.publications },
  ];
  const featured = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

  return (
    <main>
      <section className="px-6 pt-36 pb-16 sm:pt-44 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.04] font-semibold tracking-tight text-balance text-text sm:text-7xl">
              {hire.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">{hire.intro}</p>
            <a
              href={asset("/Haisem-Naeem-CV.pdf")}
              download
              className="mt-10 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-accent px-7 text-base font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {hire.cv}
              <span aria-hidden>↓</span>
            </a>
          </ScrollReveal>

          <dl className="mt-16 grid grid-cols-3 gap-3 border-t border-border pt-10 sm:mt-24 sm:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="text-sm text-text-secondary sm:text-base">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight text-text sm:text-6xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SkillsBento title={hire.skillsTitle} />
      <Credentials title={hire.credentialsTitle} />
      <TechMarquee />

      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-6xl">{hire.workTitle}</h2>
          </ScrollReveal>
          <ul className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-2">
            {featured.map((p) => (
              <li key={p.slug}>
                <ScrollReveal className="h-full">
                  <a
                    href={localHref(lang, `/projects/${p.slug}/`)}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-card transition-colors duration-300 hover:border-border-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                      <Image
                        src={asset(p.image)}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight text-text">{p.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-text-secondary">{p.tagline}</p>
                    </div>
                  </a>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
