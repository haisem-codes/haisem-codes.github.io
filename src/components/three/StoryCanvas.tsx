"use client";
import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SignalField } from "./SignalField";
import { calendarShape, crmShape, formShape, phoneShape, sphere } from "./shapes";

function readAccent() {
  return getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#0D7C72";
}

export default function StoryCanvas({
  progress,
  active,
}: {
  progress: { current: number };
  active: boolean;
}) {
  const [count] = useState(() => (matchMedia("(pointer: coarse)").matches ? 1200 : 2400));
  const [wide] = useState(() => innerWidth >= 1024);
  const [color, setColor] = useState(readAccent);
  const pointer = useMemo<{ current: [number, number] }>(() => ({ current: [0, 0] }), []);

  useEffect(() => {
    const mo = new MutationObserver(() => setColor(readAccent()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const targets = useMemo(
    () => [sphere(count), formShape(count), phoneShape(count), calendarShape(count), crmShape(count)],
    [count],
  );

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <SignalField
        count={count}
        targets={targets}
        progress={progress}
        pointer={pointer}
        color={color}
        scale={wide ? 0.9 : 0.8}
      />
    </Canvas>
  );
}
