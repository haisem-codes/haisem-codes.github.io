"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (rect: DOMRect) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [overlay, setOverlay] = useState<{
    x: number;
    y: number;
    to: Theme;
  } | null>(null);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(saved);
    }
  }, []);

  const toggleTheme = useCallback(
    (rect: DOMRect) => {
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const newTheme: Theme = theme === "dark" ? "light" : "dark";

      // Show overlay with clip-path animation
      setOverlay({ x, y, to: newTheme });

      // After animation completes, commit the theme
      setTimeout(() => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(newTheme);
        setOverlay(null);
      }, 600);
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}

      {/* Clip-path reveal overlay */}
      {overlay && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 99999,
            backgroundColor:
              overlay.to === "dark" ? "#0A0A0B" : "#FAFAF8",
            animation: "clip-reveal 0.6s ease-in-out forwards",
            // @ts-expect-error CSS custom properties
            "--cx": `${overlay.x}px`,
            "--cy": `${overlay.y}px`,
          }}
        />
      )}
    </ThemeContext.Provider>
  );
}
