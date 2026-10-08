export const OPTIONS = {
  goal: ["more_customers", "missed_calls", "admin_time", "website", "unsure"],
  industry: ["clinic_health", "beauty_wellness", "restaurant_cafe", "real_estate", "trades_construction", "retail_ecommerce", "professional_services", "education", "fitness", "other"],
  teamSize: ["solo", "2to5", "6to20", "21to50", "gt50"],
  tasks: ["calls", "booking", "enquiries", "lead_followup", "quotes_invoices", "data_entry", "reports", "reviews_social", "other"],
  hours: ["lt2", "2to5", "5to10", "10to20", "gt20"],
  enquiries: ["lt10", "10to50", "50to200", "gt200"],
  websiteState: ["none", "outdated", "not_converting", "ok"],
  websiteNeeds: ["booking", "bilingual", "seo", "shop", "forms", "refresh"],
  tools: ["google", "microsoft", "fortnox", "visma", "bokadirekt", "crm", "spreadsheets", "whatsapp", "wix_wordpress", "paper", "other"],
  channels: ["phone", "web_form", "email", "social_dm", "walk_in", "booking_platform"],
  budget: ["lt10k", "10to25k", "25to50k", "gt50k", "unsure"],
  timeline: ["asap", "1m", "1to3m", "exploring"],
  decision: ["me", "shared", "other"],
  sensitive: ["yes", "no", "unsure"],
  callLang: ["en", "sv"],
  lang: ["en", "sv"],
} as const;

type O = typeof OPTIONS;
type One<K extends keyof O> = O[K][number];

export interface IntakeAnswers {
  goal: One<"goal">;
  businessName: string;
  website: string;
  industry: One<"industry">;
  teamSize: One<"teamSize">;
  tasks: One<"tasks">[];
  hours: One<"hours">;
  enquiries?: One<"enquiries">;
  websiteState?: One<"websiteState">;
  websiteNeeds: One<"websiteNeeds">[];
  tools: One<"tools">[];
  channels: One<"channels">[];
  budget?: One<"budget">;
  timeline: One<"timeline">;
  decision: One<"decision">;
  sensitive: One<"sensitive">;
  name: string;
  email: string;
  phone: string;
  callLang: One<"callLang">;
  notes: string;
  lang: One<"lang">;
  company_url_hp: string;
}

export type StepId = "goal" | "business" | "time" | "tools" | "plan" | "contact";

export const STEPS: { id: StepId; fields: (keyof IntakeAnswers)[] }[] = [
  { id: "goal", fields: ["goal"] },
  { id: "business", fields: ["businessName", "website", "industry", "teamSize"] },
  { id: "time", fields: ["tasks", "hours", "enquiries", "websiteState", "websiteNeeds"] },
  { id: "tools", fields: ["tools", "channels"] },
  { id: "plan", fields: ["budget", "timeline", "decision", "sensitive"] },
  { id: "contact", fields: ["name", "email", "phone", "callLang", "notes"] },
];

const ALWAYS: (keyof IntakeAnswers)[] = ["goal", "businessName", "industry", "teamSize", "tasks", "hours", "tools", "timeline", "decision", "sensitive", "name", "email", "callLang"];

export function requiredFor(a: Partial<IntakeAnswers>): (keyof IntakeAnswers)[] {
  return a.goal === "website" ? [...ALWAYS, "websiteState"] : ALWAYS;
}
