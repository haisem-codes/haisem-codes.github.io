/** Which rows of a capped list are hidden, how many the toggle reveals, and which row takes focus after expanding. */
export function capList(total: number, cap: number, open: boolean) {
  return {
    hidden: Array.from({ length: total }, (_, i) => !open && i >= cap),
    more: Math.max(0, total - cap),
    firstRevealed: cap,
  };
}
