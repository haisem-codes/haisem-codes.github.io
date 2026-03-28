"use client";

import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative flex-shrink-0 w-80 p-6 rounded-2xl bg-bg-card border border-border group">
      {/* Shimmer border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-accent-glow), transparent)",
          backgroundSize: "200% 100%",
          animation: "gradient-shift 3s linear infinite",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          borderRadius: "1rem",
        }}
      />

      <p className="text-sm text-text-secondary leading-relaxed italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
          {testimonial.author[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-text">{testimonial.author}</p>
          <p className="text-xs text-text-secondary">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
