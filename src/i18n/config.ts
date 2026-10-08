export const locales = ["en", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export function otherLocale(l: Locale): Locale {
  return l === "en" ? "sv" : "en";
}

export function detectLocale(saved: string | null, languages: readonly string[]): Locale {
  if (saved && isLocale(saved)) return saved;
  for (const lang of languages) {
    const base = lang.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function swapLocaleInPath(path: string, to: Locale): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) parts[0] = to;
  else parts.unshift(to);
  return `/${parts.join("/")}/`;
}
