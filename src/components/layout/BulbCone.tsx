import type { CSSProperties } from "react";
import { CONE_TOP } from "@/lib/bulb";

/** Light falling from the nav bulb; lives in the hero so it sits behind the copy, not over it. */
export function BulbCone() {
  return (
    <div
      aria-hidden
      className="hero-fade pointer-events-none absolute left-[calc(50%+var(--bulb-dx))] -z-10 hidden -translate-x-1/2 blur-[6px] lg:block"
      style={{ top: CONE_TOP, "--d": "0.3s" } as CSSProperties}
    >
      <div
        className="h-[min(62vh,560px)] w-[min(52vw,660px)] [background:linear-gradient(to_bottom,rgba(56,189,248,0.18)_0%,rgba(56,189,248,0.09)_55%,transparent_90%)] dark:[background:linear-gradient(to_bottom,rgba(125,211,252,0.1)_0%,rgba(125,211,252,0.04)_55%,transparent_90%)]"
        style={{ clipPath: "polygon(47% 0, 53% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}
