import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-space-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", preload: false });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
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
    alternates: { canonical: `/${lang}/`, languages: { en: "/en/", sv: "/sv/" } },
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
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}` }} />
      </head>
      <body className="bg-bg text-text antialiased">
        <ThemeProvider>
          <LenisProvider>
            <Navbar dict={d.nav} lang={lang as Locale} />
            {children}
            <Footer dict={d.footer} lang={lang as Locale} />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
