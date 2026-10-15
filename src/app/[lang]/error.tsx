"use client";

import { useParams } from "next/navigation";
import { pageError } from "@/i18n/page-error";
import { isLocale } from "@/i18n/config";

const EMAIL = "haisem.work@gmail.com";

export default function PageError() {
  const { lang } = useParams<{ lang: string }>();
  const t = pageError[isLocale(lang) ? lang : "en"];
  return (
    <main className="grid min-h-[80svh] place-items-center px-6 pt-32 pb-24">
      <div className="max-w-xl">
        <p className="font-mono text-xs tracking-[0.18em] text-text-secondary uppercase">{t.label}</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-balance text-text sm:text-5xl">{t.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-text-secondary">{t.body}</p>
        <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <button
            type="button"
            onClick={() => location.reload()}
            className="inline-flex min-h-[52px] cursor-pointer items-center rounded-full bg-button px-8 text-base font-medium text-button-text transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {t.reload}
          </button>
          <p className="text-sm text-text-secondary">
            {t.email}{" "}
            <a href={`mailto:${EMAIL}`} className="font-medium text-text underline underline-offset-4 hover:decoration-accent">
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
