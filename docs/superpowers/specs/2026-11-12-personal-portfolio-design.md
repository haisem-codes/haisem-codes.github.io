# Personal portfolio — design (2026-11-12)

Haisem: "remove the services part from the whole portfolio site; stick to who I am, what I have done,
client reviews, what I'm doing now, my goal and interests; keep it personal … left a stable job to start
from scratch here, back to studies to develop deeper understanding of the systems I build and contribute to
the growing AI research, also exploring job opportunities to stay relevant and hands-on … written from the
heart, emotionally appealing and motivational." Added: "I could build anything through vibe coding but I had
only surface-level knowledge; I wanted to know how things worked at the backend so I can build things more
meaningfully." He opted out of further questions ("just keep it portfolio site").

## Decisions (Haisem, 2026-11-12, Q&A)
- Remove the 21:40 story + chat demo; remove /start intake + /privacy; keep /hire as "Case study".
- Startup goal is public ("one day, build something of my own").
- Story: first person, heartfelt, the draft below. Swedish: translate everything (// REVIEW-SV).
- Hero headline (his words): "Applied AI Engineer trying to get ahead of the AI race."
- Facts source: latest CV `shared/cv-master/2026-11-11-cv-collection/Applied-AI/Haisem_Naeem_Applied_AI_Engineer_CV.pdf`.
  Site now MATCHES the CV: Metaviz named, with CV metrics (~80% manual review, ~40% inference spend, 132
  endpoints, ~50% session tokens, 5+ business owners) and CV project names (Wanyumba, AfricaTravelHub,
  Handman/Getapro, ICore Career Hub, Coach, Postura, DietApp). Supersedes the 17 Oct site-wide Metaviz removal.
- Public name stays "Haisem N."; no availability/hours; Jake = Founder, Acquire Growth AI.
- New section "After hours" — sub-line "Things I build because I can't stop asking how they work." —
  Aegis, Notetaker, Virtual Tour from the CV, each tagged "early MVP", text only (no links yet).
- Teaching experience: CV only, not on the site. Interests: the four work interests only.
- Launch: deploy when reviews pass (no extra approval step).

## Intent
A personal portfolio, not a sales site. A reader (hiring manager, researcher, past/future client) should feel
who Haisem is and why he made a hard choice, then see proof (work, client reviews) and where he is going.

## Keep (visual system unchanged)
v4 identity: hanging-bulb theme toggle, light default, Nordic-ice accent, Space Grotesk / Inter / JetBrains
Mono, mono 0x eyebrows, hairlines, editorial bands, cursor, view transitions, reduced-motion static tier.

## Remove
- Services (and its before/after teaser), Control room (21:40 story, three.js skyline, chat demo), Before/after
  slider, How-we-work timeline, ProofStrip if it only sells, "Book a free call" CTAs everywhere.
- /start intake route + intake components + Worker client code; /privacy (it only covers the intake form).
  Delete their dictionary keys, tests that only cover removed code, and now-unused deps/assets (rg-proven,
  `git rm` only).
- Nav: Story, Work, Clients, Now, Case study (/hire), Svenska, and a "Get in touch" button (mailto).

## New home order
1. **Hero** — eyebrow "Haisem N. · AI engineer · Stockholm"; headline "I started over to go deeper.";
   sub: "I build AI systems people actually use: voice agents, retrieval and full-stack products. Now I'm in
   Stockholm, studying again, so I understand what I build all the way down." (headline per Decisions) Right side: the portrait
   (original colours, current asset). CTAs: "Read my story" (#story), "Get in touch" (mailto).
2. **01 — Why I started over** (the heart of the page; long-form editorial, large readable type, generous
   leading, the last line set larger as a pull-line). Copy (EN, use verbatim; SV translation, // REVIEW-SV):

   > A year ago I had what most people would call the safe version of my life: a steady job as an AI
   > engineer in Lahore, products running in production, clients who trusted me.
   >
   > And I could build almost anything. With AI tools beside me, an idea could become a working app in a
   > weekend. But if I'm honest, a lot of what I knew stayed on the surface. I could make things work. I
   > couldn't always tell you why they worked, what was really happening underneath, or when they would
   > quietly stop working.
   >
   > I didn't want to keep building on top of things I didn't understand. I wanted to know how the systems
   > behind my work actually run, so that what I build is not just possible, but meaningful.
   >
   > So I left. I walked away from the stable job, moved to Stockholm and became a student again, this time
   > on an MSc in AI and Language at Stockholm University. A new city, a new language, no network. Starting
   > from zero.
   >
   > It hasn't been easy, and it isn't supposed to be. I wanted the kind of understanding you only get by
   > going back to first principles, and I wanted to give something back to the research that made my work
   > possible. My first contribution is already out: a survey I co-authored in ACM Computing Surveys.
   >
   > I'm still a builder at heart. That's why, alongside my studies, I'm looking for a role in industry: to
   > stay close to real users, real constraints and the way the best teams work today.
   >
   > **The lab teaches me why. The field keeps me honest.**

   Beside it: a compact Lahore → Stockholm timeline from existing facts (2021–25 BS Computer Science,
   FAST-NUCES; 2024–25 Python developer internship; 2025–26 AI engineer, product team, Lahore; 2026– MSc AI
   and Language, Stockholm University; 2026 ACM Computing Surveys co-author).
3. **02 — What I've built** — existing Work (featured bands + compact list), re-aligned to the CV (Metaviz
   attribution and CV metrics restored; ICore added).
   **After hours** — personal MVPs (Aegis, Notetaker, Virtual Tour), CV wording, 'early MVP' tag.
4. **03 — In their words** — existing client stories (Jake, Derin) unchanged.
5. **04 — Now** — three hairline columns: *Studying* (MSc AI and Language, Stockholm University, 2026–28);
   *Researching* (co-author, ACM Computing Surveys; contributing to the growing body of AI research);
   *Exploring* ("Looking for AI engineering roles in Sweden, to keep learning from the field and stay
   current with how the best teams build."). No hours or availability.
6. **05 — Where I'm headed** — Goals: understand the systems I build from first principles; contribute to
   AI research; build AI that genuinely helps people; one day, build something of my own. Interests: voice
   AI and conversational agents; language and large language models; retrieval and multi-agent systems;
   learning Swedish, one conversation at a time.
7. **Closing** — the kinetic marquee becomes "Let's talk." (SV "Hör av dig."); line: "If any of this
   resonates, whether you're building something, hiring or researching, I'd love to hear from you."
   Email (primary button), LinkedIn, CV download. Footer as now (no "Book a free call").

## Constraints
Claims only from shared/profile-facts.md + CV: no Metaviz name or product metrics, Jake = Founder, Acquire
Growth AI, "Haisem N." only, no availability/hours, never name Jake's LLM. All strings in dictionaries,
sv `satisfies Dictionary`, // REVIEW-SV. Budgets: initial JS ≤ 140 KiB gz per page, CLS ≤ 0.02, Lighthouse
mobile perf ≥ 0.85 / a11y ≥ 0.95, axe 0. /hire keeps its content but loses any "book a call" CTA.
Metadata (titles/descriptions/OG) rewritten to the personal framing (no "Websites and AI automation").

## Builder's calls
Exact layout of the story, Now and Goals sections within the existing design system; SV wording; which
unused files/deps fall out of the removals.
