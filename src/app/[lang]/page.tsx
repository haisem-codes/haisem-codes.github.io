import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Services } from "@/components/sections/Services";
import { ControlRoom } from "@/components/sections/ControlRoom";
import { JakeCase } from "@/components/sections/JakeCase";
import { Work } from "@/components/sections/Work";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { HowIWork } from "@/components/sections/HowIWork";
import { About } from "@/components/sections/About";
import { ContactCta } from "@/components/sections/ContactCta";
import { FooterMarquee } from "@/components/sections/FooterMarquee";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <main>
      <Hero dict={d.hero} phone={d.demoPhone} lang={lang} />
      <ProofStrip dict={d.proof} />
      <JakeCase dict={d.jake} />
      <Services dict={d.services} lang={lang} />
      <ControlRoom dict={d.controlRoom} story={d.story} lang={lang} />
      <Work dict={d.work} lang={lang} />
      <BeforeAfter dict={d.beforeAfter} />
      <HowIWork dict={d.how} lang={lang} />
      <About dict={d.about} lang={lang} />
      <ContactCta dict={d.cta} lang={lang} />
      <FooterMarquee dict={d.marquee} lang={lang} />
    </main>
  );
}
