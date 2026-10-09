# Site v3 — design spec

Approved in chat 2026-10-08. Branch `feat/site-v3`. Static export on GitHub Pages (unchanged).

## Goal
The site wins Stockholm SMB clients (websites + AI automation) and is itself the proof of design skill,
while giving employers a clear path to Haisem's AI-engineering depth. Light by default, bilingual EN/SV.

## Non-goals
Blog/CMS, prices on the site, booking calendar (reply-within-24h for now), collecting partial form data.

## 1. Routing and i18n
- `src/app/[lang]/…` with `generateStaticParams` → `en`, `sv`. Pages: `/{lang}/` (home), `/{lang}/hire/`,
  `/{lang}/start/` (intake), `/{lang}/projects/[slug]/`, `/{lang}/privacy/`.
- `/` = tiny static page: saved choice (`localStorage.lang`) → `navigator.languages` (`sv*` → sv) → en; `location.replace`.
  `<noscript>` links to both.
- Legacy `/projects/<slug>/` pages stay (emails link to them) and redirect client-side to `/{detected}/projects/<slug>/`.
- Dictionaries `src/i18n/en.ts`, `src/i18n/sv.ts`; `sv` typed `satisfies Dictionary` (type derived from `en`) so a
  missing key fails `tsc`. Project content gets per-language fields.
- Navbar switch labelled "Svenska / English" → same path in the other lang; persists choice.
- `<html lang>` per route; `alternates.languages` (hreflang) in metadata.
- Swedish: natural copy, informal "du"; lines needing native review marked `// REVIEW-SV` in `sv.ts`.

## 2. Content
Home (business owners): Hero (headline + "Book a free call" → /start, "Hiring an AI engineer? →" → /hire, 3D)
→ Proof strip (Jake line · 5+ businesses run my voice agents · MSc AI, Stockholm University · ACM publication)
→ Services ×4 (website that converts — "this site is the example"; AI receptionist; lead follow-up & CRM automation;
AI assistant over your documents/admin) each: problem in owner words → what you get → timeline
→ Story scene (3D scroll: lead → AI call → booking → CRM) → Featured case Jake (52 s captioned video, transcript, summary)
→ Work (filter: Business automation / AI products / Research) → How I work (free call → fixed-price proposal →
~2 weeks build with check-ins → handover + optional care plan) → About → Contact CTA (→ /start, email, LinkedIn).
`/hire`: CV summary + PDF, skills bento, credentials, research, GitHub, tech marquee, counters (fixed).
Claims only from `job-search/shared/profile-facts.md`. No Jake performance numbers; no LLM named for Jake's agents.
Pricing copy: "Fixed price, agreed after a free call."

## 3. Visual + motion
Light default (`#FAFAF8` family), dark toggle kept; theme-color per theme. Scandinavian minimal: large display type
(Space Grotesk), generous space, one accent (existing green). Remove HangingBulb. Motion: line-by-line text reveal,
magnetic CTAs, section transitions, Lenis. `prefers-reduced-motion` disables all non-essential motion.
VoiceBot: stays hidden unless it works end to end (out of scope to fix in v3).

## 4. 3D
`three` + `@react-three/fiber` + `@react-three/drei`, dynamically imported client-only after first paint.
- Hero "signal": soft glassy particle sculpture reacting to pointer + scroll (audio-reactive hook-point for a future voice demo).
- Story scene: same particle system flows form → phone → calendar → CRM across a pinned scroll section with captions.
- Budgets: 3D chunk ≤ 250 KB gz, `frameloop="demand"` when idle, DPR ≤ 1.5, pause offscreen.
- Fallback: static SVG/image when reduced motion, no WebGL, or `navigator.hardwareConcurrency ≤ 4` on mobile.
- Target Lighthouse mobile perf ≥ 85.

## 5. Intake form (`/{lang}/start`)
Six steps, 1–2 questions each, chips/radios, "Step X of Y", time estimate, answers kept across language switch
(sessionStorage only, stored as option codes).
1 Goal* · 2 Business (name*, website, industry*, team size*) · 3 Time sinks* + hours/week* + enquiries/week;
website branch (current site state, missing features) · 4 Tools* + customer channels · 5 Budget SEK band (optional,
"why I ask"), timeline*, decision maker*, sensitive data* · 6 Name*, email*, phone (optional), call language*, notes.
Thank-you: "I'll reply within 24 hours." Privacy line + link at submit.
- Transport: POST JSON to Cloudflare Worker (`workers/intake/`) with Turnstile token + honeypot. Worker verifies,
  inserts into Supabase `intake_submissions` (eu-north-1), computes brief (rough ROI = hours/week × 52 × SEK 450,
  fit score from volume / digital tools / timeline / budget / decision maker), emails Haisem (Resend EU or Brevo).
  Endpoint + keys via env; site reads `NEXT_PUBLIC_INTAKE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Until keys exist the form runs in "dry" mode: validates, shows success, logs payload to console in dev only.
- Analytics: PostHog EU, cookieless (`persistence: "memory"`), events `intake_opened`, `intake_step_{n}`,
  `intake_submitted`, no field values; disabled if key absent.
- `/privacy`: Art. 13 notice (controller, purposes, basis 6(1)(b), processors Cloudflare/Supabase/PostHog/email,
  EU hosting, 12-month retention without a deal, rights, IMY complaint) in EN + SV.
- Old Web3Forms contact form removed.

## 6. Images
Original screenshots restored where they show no client brand, customer data or private details; anonymised
covers (`public/projects/anonymized/`) otherwise. Slugs unchanged. WIP anonymisation text kept as
`docs/archive/2026-10-anonymization-wip.patch` (superseded by the 8 Oct rule change).

## 7. Testimonial
Re-encode 52 s 1080×1920 (24 MB) → 720×1280 H.264 + WebM, ≤ 6 MB each, poster PNG, `preload="none"`,
captions burned in + transcript text on page.

## 8. Verification
Per checkpoint: `npm run lint`, `npx tsc --noEmit`, `npm run build` (static export succeeds, both langs emitted),
browser checks at 375 px and 1280 px, both langs, both themes, reduced motion; Lighthouse mobile on home.
Checkpoints: (1) theme + i18n + content, (2) 3D, (3) work + testimonial + intake. Merge to main = deploy, Haisem's call.
