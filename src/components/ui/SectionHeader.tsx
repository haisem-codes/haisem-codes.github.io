import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  kicker?: string;
  tone?: "default" | "night";
  size?: "default" | "compact";
  titleId?: string;
  className?: string;
}

export function SectionHeader({ index, eyebrow, title, accent, kicker, tone = "default", size = "default", titleId, className }: SectionHeaderProps) {
  const night = tone === "night";
  return (
    <header className={cn("max-w-3xl", className)}>
      <p className={cn("font-mono text-xs uppercase tracking-[0.18em]", night ? "text-white/60" : "text-text-secondary")}>
        {index} — {eyebrow}
      </p>
      <h2
        id={titleId}
        className={cn("mt-4 font-display font-bold leading-[1.02] tracking-[-0.03em] text-balance", night ? "text-white" : "text-text")}
        style={{ fontSize: size === "compact" ? "clamp(2.1rem, 3.8vw, 3.4rem)" : "clamp(2.5rem, 5vw, 4.5rem)" }}
      >
        {title}
        {accent && (
          <>
            <br />
            <span className={night ? "text-[#FFB547]" : "text-accent"}>{accent}</span>
          </>
        )}
      </h2>
      {kicker && (
        <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", night ? "text-white/70" : "text-text-secondary")}>{kicker}</p>
      )}
    </header>
  );
}
