import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkPicture } from "@/components/ui/WorkPicture";

type Item = Dictionary["services"]["items"][number];

const sub = (index: string, i: number) => `${index}.${i + 1}`;

/** A cropped close-up of the redesign's booking widget, linking down to the full before/after. */
function Teaser({ dict }: { dict: Dictionary["services"] }) {
  return (
    <a
      href="#before-after"
      className="group mt-10 flex items-center gap-4 rounded-2xl border border-text/10 bg-bg/60 p-3 pr-4 sm:gap-5 sm:pr-6 transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span aria-hidden className="relative block h-20 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-44 ring-1 ring-black/5 dark:ring-white/10">
        <span className="absolute top-0 left-0 block w-[340%] origin-top-left -translate-x-[70%] -translate-y-[66%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[var(--ease-silk)] group-hover:-translate-x-[68%]">
          <WorkPicture slug="after-site" sizes="600px" />
        </span>
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] tracking-[0.14em] text-text-secondary uppercase">{dict.teaserLabel}</span>
        <span className="mt-1.5 inline-flex items-center gap-2 text-[15px] font-medium whitespace-nowrap text-accent sm:text-base underline decoration-accent/30 underline-offset-[6px] group-hover:decoration-accent">
          {dict.teaser}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
        </span>
      </span>
    </a>
  );
}

function Lead({ item, dict }: { item: Item; dict: Dictionary["services"] }) {
  return (
    <article className="rise relative overflow-hidden rounded-[2rem] bg-accent-tint/60 p-7 sm:p-12 lg:sticky lg:top-28 lg:col-span-7 lg:self-start dark:bg-accent-tint/35">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <span>
          <span className="block font-mono text-sm text-accent tabular-nums">{sub(dict.index, 0)}</span>
          <span className="numeral-outline mt-2 block font-display text-[5.5rem] leading-[0.8] font-bold tracking-[-0.05em] sm:text-[7.5rem]">{dict.leadWord}</span>
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-bg/70 px-3 py-1 text-xs font-medium text-text">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {dict.exampleNote}
        </span>
      </div>
      <h3 className="mt-10 max-w-xl font-display text-[2.25rem] leading-[1.02] font-bold tracking-[-0.03em] text-balance text-text sm:text-5xl">
        {item.title}
      </h3>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-text-secondary">{item.problem}</p>
      <ul className="mt-8 max-w-lg divide-y divide-text/10 border-y border-text/10">
        {item.get.map((g) => (
          <li key={g} className="py-3.5 text-base leading-relaxed text-text">
            {g}
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">{item.time}</p>
      <Teaser dict={dict} />
    </article>
  );
}

function Row({ item, i, index }: { item: Item; i: number; index: string }) {
  return (
    <li className="rise grid grid-cols-[3rem_1fr] gap-x-3 border-b border-border py-8 first:pt-0 sm:grid-cols-[3.75rem_1fr] lg:first:pt-2">
      <span className="pt-1.5 font-mono text-sm text-accent tabular-nums">{sub(index, i)}</span>
      <div>
        <h3 className="font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance text-text">{item.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">{item.problem}</p>
        <ul className="mt-4 space-y-1.5">
          {item.get.map((g) => (
            <li key={g} className="flex gap-3 text-[15px] leading-relaxed text-text">
              <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" />
              {g}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs tracking-[0.14em] text-text-secondary uppercase">{item.time}</p>
      </div>
    </li>
  );
}

/** Editorial spread: the website service leads with a booking-widget teaser, the rest stack as hairline rows. */
export function Services({ dict }: { dict: Dictionary["services"]; lang: Locale }) {
  const [lead, ...rest] = dict.items;
  return (
    <section id="services" className="scroll-mt-24 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rise flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index={dict.index} eyebrow={dict.eyebrow} title={dict.title} />
          <p className="max-w-xs font-mono text-xs leading-relaxed tracking-[0.12em] text-balance text-text-secondary uppercase lg:max-w-[15rem] lg:pb-3 lg:text-right">
            {dict.pricing}
          </p>
        </div>
        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-x-14">
          <Lead item={lead} dict={dict} />
          <ol className="lg:col-span-5">
            {rest.map((item, i) => (
              <Row key={item.id} item={item} i={i + 1} index={dict.index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
