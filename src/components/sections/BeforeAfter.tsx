import type { Dictionary } from "@/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkPicture } from "@/components/ui/WorkPicture";
import { ClientBoundary } from "@/components/ui/ClientBoundary";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";

/** Illustrative scores for the concept redesign; not measured. */
const SCORES = [
  { key: "performance", from: 38, to: 96 },
  { key: "accessibility", from: 64, to: 98 },
  { key: "seo", from: 72, to: 97 },
] as const;

const SIZES = "(min-width: 1280px) 860px, (min-width: 1024px) 70vw, 100vw";
const PHONE_SIZES = "100vw";

export function BeforeAfter({ dict }: { dict: Dictionary["beforeAfter"] }) {
  const { index, eyebrow, title, kicker, beforeAlt, afterAlt, dials, ...t } = dict;
  const after = <WorkPicture slug="after-site" sizes={SIZES} alt={afterAlt} />;
  return (
    <section id="before-after" className="scroll-mt-24 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index={index} eyebrow={eyebrow} title={title} kicker={kicker} className="mb-10 sm:mb-14" />
        <ClientBoundary fallback={after}>
          <BeforeAfterSlider
            before={<WorkPicture slug="before-site" sizes={SIZES} alt={beforeAlt} />}
            after={after}
            beforePhone={<WorkPicture slug="before-phone" sizes={PHONE_SIZES} alt={beforeAlt} />}
            afterPhone={<WorkPicture slug="after-phone" sizes={PHONE_SIZES} alt={afterAlt} />}
            scores={SCORES.map((s) => ({ label: dials[s.key], from: s.from, to: s.to }))}
            t={t}
          />
        </ClientBoundary>
      </div>
    </section>
  );
}
