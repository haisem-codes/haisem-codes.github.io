import type { PersonalInfo } from "@/types";

export const personal: PersonalInfo = {
  name: "Haisem Naeem",
  firstName: "HAISEM",
  title: "AI Engineer",
  tagline: "Building systems that think",
  bio: [
    "I build production-ready AI systems that actually work \u2014 from custom LLM agents and RAG pipelines to voice AI solutions and full-stack AI applications.",
    "As Technical Lead at Metaviz AI (Top Rated agency, 100% Job Success), I\u2019ve led teams building AI products used by thousands \u2014 including a UAE government platform with 10,000+ downloads.",
  ],
  email: "haisem@metaviz.pro",
  socials: [
    {
      platform: "Email",
      url: "mailto:haisem@metaviz.pro",
      label: "haisem@metaviz.pro",
    },
    {
      platform: "Upwork",
      url: "https://www.upwork.com/agencies/metavizai/",
      label: "Metaviz AI on Upwork",
    },
    {
      platform: "GitHub",
      url: "https://github.com/haisem-codes",
      label: "haisem-codes",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/haisem-naeem/",
      label: "Haisem Naeem",
    },
  ],
  stats: [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Agency Job Success", value: 100, suffix: "%" },
    { label: "Users Served", value: 10, suffix: "K+" },
  ],
};
