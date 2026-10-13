import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Services } from "@/components/sections/Services";
import { ControlRoom } from "@/components/sections/ControlRoom";
import { JakeCase } from "@/components/sections/JakeCase";
import { Work } from "@/components/sections/Work";
import { HowIWork } from "@/components/sections/HowIWork";
import { About } from "@/components/sections/About";
import { ContactCta } from "@/components/sections/ContactCta";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <main>
      <Hero dict={d.hero} phone={d.demoPhone} lang={lang} />
      <ProofStrip dict={d.proof} lang={lang} />
      <JakeCase dict={d.jake} />
      <Services dict={d.services} lang={lang} />
      <ControlRoom dict={d.controlRoom} story={d.story} lang={lang} />
      <Work dict={d.work} lang={lang} />
      <HowIWork dict={d.how} lang={lang} />
      <About dict={d.about} lang={lang} />
      <ContactCta dict={d.cta} lang={lang} />
    </main>
  );
}
