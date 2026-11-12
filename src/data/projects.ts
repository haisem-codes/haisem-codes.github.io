import type { Locale } from "@/i18n/config";
import type { Project, TextProject } from "@/types";

export function localize(p: Project, lang: Locale): Project {
  return lang === "sv" && p.sv ? { ...p, ...p.sv } : p;
}

export function localizeText(p: TextProject, lang: Locale): TextProject {
  return lang === "sv" && p.sv ? { ...p, ...p.sv } : p;
}

export const projects: Project[] = [
  // ===================== FEATURED (3) =====================

  {
    slug: "ai-compliance-platform",
    title: "AI Building-Code Compliance Platform",
    tagline:
      "Building-plan compliance across five code disciplines: LangGraph, OCR, hybrid retrieval and citation validation",
    outcome:
      "Cut manual review time by approximately 80% and average inference spend by approximately 40% per document.",
    description:
      "Built at Metaviz: a compliance review platform that checks building plans against five code disciplines. I engineered the compliance workflow with LangGraph orchestration, OCR, hybrid retrieval and citation validation, supported by 132 FastAPI endpoints.",
    problem:
      "Checking a building plan against the codes of five disciplines was manual work, and reviewer time was the cost to cut.",
    solution:
      "LangGraph orchestration routes each drawing through OCR and hybrid retrieval over the code corpus, and validates every citation before a finding is reported. The workflow runs behind 132 FastAPI endpoints.",
    result:
      "Reduced manual review time by approximately 80% and average inference spend by approximately 40% per document.",
    image: "/work/ai-compliance-platform-1600.webp",
    techStack: [
      "LangGraph",
      "FastAPI",
      "OCR",
      "Hybrid retrieval",
      "Citation validation",
    ],
    featured: true,
    order: 1,
    category: "business",
    context: "metaviz",
    sv: {
      title: "AI-plattform för granskning mot byggregler", // REVIEW-SV
      tagline:
        "Granskning av bygghandlingar inom fem regeldiscipliner: LangGraph, OCR, hybrid sökning och kontroll av citat", // REVIEW-SV
      outcome:
        "Minskade den manuella granskningstiden med cirka 80 % och den genomsnittliga inferenskostnaden med cirka 40 % per dokument.", // REVIEW-SV
      description:
        "Byggt på Metaviz: en plattform som granskar bygghandlingar mot byggreglerna inom fem discipliner. Jag byggde granskningsflödet med LangGraph, OCR, hybrid sökning och kontroll av citat, med stöd av 132 FastAPI-endpoints.", // REVIEW-SV
      problem:
        "Att granska en bygghandling mot reglerna inom fem discipliner var manuellt arbete, och granskarnas tid var det som skulle minskas.", // REVIEW-SV
      solution:
        "LangGraph styr varje ritning genom OCR och hybrid sökning i regelverket, och varje citat kontrolleras innan ett fynd rapporteras. Flödet körs bakom 132 FastAPI-endpoints.", // REVIEW-SV
      result:
        "Minskade den manuella granskningstiden med cirka 80 % och den genomsnittliga inferenskostnaden med cirka 40 % per dokument.", // REVIEW-SV
    },
  },

  {
    slug: "voice-agents-suite",
    title: "Production Voice Agents: Retell, GoHighLevel and n8n",
    tagline:
      "Qualification, appointment-booking and CRM-update workflows for more than five business owners",
    outcome:
      "AI callers that qualify new leads, book appointments and update the CRM, for more than five business owners.",
    description:
      "Built at Metaviz as a client project: voice-agent qualification, appointment-booking and CRM-update workflows using Retell, GoHighLevel, n8n, APIs and webhooks, for more than five business owners. Jake Wims (Founder, Acquire Growth AI) sold the service to US real-estate teams and a mortgage lender, and I rolled the template out as one agent for each business owner he signed.",
    problem:
      "New leads from ad forms need a fast call-back, and a small team can't phone every one of them. Generic voice bots lose the details at the CRM handoff.",
    solution:
      "A Retell voice agent calls each new lead from a local number, recaps what they entered in the form, qualifies them Hot, Warm or Cold on rules the client approved, and books straight into the GoHighLevel calendar through n8n tools. After the call it writes notes back to the CRM, sends lead and internal emails, and starts SMS or nurture sequences when nobody answers. I packaged it as a cloneable template with real-estate and mortgage variants and a shared n8n inbound lookup that greets callers with the right business name.",
    result:
      "More than five business owners served from one template. The architecture was verified against the live Retell, n8n and GoHighLevel APIs, with a 10-case test plan, a fix for misclassified leads, and a cross-client greeting leak root-caused and fixed across every agent.",
    image: "/work/voice-agents-suite-1600.webp",
    techStack: ["Retell AI", "GoHighLevel", "n8n", "APIs and webhooks"],
    featured: true,
    order: 2,
    category: "business",
    context: "client",
    sv: {
      title: "Röstagenter i produktion: Retell, GoHighLevel och n8n", // REVIEW-SV
      tagline:
        "Kvalificering, bokning och CRM-uppdateringar för fler än fem företagare", // REVIEW-SV
      outcome:
        "AI som kvalificerar nya leads, bokar möten och uppdaterar CRM:et, för fler än fem företagare.", // REVIEW-SV
      description:
        "Byggt på Metaviz som kundprojekt: röstagenter för kvalificering, mötesbokning och CRM-uppdateringar med Retell, GoHighLevel, n8n, API:er och webhooks, för fler än fem företagare. Jake Wims (grundare, Acquire Growth AI) sålde tjänsten till amerikanska mäklarteam och en bolångivare, och jag satte upp mallen som en agent för varje företagare han skrev avtal med.", // REVIEW-SV
      problem:
        "Nya leads från annonsformulär behöver ett snabbt återsamtal, och ett litet team hinner inte ringa alla. Generiska röstbotar tappar detaljerna i överlämningen till CRM:et.", // REVIEW-SV
      solution:
        "En röstagent i Retell ringer varje ny lead från ett lokalt nummer, sammanfattar vad personen fyllde i, bedömer leadet som Hot, Warm eller Cold enligt regler kunden har godkänt och bokar mötet direkt i GoHighLevel-kalendern via n8n. Efter samtalet skrivs anteckningar tillbaka till CRM:et, mejl går till leadet och teamet, och SMS eller uppföljningssekvenser startar om ingen svarar. Jag paketerade allt som en mall som går att klona, med varianter för mäklare och bolån, och en gemensam n8n-uppslagning som hälsar med rätt företagsnamn.", // REVIEW-SV
      result:
        "Fler än fem företagare betjänade från samma mall. Arkitekturen verifierades mot de riktiga API:erna i Retell, n8n och GoHighLevel, med en testplan på tio fall, en åtgärd av felklassade leads och en läcka av hälsningsfraser mellan kunder som spårades och åtgärdades i alla agenter.", // REVIEW-SV
    },
  },

  {
    slug: "postura",
    title: "Postura, On‑Device Ergonomic Assessment",
    tagline:
      "Pose estimation and ROSA scoring on the phone, with the Python scoring ported to Dart",
    outcome:
      "Ergonomic risk scoring that runs on the device, with the Dart port compared against a 71-photo reference set.",
    description:
      "Built at Metaviz: an on-device ergonomic assessment using YOLOv8n and TensorFlow Lite, pose estimation and ROSA (Rapid Office Strain Assessment) scoring. I ported the Python scoring to Dart and created comparisons against a 71-photo reference set.",
    problem:
      "On-device ergonomic assessment using pose estimation and ROSA scoring.",
    solution:
      "YOLOv8n running in TensorFlow Lite finds the person, pose estimation locates the body landmarks and ROSA scoring turns them into a risk score, all on the device. The scoring began in Python; I ported it to Dart and built comparisons against a 71-photo reference set to check the two agree.",
    result:
      "Assessment runs entirely on the device, and the Dart scoring is checked against the Python reference on a 71-photo set.",
    image: "/work/postura-1600.webp",
    techStack: [
      "YOLOv8n",
      "TensorFlow Lite",
      "Pose estimation",
      "ROSA scoring",
      "Flutter",
      "Dart",
      "Python",
    ],
    featured: true,
    order: 3,
    category: "research",
    context: "metaviz",
    sv: {
      title: "Postura, ergonomisk bedömning direkt i mobilen",
      tagline:
        "Hållningsanalys och ROSA-poäng i telefonen, med poängen portad från Python till Dart", // REVIEW-SV
      outcome:
        "Ergonomisk riskbedömning som körs i enheten, med Dart-versionen jämförd mot ett referensset på 71 foton.", // REVIEW-SV
      description:
        "Byggt på Metaviz: en ergonomisk bedömning direkt i enheten med YOLOv8n och TensorFlow Lite, hållningsskattning och ROSA-poäng (Rapid Office Strain Assessment). Jag portade poängsättningen från Python till Dart och byggde jämförelser mot ett referensset på 71 foton.", // REVIEW-SV
      problem:
        "Ergonomisk bedömning i enheten med hållningsskattning och ROSA-poäng.", // REVIEW-SV
      solution:
        "YOLOv8n i TensorFlow Lite hittar personen, hållningsskattningen lokaliserar kroppspunkterna och ROSA-poängen gör om dem till en riskpoäng, allt i enheten. Poängsättningen började i Python; jag portade den till Dart och byggde jämförelser mot ett referensset på 71 foton för att se att de stämmer överens.", // REVIEW-SV
      result:
        "Bedömningen körs helt i enheten, och Dart-poängen kontrolleras mot Python-referensen på ett set med 71 foton.", // REVIEW-SV
    },
  },

  {
    slug: "coach",
    title: "Coach, AI Habit Coaching with Realtime Voice",
    tagline:
      "Multimodal habit coaching with OpenAI Realtime, LiveKit and photo verification",
    description:
      "Built at Metaviz as a client project: multimodal habit coaching with OpenAI Realtime, LiveKit and photo verification, integrating conversational context with 21 Firestore collections.",
    problem:
      "Multimodal habit coaching with realtime voice and photo verification of completed habits.",
    solution:
      "Realtime voice coaching through OpenAI Realtime and LiveKit, photo verification of completed habits, and conversational context drawn from 21 Firestore collections. Prompt caching keeps the cost of each session down.",
    result:
      "Reduced session token cost by approximately 50% through prompt caching.",
    image: "/work/coach-1600.webp",
    techStack: [
      "OpenAI Realtime",
      "LiveKit",
      "Firestore",
      "Photo verification",
      "Prompt caching",
    ],
    featured: false,
    order: 4,
    category: "products",
    context: "client",
    sv: {
      title: "Coach, AI-coachning av vanor med röst i realtid",
      tagline:
        "Multimodal vanecoachning med OpenAI Realtime, LiveKit och bildverifiering", // REVIEW-SV
      description:
        "Byggt på Metaviz som kundprojekt: multimodal vanecoachning med OpenAI Realtime, LiveKit och bildverifiering, där samtalskontexten hämtas från 21 Firestore-samlingar.", // REVIEW-SV
      problem:
        "Multimodal vanecoachning med röst i realtid och bildverifiering av avklarade vanor.", // REVIEW-SV
      solution:
        "Röstcoachning i realtid via OpenAI Realtime och LiveKit, bildverifiering av avklarade vanor och samtalskontext från 21 Firestore-samlingar. Promptcachning håller kostnaden per session nere.", // REVIEW-SV
      result:
        "Sänkte tokenkostnaden per session med cirka 50 % genom promptcachning.", // REVIEW-SV
    },
  },

  // ===================== LIST =====================

  {
    slug: "ai-real-estate-marketplace",
    title: "Wanyumba, AI Assistants for a Property Platform",
    tagline:
      "PydanticAI assistants with contextual system prompts and typed tools for property workflows",
    description:
      "Built at Metaviz: I led the agentic AI integration and backend development for Wanyumba (property), engineering PydanticAI assistants with LLM APIs, contextual system prompts and typed tools for domain workflows.",
    problem:
      "A property platform needed assistants that act on its own domain workflows, not just chat.",
    solution:
      "PydanticAI assistants call typed tools for the domain workflows, with contextual system prompts carrying the user's situation. I configured the model providers and the prompt-cache keys.",
    result:
      "One of the three SaaS platforms where I led the AI integration at Metaviz, alongside AfricaTravelHub and Handman/Getapro.",
    image: "/work/ai-real-estate-marketplace-1600.webp",
    techStack: [
      "PydanticAI",
      "LLM APIs",
      "Typed tool calling",
      "Prompt caching",
      "Python",
    ],
    featured: false,
    order: 5,
    category: "products",
    context: "metaviz",
    sv: {
      title: "Wanyumba, AI-assistenter för en fastighetsplattform", // REVIEW-SV
      tagline:
        "PydanticAI-assistenter med kontextuella systemprompter och typade verktyg för fastighetsflöden", // REVIEW-SV
    },
  },

  {
    slug: "b2b-travel-saas",
    title: "AfricaTravelHub, Conversational Travel Discovery",
    tagline:
      "PydanticAI assistant with hybrid retrieval and topic guardrails",
    description:
      "Built at Metaviz: I led the agentic AI integration and backend development for AfricaTravelHub (travel). Conversational discovery over ranked inventory with pgvector and PostgreSQL full-text retrieval fused by reciprocal rank fusion, topic guardrails.",
    problem:
      "Travel discovery over a large inventory needs answers grounded in what is actually on offer, and an assistant that stays on topic.",
    solution:
      "pgvector and PostgreSQL full-text retrieval, combined with reciprocal rank fusion, ground the conversation in ranked inventory. Topic guardrails keep the assistant on travel.",
    result:
      "Conversational discovery grounded in ranked inventory, with topic guardrails.",
    image: "/work/b2b-travel-saas-1600.webp",
    techStack: [
      "PydanticAI",
      "pgvector",
      "PostgreSQL full-text search",
      "Reciprocal rank fusion",
      "Topic guardrails",
    ],
    featured: false,
    order: 6,
    category: "products",
    context: "metaviz",
    sv: {
      title: "AfricaTravelHub, konverserande reseupptäckt", // REVIEW-SV
      tagline:
        "PydanticAI-assistent med hybrid sökning och ämnesgränser", // REVIEW-SV
    },
  },

  {
    slug: "ai-craftsmen-marketplace",
    title: "Handman/Getapro, AI Assistants for a Trades Platform",
    tagline:
      "Hybrid retrieval, scenario evaluations and human-approved actions for a trades marketplace",
    description:
      "Built at Metaviz: I led the agentic AI integration and backend development for Handman/Getapro (trades). PydanticAI assistants with typed tools, pgvector and PostgreSQL full-text retrieval fused by reciprocal rank fusion to match professionals, and prompt-cache keys configured per provider.",
    problem:
      "Customers describe a job in their own words, and the platform has to match it to the right professional and run the workflow safely.",
    solution:
      "Retrieval matches professionals through pgvector and PostgreSQL full-text search fused by reciprocal rank fusion. Capability gates and human-approved actions control what the assistant can do. I added scenario evaluations for tool selection and workflow state, supported by token attribution, timing logs and tool audits.",
    result:
      "Tool selection and workflow state are covered by scenario evaluations, with token attribution, timing logs and tool audits showing what each run did.",
    image: "/work/ai-craftsmen-marketplace-1600.webp",
    techStack: [
      "PydanticAI",
      "pgvector",
      "PostgreSQL full-text search",
      "Reciprocal rank fusion",
      "Scenario evaluations",
      "RBAC",
    ],
    featured: false,
    order: 7,
    category: "products",
    context: "metaviz",
    sv: {
      title: "Handman/Getapro, AI-assistenter för en hantverksplattform", // REVIEW-SV
      tagline:
        "Hybrid sökning, scenariotester och åtgärder som godkänns av människa för en hantverksmarknadsplats", // REVIEW-SV
    },
  },

  {
    slug: "ai-tools-suite",
    title: "AI Productivity Tools",
    tagline:
      "Repository explanations, interview support, multilingual blogs and product copy, plus a real-time voice prototype",
    description:
      "Built at Metaviz: I contributed to AI productivity tools for repository explanations, interview support, multilingual blogs and product copy, plus a real-time voice prototype.",
    problem:
      "LLM capability was most useful as simple, single-purpose tools that people could use directly.",
    solution:
      "I contributed tools for repository explanations, interview support, multilingual blogs and product copy, and built a real-time voice prototype.",
    result: "Contributed to the Metaviz AI productivity tools.",
    image: "/work/ai-tools-suite-1600.webp",
    techStack: ["LLM APIs", "Multilingual generation", "Real-time voice"],
    featured: false,
    order: 8,
    category: "products",
    context: "metaviz",
    sv: {
      title: "AI-verktyg för produktivitet", // REVIEW-SV
      tagline:
        "Kodförklaringar, intervjustöd, flerspråkiga bloggar och produkttexter, plus en röstprototyp i realtid", // REVIEW-SV
    },
  },

  {
    slug: "dietapp",
    title: "DietApp, AI Nutrition Recommendations",
    tagline:
      "A recommendation API with output validation, retries and fallbacks, later moved to deterministic rules",
    description:
      "Built at Metaviz: I implemented the DietApp AI recommendation API with output validation, retries and fallbacks, and later replaced LLM inference with deterministic recommendation rules.",
    problem:
      "An LLM-backed recommendation endpoint has to return something usable every time.",
    solution:
      "Model output is validated, failed calls are retried, and fallbacks cover the rest. Later I replaced the LLM inference with deterministic recommendation rules.",
    result:
      "Recommendations that stay predictable, with deterministic rules in place of LLM inference.",
    image: "/work/dietapp-1600.webp",
    techStack: [
      "LLM APIs",
      "Output validation",
      "Retries and fallbacks",
      "Deterministic rules",
    ],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.biotin.diet_app",
    featured: false,
    order: 10,
    category: "products",
    context: "metaviz",
    sv: {
      title: "DietApp, AI-rekommendationer för kost", // REVIEW-SV
      tagline:
        "Ett rekommendations-API med validering av svar, omförsök och reservlösningar, senare ersatt av deterministiska regler", // REVIEW-SV
    },
  },

  {
    slug: "claude-code-mastery",
    title: "Claude Code Mastery",
    tagline:
      "A configuration system for Claude Code and the Agent SDK: installable skills, subagents, hooks and setup templates",
    description:
      "An open-source repository of configuration templates, skills, subagents, hooks and learning guides for Claude Code and the Claude Agent SDK. Includes a setup prompt that generates a CLAUDE.md and settings.json for a codebase.",
    problem:
      "Setting up Claude Code means configuring settings, hooks and permissions and collecting skills by hand.",
    solution:
      "Curated installable skills across domains (engineering, C-level advisory, marketing, compliance, product, finance), specialised subagents (development, infrastructure, quality, data/AI, security), hooks (safety gates, quality auto-checks, intelligent skill matching), configuration templates for several stacks, and a setup prompt that analyses a codebase and auto-generates personalised CLAUDE.md + settings.json. A real installer ships presets with dry-run, backup and undo.",
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
    order: 11,
    category: "products",
    sv: {
      title: "Claude Code Mastery", // REVIEW-SV
      tagline:
        "Ett konfigurationssystem för Claude Code och Agent SDK: installerbara skills, subagenter, hooks och färdiga mallar", // REVIEW-SV
    },
  },
];

/** Work with no case-study page or mockup: shown as a text row in the compact list. */
export const textProjects: TextProject[] = [
  {
    slug: "icore-career-hub",
    title: "ICore Career Hub",
    description:
      "Built at Metaviz: AI APIs for structured PDF/DOCX CV extraction, skill filtering and embedding-based candidate matching, with validation, retries and vector-profile synchronization.",
    order: 9,
    category: "products",
    context: "metaviz",
    sv: {
      description:
        "Byggt på Metaviz: AI-API:er för strukturerad extraktion ur CV i PDF/DOCX, kompetensfiltrering och embeddingbaserad kandidatmatchning, med validering, omförsök och synkronisering av vektorprofiler.", // REVIEW-SV
    },
  },
];
