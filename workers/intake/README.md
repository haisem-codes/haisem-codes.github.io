# Intake Worker setup

Flow: site -> Turnstile verify -> Supabase insert -> Resend email brief.

1. **Supabase**: new project, region **eu-north-1 (Stockholm)**. Run `schema.sql` in the SQL editor. Copy the Project URL and the `service_role` key.
2. **Cloudflare Turnstile**: add site `haisem-codes.github.io` + `localhost`, invisible mode. Copy site key + secret.
3. **Resend**: sign up with haisem.work@gmail.com, create an API key (sends only to your own address from `onboarding@resend.dev`).
4. Deploy:
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
5. **Rate limit**: Cloudflare dashboard -> Security -> WAF -> rate limiting rule: path `/`, 10 requests / 1 min per IP -> block.
6. **PostHog**: EU cloud project, Settings -> "Discard client IP data" on, copy the project key.
7. **GitHub repo** -> Settings -> Variables: `NEXT_PUBLIC_INTAKE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`.
8. **DPAs**: accept for Supabase, Cloudflare, Resend, PostHog (links in each dashboard).
