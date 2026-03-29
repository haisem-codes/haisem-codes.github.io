"use client";
import { asset } from "@/lib/utils";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function HangingBulb() {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const ropeControls = useAnimation();
  const [isPulling, setIsPulling] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const isOn = theme === "light";

  // Color scheme per theme
  const glow = isOn
    ? { // Light mode: teal glow
        bulb: "radial-gradient(ellipse at 40% 35%, #E0FFF8 0%, #B2F5EA 30%, #81E6D9 60%, #4FD1C5 100%)",
        filament: "#0D9488",
        filamentGlow: "rgba(13,148,136,0.8)",
        shadow: [
          "0 0 8px 2px rgba(13,148,136,0.5)",
          "0 0 20px 5px rgba(13,148,136,0.35)",
          "0 0 40px 10px rgba(13,148,136,0.25)",
          "0 0 80px 20px rgba(13,148,136,0.18)",
          "0 0 120px 40px rgba(13,148,136,0.12)",
          "0 0 200px 60px rgba(13,148,136,0.08)",
          "0 0 300px 80px rgba(13,148,136,0.04)",
        ].join(", "),
        coneOuter: "rgba(13,148,136,0.035)",
        coneMid: "rgba(13,148,136,0.05)",
        coneCore: "rgba(13,148,136,0.065)",
        hotspot: "rgba(13,148,136,0.14)",
        hotspotFade: "rgba(13,148,136,0.04)",
        neckBg: "linear-gradient(180deg, #81E6D9, #B2F5EA)",
        reflection: 0.5,
      }
    : { // Dark mode: dimmed gold glow (subtle, not overpowering)
        bulb: "radial-gradient(ellipse at 40% 35%, #E8D8A0 0%, #C8B060 30%, #A89030 60%, #8A7428 100%)",
        filament: "#A89030",
        filamentGlow: "rgba(168,144,48,0.6)",
        shadow: [
          "0 0 6px 1px rgba(212,175,55,0.25)",
          "0 0 14px 3px rgba(212,175,55,0.15)",
          "0 0 28px 6px rgba(212,175,55,0.1)",
          "0 0 50px 12px rgba(212,175,55,0.07)",
          "0 0 80px 25px rgba(212,175,55,0.04)",
          "0 0 130px 40px rgba(212,175,55,0.025)",
          "0 0 200px 60px rgba(212,175,55,0.015)",
        ].join(", "),
        coneOuter: "rgba(212,175,55,0.018)",
        coneMid: "rgba(212,175,55,0.025)",
        coneCore: "rgba(212,175,55,0.035)",
        hotspot: "rgba(212,175,55,0.07)",
        hotspotFade: "rgba(212,175,55,0.02)",
        neckBg: "linear-gradient(180deg, #A89030, #C8B060)",
        reflection: 0.25,
      };

  useEffect(() => {
    const seen = localStorage.getItem("lamp-hint-seen");
    if (!seen) {
      const show = setTimeout(() => setShowHint(true), 2000);
      const hide = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem("lamp-hint-seen", "1");
      }, 7000);
      return () => { clearTimeout(show); clearTimeout(hide); };
    }
  }, []);

  const playSound = useCallback(() => {
    try {
      const audio = new Audio(asset("/lamp-switch.wav"));
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } catch { /* silent */ }
  }, []);

  const handlePress = () => {
    if (isPulling) return;
    setIsPressed(true);
    ropeControls.start({
      y: 14,
      transition: { duration: 0.15, ease: "easeOut" },
    });
  };

  const handleRelease = async () => {
    if (!isPressed || isPulling) return;
    setIsPressed(false);
    setIsPulling(true);
    setShowHint(false);

    playSound();

    await ropeControls.start({
      y: [14, -6, 3, -1, 0],
      rotate: [0, 8, -5, 3, -1, 0],
      transition: { duration: 0.9, ease: "easeOut" },
    });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      toggleTheme(rect);
    }

    setIsPulling(false);
  };

  return (
    <>
      {/* === THE LAMP - z-51 so rope is visible through navbar glass blur === */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[51] pointer-events-none select-none">
        <motion.div
          ref={containerRef}
          animate={ropeControls}
          style={{ transformOrigin: "top center" }}
          className="flex flex-col items-center pointer-events-auto"
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onMouseLeave={() => {
            if (isPressed) {
              setIsPressed(false);
              ropeControls.start({ y: 0, transition: { duration: 0.3 } });
            }
          }}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
        >
          {/* ── NEURAL LINK CABLE ── */}
          <div className="relative" style={{ width: "4px", height: "105px" }}>
            {/* Cable shadow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ width: "6px", left: "-1px", background: "rgba(0,0,0,0.15)", filter: "blur(2px)" }}
            />

            {/* Cable body - sleek dark */}
            <div
              className="absolute inset-0 rounded-full transition-colors duration-700"
              style={{
                background: isOn
                  ? "linear-gradient(180deg, #1A3A35 0%, #1E4A42 30%, #1A3A35 70%, #163530 100%)"
                  : "linear-gradient(180deg, #2A2520 0%, #3A3228 30%, #2A2520 70%, #252018 100%)",
              }}
            />

            {/* Cable edge highlight */}
            <div
              className="absolute top-0 left-0 w-[1px] h-full rounded-full transition-colors duration-700"
              style={{
                background: isOn
                  ? "linear-gradient(180deg, transparent 5%, rgba(13,148,136,0.15) 30%, rgba(13,148,136,0.1) 70%, transparent 95%)"
                  : "linear-gradient(180deg, transparent 5%, rgba(212,175,55,0.15) 30%, rgba(212,175,55,0.1) 70%, transparent 95%)",
              }}
            />

            {/* Traveling pulse - the "data flowing" effect */}
            <div
              className="absolute left-0 w-full rounded-full overflow-hidden"
              style={{ top: 0, height: "100%" }}
            >
              <div
                className="absolute w-full"
                style={{
                  height: "20px",
                  background: isOn
                    ? "linear-gradient(180deg, transparent, rgba(13,148,136,0.5), rgba(13,148,136,0.8), rgba(13,148,136,0.5), transparent)"
                    : "linear-gradient(180deg, transparent, rgba(212,175,55,0.5), rgba(212,175,55,0.8), rgba(212,175,55,0.5), transparent)",
                  animation: "pulse-travel 3s ease-in-out infinite",
                  filter: "blur(1px)",
                }}
              />
            </div>

            {/* Subtle segment rings (like cable joints) */}
            {[25, 50, 75].map((top, i) => (
              <div
                key={i}
                className="absolute left-[-1px] w-[6px] h-[2px] rounded-full transition-colors duration-700"
                style={{
                  top: `${top}px`,
                  background: isOn
                    ? "linear-gradient(90deg, transparent, rgba(13,148,136,0.2), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
                }}
              />
            ))}
          </div>

          {/* ── LAMP SOCKET ── */}
          <div className="flex flex-col items-center -mt-[1px]">
            <div className="w-[14px] h-[6px] rounded-t-sm" style={{ background: "linear-gradient(180deg, #555 0%, #3A3A3A 100%)" }} />
            <div className="w-[18px] h-[4px]" style={{ background: "linear-gradient(180deg, #4A4A4A 0%, #333 100%)" }} />
            <div className="w-[22px] h-[3px]" style={{ background: "linear-gradient(180deg, #3A3A3A 0%, #2A2A2A 100%)" }} />
          </div>

          {/* ── THE BULB ── */}
          <div className="relative cursor-pointer" style={{ marginTop: "-1px" }}>
            <div
              className="relative w-[38px] h-[48px] mx-auto rounded-b-full transition-all duration-700"
              style={{
                background: glow.bulb,
                boxShadow: glow.shadow,
              }}
            >
              {/* Bulb neck */}
              <div
                className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[18px] h-[10px] rounded-t-sm transition-all duration-700"
                style={{
                  background: glow.neckBg,
                }}
              />

              {/* Filament wires */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[16px] h-[20px]">
                <div
                  className="absolute left-[2px] top-0 w-[1px] h-[18px] transition-all duration-500"
                  style={{ background: glow.filament, opacity: 1 }}
                />
                <div
                  className="absolute right-[2px] top-0 w-[1px] h-[18px] transition-all duration-500"
                  style={{ background: glow.filament, opacity: 1 }}
                />
                <div
                  className="absolute left-[4px] top-[6px] w-[8px] h-[8px] rounded-full border-[1.5px] transition-all duration-500"
                  style={{
                    borderColor: glow.filament,
                    opacity: 1,
                    boxShadow: `0 0 4px ${glow.filamentGlow}, 0 0 8px ${glow.filamentGlow}`,
                    background: glow.filamentGlow.replace('0.8', '0.3'),
                  }}
                />
              </div>

              {/* Glass reflection */}
              <div
                className="absolute top-[6px] left-[6px] w-[8px] h-[14px] rounded-full transition-opacity duration-500"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)",
                  opacity: glow.reflection,
                }}
              />
            </div>

            {/* Pull me hint */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: showHint ? 0.6 : 0 }}
              style={{ color: "var(--color-text-secondary)" }}
            >
              pull me
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* === LIGHT CONE === */}
      <div
        className="fixed top-0 left-0 right-0 pointer-events-none z-[44] transition-opacity duration-1000"
        style={{ height: "100vh", opacity: 1 }}
      >
        <div
          style={{
            position: "absolute", top: "170px", left: "50%", transform: "translateX(-50%)",
            width: "0", height: "0",
            borderLeft: "50vw solid transparent", borderRight: "50vw solid transparent",
            borderTop: `92vh solid ${glow.coneOuter}`,
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute", top: "170px", left: "50%", transform: "translateX(-50%)",
            width: "0", height: "0",
            borderLeft: "30vw solid transparent", borderRight: "30vw solid transparent",
            borderTop: `78vh solid ${glow.coneMid}`,
            filter: "blur(35px)",
          }}
        />
        <div
          style={{
            position: "absolute", top: "170px", left: "50%", transform: "translateX(-50%)",
            width: "0", height: "0",
            borderLeft: "14vw solid transparent", borderRight: "14vw solid transparent",
            borderTop: `55vh solid ${glow.coneCore}`,
            filter: "blur(25px)",
          }}
        />
        <div
          style={{
            position: "absolute", top: "140px", left: "50%", transform: "translateX(-50%)",
            width: "350px", height: "200px",
            background: `radial-gradient(ellipse at 50% 30%, ${glow.hotspot} 0%, ${glow.hotspotFade} 40%, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />
      </div>
    </>
  );
}
