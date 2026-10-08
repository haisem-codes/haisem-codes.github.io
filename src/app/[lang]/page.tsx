import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Services } from "@/components/sections/Services";
import { HowIWork } from "@/components/sections/HowIWork";
import { About } from "@/components/sections/About";
import { ContactCta } from "@/components/sections/ContactCta";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <main>
      <Hero dict={d.hero} lang={lang} />
      <ProofStrip dict={d.proof} lang={lang} />
      <Services dict={d.services} lang={lang} />
      <HowIWork dict={d.how} lang={lang} />
      <About dict={d.about} lang={lang} />
      <ContactCta dict={d.cta} lang={lang} />
    </main>
  );
}
