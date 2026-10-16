/**
 * Which section the reader is in: the last one whose top has passed the reading line (px from the viewport top).
 * At the page bottom the last section wins, since a short final section may never reach the line.
 */
export function pickActive(tops: number[], line: number, atBottom = false): number {
  if (tops.length === 0) return -1;
  if (atBottom) return tops.length - 1;
  let active = 0;
  tops.forEach((top, i) => {
    if (top <= line) active = i;
  });
  return active;
}
