"use client";

import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Selected Work" className="mb-16" />
        <div className="space-y-12">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
