export interface Project {
  slug: string;
  title: string;
  tagline: string;
  outcome?: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  category: ProjectCategory;
  context?: "team" | "client";
  sv?: ProjectCopy;
}

export type ProjectCategory = "business" | "products" | "research";

export type ProjectCopy = Partial<
  Pick<Project, "title" | "tagline" | "outcome" | "description" | "problem" | "solution" | "result">
>;

export interface PersonalInfo {
  email: string;
  phone: string;
  socials: { platform: string; url: string; label: string }[];
}
