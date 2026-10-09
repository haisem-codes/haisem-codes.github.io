"use client";
import { useRef, type KeyboardEvent } from "react";

type Option = { value: string; label: string };

type Props = {
  id: string;
  labelId: string;
  options: Option[];
  describedBy?: string;
  invalid?: boolean;
} & (
  | { multiple: true; value: string[]; onChange: (v: string[]) => void }
  | { multiple?: false; value: string | undefined; onChange: (v: string) => void }
);

const NEXT_KEYS = new Set(["ArrowRight", "ArrowDown"]);
const PREV_KEYS = new Set(["ArrowLeft", "ArrowUp"]);

export function Chips(props: Props) {
  const { id, labelId, options, describedBy, invalid } = props;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const isOn = (v: string) => (props.multiple ? props.value.includes(v) : props.value === v);
  const firstOn = options.findIndex((o) => isOn(o.value));
  const tabStop = firstOn === -1 ? 0 : firstOn;

  function toggle(v: string) {
    if (props.multiple) props.onChange(isOn(v) ? props.value.filter((x) => x !== v) : [...props.value, v]);
    else props.onChange(v);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let to = -1;
    if (NEXT_KEYS.has(e.key)) to = (i + 1) % options.length;
    else if (PREV_KEYS.has(e.key)) to = (i - 1 + options.length) % options.length;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = options.length - 1;
    if (to === -1) return;
    e.preventDefault();
    refs.current[to]?.focus();
    if (!props.multiple) props.onChange(options[to].value);
  }

  return (
    <div
      id={id}
      role={props.multiple ? "group" : "radiogroup"}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className="flex flex-wrap gap-2.5"
    >
      {options.map((o, i) => {
        const on = isOn(o.value);
        return (
          <button
            key={o.value}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role={props.multiple ? "checkbox" : "radio"}
            aria-checked={on}
            tabIndex={i === tabStop ? 0 : -1}
            onClick={() => toggle(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-left text-[15px] leading-snug transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              on
                ? "border-accent bg-accent text-white"
                : "border-border-hover bg-bg-card text-text hover:border-accent/60"
            }`}
          >
            {props.multiple && (
              <span aria-hidden className={`text-xs ${on ? "" : "text-text-secondary"}`}>{on ? "✓" : "+"}</span>
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
