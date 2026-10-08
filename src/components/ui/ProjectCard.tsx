import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/utils";
import { localHref, type Locale } from "@/i18n/config";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  lang: Locale;
  viewLabel: string;
  employerNote: string;
  eager?: boolean;
}

export function ProjectCard({ project, lang, viewLabel, employerNote, eager }: ProjectCardProps) {
  return (
    <Link
      href={localHref(lang, `/projects/${project.slug}/`)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-card transition-colors duration-300 hover:border-border-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg">
        <Image
          src={asset(project.image)}
          alt=""
          fill
          sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {project.employer === "metaviz" && (
          <span className="mb-4 inline-flex self-start rounded-full border border-border px-3 py-1 text-xs text-text-secondary">
            {employerNote}
          </span>
        )}
        <h3 className="font-display text-xl leading-tight font-semibold tracking-tight text-text">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-base leading-relaxed text-text-secondary">{project.tagline}</p>
        <span className="mt-auto pt-6 text-sm font-medium text-accent">
          {viewLabel} <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
