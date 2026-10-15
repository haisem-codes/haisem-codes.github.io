"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { ClientBoundary } from "@/components/ui/ClientBoundary";

// A missing chunk resolves to nothing and `ready` never flips, so the server-rendered preview stays.
const DemoChat = dynamic(
  () =>
    import("./DemoChat").then(
      (mod) => mod.DemoChat,
      (err) => {
        if (process.env.NODE_ENV !== "production") console.error(err);
        return () => null;
      },
    ),
  { ssr: false },
);

const FOCUSABLE = "button, input, a[href]";
const signature = (el: Element) => `${el.tagName}:${el.getAttribute("aria-label") ?? el.textContent?.trim() ?? ""}`;

/**
 * Shows the server-rendered preview until the section nears the viewport (or takes keyboard focus) and the live chat
 * has mounted. A keyboard user inside the preview keeps their place: focus moves to the matching live control.
 */
export function DemoLoader({ lang, dict, children }: { lang: Locale; dict: Dictionary["controlRoom"]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const focused = useRef<{ sig: string; index: number } | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setReady(false), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const saved = focused.current;
    const root = ref.current;
    focused.current = null;
    if (!ready || !saved || !root || (document.activeElement && document.activeElement !== document.body)) return;
    const live = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)];
    (live.find((el) => signature(el) === saved.sig) ?? live[Math.min(saved.index, live.length - 1)])?.focus({ preventScroll: true });
  }, [ready]);

  return (
    <div
      ref={ref}
      onFocus={(e) => {
        setNear(true);
        const box = preview.current;
        if (!box?.contains(e.target)) return;
        focused.current = { sig: signature(e.target), index: [...box.querySelectorAll(FOCUSABLE)].indexOf(e.target) };
      }}
      onBlur={(e) => {
        // A control removed by the swap also blurs; only a real move elsewhere forgets the place.
        const from = e.target;
        queueMicrotask(() => {
          if (from.isConnected && !ref.current?.contains(document.activeElement)) focused.current = null;
        });
      }}
    >
      {!ready && <div ref={preview}>{children}</div>}
      {near && (
        <ClientBoundary onError={onError}>
          <DemoChat lang={lang} dict={dict} onReady={onReady} />
        </ClientBoundary>
      )}
    </div>
  );
}
