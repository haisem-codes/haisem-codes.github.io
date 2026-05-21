"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  const secondary = projects
    .filter((p) => !p.featured)
    .sort((a, b) => a.order - b.order);

  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Selected Work" className="mb-16" />

        <div className="space-y-12">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {secondary.length > 0 && (
          <>
            <div className="mt-16 text-center">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border hover:border-border-hover text-sm text-text-secondary hover:text-text transition-colors duration-200 cursor-pointer"
                aria-expanded={showAll}
              >
                {showAll
                  ? "Show less"
                  : `View all projects (${secondary.length} more)`}
                <span
                  className={`transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                  aria-hidden
                >
                  ↓
                </span>
              </button>
            </div>

            {showAll && (
              <div className="mt-12 space-y-12">
                {secondary.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={featured.length + i}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
