"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { m } from "motion/react";
import { readTier } from "@/lib/capability";
import { SCRIPTS } from "@/lib/demo/scripts";
import { demoKey, reply, startDemo } from "@/lib/demo/engine";
import type { BotMessage, CrmCard, DemoState, Vertical } from "@/lib/demo/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { Bubble, ChatCard, DayMark, Chip, Composer, DemoLayout, PanelBody, PanelCard, Toolbar } from "./demo-ui";

type Dict = Dictionary["controlRoom"];
type Item = { id: number; me: boolean; text: string; options?: string[]; live?: boolean; animate: boolean };

const TYPING_MS = 900;
const PANEL_ID = "control-room-panel";
const ENTER = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } } as const;

export function DemoChat({ lang, dict, onReady }: { lang: Locale; dict: Dict; onReady?: () => void }) {
  const [vertical, setVertical] = useState<Vertical>("salon");
  const [run, setRun] = useState(0);
  useLayoutEffect(() => onReady?.(), [onReady]);
  return (
    <DemoLayout
      toolbar={
        <Toolbar
          dict={dict}
          active={vertical}
          onSelect={(v) => {
            setVertical(v);
            setRun((n) => n + 1);
          }}
          onRestart={() => setRun((n) => n + 1)}
        />
      }
    >
      <Conversation key={`${demoKey(lang, vertical)}:${run}`} lang={lang} dict={dict} vertical={vertical} fresh={run > 0} />
    </DemoLayout>
  );
}

function Conversation({ lang, dict, vertical, fresh }: { lang: Locale; dict: Dict; vertical: Vertical; fresh: boolean }) {
  const script = SCRIPTS[lang][vertical];
  const [instant] = useState(() => readTier() === "static");
  const nextId = useRef(0);
  const toItems = (msgs: BotMessage[], animate: boolean, live?: boolean): Item[] =>
    msgs.map((b) => ({ id: nextId.current++, me: false, text: b.text, options: b.options, live, animate }));
  const [items, setItems] = useState<Item[]>(() => toItems(startDemo(script).messages, fresh && !instant));
  const [state, setState] = useState<DemoState>({ stage: "start" });
  const [typing, setTyping] = useState(false);
  const [crm, setCrm] = useState<CrmCard>();
  const [draft, setDraft] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const keyboardChip = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: instant ? "auto" : "smooth" });
  }, [items.length, typing, instant]);

  // A keyboard user who picked a chip lands on the next set of chips (or the input) instead of <body>.
  useEffect(() => {
    if (!keyboardChip.current || typing) return;
    keyboardChip.current = false;
    (chipsRef.current?.querySelector("button") ?? inputRef.current)?.focus();
  }, [items.length, typing]);

  const last = items[items.length - 1];
  const options = !typing && !last.me ? last.options : undefined;

  function send(raw: string) {
    const text = raw.trim();
    if (!text || typing) return;
    const r = reply(script, state, text);
    const mine: Item = { id: nextId.current++, me: true, text, animate: !instant };
    const bots = toItems(r.messages, !instant, Boolean(r.crm));
    const land = () => {
      setTyping(false);
      setItems((prev) => [...prev, ...bots]);
      setState(r.state);
      if (r.crm) setCrm(r.crm);
    };
    setDraft("");
    setItems((prev) => [...prev, mine]);
    if (instant) return land();
    setTyping(true);
    timer.current = setTimeout(land, TYPING_MS);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(draft);
  };

  return (
    <>
      <ChatCard dict={dict} business={script.business}>
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label={dict.chatLabel}
          className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6"
        >
          <div className="mt-auto" />
          <DayMark dict={dict} />
          {items.map((it) => (
            <m.div key={it.id} {...(it.animate ? ENTER : { initial: false })}>
              <Bubble me={it.me} live={it.live} who={it.me ? dict.you : dict.bot}>
                {it.text}
              </Bubble>
            </m.div>
          ))}
          {typing && (
            <m.span aria-hidden {...ENTER} className="flex w-fit gap-1 rounded-2xl rounded-bl-[5px] bg-[#1D1F23] px-4 py-3.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="demo-dot h-1.5 w-1.5 rounded-full bg-text-secondary" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </m.span>
          )}
        </div>
        <div
          ref={chipsRef}
          role="group"
          aria-label={dict.suggestionsLabel}
          className="flex min-h-[56px] shrink-0 flex-wrap content-end gap-2 px-4 pb-3 sm:px-6"
        >
          {options?.map((o) => (
            <Chip
              key={o}
              slot={state.stage === "slots"}
              onClick={(keyboard) => {
                keyboardChip.current = keyboard;
                send(o);
              }}
            >
              {o}
            </Chip>
          ))}
        </div>
        <Composer
          dict={dict}
          value={draft}
          inputRef={inputRef}
          onChange={setDraft}
          onSubmit={onSubmit}
          canSend={!typing && draft.trim().length > 0}
        />
        {crm && (
          <a href={`#${PANEL_ID}`} className="shrink-0 border-t border-border px-5 py-3 text-center text-sm font-medium text-live lg:hidden">
            {dict.panelJump}
          </a>
        )}
      </ChatCard>
      <PanelCard dict={dict} id={PANEL_ID}>
        <PanelBody dict={dict} lang={lang} crm={crm} />
      </PanelCard>
    </>
  );
}
