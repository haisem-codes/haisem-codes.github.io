export type Theme = "light" | "dark";
export const THEME_KEY = "theme";
export const initialTheme = (saved: string | null): Theme => (saved === "dark" ? "dark" : "light");
export const nextTheme = (t: Theme): Theme => (t === "light" ? "dark" : "light");
export const THEME_COLOR: Record<Theme, string> = { light: "#FAFAF8", dark: "#0A0A0B" };
