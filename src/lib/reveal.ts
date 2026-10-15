/**
 * Scroll reveals start hidden (opacity 0) in the server HTML. If motion's feature chunk or the page chunk
 * never runs, nothing would ever reveal them, so a boot script un-hides them shortly after DOMContentLoaded (or `load`, whichever comes first) unless
 * motion loaded and, on pages with scroll reveals, the reveals hydrated.
 */
export const REVEAL_READY = ["motion-ready", "reveal-ready"] as const;
export const REVEAL_FALLBACK = "reveal-fallback";
export const REVEAL_GRACE_MS = 2000;
export const SCROLL_REVEAL = "scroll";

export const revealBootScript = `(function(h){h.classList.add("js");var armed=0;function arm(){if(armed++)return;setTimeout(function(){if(!h.classList.contains("motion-ready")||(!h.classList.contains("reveal-ready")&&document.querySelector('[data-reveal="${SCROLL_REVEAL}"]')))h.classList.add("${REVEAL_FALLBACK}")},${REVEAL_GRACE_MS})}addEventListener("DOMContentLoaded",arm);addEventListener("load",arm)})(document.documentElement);`;

export function markRevealReady(part: (typeof REVEAL_READY)[number]) {
  document.documentElement.classList.add(part);
}
