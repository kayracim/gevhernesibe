"use client";

import { useState, useRef, useEffect } from "react";

type Point = { t: string; d: string; icon?: string; extra?: string };
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  const points = data.sections[activeTab].points;
  const total = points.length;

  const [maxIndex, setMaxIndex] = useState(total - 1);

  const updateMaxIndex = () => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const card = scrollRef.current.querySelector("[data-card]") as HTMLElement | null;
    const cardWidth = card?.offsetWidth ?? 300;
    const gap = 24;
    if (scrollWidth <= clientWidth) {
      setMaxIndex(0);
    } else {
      const maxScrollLeft = scrollWidth - clientWidth;
      const maxIdx = Math.round(maxScrollLeft / (cardWidth + gap));
      setMaxIndex(Math.max(0, maxIdx));
    }
  };

  // Reset activeCard & scroll position when tab changes, and recalculate reachable dots
  useEffect(() => {
    setActiveCard(0);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    
    const timer1 = setTimeout(updateMaxIndex, 10);
    const timer2 = setTimeout(updateMaxIndex, 150);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [activeTab, points]);

  // Listen to window resize to adjust dots dynamically (e.g. desktop vs mobile)
  useEffect(() => {
    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);
    return () => window.removeEventListener("resize", updateMaxIndex);
  }, []);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setActiveCard(clamped);
    if (!scrollRef.current) return;
    isScrollingProgrammatically.current = true;
    const container = scrollRef.current;
    const card = container.querySelector("[data-card]") as HTMLElement | null;
    const cardWidth = card?.offsetWidth ?? 300;
    container.scrollTo({ left: clamped * (cardWidth + 24), behavior: "smooth" });
    setTimeout(() => { isScrollingProgrammatically.current = false; }, 600);
  };

  // Update activeCard from manual swipe/scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isScrollingProgrammatically.current) return;
      const card = el.querySelector("[data-card]") as HTMLElement | null;
      const cardWidth = card?.offsetWidth ?? 300;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollLeft + clientWidth >= scrollWidth - 16) {
        setActiveCard(maxIndex);
      } else {
        const idx = Math.round(scrollLeft / (cardWidth + 24));
        setActiveCard(Math.min(idx, maxIndex));
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [maxIndex]);

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
        <p className="mx-auto max-w-4xl text-lg leading-relaxed text-ink-muted dark:text-paper/80">
          {data.lead}
        </p>
        <div className="mx-auto max-w-3xl mt-8 overflow-hidden rounded-3xl border border-sand/60 bg-paper/55 shadow-md dark:border-ink/20 dark:bg-ink/30">
          <img
            src="/images/GEV1.jpeg"
            alt={data.title}
            className="w-full h-auto max-h-[450px] object-cover mx-auto"
          />
        </div>
      </div>

      <div className="rounded-3xl bg-paper/50 p-3 shadow-sm border border-sand dark:bg-ink/40 dark:border-paper/10 relative overflow-hidden">
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
            <h3 className="font-display text-2xl font-bold text-ink dark:text-paper mb-3 flex items-center gap-3">
              <span className="text-heritage">{tabs.find((t) => t.id === activeTab)?.icon}</span>
              {data.sections[activeTab].title}
            </h3>
            <p className="text-base leading-relaxed text-ink-muted dark:text-paper/80 mb-6 border-l-4 border-heritage/50 pl-5 italic bg-heritage/5 py-3 pr-3 rounded-r-lg">
              {data.sections[activeTab].intro}
            </p>

            {/* Dot nav + Arrow controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1.5">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Kart ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeCard
                        ? "w-6 bg-heritage"
                        : "w-2 bg-sand dark:bg-paper/20 hover:bg-heritage/50"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => goTo(activeCard - 1)}
                  disabled={activeCard === 0}
                  className="p-2 rounded-full bg-sand/30 hover:bg-heritage/20 text-ink-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Önceki"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button
                  onClick={() => goTo(activeCard + 1)}
                  disabled={activeCard >= maxIndex}
                  className="p-2 rounded-full bg-sand/30 hover:bg-heritage/20 text-ink-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Sonraki"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>

            {/* Horizontal carousel */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {points.map((point, i) => (
                <div
                  key={i}
                  data-card
                  className="snap-start shrink-0 w-72 sm:w-80 rounded-2xl border border-accent/10 bg-accent/5 hover:border-accent/30 transition-all duration-300 relative"
                  style={{ height: "300px" }}
                >
                  {/* Background icon watermark */}
                  <div className="absolute top-2 right-2 text-7xl opacity-10 select-none pointer-events-none">
                    {point.icon || "✨"}
                  </div>

                  {/* Internally scrollable content */}
                  <div
                    className="h-full overflow-y-auto p-5 relative z-10"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(100,100,100,0.25) transparent",
                      overscrollBehavior: "contain",
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {point.icon && (
                        <span className="text-xl bg-white dark:bg-ink p-2 rounded-xl shadow-sm border border-sand/50 dark:border-paper/10 shrink-0">
                          {point.icon}
                        </span>
                      )}
                      <h4 className="font-bold text-accent text-sm leading-snug pt-1">{point.t}</h4>
                    </div>
                    <p className="text-sm text-ink-muted dark:text-paper/70 leading-relaxed mb-3">
                      {point.d}
                    </p>
                    {point.extra && (
                      <>
                        <div className="border-t border-accent/10 my-3" />
                        <p className="text-xs text-ink-muted/80 dark:text-paper/50 leading-relaxed italic">
                          {point.extra}
                        </p>
                      </>
                    )}
                    <div className="h-4" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-ink-muted/40 dark:text-paper/25 mt-3 sm:hidden">
              Kartları keşfetmek için sağa kaydırın ⟷
            </p>
          </div>
        </div>
      </div>

      {/* Bibliography */}
      {data.bibliography?.length > 0 && (
        <div className="mt-8 rounded-2xl border border-sand bg-paper p-5 dark:border-paper/10 dark:bg-ink shadow-sm text-center">
          <p className="text-xs text-ink-muted dark:text-paper/60 italic">
            📚 Kaynak: {data.bibliography.join(" | ")}
          </p>
        </div>
      )}
    </div>
  );
}
