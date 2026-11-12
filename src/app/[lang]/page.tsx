import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ClientStories } from "@/components/sections/ClientStories";
import { Work } from "@/components/sections/Work";
import { AfterHours } from "@/components/sections/AfterHours";
import { Story } from "@/components/sections/Story";
import { FooterMarquee } from "@/components/sections/FooterMarquee";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <main>
      <Hero dict={d.hero} lang={lang} />
      <Story dict={d.story} />
      <ProofStrip dict={d.proof} />
      <ClientStories jake={d.jake} derin={d.derin} />
      <Work dict={d.work} lang={lang} />
      <AfterHours dict={d.afterHours} />
      <FooterMarquee dict={d.marquee} lang={lang} />
    </main>
  );
}
