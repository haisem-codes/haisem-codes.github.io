import type { Locale } from "@/i18n/config";
import type { Project } from "@/types";

export function localize(p: Project, lang: Locale): Project {
  return lang === "sv" && p.sv ? { ...p, ...p.sv } : p;
}

export const projects: Project[] = [
  // ===================== FEATURED (6) =====================

  {
    slug: "ai-compliance-platform",
    title: "AI Building-Code Compliance Platform",
    tagline:
      "End-to-end document AI for AEC compliance reviews, FastAPI + AWS Textract + GPT-5",
    description:
      "An AI-powered compliance review platform that ingests architectural and MEP drawings and verifies building-code compliance across 5 disciplines (mechanical, electrical, plumbing, structural, architectural). Automates what used to be days of manual reviewer work.",
    problem:
      "Compliance reviewers were manually scanning hundreds of pages per drawing, cross-referencing 5 building codes, and missing contradictions. Per-document turnaround: days. Manual review time was the bottleneck for every project.",
    solution:
      "Async processing pipeline (FastAPI 0.115 + Celery + Redis) routing PDFs through AWS Textract OCR, then GPT-5 with structured outputs for entity extraction (equipment tags, CFM values, breaker counts). Hybrid RAG over the building-code corpus (ChromaDB BAAI/bge-base-en-v1.5 + BM25 reranking) feeds compliance reasoning. Cost-aware orchestration caps per-document LLM spend at $15. Next.js 15 + React Query verification UI for inline edits and final sign-off.",
    result:
      "Saved ~80% of manual compliance-reviewer time per drawing. 132-endpoint FastAPI REST API, 47/48 pytest pass rate, multi-tenant Supabase RLS, per-document LLM cost capped at $15. Hybrid RAG + BM25 reranking holds retrieval quality even on long, technical code sections.",
    image: "/projects/anonymized/building-compliance.png",
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
    employer: "metaviz",
    sv: {
      title:
        "AI-plattform för granskning mot byggregler", // REVIEW-SV
      tagline:
        "Dokument-AI som granskar bygghandlingar mot byggregler, med FastAPI, AWS Textract och GPT-5",
      description:
        "En plattform som läser in arkitekt- och installationsritningar och kontrollerar att de följer byggreglerna inom fem discipliner: ventilation, el, VS, konstruktion och arkitektur. Det som förut tog granskarna flera dagar sköts nu till stor del automatiskt.", // REVIEW-SV
      problem:
        "Granskarna gick manuellt igenom hundratals sidor per ritning, jämförde mot fem olika regelverk och missade motsägelser. Varje dokument tog dagar, och den manuella granskningen var flaskhalsen i varje projekt.",
      solution:
        "En asynkron pipeline (FastAPI, Celery och Redis) skickar PDF:er genom AWS Textract för OCR och sedan till GPT-5 med strukturerade svar, som plockar ut utrustningsbeteckningar, luftflöden och antal säkringar. Hybrid-RAG över regelverket (ChromaDB med BAAI/bge-base-en-v1.5 och BM25-omrankning) ger underlag för bedömningen. Kostnadsstyrningen sätter ett tak på 15 dollar i LLM-kostnad per dokument. Ett gränssnitt i Next.js 15 och React Query låter granskaren rätta direkt och till sist godkänna.", // REVIEW-SV
      result:
        "Granskarnas manuella tid per ritning minskade med ungefär 80 %. Ett REST-API i FastAPI med 132 endpoints, 47 av 48 pytest-tester gröna, multi-tenant med Supabase RLS och ett kostnadstak på 15 dollar per dokument. Hybrid-RAG med BM25 håller sökkvaliteten uppe även i långa, tekniska regeltexter.",
    },
  },

  {
    slug: "voice-agents-suite",
    title: "Production Voice Agents: Retell, ElevenLabs, GoHighLevel and n8n",
    tagline:
      "AI callers that follow up new leads and book appointments, built for more than five businesses",
    description:
      "At Metaviz AI I built the voice agents, GoHighLevel automations and n8n flows behind an agency's AI lead follow-up. Jake Wims's agency sells the service to US real-estate teams and a mortgage lender, and I rolled the template out as more than five client agents, one for each business owner the agency signed.",
    problem:
      "New leads from Facebook ads go cold within hours, and a small team can't call every one of them back at 21:40. Off-the-shelf voice bots sounded robotic or lost the details at the CRM handoff.",
    solution:
      "A Retell voice agent calls each new lead from a local number, recaps what they entered in the form, qualifies them Hot, Warm or Cold on rules the client approved, and books straight into the GoHighLevel calendar through n8n tools. After the call it writes notes back to the CRM, sends lead and internal emails, and starts SMS or nurture sequences when nobody answers. I packaged it as a cloneable template with real-estate and mortgage variants and a shared n8n inbound lookup that greets callers with the right business name. Alongside it I built inbound concierge agents and sales, support and booking agents on ElevenLabs Conversational AI.",
    result:
      "More than five client agents built from one template, one for each business owner the agency signed. The architecture was verified against the real Retell, n8n and GoHighLevel APIs, with a 10-case test plan, a fix for misclassified leads, and a cross-client greeting leak root-caused and fixed across every agent. On a separate prompt rewrite at Metaviz, I cut one agent's prompt from 16,800 to 3,279 words and raised response-rule compliance from about 25% to 98%.",
    image: "/projects/anonymized/voice-workflows.png",
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
    employer: "metaviz",
    sv: {
      title:
        "Röstagenter i produktion: Retell, ElevenLabs, GoHighLevel och n8n",
      tagline:
        "AI som ringer upp nya leads och bokar möten, byggd för fler än fem företag", // REVIEW-SV
      description:
        "På Metaviz AI byggde jag röstagenterna, GoHighLevel-automationerna och n8n-flödena bakom en byrås AI-uppföljning av leads. Jake Wims byrå säljer tjänsten till amerikanska mäklarteam och en bolånegivare, och jag satte upp mallen som fler än fem agenter, en för varje företagare byrån skrev avtal med.", // REVIEW-SV
      problem:
        "Nya leads från Facebook-annonser kallnar på några timmar, och ett litet team hinner inte ringa tillbaka alla klockan 21.40. Färdiga röstbotar lät robotaktiga eller tappade detaljerna i överlämningen till CRM:et.",
      solution:
        "En röstagent i Retell ringer varje ny lead från ett lokalt nummer, sammanfattar vad personen fyllde i, bedömer leadet som Hot, Warm eller Cold enligt regler kunden har godkänt och bokar direkt i GoHighLevel-kalendern via n8n. Efter samtalet skrivs anteckningar tillbaka till CRM:et, mejl går till leadet och teamet, och SMS eller uppföljningssekvenser startar om ingen svarar. Jag paketerade allt som en mall som går att klona, med varianter för mäklare och bolån, och en gemensam n8n-uppslagning som hälsar med rätt företagsnamn. Vid sidan av det byggde jag inkommande receptionsagenter och agenter för sälj, support och bokning på ElevenLabs Conversational AI.", // REVIEW-SV
      result:
        "Fler än fem kundagenter byggda från samma mall, en för varje företagare byrån skrev avtal med. Arkitekturen verifierades mot de riktiga API:erna i Retell, n8n och GoHighLevel, med en testplan på tio fall, en rättning av felklassade leads och en läcka av hälsningsfraser mellan kunder som spårades och åtgärdades i alla agenter. I ett separat promptarbete på Metaviz kortade jag en agents prompt från 16 800 till 3 279 ord och höjde följsamheten mot svarsreglerna från cirka 25 % till 98 %.", // REVIEW-SV
    },
  },

  {
    slug: "postura",
    title: "Postura, On-Device Ergonomic Assessment",
    tagline:
      "Real-time pose analysis + Cornell ROSA scoring, all offline, in Flutter",
    description:
      "A mobile app that captures side-view photos of desk workers and computes a Rapid Office Strain Assessment (ROSA) 1–10 risk score entirely on-device. No cloud round-trips, no privacy concerns, no per-assessment cloud bill.",
    problem:
      "Ergonomic assessments traditionally needed an in-person consultant or photos uploaded to cloud ML services. Slow, expensive, privacy-sensitive, and impossible to scale to one-time workplace audits across thousands of workstations.",
    solution:
      "Flutter 3.9 app with isolate-based YOLOv8n (TFLite FP16, 6.2 MB) for person + monitor detection at 2 fps, layered with MediaPipe Accurate pose estimation at 10 fps. One Euro Filter smoothing keeps landmarks stable (sub-2-pixel jitter). GPU → NNAPI → XNNPack delegate fallback achieves 30–80 ms inference latency. Cornell ROSA scoring algorithm ported Python → Dart with strict golden-set validation.",
    result:
      "±1-point congruence with the reference Python implementation across a 71-photo golden test set (100% pass). Zero cloud inference cost. Supports Android API 21+ and iOS 15.5+, runs on any modern device.",
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
    category: "research",
    employer: "metaviz",
    sv: {
      title:
        "Postura, ergonomisk bedömning direkt i mobilen",
      tagline:
        "Hållningsanalys i realtid och ROSA-poäng från Cornell, helt offline i Flutter",
      description:
        "En mobilapp som tar bilder från sidan på personer vid skrivbordet och räknar fram en ROSA-riskpoäng (Rapid Office Strain Assessment) från 1 till 10 helt i telefonen. Inga anrop till molnet, inga integritetsproblem och ingen molnkostnad per bedömning.", // REVIEW-SV
      problem:
        "Ergonomiska bedömningar har krävt en konsult på plats eller att bilder laddas upp till ML-tjänster i molnet. Det är långsamt, dyrt, känsligt för integriteten och omöjligt att skala till tusentals arbetsplatser.",
      solution:
        "En Flutter 3.9-app där YOLOv8n (TFLite FP16, 6,2 MB) körs i en egen isolate och hittar person och skärm två gånger per sekund, ovanpå MediaPipe Accurate som skattar hållningen tio gånger per sekund. Ett One Euro-filter håller punkterna stabila (under 2 pixlars skakning). Fallback från GPU till NNAPI till XNNPack ger 30–80 ms per inferens. Cornells ROSA-algoritm portades från Python till Dart och validerades strikt mot ett facit.", // REVIEW-SV
      result:
        "Högst ±1 poängs avvikelse från referensimplementationen i Python på ett testset med 71 foton (100 % godkända). Ingen kostnad för inferens i molnet. Fungerar på Android API 21+ och iOS 15.5+, på alla moderna enheter.",
    },
  },

  {
    slug: "coach",
    title: "Coach, AI Habit Coaching with Realtime Voice",
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
    category: "products",
    employer: "metaviz",
    sv: {
      title:
        "Coach, AI-coachning av vanor med röst i realtid",
      tagline:
        "Bildverifiering med GPT-4o Vision och röstcoachning via OpenAI Realtime, i en Flutter-app",
      description:
        "En vaneapp som anpassar sig efter användarens personlighet. Du fotar beviset på en avklarad vana och GPT-4o Vision bekräftar med en säkerhetspoäng och återkoppling i klartext. Röstcoachning i realtid via OpenAI Realtime API, strömmat genom LiveKit och ElevenLabs.", // REVIEW-SV
      problem:
        "De flesta vaneappar misslyckas eftersom återkopplingen är generisk och användaren själv intygar att vanan är gjord. Vi behövde verifiering som bär sig ekonomiskt i stor skala, plus röstcoachning utan en mänsklig coach.", // REVIEW-SV
      solution:
        "Backend i FastAPI och Firestore (21 samlingar). Bildverifiering med GPT-4o Vision via signerade GCS-länkar för cirka 0,0075 dollar per bild. gpt-4o-realtime-preview för röstcoachning, LiveKit för WebRTC, ElevenLabs för tal och Deepgram som reserv för taligenkänning. Promptcachning och ett glidande fönster på 50 meddelanden håller tokenkostnaden förutsägbar.",
      result:
        "Tokenkostnaden per session minskade med ungefär 50 % tack vare promptcachning, och kostnaden per användare har ett tak på 150 dollar i månaden. 21 Firestore-samlingar, övervakning med Sentry och Prometheus, driftsatt via Coolify på DigitalOcean. Bildverifiering på under en sekund utan GPU-servrar.",
    },
  },

  {
    slug: "ai-real-estate-marketplace",
    title: "AI-Powered Real Estate Marketplace with Multi-LLM Valuation",
    tagline:
      "7+ microservices and a multi-provider AI property valuation engine",
    description:
      "Real-estate marketplace coordinating 7+ microservices through a Traefik gateway and RabbitMQ event bus. Multi-provider AI property valuation engine with graceful fallbacks across OpenAI GPT-4, DeepSeek, Hugging Face, and Groq.",
    problem:
      "Property valuation in emerging markets is inconsistent, comparable-sale data is thin and human valuations vary widely. Single-LLM dependency would have been a single point of failure for both cost and downtime.",
    solution:
      "Polyglot microservices: Node + Express + Prisma for listings / auth / inventory / admin; Python FastAPI for geocoding. All sit behind a Traefik gateway with a RabbitMQ 3.12 event bus. The AI valuation engine routes across 4 LLM providers with confidence scoring (0–1), Redis-cached at 1-hr TTL, batch-valuation enabled. Flutter mobile with strict Clean Architecture, zero Flutter imports in the domain layer.",
    result:
      "Production multi-LLM orchestration with graceful fallback when a provider is down or rate-limited. OpenSearch 2.11 for near-real-time property search. Multi-locale i18n. Confidence-scored valuations with reasoning surface for human review.",
    image: "/projects/ai-real-estate-marketplace.webp",
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
    category: "products",
    employer: "metaviz",
    sv: {
      title:
        "AI-driven fastighetsmarknad med värdering från flera LLM:er", // REVIEW-SV
      tagline:
        "Fler än sju mikrotjänster och en AI-värderingsmotor som växlar mellan flera leverantörer",
      description:
        "En marknadsplats för fastigheter där fler än sju mikrotjänster samordnas via en Traefik-gateway och en RabbitMQ-händelsebuss. AI-värderingen växlar mellan OpenAI GPT-4, DeepSeek, Hugging Face och Groq när en leverantör ligger nere.",
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
    featured: false,
    order: 13,
    category: "products",
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
    image: "/projects/anonymized/travel-platform.png",
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
    employer: "metaviz",
  },

  {
    slug: "ai-craftsmen-marketplace",
    title: "AI-Powered Craftsmen Marketplace with Conversational Butler",
    tagline:
      "Conversational AI assistant, smart hybrid search, multi-tenant marketplace across web and mobile",
    description:
      "Craftsmen marketplace where the AI tier is the differentiator. A conversational AI assistant guides customers, professionals, field workers, and admins through every flow, while smart search matches jobs by intent instead of keywords. Full-stack across web, mobile, and a substantial AI backend.",
    problem:
      "Tradespeople were juggling 3+ tools for scheduling, payments, and customer comms. On the customer side, keyword search across craftsmen produced poor matches, no understanding of intent, urgency, or job category from natural language.",
    solution:
      "Conversational AI assistant across 4 user modes (customer, professional, field worker, admin) on a deterministic state machine with mode-specific tools for estimation, claims, payments, scheduling, and vision-based intake. Smart hybrid search blends semantic embeddings with keyword search and cross-encoder reranking; an AI search-intake layer parses natural-language queries into structured parameters. AI-powered lead enrichment from supplier websites. Long-term memory captures user preferences and patterns across sessions, with per-tenant LLM cost tracking and daily rollups. FastAPI 0.109 + async SQLAlchemy + Postgres 15 backend, React 19 + Vite web, Flutter mobile (Clean Architecture, Riverpod, SQLite offline). RBAC with 6 roles, 3 auth modalities (password, Twilio OTP, WebAuthn biometrics) with JWT + Argon2. Stripe Terminal for in-person cards. Real-time threaded messaging via SSE.",
    result:
      "Production craftsmen marketplace with substantive AI tier: conversational assistant across customer/pro/field/admin flows, intent-matched search, and per-tenant cost attribution. Multi-locale i18n. Multi-tenant data isolation.",
    image: "/projects/anonymized/services-marketplace.png",
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
    employer: "metaviz",
  },

  {
    slug: "ai-tools-suite",
    title: "AI Tools Suite, 8-Tool SaaS Platform",
    tagline:
      "Eight user-facing AI tools shipping under one umbrella, including a multi-LLM chat orchestrator",
    description:
      "Multi-tool SaaS productising deep AI engineering capability, 8 user-facing tools shipping under one umbrella, including a multi-LLM chat orchestrator (LangChain + LangGraph routing across OpenAI and Gemini) and a YOLOv7 computer-vision pipeline.",
    problem:
      "AI engineering capability was locked inside one-off client engagements. We needed a productised surface that both demoed the stack and drove inbound interest.",
    solution:
      "Django 5.0 + DRF 3.15 (10 microservice apps) and React 18 + Vite + TypeScript + Tailwind 3.3. Shipped: GitHub Code Explainer, AI Interview Coach, Multilingual Blog Builder (30+ languages), Structured Prompt Generator, Smart Product Copywriter (bulk CSV), PDF Logo Removal (YOLOv7), Text Humanizer, and a multi-LLM Voice/Chat Assistant with LangChain + LangGraph intelligently routing across OpenAI and Gemini. AG2 multi-agent orchestration for complex reasoning. WebSocket real-time via Daphne + Channels.",
    result:
      "8 tools live. 10 Django microservice apps. JWT auth via SimpleJWT, rate limiting, 30+ language translation pipeline. Deployed via Docker Compose + Nginx + GitHub Actions CI/CD to Coolify on DigitalOcean.",
    image: "/projects/anonymized/ai-tools.png",
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
    employer: "metaviz",
  },

  {
    slug: "ai-video-pipeline",
    title: "AI Video Pipeline, 60-Node n8n Automation",
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
    category: "business",
    employer: "metaviz",
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
    category: "products",
  },
];
