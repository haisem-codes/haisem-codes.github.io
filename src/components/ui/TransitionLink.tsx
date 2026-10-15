"use client";

import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { shouldIntercept } from "@/lib/transition";
import { getLenis } from "@/components/providers/LenisProvider";

const PAGE = "vt-page";
const MAX_WAIT_MS = 1500;

/** Resolves once the router has committed the new URL (the new page is in the DOM), or after a cap so a slow fetch never freezes the old frame. */
function arrival(path: string) {
  const start = performance.now();
  return new Promise<void>((resolve) => {
    // rendering is paused inside the transition callback, so poll on timers rather than frames
    const check = () => (location.pathname === path || performance.now() - start > MAX_WAIT_MS ? resolve() : setTimeout(check, 16));
    check();
  });
}

/** A plain link that morphs into the next page with the View Transitions API, and navigates normally whenever it can't. */
export function TransitionLink({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const router = useRouter();

  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const ok = shouldIntercept(e, href, {
      href: location.href,
      supported: typeof document.startViewTransition === "function",
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      target: e.currentTarget.target,
    });
    if (!ok) return;
    e.preventDefault();
    const path = new URL(href, location.href).pathname;
    const html = document.documentElement;
    html.classList.add(PAGE);
    const vt = document.startViewTransition(async () => {
      router.push(href, { scroll: false });
      await arrival(path);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    vt.finished.finally(() => html.classList.remove(PAGE));
  };

  return <a href={href} onClick={go} onPointerEnter={() => router.prefetch(href)} {...rest} />;
}
