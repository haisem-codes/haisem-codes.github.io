import type { Dictionary } from "./index";
import { pageError } from "./page-error";
import { qualifyExcerpt } from "./hire-code";

export const sv = {
  meta: {
    title: "Haisem N. | Tillämpad AI-ingenjör, Stockholm",
    description:
      "Jag började om för att gå djupare: från ett jobb som AI-ingenjör i Lahore till en MSc i AI och språk i Stockholm. Min historia, mitt arbete och vart jag är på väg.",
    hireTitle: "Haisem N. | Fallstudie: ett röstagentsystem, från början till slut",
    hireDescription: "Så byggde jag ett röstagentsystem i produktion: arkitektur, beslut och avvägningar, ett förenklat kodutdrag, kompetenser och forskning.",
  },
  nav: {
    story: "Berättelse", work: "Projekt", clients: "Kunder", now: "Nu", hire: "Fallstudie", contact: "Hör av dig", switchTo: "English", menu: "Meny", // REVIEW-SV
    nightMode: "Mörkt läge", // REVIEW-SV
    pullHint: "dra i mig", // REVIEW-SV
  },
  hero: {
    eyebrow: "Haisem N. · AI-ingenjör · Stockholm",
    titleLead: "Tillämpad AI-ingenjör som vill ligga steget före i", // REVIEW-SV
    titleAccent: "AI-kapplöpningen.", // REVIEW-SV
    sub: "Jag bygger AI-system som folk faktiskt använder: röstagenter, retrieval och fullstack-produkter. Nu är jag i Stockholm och pluggar igen, så att jag förstår det jag bygger på djupet.", // REVIEW-SV
    ctaPrimary: "Läs min historia", // REVIEW-SV
    ctaSecondary: "Hör av dig", // REVIEW-SV
    portraitAlt: "Porträtt av Haisem N.", // REVIEW-SV
  },
  jake: {
    index: "03",
    eyebrow: "Med deras ord", // REVIEW-SV
    title: "AI-uppföljning för en växande byrå",
    intro:
      "Jake Wims startade en byrå som säljer AI-uppföljning av förfrågningar till mäklarteam och en bolåneförmedlare. På Metaviz byggde jag systemet från början till slut: röstagenterna, CRM-automationerna och flödena mellan dem.", // REVIEW-SV
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
    quoteBy: "Jake Wims, Grundare,\u00A0Acquire\u00A0Growth\u00A0AI", // REVIEW-SV
    builtAt: "Röstagenter, CRM-automationer och flöden", // REVIEW-SV
    transcript:
      "Yo Haisem, just wanted to say thanks for all the fulfillment work you've helped me with over the past few months, just starting up my agency. Would not have been able to scale as fast as I have been without the support. Yeah, everything from the AI callers to the automation work. Really appreciate just how attention to detail you've been, and how good support has been as to, like, absolutely just honing in on the specifics of what needs to be done. My clients have been extremely happy with how good the follow-up process is for them. And I can say the same for my agency as well. So yeah, anybody looking for a top-tier HighLevel developer, highly recommend Haisem.",
    transcriptNote: "Transkription, ordagrant. Videon är på engelska.", // REVIEW-SV
  },
  derin: {
    name: "Derin",
    role: "Medgrundare", // REVIEW-SV
    company: "Deepsea Media",
    newTab: "(öppnas i en ny flik)", // REVIEW-SV
    builtAt: "Kundprojekt", // REVIEW-SV
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
    index: "02",
    eyebrow: "Vad jag har byggt",
    title: "Riktiga system, byggda med riktiga team.", // REVIEW-SV
    more: "Fler projekt",
    categories: { business: "Företagsautomation", products: "AI-produkter", research: "Forskning" },
    view: "Läs caset",
    context: { metaviz: "Byggt på Metaviz", client: "Metaviz · kundprojekt" }, // REVIEW-SV
    back: "Alla projekt",
    highlights: {
      "ai-compliance-platform": { value: "~80 %", label: "mindre manuell granskningstid, inom fem byggregeldiscipliner" }, // REVIEW-SV
      "voice-agents-suite": { value: "5+", label: "företagare som jag byggt röstagenter för" }, // REVIEW-SV
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
  afterHours: {
    eyebrow: "Egna projekt", // REVIEW-SV
    title: "På fritiden", // REVIEW-SV
    sub: "Saker jag bygger för att jag inte kan sluta undra hur de fungerar.", // REVIEW-SV
    tag: "tidig MVP", // REVIEW-SV
    items: [
      {
        title: "Aegis",
        kind: "AI-stödd säkerhetsanalys av kod", // REVIEW-SV
        body: "Byggde en typad Python-prototyp som kombinerar Joern-kodgrafer, kandidater från statisk dataflödesanalys och LLM-stödda resonemang. Lade till kontroller av motbevis, budgetar för modellanrop, hantering av leverantörsfel och SARIF-rapportering.", // REVIEW-SV
      },
      {
        title: "Notetaker",
        kind: "Transkribering av föreläsningar och studieanteckningar", // REVIEW-SV
        body: "Byggde en React/FastAPI-applikation med lokal MLX Whisper-transkribering och anteckningar genererade av Claude/OpenAI. Lade till Pydantic-validering, riktad reparation, återhämtning av delresultat, bakgrundsjobb och PDF-export.", // REVIEW-SV
      },
      {
        title: "Virtual Tour",
        kind: "AI-generator för resvideor", // REVIEW-SV
        body: "Utvecklade en BullMQ-pipeline i sju steg som kombinerar strukturerad LLM-extraktion, scenplanering, berättarröst och rendering. Lade till deterministiska plankontroller, reparation och validering efter rendering av strömmar, upplösning och längd.", // REVIEW-SV
      },
    ],
  },
  story: {
    index: "01",
    eyebrow: "Varför jag började om", // REVIEW-SV
    title: "Jag började om för att gå djupare.", // REVIEW-SV
    paragraphs: [
      "För ett år sedan hade jag det de flesta skulle kalla det trygga livet: ett fast jobb som AI-ingenjör i Lahore, produkter i produktion och kunder som litade på mig.", // REVIEW-SV
      "Och jag kunde bygga nästan vad som helst. Med AI-verktyg vid min sida kunde en idé bli en fungerande app på en helg. Men ärligt talat var mycket av det jag kunde bara ytligt. Jag fick saker att fungera. Jag kunde inte alltid säga varför de fungerade, vad som egentligen hände under ytan, eller när de i tysthet skulle sluta fungera.", // REVIEW-SV
      "Jag ville inte fortsätta bygga ovanpå saker jag inte förstod. Jag ville veta hur systemen bakom mitt arbete faktiskt fungerar, så att det jag bygger inte bara är möjligt, utan meningsfullt.", // REVIEW-SV
      "Så jag lämnade. Jag gick ifrån det trygga jobbet, flyttade till Stockholm och blev student igen, den här gången på en master i AI och språk vid Stockholms universitet. En ny stad, ett nytt språk, inget nätverk. Jag började från noll.", // REVIEW-SV
      "Det har inte varit lätt, och det är inte meningen att det ska vara det. Jag ville nå den sortens förståelse man bara får genom att gå tillbaka till grunderna, och jag ville ge något tillbaka till den forskning som gjorde mitt arbete möjligt. Mitt första bidrag är redan publicerat: en översiktsartikel som jag är medförfattare till i ACM Computing Surveys.", // REVIEW-SV
      "Jag är fortfarande en byggare i grunden. Därför söker jag, vid sidan av studierna, en roll i branschen: för att vara nära riktiga användare, riktiga begränsningar och hur de bästa teamen jobbar i dag.", // REVIEW-SV
    ],
    pull: "Labbet lär mig varför. Praktiken håller mig ärlig.", // REVIEW-SV
    timelineLabel: "Lahore → Stockholm",
    timeline: [
      { years: "2021–25", what: "Kandidat i datavetenskap", where: "FAST-NUCES, Lahore" }, // REVIEW-SV
      { years: "2024–25", what: "Praktikant, Python-utvecklare", where: "WebBuggs" }, // REVIEW-SV
      { years: "2025–26", what: "AI-ingenjör", where: "Metaviz, Lahore" }, // REVIEW-SV
      { years: "2026–", what: "Master i AI och språk", where: "Stockholms universitet" }, // REVIEW-SV
      { years: "2026", what: "Medförfattare", where: "ACM Computing Surveys" }, // REVIEW-SV
    ],
  },
  now: {
    index: "04",
    eyebrow: "Nu", // REVIEW-SV
    title: "Studerar, forskar, utforskar.", // REVIEW-SV
    columns: [
      { label: "Studerar", body: "MSc i AI och språk vid Stockholms universitet, 2026–28." }, // REVIEW-SV
      { label: "Forskar", body: "Medförfattare till en översiktsartikel om multiobjektsoptimering i trådlösa mesh-nätverk (ACM Computing Surveys, 2026). Vill bidra till AI-forskning under min master." }, // REVIEW-SV
      { label: "Utforskar", body: "Söker roller inom AI-utveckling i Sverige, för att fortsätta lära mig av branschen och hålla mig à jour med hur de bästa teamen bygger." }, // REVIEW-SV
    ],
  },
  goals: {
    index: "05",
    eyebrow: "Vart jag är på väg", // REVIEW-SV
    title: "Mål och intressen.", // REVIEW-SV
    goalsLabel: "Mål", // REVIEW-SV
    goals: [
      "Förstå systemen jag bygger från grundprinciperna.", // REVIEW-SV
      "Bidra till AI-forskningen.", // REVIEW-SV
      "Bygga AI som på riktigt hjälper människor.", // REVIEW-SV
      "En dag bygga något eget.", // REVIEW-SV
    ],
    interestsLabel: "Intressen", // REVIEW-SV
    interests: [
      "Röst-AI och konversationsagenter", // REVIEW-SV
      "Språk och stora språkmodeller", // REVIEW-SV
      "Retrieval och multiagentsystem", // REVIEW-SV
      "Lära mig svenska, ett samtal i taget", // REVIEW-SV
    ],
  },
  hire: {
    meta: ["Haisem N., AI-ingenjör", "Stockholm · master i AI och språk"], // REVIEW-SV
    title: "Jag bygger hela AI-system och testar dem före lansering.", // REVIEW-SV
    intro:
      "AI/ML-ingenjör i Stockholm. Jag bygger LLM-produkter från början till slut: RAG, multiagentsystem, röst-AI och fullstack-appar.", // REVIEW-SV
    cv: "Ladda ner CV (PDF)",
    readCase: "Läs fallstudien", // REVIEW-SV
    toc: { label: "På den här sidan", nav: "Avsnitt på sidan" }, // REVIEW-SV
    summary: {
      index: "01",
      eyebrow: "Sammanfattning", // REVIEW-SV
      title: "Den korta versionen.", // REVIEW-SV
      paragraphs: [
        "I ett år var jag AI-ingenjör på Metaviz i Lahore. Jag ledde AI-integrationen i tre SaaS-plattformar (Wanyumba, AfricaTravelHub och Handman/Getapro) och byggde röstagenter för fler än fem företagare.", // REVIEW-SV
        "Den här sidan går igenom ett av systemen, röstagenterna jag byggde åt Jake Wims byrå, med besluten bakom och en förenklad bit av koden.", // REVIEW-SV
      ],
      facts: [
        { k: "Senaste roll", v: "AI-ingenjör, Metaviz, Lahore (jul 2025 – aug 2026)" }, // REVIEW-SV
        { k: "Nu", v: "Master i AI och språk, Stockholms universitet" }, // REVIEW-SV
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
        "Jake Wims (Grundare, Acquire Growth AI) säljer AI-uppföljning av leads till amerikanska fastighetsmäklarteam och en bolångivare. Jag byggde hela systemet på Metaviz: röstagenterna, automationerna i GoHighLevel och n8n-flödena mellan dem.", // REVIEW-SV
      diagramLabel: "Arkitektur: från nytt lead till schemalagt samtal", // REVIEW-SV
      nodes: [
        { title: "Facebook-formulär", sub: "Ett nytt lead" }, // REVIEW-SV
        { title: "GoHighLevel", sub: "Kontakt och pipeline" }, // REVIEW-SV
        { title: "Röstagent", sub: "Ringer och kvalificerar" }, // REVIEW-SV
        { title: "n8n-verktyg", sub: "Uppslag och bokning" }, // REVIEW-SV
        { title: "GHL-kalender", sub: "Schemalagt, sparat i CRM" }, // REVIEW-SV
        { title: "Uppföljning", sub: "Mejl, sms, nurture" }, // REVIEW-SV
      ],
      liveLabel: "AI",
      caption:
        "Ett lead från Facebook hamnar i GoHighLevel. Röstagenten i Retell ringer från ett lokalt nummer, sammanfattar formuläret och kvalificerar leadet som Hot, Warm eller Cold efter regler som kunden godkänt. Den bokar möten via n8n-verktyg i GoHighLevel-kalendern, varje samtal sparas i CRM:et, och den som inte svarar får sms och nurture-sekvenser.", // REVIEW-SV
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
          why: "Ett lead som planerade att flytta om sex månader eller mer klassades fel. En hård spärr markerar det nu som Cold.", // REVIEW-SV
          tradeoff: "Mindre nyans: ett ovanligt lead går den strikta vägen.", // REVIEW-SV
        },
        {
          decision: "Schemalägg via n8n-verktyg, inte direkt från agenten", // REVIEW-SV
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
          why: "Arkitekturgranskningen verifierades mot de skarpa API:erna hos Retell, n8n och GoHighLevel.", // REVIEW-SV
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
      title: "Kompetenser, och systemen bakom", // REVIEW-SV
      cap: "Tak", // REVIEW-SV
      tiles: [
        {
          id: "rag",
          title: "LLM-system och RAG", // REVIEW-SV
          body: "Hybridsökning med källvalidering, orkestrerad med LangGraph.", // REVIEW-SV
          steps: ["Embeddings + BM25", "Rangfusion", "LLM-steg", "Källkontroll"], // REVIEW-SV
          items: ["RAG", "ChromaDB", "pgvector", "BM25", "LangGraph", "LLM-utvärdering"], // REVIEW-SV
        },
        {
          id: "api",
          title: "Backend och API:er", // REVIEW-SV
          body: "En asynkron jobbpipeline bakom FastAPI-API:er.", // REVIEW-SV
          steps: ["API-anrop", "Jobbkö", "Worker"], // REVIEW-SV
          items: ["FastAPI", "Celery", "Redis", "PostgreSQL", "pytest"],
        },
        {
          id: "docai",
          title: "Dokument-AI", // REVIEW-SV
          body: "OCR och strukturerad extraktion som granskar bygghandlingar inom fem discipliner.", // REVIEW-SV
          steps: ["Ritning som PDF", "OCR", "Strukturerad extraktion", "Regelkontroll", "Granskaren godkänner"], // REVIEW-SV
          items: ["AWS Textract", "OCR", "Strukturerade svar"], // REVIEW-SV
        },
        {
          id: "cost",
          title: "Kostnadskontroll", // REVIEW-SV
          body: "Cirka 40 % lägre genomsnittlig inferenskostnad per dokument, på Metaviz.", // REVIEW-SV
          items: ["Kostnadsstyrd orkestrering", "Prompt-cachning"], // REVIEW-SV
        },
        {
          id: "voice",
          title: "Röst-AI", // REVIEW-SV
          body: "Röstagenter som ringer, kvalificerar och bokar möten, kopplade till CRM:et.", // REVIEW-SV
          items: ["Retell AI", "LiveKit", "n8n", "GoHighLevel"],
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
      title: "Utbildning", // REVIEW-SV
      items: [
        { period: "2026 – 2028", title: "Master i artificiell intelligens och språk", where: "Stockholms universitet", detail: "Pågår" }, // REVIEW-SV
        { period: "2021 – 2025", title: "Kandidat i datavetenskap", where: "FAST-NUCES, Lahore", detail: "Snittbetyg 3,19 av 4,0" }, // REVIEW-SV
        { period: "2023 – 2025", title: "Dean's List i tre terminer", where: "FAST-NUCES", detail: "Kandidat i datavetenskap" }, // REVIEW-SV
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
        { title: "Att upptäcka tuberkulos i hostljud", detail: "Examensprojekt: XGBoost, en spektrogrammodell och Wav2Vec2 kombinerade med viktad röstning. 98,33 % träffsäkerhet i projektets utvärdering; tredje plats bland 250 team på FAST Job Fair 2025." }, // REVIEW-SV
        { title: "Smart Summarizer", detail: "LoRA-finjustering för sammanfattningar av forskningsartiklar, utvärderad med ROUGE, BLEU, BERTScore och LLM-as-judge." }, // REVIEW-SV
      ],
    },
    close: {
      title: "Söker ni en AI-ingenjör i Sverige?", // REVIEW-SV
      sub: "CV:t har detaljerna, fallstudierna visar arbetet.", // REVIEW-SV
      orEmail: "Eller mejla",
    },
  },
  pageError: pageError.sv,
  footer: {
    rights: "Alla rättigheter förbehållna.",
    tagline: "Tillämpad AI-ingenjör. Pluggar i Stockholm.", // REVIEW-SV
    navLabel: "Sidfot", // REVIEW-SV
    place: "Stockholm · 59,33°N 18,07°E", // REVIEW-SV
    localTime: "Lokal tid", // REVIEW-SV
  },
  cursor: { view: "Visa" }, // REVIEW-SV
  marquee: {
    lead: "Hör",
    em: "av dig.", // REVIEW-SV
    label: "Hör av dig.", // REVIEW-SV
    sub: "Om något av det här väcker något hos dig, oavsett om du bygger något, rekryterar eller forskar, hör jag gärna från dig.", // REVIEW-SV
    button: "Mejla mig", // REVIEW-SV
    linkedin: "LinkedIn",
    cv: "Ladda ner CV", // REVIEW-SV
  },
} satisfies Dictionary;
