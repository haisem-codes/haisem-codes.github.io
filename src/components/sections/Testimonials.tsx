"use client";

import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="What People Say" className="mb-16" />
      </div>

      <div
        className="flex gap-6 hover:[animation-play-state:paused]"
        style={{
          animation: "marquee 25s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </section>
  );
}
