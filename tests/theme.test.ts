import { test, expect } from "vitest";
import { initialTheme, nextTheme } from "@/lib/theme";
test("first visit is light even if OS is dark", () => expect(initialTheme(null)).toBe("light"));
test("saved dark wins", () => expect(initialTheme("dark")).toBe("dark"));
test("garbage falls back to light", () => expect(initialTheme("purple")).toBe("light"));
test("toggle", () => { expect(nextTheme("light")).toBe("dark"); expect(nextTheme("dark")).toBe("light"); });
