import { test, expect } from "vitest";
import { initialTheme, nextTheme, THEME_COLOR } from "@/lib/theme";
import { tokens } from "@/lib/tokens";
test("first visit is light even if OS is dark", () => expect(initialTheme(null)).toBe("light"));
test("saved dark wins", () => expect(initialTheme("dark")).toBe("dark"));
test("garbage falls back to light", () => expect(initialTheme("purple")).toBe("light"));
test("toggle", () => { expect(nextTheme("light")).toBe("dark"); expect(nextTheme("dark")).toBe("light"); });
test("browser chrome colour matches the page bg", () => {
  expect(THEME_COLOR.light).toBe(tokens.light.bg);
  expect(THEME_COLOR.dark).toBe(tokens.night.bg);
});
