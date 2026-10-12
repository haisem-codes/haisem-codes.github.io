"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

/** A <video> whose poster is only fetched as it nears the viewport (posters have no loading="lazy"). */
export function LazyVideo({ poster, ...props }: ComponentProps<"video"> & { poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setNear(true);
      io.disconnect();
    }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} poster={near ? poster : undefined} {...props} />;
}
