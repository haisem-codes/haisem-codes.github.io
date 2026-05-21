import type { Project } from "@/types";

export const projects: Project[] = [
  // ===================== FEATURED (6) =====================

  {
    slug: "ai-compliance-platform",
    title: "AI Building-Code Compliance Platform",
    tagline:
      "End-to-end document AI for AEC compliance reviews — FastAPI + AWS Textract + GPT-5",
    description:
      "An AI-powered compliance review platform that ingests architectural and MEP drawings and verifies building-code compliance across 5 disciplines (mechanical, electrical, plumbing, structural, architectural). Automates what used to be days of manual reviewer work.",
    problem:
      "Compliance reviewers were manually scanning hundreds of pages per drawing, cross-referencing 5 building codes, and missing contradictions. Per-document turnaround: days. Manual review time was the bottleneck for every project.",
    solution:
      "Async processing pipeline (FastAPI 0.115 + Celery + Redis) routing PDFs through AWS Textract OCR, then GPT-5 with structured outputs for entity extraction (equipment tags, CFM values, breaker counts). Hybrid RAG over the building-code corpus (ChromaDB BAAI/bge-base-en-v1.5 + BM25 reranking) feeds compliance reasoning. Cost-aware orchestration caps per-document LLM spend at $15. Next.js 15 + React Query verification UI for inline edits and final sign-off.",
    result:
      "Saved ~80% of manual compliance-reviewer time per drawing. 143-endpoint REST API across 12 routers, 47/48 pytest pass rate, multi-tenant Supabase RLS, per-document LLM cost capped at $15. Hybrid RAG + BM25 reranking holds retrieval quality even on long, technical code sections.",
    image: "/projects/ai-compliance-platform.webp",
    techStack: [
      "FastAPI 0.115",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Supabase RLS",
      "ChromaDB",
      "AWS Textract",
      "OpenAI GPT-5",
      "LangChain",
      "Next.js 15",
      "TanStack Query",
      "Docker",
    ],
    featured: true,
    order: 1,
  },

  {
    slug: "voice-agents-suite",
    title: "Production Voice Agents — Retell + ElevenLabs + GHL + n8n",
    tagline:
      "Five inbound/outbound voice agents replacing receptionist work across real-estate and SMB",
    description:
      "Designed and shipped 5 production voice agents on Retell AI + ElevenLabs Conversational AI + GoHighLevel + n8n. Inbound concierge, outbound prospecting, multi-vertical sales/support/booking — including a single Sazoom agent serving 5 SMB verticals from one config.",
    problem:
      "Clients across real-estate and SMB verticals needed 24/7 call handling — missed calls equalled lost revenue. Existing voice agents either sounded robotic or broke at the CRM handoff.",
    solution:
      "Three Retell-based real-estate agents (Local Pro Concierge, Claire outbound prospector, Emma scheduler) plus a multi-vertical Sazoom agent on ElevenLabs Conversational AI with 15+ custom tools and a 3-mode flow (sales / support / booking). Externalised prompt rules into 11 semantic KB files. n8n middleware translates Retell webhooks into GoHighLevel contact and calendar operations with HOT/WARM/COLD lead classification in-call.",
    result:
      "Cut one client's prompt from 16,800 → 3,279 words (80% reduction), raised response-rule compliance from ~25% to 98%, reduced per-call token cost ~45%, and replaced ~1 receptionist FTE at one SMB client. Zero silent failures by design — every n8n path terminates in a Respond node.",
    image: "/projects/voice-agents-suite.webp",
    techStack: [
      "Retell AI",
      "ElevenLabs Conversational AI",
      "LiveKit Agents",
      "Twilio",
      "Deepgram",
      "OpenAI GPT-5 Mini",
      "GoHighLevel v2",
      "n8n",
      "Python",
    ],
    featured: true,
    order: 2,
  },

  {
    slug: "postura",
    title: "Postura — On-Device Ergonomic Assessment",
    tagline:
      "Real-time pose analysis + Cornell ROSA scoring, all offline, in Flutter",
    description:
      "A mobile app that captures side-view photos of desk workers and computes a Rapid Office Strain Assessment (ROSA) 1–10 risk score entirely on-device. No cloud round-trips, no privacy concerns, no per-assessment cloud bill.",
    problem:
      "Ergonomic assessments traditionally needed an in-person consultant or photos uploaded to cloud ML services. Slow, expensive, privacy-sensitive — and impossible to scale to one-time workplace audits across thousands of workstations.",
    solution:
      "Flutter 3.9 app with isolate-based YOLOv8n (TFLite FP16, 6.2 MB) for person + monitor detection at 2 fps, layered with MediaPipe Accurate pose estimation at 10 fps. One Euro Filter smoothing keeps landmarks stable (sub-2-pixel jitter). GPU → NNAPI → XNNPack delegate fallback achieves 30–80 ms inference latency. Cornell ROSA scoring algorithm ported Python → Dart with strict golden-set validation.",
    result:
      "±1-point congruence with the reference Python implementation across a 71-photo golden test set (100% pass). Zero cloud inference cost. Supports Android API 21+ and iOS 15.5+ — runs on any modern device.",
    image: "/projects/postura.webp",
    techStack: [
      "Flutter 3.9",
      "Dart",
      "flutter_bloc",
      "YOLOv8n (TFLite FP16)",
      "tflite_flutter",
      "Google ML Kit",
      "MediaPipe Accurate",
      "One Euro Filter",
      "PyTorch 2.3",
      "ONNX 1.16",
    ],
    featured: true,
    order: 3,
  },

  {
    slug: "coach",
    title: "Coach — AI Habit Coaching with Realtime Voice",
    tagline:
      "GPT-4o Vision proof verification + OpenAI Realtime voice coaching, in a Flutter app",
    description:
      "Personality-adaptive habit-coaching mobile app. Users snap a photo of habit completion and GPT-4o Vision verifies with confidence scoring and natural-language feedback. Real-time voice coaching via OpenAI Realtime API streamed through LiveKit + ElevenLabs.",
    problem:
      "Most habit apps fail because feedback is generic and verification is honour-based. We needed proof verification at consumer-scale economics, plus voice coaching that didn't require a human coach in the loop.",
    solution:
      "FastAPI + Firestore (21 collections) backend. GPT-4o Vision proof-verification pipeline through GCS signed URLs at ~$0.0075 per proof. gpt-4o-realtime-preview for voice coaching, LiveKit for WebRTC transport, ElevenLabs for TTS, Deepgram fallback for STT. Prompt caching + a 50-message sliding context window keeps token costs predictable.",
    result:
      "Cut per-session token cost ~50% via prompt caching, capped per-user spend at $150/month. 21 Firestore collections, Sentry + Prometheus observability, deployed via Coolify on DigitalOcean. Sub-second proof verification on commodity GPU-free infrastructure.",
    image: "/projects/coach.webp",
    techStack: [
      "FastAPI",
      "Firebase Firestore",
      "GCS",
      "BigQuery",
      "OpenAI GPT-4o Vision",
      "gpt-4o-realtime-preview",
      "LiveKit Agents",
      "ElevenLabs",
      "Deepgram",
      "Flutter",
      "Stripe",
      "RevenueCat",
      "Sentry",
      "Coolify",
    ],
    featured: true,
    order: 4,
  },

  {
    slug: "wanyumba",
    title: "Wanyumba — East African Real-Estate Marketplace",
    tagline:
      "7+ microservices and a multi-provider AI property valuation engine",
    description:
      "Tanzania-focused real-estate marketplace coordinating 7+ microservices through a Traefik gateway and RabbitMQ event bus. Multi-provider AI property valuation engine with graceful fallbacks across OpenAI GPT-4, DeepSeek, Hugging Face, and Groq.",
    problem:
      "Property valuation in East Africa is inconsistent — comparable-sale data is thin and human valuations vary widely. Single-LLM dependency would have been a single point of failure for both cost and downtime.",
    solution:
      "Polyglot microservices: Node + Express + Prisma for listings / auth / inventory / admin; Python FastAPI for geocoding. All sit behind a Traefik gateway with a RabbitMQ 3.12 event bus. The AI valuation engine routes across 4 LLM providers with confidence scoring (0–1), Redis-cached at 1-hr TTL, batch-valuation enabled. Flutter mobile with strict Clean Architecture — zero Flutter imports in the domain layer.",
    result:
      "Production multi-LLM orchestration with graceful fallback when a provider is down or rate-limited. OpenSearch 2.11 for near-real-time property search. 4-locale i18n. Confidence-scored valuations with reasoning surface for human review.",
    image: "/projects/wanyumba.webp",
    techStack: [
      "Node.js + Express",
      "Prisma",
      "PostgreSQL",
      "Python FastAPI",
      "RabbitMQ 3.12",
      "OpenSearch 2.11",
      "Traefik",
      "Redis",
      "OpenAI GPT-4",
      "DeepSeek",
      "Hugging Face",
      "Groq",
      "Flutter",
      "Docker Compose",
    ],
    featured: true,
    order: 5,
  },

  {
    slug: "claude-code-mastery",
    title: "Claude Code Mastery",
    tagline:
      "A 742-file configuration system for Claude Code and the Agent SDK — 179 skills, 37 agents, 10 hooks",
    description:
      "Open-source curated repository providing configuration templates, extensible skills, agents, hooks, and learning guides for maximising Claude Code + Claude Agent SDK productivity. A one-prompt setup system that auto-generates production-grade configurations.",
    problem:
      "Engineers adopting Claude Code spend hours wiring up settings, hooks, permissions, and curating skill libraries. No standard scaffolding exists.",
    solution:
      "Curated 179+ skills across 11 domain categories (engineering, C-level advisory, marketing, compliance, product, finance), 37 specialised subagents (development, infrastructure, quality, data/AI, security), 10 production hooks (safety gates, quality auto-checks, intelligent skill matching), 13 configuration templates, and a 470-line master setup prompt that analyses a codebase and auto-generates personalised CLAUDE.md + settings.json.",
    result:
      "742 markdown files. 9-chapter progressive learning guide (3,400+ lines). 4 GitHub Actions workflows for PR review, monthly docs sync, weekly quality audits, and biweekly dependency audits. MIT-licensed, reusable across any codebase.",
    image: "/projects/claude-code-mastery.webp",
    techStack: [
      "Claude Code (CLI)",
      "Claude Agent SDK",
      "Markdown",
      "Shell",
      "JavaScript",
      "JSON",
      "YAML",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/haisem-codes/claude-code-mastery",
    featured: true,
    order: 6,
  },

  // ===================== SECONDARY (6) =====================

  {
    slug: "africa-travel-hub",
    title: "Africa Travel Hub (ATH) — B2B Travel SaaS",
    tagline:
      "Multi-tenant platform connecting hotels, fleets, tour operators, and DMCs across Africa",
    description:
      "B2B travel-management SaaS with row-based multi-tenancy, role-based access control, AI-powered on-device speech on the mobile app, and African card-rail payment integration.",
    problem:
      "African travel suppliers operated on email and spreadsheets. No unified platform existed for hotels, fleet operators, tour operators, DMCs, and destination planners to coordinate bookings, fleets, and itineraries.",
    solution:
      "FastAPI + PostgreSQL (Supabase) + SQLAlchemy + Redis + Alembic backend. React 18 + Vite + Tailwind + Zustand frontend. Flutter mobile with Sherpa-ONNX on-device speech for offline voice features and Firebase integration. DPO (Direct Pay Online) payment integration for African card rails. Docker dev / Coolify production.",
    result:
      "Multi-tenant SaaS with JWT-backed RBAC, Alembic migrations, OpenAPI docs, Supabase integration, production deployment on Coolify.",
    image: "/projects/africa-travel-hub.webp",
    techStack: [
      "FastAPI",
      "PostgreSQL (Supabase)",
      "SQLAlchemy",
      "Redis",
      "JWT",
      "Alembic",
      "React 18",
      "Vite",
      "Tailwind",
      "Zustand",
      "Flutter",
      "Sherpa-ONNX",
      "DPO Payment",
      "Docker",
      "Coolify",
    ],
    featured: false,
    order: 7,
  },

  {
    slug: "handman",
    title: "Handman — Swiss Craftsmen Marketplace",
    tagline:
      "Multi-tenant marketplace with 6 RBAC roles, WebAuthn biometrics, and Stripe Terminal",
    description:
      "Marketplace connecting plumbers, electricians, and handymen with residential and commercial customers across Switzerland. Full-stack across web and mobile.",
    problem:
      "Swiss tradespeople were juggling 3+ tools (scheduling, payments, customer comms) with no unified field-services platform tailored to 4-language i18n and in-person card payments.",
    solution:
      "FastAPI 0.109 + SQLAlchemy async + PostgreSQL 15 backend. React 19 + Vite + Tailwind 4 web. Flutter (Clean Architecture, Riverpod, SQLite offline) mobile. RBAC with 6 roles (superadmin, admin, owner, dispatcher, field_worker, accounting), 3 auth modalities (password, Twilio OTP, WebAuthn biometrics) with JWT + Argon2. Stripe Terminal for in-person card processing. Real-time threaded messaging with SSE notifications.",
    result:
      "4-locale i18n (EN / DE / FR / IT). Multi-tenant data isolation. Production marketplace handling real bookings + card payments.",
    image: "/projects/handman.webp",
    techStack: [
      "FastAPI 0.109",
      "PostgreSQL 15",
      "SQLAlchemy async",
      "Redis",
      "Celery 5.3",
      "React 19",
      "Vite",
      "Tailwind 4",
      "Flutter",
      "Riverpod",
      "WebAuthn",
      "JWT + Argon2",
      "Twilio",
      "Stripe Terminal",
      "Docker",
    ],
    featured: false,
    order: 8,
  },

  {
    slug: "metaviz-portfolios",
    title: "Metaviz Portfolios — 8-Tool AI SaaS Platform",
    tagline:
      "Productised the agency's expertise as 8 user-facing AI tools, including a multi-LLM chat orchestrator",
    description:
      "Multi-tool SaaS that productises Metaviz's AI engineering capability — 8 user-facing tools shipping under one umbrella, including a multi-LLM chat orchestrator (LangChain + LangGraph routing across OpenAI and Gemini) and a YOLOv7 computer-vision pipeline.",
    problem:
      "Agency expertise was locked inside client engagements. We needed a productised surface that both demoed capability and drove inbound interest.",
    solution:
      "Django 5.0 + DRF 3.15 (10 microservice apps) and React 18 + Vite + TypeScript + Tailwind 3.3. Shipped: GitHub Code Explainer, AI Interview Coach, Multilingual Blog Builder (30+ languages), Structured Prompt Generator, Smart Product Copywriter (bulk CSV), PDF Logo Removal (YOLOv7), Text Humanizer, and a multi-LLM Voice/Chat Assistant with LangChain + LangGraph intelligently routing across OpenAI and Gemini. AG2 multi-agent orchestration for complex reasoning. WebSocket real-time via Daphne + Channels.",
    result:
      "8 tools live. 10 Django microservice apps. JWT auth via SimpleJWT, rate limiting, 30+ language translation pipeline. Deployed via Docker Compose + Nginx + GitHub Actions CI/CD to Coolify on DigitalOcean.",
    image: "/projects/metaviz-portfolios.webp",
    techStack: [
      "Django 5.0",
      "DRF 3.15",
      "PostgreSQL",
      "Redis",
      "OpenAI GPT-4o-mini",
      "Gemini",
      "AG2",
      "LangChain",
      "LangGraph",
      "Daphne + Channels",
      "PyTorch 2.6",
      "YOLOv7",
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind",
      "Docker",
      "Coolify",
    ],
    featured: false,
    order: 9,
  },

  {
    slug: "icore-careerhub",
    title: "iCore CareerHub — Hospitality Recruitment SaaS",
    tagline:
      "AI CV parsing + Pinecone vector job matching + AI voiceover generation",
    description:
      "Hospitality-focused recruitment SaaS that automates CV extraction, AI-enhanced profile presentation, and vector-powered candidate-job matching.",
    problem:
      "Hospitality recruiters were drowning in unstructured PDFs/DOCX from candidates and matching jobs by keyword search — slow, biased toward whoever used the right buzzwords.",
    solution:
      "Strapi 5.22 backend with 40 API modules and 35 content-type schemas. Multi-modal AI CV parser routing between GPT-4o Vision (scanned PDFs) and GPT-4o-mini (text PDFs / mammoth-converted DOCX). Vector job matching via Pinecone (1536-dim text-embedding-3-small) with weighted scoring (skills 40%, location 15%, objectives 15%, badge/region bonuses). OpenAI TTS for 44–48s voiceover scripts.",
    result:
      "40 API modules, 35 schemas. Daily cron jobs (subscription expiry warnings, archived-user purge). Google Calendar OAuth2 for interview scheduling. SendGrid for transactional email. Ranked candidate matches with score ≥0.3 threshold.",
    image: "/projects/icore-careerhub.webp",
    techStack: [
      "Strapi 5.22",
      "Node 20",
      "TypeScript",
      "PostgreSQL",
      "OpenAI GPT-4o",
      "GPT-4o-mini",
      "text-embedding-3-small",
      "Pinecone",
      "OpenAI TTS",
      "pdf-parse",
      "mammoth",
      "Cloudinary",
      "SendGrid",
      "Google Calendar API",
    ],
    featured: false,
    order: 10,
  },

  {
    slug: "ai-video-pipeline",
    title: "AI Video Pipeline — 60-Node n8n Automation",
    tagline:
      "Script → video → multi-platform publish, fully automated",
    description:
      "A complete automated video production pipeline using n8n that transforms text ideas into professional short-form videos and auto-publishes across 5 platforms with zero manual intervention.",
    problem:
      "Content creators and agencies were spending 4–6 hours per video: writing scripts, generating visuals, editing footage, recording voiceovers, adding captions, and manually uploading to each platform. Unsustainable at scale.",
    solution:
      "60+ node n8n automation pipeline. GPT-4o generates scripts and platform-optimised descriptions, Flux AI creates POV images at 540×960, Kling AI converts them to 5-second motion videos, ElevenLabs synthesises voiceovers, videos are composited with captions and transitions, then auto-published to TikTok, Instagram, YouTube, Facebook, and LinkedIn via their APIs.",
    result:
      "Reduced video production from 4–6 hours to under 10 minutes per video. Zero manual intervention from idea to published content across 5 platforms. Agencies using the system produce 10× more content with the same team size.",
    image: "/projects/ai-video-pipeline.webp",
    techStack: [
      "n8n",
      "GPT-4o",
      "Flux AI",
      "Kling AI",
      "ElevenLabs",
      "Multi-Platform API",
    ],
    featured: false,
    order: 11,
  },

  {
    slug: "dietapp",
    title: "DietApp — AI Nutrition & Fitness",
    tagline:
      "AI-powered nutrition app with meal planning, barcode scanning, and wearable sync",
    description:
      "A comprehensive nutrition-first mobile app — calorie counter, meal planner, and health tracker that helps users hit their fitness goals through AI-powered personalisation.",
    problem:
      "People trying to lose weight or build muscle struggle with nutrition tracking. Existing apps required manual food entry, had generic meal plans, and didn't integrate with wearable devices. Users abandoned within 2 weeks.",
    solution:
      "Flutter mobile with AI-powered meal-plan generation that adapts to dietary preferences and goals. Barcode scanning for instant food logging, HealthKit / Google Fit / Fitbit sync for automatic activity tracking, custom macro calculations, recipe suggestions, and a social feed for community accountability. Subscription billing via Stripe + App Store.",
    result:
      "Meal logging in under 30 seconds via barcode scanning (vs 2+ minutes manual entry). AI-generated meal plans achieve ~85% adherence vs ~40% for generic plans. Full wearable integration eliminates manual activity logging.",
    image: "/projects/dietapp.webp",
    techStack: [
      "Flutter",
      "AI / ML",
      "HealthKit",
      "Google Fit",
      "Barcode Scanner",
      "Stripe",
      "Firebase",
    ],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.biotin.diet_app",
    featured: false,
    order: 12,
  },
];
