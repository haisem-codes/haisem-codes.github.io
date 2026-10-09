import type { IntakeAnswers } from "./schema";

const HOURS = { lt2: 1, "2to5": 3.5, "5to10": 7.5, "10to20": 15, gt20: 25 } as const;
const HOURS_PTS = { lt2: 5, "2to5": 15, "5to10": 22, "10to20": 27, gt20: 30 } as const;
const TIMELINE_PTS = { asap: 20, "1m": 16, "1to3m": 10, exploring: 4 } as const;
const BUDGET_PTS = { lt10k: 5, "10to25k": 10, "25to50k": 13, gt50k: 15, unsure: 7 } as const;
const DECISION_PTS = { me: 15, shared: 10, other: 4 } as const;
export const LOADED_HOURLY_SEK = 450;

const QUESTIONS: Record<string, string> = {
  calls: "How do calls reach you today, and how many go unanswered in a normal week?",
  booking: "Walk me through one booking from first contact to confirmed time. Which system holds the calendar?",
  enquiries: "Which questions come in again and again? Where do the answers live today?",
  lead_followup: "Where do new leads come from, and how fast does someone reply now?",
  quotes_invoices: "What goes into a quote? Which accounting system do you use and do you have admin access?",
  data_entry: "Which two systems do you copy between, how often, and what breaks when it's wrong?",
  reports: "Which report, for whom, how often, and where does the data come from?",
  reviews_social: "Which platforms matter, and who answers reviews today?",
  other: "Tell me about the task you mentioned: what starts it, what are the steps, who does it?",
};

export function scoreIntake(a: IntakeAnswers) {
  const digital = a.tools.some((t) => t !== "paper") ? 20 : 5;
  const raw = HOURS_PTS[a.hours] + digital + TIMELINE_PTS[a.timeline] + BUDGET_PTS[a.budget ?? "unsure"] + DECISION_PTS[a.decision];
  const score = Math.max(0, Math.min(100, raw));
  const hoursPerWeek = HOURS[a.hours];
  return {
    score,
    tier: (score >= 70 ? "hot" : score >= 45 ? "warm" : "cold") as "hot" | "warm" | "cold",
    hoursPerWeek,
    annualSek: Math.round(hoursPerWeek * 52 * LOADED_HOURLY_SEK),
  };
}

const TOOL_NAMES: Record<string, string> = { google: "Google Workspace", microsoft: "Microsoft 365", fortnox: "Fortnox", visma: "Visma", bokadirekt: "Bokadirekt", crm: "CRM", spreadsheets: "Excel/Sheets", whatsapp: "WhatsApp", wix_wordpress: "Wix/WordPress", paper: "paper", other: "other" };

export function buildBrief(a: IntakeAnswers): string {
  const s = scoreIntake(a);
  const lines = [
    `${a.businessName} — ${s.tier.toUpperCase()} (${s.score}/100)`,
    `Contact: ${a.name} <${a.email}>${a.phone ? `, ${a.phone}` : ""} · call in ${a.callLang === "sv" ? "Swedish" : "English"} · form in ${a.lang}`,
    `Website: ${a.website || "—"} · industry: ${a.industry} · team: ${a.teamSize}`,
    "",
    `Goal: ${a.goal}`,
    `Time sinks: ${a.tasks.join(", ")} · ~${s.hoursPerWeek} h/week · enquiries/week: ${a.enquiries ?? "—"}`,
    a.goal === "website" ? `Website today: ${a.websiteState} · missing: ${a.websiteNeeds.join(", ") || "—"}` : "",
    `Tools: ${a.tools.map((t) => TOOL_NAMES[t]).join(", ")} · channels: ${a.channels.join(", ") || "—"}`,
    `Budget: ${a.budget ?? "not given"} · timeline: ${a.timeline} · decides: ${a.decision} · sensitive data: ${a.sensitive}`,
    "",
    `Rough value of time spent: ~${s.annualSek.toLocaleString("sv-SE")} SEK/year (${s.hoursPerWeek} h × 52 × ${LOADED_HOURLY_SEK} SEK). Estimate only.`,
    a.sensitive !== "no" ? "Flag: possible sensitive data — check GDPR scope, EU hosting, DPA before proposing." : "",
    "",
    "Ask on the call:",
    ...a.tasks.map((t) => `- ${QUESTIONS[t]}`),
    "- What would make this a success in 30 days? What happens if nothing changes in six months?",
    "- Who would own this day to day, and can you give admin access to the tools involved?",
    a.notes ? `\nNotes from them: ${a.notes}` : "",
  ];
  return lines.filter((l, i, arr) => l !== "" || arr[i - 1] !== "").join("\n");
}
