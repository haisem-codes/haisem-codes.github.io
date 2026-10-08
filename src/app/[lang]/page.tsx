import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Projects } from "@/components/sections/Projects";
import { SkillsBento } from "@/components/sections/SkillsBento";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechMarquee />
      <Projects />
      <SkillsBento />
      <Credentials />
      <Contact />
    </main>
  );
}
