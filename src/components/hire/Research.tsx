import type { Dictionary } from "@/i18n";

/** The peer-reviewed survey as a citation block, then research projects as hairline rows. */
export function Research({ dict }: { dict: Dictionary["hire"]["research"] }) {
  const { paper } = dict;
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
      <article className="rise self-start border-l-2 border-accent bg-accent-tint/55 p-6 sm:p-8 dark:bg-accent-tint/30">
        <p className="font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">{dict.paperLabel}</p>
        <h3 className="mt-4 font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance text-text">{paper.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-text">{paper.authors}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-text-secondary italic">{paper.venue}</p>
        <a
          href={`https://${paper.doi}`}
          className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {paper.doi}
          <span aria-hidden>↗</span>
        </a>
      </article>
      <div>
        <h3 className="font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">{dict.projectsLabel}</h3>
        <ul className="mt-4 border-t border-border">
          {dict.projects.map((p) => (
            <li key={p.title} className="rise border-b border-border py-5">
              <p className="text-base font-medium text-text">{p.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{p.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
