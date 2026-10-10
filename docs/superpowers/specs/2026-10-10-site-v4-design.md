# Site v4 — creative redesign spec

Approved direction 2026-10-10: **Magazine × Control room** blend. Inputs: `design-audit-uiux.md` and
`design-audit-frontend.md` (QA of v3 vs v2, 58 screenshots). Keeps v3's content, i18n, intake, Worker, routing.

## Goal
The site must *demonstrate*, not describe: a Stockholm SMB owner should think "I want that for my business",
an employer should think "this person has taste and depth". Every section earns its place with one strong object.

## Non-goals
Live voice agent (later), real photo shoot (later), CMS, new backend, prices.

## 1. Identity system — v1 theme as the base, Nordic-ice glow (Haisem, 2026-10-10)
Keep the v1 look (commit ab1c4b7: tokens, grain, hanging bulb, Space Grotesk/Inter/JetBrains Mono) and improve it.
- **Default = light ("bulb on")**: bg `#FAFAF8`, card `#FFFFFF`, text `#1A1A1E`, secondary `#5B6170`; accent ice blue —
  text/links/indices `#0369A1` (≥ 5.5:1 on bg), primary button `#0369A1` with white text, highlight tint `#E0F2FE`,
  soft ice glow `rgba(56,189,248,.18)` in the bulb's light cone.
- **Night ("bulb off", dark mode)**: bg `#0A0A0B`, card `#141416`, text `#EDEDEF`, secondary `#8B8B9E`; accent
  `#7DD3FC` (text), button `#38BDF8` with ink text `#04121c`, glow `rgba(56,189,248,.16)`.
- **Live/AI second accent:** amber `#FFB547` on night, `#B45309` on light (booked slot, live dot, lit windows).
- **Hanging bulb** (v1 `HangingBulb`, pull-cord, light cone, "pull me" hint) is the theme toggle and the signature
  object: lit = light mode (default), pulled = night. It hangs from the navbar (cord attached to the nav, never
  passing behind content), retracts on scroll; mobile gets a compact cord in the nav. Keyboard: button with
  `aria-pressed`, label from dictionary. Theme switch = circular light/dark reveal from the bulb (View Transitions,
  instant fallback). Theme choice persisted (`theme` key); no flash.
- **Type** = v1 stack: Space Grotesk (display), Inter (body), JetBrains Mono (labels, indices, live data). Hero
  display ≈ 96px desktop, 2 lines; mono `01–09` indices; tabular figures.
- **Grain** overlay on body (≈5% night, ≈3% light). One glow pool per screen max.
- Rhythm: never two identical card grids in a row; alternate open sections with full-bleed bands (night control-room
  band stays dark in both themes). Navbar ≥ 0.88 opacity with solid fallback.

## 2. Page architecture (home, both languages)
1. **Cover hero** — magazine cover: issue line ("Nummer 01 · Stockholm · 2026"), serif headline
   "AI that *works while you don't.*" (SV: "AI som *jobbar när du inte gör det.*" — REVIEW-SV;
   the subline must name websites too, since the headline no longer does;
   key phrase in the ice accent), CTA pair; right side a live **demo phone** (static frame of the receptionist chat) instead of
   the particle sphere. LCP = hero text; nothing 3D above the fold.
2. **Proof strip** — Jake pull-quote + 3 facts, fixed separators.
3. **Jake testimonial (moved up)** — custom poster + play button, pull-quote, captions; transcript in details.
4. **Services as a spread** — 4 services in an asymmetric editorial layout (not 4 identical cards); website service
   carries the before/after slider teaser.
5. **Control room (dark band, signature)** — full-bleed night section:
   - **AI-receptionist chat demo** (labelled demo business "Salong Åsa, Hornsgatan" — clearly fictional): visitor picks
     or types a customer message; scripted bot replies with typing, asks one qualifying question, offers slots,
     books; panel flips to CRM card + timeline (SMS 0:04, calendar 0:06). Verticals: salon, clinic, trades,
     restaurant. EN/SV scripts. CTA "Want this for your business?" → `/start` prefilled goal.
   - Control-room heading: "21:40. A lead arrives. *You're already asleep.*"
   - **"21:40" scroll story** — pinned GSAP timeline over real UI pieces from the demo: form fills → phone rings
     (waveform) → calendar cell drops → CRM row slides; corner clock 21:40→21:44. Works on phones (shorter pin).
     Replaces the particle StoryScene.
6. **Work** — 3 featured projects as full-bleed editorial rows (index, serif title, device mockup on tinted
   backdrop, hover loop) + compact list for the rest. Consistent mockup system; no placeholder diagrams.
7. **Before/after** — drag slider: dated SMB site → redesign (labelled concept), Lighthouse dials animate.
8. **How we work** — 4 steps as a horizontal timeline with folio numbers.
9. **About** — duotone portrait, short story, Stockholm line.
10. **Kinetic footer CTA** — huge outlined "Let's build yours →" marquee reacting to scroll velocity → `/start`.

`/hire`: technical case study — sticky TOC, animated architecture diagram of the Jake system
(lead → voice agent → n8n → GHL), decisions/trade-offs table, code excerpt (build-time highlighted),
skills as live mini-dashboards (old bento rebuilt for light/night), CV download.
`/start`: restyled to the new system (filled chip states, Next disabled until answered), logic unchanged.
Project pages: mockup hero, view-transition from the card.

## 3. Personality layer
- **Hanging bulb returns** as the theme toggle on desktop (pull-cord, light cone; button with `aria-pressed`
  inside); simple toggle on mobile.
- **Cursor system** (fine pointers only): ring → "View"/"Try" pill over projects/demo; native cursor kept.
- **Page transitions:** View Transitions API (card image → case-study hero); instant where unsupported.
- **Sound:** opt-in only (ring in demo, bulb click); off by default.

## 4. Imagery pipeline
Mockups rendered from HTML product scenes (no client names/data/numbers) with puppeteer → AVIF/WebP 800/1600w +
blur placeholder; 6 s 720p hover loops via ffmpeg (≤ 400 KB). Portrait: existing `haisem.webp` with duotone.
Before/after: "dated" and "redesigned" concept sites rendered the same way.

## 5. Engineering
- Keep: `[lang]` routing, dictionaries (+ new keys, sv `satisfies`), intake + Worker, capability gating
  (→ `tier: "full" | "lite" | "static"`), Lenis, motion (UI state; `LazyMotion`/`m`).
- Add: GSAP + ScrollTrigger (lazy per section, Lenis-synced), `TransitionLink`, demo script engine
  (`src/lib/demo/*`, pure + tested), image scripts (`scripts/mockups/*`).
- Remove: particle hero + StoryScene canvas, unlayered mobile CSS overrides, `content-visibility` hacks,
  dead `VoiceBot*`/`GlassCard`/unused CSS, Space Grotesk.
- Fix: navbar opacity/blur (≥ 0.88 alpha + solid fallback), active nav state, anchors.
- Budgets: initial JS ≤ 140 KB gz mobile; GSAP ~35 KB lazy; demo ≤ 8 KB; CLS ≤ 0.02; Lighthouse mobile
  perf ≥ 0.85, a11y ≥ 0.95. Reduced motion: every animation has a static equivalent; demo works instantly.

## 6. Process
Phases: (1) foundation + identity, (2) control room (demo + 21:40), (3) proof (work, Jake, before/after),
(4) personality (bulb, cursor, transitions, footer), (5) /hire case study. Each phase ends with **screenshot QA by
a UI/UX reviewer and a frontend reviewer** (desktop 1440 + mobile 390, light + night) plus Lighthouse; merge to
main only after Haisem sees the screenshots.
