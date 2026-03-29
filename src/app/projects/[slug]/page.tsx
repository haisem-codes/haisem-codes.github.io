import { notFound } from "next/navigation";
import Image from "next/image";
import { asset } from "@/lib/utils";
import Link from "next/link";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} | Haisem Naeem`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="pt-24 pb-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href={asset("/#projects")}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          All Projects
        </Link>

        {/* Project quick nav - pill tabs */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={asset(`/projects/${p.slug}/`)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                p.slug === slug
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "bg-bg-card text-text-secondary border border-border hover:border-border-hover hover:text-text"
              }`}
            >
              {p.title}
            </Link>
          ))}
        </div>

        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border mb-10">
          <Image
            src={asset(project.image)}
            alt={project.title}
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text">
          {project.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-text-secondary">{project.tagline}</p>

        {/* Tech stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
              Live Demo &rarr;
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
              GitHub &rarr;
            </a>
          )}
        </div>

        {/* Case study sections */}
        <div className="mt-14 space-y-10">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text mb-3">The Problem</h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{project.problem}</p>
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text mb-3">The Solution</h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{project.solution}</p>
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text mb-3">The Result</h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{project.result}</p>
          </div>
        </div>

        {/* Prev / Next navigation - full width cards */}
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={asset(`/projects/${prevProject.slug}/`)}
              className="group p-4 rounded-xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-200"
            >
              <span className="text-xs text-text-secondary">Previous</span>
              <p className="mt-1 text-sm font-medium text-text group-hover:text-accent transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={asset(`/projects/${nextProject.slug}/`)}
              className="group p-4 rounded-xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-200 text-right"
            >
              <span className="text-xs text-text-secondary">Next</span>
              <p className="mt-1 text-sm font-medium text-text group-hover:text-accent transition-colors flex items-center justify-end gap-2">
                {nextProject.title}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
