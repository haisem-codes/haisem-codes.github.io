import { validateIntake } from "../../../src/lib/intake/validate";
import { scoreIntake, buildBrief } from "../../../src/lib/intake/score";

export interface Env { TURNSTILE_SECRET: string; SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string; RESEND_API_KEY: string; NOTIFY_TO: string; ALLOWED_ORIGINS: string; NOTIFY_FROM?: string; INTAKE_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> } }

const MAX_BYTES = 20_000;

function cors(origin: string) {
  return { "access-control-allow-origin": origin, "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "content-type", vary: "origin" };
}

async function readLimited(req: Request): Promise<string | null> {
  if (!req.body) return "";
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) { await reader.cancel(); return null; }
    chunks.push(value);
  }
  const buf = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) { buf.set(c, off); off += c.byteLength; }
  return new TextDecoder().decode(buf);
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get("origin") ?? "";
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
    if (!allowed.includes(origin)) return new Response("forbidden", { status: 403 });
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (req.method !== "POST") return new Response("method", { status: 405, headers: h });

    try {
      const ip = req.headers.get("cf-connecting-ip") ?? "";
      if (env.INTAKE_LIMITER && !(await env.INTAKE_LIMITER.limit({ key: ip || "unknown" })).success) {
        return new Response("rate limited", { status: 429, headers: h });
      }

      const text = await readLimited(req);
      if (text === null) return new Response("too large", { status: 413, headers: h });
      let body: { answers?: unknown; turnstileToken?: string };
      try { body = JSON.parse(text); } catch { return new Response("bad json", { status: 400, headers: h }); }
      if (!body || typeof body !== "object") return new Response("bad json", { status: 400, headers: h });

      const raw = body.answers as { company_url_hp?: unknown } | null | undefined;
      if (raw && typeof raw === "object" && raw.company_url_hp !== undefined && raw.company_url_hp !== "") {
        return Response.json({ ok: true }, { headers: h });
      }

      const v = validateIntake(body.answers);
      if (!v.ok) return Response.json({ errors: v.errors }, { status: 400, headers: h });

      const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: typeof body.turnstileToken === "string" ? body.turnstileToken : "", remoteip: ip }),
        signal: AbortSignal.timeout(5000),
      });
      const ts = (await tsRes.json().catch(() => null)) as { success?: boolean } | null;
      if (!ts?.success) return new Response("captcha", { status: 403, headers: h });

      const a = v.value;
      const s = scoreIntake(a);
      const { company_url_hp: _hp, ...answers } = a;
      const db = await fetch(`${env.SUPABASE_URL}/rest/v1/intake_submissions`, {
        method: "POST",
        headers: { apikey: env.SUPABASE_SERVICE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`, "content-type": "application/json", prefer: "return=minimal" },
        body: JSON.stringify({ lang: a.lang, business_name: a.businessName, email: a.email, answers, score: s.score, tier: s.tier, annual_sek: s.annualSek }),
        signal: AbortSignal.timeout(5000),
      });
      if (!db.ok) return new Response("store failed", { status: 502, headers: h });

      const safeName = a.businessName.replace(/[\u0000-\u001f\u007f]/g, " ");
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
          body: JSON.stringify({ from: env.NOTIFY_FROM ?? "Intake <onboarding@resend.dev>", to: [env.NOTIFY_TO], reply_to: a.email, subject: `[${s.tier.toUpperCase()}] ${safeName} — new intake`, text: buildBrief(a) }),
          signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) console.error(`resend status ${res.status}`);
      } catch {
        console.error("resend request failed");
      }

      return Response.json({ ok: true }, { headers: h });
    } catch {
      return new Response("upstream error", { status: 502, headers: h });
    }
  },
};
