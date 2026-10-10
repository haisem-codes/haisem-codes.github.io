export const tokens = {
  light: { bg: "#FAFAF8", card: "#FFFFFF", text: "#1A1A1E", secondary: "#5B6170", accent: "#0369A1", accentTint: "#E0F2FE", button: "#0369A1", buttonText: "#FFFFFF", glow: "rgba(56,189,248,.18)", live: "#B45309" },
  night: { bg: "#0A0A0B", card: "#141416", text: "#EDEDEF", secondary: "#8B8B9E", accent: "#7DD3FC", accentTint: "#0C2A3A", button: "#38BDF8", buttonText: "#04121C", glow: "rgba(56,189,248,.16)", live: "#FFB547" },
} as const;

function lum(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

export function contrast(fg: string, bg: string): number {
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}
