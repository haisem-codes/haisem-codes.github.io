# Intake Worker setup

Flow: site -> Turnstile verify -> Supabase insert -> Resend email brief.

1. **DPAs first**: accept the DPA for Supabase, Cloudflare, Resend and PostHog (links in each dashboard) before going live, i.e. before setting `NEXT_PUBLIC_INTAKE_URL`.
2. **Supabase**: new project, region **eu-north-1 (Stockholm)**. Enable `pg_cron` in Dashboard -> Database -> Extensions, then run `schema.sql` in the SQL editor. Check the retention job with `select * from cron.job;`. Copy the Project URL and the `service_role` key.
3. **Cloudflare Turnstile**: add site `haisem-codes.github.io` + `localhost`, invisible mode. Copy site key + secret.
4. **Resend**: sign up with haisem.work@gmail.com, create an API key. Verify a sending domain in Resend's **EU region** and set `NOTIFY_FROM` in `wrangler.toml` to a sender on it. The default `onboarding@resend.dev` sender processes data in the US (consistent with the privacy notice: Resend may process outside the EU under SCCs).
5. Deploy:
   ```
   cd workers/intake
   npx wrangler login
   npx wrangler secret put TURNSTILE_SECRET
   npx wrangler secret put SUPABASE_URL
   npx wrangler secret put SUPABASE_SERVICE_KEY
   npx wrangler secret put RESEND_API_KEY
   npx wrangler deploy
   ```
   Note the `workers.dev` URL.
6. **Rate limit**: handled in code by the Workers Rate Limiting binding `INTAKE_LIMITER` (5 requests / 60 s per IP, declared in `wrangler.toml`; WAF rules do not cover `*.workers.dev`). Change `namespace_id` if it collides with another limiter in your account.
7. **PostHog**: EU cloud project, Settings -> "Discard client IP data" on, copy the project key.
8. **GitHub repo** -> Settings -> Variables: `NEXT_PUBLIC_INTAKE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`.
