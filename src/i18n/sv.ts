import type { Dictionary } from "./index";

export const sv = {
  meta: {
    title: "Haisem Naeem | Webbplatser och AI-automation, Stockholm",
    description:
      "Jag designar och bygger webbplatser, AI-receptionister och automationer som ger Stockholmsföretag fler kunder och sparar timmar varje vecka.",
    hireTitle: "Haisem Naeem | AI-ingenjör, Stockholm",
    hireDescription: "AI/ML-ingenjör i Stockholm: LLM-produkter, RAG, röst-AI och fullstack-leverans.",
  },
  nav: { services: "Tjänster", work: "Projekt", about: "Om mig", hire: "För arbetsgivare", start: "Boka ett gratis samtal", switchTo: "English", menu: "Meny", theme: "Växla mörkt läge" },
  hero: {
    eyebrow: "Haisem Naeem · AI-ingenjör i Stockholm",
    title: "Webbplatser och AI som ger dig fler kunder och mer tid över.", // REVIEW-SV
    sub: "Jag designar och bygger webbplatser, AI-receptionister och automationer för små och medelstora företag, och tar hand om dem när de är i drift.",
    ctaPrimary: "Boka ett gratis samtal",
    ctaSecondary: "Söker ni en AI-ingenjör?",
  },
  proof: {
    quote: "…would not have been able to scale as fast as I have been without the support.",
    quoteBy: "Jake Wims, byråns grundare",
    items: [
      "Röstagenter jag byggt används av fler än 5 företag",
      "Master i AI och språk, Stockholms universitet",
      "Publicerad i ACM Computing Surveys",
    ],
  },
  services: {
    title: "Så hjälper jag ditt företag att växa",
    pricing: "Fast pris, som vi kommer överens om efter ett gratis samtal.",
    exampleNote: "Du tittar på ett exempel.",
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
        title: "Uppföljning av leads på autopilot",
        problem: "Förfrågningar från annonser, formulär och DM blir liggande i timmar, och då har de redan frågat någon annan.",
        get: [
          "Varje ny lead kontaktas inom några minuter via samtal, sms eller mejl",
          "Leads sorteras efter hur redo de är; de som är redo bokas in direkt",
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
  story: {
    title: "Så här ser en automation ut",
    note: "Så fungerar systemet jag byggde åt Jakes byrå.",
    steps: [
      { title: "En lead kommer in", body: "Någon fyller i ditt formulär eller din annons kl. 21.40." },
      { title: "AI:n ringer", body: "Inom några minuter ringer den upp, kan redan svaren och frågar bara det som saknas." },
      { title: "En bokning landar", body: "De som är redo väljer en tid direkt i din kalender." },
      { title: "Ditt CRM uppdateras", body: "Anteckningar, taggar och ett sammanfattande mejl, innan du hunnit äta frukost." }, // REVIEW-SV
    ],
  },
  jake: {
    eyebrow: "Kundcase",
    title: "AI-uppföljning för en växande byrå",
    intro:
      "Jake Wims startade en byrå som säljer AI-uppföljning av leads till mäklarteam och en bolåneförmedlare. Jag byggde hela systemet: röstagenterna, CRM-automationerna och flödena mellan dem.",
    points: [
      "En AI som ringer nya leads från Facebook-annonser, kvalificerar dem enligt regler Jake godkänt och bokar möten",
      "En mall som kan klonas och nu används av fler än fem av hans kunder",
      "Varje samtal sparas i GoHighLevel, med sammanfattningar till både lead och team",
    ],
    confidential: "Resultaten är konfidentiella för Jakes kunder.",
    transcriptLabel: "Läs transkriptionen",
    videoLabel: "Videorekommendation från Jake Wims",
    transcript:
      "Yo, Haisem, just wanted to say thanks for all the fulfillment work you've helped me with over the past few months. Just starting up my agency, I would not have been able to scale as fast as I have been without the support. Everything from the AI callers to the automation work, I really appreciate the attention to detail and how good the support has been, honing in on the specifics of what needs to be done. My clients have been extremely happy with how good the follow-up processes are for them, and I can say the same for my agency as well. So anybody looking for a top-tier GHL developer, I highly recommend Haisem.",
    transcriptNote: "Lätt redigerad från automatiska undertexter. Videon är på engelska.",
  },
  work: {
    title: "Utvalda projekt",
    filters: { all: "Alla", business: "Företagsautomation", products: "AI-produkter", research: "Forskning" },
    view: "Läs caset",
    employerNote: "Byggt på Metaviz AI",
    back: "Alla projekt",
    filterLabel: "Filtrera projekt efter typ",
    problem: "Problemet",
    solution: "Lösningen",
    result: "Resultatet",
    live: "Se live",
    github: "GitHub",
    prev: "Föregående projekt",
    next: "Nästa projekt",
    notFound: "Projektet hittades inte",
    englishOnly: "Det här caset finns bara på engelska.", // REVIEW-SV
  },
  how: {
    title: "Så jobbar vi tillsammans",
    steps: [
      { title: "Gratis samtal, 20 minuter", body: "Du berättar hur verksamheten fungerar. Jag letar efter det som tar mest tid." },
      { title: "Förslag till fast pris", body: "En tydlig plan, ett pris och en tidsplan i skrift, oftast inom två dagar." },
      { title: "Bygge med avstämningar", body: "Ungefär två veckor. Du ser framstegen med några dagars mellanrum och testar själv." },
      { title: "Överlämning och support", body: "Genomgång, dokumentation och en valfri månatlig supportplan." },
    ],
  },
  about: {
    title: "Om mig",
    paragraphs: [
      "Jag heter Haisem. Efter ett år som ingenjör på Metaviz, där jag byggde AI-produkter, flyttade jag från Lahore till Stockholm för att läsa en master i AI och språk vid Stockholms universitet.",
      "Jag bygger helheten: design, webbplats, backend, AI:n och kopplingarna till verktygen du redan använder. Och jag finns kvar efter lanseringen.",
      "Vi kan prata engelska, och jag övar gärna min svenska med dig.",
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
      "AI/ML-ingenjör i Stockholm. Jag bygger LLM-produkter från början till slut: RAG, multiagentsystem, röst-AI och fullstack-appar. Deltid vid sidan av mastern nu, heltid från juni 2028.",
    cv: "Ladda ner CV (PDF)",
    workTitle: "Det här har jag byggt",
    skillsTitle: "Kompetenser",
    credentialsTitle: "Utbildning och forskning",
    stats: { years: "År med AI-utveckling", systems: "AI-system i produktion", publications: "Referentgranskad publikation" },
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
    steps: {
      goal: { q: "Vad vill du helst uppnå just nu?" },
      business: { q: "Om ditt företag", name: "Företagets namn", website: "Webbplats (valfritt)", industry: "Bransch", teamSize: "Antal anställda" },
      time: { q: "Vart tar tiden vägen?", tasks: "Vilka uppgifter tar mest tid?", hours: "Ungefär hur många timmar i veckan, totalt?", enquiries: "Nya förfrågningar per vecka (valfritt)", websiteState: "Din webbplats i dag", websiteNeeds: "Vad saknas?" },
      tools: { q: "Verktyg och kanaler", tools: "Vad använder ni i dag?", channels: "Hur når kunderna er?" },
      plan: { q: "Tid och budget", budget: "Budget (valfritt)", timeline: "När vill du komma igång?", decision: "Vem bestämmer?", sensitive: "Gäller det hälso-, ekonomi- eller id-uppgifter?" },
      contact: { q: "Hur når jag dig?", name: "Ditt namn", email: "Mejl", phone: "Telefon (valfritt)", callLang: "Språk för vårt samtal", notes: "Något mer? (valfritt)" },
    },
    options: {
      goal: { more_customers: "Fler kunder", missed_calls: "Färre missade samtal och förfrågningar", admin_time: "Mindre tid på administration", website: "En ny eller bättre webbplats", unsure: "Vet inte än" },
      industry: { clinic_health: "Klinik eller vård", beauty_wellness: "Skönhet eller friskvård", restaurant_cafe: "Restaurang eller kafé", real_estate: "Fastigheter", trades_construction: "Hantverk eller bygg", retail_ecommerce: "Handel eller e-handel", professional_services: "Konsult- eller tjänsteföretag", education: "Utbildning", fitness: "Träning", other: "Annat" },
      teamSize: { solo: "Bara jag", "2to5": "2–5", "6to20": "6–20", "21to50": "21–50", gt50: "50+" },
      tasks: { calls: "Svara i telefon", booking: "Bokning och ombokning", enquiries: "Svara på förfrågningar", lead_followup: "Följa upp leads", quotes_invoices: "Offerter och fakturor", data_entry: "Flytta data mellan system", reports: "Rapporter", reviews_social: "Recensioner och sociala medier", other: "Något annat" },
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
    sections: [
      { h: "Vem som ansvarar", p: "Haisem Naeem, Stockholm. Kontakt: haisem.work@gmail.com." },
      { h: "Vad jag samlar in och varför", p: "Svaren du lämnar i formuläret, så att jag kan förbereda ett samtal och skicka ett förslag. Rättslig grund: åtgärder på din begäran innan ett eventuellt avtal (GDPR art. 6.1 b)." }, // REVIEW-SV
      { h: "Vem som behandlar uppgifterna", p: "Cloudflare (formulär och skräppostskydd), Supabase (databas, region Stockholm), Resend (aviseringsmejlet till mig) och PostHog EU (anonym statistik över sidvisningar och formulärsteg, utan kakor och utan formulärinnehåll). Alla har personuppgiftsbiträdesavtal." },
      { h: "Hur länge jag sparar dem", p: "12 månader om vi inte jobbar ihop; under avtalet plus bokföringskrav om vi gör det." },
      { h: "Dina rättigheter", p: "Du kan när som helst begära en kopia, rättelse eller radering genom att mejla mig. Du kan också klaga hos Integritetsskyddsmyndigheten (IMY), imy.se." },
      { h: "Kakor", p: "Webbplatsen sparar bara ditt val av språk och tema i din webbläsare. Statistiken körs utan kakor och utan att identifiera dig." },
    ],
  },
  footer: { rights: "Alla rättigheter förbehållna.", privacy: "Integritet" },
} satisfies Dictionary;
