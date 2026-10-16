export type TokenKind = "plain" | "keyword" | "type" | "fn" | "string" | "number" | "comment" | "punct";
export type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set([
  "as", "async", "await", "break", "case", "const", "continue", "default", "else", "export", "false", "for",
  "function", "if", "import", "in", "interface", "let", "new", "null", "of", "return", "switch", "true", "type",
  "undefined", "while",
]);

const RULES: [TokenKind | "word", RegExp][] = [
  ["comment", /\/\/[^\n]*/y],
  ["string", /(["'`])(?:\\.|(?!\1)[^\\\n])*\1?/y],
  ["number", /\d+(?:\.\d+)?/y],
  ["word", /[A-Za-z_$][\w$]*/y],
  ["punct", /=>|[=!<>]=?=?|&&|\|\||\?\?|[{}()[\];:,.?+\-*/%|&]/y],
  ["plain", /\s+|./y],
];

function wordKind(word: string, rest: string): TokenKind {
  if (KEYWORDS.has(word)) return "keyword";
  if (/^\s*\(/.test(rest)) return "fn";
  if (/^[A-Z]/.test(word)) return "type";
  return "plain";
}

/** A small TypeScript tokenizer for build-time highlighting; joining the tokens gives back the source. */
export function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    for (const [kind, re] of RULES) {
      re.lastIndex = i;
      const m = re.exec(src);
      if (!m) continue;
      const text = m[0];
      const k = kind === "word" ? wordKind(text, src.slice(i + text.length, i + text.length + 8)) : kind;
      const prev = out.at(-1);
      if (prev && prev.kind === "plain" && k === "plain") prev.text += text;
      else out.push({ kind: k, text });
      i += text.length;
      break;
    }
  }
  return out;
}
