"use client";

import { useState, useEffect } from "react";
import { useInView } from "motion/react";
import { useRef } from "react";

const code = 'const agent = new AIAgent()';

export function TypingCode() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < code.length) {
        setText(code.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div ref={ref} className="font-mono text-xs text-accent/80 p-2">
      <span>{text}</span>
      <span className={cursorVisible ? "opacity-100" : "opacity-0"}>|</span>
    </div>
  );
}
