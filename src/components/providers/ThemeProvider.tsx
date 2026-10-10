"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { initialTheme, nextTheme, THEME_KEY, type Theme } from "@/lib/theme";
import { readTier } from "@/lib/capability";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const switching = useRef(false);

  useEffect(() => {
    try {
      setTheme(initialTheme(localStorage.getItem(THEME_KEY)));
    } catch {}
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      if (switching.current) return;
      switching.current = true;
      const next = nextTheme(theme);
      const html = document.documentElement;
      // colour transitions would smear the reveal, so the new theme lands in one frame
      html.classList.add("theme-switching");
      const settle = () =>
        requestAnimationFrame(() => {
          html.classList.remove("theme-switching");
          switching.current = false;
        });
      const apply = () => {
        flushSync(() => setTheme(next));
        html.classList.toggle("dark", next === "dark");
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {}
      };

      if (typeof document.startViewTransition !== "function" || readTier() === "static") {
        apply();
        settle();
        return;
      }

      const x = origin?.x ?? innerWidth / 2;
      const y = origin?.y ?? 0;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      html.style.setProperty("--vt-x", `${x}px`);
      html.style.setProperty("--vt-y", `${y}px`);
      html.style.setProperty("--vt-r", `${r}px`);
      document.startViewTransition(apply).finished.finally(settle);
    },
    [theme],
  );

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
