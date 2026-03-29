"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { silkEase } from "@/lib/animations";
// Cyborg portrait used instead of PixelAvatar

const ELEVENLABS_AGENT_ID = "";

const fallbackMessages = [
  {
    text: "Hey! My AI clone is still in training. Apparently, teaching it my sense of humor is harder than building a RAG pipeline. In the meantime, feel free to email me \u2014 I respond faster than GPT-4 Turbo!",
    audio: "/voice-fallback-1.mp3",
  },
  {
    text: "My voice twin is currently learning how to say LangChain without sounding like a robot. Trust me, it is harder than it sounds. Drop me a message and the real Haisem will respond!",
    audio: "/voice-fallback-2.mp3",
  },
  {
    text: "The AI version of me is on a coffee break. Ironic, I know. But hey, even neural networks need caffeine sometimes. Reach out directly and I'll prove that humans are still faster. Sometimes.",
    audio: "/voice-fallback-3.mp3",
  },
];

export function VoiceBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [fallbackIndex] = useState(() => Math.floor(Math.random() * fallbackMessages.length));
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Tooltip on first visit
  useEffect(() => {
    const seen = localStorage.getItem("voice-tooltip-seen");
    if (!seen) {
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      const hide = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem("voice-tooltip-seen", "1");
      }, 8000);
      return () => { clearTimeout(timer); clearTimeout(hide); };
    }
  }, []);

  // Type out message and play audio when panel opens (fallback mode)
  useEffect(() => {
    if (!isOpen || ELEVENLABS_AGENT_ID) return;

    const msg = fallbackMessages[fallbackIndex];

    // Start typing
    setIsTyping(true);
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < msg.text.length) {
        setTypedText(msg.text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);

    // Play audio after a brief delay
    const audioTimer = setTimeout(() => {
      const audio = new Audio(msg.audio);
      audioRef.current = audio;
      setIsSpeaking(true);
      audio.play().catch(() => {});
      audio.onended = () => setIsSpeaking(false);
    }, 400);

    return () => {
      clearInterval(interval);
      clearTimeout(audioTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsSpeaking(false);
    };
  }, [isOpen, fallbackIndex]);

  const handleClose = () => {
    setIsOpen(false);
    setStatus("idle");
    setTypedText("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  };

  const hasAgent = ELEVENLABS_AGENT_ID.length > 0;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="orb"
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {/* Sonar ping */}
            <motion.div
              className="absolute inset-0 rounded-full border border-accent/30"
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, ease: "easeOut" }}
            />

            {/* Cyborg portrait orb */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent/40 cursor-pointer shadow-lg"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, borderColor: "var(--color-accent)" }}
              aria-label="Talk to Haisem AI"
              style={{
                boxShadow: "0 0 12px var(--color-accent-glow), 0 0 24px var(--color-accent-glow)",
              }}
            >
              <img
                src="/haisem-ai.webp"
                alt="Talk to Haisem AI"
                className="w-full h-full object-cover object-top"
              />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 10, opacity: 0 }}
                >
                  Talk to me
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ── Expanded Panel ── */
          <motion.div
            key="panel"
            className="w-80 rounded-2xl glass overflow-hidden shadow-2xl"
            initial={{ scale: 0, borderRadius: "50%" }}
            animate={{ scale: 1, borderRadius: 16 }}
            exit={{ scale: 0, borderRadius: "50%" }}
            transition={{ duration: 0.4, ease: silkEase }}
            style={{ transformOrigin: "bottom right" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${hasAgent ? "bg-green-400" : "bg-amber-400"} animate-pulse`} />
                <span className="text-sm font-medium text-text">
                  {hasAgent ? "Haisem AI" : "Haisem AI (beta)"}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-text-secondary hover:text-text transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col items-center justify-center min-h-[320px]">
              {hasAgent ? (
                /* Active agent mode */
                <>
                  <div className="mb-4 w-24 h-24 overflow-hidden">
                    <img src="/haisem-ai.webp" alt="Haisem AI" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex items-end gap-1 h-12 mb-4">
                    {[0.3, 0.6, 1, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-accent/50"
                        animate={status === "speaking" ? { scaleY: [0.2, h, 0.2] } : { scaleY: 0.2 }}
                        transition={{ duration: 1.2, repeat: status === "speaking" ? Infinity : 0, delay: i * 0.08, ease: "easeInOut" }}
                        style={{ height: "100%", transformOrigin: "bottom" }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary capitalize">
                    {status === "idle" ? "Ready to listen" : `${status}...`}
                  </p>
                  <motion.button
                    className="mt-6 w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStatus(status === "listening" ? "idle" : "listening")}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={status === "listening" ? "text-red-400" : "text-accent"}>
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </motion.button>
                </>
              ) : (
                /* ── Funny Fallback with Cyborg Avatar + Audio ── */
                <div className="text-center flex flex-col items-center">
                  {/* Cyborg portrait */}
                  <motion.div
                    className="mb-3 w-28 h-28 overflow-hidden"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    
                  >
                    <img src="/haisem-ai.webp" alt="Haisem AI" className="w-full h-full object-cover object-top" />
                  </motion.div>

                  {/* Speaking wave - reacts to audio */}
                  <div className="flex items-end gap-1 h-8 mb-3">
                    {[0.2, 0.4, 0.7, 1, 0.7, 0.4, 0.2].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-accent/40"
                        animate={
                          isSpeaking
                            ? { scaleY: [0.15, h, 0.15] }
                            : { scaleY: 0.15 }
                        }
                        transition={{
                          duration: 0.8,
                          repeat: isSpeaking ? Infinity : 0,
                          delay: i * 0.06,
                          ease: "easeInOut",
                        }}
                        style={{ height: "100%", transformOrigin: "bottom" }}
                      />
                    ))}
                  </div>

                  {/* Typed message */}
                  <p className="text-xs text-text-secondary leading-relaxed px-2 min-h-[72px]">
                    {typedText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>

                  {/* CTA */}
                  <motion.a
                    href="mailto:haisem.work@gmail.com"
                    className="mt-4 px-5 py-2 rounded-full bg-accent/20 border border-accent/30 text-xs font-medium text-accent hover:bg-accent/30 transition-colors inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Message the real Haisem
                  </motion.a>

                  <p className="text-[10px] text-text-secondary/50 mt-3">
                    Voice agent launching soon
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
