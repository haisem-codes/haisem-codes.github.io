"use client";
import { useEffect } from "react";
import { detectLocale } from "@/i18n/config";

export function LangRedirect({ path = "" }: { path?: string }) {
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch {}
    const lang = detectLocale(saved, navigator.languages ?? [navigator.language]);
    window.location.replace(`/${lang}/${path}${window.location.search}${window.location.hash}`);
  }, [path]);
  return (
    <noscript>
      <a href={`/en/${path}`}>English</a> · <a href={`/sv/${path}`}>Svenska</a>
    </noscript>
  );
}
