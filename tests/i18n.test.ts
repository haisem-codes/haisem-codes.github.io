import { describe, test, expect } from "vitest";
import { detectLocale, isLocale, swapLocaleInPath, otherLocale } from "@/i18n/config";

describe("detectLocale", () => {
  test("saved choice wins", () => expect(detectLocale("en", ["sv-SE"])).toBe("en"));
  test("ignores invalid saved value", () => expect(detectLocale("de", ["sv"])).toBe("sv"));
  test("first Swedish browser language", () => expect(detectLocale(null, ["sv-SE", "en"])).toBe("sv"));
  test("Swedish later in list still wins over non-supported", () => expect(detectLocale(null, ["de-DE", "sv"])).toBe("sv"));
  test("English first", () => expect(detectLocale(null, ["en-GB", "sv"])).toBe("en"));
  test("fallback en", () => expect(detectLocale(null, ["fr"])).toBe("en"));
  test("empty", () => expect(detectLocale(null, [])).toBe("en"));
});

test("isLocale", () => {
  expect(isLocale("sv")).toBe(true);
  expect(isLocale("se")).toBe(false);
});

test("otherLocale", () => expect(otherLocale("en")).toBe("sv"));

describe("swapLocaleInPath", () => {
  test("home", () => expect(swapLocaleInPath("/en/", "sv")).toBe("/sv/"));
  test("deep", () => expect(swapLocaleInPath("/sv/projects/coach/", "en")).toBe("/en/projects/coach/"));
  test("no locale prefix", () => expect(swapLocaleInPath("/", "sv")).toBe("/sv/"));
});
