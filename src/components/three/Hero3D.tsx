"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { canRender3D, readEnv } from "@/lib/capability";
import { SignalField } from "./SignalField";
import { sphere } from "./shapes";

function readAccent() {
  return getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#0D7C72";
}

export default function Hero3D() {
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");
  const [count, setCount] = useState(2400);
  const [color, setColor] = useState("#0D7C72");
  const [visible, setVisible] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const pointer = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const env = readEnv();
    if (!canRender3D(env)) {
      setMode("fallback");
      return;
    }
    setCount(env.mobile ? 1200 : 2400);
    setColor(readAccent());
    setMode("3d");
    const mo = new MutationObserver(() => setColor(readAccent()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const onMove = (e: PointerEvent) => {
      pointer.current = [(e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)];
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      mo.disconnect();
      removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    if (mode !== "3d" || !box.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(box.current);
    return () => io.disconnect();
  }, [mode]);

  const targets = useMemo(() => [sphere(count)], [count]);
  if (mode === "pending") return null;

  return (
    <div ref={box} className="absolute inset-0 opacity-30 lg:left-1/2 lg:opacity-100">
      {mode === "fallback" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/hero-fallback.svg" alt="" className="h-full w-full object-contain opacity-60" />
      ) : (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
          frameloop={visible ? "always" : "never"}
        >
          <SignalField count={count} targets={targets} progress={progress} pointer={pointer} color={color} />
        </Canvas>
      )}
    </div>
  );
}
