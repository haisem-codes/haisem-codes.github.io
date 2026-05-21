import type { PersonalInfo } from "@/types";

export const personal: PersonalInfo = {
  name: "Haisem Naeem",
  firstName: "HAISEM",
  title: "AI Engineer",
  tagline: "Building systems that think",
  bio: [
    "I'm a Senior AI Engineer building production AI across web, mobile, and voice. In the last 11 months I've shipped a building-code compliance platform (FastAPI + AWS Textract + GPT-5), an AI habit-coaching app with real-time voice (LiveKit + ElevenLabs + OpenAI Realtime), an on-device ergonomics scorer in Flutter (YOLOv8n + MediaPipe, all offline), and five production voice agents on Retell + GoHighLevel + n8n. About a dozen others. Most of them are still running.",
    "I build the whole thing, backend, frontend, mobile, the LLM layer, the deploy, and own the client conversation. Strongest where AI meets a real product surface: hybrid RAG (Pinecone / ChromaDB / pgvector + BM25), voice agents that don't sound like 2019 IVR, and cost-aware LLM orchestration that keeps variable spend predictable.",
  ],
  email: "haisem.work@gmail.com",
  socials: [
    {
      platform: "Email",
      url: "mailto:haisem.work@gmail.com",
      label: "haisem.work@gmail.com",
    },
    {
      platform: "Upwork",
      url: "https://www.upwork.com/freelancers/~0133714b88b12db649",
      label: "Haisem on Upwork",
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
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Production AI Systems", value: 12, suffix: "+" },
    { label: "Users Served", value: 10, suffix: "K+" },
  ],
};
