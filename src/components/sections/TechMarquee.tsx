"use client";

import { techStackRow1, techStackRow2 } from "@/data/techStack";

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof techStackRow1;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="group flex overflow-hidden">
      <div
        className="flex gap-8 py-4 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 30s linear infinite`,
          animationPlayState: "inherit",
        }}
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2 text-sm text-text-secondary/40 hover:text-text transition-all duration-200 hover:scale-110 select-none"
          >
            <span className="w-5 h-5 rounded bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">
              {tech.name[0]}
            </span>
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      className="py-12 border-y border-border overflow-hidden"
      style={{ animationPlayState: "running" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.animationPlayState = "paused";
        e.currentTarget.querySelectorAll<HTMLDivElement>("[style*=animation]").forEach(
          (el) => (el.style.animationPlayState = "paused")
        );
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelectorAll<HTMLDivElement>("[style*=animation]").forEach(
          (el) => (el.style.animationPlayState = "running")
        );
      }}
    >
      <MarqueeRow items={techStackRow1} />
      <MarqueeRow items={techStackRow2} reverse />
    </section>
  );
}
