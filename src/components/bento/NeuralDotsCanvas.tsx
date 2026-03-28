"use client";

import { useRef, useEffect } from "react";
import { useInView } from "motion/react";

export function NeuralDotsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = canvas.offsetWidth * 2);
    const h = (canvas.height = canvas.offsetHeight * 2);
    ctx.scale(2, 2);

    const dots = Array.from({ length: 15 }, () => ({
      x: Math.random() * (w / 2),
      y: Math.random() * (h / 2),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    let frameId: number;
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue("--color-accent").trim();

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w / 2, h / 2);

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w / 2) d.vx *= -1;
        if (d.y < 0 || d.y > h / 2) d.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `${accent}${Math.round((1 - dist / 80) * 40).toString(16).padStart(2, "0")}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = accent + "80";
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[100px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
