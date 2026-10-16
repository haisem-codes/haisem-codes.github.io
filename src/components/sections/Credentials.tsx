import type { Dictionary } from "@/i18n";

/** Education as hairline rows: period, what and where, then the detail. */
export function Credentials({ dict }: { dict: Dictionary["hire"]["credentials"] }) {
  return (
    <ul className="border-t border-border">
      {dict.items.map((c) => (
        <li key={c.title} className="rise grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-1 border-b border-border py-5 sm:grid-cols-[8rem_1fr_auto]">
          <span className="font-mono text-xs leading-6 text-accent tabular-nums">{c.period}</span>
          <span>
            <span className="block text-base leading-6 font-medium text-text">{c.title}</span>
            <span className="block text-sm leading-6 text-text-secondary">{c.where}</span>
          </span>
          <span className="col-start-2 text-sm leading-6 text-text-secondary sm:col-start-3 sm:text-right">{c.detail}</span>
        </li>
      ))}
    </ul>
  );
}
