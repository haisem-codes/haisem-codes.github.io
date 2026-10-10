"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { HangingBulb, BulbCord } from "@/components/layout/HangingBulb";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";

export function Navbar({ dict, lang }: { dict: Dictionary["nav"]; lang: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const isHome = pathname.replace(/\/+$/, "") === `/${lang}`;

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveId(null);
      return;
    }
    const els = ["services", "work", "about"].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setActiveId(els.find((el) => visible.has(el.id))?.id ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const isHire = pathname.replace(/\/+$/, "") === `/${lang}/hire`;

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

  const linkClass = "text-sm text-text-secondary hover:text-text transition-colors duration-200 border-b-2 border-transparent aria-[current]:text-text aria-[current]:border-accent";
  const surface = "nav-surface backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-200";

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-5xl">
      <nav className={cn(surface, "rounded-2xl px-6 py-3 flex items-center justify-between gap-4", scrolled && "nav-scrolled")}>
        <a href={localHref(lang, "/")} className="font-display text-xl font-bold text-accent tracking-tight">
          HN
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={localHref(lang, `/#${l.id}`)}
                onClick={(e) => handleAnchor(e, l.id)}
                aria-current={activeId === l.id ? "location" : undefined}
                className={linkClass}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={localHref(lang, "/hire/")} aria-current={isHire ? "page" : undefined} className={linkClass}>
              {dict.hire}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <BulbCord dict={dict} />
          <LanguageSwitch lang={lang} label={dict.switchTo} />
          <a
            href={localHref(lang, "/start/")}
            className="hidden sm:inline-flex text-sm font-medium px-4 py-1.5 rounded-full bg-button text-button-text hover:opacity-90 transition-opacity"
          >
            {dict.start}
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 ml-2 cursor-pointer"
            aria-label={dict.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <motion.span className="block h-0.5 w-full bg-text rounded" animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} />
            <motion.span className="block h-0.5 w-full bg-text rounded" animate={{ opacity: mobileOpen ? 0 : 1 }} />
            <motion.span className="block h-0.5 w-full bg-text rounded" animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} />
          </button>
        </div>
      </nav>

      <HangingBulb dict={dict} />

      <motion.div
        id="mobile-menu"
        inert={!mobileOpen}
        className={cn(surface, "md:hidden rounded-2xl mt-2 overflow-hidden", !mobileOpen && "pointer-events-none")}
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col p-4 gap-4">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={localHref(lang, `/#${l.id}`)}
                onClick={(e) => handleAnchor(e, l.id)}
                aria-current={activeId === l.id ? "location" : undefined}
                className={cn(linkClass, "block py-2")}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={localHref(lang, "/hire/")} aria-current={isHire ? "page" : undefined} className={cn(linkClass, "block py-2")}>
              {dict.hire}
            </a>
          </li>
          <li>
            <a href={localHref(lang, "/start/")} className="inline-flex text-sm font-medium px-4 py-2 rounded-full bg-button text-button-text">
              {dict.start}
            </a>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}
