import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localHref } from "@/i18n/config";
import { getDictionary } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { privacy } = getDictionary(lang);
  const title = `${privacy.title} | Haisem Naeem`;
  return {
    title,
    description: privacy.description,
    alternates: {
      canonical: localHref(lang, "/privacy/"),
      languages: { en: "/en/privacy/", sv: "/sv/privacy/", "x-default": "/en/privacy/" },
    },
    openGraph: { title, description: privacy.description, url: localHref(lang, "/privacy/"), type: "website" },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { privacy } = getDictionary(lang);
  return (
    <main className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-text sm:text-6xl">{privacy.title}</h1>
        <p className="mt-4 text-sm text-text-secondary">{privacy.updated}</p>
        <div className="mt-12 space-y-10">
          {privacy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">{s.h}</h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary sm:text-lg">{s.p}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
