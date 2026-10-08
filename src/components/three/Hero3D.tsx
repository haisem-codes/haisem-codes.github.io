"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SignalField } from "./SignalField";
import { sphere } from "./shapes";

function readAccent() {
  return getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#0D7C72";
}

export default function Hero3D() {
  const [count] = useState(() => (matchMedia("(pointer: coarse)").matches ? 1200 : 2400));
  const [wide] = useState(() => innerWidth >= 1024);
  const [color, setColor] = useState(readAccent);
  const [visible, setVisible] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const pointer = useRef<[number, number]>([0, 0]);

  useEffect(() => {
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
    if (!box.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  const targets = useMemo(() => [sphere(count)], [count]);

  return (
    <div
      ref={box}
      className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black_30%,transparent_65%)] lg:left-1/2 lg:opacity-100 lg:[mask-image:none]"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
        frameloop={visible ? "always" : "never"}
      >
        <SignalField
          count={count}
          targets={targets}
          progress={progress}
          pointer={pointer}
          color={color}
          offsetX={wide ? 0.9 : 0}
          scale={wide ? 0.75 : 1}
        />
      </Canvas>
    </div>
  );
}
