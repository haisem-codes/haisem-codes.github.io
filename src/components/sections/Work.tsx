import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { projects, localize } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WorkGrid } from "@/components/sections/WorkGrid";

const sorted = [...projects].sort((a, b) => a.order - b.order);

export function Work({ dict, lang }: { dict: Dictionary["work"]; lang: Locale }) {
  const items = sorted.map((p) => ({
    slug: p.slug,
    category: p.category,
    card: <ProjectCard project={localize(p, lang)} lang={lang} viewLabel={dict.view} employerNote={dict.employerNote} />,
  }));

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-6xl">{dict.title}</h2>
        </ScrollReveal>
        <WorkGrid items={items} filterLabel={dict.filterLabel} filterNames={dict.filters} />
      </div>
    </section>
  );
}
