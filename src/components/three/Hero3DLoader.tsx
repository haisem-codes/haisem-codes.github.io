"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hero3D = dynamic(() => import("@/components/three/Hero3D"), { ssr: false });

export function Hero3DLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setReady(true));
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(id);
  }, []);
  return ready ? <Hero3D /> : null;
}
