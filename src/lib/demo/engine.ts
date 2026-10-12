import type { DemoScript, DemoState, DemoReply, BotMessage } from "./types";
const norm = (s: string) => s.toLowerCase().normalize("NFC").slice(0, 200);
const has = (input: string, words: string[]) => words.some((w) => input.includes(w));
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

export function reply(s: DemoScript, state: DemoState, raw: string): DemoReply {
  const input = norm(raw.trim());
  if (state.stage === "booked") return { state, messages: [bot(s.afterBooked)] };
  if (input && has(input, s.priceWords)) return { state, messages: [bot(s.price)] };
  if (input && has(input, s.hoursWords)) return { state, messages: [bot(s.hours)] };
  switch (state.stage) {
    case "start":
      if (!input) return { state, messages: [bot(s.fallback, s.suggestions)] };
      return { state: { stage: "qualify" }, messages: [bot(s.qualifier.question, s.qualifier.options)] };
    case "qualify": {
      if (!input) return { state, messages: [bot(s.qualifier.question, s.qualifier.options)] };
      const option = s.qualifier.options.find((o) => input.includes(o.toLowerCase())) ?? raw.trim().slice(0, 40);
      return { state: { stage: "slots", option }, messages: [bot(s.slotsIntro, s.slots)] };
    }
    case "slots": {
      const slot = matchSlot(s, input);
      if (!slot) return { state, messages: [bot(s.slotsIntro, s.slots)] };
      const option = state.option ?? "";
      return {
        state: { stage: "booked", option, slot },
        messages: [bot(s.confirm.replace("{slot}", slot).replace("{option}", option))],
        crm: { status: s.crmStatus.replace("{slot}", slot), service: option, replySeconds: 4 },
      };
    }
  }
}
