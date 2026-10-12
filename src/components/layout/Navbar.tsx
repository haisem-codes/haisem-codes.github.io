"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { BulbCord } from "@/components/layout/BulbCord";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";

const HangingBulb = dynamic(() => import("@/components/layout/HangingBulb").then((mod) => mod.HangingBulb), { ssr: false });

const RETRACT_AT = 80;

function useScrollState() {
  const [state, setState] = useState({ scrolled: false, retracted: false });
  useEffect(() => {
    const onScroll = () =>
      setState((s) => {
        const scrolled = scrollY > 8;
        const retracted = s.retracted ? scrollY > RETRACT_AT / 2 : scrollY > RETRACT_AT;
        return s.scrolled === scrolled && s.retracted === retracted ? s : { scrolled, retracted };
      });
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return state;
}

function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return desktop;
}

export function Navbar({ dict, lang }: { dict: Dictionary["nav"]; lang: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? "";
  const isHome = pathname.replace(/\/+$/, "") === `/${lang}`;
  const isHire = pathname.replace(/\/+$/, "") === `/${lang}/hire`;
  const { scrolled, retracted } = useScrollState();
  const desktop = useDesktop();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

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

  const linkClass = "whitespace-nowrap text-sm text-text-secondary hover:text-text transition-colors duration-200 border-b-2 border-transparent aria-[current]:text-text aria-[current]:border-accent";
  const surface = "nav-surface backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-200";
  const bar = "absolute left-1/2 h-0.5 w-6 -translate-x-1/2 rounded bg-text transition-[transform,opacity] duration-300 ease-[var(--ease-silk)]";

  return (
    <header className="fixed top-4 right-4 left-4 z-50 mx-auto max-w-6xl">
      <nav className={cn(surface, "flex h-16 items-center justify-between gap-4 rounded-2xl pr-3 pl-6", scrolled && "nav-scrolled")}>
        <a href={localHref(lang, "/")} className="font-display text-xl font-bold tracking-tight text-accent">
          HN
        </a>

        <ul className="hidden items-center gap-5 md:flex lg:gap-8">
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
          <BulbCord dict={dict} retracted={retracted} />
          <LanguageSwitch lang={lang} label={dict.switchTo} />
          <a
            href={localHref(lang, "/start/")}
            className="hidden whitespace-nowrap rounded-full bg-button px-4 py-2 text-sm font-medium text-button-text transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {dict.start}
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="group relative h-11 w-11 cursor-pointer md:hidden"
            aria-label={dict.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden className={cn(bar, "top-[15px] group-aria-expanded:translate-y-[6px] group-aria-expanded:rotate-45")} />
            <span aria-hidden className={cn(bar, "top-[21px] group-aria-expanded:opacity-0")} />
            <span aria-hidden className={cn(bar, "top-[27px] group-aria-expanded:-translate-y-[6px] group-aria-expanded:-rotate-45")} />
          </button>
        </div>
      </nav>

      {desktop && <HangingBulb dict={dict} retracted={retracted} />}

      <div
        id="mobile-menu"
        inert={!mobileOpen}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-silk)] md:hidden",
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className={cn(surface, "mt-2 min-h-0 overflow-hidden rounded-2xl")}>
          <ul className="flex flex-col gap-4 p-4">
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
              <a href={localHref(lang, "/start/")} className="inline-flex rounded-full bg-button px-4 py-2 text-sm font-medium text-button-text">
                {dict.start}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
