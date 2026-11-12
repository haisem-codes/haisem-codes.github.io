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
  context?: ProjectContext;
  sv?: ProjectCopy;
}

/** "metaviz" is Metaviz work; "client" is Metaviz work delivered for an outside client. */
export type ProjectContext = "metaviz" | "client";

export type ProjectCategory = "business" | "products" | "research";

export type ProjectCopy = Partial<
  Pick<Project, "title" | "tagline" | "outcome" | "description" | "problem" | "solution" | "result">
>;

export interface TextProject {
  slug: string;
  title: string;
  description: string;
  order: number;
  category: ProjectCategory;
  context?: ProjectContext;
  sv?: Partial<Pick<TextProject, "title" | "description">>;
}

export interface PersonalInfo {
  email: string;
  phone: string;
  socials: { platform: string; url: string; label: string }[];
}
