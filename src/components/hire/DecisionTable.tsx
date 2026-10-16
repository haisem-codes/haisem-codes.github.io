import type { Dictionary } from "@/i18n";

/**
 * A real table on wide screens; on phones each row stacks into a card with its column labels.
 * Explicit roles keep the table semantics once CSS changes the display of the rows.
 */
export function DecisionTable({ dict }: { dict: Dictionary["hire"]["decisions"] }) {
  const { columns: c } = dict;
  return (
    <table role="table" className="decisions w-full border-t border-border text-left">
      <thead role="rowgroup" className="hidden md:table-header-group">
        <tr role="row">
          {[c.decision, c.why, c.tradeoff].map((h) => (
            <th key={h} role="columnheader" scope="col" className="py-3 pr-6 font-mono text-xs font-normal tracking-[0.14em] text-text-secondary uppercase">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {dict.rows.map((r, i) => (
          <tr key={r.decision} role="row" className="rise grid gap-2 border-b border-border py-6 md:table-row md:py-0">
            <th role="rowheader" scope="row" className="align-top font-display text-lg leading-snug font-semibold tracking-[-0.01em] text-text md:w-[30%] md:py-6 md:pr-6">
              <span className="mr-3 font-mono text-xs font-normal text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {r.decision}
            </th>
            <td role="cell" data-label={c.why} className="align-top text-[15px] leading-relaxed text-text md:w-[40%] md:py-6 md:pr-6">
              {r.why}
            </td>
            <td role="cell" data-label={c.tradeoff} className="align-top text-[15px] leading-relaxed text-text-secondary md:py-6">
              {r.tradeoff}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
