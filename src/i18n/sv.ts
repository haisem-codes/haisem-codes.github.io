import type { Dictionary } from "./index";
import { pageError } from "./page-error";

export const sv = {
  meta: {
    title: "Haisem N. | Webbplatser och AI-automation, Stockholm",
    description:
      "Jag designar och bygger webbplatser, AI-receptionister och automationer som ger Stockholmsföretag fler kunder och sparar timmar varje vecka.",
    hireTitle: "Haisem N. | AI-ingenjör, Stockholm",
    hireDescription: "AI/ML-ingenjör i Stockholm: LLM-produkter, RAG, röst-AI och fullstack-leverans.",
  },
  nav: {
    services: "Tjänster", work: "Projekt", about: "Om mig", hire: "För arbetsgivare", start: "Boka samtal", switchTo: "English", menu: "Meny", // REVIEW-SV
    nightMode: "Mörkt läge", // REVIEW-SV
    pullHint: "dra i mig", // REVIEW-SV
  },
  hero: {
    eyebrow: "Stockholm",
    meta: ["Haisem N., AI-ingenjör", "Webbplatser · Röst-AI · Automation"], // REVIEW-SV
    titleLead: "AI som jobbar", // REVIEW-SV
    titleAccent: "när du inte gör det.", // REVIEW-SV
    sub: "Jag designar och bygger webbplatser, AI-receptionister och automationer för företag i Stockholm, och tar hand om dem när de är i drift.", // REVIEW-SV
    ctaPrimary: "Boka ett gratis samtal",
    ctaSecondary: "Testa AI-receptionisten ↓", // REVIEW-SV
  },
  demoPhone: {
    business: "Salong Åsa",
    demoLabel: "demo",
    liveLabel: "Live",
    ariaLabel: "Demokonversation: en AI-receptionist bokar en klippning åt en påhittad salong.", // REVIEW-SV
    messages: {
      ask: "Hej! Kan jag boka en klippning på lördag?", // REVIEW-SV
      offer: "Absolut. På lördag finns de här tiderna:", // REVIEW-SV
      pick: "13:00 tack", // REVIEW-SV
      booked: "Bokat ✓ Du får en sms-påminnelse på fredag.", // REVIEW-SV
    },
    slots: ["10:30", "13:00", "15:45"],
    crm: {
      title: "CRM · ny förfrågan", // REVIEW-SV
      status: "Status",
      statusValue: "Bokad · lör 13:00", // REVIEW-SV
      reply: "Svarstid", // REVIEW-SV
      replyValue: "4 sekunder",
      summary: "Sammanfattning",
      summaryValue: "Mejlad till Åsa", // REVIEW-SV
    },
  },
  proof: {
    label: "I korthet", // REVIEW-SV
    facts: [
      { value: "5+", label: "företag som jag byggt röstagenter för på Metaviz" }, // REVIEW-SV
      { value: "MSc", label: "AI och språk vid Stockholms universitet" }, // REVIEW-SV
      { value: "ACM", label: "Referentgranskad översikt i ACM Computing Surveys" }, // REVIEW-SV
    ],
  },
  services: {
    index: "02",
    eyebrow: "Tjänster",
    title: "Så hjälper jag ditt företag att växa",
    pricing: "Fast pris, som vi kommer överens om efter ett gratis samtal.",
    exampleNote: "Du tittar på ett exempel.",
    teaser: "Se före och efter", // REVIEW-SV
    teaserLabel: "Före / efter", // REVIEW-SV
    items: [
      {
        id: "website",
        title: "En webbplats som ger kunder",
        problem: "Sidan ser gammal ut, är krånglig i mobilen eller så bokar ingen via den.",
        get: [
          "Snabb, modern design på svenska och engelska",
          "Onlinebokning och kontaktformulär som hamnar i din inkorg eller ditt CRM",
          "Byggd för att synas på Google",
        ],
        time: "Oftast 2–3 veckor",
      },
      {
        id: "receptionist",
        title: "En AI-receptionist som aldrig missar ett samtal",
        problem: "Samtal blir obesvarade när du är upptagen med en kund, och ett missat samtal är ofta en missad bokning.",
        get: [
          "Svarar på samtal och vanliga frågor dygnet runt",
          "Bokar, flyttar och bekräftar tider i din kalender",
          "Skickar en kort sammanfattning av varje samtal",
        ],
        time: "Oftast 2 veckor",
      },
      {
        id: "followup",
        title: "Uppföljning av förfrågningar på autopilot", // REVIEW-SV
        problem: "Förfrågningar från annonser, formulär och DM blir liggande i timmar, och då har de redan frågat någon annan.",
        get: [
          "Varje ny förfrågan besvaras inom några minuter via samtal, sms eller mejl", // REVIEW-SV
          "Förfrågningar sorteras efter hur redo de är; de som är redo bokas in direkt", // REVIEW-SV
          "Allt loggas i ditt CRM",
        ],
        time: "Oftast 2–3 veckor",
      },
      {
        id: "admin",
        title: "Mindre administration, mindre klipp och klistra",
        problem: "Varje vecka går timmar till offerter, fakturor, inmatning och samma frågor om och om igen.",
        get: [
          "Mejl och dokument läses och sorteras automatiskt",
          "Data flyttas mellan dina verktyg, till exempel Fortnox, Google och Excel, utan att skrivas om",
          "En AI-assistent som svarar utifrån dina egna dokument",
        ],
        time: "Avgränsas i ett gratis samtal",
      },
    ],
  },
  controlRoom: {
    index: "03",
    eyebrow: "Kontrollrummet", // REVIEW-SV
    title: "21.40. En förfrågan kommer in.", // REVIEW-SV
    accent: "Du sover redan.", // REVIEW-SV
    tryTitle: "Testa själv nu", // REVIEW-SV
    kicker: "Välj ett företag och skriv det en kund skulle skicka sent på kvällen. Receptionisten svarar, bokar en tid och loggar förfrågan.", // REVIEW-SV
    verticalsLabel: "Demoföretag", // REVIEW-SV
    verticals: { salon: "Salong", clinic: "Klinik", trades: "Hantverkare", restaurant: "Restaurang" }, // REVIEW-SV
    demoBadge: "Skriptad demo", // REVIEW-SV
    tonight: "I kväll · 21.40", // REVIEW-SV
    chatLabel: "Demochatt med en AI-receptionist", // REVIEW-SV
    you: "Du",
    bot: "Receptionisten", // REVIEW-SV
    suggestionsLabel: "Förslag på meddelanden", // REVIEW-SV
    placeholder: "Skriv som en kund …", // REVIEW-SV
    inputLabel: "Ditt meddelande", // REVIEW-SV
    send: "Skicka",
    restart: "Börja om",
    panelTitle: "Bakom kulisserna", // REVIEW-SV
    waiting: "Väntar på en bokning", // REVIEW-SV
    waitingHint: "Boka en tid i chatten och se vad som händer medan du sover.", // REVIEW-SV
    panelJump: "Se vad som hände bakom kulisserna ↓", // REVIEW-SV
    crm: { title: "CRM · ny förfrågan", status: "Status", service: "Tjänst", reply: "Svarstid i chatten", replyValue: "{n} s", source: "Källa", sourceValue: "Chatt på webbplatsen" }, // REVIEW-SV
    timeline: { sms: "Sms skickat", calendar: "Kalendern uppdaterad", summary: "Sammanfattning mejlad" }, // REVIEW-SV
    timelineAt: { sms: "0:04", calendar: "0:06", summary: "0:09" },
    pendingTime: "–:––",
    pendingValue: "–",
    clock: "21.40", // REVIEW-SV
    cta: "Vill du ha det här i ditt företag?", // REVIEW-SV
    ctaNote: "Svara på några frågor så visar jag hur det skulle fungera för dig.", // REVIEW-SV
  },
  story: {
    note: "Samma flöde som jag byggde på Metaviz åt en byrås amerikanska kunder, här med en påhittad salong.", // REVIEW-SV
    steps: [
      { title: "En förfrågan kommer in", body: "Någon fyller i ditt formulär eller din annons kl. 21.40." }, // REVIEW-SV
      { title: "AI:n ringer", body: "Inom några minuter ringer den upp, vet redan vad de svarat och frågar bara det som saknas." }, // REVIEW-SV
      { title: "En bokning landar", body: "De som är redo väljer en tid direkt i din kalender." },
      { title: "Ditt CRM uppdateras", body: "Anteckningar, taggar och ett sammanfattande mejl, innan du hunnit äta frukost." }, // REVIEW-SV
    ],
    clocks: ["21.40.00", "21.41.30", "21.43.20", "21.44.00"], // REVIEW-SV
    stepOf: "{n} av {total}", // REVIEW-SV
    ui: {
      business: "Salong Åsa",
      demo: "Demo",
      form: { url: "salong-asa.example/boka", title: "Boka en tid", name: "Namn", phone: "Telefon", message: "Meddelande", nameValue: "Sara Lind", phoneValue: "070-123 45 67", messageValue: "Hej! Har ni en tid för färgning den här veckan?", send: "Skicka", sent: "Skickat" }, // REVIEW-SV
      call: { calling: "Ringer…", connected: "Ansluten", caller: "AI-receptionist", line: "Hej Sara, det är Salong Åsa. Färgning den här veckan, var det? Torsdag kl. 10 är ledig." }, // REVIEW-SV
      calendar: { title: "Den här veckan", days: ["Mån", "Tis", "Ons", "Tor", "Fre"], busy: "Bokad", service: "Färgning", client: "Sara L.", slot: "Tor 10.00", confirmed: "Bekräftelse skickad via sms" }, // REVIEW-SV
      crm: { title: "CRM · förfrågningar", name: "Sara Lind", status: "Bokad", source: "Webbformulär", others: [["Jonas B.", "Kontaktad"], ["Mira K.", "Uppföljning"]], tags: ["färgning", "ny förfrågan"], summary: "Sammanfattning mejlad" }, // REVIEW-SV
    },
  },
  jake: {
    index: "01",
    eyebrow: "Kundberättelser", // REVIEW-SV
    title: "AI-uppföljning för en växande byrå",
    intro:
      "Jake Wims startade en byrå som säljer AI-uppföljning av förfrågningar till mäklarteam och en bolåneförmedlare. På Metaviz AI byggde jag hela systemet åt honom: röstagenterna, CRM-automationerna och flödena mellan dem.", // REVIEW-SV
    points: [
      "En AI som ringer upp nya förfrågningar från Facebook-annonser, kvalificerar dem enligt regler Jake godkänt och bokar möten", // REVIEW-SV
      "En mall som kan klonas, byggd för hans kunder", // REVIEW-SV
      "Varje samtal sparas i GoHighLevel, med sammanfattningar till både den som hört av sig och teamet", // REVIEW-SV
    ],
    confidential: "Resultaten är konfidentiella för Jakes kunder.",
    transcriptLabel: "Läs transkriptionen",
    videoLabel: "Videorekommendation från Jake Wims",
    play: "Spela upp Jakes videorekommendation, 52 sekunder på engelska", // REVIEW-SV
    duration: "0:52",
    posterLabel: "Kundvideo · på engelska", // REVIEW-SV
    watch: "Spela", // REVIEW-SV
    quote: "My clients have been extremely happy with how good the follow-up process is for them.",
    quoteBy: "Jake Wims, byråns grundare",
    builtAt: "Systemet byggdes på Metaviz AI", // REVIEW-SV
    transcript:
      "Yo, Haisem, just wanted to say thanks for all the fulfillment work you've helped me with over the past few months. Just starting up my agency, I would not have been able to scale as fast as I have been without the support. Everything from the AI callers to the automation work, I really appreciate the attention to detail and how good the support has been, honing in on the specifics of what needs to be done. My clients have been extremely happy with how good the follow-up process is for them, and I can say the same for my agency as well. So anybody looking for a top-tier GHL developer, I highly recommend Haisem.",
    transcriptNote: "Lätt redigerad från automatiska undertexter. Videon är på engelska.",
  },
  derin: {
    name: "Derin",
    role: "Driver Deepsea Media, en marknadsföringsbyrå", // REVIEW-SV
    builtAt: "Projektet byggdes på Metaviz AI", // REVIEW-SV
    quote: "He took the project end-to-end and treated it like his own.",
    videoLabel: "Videorekommendation från Derin", // REVIEW-SV
    play: "Spela upp Derins videorekommendation, 48 sekunder på engelska", // REVIEW-SV
    duration: "0:48",
    posterLabel: "Kundvideo · på engelska", // REVIEW-SV
    watch: "Spela", // REVIEW-SV
    captionsLabel: "Engelska", // REVIEW-SV
    transcriptLabel: "Läs transkriptionen",
    transcript:
      "Hi, I'm Derin and I run Deepsea Media, a marketing agency. I work with Haisem, and he's one of the rare people who gets both sides, the technology and the business. What stood out to us was his ownership. He took the project end-to-end and treated it like his own. When something wasn't right, he said so early, and he always came up with a solution. The professional, the reliable, the easy-to-work-with people: that's Haisem. He always explains things in plain language, so I always know where I stand, and he is genuinely ahead on AI. He always comes up with the latest technology and implements it in your business. He doesn't chase trends; he thinks about what will actually get a business noticed and growing, then builds it properly. If you want to use AI to grow your business, talk to Haisem.",
    transcriptNote: "Lätt redigerad för läsbarhetens skull. Videon är på engelska.", // REVIEW-SV
  },
  work: {
    index: "04",
    eyebrow: "Utvalda projekt",
    title: "Riktiga system i produktion.", // REVIEW-SV
    more: "Fler projekt",
    categories: { business: "Företagsautomation", products: "AI-produkter", research: "Forskning" },
    view: "Läs caset",
    employerNote: "Byggt på Metaviz\u00A0AI",
    back: "Alla projekt",
    highlights: {
      "ai-compliance-platform": { value: "~80\u00A0%", label: "mindre manuell granskningstid per ritning, på Metaviz" }, // REVIEW-SV
      "voice-agents-suite": { value: "5+", label: "företag som röstagenterna byggts för, på Metaviz" }, // REVIEW-SV
      postura: { value: "Offline", label: "hållningsanalysen körs helt i telefonen" }, // REVIEW-SV
    },
    showMore: "Visa {n} projekt till", // REVIEW-SV
    fewer: "Visa färre", // REVIEW-SV
    problem: "Problemet",
    solution: "Lösningen",
    result: "Resultatet",
    live: "Se livedemo", // REVIEW-SV
    github: "GitHub",
    prev: "Föregående projekt",
    next: "Nästa projekt",
    notFound: "Projektet hittades inte",
    englishOnly: "Det här caset finns bara på engelska.", // REVIEW-SV
  },
  beforeAfter: {
    index: "05",
    eyebrow: "Före och efter", // REVIEW-SV
    title: "Samma salong. En webbplats som tar emot bokningar.", // REVIEW-SV
    kicker: "En typisk webbplats för ett lokalt företag bredvid en ny design som tar emot bokningar och svarar på frågor.", // REVIEW-SV
    concept: "Koncept", // REVIEW-SV
    conceptNote: "Konceptdesign av en typisk lokal webbplats", // REVIEW-SV
    before: "Före",
    after: "Efter",
    beforeAlt: "Föråldrad salongswebbplats med liten text, röriga spalter, en popup och ingen bokning på nätet", // REVIEW-SV
    afterAlt: "Ny salongswebbplats med tydlig rubrik, bokning på nätet och en chattassistent", // REVIEW-SV
    sliderLabel: "Jämför före och efter", // REVIEW-SV
    valueText: "{before}\u00A0% före, {after}\u00A0% efter", // REVIEW-SV
    hint: "Dra, eller använd piltangenterna", // REVIEW-SV
    hintTouch: "Dra i reglaget", // REVIEW-SV
    scoresLabel: "Exempelpoäng för fart och kvalitet", // REVIEW-SV
    scoresNote: "Illustrativa siffror för en konceptdesign, inte en mätning. Mätarna följer jämförelsen.", // REVIEW-SV
    from: "från",
    dials: { performance: "Prestanda", accessibility: "Tillgänglighet", seo: "SEO" },
    compareLabel: "Visa webbplatsen före eller efter", // REVIEW-SV
  },
  how: {
    index: "06",
    eyebrow: "Arbetsgång", // REVIEW-SV
    title: "Så jobbar vi tillsammans",
    steps: [
      { when: "Start", title: "Gratis samtal, 20 minuter", body: "Du berättar hur verksamheten fungerar. Jag letar efter det som tar mest tid." },
      { when: "Inom 2 dagar", title: "Förslag till fast pris", body: "En tydlig plan, ett pris och en tidsplan i skrift." },
      { when: "Cirka 2 veckor", title: "Bygge med avstämningar", body: "Du ser framstegen med några dagars mellanrum och testar själv." },
      { when: "Efter lansering", title: "Överlämning och support", body: "Genomgång, dokumentation och en valfri månatlig supportplan." },
    ],
  },
  about: {
    index: "07",
    eyebrow: "Om mig",
    title: "Från Lahore till Stockholm.", // REVIEW-SV
    portraitAlt: "Haisem N.",
    route: { from: "Lahore", to: "Stockholm" },
    paragraphs: [
      "Jag heter Haisem. Jag läste datavetenskap vid FAST-NUCES i Lahore och jobbade sedan ett år som AI-ingenjör på Metaviz, där jag byggde AI-produkter och röstagenter för riktiga företag. Nu bor jag i Stockholm och läser en master i AI och språk vid Stockholms universitet, och jag är medförfattare till en översiktsartikel i ACM Computing Surveys.", // REVIEW-SV
      "Jag bygger helheten, från designen till AI:n och verktygen du redan använder, och jag finns kvar efter lanseringen. Vi kan prata engelska. Min svenska är på nybörjarnivå, och jag övar gärna med dig.", // REVIEW-SV
    ],
    facts: [
      { years: "2021–25", what: "Kandidat i datavetenskap", where: "FAST-NUCES, Lahore" }, // REVIEW-SV
      { years: "2025–26", what: "AI-ingenjör", where: "Metaviz, Lahore" }, // REVIEW-SV
      { years: "2026–", what: "Master i AI och språk", where: "Stockholms universitet" }, // REVIEW-SV
      { years: "2026", what: "Medförfattare, översikt", where: "ACM Computing Surveys" }, // REVIEW-SV
      { years: "Nu", what: "Svenska", where: "Nybörjare, lär mig" }, // REVIEW-SV
    ],
  },
  cta: {
    title: "Berätta om ditt företag",
    sub: "Sex korta frågor, ungefär två minuter. Jag svarar inom 24 timmar.",
    button: "Börja",
    orEmail: "Eller mejla",
  },
  hire: {
    title: "För team som söker en AI-ingenjör",
    intro:
      "AI/ML-ingenjör i Stockholm. Jag bygger LLM-produkter från början till slut: RAG, multiagentsystem, röst-AI och fullstack-appar. Deltid vid sidan av mastern nu, heltid efter två terminer (från sommaren 2027).", // REVIEW-SV
    cv: "Ladda ner CV (PDF)",
    workTitle: "Det här har jag byggt",
    skillsTitle: "Kompetenser",
    skillsEyebrow: "Kompetenser", // REVIEW-SV
    credentialsTitle: "Utbildning och forskning",
    credentialsEyebrow: "Bakgrund", // REVIEW-SV
    stats: { years: "År med AI-utveckling", systems: "Levererade AI-system", publications: "Referentgranskad publikation" }, // REVIEW-SV
  },
  intake: {
    title: "Få din automationsplan",
    sub: "Sex korta steg, ungefär två minuter. Jag läser alla svar innan vi pratar.",
    step: "Steg {n} av {total}",
    next: "Nästa",
    back: "Tillbaka",
    submit: "Skicka",
    sending: "Skickar…",
    required: "Svara gärna på den här.",
    invalidEmail: "Mejladressen ser inte riktigt rätt ut.",
    invalidWebsite: "Webbadressen ser inte riktigt rätt ut.",
    whyBudget: "Varför jag frågar: så att mitt förslag passar. Lämna tomt om du är osäker.",
    whyPhone: "Bara om du hellre vill att jag ringer.",
    privacy: "Används bara för att förbereda vårt samtal. Raderas efter 12 månader om vi inte jobbar ihop.",
    privacyLink: "Integritetspolicy",
    successTitle: "Tack, jag har fått det.",
    successBody: "Jag svarar inom 24 timmar med några förslag på tider för ett samtal.",
    error: "Något gick fel. Mejla mig gärna i stället:",
    offlineTitle: "Det går inte att skicka direkt härifrån än", // REVIEW-SV
    offlineBody: "Tryck på knappen för att skicka dina svar via mejl. Din egen mejlapp öppnas med allt ifyllt.", // REVIEW-SV
    offlineButton: "Skicka via mejl", // REVIEW-SV
    steps: {
      goal: { q: "Vad vill du helst uppnå just nu?" },
      business: { q: "Om ditt företag", businessName: "Företagets namn", website: "Webbplats (valfritt)", industry: "Bransch", teamSize: "Antal anställda" },
      time: { q: "Vart tar tiden vägen?", tasks: "Vilka uppgifter tar mest tid?", hours: "Ungefär hur många timmar i veckan, totalt?", enquiries: "Nya förfrågningar per vecka (valfritt)", websiteState: "Din webbplats i dag", websiteNeeds: "Vad saknas?" },
      tools: { q: "Verktyg och kanaler", tools: "Vad använder ni i dag?", channels: "Hur når kunderna er?" },
      plan: { q: "Tid och budget", budget: "Budget (valfritt)", timeline: "När vill du komma igång?", decision: "Vem bestämmer?", sensitive: "Gäller det hälso-, ekonomi- eller id-uppgifter?" },
      contact: { q: "Hur når jag dig?", name: "Ditt namn", email: "Mejl", phone: "Telefon (valfritt)", callLang: "Språk för vårt samtal", notes: "Något mer? (valfritt)" },
    },
    options: {
      goal: { more_customers: "Fler kunder", missed_calls: "Färre missade samtal och förfrågningar", admin_time: "Mindre tid på administration", website: "En ny eller bättre webbplats", unsure: "Vet inte än" },
      industry: { clinic_health: "Klinik eller vård", beauty_wellness: "Skönhet eller friskvård", restaurant_cafe: "Restaurang eller kafé", real_estate: "Fastigheter", trades_construction: "Hantverk eller bygg", retail_ecommerce: "Handel eller e-handel", professional_services: "Konsult- eller tjänsteföretag", education: "Utbildning", fitness: "Träning", other: "Annat" },
      teamSize: { solo: "Bara jag", "2to5": "2–5", "6to20": "6–20", "21to50": "21–50", gt50: "50+" },
      tasks: { calls: "Svara i telefon", booking: "Bokning och ombokning", enquiries: "Svara på förfrågningar", lead_followup: "Följa upp förfrågningar", quotes_invoices: "Offerter och fakturor", data_entry: "Flytta data mellan system", reports: "Rapporter", reviews_social: "Recensioner och sociala medier", other: "Något annat" }, // REVIEW-SV
      hours: { lt2: "Under 2", "2to5": "2–5", "5to10": "5–10", "10to20": "10–20", gt20: "20+" },
      enquiries: { lt10: "Under 10", "10to50": "10–50", "50to200": "50–200", gt200: "200+" },
      websiteState: { none: "Har ingen", outdated: "Gammal", not_converting: "Ser bra ut men ger få bokningar", ok: "Den fungerar" },
      websiteNeeds: { booking: "Onlinebokning", bilingual: "Svenska och engelska", seo: "Synas på Google", shop: "Webbshop", forms: "Kontaktformulär", refresh: "Ny design" },
      tools: { google: "Google Workspace", microsoft: "Microsoft 365", fortnox: "Fortnox", visma: "Visma", bokadirekt: "Bokadirekt", crm: "Ett CRM", spreadsheets: "Excel eller Sheets", whatsapp: "WhatsApp", wix_wordpress: "Wix, WordPress eller liknande", paper: "Mest papper", other: "Annat" },
      channels: { phone: "Telefon", web_form: "Formulär på webben", email: "Mejl", social_dm: "Instagram eller Facebook", walk_in: "De kommer förbi", booking_platform: "Bokningsplattform" },
      budget: { lt10k: "Under 10 000 kr", "10to25k": "10 000–25 000 kr", "25to50k": "25 000–50 000 kr", gt50k: "50 000 kr+", unsure: "Vet inte" },
      timeline: { asap: "Så snart som möjligt", "1m": "Inom en månad", "1to3m": "Om 1–3 månader", exploring: "Kollar bara" },
      decision: { me: "Jag", shared: "Jag och en kollega", other: "Någon annan" },
      sensitive: { yes: "Ja", no: "Nej", unsure: "Vet inte" },
      callLang: { en: "English", sv: "Svenska" },
    },
  },
  privacy: {
    title: "Integritetspolicy",
    updated: "Uppdaterad 8 oktober 2026",
    description: "Hur Haisem N. hanterar svaren du skickar via formuläret: syfte, personuppgiftsbiträden, lagringstid och dina rättigheter enligt GDPR.", // REVIEW-SV
    sections: [
      { h: "Vem som ansvarar", p: "Haisem N., Stockholm. Kontakt: haisem.work@gmail.com." },
      { h: "Vad jag samlar in och varför", p: "Svaren du lämnar i formuläret, så att jag kan förbereda ett samtal och skicka ett förslag. Rättslig grund: åtgärder på din begäran innan ett eventuellt avtal (GDPR art. 6.1 b)." }, // REVIEW-SV
      { h: "Vem som behandlar uppgifterna", p: "Cloudflare (formulär och skräppostskydd), Supabase (databas, region Stockholm), Resend (aviseringsmejlet till mig) och PostHog EU (anonym statistik över sidvisningar och formulärsteg, utan kakor och utan formulärinnehåll). Alla har personuppgiftsbiträdesavtal. Supabase och PostHog lagrar uppgifterna inom EU; Cloudflare och Resend kan behandla dem utanför EU, med stöd av sina personuppgiftsbiträdesavtal och EU:s standardavtalsklausuler." }, // REVIEW-SV
      { h: "Hur länge jag sparar dem", p: "12 månader om vi inte jobbar ihop; under avtalet plus bokföringskrav om vi gör det." },
      { h: "Dina rättigheter", p: "Du kan när som helst begära en kopia, rättelse eller radering genom att mejla mig. Du kan också klaga hos Integritetsskyddsmyndigheten (IMY), imy.se." },
      { h: "Kakor och lagring i webbläsaren", p: "Webbplatsen sparar ditt val av språk och tema i din webbläsare. Medan du fyller i formuläret sparas dina svar i den här webbläsarfliken (sessionStorage) tills du skickar formuläret eller stänger fliken. Statistiken körs utan kakor och utan att identifiera dig." }, // REVIEW-SV
    ],
  },
  pageError: pageError.sv,
  footer: { rights: "Alla rättigheter förbehållna.", privacy: "Integritet" },
  cursor: { view: "Visa", try: "Testa" }, // REVIEW-SV
  marquee: { lead: "Låt oss bygga", em: "ditt", label: "Låt oss bygga ditt" }, // REVIEW-SV
} satisfies Dictionary;
