"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { personal } from "@/data/personal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [3, -3]);
  const rotateY = useTransform(mouseX, [-150, 150], [-3, 3]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Photo with parallax tilt */}
        <ScrollReveal>
          <motion.div
            className="relative w-full max-w-xs mx-auto aspect-square rounded-2xl overflow-hidden border border-border cursor-pointer bg-gradient-to-br from-[#2A2A2E] to-[#1A1A1E]"
            style={{
              perspective: 1000,
              rotateX,
              rotateY,
            }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            transition={{ type: "tween", duration: 0.1 }}
          >
            <Image
              src="/haisem.webp"
              alt="Haisem Naeem"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </ScrollReveal>

        {/* Bio text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {personal.bio.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeInUp}
              className="text-text-secondary leading-relaxed mb-4"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {personal.stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-bg-card border border-border"
              >
                <div className="font-display text-2xl font-bold text-accent">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
