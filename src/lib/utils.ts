export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const basePath = process.env.NODE_ENV === "production" ? "/haisem-portfolio" : "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
