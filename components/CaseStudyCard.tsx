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
    <article className="flex h-full flex-col rounded-3xl border border-sand bg-paper p-6 shadow-card sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-xl text-ink">{copy.title}</h3>
        <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink-muted">
          {exampleLabel}
        </span>
      </div>

      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold text-heritage">{l.problem}</dt>
          <dd className="mt-1 text-ink-muted">{copy.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-clinical">{l.process}</dt>
          <dd className="mt-1 text-ink-muted">{copy.process}</dd>
        </div>
        <div>
          <dt className="font-semibold text-heritage">{l.solution}</dt>
          <dd className="mt-1 text-ink-muted">{copy.solution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">{l.outcome}</dt>
          <dd className="mt-1 text-ink-muted">{copy.outcome}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-sand bg-clinical-soft/40 px-3 py-1 text-xs font-semibold text-ink-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
