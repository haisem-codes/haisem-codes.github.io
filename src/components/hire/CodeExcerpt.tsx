import type { Dictionary } from "@/i18n";
import { tokenize, toLines, type TokenKind } from "@/lib/highlight";

const TONE: Record<TokenKind, string | undefined> = {
  plain: undefined,
  punct: "text-[#8B8B9E]",
  keyword: "text-[#7DD3FC]",
  type: "text-[#BAE6FD]",
  fn: "text-white font-medium",
  string: "text-[#86EFAC]",
  number: "text-[#FDBA74]",
  comment: "text-[#9A9AAD] italic",
};

/** Highlighted at build time: the page ships plain spans, no highlighter. Dark in both themes, like an editor. */
export function CodeExcerpt({ dict }: { dict: Dictionary["hire"]["code"] }) {
  const lines = toLines(tokenize(dict.source));
  return (
    <figure className="band-edge relative isolate overflow-hidden bg-[#08090b] text-[#EDEDEF]">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/10 px-4 py-3 font-mono text-xs sm:px-6">
        <span id="code-file" className="text-white">{dict.file}</span>
        <span className="text-[#A3A3B5]">{dict.note}</span>
      </figcaption>
      <pre
        role="region"
        aria-labelledby="code-file"
        tabIndex={0}
        className="overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-[1.7] [font-variant-ligatures:none] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#7DD3FC] sm:px-6 sm:text-[13.5px]"
      >
        <code className="grid w-max min-w-full grid-cols-[1.75rem_auto] sm:grid-cols-[2.25rem_auto]">
          {lines.map((line, i) => (
            <span key={i} className="contents">
              <span aria-hidden className="text-right pr-3 text-[#7A7A8C] select-none sm:pr-4">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.length === 0 ? "\u00a0" : line.map((t, j) => <span key={j} className={TONE[t.kind]}>{t.text}</span>)}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
