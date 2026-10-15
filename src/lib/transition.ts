type Click = { button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; defaultPrevented: boolean };

/** True when a link click should become an in-app view transition instead of the browser's own navigation. */
export function shouldIntercept(
  e: Click,
  href: string,
  ctx: { href: string; supported: boolean; reducedMotion: boolean; target?: string | null },
): boolean {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if (!ctx.supported || ctx.reducedMotion || (ctx.target && ctx.target !== "_self") || href.includes("#")) return false;
  const here = new URL(ctx.href);
  const to = new URL(href, here);
  return to.origin === here.origin && to.pathname !== here.pathname;
}
