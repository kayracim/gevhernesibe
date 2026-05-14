"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";
import type { CaseTag, LocalizedCase } from "@/content/cases";
import { CaseStudyCard } from "@/components/CaseStudyCard";

type FilterKey = "all" | CaseTag;

export function CaseStudyExplorer({
  locale,
  items,
  labels,
  exampleLabel,
}: {
  locale: Locale;
  items: LocalizedCase[];
  labels: {
    all: string;
    imaging: string;
    lab: string;
    care: string;
  };
  exampleLabel: string;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const chips: { key: FilterKey; label: string }[] = [
    { key: "all", label: labels.all },
    { key: "imaging", label: labels.imaging },
    { key: "lab", label: labels.lab },
    { key: "care", label: labels.care },
  ];

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((c) => c.tags.includes(filter));
  }, [filter, items]);

  return (
    <div className="space-y-8">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={locale === "tr" ? "Hikâye filtreleri" : "Story filters"}
      >
        {chips.map((chip) => {
          const selected = filter === chip.key;
          return (
            <button
              key={chip.key}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(chip.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-sand bg-paper text-ink-muted hover:border-heritage/40 hover:text-ink"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((item) => (
          <CaseStudyCard key={item.id} item={item} locale={locale} exampleLabel={exampleLabel} />
        ))}
      </div>
    </div>
  );
}
