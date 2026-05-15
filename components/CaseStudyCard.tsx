import type { Locale } from "@/lib/locale";
import type { LocalizedCase } from "@/content/cases";
import { getCaseCopy } from "@/content/cases";

const labels = {
  tr: {
    problem: "Sorun",
    process: "Süreç",
    solution: "Çözüm",
    outcome: "Sonuç",
  },
  en: {
    problem: "Problem",
    process: "Process",
    solution: "Solution",
    outcome: "Outcome",
  },
} as const;

export function CaseStudyCard({
  item,
  locale,
  exampleLabel,
}: {
  item: LocalizedCase;
  locale: Locale;
  exampleLabel: string;
}) {
  const copy = getCaseCopy(item, locale);
  const l = labels[locale];

  return (
    <article className="flex h-full flex-col rounded-3xl border border-sand bg-paper p-6 shadow-card dark:border-ink/20 dark:bg-ink/50 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-xl text-ink dark:text-paper">{copy.title}</h3>
        <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink-muted dark:bg-paper/10 dark:text-paper/60">
          {exampleLabel}
        </span>
      </div>

      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold text-heritage dark:text-heritage/90">{l.problem}</dt>
          <dd className="mt-1 text-ink-muted dark:text-paper/70">{copy.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-clinical dark:text-clinical/90">{l.process}</dt>
          <dd className="mt-1 text-ink-muted dark:text-paper/70">{copy.process}</dd>
        </div>
        <div>
          <dt className="font-semibold text-heritage dark:text-heritage/90">{l.solution}</dt>
          <dd className="mt-1 text-ink-muted dark:text-paper/70">{copy.solution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink dark:text-paper">{l.outcome}</dt>
          <dd className="mt-1 text-ink-muted dark:text-paper/70">{copy.outcome}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-sand bg-clinical-soft/40 px-3 py-1 text-xs font-semibold text-ink-muted dark:border-ink/20 dark:bg-clinical/10 dark:text-paper/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
