"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";

interface PixelAvatarProps {
  size?: number;
}

export function PixelAvatar({ size = 80 }: PixelAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/haisem.webp";

    img.onload = () => {
      const pixelSize = 6;
      canvas.width = size;
      canvas.height = size;

      // Draw image scaled down then up for pixelation
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const smallW = Math.ceil(size / pixelSize);
      const smallH = Math.ceil(size / pixelSize);
      tempCanvas.width = smallW;
      tempCanvas.height = smallH;

      // Draw small version
      tempCtx.drawImage(img, 0, 0, smallW, smallH);

      // Get pixel data and apply tech tint
      const imageData = tempCtx.getImageData(0, 0, smallW, smallH);
      const data = imageData.data;

      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--color-accent").trim();

      // Parse accent color
      let ar = 212, ag = 175, ab = 55; // default gold
      if (accent.startsWith("#") && accent.length >= 7) {
        ar = parseInt(accent.slice(1, 3), 16);
        ag = parseInt(accent.slice(3, 5), 16);
        ab = parseInt(accent.slice(5, 7), 16);
      }

      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
        // Blend grayscale with accent color tint
        data[i] = Math.min(255, gray * 0.5 + ar * 0.5);     // R
        data[i + 1] = Math.min(255, gray * 0.5 + ag * 0.35); // G
        data[i + 2] = Math.min(255, gray * 0.5 + ab * 0.3);  // B
        data[i + 3] = data[i + 3] > 30 ? 255 : 0; // Keep transparency sharp
      }

      tempCtx.putImageData(imageData, 0, 0);

      // Draw pixelated version to main canvas
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, 0, 0, size, size);

      // Add scanline overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      for (let y = 0; y < size; y += 2) {
        ctx.fillRect(0, y, size, 1);
      }
    };
  }, [size]);

  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="rounded-xl"
        style={{ imageRendering: "pixelated" }}
      />
      {/* Subtle glow behind */}
      <div
        className="absolute inset-0 rounded-xl blur-xl opacity-20 -z-10"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
    </motion.div>
  );
}
