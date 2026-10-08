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
  const title = `${intake.title} | Haisem Naeem`;
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
    <main className="px-4 pt-32 pb-24 sm:px-6 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-2xl">
        <h1 className="px-1 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-text sm:text-6xl">
          {intake.title}
        </h1>
        <p className="mt-5 px-1 text-lg leading-relaxed text-text-secondary">{intake.sub}</p>
        <div className="mt-10 sm:mt-14">
          <IntakeForm dict={intake} lang={lang} />
        </div>
      </div>
    </main>
  );
}
