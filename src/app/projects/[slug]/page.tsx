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
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="pt-24 pb-32 px-4 sm:px-6">
      {/* Back link */}
      <div className="max-w-3xl mx-auto">
        <Link
          href={asset("/#projects")}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          All Projects
        </Link>
      </div>

      {/* 3D coverflow carousel nav */}
      <div className="max-w-5xl mx-auto mb-10">
        <div
          className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] flex items-center justify-center"
          style={{ perspective: "1600px" }}
        >
          {/* Previous peek (left, blurred + tilted) */}
          {prevProject && (
            <Link
              href={asset(`/projects/${prevProject.slug}/`)}
              aria-label={`Previous project: ${prevProject.title}`}
              className="absolute left-0 sm:left-4 md:left-8 top-1/2 w-[28%] sm:w-[24%] md:w-[22%] aspect-[16/9] rounded-xl overflow-hidden border border-border opacity-50 hover:opacity-90 transition-opacity duration-500 group"
              style={{
                transform:
                  "translateY(-50%) rotateY(22deg) translateZ(-90px) scale(0.92)",
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={asset(prevProject.image)}
                alt=""
                fill
                sizes="(max-width: 640px) 28vw, 22vw"
                className="object-cover"
                style={{ filter: "blur(3px)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg/40 to-bg/70 group-hover:from-bg/20 group-hover:to-bg/50 transition-colors duration-500" />
            </Link>
          )}

          {/* Current project (centred, sharp, large) */}
          <div
            className="relative w-[68%] sm:w-[68%] md:w-[68%] aspect-[16/9] rounded-2xl overflow-hidden border border-border z-10"
            style={{
              transform: "translateZ(0)",
              boxShadow:
                "0 20px 60px -20px rgba(0,0,0,0.5), 0 0 0 1px var(--color-border)",
            }}
          >
            <Image
              src={asset(project.image)}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 68vw, 60vw"
              className="object-cover"
              priority
              quality={88}
            />
          </div>

          {/* Next peek (right, blurred + tilted) */}
          {nextProject && (
            <Link
              href={asset(`/projects/${nextProject.slug}/`)}
              aria-label={`Next project: ${nextProject.title}`}
              className="absolute right-0 sm:right-4 md:right-8 top-1/2 w-[28%] sm:w-[24%] md:w-[22%] aspect-[16/9] rounded-xl overflow-hidden border border-border opacity-50 hover:opacity-90 transition-opacity duration-500 group"
              style={{
                transform:
                  "translateY(-50%) rotateY(-22deg) translateZ(-90px) scale(0.92)",
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={asset(nextProject.image)}
                alt=""
                fill
                sizes="(max-width: 640px) 28vw, 22vw"
                className="object-cover"
                style={{ filter: "blur(3px)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-bg/40 to-bg/70 group-hover:from-bg/20 group-hover:to-bg/50 transition-colors duration-500" />
            </Link>
          )}

          {/* Left arrow (overlay) */}
          {prevProject && (
            <Link
              href={asset(`/projects/${prevProject.slug}/`)}
              aria-label={`Previous: ${prevProject.title}`}
              className="absolute left-1 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border border-border hover:border-accent/50 flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-200"
              style={{ background: "var(--color-bg-glass)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
          )}

          {/* Right arrow (overlay) */}
          {nextProject && (
            <Link
              href={asset(`/projects/${nextProject.slug}/`)}
              aria-label={`Next: ${nextProject.title}`}
              className="absolute right-1 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border border-border hover:border-accent/50 flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-200"
              style={{ background: "var(--color-bg-glass)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          )}
        </div>

        {/* Caption row: prev title · counter · next title */}
        <div className="mt-5 flex items-center justify-between gap-4 px-2 sm:px-6 text-xs text-text-secondary">
          {prevProject ? (
            <Link
              href={asset(`/projects/${prevProject.slug}/`)}
              className="flex items-center gap-2 hover:text-accent transition-colors max-w-[35%] truncate"
            >
              <span aria-hidden>←</span>
              <span className="truncate">{prevProject.title}</span>
            </Link>
          ) : (
            <span />
          )}

          <span className="text-text-secondary/60 tabular-nums whitespace-nowrap text-[11px]">
            {currentIndex + 1} / {projects.length}
          </span>

          {nextProject ? (
            <Link
              href={asset(`/projects/${nextProject.slug}/`)}
              className="flex items-center gap-2 hover:text-accent transition-colors max-w-[35%] justify-end truncate"
            >
              <span className="truncate">{nextProject.title}</span>
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      {/* Title + content block */}
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text">
          {project.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-text-secondary">
          {project.tagline}
        </p>

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

        {/* Case study sections */}
        <div className="mt-14 space-y-10">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text mb-3">
              The Problem
            </h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
              {project.problem}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text mb-3">
              The Solution
            </h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
              {project.solution}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text mb-3">
              The Result
            </h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
              {project.result}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
