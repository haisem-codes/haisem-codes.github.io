import { test, expect, describe } from "vitest";
import { startDemo, reply } from "@/lib/demo/engine";
import { SCRIPTS } from "@/lib/demo/scripts";

const en = SCRIPTS.en.salon, sv = SCRIPTS.sv.salon;

test("greeting", () => {
  const r = startDemo(en);
  expect(r.state.stage).toBe("start");
  expect(r.messages[0].text).toBe(en.greeting);
});

describe("happy path EN", () => {
  test("book → qualify → slots → booked + crm", () => {
    let r = reply(en, { stage: "start" }, "Can I book a cut on Saturday?");
    expect(r.state.stage).toBe("qualify");
    expect(r.messages[0].options).toEqual(en.qualifier.options);
    r = reply(en, r.state, en.qualifier.options[0]);
    expect(r.state.stage).toBe("slots");
    expect(r.messages.at(-1)!.options).toEqual(en.slots);
    r = reply(en, r.state, en.slots[1]);
    expect(r.state.stage).toBe("booked");
    expect(r.messages[0].text).toContain(en.slots[1]);
    expect(r.crm?.status).toContain(en.slots[1]);
  });
});

test("Swedish booking word", () => expect(reply(sv, { stage: "start" }, "Hej, kan jag boka?").state.stage).toBe("qualify"));
test("price question anytime keeps stage", () => {
  const r = reply(en, { stage: "slots", option: "x" }, "how much does it cost?");
  expect(r.state.stage).toBe("slots");
  expect(r.messages[0].text).toBe(en.price);
});
test("slot by hour only", () => expect(reply(en, { stage: "slots", option: "x" }, "13 please").state.slot).toBe(en.slots.find((s) => s.includes("13:"))));
test("unknown slot re-offers slots", () => {
  const r = reply(en, { stage: "slots", option: "x" }, "next year maybe");
  expect(r.state.stage).toBe("slots");
  expect(r.messages.at(-1)!.options).toEqual(en.slots);
});
test("free-text qualifier accepted (trimmed, capped)", () => {
  const r = reply(en, { stage: "qualify" }, "  " + "a".repeat(100) + "  ");
  expect(r.state.option!.length).toBeLessThanOrEqual(40);
  expect(r.state.stage).toBe("slots");
});
for (const bad of ["", "   ", "🙂🙂", "x".repeat(500), "<script>alert(1)</script>"])
  test(`never throws on ${JSON.stringify(bad).slice(0, 20)}`, () => {
    const r = reply(en, { stage: "start" }, bad);
    expect(r.messages.length).toBeGreaterThan(0);
    for (const m of r.messages) expect(m.text).not.toContain("<script>");
  });
test("after booked stays booked with afterBooked text", () => {
  const r = reply(en, { stage: "booked", option: "x", slot: en.slots[0] }, "thanks!");
  expect(r.state.stage).toBe("booked");
  expect(r.messages[0].text).toBe(en.afterBooked);
});
test("all scripts complete", () => {
  for (const lang of ["en", "sv"] as const)
    for (const v of ["salon", "clinic", "trades", "restaurant"] as const) {
      const s = SCRIPTS[lang][v];
      expect(s.slots.length).toBeGreaterThanOrEqual(3);
      expect(s.qualifier.options.length).toBeGreaterThanOrEqual(2);
      expect(s.confirm).toContain("{slot}");
      expect(s.crmStatus).toContain("{slot}");
    }
});

describe("fix round 1", () => {
  test("SV full happy path", () => {
    let r = reply(sv, { stage: "start" }, "Hej, kan jag boka?");
    r = reply(sv, r.state, sv.qualifier.options[0]);
    r = reply(sv, r.state, "kl. 13:00");
    expect(r.state.stage).toBe("booked");
    expect(r.messages[0].text).toContain(sv.slots[1]);
    expect(r.crm?.status).toContain(sv.slots[1]);
  });
  test("word-start matching", () => {
    expect(reply(en, { stage: "start" }, "coffee").messages[0].text).not.toBe(en.price);
    expect(reply(en, { stage: "start" }, "I want to reopen").messages[0].text).not.toBe(en.hours);
  });
  test("booked + price question answers price", () => {
    expect(reply(en, { stage: "booked", option: "x", slot: en.slots[0] }, "how much?").messages[0].text).toBe(en.price);
  });
  test("price in slots keeps chips", () => {
    expect(reply(en, { stage: "slots", option: "x" }, "price?").messages[0].options).toEqual(en.slots);
  });
  test("replacement patterns in option are literal", () => {
    const r = reply(en, { stage: "qualify" }, "$` $& $'");
    const b = reply(en, r.state, en.slots[0]);
    expect(b.messages[0].text).toContain("$` $& $'");
    expect(b.messages[0].text.length).toBeLessThan(en.confirm.length + 40);
  });
  test("html stripped from free-text option", () => {
    let r = reply(en, { stage: "qualify" }, "<img src=x onerror=alert(1)>");
    r = reply(en, r.state, en.slots[0]);
    expect(r.messages[0].text).not.toMatch(/[<>]/);
    expect(r.crm!.service).not.toMatch(/[<>]/);
  });
  test("start-stage gibberish falls back", () => {
    const r = reply(en, { stage: "start" }, "asdf");
    expect(r.state.stage).toBe("start");
    expect(r.messages[0].text).toBe(en.fallback);
  });
});

test("every suggestion chip leaves the start stage or answers", () => {
  for (const lang of ["en", "sv"] as const)
    for (const v of ["salon", "clinic", "trades", "restaurant"] as const) {
      const s = SCRIPTS[lang][v];
      for (const chip of s.suggestions) expect(reply(s, { stage: "start" }, chip).messages[0].text, `${lang}/${v}: ${chip}`).not.toBe(s.fallback);
    }
});
test("open-hours phrasings", () => {
  for (const q of ["Are you open?", "is it open today", "Är ni öppna?"])
    expect(reply(en, { stage: "start" }, q).messages[0].text).toBe(en.hours);
});

describe("start message that names a qualifier option", () => {
  test("EN 'Book a haircut' skips the qualifier", () => {
    const r = reply(en, { stage: "start" }, "Book a haircut");
    expect(r.state).toEqual({ stage: "slots", option: "Haircut" });
    expect(r.messages.at(-1)!.options).toEqual(en.slots);
  });
  test("SV 'Boka klippning' skips the qualifier", () => {
    const r = reply(sv, { stage: "start" }, "Boka klippning");
    expect(r.state).toEqual({ stage: "slots", option: "Klippning" });
    expect(r.messages.at(-1)!.options).toEqual(sv.slots);
  });
  test("option must match at a word start", () => {
    expect(reply(en, { stage: "start" }, "book a recolour").state.stage).toBe("qualify");
  });
  test("SV dotted slot times still match by hour", () => {
    const r = reply(sv, { stage: "slots", option: "Klippning" }, "13 tack");
    expect(r.state.slot).toBe(sv.slots[1]);
    expect(sv.slots.every((s) => /\d\.\d\d$/.test(s))).toBe(true);
  });
});
