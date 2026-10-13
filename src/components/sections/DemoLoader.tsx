"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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

/** Shows the server-rendered preview until the section nears the viewport and the live chat has mounted. */
export function DemoLoader({ lang, dict, children }: { lang: Locale; dict: Dictionary["controlRoom"]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <div ref={ref}>
      {!ready && children}
      {near && (
        <ClientBoundary onError={onError}>
          <DemoChat lang={lang} dict={dict} onReady={onReady} />
        </ClientBoundary>
      )}
    </div>
  );
}
