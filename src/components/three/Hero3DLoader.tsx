"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { canRender3D, readEnv } from "@/lib/capability";

const Hero3D = dynamic(() => import("@/components/three/Hero3D"), { ssr: false });

export function Hero3DLoader() {
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");
  useEffect(() => {
    const decide = () => setMode(canRender3D(readEnv()) ? "3d" : "fallback");
    let id: ReturnType<typeof setTimeout>;
    const arm = () => {
      id = setTimeout(decide, 1500);
    };
    if (document.readyState === "complete") arm();
    else addEventListener("load", arm, { once: true });
    return () => {
      removeEventListener("load", arm);
      clearTimeout(id);
    };
  }, []);
  if (mode === "pending") return null;
  if (mode === "fallback")
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/hero-fallback.svg" alt="" className="absolute inset-0 h-full w-full object-contain opacity-30 lg:left-1/2 lg:w-1/2 lg:opacity-60" />
    );
  return <Hero3D />;
}
