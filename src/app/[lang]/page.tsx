import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Hero } from "@/components/sections/Hero";
import { ClientStories } from "@/components/sections/ClientStories";
import { Work } from "@/components/sections/Work";
import { AfterHours } from "@/components/sections/AfterHours";
import { Story } from "@/components/sections/Story";
import { Now } from "@/components/sections/Now";
import { Goals } from "@/components/sections/Goals";
import { FooterMarquee } from "@/components/sections/FooterMarquee";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <main>
      <Hero dict={d.hero} lang={lang} />
      <Story dict={d.story} />
      <Work dict={d.work} lang={lang} />
      <AfterHours dict={d.afterHours} />
      <ClientStories jake={d.jake} derin={d.derin} />
      <Now dict={d.now} />
      <Goals dict={d.goals} />
      <FooterMarquee dict={d.marquee} />
    </main>
  );
}
