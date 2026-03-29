"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { fadeInUp, silkEase } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link href={`/projects/${project.slug}/`} className="group block">
        <div className="relative rounded-2xl overflow-hidden bg-bg-card border border-border transition-colors duration-200 group-hover:border-border-hover">
          {/* Editorial number */}
          <span className="absolute top-4 left-4 z-10 font-mono text-6xl font-bold text-text opacity-[0.07] select-none">
            {number}
          </span>

          {/* Image container */}
          <div className="relative aspect-[16/9] overflow-hidden bg-bg-card">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: silkEase }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
                loading={index < 2 ? "eager" : "lazy"}
                quality={80}
              />
            </motion.div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-sm font-medium text-accent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                View Case Study &rarr;
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-text">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-text-secondary line-clamp-2">
              {project.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full border border-border text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
