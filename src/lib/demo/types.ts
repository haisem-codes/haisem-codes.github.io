export type Lang = "en" | "sv";
export type Vertical = "salon" | "clinic" | "trades" | "restaurant";
export type Stage = "start" | "qualify" | "slots" | "booked";
export interface DemoState { stage: Stage; option?: string; slot?: string }
export interface BotMessage { from: "bot"; text: string; options?: string[] }
export interface CrmCard { status: string; service: string; replySeconds: number }
export interface DemoReply { state: DemoState; messages: BotMessage[]; crm?: CrmCard }
export interface DemoScript {
  business: string; greeting: string; suggestions: string[];
  bookWords: string[]; priceWords: string[]; hoursWords: string[];
  price: string; hours: string;
  qualifier: { question: string; options: string[] };
  slotsIntro: string; slots: string[];
  confirm: string;
  afterBooked: string; fallback: string;
  crmStatus: string;
}
