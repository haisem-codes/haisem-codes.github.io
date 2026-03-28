import { notFound } from "next/navigation";
import Image from "next/image";
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
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-12"
        >
          &larr; Back to projects
        </Link>

        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border mb-12">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-text-secondary">{project.tagline}</p>

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
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              Live Demo &rarr;
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              GitHub &rarr;
            </a>
          )}
        </div>

        {/* Case study */}
        <div className="mt-16 space-y-12">
          <div>
            <h2 className="font-display text-2xl font-semibold text-text mb-4">
              The Problem
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-text mb-4">
              The Solution
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-text mb-4">
              The Result
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-20 pt-8 border-t border-border flex justify-between">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}/`}
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              &larr; {prevProject.title}
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}/`}
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {nextProject.title} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}
