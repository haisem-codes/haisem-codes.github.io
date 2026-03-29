"use client";

import dynamic from "next/dynamic";

const VoiceBot = dynamic(
  () => import("./VoiceBot").then((m) => m.VoiceBot),
  { ssr: false }
);

export function VoiceBotLoader() {
  return <VoiceBot />;
}
