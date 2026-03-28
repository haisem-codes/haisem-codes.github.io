"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navY = useTransform(scrollY, [0, 100], [-80, 0]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-5xl"
      style={{ opacity: navOpacity, y: navY }}
    >
      <nav className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-xl font-bold text-accent"
        >
          H
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-text-secondary hover:text-text transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-0.5 w-full bg-text rounded"
            animate={{
              rotate: mobileOpen ? 45 : 0,
              y: mobileOpen ? 8 : 0,
            }}
          />
          <motion.span
            className="block h-0.5 w-full bg-text rounded"
            animate={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <motion.span
            className="block h-0.5 w-full bg-text rounded"
            animate={{
              rotate: mobileOpen ? -45 : 0,
              y: mobileOpen ? -8 : 0,
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className={cn(
          "md:hidden glass rounded-2xl mt-2 overflow-hidden",
          !mobileOpen && "pointer-events-none"
        )}
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-text-secondary hover:text-text transition-colors duration-200 block py-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.header>
  );
}
