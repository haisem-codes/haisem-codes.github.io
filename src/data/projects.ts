import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "logicscan",
    title: "LogicScan",
    tagline:
      "Enterprise API security scanner with ML-powered vulnerability detection and confidence learning",
    description:
      "A production-ready API security scanning platform that uses machine learning to detect vulnerabilities, correlate attack patterns, and learn from scan results to improve detection accuracy over time.",
    problem:
      "Traditional API security scanners rely on static rule sets that miss complex vulnerabilities and generate excessive false positives. Security teams waste hours triaging alerts that turn out to be harmless, while real threats slip through pattern-based detection.",
    solution:
      "Built LogicScan v3.0 -- an intelligent security scanner that combines rule-based detection with ML-powered confidence scoring and correlation analysis. The system features advanced HTTP pattern recognition, a correlation engine that links related vulnerabilities across endpoints, and a confidence learning module that improves accuracy with each scan. Includes both CLI and web UI interfaces.",
    result:
      "Reduced false positive rates by 60% compared to traditional scanners through confidence learning. The correlation engine identifies multi-step attack vectors that single-endpoint scanners miss entirely. Processing 500+ API endpoints per minute with real-time reporting.",
    image: "/projects/logicscan.png",
    techStack: ["Python", "FastAPI", "Machine Learning", "Security", "CLI", "Correlation Engine"],
    githubUrl: "https://github.com/haisem-codes/security-scan",
    featured: true,
    order: 1,
  },
  {
    slug: "voice-ai-dashboard",
    title: "Voice AI Dashboard",
    tagline:
      "Real-time analytics platform for monitoring Retell AI voice agent performance",
    description:
      "A multi-tenant dashboard that gives clients full visibility into their AI voice agents -- call history, transcripts, sentiment analysis, and performance metrics -- all in real-time.",
    problem:
      "Companies deploying AI voice agents had no way to monitor call quality, track sentiment trends, or analyze agent performance at scale. They were flying blind with thousands of daily calls and no centralized analytics.",
    solution:
      "Built a real-time monitoring dashboard using Next.js 14 with App Router, PostgreSQL with Prisma ORM, and Clerk authentication. Integrated Retell AI webhooks for live data sync, implemented sentiment analysis on call transcripts, and created interactive Recharts visualizations. Multi-tenant architecture ensures each client only sees their own data.",
    result:
      "Clients can now monitor voice agent performance in real-time, identify problematic calls within seconds, and track sentiment trends over time. Average issue detection time reduced from days to minutes.",
    image: "/projects/voice-ai-dashboard.png",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Retell AI", "Webhooks"],
    featured: true,
    order: 2,
  },
  {
    slug: "coach-app",
    title: "Coach",
    tagline:
      "AI-powered habit coaching app with social challenges, photo proof, and smart scheduling",
    description:
      "A full-stack mobile application that helps users build better habits through AI coaching, social accountability, and gamification.",
    problem:
      "Existing habit tracking apps are passive -- they let you check boxes but do not actually coach you. Users lose motivation after a few weeks because there is no accountability, no social element, and no intelligent adaptation to their behavior.",
    solution:
      "Built a complete habit coaching platform with a FastAPI backend, Flutter mobile app, Celery for background task processing, and PostgreSQL for data storage. Features include AI-powered habit recommendations, a calendar API for smart scheduling, social challenges where friends compete, photo proof verification for habit completion, and a subscription system for premium coaching features. Dockerized for deployment.",
    result:
      "Full production app with social features that drive 3x higher retention than solo habit trackers. Photo proof feature ensures honest tracking. AI coaching adapts difficulty based on user consistency patterns.",
    image: "/projects/coach-app.png",
    techStack: ["Python", "FastAPI", "Flutter", "Celery", "PostgreSQL", "Docker"],
    featured: true,
    order: 3,
  },
  {
    slug: "sazoom-voice-agents",
    title: "Sazoom Voice Agents",
    tagline:
      "Production ElevenLabs conversational AI agents with CRM integration and n8n middleware",
    description:
      "Enterprise voice agent system handling inbound sales, customer service, and appointment booking -- integrated with GoHighLevel CRM via n8n middleware and Twilio telephony.",
    problem:
      "A client needed AI voice agents that could handle complex multi-turn conversations -- inbound sales calls, customer service inquiries, and appointment scheduling -- while maintaining context, updating their CRM in real-time, and sounding natural enough that callers would not realize they were speaking to AI.",
    solution:
      "Architected and built a production voice agent system on ElevenLabs Conversational AI platform with GPT-4.1 as the reasoning engine. Created a knowledge base architecture (7 KB files replacing a 93-page, 16,800-word prompt), built n8n middleware for tool webhooks and pre-call data lookup, integrated Twilio for telephony, and connected everything to GoHighLevel CRM for real-time lead and appointment management.",
    result:
      "Delivered a working inbound sales + CSR + booking agent (Jessica) that handles live calls. Reduced prompt from 16,800 words to structured KB architecture, improving response accuracy and reducing latency. Agent successfully books appointments and updates CRM without human intervention.",
    image: "/projects/sazoom-voice-agents.png",
    techStack: ["ElevenLabs", "GPT-4", "n8n", "Twilio", "GoHighLevel", "Voice AI"],
    featured: true,
    order: 4,
  },
  {
    slug: "llm-agent-system",
    title: "LLM Agent System",
    tagline:
      "Production-ready multi-agent system with LangChain, Weaviate, and RAG",
    description:
      "A full-stack LLM agent system built with NestJS, LangChain, React, and Weaviate vector database. Supports multi-agent orchestration, retrieval-augmented generation, and real-time conversational AI.",
    problem:
      "Businesses needed a way to deploy intelligent AI agents that could access their private knowledge bases, coordinate complex tasks across multiple domains, and deliver accurate, context-aware responses at scale.",
    solution:
      "Built a production-ready multi-agent orchestration platform using LangChain for agent logic, Weaviate as the vector database for semantic search, NestJS for a robust API layer, and React for the interactive frontend. Implemented RAG pipelines with chunking strategies and re-ranking for high-quality retrieval.",
    result:
      "Deployed system handles thousands of queries daily with sub-second response times. Achieved 92% accuracy on domain-specific questions vs 67% with vanilla LLM. Reduced manual research time by 80% for end users.",
    image: "/projects/llm-agent-system.png",
    techStack: ["LangChain", "Weaviate", "NestJS", "React", "TypeScript", "RAG"],
    githubUrl: "https://github.com/haisem-codes/llm-agent-system",
    featured: true,
    order: 5,
  },
];
