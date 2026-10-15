import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import { Bubble } from "./demo-ui";

type Ui = Dictionary["story"]["ui"];

const WAVE = [0.35, 0.6, 0.45, 0.8, 0.55, 0.95, 0.7, 0.4, 0.65, 1, 0.75, 0.5, 0.85, 0.6, 0.3, 0.55, 0.9, 0.7, 0.45, 0.8, 0.5, 0.35, 0.6, 0.4, 0.25, 0.45, 0.3, 0.2];
const BUSY: [number, number][] = [[0, 1], [1, 3], [2, 0], [2, 2], [4, 1], [4, 4], [3, 3]];
const SLOT: [number, number] = [3, 1];
const HOURS = ["09", "10", "11", "12", "13"];

/** Keep `bg-bg-card` opaque: the night skyline glows behind the translucent stage, and all frame text sits on this. */
function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("w-full max-w-[440px] rounded-[24px] border border-border bg-bg-card p-5 shadow-[0_40px_90px_-40px_rgba(56,189,248,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6", className)}>
      {children}
    </div>
  );
}

function Field({ label, value, s, tall }: { label: string; value: string; s: string; tall?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.12em] text-text-secondary uppercase">{label}</p>
      <p className={cn("mt-1.5 rounded-xl border border-border-hover px-3.5 py-2.5 text-[15px] text-text", tall ? "min-h-[68px]" : "min-h-[44px]")}>
        <span data-type={s} data-full={value}>
          {value}
        </span>
      </p>
    </div>
  );
}

function FormPanel({ ui }: { ui: Ui["form"] }) {
  return (
    <Frame>
      <div className="flex items-center gap-1.5 border-b border-border pb-3.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-3 truncate font-mono text-[11px] text-text-secondary">{ui.url}</span>
      </div>
      <p className="mt-4 font-display text-xl font-semibold tracking-tight text-text">{ui.title}</p>
      <div className="mt-4 grid gap-3">
        <Field label={ui.name} value={ui.nameValue} s="name" />
        <Field label={ui.phone} value={ui.phoneValue} s="phone" />
        <Field label={ui.message} value={ui.messageValue} s="message" tall />
      </div>
      <div className="relative mt-4 h-11">
        <span data-s="send" className="absolute inset-0 flex items-center justify-center rounded-full bg-button text-sm font-semibold text-button-text">
          {ui.send}
        </span>
        <span data-s="sent" className="absolute inset-0 flex items-center justify-center gap-2 rounded-full border border-live/50 bg-[#1A1408] text-sm font-semibold text-live">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 8.5 3 3 7-7" />
          </svg>
          {ui.sent}
        </span>
      </div>
    </Frame>
  );
}

const initials = (name: string) => name.split(" ").map((w) => w.charAt(0)).join("");

function CallPanel({ ui, who }: { ui: Ui["call"]; who: string }) {
  return (
    <Frame>
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="story-ring absolute inset-0 rounded-full border border-accent/40 opacity-0" />
          <span className="story-ring absolute inset-0 rounded-full border border-accent/40 opacity-0 [animation-delay:0.8s]" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent-tint font-display text-lg font-bold text-accent">{initials(who)}</span>
        </div>
        <p className="mt-4 font-display text-xl font-semibold tracking-tight text-text">{who}</p>
        <p className="relative mt-1 h-5 w-full font-mono text-[11px] tracking-[0.12em] uppercase">
          <span data-s="calling" className="absolute inset-0 text-text-secondary opacity-0">
            {ui.caller} · {ui.calling}
          </span>
          <span data-s="connected" className="absolute inset-0 flex items-center justify-center gap-1.5 text-live">
            <span className="h-1.5 w-1.5 rounded-full bg-live" />
            {ui.caller} · {ui.connected}
          </span>
        </p>
      </div>
      <div className="mt-5 flex h-12 items-center justify-center gap-[3px]">
        {WAVE.map((h, i) => (
          <span key={i} data-s="bar" className="w-[4px] origin-center rounded-full bg-accent" style={{ height: `${h * 100}%`, opacity: 0.45 + h * 0.55 }} />
        ))}
      </div>
      <div data-s="line" className="mt-5">
        <Bubble who={ui.caller}>{ui.line}</Bubble>
      </div>
    </Frame>
  );
}

function CalendarPanel({ ui, business }: { ui: Ui["calendar"]; business: string }) {
  return (
    <Frame>
      <div className="flex items-baseline justify-between">
        <p className="font-display text-xl font-semibold tracking-tight text-text">{ui.title}</p>
        <p className="font-mono text-[11px] tracking-[0.12em] text-text-secondary uppercase">{business}</p>
      </div>
      <div className="mt-4 grid grid-cols-[28px_repeat(5,minmax(0,1fr))] gap-1.5">
        <span />
        {ui.days.map((d) => (
          <span key={d} className="pb-1 text-center font-mono text-[10px] tracking-[0.1em] text-text-secondary uppercase">
            {d}
          </span>
        ))}
        {HOURS.map((h, r) => (
          <Row key={h} hour={h} r={r} ui={ui} />
        ))}
      </div>
      <p data-s="confirmed" className="mt-4 text-sm text-text-secondary">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-live" />
          {ui.confirmed}
        </span>
      </p>
    </Frame>
  );
}

function Row({ hour, r, ui }: { hour: string; r: number; ui: Ui["calendar"] }) {
  return (
    <>
      <span className="pt-1.5 font-mono text-[10px] text-text-secondary tabular-nums">{hour}</span>
      {ui.days.map((d, c) => {
        const busy = BUSY.some(([bc, br]) => bc === c && br === r);
        const slot = SLOT[0] === c && SLOT[1] === r;
        return (
          <span key={d} className={cn("relative h-11 rounded-lg border border-border bg-white/[0.015]", slot && "z-10")}>
            {busy && <span className="absolute inset-0.5 rounded-md bg-white/[0.06]" />}
            {slot && (
              <span
                data-s="booking"
                className="absolute -inset-x-px -top-px z-10 flex h-[calc(200%+8px)] flex-col gap-0.5 overflow-hidden rounded-lg border border-live bg-[#2A1E0A] p-1.5 shadow-[0_12px_30px_-10px_rgba(255,181,71,0.6)] max-sm:right-[calc(-100%-6px)]"
              >
                <span className="font-mono text-[10px] text-live tabular-nums">{ui.slot.split(" ")[1]}</span>
                <span className="truncate text-[11px] leading-tight font-medium text-text">{ui.service}</span>
                <span className="truncate text-[11px] leading-tight text-text-secondary">{ui.client}</span>
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

function CrmPanel({ ui }: { ui: Ui["crm"] }) {
  return (
    <Frame>
      <p className="flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
        {ui.title}
        <span className="h-2 w-2 rounded-full bg-live" />
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border">
        <div data-s="row" className="flex items-center gap-3 border-b border-border bg-[#1A1408] px-4 py-3.5 shadow-[inset_2px_0_0_var(--color-live)]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-tint text-xs font-bold text-accent">{initials(ui.name)}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-medium text-text">{ui.name}</span>
            <span className="block truncate font-mono text-[11px] text-text-secondary">{ui.source}</span>
          </span>
          <span data-s="pill" className="rounded-full bg-live px-2.5 py-1 font-mono text-[11px] font-semibold text-[#1A1205]">
            {ui.status}
          </span>
        </div>
        {ui.others.map(([name, status]) => (
          <div key={name} data-s="old" className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0">
            <span className="h-8 w-8 shrink-0 rounded-full bg-white/[0.06]" />
            <span className="flex-1 truncate text-sm text-text-secondary">{name}</span>
            <span className="rounded-full border border-border-hover px-2.5 py-1 font-mono text-[11px] text-text-secondary">{status}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {ui.tags.map((t) => (
          <span key={t} data-s="tag" className="rounded-full border border-accent/30 px-3 py-1 font-mono text-[11px] text-accent">
            #{t}
          </span>
        ))}
      </div>
      <p data-s="summary" className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm text-text">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--color-live)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 8.5 3 3 7-7" />
        </svg>
        {ui.summary}
      </p>
    </Frame>
  );
}

/** The four story frames in their final state; the pinned timeline animates them in from their start state. */
export function storyFrames(ui: Ui) {
  return [
    <FormPanel key="form" ui={ui.form} />,
    <CallPanel key="call" ui={ui.call} who={ui.form.nameValue} />,
    <CalendarPanel key="cal" ui={ui.calendar} business={ui.business} />,
    <CrmPanel key="crm" ui={ui.crm} />,
  ];
}
