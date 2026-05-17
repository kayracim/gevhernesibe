"use client";

import { useState } from "react";
import { Section } from "./Section";

type Point = { t: string; d: string };
type SectionData = { title: string; intro: string; points: Point[] };

interface PulseScienceProps {
  data: {
    badge: string;
    title: string;
    lead: string;
    tabs: {
      dataAnalysis: string;
      lieDetector: string;
      algorithm: string;
    };
    sections: {
      dataAnalysis: SectionData;
      lieDetector: SectionData;
      algorithm: SectionData;
    };
    source: string;
  };
}

export function PulseScienceSection({ data }: PulseScienceProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof data.sections>("dataAnalysis");

  const tabs: { id: keyof typeof data.sections; label: string; icon: string }[] = [
    { id: "dataAnalysis", label: data.tabs.dataAnalysis, icon: "📊" },
    { id: "lieDetector", label: data.tabs.lieDetector, icon: "💓" },
    { id: "algorithm", label: data.tabs.algorithm, icon: "⚕️" },
  ];

  return (
    <div className="mt-20">
      <div className="space-y-4 mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage inline-block rounded-full bg-heritage/10 px-3 py-1">
          {data.badge}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-paper sm:text-4xl">
          {data.title}
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-ink-muted dark:text-paper/80">
          {data.lead}
        </p>
      </div>

      <div className="rounded-3xl bg-paper/50 p-2 shadow-sm border border-sand dark:bg-ink/40 dark:border-paper/10 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-clinical/5 blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-heritage/5 blur-3xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-2xl py-4 px-6 text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                activeTab === tab.id
                  ? "bg-heritage text-white shadow-md scale-[1.02]"
                  : "bg-white/50 text-ink-muted hover:bg-heritage/10 dark:bg-ink/50 dark:text-paper/60 dark:hover:bg-heritage/20"
              }`}
            >
              <span className="text-2xl drop-shadow-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative z-10 mt-4 rounded-2xl bg-white p-6 sm:p-10 shadow-inner border border-sand/50 dark:bg-ink/80 dark:border-paper/5">
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-display text-2xl font-bold text-ink dark:text-paper mb-4 flex items-center gap-3">
              <span className="text-heritage">
                {tabs.find(t => t.id === activeTab)?.icon}
              </span>
              {data.sections[activeTab].title}
            </h3>
            <p className="text-lg leading-relaxed text-ink-muted dark:text-paper/80 mb-8 border-l-4 border-heritage/50 pl-5 italic bg-heritage/5 py-3 pr-3 rounded-r-lg">
              {data.sections[activeTab].intro}
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {data.sections[activeTab].points.map((point, i) => (
                <div key={i} className="group rounded-xl bg-accent/5 p-6 border border-accent/10 hover:border-accent/30 hover:bg-accent/10 transition-all duration-300 hover:-translate-y-1">
                  <h4 className="font-bold text-accent mb-3 pb-2 border-b border-accent/10 group-hover:border-accent/30 transition-colors">
                    {point.t}
                  </h4>
                  <p className="text-sm text-ink-muted dark:text-paper/70 leading-relaxed group-hover:text-ink dark:group-hover:text-paper/90 transition-colors">
                    {point.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center sm:text-right">
        <p className="inline-block rounded-full bg-paper px-4 py-2 text-xs italic text-ink-muted/70 border border-sand shadow-sm dark:bg-ink/50 dark:text-paper/50 dark:border-paper/5">
          📚 Kaynak: {data.source}
        </p>
      </div>
    </div>
  );
}
