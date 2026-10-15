import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SCRIPTS } from "@/lib/demo/scripts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoLoader } from "./DemoLoader";
import { SkylineSvg } from "@/components/three/SkylineSvg";
import { StoryStage } from "./StoryStage";
import { storyFrames } from "./story-ui";
import { Bubble, ChatCard, ChatScroll, DayMark, Chips, Chip, Composer, DemoLayout, PanelBody, PanelCard, Toolbar } from "./demo-ui";

/** Night band: the 21:40 story over the skyline, then the live demo, then the call to action. */
export function ControlRoom({ dict, story, lang }: { dict: Dictionary["controlRoom"]; story: Dictionary["story"]; lang: Locale }) {
  const script = SCRIPTS[lang].salon;
  return (
    <section
      id="control-room"
      data-nav-theme="dark"
      className="night-band band-edge dark relative isolate scroll-mt-16 overflow-clip px-6 pt-24 pb-24 text-text [overflow-anchor:none] sm:pt-32 sm:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-12%] -z-10 h-[760px] w-[760px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,181,71,0.13), rgba(255,181,71,0.04) 55%, transparent)" }}
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeader tone="night" index={dict.index} eyebrow={dict.eyebrow} title={dict.title} accent={dict.accent} kicker={story.note} />
        <StoryStage dict={story} frames={storyFrames(story.ui)} still={<SkylineSvg litRatio={1} />} />

        <div id="try" className="mt-20 scroll-mt-24 sm:mt-28">
          <h3 className="font-display text-3xl font-semibold tracking-tight text-balance text-text sm:text-4xl">{dict.tryTitle}</h3>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-secondary">{dict.kicker}</p>
          <div className="mt-8" data-cursor="try">
            <DemoLoader lang={lang} dict={dict}>
              <DemoLayout toolbar={<Toolbar dict={dict} active="salon" />}>
                <ChatCard dict={dict} business={script.business}>
                  <ChatScroll>
                    <div className="flex flex-col gap-2.5">
                      <DayMark dict={dict} />
                      <Bubble who={dict.bot}>{script.greeting}</Bubble>
                    </div>
                    <Chips label={dict.suggestionsLabel}>
                      {script.suggestions.map((s) => (
                        <Chip key={s} disabled>
                          {s}
                        </Chip>
                      ))}
                    </Chips>
                  </ChatScroll>
                  <Composer dict={dict} disabled />
                </ChatCard>
                <PanelCard dict={dict}>
                  <PanelBody dict={dict} lang={lang} />
                </PanelCard>
              </DemoLayout>
            </DemoLoader>
          </div>
        </div>
      </div>
    </section>
  );
}
