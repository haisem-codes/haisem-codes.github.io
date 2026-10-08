"use client";

import { useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle({ label }: { label: string }) {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => {
        if (buttonRef.current) toggleTheme(buttonRef.current.getBoundingClientRect());
      }}
      className="w-9 h-9 rounded-full border border-border hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-text-secondary cursor-pointer"
      aria-label={label}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        )}
      </svg>
    </button>
  );
}
