"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { Dictionary } from "@/i18n";
import { readTier } from "@/lib/capability";
import { ClientBoundary } from "@/components/ui/ClientBoundary";

type CursorType = ComponentType<{ dict: Dictionary["cursor"] }>;

/** Fetches the cursor on idle, and only for a mouse or pen on a tier that animates. */
export function CursorLoader({ dict }: { dict: Dictionary["cursor"] }) {
  const [C, setC] = useState<CursorType | null>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || readTier() === "static") return;
    let live = true;
    const load = () => import("./Cursor").then((m) => live && setC(() => m.Cursor), () => {});
    const idle = "requestIdleCallback" in window;
    const id = idle ? requestIdleCallback(load, { timeout: 3000 }) : window.setTimeout(load, 1500);
    return () => {
      live = false;
      if (idle) cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  return C ? (
    <ClientBoundary>
      <C dict={dict} />
    </ClientBoundary>
  ) : null;
}
