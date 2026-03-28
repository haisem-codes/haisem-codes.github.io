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

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
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
  bio: string[];
  email: string;
  socials: { platform: string; url: string; label: string }[];
  stats: { label: string; value: number; suffix: string }[];
}
