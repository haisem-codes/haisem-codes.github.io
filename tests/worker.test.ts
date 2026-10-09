import { test, expect, vi, beforeEach } from "vitest";
import worker from "../workers/intake/src/index";

const env = { TURNSTILE_SECRET: "s", SUPABASE_URL: "https://db.example", SUPABASE_SERVICE_KEY: "k", RESEND_API_KEY: "r", NOTIFY_TO: "me@example.com", ALLOWED_ORIGINS: "https://haisem-codes.github.io,http://localhost:3000" };
const answers = { goal: "admin_time", businessName: "Bygg AB", website: "", industry: "trades_construction", teamSize: "2to5", tasks: ["quotes_invoices"], hours: "5to10", websiteNeeds: [], tools: ["fortnox"], channels: ["email"], timeline: "1to3m", decision: "me", sensitive: "no", name: "Erik", email: "erik@example.se", phone: "", callLang: "en", notes: "", lang: "en", company_url_hp: "" };
const req = (body: unknown, origin = "https://haisem-codes.github.io") =>
  new Request("https://intake.example/", { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body) });

let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  fetchMock = vi.fn(async (url: string) => {
    if (url.includes("turnstile")) return Response.json({ success: true });
    return new Response(null, { status: 201 });
  });
  vi.stubGlobal("fetch", fetchMock);
});

test("preflight allowed origin", async () => {
  const r = await worker.fetch(new Request("https://intake.example/", { method: "OPTIONS", headers: { origin: "http://localhost:3000" } }), env);
  expect(r.status).toBe(204);
  expect(r.headers.get("access-control-allow-origin")).toBe("http://localhost:3000");
});
test("rejects other origins", async () => expect((await worker.fetch(req({ answers, turnstileToken: "t" }, "https://evil.example"), env)).status).toBe(403));
test("rejects invalid answers", async () => expect((await worker.fetch(req({ answers: { ...answers, email: "x" }, turnstileToken: "t" }), env)).status).toBe(400));
test("rejects failed turnstile", async () => {
  fetchMock.mockImplementationOnce(async () => Response.json({ success: false }));
  expect((await worker.fetch(req({ answers, turnstileToken: "t" }), env)).status).toBe(403);
});
test("stores and notifies", async () => {
  const r = await worker.fetch(req({ answers, turnstileToken: "t" }), env);
  expect(r.status).toBe(200);
  const urls = fetchMock.mock.calls.map((c) => String(c[0]));
  expect(urls.some((u) => u.startsWith("https://db.example/rest/v1/intake_submissions"))).toBe(true);
  expect(urls.some((u) => u === "https://api.resend.com/emails")).toBe(true);
});
test("db failure returns 502", async () => {
  fetchMock.mockImplementation(async (url: string) => url.includes("turnstile") ? Response.json({ success: true }) : new Response("no", { status: 500 }));
  expect((await worker.fetch(req({ answers, turnstileToken: "t" }), env)).status).toBe(502);
});

const dbCalls = () => fetchMock.mock.calls.filter((c) => String(c[0]).includes("db.example"));

test("honeypot gets fake 200 and nothing is stored", async () => {
  const r = await worker.fetch(req({ answers: { ...answers, company_url_hp: "x" }, turnstileToken: "t" }), env);
  expect(r.status).toBe(200);
  expect(fetchMock).not.toHaveBeenCalled();
});
test("oversized chunked body without content-length is 413", async () => {
  const big = new Request("https://intake.example/", { method: "POST", headers: { origin: "https://haisem-codes.github.io" }, body: new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode("x".repeat(30_000))); c.close(); } }), duplex: "half" } as RequestInit);
  expect((await worker.fetch(big, env)).status).toBe(413);
});
test("turnstile fetch throwing returns 502 with CORS", async () => {
  fetchMock.mockImplementationOnce(async () => { throw new Error("net"); });
  const r = await worker.fetch(req({ answers, turnstileToken: "t" }), env);
  expect(r.status).toBe(502);
  expect(r.headers.get("access-control-allow-origin")).toBe("https://haisem-codes.github.io");
});
test("resend non-2xx still returns 200", async () => {
  fetchMock.mockImplementation(async (url: string) => url.includes("turnstile") ? Response.json({ success: true }) : url.includes("resend") ? new Response("no", { status: 422 }) : new Response(null, { status: 201 }));
  expect((await worker.fetch(req({ answers, turnstileToken: "t" }), env)).status).toBe(200);
});
test("rate limiter denial returns 429 with CORS", async () => {
  const limited = { ...env, INTAKE_LIMITER: { limit: async () => ({ success: false }) } };
  const r = await worker.fetch(req({ answers, turnstileToken: "t" }), limited);
  expect(r.status).toBe(429);
  expect(r.headers.get("access-control-allow-origin")).toBe("https://haisem-codes.github.io");
});
test("stored body has no honeypot field and subject has no CRLF", async () => {
  await worker.fetch(req({ answers: { ...answers, businessName: "Bygg\r\nBcc: x" }, turnstileToken: "t" }), env);
  const stored = JSON.parse(String(dbCalls()[0][1].body));
  expect(stored.answers).not.toHaveProperty("company_url_hp");
  const mail = fetchMock.mock.calls.find((c) => String(c[0]).includes("resend"))!;
  expect(JSON.parse(String(mail[1].body)).subject).not.toMatch(/[\r\n]/);
});
