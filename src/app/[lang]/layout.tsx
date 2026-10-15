import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsInit } from "@/components/analytics/AnalyticsInit";
import { CursorLoader } from "@/components/ui/CursorLoader";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { THEME_COLOR } from "@/lib/theme";
import { revealBootScript } from "@/lib/reveal";
import { staticTierBootScript } from "@/lib/capability";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", preload: false });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR.light,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    metadataBase: new URL("https://haisem-codes.github.io"),
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: `/${lang}/`, languages: { en: "/en/", sv: "/sv/", "x-default": "/en/" } },
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
    manifest: "/site.webmanifest",
    openGraph: { title: d.meta.title, description: d.meta.description, type: "website", locale: lang === "sv" ? "sv_SE" : "en_GB" },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang as Locale);
  return (
    <html lang={lang} className={`${inter.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${revealBootScript}${staticTierBootScript}try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark");addEventListener("DOMContentLoaded",function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_COLOR.dark}")})}}catch(e){}` }} />
      </head>
      <body className="bg-bg text-text antialiased">
        <AnalyticsInit />
        <ThemeProvider>
          <MotionProvider>
            <LenisProvider>
              <Navbar dict={d.nav} lang={lang as Locale} />
              {children}
              <Footer dict={d.footer} nav={d.nav} lang={lang as Locale} />
              <CursorLoader dict={d.cursor} />
            </LenisProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
