import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SCRIPTS } from "@/lib/demo/scripts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoLoader } from "./DemoLoader";
import { StoryTimeline } from "./StoryTimeline";
import { storyFrames } from "./story-ui";
import { Bubble, ChatCard, DayMark, Chip, Composer, DemoLayout, PanelBody, PanelCard, Toolbar } from "./demo-ui";

export function ControlRoom({ dict, story, lang }: { dict: Dictionary["controlRoom"]; story: Dictionary["story"]; lang: Locale }) {
  const script = SCRIPTS[lang].salon;
  return (
    <section id="control-room" className="dark relative isolate scroll-mt-16 overflow-clip bg-[#08090B] px-6 py-24 text-text sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-12%] -z-10 h-[760px] w-[760px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,181,71,0.13), rgba(255,181,71,0.04) 55%, transparent)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader tone="night" index={dict.index} eyebrow={dict.eyebrow} title={dict.title} accent={dict.accent} kicker={dict.kicker} />
        <div className="mt-12 sm:mt-16">
          <DemoLoader lang={lang} dict={dict}>
            <DemoLayout toolbar={<Toolbar dict={dict} active="salon" />}>
              <ChatCard dict={dict} business={script.business}>
                <div className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 px-4 py-5 sm:px-6">
                  <DayMark dict={dict} />
                  <Bubble who={dict.bot}>{script.greeting}</Bubble>
                </div>
                <div className="flex min-h-[56px] shrink-0 flex-wrap content-end gap-2 px-4 pb-3 sm:px-6">
                  {script.suggestions.map((s) => (
                    <Chip key={s} disabled>
                      {s}
                    </Chip>
                  ))}
                </div>
                <Composer dict={dict} disabled />
              </ChatCard>
              <PanelCard dict={dict}>
                <PanelBody dict={dict} lang={lang} />
              </PanelCard>
            </DemoLayout>
          </DemoLoader>
        </div>
        <div className="mt-24 sm:mt-32">
          <StoryTimeline dict={story} frames={storyFrames(story.ui)} />
        </div>
      </div>
    </section>
  );
}
