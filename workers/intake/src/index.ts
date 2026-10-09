import { validateIntake } from "../../../src/lib/intake/validate";
import { scoreIntake, buildBrief } from "../../../src/lib/intake/score";

export interface Env { TURNSTILE_SECRET: string; SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; RESEND_API_KEY: string; NOTIFY_TO: string; ALLOWED_ORIGINS: string }

function cors(origin: string) {
  return { "access-control-allow-origin": origin, "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "content-type", vary: "origin" };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get("origin") ?? "";
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
    if (!allowed.includes(origin)) return new Response("forbidden", { status: 403 });
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (req.method !== "POST") return new Response("method", { status: 405, headers: h });
    if (Number(req.headers.get("content-length") ?? 0) > 20_000) return new Response("too large", { status: 413, headers: h });

    let body: { answers?: unknown; turnstileToken?: string };
    try { body = await req.json(); } catch { return new Response("bad json", { status: 400, headers: h }); }

    const v = validateIntake(body.answers);
    if (!v.ok) return Response.json({ errors: v.errors }, { status: 400, headers: h });

    const ts = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: body.turnstileToken ?? "", remoteip: req.headers.get("cf-connecting-ip") ?? "" }),
    }).then((r) => r.json() as Promise<{ success: boolean }>);
    if (!ts.success) return new Response("captcha", { status: 403, headers: h });

    const a = v.value;
    const s = scoreIntake(a);
    const { company_url_hp: _hp, ...answers } = a;
    const db = await fetch(`${env.SUPABASE_URL}/rest/v1/intake_submissions`, {
      method: "POST",
      headers: { apikey: env.SUPABASE_SERVICE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`, "content-type": "application/json", prefer: "return=minimal" },
      body: JSON.stringify({ lang: a.lang, business_name: a.businessName, email: a.email, answers, score: s.score, tier: s.tier, annual_sek: s.annualSek }),
    });
    if (!db.ok) return new Response("store failed", { status: 502, headers: h });

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: "Intake <onboarding@resend.dev>", to: [env.NOTIFY_TO], reply_to: a.email, subject: `[${s.tier.toUpperCase()}] ${a.businessName} — new intake`, text: buildBrief(a) }),
    }).catch(() => undefined);

    return Response.json({ ok: true }, { headers: h });
  },
};
