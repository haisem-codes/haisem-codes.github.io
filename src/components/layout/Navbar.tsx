"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";

export function Navbar({ dict, lang }: { dict: Dictionary["nav"]; lang: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const isHome = pathname.replace(/\/+$/, "") === `/${lang}`;

  const links = [
    { id: "services", label: dict.services },
    { id: "work", label: dict.work },
    { id: "about", label: dict.about },
  ];

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMobileOpen(false);
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const linkClass = "text-sm text-text-secondary hover:text-text transition-colors duration-200";

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-5xl">
      <nav className="glass rounded-2xl px-6 py-3 flex items-center justify-between gap-4">
        <a href={localHref(lang, "/")} className="font-display text-xl font-bold text-accent tracking-tight">
          HN
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <a href={localHref(lang, `/#${l.id}`)} onClick={(e) => handleAnchor(e, l.id)} className={linkClass}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={localHref(lang, "/hire/")} className={linkClass}>
              {dict.hire}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle label={dict.theme} />
          <LanguageSwitch lang={lang} label={dict.switchTo} />
          <a
            href={localHref(lang, "/start/")}
            className="hidden sm:inline-flex text-sm font-medium px-4 py-1.5 rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            {dict.start}
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 ml-2 cursor-pointer"
            aria-label={dict.menu}
            aria-expanded={mobileOpen}
          >
            <motion.span className="block h-0.5 w-full bg-text rounded" animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} />
            <motion.span className="block h-0.5 w-full bg-text rounded" animate={{ opacity: mobileOpen ? 0 : 1 }} />
            <motion.span className="block h-0.5 w-full bg-text rounded" animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} />
          </button>
        </div>
      </nav>

      <motion.div
        className={cn("md:hidden glass rounded-2xl mt-2 overflow-hidden", !mobileOpen && "pointer-events-none")}
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col p-4 gap-4">
          {links.map((l) => (
            <li key={l.id}>
              <a href={localHref(lang, `/#${l.id}`)} onClick={(e) => handleAnchor(e, l.id)} className={cn(linkClass, "block py-2")}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={localHref(lang, "/hire/")} className={cn(linkClass, "block py-2")}>
              {dict.hire}
            </a>
          </li>
          <li>
            <a href={localHref(lang, "/start/")} className="inline-flex text-sm font-medium px-4 py-2 rounded-full bg-accent text-white">
              {dict.start}
            </a>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}
