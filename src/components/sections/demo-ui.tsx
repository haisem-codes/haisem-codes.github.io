import type { FormEventHandler, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import type { CrmCard, Vertical } from "@/lib/demo/types";
import { localHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

const VERTICALS: Vertical[] = ["salon", "clinic", "trades", "restaurant"];

type Dict = Dictionary["controlRoom"];

/** Shared by the server-rendered preview and the live chat so the swap does not move anything. */
export function DemoLayout({ toolbar, children }: { toolbar: ReactNode; children: ReactNode }) {
  return (
    <div>
      {toolbar}
      <div className="grid items-start gap-5 lg:items-stretch lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-6">{children}</div>
    </div>
  );
}

export function Toolbar({
  dict,
  active,
  onSelect,
  onRestart,
}: {
  dict: Dict;
  active: Vertical;
  onSelect?: (v: Vertical) => void;
  onRestart?: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div role="group" aria-label={dict.verticalsLabel} className="flex gap-1 rounded-full border border-border bg-white/[0.03] p-1 sm:gap-1.5">
        {VERTICALS.map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={v === active}
            disabled={!onSelect}
            onClick={onSelect && (() => onSelect(v))}
            className={cn(
              "min-h-[36px] rounded-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors duration-[var(--dur-micro)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-sm",
              v === active ? "bg-text text-bg" : "text-text-secondary enabled:hover:text-text",
            )}
          >
            {dict.verticals[v]}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={!onRestart}
        onClick={onRestart}
        className="ml-auto inline-flex min-h-[36px] items-center gap-2 rounded-full px-3 text-sm text-text-secondary transition-colors duration-[var(--dur-micro)] enabled:hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2.5 2.5V5H5" />
        </svg>
        {dict.restart}
      </button>
    </div>
  );
}

export function ChatCard({ dict, business, children }: { dict: Dict; business: string; children: ReactNode }) {
  return (
    <div className="flex h-[560px] flex-col overflow-hidden rounded-[28px] border border-border bg-bg-card shadow-[0_40px_90px_-40px_rgba(56,189,248,0.28),inset_0_1px_0_rgba(255,255,255,0.04)] sm:h-[600px]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-5 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-tint font-display text-sm font-bold text-accent">
            {business.charAt(0)}
          </span>
          <span className="truncate font-mono text-xs tracking-[0.08em] text-text uppercase">{business}</span>
        </div>
        <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] tracking-[0.08em] uppercase">
          <span className="hidden rounded-full border border-border-hover px-2 py-0.5 text-text-secondary sm:inline">{dict.demoBadge}</span>
          <span className="flex items-center gap-1.5 text-live">
            <span aria-hidden className="live-dot h-[7px] w-[7px] rounded-full bg-live" />
            {dict.live}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

export function DayMark({ dict }: { dict: Dict }) {
  return (
    <p aria-hidden className="mb-2 flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-text-secondary uppercase">
      <span className="h-px flex-1 bg-border" />
      {dict.tonight}
      <span className="h-px flex-1 bg-border" />
    </p>
  );
}

export function Bubble({ me, live, who, children }: { me?: boolean; live?: boolean; who: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        "w-fit max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-[1.45] text-pretty",
        me ? "ml-auto rounded-br-[5px] bg-button text-button-text" : "rounded-bl-[5px] bg-[#1D1F23] text-text",
        live && "ring-1 ring-live/45 shadow-[0_12px_32px_-16px_rgba(255,181,71,0.5)]",
      )}
    >
      <span className="sr-only">{who}: </span>
      {children}
    </p>
  );
}

export function Chip({ slot, disabled, onClick, children }: { slot?: boolean; disabled?: boolean; onClick?: (keyboard: boolean) => void; children: ReactNode }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick && ((e) => onClick(e.detail === 0))}
      className={cn(
        "min-h-[40px] rounded-full border px-4 text-sm transition-[color,border-color,background-color] duration-[var(--dur-micro)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default",
        slot
          ? "border-live/40 font-mono text-live tabular-nums enabled:hover:border-live enabled:hover:bg-live enabled:hover:text-[#1A1205]"
          : "border-accent/30 text-accent enabled:hover:border-accent enabled:hover:bg-accent-tint",
        disabled && "opacity-60",
      )}
    >
      {children}
    </button>
  );
}

export function Composer({
  dict,
  value,
  inputRef,
  onChange,
  onSubmit,
  disabled,
  canSend,
}: {
  dict: Dict;
  value?: string;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: (v: string) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
  canSend?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="flex shrink-0 items-center gap-2 border-t border-border p-3 sm:p-4">
      <input
        ref={inputRef}
        type="text"
        value={value ?? ""}
        onChange={onChange && ((e) => onChange(e.target.value))}
        readOnly={!onChange}
        disabled={disabled}
        maxLength={200}
        autoComplete="off"
        enterKeyHint="send"
        aria-label={dict.inputLabel}
        placeholder={dict.placeholder}
        className="min-h-[48px] min-w-0 flex-1 rounded-full border border-border-hover bg-transparent px-5 text-base text-text placeholder:text-text-secondary focus:border-accent focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={!canSend}
        className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-button px-5 text-sm font-semibold text-button-text transition-[filter,opacity] duration-[var(--dur-micro)] enabled:hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40"
      >
        <span className="max-sm:sr-only">{dict.send}</span>
        <svg aria-hidden width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

export function PanelCard({ dict, id, children }: { dict: Dict; id?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-label={dict.panelTitle}
      className="relative flex scroll-mt-24 flex-col overflow-hidden rounded-[28px] border border-border bg-[#0D0E10] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.12em] uppercase">
        <span className="text-text-secondary">{dict.panelTitle}</span>
        <span className="text-live tabular-nums">{dict.clock}</span>
      </div>
      {children}
    </section>
  );
}

const STEPS = ["sms", "calendar", "summary"] as const;

/** One structure for waiting and booked, so the booking lights the panel up in place (CSS transitions only). */
export function PanelBody({ dict, lang, crm, instant }: { dict: Dict; lang: Locale; crm?: CrmCard; instant?: boolean }) {
  const on = Boolean(crm);
  const move = !instant;
  const delay = (ms: number) => (on && move ? { transitionDelay: `${ms}ms` } : undefined);
  const rise = (ms: number) => (move ? { animationDelay: `${ms}ms` } : undefined);
  const fade = move ? "transition-colors duration-300" : "";
  const rows: [string, string | undefined][] = [
    [dict.crm.status, crm?.status],
    [dict.crm.service, crm?.service],
    [dict.crm.reply, crm && dict.crm.replyValue.replace("{n}", String(crm.replySeconds))],
    [dict.crm.source, crm && dict.crm.sourceValue],
  ];
  return (
    <div className="mt-6 flex flex-1 flex-col">
      <div
        className={cn(
          "rounded-2xl border p-4",
          move && "transition-[border-color,background-color,box-shadow,translate] duration-500 ease-[var(--ease-silk)]",
          on
            ? "border-live/35 bg-[#141416] shadow-[0_24px_60px_-24px_rgba(255,181,71,0.4)]"
            : "translate-y-1 border-dashed border-border-hover",
        )}
      >
        <p className={cn("flex items-center justify-between font-mono text-[11px] tracking-[0.1em] uppercase", on ? "text-accent" : "text-text-secondary")}>
          {dict.crm.title}
          <span aria-hidden className={cn("h-2 w-2 rounded-full", on ? "live-dot bg-live" : "border border-border-hover")} />
        </p>
        <dl className="mt-3 text-sm">
          {rows.map(([k, v], i) => (
            <div key={k} className="flex items-center justify-between gap-4 border-t border-border py-2 first:border-t-0">
              <dt className="text-text-secondary">{k}</dt>
              <dd className="relative text-right font-medium">
                {v ? (
                  <span className={cn("inline-block", move && "cr-rise", i === 0 ? "text-live" : "text-text")} style={rise(120 + i * 90)}>
                    {v}
                  </span>
                ) : (
                  <span aria-hidden className="inline-block h-2 w-16 rounded-full bg-white/[0.06] align-middle" />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ol className="mt-5">
        {STEPS.map((s, i) => (
          <li key={s} className="relative flex items-center gap-3 py-2 pl-1">
            <span
              aria-hidden
              className={cn(
                "relative z-10 flex h-5 w-5 items-center justify-center rounded-full border",
                fade,
                on ? "border-transparent bg-live/15" : "border-border-hover",
              )}
              style={delay(500 + i * 350)}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", fade, on ? "bg-live" : "bg-transparent")} style={delay(500 + i * 350)} />
            </span>
            {i < STEPS.length - 1 && <span aria-hidden className="absolute top-7 left-[13px] h-[calc(100%-12px)] w-px bg-border-hover" />}
            <span className={cn("flex-1 text-sm", fade, on ? "text-text" : "text-text-secondary")} style={delay(500 + i * 350)}>
              {dict.timeline[s]}
            </span>
            <span className={cn("font-mono text-xs tabular-nums", fade, on ? "text-live" : "text-text-secondary/50")} style={delay(500 + i * 350)}>
              {on ? dict.timelineAt[s] : dict.pendingTime}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-auto border-t border-border pt-5">
        {on ? (
          <div className={cn(move && "cr-rise")} style={rise(1500)}>
            <p className="text-sm leading-relaxed text-text-secondary">{dict.ctaNote}</p>
            <a
              href={localHref(lang, "/start/?goal=missed_calls")}
              className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-button px-6 text-sm font-semibold text-button-text shadow-[0_10px_30px_-12px_var(--color-button)] transition-[filter] duration-[var(--dur-micro)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.cta}
              <span aria-hidden>→</span>
            </a>
          </div>
        ) : (
          <>
            <p className="flex items-center gap-2 text-sm font-medium text-text">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-text-secondary" />
              {dict.waiting}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{dict.waitingHint}</p>
          </>
        )}
      </div>
    </div>
  );
}
