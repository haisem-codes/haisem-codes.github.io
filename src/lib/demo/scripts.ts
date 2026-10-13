import type { DemoScript, Lang, Vertical } from "./types";

const BOOK_EN = ["book", "booking", "appointment", "reserve", "reservation", "table", "quote", "visit", "time", "come", "when can you"];
const BOOK_SV = ["boka", "bokning", "tid", "reservera", "bord", "offert", "besök", "komma", "kan ni", "när kan"];
const PRICE = ["price", "pricing", "cost", "how much", "fees", "pris", "kostar", "kostnad", "avgift"];
const HOURS = ["hours", "opening", "opens", "open on", "when do you", "when are you", "closing", "öppet", "öppettider", "öppnar", "stänger", "när har ni", "are you open", "is it open", "open today", "open now", "open late", "är ni öppna", "öppna", "har ni öppet"];
const EN_SLOTS = ["Sat 10:30", "Sat 13:00", "Sat 15:45"];
// REVIEW-SV
const SV_SLOTS = ["lör kl. 10.30", "lör kl. 13.00", "lör kl. 15.45"];

const en = (d: Omit<DemoScript, "bookWords" | "priceWords" | "hoursWords" | "slots" | "afterBooked" | "fallback">): DemoScript => ({
  bookWords: BOOK_EN, priceWords: PRICE, hoursWords: HOURS, slots: EN_SLOTS,
  afterBooked: "You're all set. A confirmation is on its way by SMS. Anything else I can help with?",
  fallback: "Sorry, I didn't catch that. I can help you book a time, or answer questions about prices and opening hours.",
  ...d,
});

// REVIEW-SV
const sv = (d: Omit<DemoScript, "bookWords" | "priceWords" | "hoursWords" | "slots" | "afterBooked" | "fallback">): DemoScript => ({
  bookWords: BOOK_SV, priceWords: PRICE, hoursWords: HOURS, slots: SV_SLOTS,
  afterBooked: "Då är det klart! Du får en bekräftelse via sms. Är det något mer jag kan hjälpa dig med?",
  fallback: "Förlåt, jag hängde inte med. Jag kan hjälpa dig att boka tid eller svara på frågor om pris och öppettider.",
  ...d,
});

export const SCRIPTS: Record<Lang, Record<Vertical, DemoScript>> = {
  en: {
    salon: en({
      business: "Salong Åsa · demo",
      greeting: "Hi, and welcome to Salong Åsa (a fictional demo). I'm the AI receptionist. How can I help?",
      suggestions: ["Book a haircut", "How much is a cut?", "When are you open?"],
      price: "Prices depend on hair length and treatment. The salon confirms the exact price in your SMS.",
      hours: "We're open Tuesday to Saturday. Weekdays in the afternoon and evening, Saturdays during the day.",
      qualifier: { question: "Happy to help! What would you like to book?", options: ["Haircut", "Colour", "Styling"] },
      slotsIntro: "Here are the next free times on Saturday. Which suits you?",
      confirm: "Booked! {option} on {slot}. We'll text you a reminder the day before.",
      crmStatus: "Booked for {slot}",
    }),
    clinic: en({
      business: "Klinik Söder · demo",
      greeting: "Hello, and welcome to Klinik Söder (a fictional demo). I'm the AI receptionist. This is a demo and not for urgent matters. How can I help?",
      suggestions: ["Book an appointment", "What does a visit cost?", "What are your hours?"],
      price: "Fees depend on the type of visit. The clinic confirms the price when you get your booking confirmation.",
      hours: "The clinic is open on weekdays and on selected Saturdays. Exact times are shown when you book.",
      qualifier: { question: "Of course. What kind of visit do you need?", options: ["Check-up", "Follow-up", "New problem"] },
      slotsIntro: "These times are free on Saturday. Which one works for you?",
      confirm: "All booked: {option} on {slot}. Please arrive five minutes early.",
      crmStatus: "Appointment booked for {slot}",
    }),
    trades: en({
      business: "Bygg & Kök Nord · demo",
      greeting: "Hi, and welcome to Bygg & Kök Nord (a fictional demo). I'm the AI receptionist. What can I do for you?",
      suggestions: ["Book a site visit", "How much does a kitchen cost?", "When can you come?"],
      price: "Every job is different, so we quote after a short site visit. No price is promised before we've seen the space.",
      hours: "We work on site on weekdays. Site visits can also be booked on Saturdays.",
      qualifier: { question: "Sure. What kind of job is it?", options: ["Kitchen", "Bathroom", "Other renovation"] },
      slotsIntro: "We can visit on Saturday at these times. What suits you?",
      confirm: "Site visit booked: {option} on {slot}. A project manager will meet you there.",
      crmStatus: "Site visit booked for {slot}",
    }),
    restaurant: en({
      business: "Bistro Hornsgatan · demo",
      greeting: "Hi, and welcome to Bistro Hornsgatan (a fictional demo). I'm the AI receptionist. How can I help?",
      suggestions: ["Book a table", "What does dinner cost?", "When do you open?"],
      price: "Our menu changes with the season. Prices are on the menu, and the booking confirmation links to it.",
      hours: "We're open for lunch on weekdays and for dinner Tuesday to Saturday.",
      qualifier: { question: "Lovely. How many guests?", options: ["2 people", "4 people", "6 or more"] },
      slotsIntro: "These tables are free on Saturday. Which time works?",
      confirm: "Table booked for {option} on {slot}. We look forward to seeing you!",
      crmStatus: "Table booked for {slot}",
    }),
  },
  sv: {
    // REVIEW-SV
    salon: sv({
      business: "Salong Åsa · demo",
      greeting: "Hej och välkommen till Salong Åsa (en fiktiv demo). Jag är AI-receptionisten. Hur kan jag hjälpa dig?",
      suggestions: ["Boka klippning", "Vad kostar en klippning?", "När har ni öppet?"],
      price: "Priset beror på hårlängd och behandling. Salongen bekräftar det exakta priset i ditt sms.",
      hours: "Vi har öppet tisdag till lördag. Vardagar på eftermiddagen och kvällen, lördagar under dagen.",
      qualifier: { question: "Gärna! Vad vill du boka?", options: ["Klippning", "Färgning", "Styling"] },
      slotsIntro: "Här är de närmaste lediga tiderna på lördag. Vilken passar dig?",
      confirm: "Klart! {option} på {slot}. Du får en påminnelse via sms dagen innan.",
      crmStatus: "Bokad till {slot}",
    }),
    // REVIEW-SV
    clinic: sv({
      business: "Klinik Söder · demo",
      greeting: "Hej och välkommen till Klinik Söder (en fiktiv demo). Jag är AI-receptionisten. Det här är en demo och inte för akuta ärenden. Hur kan jag hjälpa dig?",
      suggestions: ["Boka tid", "Vad kostar ett besök?", "Vad har ni för öppettider?"],
      price: "Avgiften beror på typ av besök. Kliniken bekräftar priset i din bokningsbekräftelse.",
      hours: "Kliniken har öppet vardagar och vissa lördagar. Exakta tider visas när du bokar.",
      qualifier: { question: "Självklart. Vilken typ av besök behöver du?", options: ["Kontroll", "Återbesök", "Nytt besvär"] },
      slotsIntro: "De här tiderna är lediga på lördag. Vilken passar dig?",
      confirm: "Klart! {option} på {slot}. Kom gärna fem minuter innan.",
      crmStatus: "Tid bokad till {slot}",
    }),
    // REVIEW-SV
    trades: sv({
      business: "Bygg & Kök Nord · demo",
      greeting: "Hej och välkommen till Bygg & Kök Nord (en fiktiv demo). Jag är AI-receptionisten. Vad kan jag hjälpa dig med?",
      suggestions: ["Boka platsbesök", "Vad kostar ett kök?", "När kan ni komma?"],
      price: "Varje jobb är olika, så vi lämnar offert efter ett kort platsbesök. Vi lovar inget pris innan vi har sett utrymmet.",
      hours: "Vi jobbar på plats vardagar. Platsbesök går också att boka på lördagar.",
      qualifier: { question: "Absolut. Vad är det för jobb?", options: ["Kök", "Badrum", "Annan renovering"] },
      slotsIntro: "Vi kan komma förbi på lördag vid de här tiderna. Vad passar dig?",
      confirm: "Platsbesök bokat: {option} på {slot}. En projektledare möter dig där.",
      crmStatus: "Platsbesök bokat till {slot}",
    }),
    // REVIEW-SV
    restaurant: sv({
      business: "Bistro Hornsgatan · demo",
      greeting: "Hej och välkommen till Bistro Hornsgatan (en fiktiv demo). Jag är AI-receptionisten. Hur kan jag hjälpa dig?",
      suggestions: ["Boka bord", "Vad kostar middagen?", "När öppnar ni?"],
      price: "Vår meny ändras med säsongen. Priserna står på menyn, och bokningsbekräftelsen länkar dit.",
      hours: "Vi har öppet för lunch på vardagar och middag tisdag till lördag.",
      qualifier: { question: "Härligt! Hur många är ni?", options: ["2 personer", "4 personer", "6 eller fler"] },
      slotsIntro: "De här borden är lediga på lördag. Vilken tid passar dig?",
      confirm: "Bord bokat för {option} på {slot}. Vi ser fram emot att träffa dig!",
      crmStatus: "Bord bokat till {slot}",
    }),
  },
};
