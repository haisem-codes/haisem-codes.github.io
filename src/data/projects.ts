import type { Locale } from "@/i18n/config";
import type { Project } from "@/types";

export function localize(p: Project, lang: Locale): Project {
  return lang === "sv" && p.sv ? { ...p, ...p.sv } : p;
}

export const projects: Project[] = [
  // ===================== FEATURED (3) =====================

  {
    slug: "ai-compliance-platform",
    title: "AI Building-Code Compliance Platform",
    tagline:
      "End-to-end document AI for AEC compliance reviews, FastAPI + AWS Textract + GPT-5",
    outcome:
      "Checks drawings across five building-code disciplines, then a reviewer corrects the findings inline and signs off.",
    description:
      "A compliance review platform, built with a product team, that ingests architectural and MEP drawings and checks them against building codes across five disciplines (mechanical, electrical, plumbing, structural, architectural). As the AI engineer on the team, I built the FastAPI backend, the async job pipeline and the hybrid RAG behind the checks.",
    problem:
      "Compliance reviewers were manually scanning hundreds of pages per drawing, cross-referencing 5 building codes, and missing contradictions. Per-document turnaround: days. Manual review time was the bottleneck for every project.",
    solution:
      "Async processing pipeline (FastAPI 0.115 + Celery + Redis) routing PDFs through AWS Textract OCR, then GPT-5 with structured outputs for entity extraction (equipment tags, CFM values, breaker counts). Hybrid RAG over the building-code corpus (ChromaDB BAAI/bge-base-en-v1.5 + BM25 reranking) feeds compliance reasoning. Cost-aware orchestration caps LLM spend per document. Next.js 15 + React Query verification UI for inline edits and final sign-off.",
    result:
      "Reviewers confirm or correct the AI's findings inline in one verification UI, then sign off. A multi-tenant FastAPI REST API with Supabase row-level security, a pytest suite and a per-document cap on LLM spend. Hybrid RAG + BM25 reranking holds retrieval quality even on long, technical code sections.",
    image: "/work/ai-compliance-platform-1600.webp",
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
    category: "business",
    context: "team",
    sv: {
      title:
        "AI-plattform för granskning mot byggregler", // REVIEW-SV
      tagline:
        "Dokument-AI som granskar bygghandlingar mot byggregler, med FastAPI, AWS Textract och GPT-5",
      outcome:
        "Kontrollerar ritningar inom fem discipliner, och sedan rättar granskaren resultaten direkt och godkänner.", // REVIEW-SV
      description:
        "En plattform, byggd i ett produktteam, som läser in arkitekt- och installationsritningar och kontrollerar dem mot byggreglerna inom fem discipliner: VVS/mekanik, el, VS, konstruktion och arkitektur. Som AI-ingenjör i teamet byggde jag backend i FastAPI, den asynkrona jobbkedjan och hybrid-RAG:en bakom kontrollerna.", // REVIEW-SV
      problem:
        "Granskarna gick manuellt igenom hundratals sidor per ritning, jämförde mot fem olika regelverk och missade motsägelser. Varje dokument tog dagar, och den manuella granskningen var flaskhalsen i varje projekt.",
      solution:
        "En asynkron pipeline (FastAPI, Celery och Redis) skickar PDF:er genom AWS Textract för OCR och sedan till GPT-5 med strukturerade svar, som plockar ut utrustningsbeteckningar, luftflöden och antal säkringar. Hybrid-RAG över regelverket (ChromaDB med BAAI/bge-base-en-v1.5 och BM25-omrankning) ger underlag för bedömningen. Kostnadsstyrningen sätter ett tak för LLM-kostnaden per dokument. Ett gränssnitt i Next.js 15 och React Query låter granskaren rätta direkt och därefter godkänna.", // REVIEW-SV
      result:
        "Granskaren bekräftar eller rättar AI:ns fynd direkt i ett gränssnitt och godkänner sedan. Ett REST-API i FastAPI, multi-tenant med Supabase RLS, en pytest-svit och ett kostnadstak per dokument. Hybrid-RAG med BM25 håller sökkvaliteten uppe även i långa, tekniska regeltexter.", // REVIEW-SV
    },
  },

  {
    slug: "voice-agents-suite",
    title: "Production Voice Agents: Retell, ElevenLabs, GoHighLevel and n8n",
    tagline:
      "AI callers that follow up new leads and book appointments, built for more than five businesses",
    outcome:
      "AI callers that phone every new lead, qualify them and book the meeting, rolled out for more than five businesses.",
    description:
      "As a client project, I built the voice agents, GoHighLevel automations and n8n flows behind an agency's AI lead follow-up. Jake Wims's agency sells the service to US real-estate teams and a mortgage lender, and I rolled the template out as more than five client agents, one for each business owner the agency signed.",
    problem:
      "New leads from Facebook ads go cold within hours, and a small team can't call every one of them back at 21:40. Off-the-shelf voice bots sounded robotic or lost the details at the CRM handoff.",
    solution:
      "A Retell voice agent calls each new lead from a local number, recaps what they entered in the form, qualifies them Hot, Warm or Cold on rules the client approved, and books straight into the GoHighLevel calendar through n8n tools. After the call it writes notes back to the CRM, sends lead and internal emails, and starts SMS or nurture sequences when nobody answers. I packaged it as a cloneable template with real-estate and mortgage variants and a shared n8n inbound lookup that greets callers with the right business name. Alongside it I built inbound concierge agents and sales, support and booking agents on ElevenLabs Conversational AI.",
    result:
      "More than five client agents built from one template, one for each business owner the agency signed. The architecture was verified against the real Retell, n8n and GoHighLevel APIs, with a 10-case test plan, a fix for misclassified leads, and a cross-client greeting leak root-caused and fixed across every agent. For another client's agent, I rewrote the prompt around a semantic knowledge base so the agent follows its response rules more reliably.",
    image: "/work/voice-agents-suite-1600.webp",
    techStack: [
      "Retell AI",
      "ElevenLabs Conversational AI",
      "LiveKit Agents",
      "Twilio",
      "Deepgram",
      "GoHighLevel v2",
      "n8n",
      "Python",
    ],
    featured: true,
    order: 2,
    category: "business",
    context: "client",
    sv: {
      title:
        "Röstagenter i produktion: Retell, ElevenLabs, GoHighLevel och n8n",
      tagline:
        "AI som ringer upp nya leads och bokar möten, byggd för fler än fem företag", // REVIEW-SV
      outcome:
        "AI som ringer varje ny lead, kvalificerar och bokar mötet, utrullad för fler än fem företag.", // REVIEW-SV
      description:
        "Som kundprojekt byggde jag röstagenterna, GoHighLevel-automationerna och n8n-flödena bakom en byrås AI-uppföljning av leads. Jake Wims byrå säljer tjänsten till amerikanska mäklarteam och en bolångivare, och jag satte upp mallen som fler än fem agenter, en för varje företagare byrån skrev avtal med.", // REVIEW-SV
      problem:
        "Nya leads från Facebook-annonser kallnar på några timmar, och ett litet team hinner inte ringa tillbaka alla klockan 21.40. Färdiga röstbotar lät robotaktiga eller tappade detaljerna i överlämningen till CRM:et.",
      solution:
        "En röstagent i Retell ringer varje ny lead från ett lokalt nummer, sammanfattar vad personen fyllde i, bedömer leadet som Hot, Warm eller Cold enligt regler kunden har godkänt och bokar direkt i GoHighLevel-kalendern via n8n. Efter samtalet skrivs anteckningar tillbaka till CRM:et, mejl går till leadet och teamet, och SMS eller uppföljningssekvenser startar om ingen svarar. Jag paketerade allt som en mall som går att klona, med varianter för mäklare och bolån, och en gemensam n8n-uppslagning som hälsar med rätt företagsnamn. Vid sidan av det byggde jag inkommande receptionsagenter och agenter för sälj, support och bokning på ElevenLabs Conversational AI.", // REVIEW-SV
      result:
        "Fler än fem kundagenter byggda från samma mall, en för varje företagare byrån skrev avtal med. Arkitekturen verifierades mot de riktiga API:erna i Retell, n8n och GoHighLevel, med en testplan på tio fall, en åtgärd av felklassade leads och en läcka av hälsningsfraser mellan kunder som spårades och åtgärdades i alla agenter. För en annan kunds agent skrev jag om prompten kring en semantisk kunskapsbas, så att agenten följer sina svarsregler mer pålitligt.", // REVIEW-SV
    },
  },

  {
    slug: "postura",
    title: "Postura, On\u2011Device Ergonomic Assessment",
    tagline:
      "Real-time pose analysis + Cornell ROSA scoring, all offline, in Flutter",
    outcome:
      "Ergonomic risk scoring that runs fully offline on the phone, checked against a reference implementation on a golden set of photos.",
    description:
      "A mobile app that captures side-view photos of desk workers and computes a Rapid Office Strain Assessment (ROSA) 1–10 risk score entirely on-device. No cloud round-trips, no privacy concerns, no per-assessment cloud bill. As the AI engineer on the team, I built the on-device vision pipeline and ported the ROSA scoring from Python to Dart.",
    problem:
      "Ergonomic assessments traditionally needed an in-person consultant or photos uploaded to cloud ML services. Slow, expensive, privacy-sensitive, and impossible to scale to one-time workplace audits across thousands of workstations.",
    solution:
      "Flutter 3.9 app with isolate-based YOLOv8n (TFLite FP16) for person + monitor detection, layered with MediaPipe Accurate pose estimation. One Euro Filter smoothing keeps landmarks stable. A GPU → NNAPI → XNNPack delegate fallback keeps inference fast across devices. Cornell ROSA scoring algorithm ported Python → Dart with strict golden-set validation.",
    result:
      "Scores match the reference Python implementation, within tolerance, on a golden test set of photos. No cloud inference cost. Supports Android API 21+ and iOS 15.5+, runs on any modern device.",
    image: "/work/postura-1600.webp",
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
    category: "research",
    context: "team",
    sv: {
      title:
        "Postura, ergonomisk bedömning direkt i mobilen",
      tagline:
        "Hållningsanalys i realtid och ROSA-poäng från Cornell, helt offline i Flutter",
      outcome:
        "Ergonomisk riskbedömning helt offline i telefonen, kontrollerad mot en referensimplementation på ett facit av foton.", // REVIEW-SV
      description:
        "En mobilapp som tar bilder från sidan på personer vid skrivbordet och räknar fram en ROSA-riskpoäng (Rapid Office Strain Assessment) från 1 till 10 helt i telefonen. Inga anrop till molnet, inga integritetsproblem och ingen molnkostnad per bedömning. Som AI-ingenjör i teamet byggde jag bildanalysen i telefonen och portade ROSA-poängen från Python till Dart.", // REVIEW-SV
      problem:
        "Ergonomiska bedömningar har krävt en konsult på plats eller att bilder laddas upp till ML-tjänster i molnet. Det är långsamt, dyrt, känsligt för integriteten och omöjligt att skala till tusentals arbetsplatser.",
      solution:
        "En Flutter 3.9-app där YOLOv8n (TFLite FP16) körs i en egen isolate och hittar person och skärm, ovanpå MediaPipe Accurate som skattar hållningen. Ett One Euro-filter håller punkterna stabila. Fallback från GPU till NNAPI till XNNPack håller inferensen snabb på olika enheter. Cornells ROSA-algoritm portades från Python till Dart och validerades strikt mot ett facit.", // REVIEW-SV
      result:
        "Poängen stämmer med referensimplementationen i Python, inom toleransen, på ett facit av testfoton. Ingen kostnad för inferens i molnet. Fungerar på Android API 21+ och iOS 15.5+.", // REVIEW-SV
    },
  },

  {
    slug: "coach",
    title: "Coach, AI Habit Coaching with Realtime Voice",
    tagline:
      "GPT-4o Vision proof verification + OpenAI Realtime voice coaching, in a Flutter app",
    description:
      "Personality-adaptive habit-coaching mobile app. Users snap a photo of habit completion and GPT-4o Vision verifies with confidence scoring and natural-language feedback. Real-time voice coaching via OpenAI Realtime API streamed through LiveKit + ElevenLabs. As the AI engineer on this client project, I built the FastAPI backend, the photo-proof check and the realtime voice coaching.",
    problem:
      "Most habit apps fail because feedback is generic and verification is honour-based. We needed proof verification at consumer-scale economics, plus voice coaching that didn't require a human coach in the loop.",
    solution:
      "FastAPI + Firestore backend. GPT-4o Vision proof-verification pipeline through GCS signed URLs. gpt-4o-realtime-preview for voice coaching, LiveKit for WebRTC transport, ElevenLabs for TTS, Deepgram fallback for STT. Prompt caching + a sliding context window keeps token costs predictable.",
    result:
      "Prompt caching cut per-session token cost, and a per-user spend cap keeps costs bounded. Sentry + Prometheus observability, deployed via Coolify on DigitalOcean. Proof verification runs on GPU-free infrastructure.",
    image: "/work/coach-1600.webp",
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
    featured: false,
    order: 4,
    category: "products",
    context: "client",
    sv: {
      title:
        "Coach, AI-coachning av vanor med röst i realtid",
      tagline:
        "Bildverifiering med GPT-4o Vision och röstcoachning via OpenAI Realtime, i en Flutter-app",
      description:
        "En vaneapp som anpassar sig efter användarens personlighet. Du fotar beviset på en avklarad vana och GPT-4o Vision bekräftar med en säkerhetspoäng och återkoppling i klartext. Röstcoachning i realtid via OpenAI Realtime API, strömmat genom LiveKit och ElevenLabs. Som AI-ingenjör i kundprojektet byggde jag backend i FastAPI, bildverifieringen och röstcoachningen i realtid.", // REVIEW-SV
      problem:
        "De flesta vaneappar misslyckas eftersom återkopplingen är generisk och användaren själv intygar att vanan är gjord. Vi behövde verifiering som bär sig ekonomiskt i stor skala, plus röstcoachning utan en mänsklig coach.", // REVIEW-SV
      solution:
        "Backend i FastAPI och Firestore. Bildverifiering med GPT-4o Vision via signerade GCS-länkar. gpt-4o-realtime-preview för röstcoachning, LiveKit för WebRTC, ElevenLabs för tal och Deepgram som reserv för taligenkänning. Promptcachning och ett glidande kontextfönster håller tokenkostnaden förutsägbar.", // REVIEW-SV
      result:
        "Promptcachning sänkte tokenkostnaden per session, och ett kostnadstak per användare håller kostnaderna i schack. Övervakning med Sentry och Prometheus, driftsatt via Coolify på DigitalOcean. Bildverifieringen körs utan GPU-servrar.", // REVIEW-SV
    },
  },

  {
    slug: "ai-real-estate-marketplace",
    title: "AI-Powered Real Estate Marketplace with Multi-LLM Valuation",
    tagline:
      "Event-driven microservices and a multi-provider AI property valuation engine",
    description:
      "Real-estate marketplace coordinating microservices through a Traefik gateway and RabbitMQ event bus. Multi-provider AI property valuation engine with graceful fallbacks across OpenAI GPT-4, DeepSeek, Hugging Face, and Groq.",
    problem:
      "Property valuation in emerging markets is inconsistent, comparable-sale data is thin and human valuations vary widely. Single-LLM dependency would have been a single point of failure for both cost and downtime.",
    solution:
      "Polyglot microservices: Node + Express + Prisma for listings / auth / inventory / admin; Python FastAPI for geocoding. All sit behind a Traefik gateway with a RabbitMQ 3.12 event bus. The AI valuation engine routes across several LLM providers with confidence scoring, Redis caching and batch valuation. Flutter mobile with strict Clean Architecture, zero Flutter imports in the domain layer.",
    result:
      "Production multi-LLM orchestration with graceful fallback when a provider is down or rate-limited. OpenSearch 2.11 for near-real-time property search. Multi-locale i18n. Confidence-scored valuations with reasoning surface for human review.",
    image: "/work/ai-real-estate-marketplace-1600.webp",
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
    featured: false,
    order: 5,
    category: "products",
    context: "team",
    sv: {
      title:
        "AI-baserad marknadsplats för fastigheter med värdering från flera LLM:er", // REVIEW-SV
      tagline:
        "Händelsestyrda mikrotjänster och en AI-värderingsmotor som växlar mellan flera leverantörer", // REVIEW-SV
      description:
        "En marknadsplats för fastigheter där mikrotjänster samordnas via en Traefik-gateway och en RabbitMQ-händelsebuss. AI-värderingen växlar mellan OpenAI GPT-4, DeepSeek, Hugging Face och Groq när en leverantör ligger nere.", // REVIEW-SV
    },
  },

  {
    slug: "claude-code-mastery",
    title: "Claude Code Mastery",
    tagline:
      "A configuration system for Claude Code and the Agent SDK: installable skills, subagents, hooks and setup templates",
    description:
      "Open-source curated repository providing configuration templates, extensible skills, agents, hooks, and learning guides for maximising Claude Code + Claude Agent SDK productivity. A one-prompt setup system that auto-generates production-grade configurations.",
    problem:
      "Engineers adopting Claude Code spend hours wiring up settings, hooks, permissions, and curating skill libraries. No standard scaffolding exists.",
    solution:
      "Curated installable skills across domains (engineering, C-level advisory, marketing, compliance, product, finance), specialised subagents (development, infrastructure, quality, data/AI, security), production hooks (safety gates, quality auto-checks, intelligent skill matching), configuration templates for several stacks, and a setup prompt that analyses a codebase and auto-generates personalised CLAUDE.md + settings.json. A real installer ships presets with dry-run, backup and undo.",
    result:
      "A progressive, chapter-by-chapter learning guide. GitHub Actions workflows for PR review, docs sync, quality audits, and dependency audits. Counts are generated into catalog.json and verified in CI, so the documentation cannot drift from the repo. MIT-licensed, reusable across any codebase.",
    image: "/work/claude-code-mastery-1600.webp",
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
    featured: false,
    order: 13,
    category: "products",
    sv: {
      title: "Claude Code Mastery", // REVIEW-SV
      tagline:
        "Ett konfigurationssystem för Claude Code och Agent SDK: installerbara skills, subagenter, hooks och färdiga mallar", // REVIEW-SV
    },
  },

  // ===================== SECONDARY (6) =====================

  {
    slug: "b2b-travel-saas",
    title: "AI-Powered B2B Travel Management SaaS",
    tagline:
      "Multi-tenant platform connecting hotels, fleet operators, tour operators, and DMCs with on-device AI speech",
    description:
      "B2B travel-management SaaS with row-based multi-tenancy, role-based access control, AI-powered on-device speech on the mobile app, and regional payment-rail integration.",
    problem:
      "Travel suppliers were operating on email and spreadsheets. No unified platform existed for hotels, fleet operators, tour operators, DMCs, and destination planners to coordinate bookings, fleets, and itineraries.",
    solution:
      "FastAPI + PostgreSQL (Supabase) + SQLAlchemy + Redis + Alembic backend. React 18 + Vite + Tailwind + Zustand frontend. Flutter mobile with Sherpa-ONNX on-device speech for offline voice features and Firebase integration. Regional payment-rail integration for emerging-market card processing. Docker dev / Coolify production.",
    result:
      "Multi-tenant SaaS with JWT-backed RBAC, Alembic migrations, OpenAPI docs, Supabase integration, production deployment on Coolify.",
    image: "/work/b2b-travel-saas-1600.webp",
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
      "Regional Payment Gateway",
      "Docker",
      "Coolify",
    ],
    featured: false,
    order: 7,
    category: "products",
    context: "team",
    sv: {
      title: "AI-baserad SaaS för resehantering mellan företag", // REVIEW-SV
      tagline:
        "En flerkundsplattform som kopplar ihop hotell, transportbolag, researrangörer och DMC:er, med AI-tal direkt i enheten", // REVIEW-SV
    },
  },

  {
    slug: "ai-craftsmen-marketplace",
    title: "AI-Powered Craftsmen Marketplace with Conversational Butler",
    tagline:
      "Conversational AI assistant, smart hybrid search, multi-tenant marketplace across web and mobile",
    description:
      "Craftsmen marketplace where the AI tier is the differentiator. A conversational AI assistant guides customers, professionals, field workers, and admins through every flow, while smart search matches jobs by intent instead of keywords. Full-stack across web, mobile, and a substantial AI backend.",
    problem:
      "Tradespeople were juggling separate tools for scheduling, payments, and customer comms. On the customer side, keyword search across craftsmen produced poor matches, no understanding of intent, urgency, or job category from natural language.",
    solution:
      "Conversational AI assistant across customer, professional, field-worker and admin modes on a deterministic state machine with mode-specific tools for estimation, claims, payments, scheduling, and vision-based intake. Smart hybrid search blends semantic embeddings with keyword search and cross-encoder reranking; an AI search-intake layer parses natural-language queries into structured parameters. AI-powered lead enrichment from supplier websites. Long-term memory captures user preferences and patterns across sessions, with per-tenant LLM cost tracking and daily rollups. FastAPI 0.109 + async SQLAlchemy + Postgres 15 backend, React 19 + Vite web, Flutter mobile (Clean Architecture, Riverpod, SQLite offline). Role-based access control, with password, Twilio OTP and WebAuthn biometric sign-in on JWT + Argon2. Stripe Terminal for in-person cards. Real-time threaded messaging via SSE.",
    result:
      "Production craftsmen marketplace with substantive AI tier: conversational assistant across customer/pro/field/admin flows, intent-matched search, and per-tenant cost attribution. Multi-locale i18n. Multi-tenant data isolation.",
    image: "/work/ai-craftsmen-marketplace-1600.webp",
    techStack: [
      "FastAPI 0.109",
      "PydanticAI",
      "pgvector",
      "Cohere Rerank v3.5",
      "OpenAI text-embedding-3-small",
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
    category: "products",
    context: "team",
    sv: {
      title: "Marknadsplats för hantverkare med AI-assistent", // REVIEW-SV
      tagline:
        "En konverserande AI-assistent, smart hybridsökning och en flerkundsmarknadsplats på webb och mobil", // REVIEW-SV
    },
  },

  {
    slug: "ai-tools-suite",
    title: "AI Tools Suite, a Multi-Tool SaaS Platform",
    tagline:
      "User-facing AI tools under one umbrella, including a multi-LLM chat orchestrator",
    description:
      "Multi-tool SaaS with user-facing AI tools under one umbrella, including a multi-LLM chat orchestrator (LangChain + LangGraph routing across OpenAI and Gemini) and a YOLOv7 computer-vision pipeline.",
    problem:
      "AI engineering capability was locked inside one-off client engagements. We needed a productised surface that both demoed the stack and drove inbound interest.",
    solution:
      "Django 5.0 + DRF 3.15 (split into microservice apps) and React 18 + Vite + TypeScript + Tailwind 3.3. Shipped: GitHub Code Explainer, AI Interview Coach, Multilingual Blog Builder, Structured Prompt Generator, Smart Product Copywriter (bulk CSV), PDF Logo Removal (YOLOv7), Text Humanizer, and a multi-LLM Voice/Chat Assistant with LangChain + LangGraph intelligently routing across OpenAI and Gemini. AG2 multi-agent orchestration for complex reasoning. WebSocket real-time via Daphne + Channels.",
    result:
      "All tools live on one platform. JWT auth via SimpleJWT, rate limiting, a multilingual translation pipeline. Deployed via Docker Compose + Nginx + GitHub Actions CI/CD to Coolify on DigitalOcean.",
    image: "/work/ai-tools-suite-1600.webp",
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
    category: "products",
    context: "team",
    sv: {
      title: "AI Tools Suite, en SaaS-plattform med flera verktyg", // REVIEW-SV
      tagline:
        "AI-verktyg under samma tak, bland annat en chatt som växlar mellan flera LLM:er", // REVIEW-SV
    },
  },

  {
    slug: "ai-video-pipeline",
    title: "AI Video Pipeline, End-to-End n8n Automation",
    tagline:
      "Script → video → multi-platform publish, fully automated",
    description:
      "A complete automated video production pipeline using n8n that transforms text ideas into professional short-form videos and auto-publishes across the major social platforms without manual steps.",
    problem:
      "Content creators and agencies were spending hours per video: writing scripts, generating visuals, editing footage, recording voiceovers, adding captions, and manually uploading to each platform. Unsustainable at scale.",
    solution:
      "A large n8n automation pipeline. GPT-4o generates scripts and platform-optimised descriptions, Flux AI creates POV images in vertical format, Kling AI converts them to short motion clips, ElevenLabs synthesises voiceovers, videos are composited with captions and transitions, then auto-published to TikTok, Instagram, YouTube, Facebook, and LinkedIn via their APIs.",
    result:
      "Runs from idea to published video without manual steps, posting to TikTok, Instagram, YouTube, Facebook and LinkedIn from one pipeline.",
    image: "/work/ai-video-pipeline-1600.webp",
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
    category: "business",
    context: "team",
    sv: {
      title: "AI-videoflöde, automatiserat från början till slut i n8n", // REVIEW-SV
      tagline:
        "Manus → video → publicering på flera plattformar, helt automatiskt", // REVIEW-SV
    },
  },

  {
    slug: "dietapp",
    title: "DietApp, AI Nutrition & Fitness",
    tagline:
      "AI-powered nutrition app with meal planning, barcode scanning, and wearable sync",
    description:
      "A comprehensive nutrition-first mobile app, calorie counter, meal planner, and health tracker that helps users hit their fitness goals through AI-powered personalisation.",
    problem:
      "People trying to lose weight or build muscle struggle with nutrition tracking. Existing apps required manual food entry, had generic meal plans, and didn't integrate with wearable devices. Users abandoned within 2 weeks.",
    solution:
      "Flutter mobile with AI-powered meal-plan generation that adapts to dietary preferences and goals. Barcode scanning for instant food logging, HealthKit / Google Fit / Fitbit sync for automatic activity tracking, custom macro calculations, recipe suggestions, and a social feed for community accountability. Subscription billing via Stripe + App Store.",
    result:
      "Meal logging in under 30 seconds via barcode scanning (vs 2+ minutes manual entry). AI-generated meal plans achieve ~85% adherence vs ~40% for generic plans. Full wearable integration eliminates manual activity logging.",
    image: "/work/dietapp-1600.webp",
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
    category: "products",
    sv: {
      title: "DietApp, AI för kost och träning", // REVIEW-SV
      tagline:
        "En AI-baserad kostapp med måltidsplanering, streckkodsskanning och synk med träningsklockor", // REVIEW-SV
    },
  },
];
