"use client";

import { useEffect, useState } from "react";
import { stockholmTime } from "@/lib/clock";

/** Stockholm wall clock; a fixed-width placeholder until mounted, so nothing shifts. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(stockholmTime(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? "--:--"}</span>;
}
