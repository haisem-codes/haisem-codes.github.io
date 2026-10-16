import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localHref } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { IntakeForm } from "@/components/intake/IntakeForm";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { intake } = getDictionary(lang);
  const title = `${intake.title} | Haisem N.`;
  return {
    title,
    description: intake.sub,
    alternates: {
      canonical: localHref(lang, "/start/"),
      languages: { en: "/en/start/", sv: "/sv/start/", "x-default": "/en/start/" },
    },
    openGraph: { title, description: intake.sub, url: localHref(lang, "/start/"), type: "website" },
  };
}

export default async function StartPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { intake } = getDictionary(lang);
  return (
    <main className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto grid max-w-6xl gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-12">
        <header className="lg:sticky lg:top-36 lg:col-span-5 lg:self-start">
          <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{intake.eyebrow}</p>
          <h1
            className="mt-4 font-display leading-[1.02] font-bold tracking-[-0.03em] text-balance text-text"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}
          >
            {intake.title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">{intake.sub}</p>
        </header>
        <div className="lg:col-span-7">
          <IntakeForm dict={intake} lang={lang} />
        </div>
      </div>
    </main>
  );
}
