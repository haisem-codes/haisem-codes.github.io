import { en } from "./en";
import { sv } from "./sv";
import type { Locale } from "./config";

type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? Widen<U>[] : { [K in keyof T]: Widen<T[K]> };
export type Dictionary = Widen<typeof en>;

const dictionaries: Record<Locale, Dictionary> = { en, sv };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
