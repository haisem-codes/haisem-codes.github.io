import type { DemoScript, DemoState, DemoReply, BotMessage, Lang, Vertical } from "./types";

export const demoKey = (l: Lang, v: Vertical) => `${l}:${v}`;
const norm = (s: string) => s.toLowerCase().normalize("NFC").slice(0, 200);
const escape = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const has = (input: string, words: string[]) =>
  words.some((w) => new RegExp("(?<![\\p{L}\\p{N}])" + escape(w.toLowerCase()), "u").test(input));
const bot = (text: string, options?: string[]): BotMessage => ({ from: "bot", text, ...(options ? { options } : {}) });

export function startDemo(s: DemoScript): DemoReply {
  return { state: { stage: "start" }, messages: [bot(s.greeting, s.suggestions)] };
}

function matchSlot(s: DemoScript, input: string): string | undefined {
  return s.slots.find((slot) => input.includes(slot.toLowerCase())) ?? s.slots.find((slot) => {
    const hour = slot.match(/(\d{1,2})[:.]\d{2}/)?.[1];
    return hour !== undefined && new RegExp(`(^|\\D)${hour}(\\D|$)`).test(input);
  });
}

const cleanOption = (raw: string) => Array.from(raw.trim().replace(/[<>]/g, "")).slice(0, 40).join("").trim();

export function reply(s: DemoScript, state: DemoState, raw: string): DemoReply {
  const input = norm(raw.trim());
  const options =
    state.stage === "qualify" ? s.qualifier.options : state.stage === "slots" ? s.slots : state.stage === "start" ? s.suggestions : undefined;
  if (input && has(input, s.priceWords)) return { state, messages: [bot(s.price, options)] };
  if (input && has(input, s.hoursWords)) return { state, messages: [bot(s.hours, options)] };
  switch (state.stage) {
    case "booked":
      return { state, messages: [bot(s.afterBooked)] };
    case "start":
      if (!input || !(has(input, s.bookWords) || s.qualifier.options.some((o) => input.includes(o.toLowerCase()))))
        return { state, messages: [bot(s.fallback, s.suggestions)] };
      return { state: { stage: "qualify" }, messages: [bot(s.qualifier.question, s.qualifier.options)] };
    case "qualify": {
      if (!input) return { state, messages: [bot(s.qualifier.question, s.qualifier.options)] };
      const option = s.qualifier.options.find((o) => input.includes(o.toLowerCase())) ?? cleanOption(raw);
      if (!option) return { state, messages: [bot(s.qualifier.question, s.qualifier.options)] };
      return { state: { stage: "slots", option }, messages: [bot(s.slotsIntro, s.slots)] };
    }
    case "slots": {
      const slot = matchSlot(s, input);
      if (!slot) return { state, messages: [bot(s.slotsIntro, s.slots)] };
      const option = state.option ?? "";
      const fill = (t: string) => t.replace("{slot}", () => slot).replace("{option}", () => option);
      return {
        state: { stage: "booked", option, slot },
        messages: [bot(fill(s.confirm))],
        crm: { status: fill(s.crmStatus), service: option, replySeconds: 4 },
      };
    }
  }
}
