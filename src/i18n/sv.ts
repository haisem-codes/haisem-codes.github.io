import type { Dictionary } from "./index";
import { pageError } from "./page-error";
import { qualifyExcerpt } from "./hire-code";

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
    exampleNote: "Den här sajten är ett exempel", // REVIEW-SV
    leadWord: "Webb", // REVIEW-SV
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
      { title: "En förfrågan kommer in", body: "Någon fyller i ditt formulär eller din annons kl.\u00A021.40." }, // REVIEW-SV
      { title: "AI:n ringer", body: "Inom några minuter ringer den upp, vet redan vad de svarat och frågar bara det som saknas." }, // REVIEW-SV
      { title: "En bokning landar", body: "De som är redo väljer en tid direkt i din kalender." },
      { title: "Ditt CRM uppdateras", body: "Anteckningar, taggar och ett sammanfattande mejl, innan du hunnit äta frukost." }, // REVIEW-SV
    ],
    clocks: ["21.40.00", "21.41.30", "21.43.20", "21.44.00"], // REVIEW-SV
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
    captionsLabel: "Engelska", // REVIEW-SV
    quote: "My clients have been extremely happy with how good the follow-up process is for them.",
    quoteBy: "Jake Wims, byråns grundare",
    builtAt: "Systemet byggdes på Metaviz AI", // REVIEW-SV
    transcript:
      "Yo Haisem, just wanted to say thanks for all the fulfillment work you've helped me with over the past few months, just starting up my agency. Would not have been able to scale as fast as I have been without the support. Yeah, everything from the AI callers to the automation work. Really appreciate just how attention to detail you've been, and how good support has been as to, like, absolutely just honing in on the specifics of what needs to be done. My clients have been extremely happy with how good the follow-up process is for them. And I can say the same for my agency as well. So yeah, anybody looking for a top-tier HighLevel developer, highly recommend Haisem.",
    transcriptNote: "Transkription, ordagrant. Videon är på engelska.", // REVIEW-SV
  },
  derin: {
    name: "Derin",
    role: "Medgrundare", // REVIEW-SV
    company: "Deepsea Media",
    newTab: "(öppnas i en ny flik)", // REVIEW-SV
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
      "Hi, I'm Derin and I run Deepsea Media, a marketing agency. I work with Haisem and he's one of the rare people who gets both sides, the technology and the business. What stood out to us was his ownership. He took the project end-to-end and treated it like his own. When something wasn't right, he said so early and he always came up with a solution. The professional, the reliable, the easy to work with people, that's Haisem. He always explains things in plain language so I always know where you stand and he always genuinely is ahead on AI. He always comes up with the latest technology and he implements this to your business. He doesn't chase trends, he thinks about what will actually get a business noticed and growing, then builds it properly. If you want to use AI to grow your business, talk to Haisem.",
    transcriptNote: "Transkription, ordagrant. Videon är på engelska.", // REVIEW-SV
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
    caseEyebrow: { problem: "Bakgrund", solution: "Angreppssätt", result: "Utfall" }, // REVIEW-SV
    stack: "Teknik", // REVIEW-SV
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
      { day: "Dag 0", title: "20 min gratis samtal", body: "Du berättar hur verksamheten fungerar. Jag letar efter det som tar mest tid." }, // REVIEW-SV
      { day: "Dag 2", title: "Förslag till fast pris", body: "En tydlig plan, ett pris och en tidsplan i skrift." }, // REVIEW-SV
      { day: "Vecka 2", title: "Vi bygger, du testar löpande", body: "Du ser framstegen med några dagars mellanrum och testar själv." }, // REVIEW-SV
      { day: "Live", title: "Överlämning och support", body: "Genomgång, dokumentation och en valfri månatlig supportplan." }, // REVIEW-SV
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
    meta: ["Haisem N., AI-ingenjör", "Stockholm · master i AI och språk"], // REVIEW-SV
    title: "Jag bygger hela AI-system och testar dem före lansering.", // REVIEW-SV
    intro:
      "AI/ML-ingenjör i Stockholm. Jag bygger LLM-produkter från början till slut: RAG, multiagentsystem, röst-AI och fullstack-appar. Deltid nu (upp till 15 h/vecka), heltid kan diskuteras.", // REVIEW-SV
    cv: "Ladda ner CV (PDF)",
    readCase: "Läs fallstudien", // REVIEW-SV
    toc: { label: "På den här sidan", nav: "Avsnitt på sidan" }, // REVIEW-SV
    summary: {
      index: "01",
      eyebrow: "Sammanfattning", // REVIEW-SV
      title: "Den korta versionen.", // REVIEW-SV
      paragraphs: [
        "I ett år var jag AI-ingenjör på Metaviz. Där byggde jag tre AI-produkter hela vägen från FastAPI-backend till gränssnitt i Next.js och Flutter, och röstagenter för riktiga företag.", // REVIEW-SV
        "Den här sidan går igenom ett av systemen, röstagenterna jag byggde åt Jake Wims byrå, med besluten bakom och en förenklad bit av koden.", // REVIEW-SV
      ],
      facts: [
        { k: "Senaste roll", v: "AI-ingenjör, Metaviz (jul 2025 – aug 2026)" }, // REVIEW-SV
        { k: "Nu", v: "Master i AI och språk, Stockholms universitet" }, // REVIEW-SV
        { k: "Tillgänglighet", v: "Deltid nu (upp till 15 h/vecka), heltid kan diskuteras" }, // REVIEW-SV
        { k: "Arbetstillstånd", v: "Får arbeta i Sverige (uppehållstillstånd för studier)" }, // REVIEW-SV
        { k: "Språk", v: "Engelska (flytande), urdu (modersmål), svenska (nybörjare)" }, // REVIEW-SV
      ],
      workTitle: "Fler fallstudier", // REVIEW-SV
      view: "Läs", // REVIEW-SV
    },
    system: {
      index: "02",
      eyebrow: "Fallstudie", // REVIEW-SV
      title: "Så byggde jag Jakes system med röstagenter", // REVIEW-SV
      intro:
        "Jake Wims driver en byrå som säljer AI-uppföljning av leads till amerikanska fastighetsmäklarteam och en bolångivare. På Metaviz AI byggde jag hela systemet: röstagenterna, automationerna i GoHighLevel och n8n-flödena mellan dem.", // REVIEW-SV
      diagramLabel: "Arkitektur: från nytt lead till bokat samtal", // REVIEW-SV
      nodes: [
        { title: "Facebook-formulär", sub: "Ett nytt lead" }, // REVIEW-SV
        { title: "GoHighLevel", sub: "Kontakt och pipeline" }, // REVIEW-SV
        { title: "Röstagent", sub: "Ringer och kvalificerar" }, // REVIEW-SV
        { title: "n8n-verktyg", sub: "Uppslag och bokning" }, // REVIEW-SV
        { title: "GHL-kalender", sub: "Bokat, sparat i CRM" }, // REVIEW-SV
        { title: "Uppföljning", sub: "Mejl, sms, nurture" }, // REVIEW-SV
      ],
      liveLabel: "AI",
      caption:
        "Ett lead från Facebook hamnar i GoHighLevel. Röstagenten i Retell ringer från ett lokalt nummer, sammanfattar formuläret och kvalificerar leadet som Hot, Warm eller Cold efter regler som kunden godkänt. Den bokar via n8n-verktyg i GoHighLevel-kalendern, varje samtal sparas i CRM:et, och den som inte svarar får sms och nurture-sekvenser.", // REVIEW-SV
      notes: [
        { k: "Mall", v: "Byggd som en mall att klona, med varianter för fastighet och bolån, och använd för fem eller fler kunders konton." }, // REVIEW-SV
        { k: "Hälsning", v: "Ett gemensamt inkommande uppslag i n8n väljer företagets hälsning för varje telefonnummer." }, // REVIEW-SV
        { k: "Verifierat", v: "Arkitekturgranskningen kontrollerades mot Retells, n8n:s och GoHighLevels live-API:er, med en testplan på 10 fall." }, // REVIEW-SV
      ],
      confidential: "Resultaten är konfidentiella för Jakes kunder, så sidan visar designen, inte siffrorna.", // REVIEW-SV
    },
    decisions: {
      index: "03",
      eyebrow: "Beslut", // REVIEW-SV
      title: "Beslut och avvägningar", // REVIEW-SV
      columns: { decision: "Beslut", why: "Varför", tradeoff: "Avvägning" }, // REVIEW-SV
      rows: [
        {
          decision: "Kvalificera efter skrivna regler som kunden godkänt", // REVIEW-SV
          why: "Hot, Warm och Cold betyder det kunden säger, och varje samtal kan kontrolleras mot reglerna.", // REVIEW-SV
          tradeoff: "Reglerna måste uppdateras när kundens erbjudande ändras.", // REVIEW-SV
        },
        {
          decision: "Hårda spärrar i koden för kända specialfall", // REVIEW-SV
          why: "Ett lead som planerade att flytta om sex månader eller mer klassades fel. En hård spärr markerar det nu som Cold innan något annat körs.", // REVIEW-SV
          tradeoff: "Mindre nyans: ett ovanligt lead går den strikta vägen.", // REVIEW-SV
        },
        {
          decision: "Boka via n8n-verktyg, inte direkt från agenten", // REVIEW-SV
          why: "Kalenderåtkomst och skrivningar till CRM ligger i flöden som kan testas för sig.", // REVIEW-SV
          tradeoff: "Ett steg till mellan samtalet och kalendern.", // REVIEW-SV
        },
        {
          decision: "En mall, klonad per kund", // REVIEW-SV
          why: "Varje ny kunds konto utgår från en uppsättning som redan är testad.", // REVIEW-SV
          tradeoff: "Delade delar går sönder samtidigt: en hälsning som läckte mellan kunder spårades till grundorsaken och rättades i alla agenter.", // REVIEW-SV
        },
        {
          decision: "Kontrollera designen mot live-API:erna", // REVIEW-SV
          why: "Arkitekturgranskningen verifierades mot Retells, n8n:s och GoHighLevels API:er, inte bara dokumentationen.", // REVIEW-SV
          tradeoff: "Mer verifieringsarbete i början.", // REVIEW-SV
        },
      ],
    },
    code: {
      index: "04",
      eyebrow: "Kod", // REVIEW-SV
      title: "Kvalificeringsspärren, förenklad", // REVIEW-SV
      intro: "Hårda regler körs före de mjukare signalerna, så att ett känt specialfall inte hamnar i fel steg i pipelinen.", // REVIEW-SV
      file: "qualify.ts",
      note: "Förenklad illustration skriven för den här sidan. Inte kundkod.", // REVIEW-SV
      source: qualifyExcerpt,
    },
    skills: {
      index: "05",
      eyebrow: "Kompetenser", // REVIEW-SV
      title: "Kompetenser, med siffrorna bakom", // REVIEW-SV
      before: "Före",
      after: "Efter",
      cap: "Tak",
      tiles: [
        {
          id: "rag",
          title: "LLM-system och RAG", // REVIEW-SV
          body: "Hybridsökning med konfidensstyrd orkestrering som hoppar över modellanrop när reglerna redan avgör svaret.", // REVIEW-SV
          value: "~40 %",
          label: "lägre genomsnittlig inferenskostnad per dokument, på Metaviz", // REVIEW-SV
          items: ["RAG", "ChromaDB", "pgvector", "BM25", "LangGraph", "LLM-utvärdering"], // REVIEW-SV
        },
        {
          id: "api",
          title: "Backend och API:er", // REVIEW-SV
          body: "En multi-tenant-plattform med asynkron jobbkö och säkerhet på radnivå.", // REVIEW-SV
          value: "132",
          label: "endpoints i REST-API:et i FastAPI som jag byggde, på Metaviz", // REVIEW-SV
          items: ["FastAPI", "Celery", "Redis", "PostgreSQL", "Supabase", "pytest"],
        },
        {
          id: "docai",
          title: "Dokument-AI", // REVIEW-SV
          body: "OCR och strukturerad extraktion som granskar bygghandlingar inom fem discipliner.", // REVIEW-SV
          value: "~80 %",
          label: "mindre manuell granskningstid per ritning, på Metaviz", // REVIEW-SV
          items: ["AWS Textract", "Strukturerade svar", "Granskningsgränssnitt i Next.js"], // REVIEW-SV
        },
        {
          id: "cost",
          title: "Kostnadskontroll", // REVIEW-SV
          body: "Modellkostnaden per dokument har ett tak i orkestreringslagret.", // REVIEW-SV
          value: "15 $",
          label: "tak för LLM-kostnad per dokument, på Metaviz", // REVIEW-SV
          items: ["Kostnadsstyrd orkestrering", "Prompt-cachning"], // REVIEW-SV
        },
        {
          id: "voice",
          title: "Röst-AI", // REVIEW-SV
          body: "Röstagenter som ringer, kvalificerar och bokar, kopplade till CRM:et.", // REVIEW-SV
          items: ["Retell AI", "ElevenLabs", "LiveKit", "Deepgram", "Twilio", "n8n", "GoHighLevel"],
        },
        {
          id: "apps",
          title: "Fullstack och appar", // REVIEW-SV
          body: "Från API:et till webb- och mobilgränssnitt, i produktion.", // REVIEW-SV
          layers: ["Mobil · Flutter", "Webb · Next.js, React", "API · FastAPI, Python"], // REVIEW-SV
          items: ["Python", "TypeScript", "Next.js", "React", "Flutter", "Docker", "GitHub Actions"],
        },
      ],
    },
    credentials: {
      index: "06",
      eyebrow: "Utbildning", // REVIEW-SV
      title: "Utbildning",
      items: [
        { period: "2026 – 2028", title: "Master i artificiell intelligens och språk", where: "Stockholms universitet", detail: "Pågår" }, // REVIEW-SV
        { period: "2021 – 2025", title: "Kandidat i datavetenskap", where: "FAST-NUCES, Lahore", detail: "Snittbetyg 3,19 av 4,0" }, // REVIEW-SV
        { period: "2023 – 2025", title: "Dean's List of Honours tre gånger", where: "FAST-NUCES", detail: "Hösten 2023, våren 2024, våren 2025" }, // REVIEW-SV
        { period: "2025", title: "Tredje plats i tävlingen för examensprojekt", where: "FAST Job Fair 2025", detail: "Av 250 lag" }, // REVIEW-SV
      ],
    },
    research: {
      index: "07",
      eyebrow: "Forskning", // REVIEW-SV
      title: "Forskning", // REVIEW-SV
      paperLabel: "Publikation", // REVIEW-SV
      paper: {
        title: "MultiObjective Optimization in Wireless Mesh Networks: A Survey",
        authors: "R. Amir, Haisem N., A. Ali, M. Gulzar",
        venue: "ACM Computing Surveys, vol. 58, nr 11, artikel 294, 2026", // REVIEW-SV
        doi: "doi.org/10.1145/3800685",
      },
      projectsLabel: "Forskningsprojekt", // REVIEW-SV
      projects: [
        { title: "Att upptäcka tuberkulos i hostljud", detail: "Examensprojekt: en ensemble av CNN, XGBoost och Wav2Vec, med en mobilapp för kliniker med små resurser." }, // REVIEW-SV
        { title: "Smart Summarizer", detail: "LoRA-finjustering för sammanfattningar av forskningsartiklar, utvärderad med ROUGE, BLEU, BERTScore och LLM-as-judge." }, // REVIEW-SV
        { title: "Forskningsassistent med flera agenter", detail: "LangGraph-agenter för litteratursökning, sammanfattning och jämförelse mellan artiklar." }, // REVIEW-SV
      ],
    },
    close: {
      title: "Söker ni en AI-ingenjör i Sverige?", // REVIEW-SV
      sub: "CV:t har detaljerna, fallstudierna visar arbetet.", // REVIEW-SV
      orEmail: "Eller mejla",
    },
  },
  intake: {
    eyebrow: "Projektförfrågan", // REVIEW-SV
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
  footer: {
    rights: "Alla rättigheter förbehållna.",
    privacy: "Integritet",
    tagline: "Webbplatser och AI för företag i Stockholm.", // REVIEW-SV
    navLabel: "Sidfot", // REVIEW-SV
    place: "Stockholm · 59,33°N 18,07°E", // REVIEW-SV
    localTime: "Lokal tid", // REVIEW-SV
  },
  cursor: { view: "Visa", try: "Testa", book: "Boka" }, // REVIEW-SV
  marquee: {
    lead: "Nu bygger vi", // REVIEW-SV
    em: "ditt nästa steg", // REVIEW-SV
    label: "Nu bygger vi ditt nästa steg", // REVIEW-SV
    note: "Steg ett · 20 min · gratis", // REVIEW-SV
    sub: "Ett gratis samtal på 20 minuter. Inom två dagar har du en plan och ett fast pris.", // REVIEW-SV
    button: "Boka ett gratis samtal", // REVIEW-SV
    orEmail: "Eller mejla",
  },
} satisfies Dictionary;
