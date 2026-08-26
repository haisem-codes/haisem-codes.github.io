export interface Project {
  slug: string;
  title: string;
  tagline: string;
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
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  animationType: "neural" | "wave" | "typing" | "chart" | "gear" | "pulse";
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  items: string[];
}

export interface Credential {
  id: string;
  label: string;
  title: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface TechItem {
  name: string;
  icon: string;
  category: "ai" | "backend" | "frontend" | "devops" | "data";
}

export interface PersonalInfo {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  location: string;
  availability: string;
  bio: string[];
  email: string;
  phone: string;
  socials: { platform: string; url: string; label: string }[];
  stats: { label: string; value: number; suffix: string }[];
}
