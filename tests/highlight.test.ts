import { test, expect } from "vitest";
import { tokenize, type Token } from "@/lib/highlight";

const kinds = (src: string) => tokenize(src).filter((t) => t.kind !== "plain").map((t) => [t.kind, t.text]);

test("joining the tokens gives back the source exactly", () => {
  const src = 'export function f(a: Answers): Temp {\n  // note\n  if (a.m >= 6) return "COLD";\n}\n';
  expect(tokenize(src).map((t: Token) => t.text).join("")).toBe(src);
});

test("marks keywords, types, functions, strings, numbers and comments", () => {
  expect(kinds('if (x >= 6) return "COLD"; // gate')).toEqual([
    ["keyword", "if"],
    ["punct", "("],
    ["punct", ">="],
    ["number", "6"],
    ["punct", ")"],
    ["keyword", "return"],
    ["string", '"COLD"'],
    ["punct", ";"],
    ["comment", "// gate"],
  ]);
  expect(kinds("classify(lead): Temperature")).toEqual([
    ["fn", "classify"],
    ["punct", "("],
    ["punct", ")"],
    ["punct", ":"],
    ["type", "Temperature"],
  ]);
});

test("a comment runs to the end of its line only", () => {
  const t = tokenize("// one\nconst");
  expect(t[0]).toEqual({ kind: "comment", text: "// one" });
  expect(t.at(-1)).toEqual({ kind: "keyword", text: "const" });
});

test("strings keep escaped quotes and never swallow the next line", () => {
  expect(kinds('"a\\"b" x')).toEqual([["string", '"a\\"b"']]);
  expect(tokenize('"open\nnext').map((t) => t.kind)).toEqual(["string", "plain"]);
});

test("identifiers that only contain a keyword stay plain", () => {
  expect(kinds("iffy returned")).toEqual([]);
});

test("adjacent plain text merges into one token", () => {
  expect(tokenize("a b")).toEqual([{ kind: "plain", text: "a b" }]);
});
