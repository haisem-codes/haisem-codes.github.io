"use client";
import { usePathname } from "next/navigation";
import { otherLocale, swapLocaleInPath, type Locale } from "@/i18n/config";

export function LanguageSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}/`;
  const to = otherLocale(lang);
  return (
    <a
      href={swapLocaleInPath(pathname, to)}
      hrefLang={to}
      lang={to}
      onClick={() => { try { localStorage.setItem("lang", to); } catch {} }}
      className="text-sm font-medium px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
    >
      {label}
    </a>
  );
}
