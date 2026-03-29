"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { skills } from "@/data/skills";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bentoStagger, bentoTile } from "@/lib/animations";
import { SoundWave } from "@/components/bento/SoundWave";
import { TypingCode } from "@/components/bento/TypingCode";
import { FillingChart } from "@/components/bento/FillingChart";
import { RotatingGear } from "@/components/bento/RotatingGear";
import { PulseRing } from "@/components/bento/PulseRing";

const NeuralDotsCanvas = dynamic(
  () =>
    import("@/components/bento/NeuralDotsCanvas").then(
      (m) => m.NeuralDotsCanvas
    ),
  { ssr: false }
);

const animationMap: Record<string, React.ComponentType> = {
  neural: NeuralDotsCanvas,
  wave: SoundWave,
  typing: TypingCode,
  chart: FillingChart,
  gear: RotatingGear,
  pulse: PulseRing,
};

export function SkillsBento() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="What I Do" className="mb-16" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[180px]"
          variants={bentoStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((skill) => {
            const Animation = animationMap[skill.animationType];
            return (
              <motion.div
                key={skill.id}
                variants={bentoTile}
                className={`${skill.colSpan === 2 ? "md:col-span-2" : ""} ${
                  skill.rowSpan === 2 ? "md:row-span-2" : ""
                }`}
              >
                <GlassCard className="h-full p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-text">
                      {skill.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      {skill.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center my-3">
                    <Animation />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-border text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
