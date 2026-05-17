"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Point = { t: string; d: string; icon?: string };
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
    bibliography: string[];
  };
}

export function PulseScienceSection({ data }: PulseScienceProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof data.sections>("dataAnalysis");
  const [activeCard, setActiveCard] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const points = data.sections[activeTab].points;
  const totalCards = points.length;

  const updateActiveCard = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    // At or very close to the end → snap to last card
    if (scrollLeft + clientWidth >= scrollWidth - 16) {
      setActiveCard(totalCards - 1);
      return;
    }
    const cardEl = container.querySelector('[data-card]') as HTMLElement | null;
    const cardWidth = cardEl?.offsetWidth ?? 300;
    const gap = 24;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveCard(Math.max(0, Math.min(index, totalCards - 1)));
  }, [totalCards]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveCard, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveCard);
  }, [updateActiveCard]);

  // Reset scroll + active card when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    setActiveCard(0);
  }, [activeTab]);

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('[data-card]')?.clientWidth ?? 300;
    const gap = 24;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    const next = direction === "right"
      ? Math.min(activeCard + 1, totalCards - 1)
      : Math.max(activeCard - 1, 0);
    scrollToCard(next);
  };

  const tabs: { id: keyof typeof data.sections; label: string; icon: string }[] = [
    { id: "dataAnalysis", label: data.tabs.dataAnalysis, icon: "📊" },
    { id: "lieDetector", label: data.tabs.lieDetector, icon: "💓" },
    { id: "algorithm", label: data.tabs.algorithm, icon: "⚕️" },
  ];

  return (
    <div className="mt-20">
      {/* Header */}
      <div className="space-y-4 mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage inline-block rounded-full bg-heritage/10 px-3 py-1">
          {data.badge}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-paper sm:text-4xl">
          {data.title}
        </h2>
        <p className="mx-auto max-w-4xl text-lg leading-relaxed text-ink-muted dark:text-paper/80 whitespace-pre-wrap">
          {data.lead}
        </p>
      </div>

      <div className="rounded-3xl bg-paper/50 p-3 shadow-sm border border-sand dark:bg-ink/40 dark:border-paper/10 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-clinical/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-heritage/5 blur-3xl pointer-events-none" />

        {/* Tabs */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-2 mb-4">
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
              <span className="text-2xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 rounded-2xl bg-white p-5 sm:p-8 shadow-inner border border-sand/50 dark:bg-ink/80 dark:border-paper/5">
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section header */}
            <h3 className="font-display text-2xl font-bold text-ink dark:text-paper mb-3 flex items-center gap-3">
              <span className="text-heritage">{tabs.find((t) => t.id === activeTab)?.icon}</span>
              {data.sections[activeTab].title}
            </h3>
            <p className="text-base leading-relaxed text-ink-muted dark:text-paper/80 mb-6 border-l-4 border-heritage/50 pl-5 italic bg-heritage/5 py-3 pr-3 rounded-r-lg">
              {data.sections[activeTab].intro}
            </p>

            {/* Counter + Arrow Controls Row */}
            <div className="flex items-center justify-between mb-4">
              {/* Progress: "3 / 6" style */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-ink-muted dark:text-paper/60">
                  <span className="text-2xl font-bold text-heritage">{activeCard + 1}</span>
                  <span className="text-ink-muted dark:text-paper/40"> / {totalCards}</span>
                </span>
                {/* Dot indicators */}
                <div className="flex gap-1.5">
                  {points.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToCard(i)}
                      aria-label={`Kart ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeCard
                          ? "w-6 bg-heritage"
                          : "w-2 bg-sand dark:bg-paper/20 hover:bg-heritage/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Arrow buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={activeCard === 0}
                  className="p-2 rounded-full bg-sand/30 hover:bg-heritage/20 text-ink-muted dark:bg-paper/5 dark:hover:bg-heritage/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Önceki"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={activeCard === totalCards - 1}
                  className="p-2 rounded-full bg-sand/30 hover:bg-heritage/20 text-ink-muted dark:bg-paper/5 dark:hover:bg-heritage/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Sonraki"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>

            {/* Horizontal scroll carousel */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {points.map((point, i) => (
                <div
                  key={i}
                  data-card
                  className="snap-start shrink-0 w-72 sm:w-80 rounded-2xl border border-accent/10 bg-accent/5 hover:border-accent/30 hover:bg-accent/10 transition-all duration-300 group relative"
                  style={{ height: "240px" }}
                >
                  {/* Background icon watermark */}
                  <div className="absolute top-2 right-2 text-7xl opacity-10 select-none pointer-events-none z-0">
                    {point.icon || "✨"}
                  </div>

                  {/* Internally scrollable content — CSS overscroll-contain keeps page scroll intact */}
                  <div
                    className="relative z-10 h-full overflow-y-scroll p-6"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      overscrollBehavior: "contain",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {point.icon && (
                        <span className="text-2xl bg-white dark:bg-ink p-2 rounded-xl shadow-sm border border-sand/50 dark:border-paper/10 shrink-0">
                          {point.icon}
                        </span>
                      )}
                      <h4 className="font-bold text-accent text-base leading-tight">{point.t}</h4>
                    </div>
                    <p className="text-sm text-ink-muted dark:text-paper/70 leading-relaxed">
                      {point.d}
                    </p>
                    {/* Extra padding so content can scroll up inside the card */}
                    <div className="h-16" />
                  </div>

                  {/* Bottom fade hint */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 rounded-b-2xl bg-gradient-to-t from-accent/15 to-transparent pointer-events-none z-20" />
                </div>
              ))}
            </div>

            {/* Mobile swipe hint */}
            <p className="text-center text-xs text-ink-muted/40 dark:text-paper/25 mt-3 sm:hidden">
              Kartları keşfetmek için sağa kaydırın ⟷
            </p>
          </div>
        </div>
      </div>

      {/* Bibliography */}
      {data.bibliography && data.bibliography.length > 0 && (
        <div className="mt-8 rounded-2xl border border-sand bg-paper p-5 dark:border-paper/10 dark:bg-ink shadow-sm text-center">
          <p className="text-xs text-ink-muted dark:text-paper/60 italic">
            📚 Kaynak: {data.bibliography.join(" | ")}
          </p>
        </div>
      )}
    </div>
  );
}
