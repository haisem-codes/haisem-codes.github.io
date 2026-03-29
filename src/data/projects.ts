import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "voice-reservation-agent",
    title: "AI Voice Reservation Agent",
    tagline:
      "Intelligent voice AI agent handling restaurant reservations with Google Calendar sync and CRM integration",
    description:
      "Built an intelligent voice AI agent (Kate) using Retell AI that handles inbound restaurant reservation calls. Automatically booking, rescheduling, and canceling reservations while capturing customer data and syncing everything to Google Calendar via n8n and Supabase.",
    problem:
      "Restaurants were drowning in manual reservation management. Staff spent 20-30% of their time answering calls, double bookings caused scheduling conflicts, customer data was scattered across sticky notes and spreadsheets, and after-hours calls meant lost revenue.",
    solution:
      "Built an end-to-end voice AI system: Retell AI agent handles all inbound calls with natural conversation, collects party size, date/time, and special requests. The agent checks real-time availability via Google Calendar API, creates bookings, and triggers n8n workflows that sync customer data to Supabase and send SMS confirmations via Twilio. New customers are automatically registered, returning customers are greeted by name.",
    result:
      "Fully automated reservation system processing 100% of inbound calls 24/7. Reduced admin overhead by 90%. Zero double bookings. Customer data automatically synced across Google Calendar, Supabase, and CRM. Deployed across restaurant, pet care, and MedSpa verticals.",
    image: "/projects/voice-reservation-agent.webp",
    techStack: ["Retell AI", "GPT-4", "n8n", "Google Calendar API", "Supabase", "Twilio"],
    featured: true,
    order: 1,
  },
  {
    slug: "goai-chat",
    title: "GoAI Chat",
    tagline:
      "Multi-LLM chat application with intelligent model routing and agent orchestration",
    description:
      "An AI-powered chat application that delivers dynamic, personalized conversational experiences by intelligently matching user queries with the most suitable language model and agent combination.",
    problem:
      "Users needed a unified interface to interact with multiple AI models without manually switching between them. Each model has strengths (GPT for coding, Gemini for research, Claude for analysis) but users had to know which to pick and manage multiple subscriptions.",
    solution:
      "Built GoAI Chat with LangChain and LangGraph for agent orchestration, integrating OpenAI and Gemini APIs. The system intelligently routes queries to the best model based on task type, maintains conversation memory across sessions, and supports dynamic agent composition. Built with Node.js/Express backend, JWT authentication, and a responsive chat UI.",
    result:
      "Users get optimal AI responses without needing to know which model is best. Dynamic memory management keeps conversations contextual. Multi-agent orchestration handles complex tasks that require chaining multiple AI capabilities.",
    image: "/projects/goai-chat.webp",
    techStack: ["LangChain", "LangGraph", "OpenAI", "Gemini", "Node.js", "React"],
    featured: true,
    order: 2,
  },
  {
    slug: "moe-uae-dashboards",
    title: "MOE UAE Dashboards",
    tagline:
      "Government economic analytics app for UAE Ministry with 10,000+ downloads",
    description:
      "A mobile application delivering real-time economic data and analytics to government officials, policymakers, and business leaders in the UAE. Features interactive dashboards, data visualizations, and economic insights.",
    problem:
      "The UAE Ministry of Economy needed a way to make national economic data accessible to officials and the public. Existing systems were desktop-only, slow to update, and lacked the interactive visualizations needed for quick decision-making in policy meetings.",
    solution:
      "Built a cross-platform mobile app with real-time economic dashboards featuring interactive charts, filterable data views, and comparative analytics. Integrated with government data APIs for live updates. Designed for both Arabic and English users with full localization. Optimized for offline access so officials could reference data in meetings without connectivity.",
    result:
      "10,000+ downloads on Google Play. Used by government officials and policymakers for economic planning. Recognized as the official digital channel for Ministry economic insights. Delivered on time with full compliance to government security and accessibility standards.",
    image: "/projects/moe-uae-dashboards.webp",
    techStack: ["Flutter", "REST APIs", "Data Visualization", "Localization", "Government"],
    liveUrl: "https://play.google.com/store/apps/details?id=ae.economy.MOEDashboards",
    featured: true,
    order: 3,
  },
  {
    slug: "ai-video-pipeline",
    title: "AI Video Automation Pipeline",
    tagline:
      "Fully automated video production and multi-platform publishing system with 60+ n8n nodes",
    description:
      "A complete automated video production pipeline using n8n that transforms text ideas into professional short-form videos and auto-publishes across 5 platforms with zero manual intervention.",
    problem:
      "Content creators and agencies were spending 4-6 hours per video: writing scripts, generating visuals, editing footage, recording voiceovers, adding captions, and manually uploading to each platform. At scale, this was unsustainable.",
    solution:
      "Built a 60+ node n8n automation pipeline: GPT-4o generates scripts and platform-optimized descriptions, Flux AI creates POV images at 540x960, Kling AI converts them to 5-second motion videos, ElevenLabs synthesizes voiceovers, videos are composited with captions and transitions, then auto-published to TikTok, Instagram, YouTube, Facebook, and LinkedIn via their APIs.",
    result:
      "Reduced video production from 4-6 hours to under 10 minutes per video. Zero manual intervention from idea to published content across 5 platforms. Agencies using the system produce 10x more content with the same team size.",
    image: "/projects/ai-video-pipeline.webp",
    techStack: ["n8n", "GPT-4o", "Flux AI", "Kling AI", "ElevenLabs", "Multi-Platform API"],
    featured: true,
    order: 4,
  },
  {
    slug: "dietapp",
    title: "DietApp",
    tagline:
      "AI-powered nutrition and fitness app with meal planning, barcode scanning, and health tracking",
    description:
      "A comprehensive nutrition-first mobile app inspired by YAZIO. A calorie counter, meal planner, and health tracker that helps users meet their fitness goals through AI-powered personalization.",
    problem:
      "People trying to lose weight or build muscle struggle with nutrition tracking. Existing apps required manual food entry, had generic meal plans, and did not integrate with wearable devices. Users would abandon apps within 2 weeks due to the friction.",
    solution:
      "Built DietApp with AI-powered meal plan generation that adapts to dietary preferences and goals. Integrated barcode scanning for instant food logging, HealthKit/Google Fit/Fitbit sync for automatic activity tracking, custom macro calculations, recipe suggestions, and a social feed for community accountability. Subscription system with Stripe and App Store billing.",
    result:
      "Users track meals in under 30 seconds with barcode scanning vs 2+ minutes manual entry. AI-generated meal plans achieve 85% adherence rate vs 40% for generic plans. Full wearable integration means zero manual activity logging.",
    image: "/projects/dietapp.webp",
    techStack: ["Flutter", "AI/ML", "HealthKit", "Barcode Scanner", "Stripe", "Firebase"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.biotin.diet_app",
    featured: true,
    order: 5,
  },
];
