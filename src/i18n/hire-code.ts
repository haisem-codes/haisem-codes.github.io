/** The /hire code excerpt: a simplified illustration written for the page, shared by both languages. */
export const qualifyExcerpt = `type Temperature = "HOT" | "WARM" | "COLD";

interface Answers {
  monthsToMove: number | null;
  preApproved: boolean;
  wantsCall: boolean;
}

// Hard gates first: these cases never reach the softer signals.
export function qualify(a: Answers): Temperature {
  if (a.monthsToMove === null) return "WARM";
  if (a.monthsToMove >= 6) return "COLD";
  if (a.preApproved && a.wantsCall) return "HOT";
  return "WARM";
}

// From the test plan: a ready buyer who is months away stays cold.
qualify({ monthsToMove: 8, preApproved: true, wantsCall: true }); // "COLD"
`;
