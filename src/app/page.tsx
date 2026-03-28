import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Projects } from "@/components/sections/Projects";
import { SkillsBento } from "@/components/sections/SkillsBento";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechMarquee />
      <Projects />
      <SkillsBento />
      <Testimonials />
      <Contact />
    </main>
  );
}
