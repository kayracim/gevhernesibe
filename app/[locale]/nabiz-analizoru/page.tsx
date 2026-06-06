"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { getDictionary, type Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { useParams } from "next/navigation";

export default function PulseAnalyzerPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "tr";
  
  // Load localizations
  const [dict, setDict] = useState<Messages | null>(null);
  
  useEffect(() => {
    getDictionary(locale).then((data) => {
      setDict(data);
    });
  }, [locale]);

  // States
  const [bpm, setBpm] = useState(75);
  const [soundOn, setSoundOn] = useState(false);

  // Editable ranges state
  const [thresholds, setThresholds] = useState({
    fearMax: 60,
    sadnessMax: 70,
    balanceMax: 85,
    angerMax: 100,
  });

  // Audio Context for synthetic heartbeat sound
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextBeatTimeRef = useRef(0);
  const audioTimerRef = useRef<number | null>(null);

  // Heartbeat sound scheduler
  const playHeartbeat = useCallback((time: number) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // --- "Lub" Sound (Lower Pitch, longer) ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(55, time); // 55Hz
    osc1.frequency.exponentialRampToValueAtTime(0.01, time + 0.12);

    gain1.gain.setValueAtTime(0.5, time);
    gain1.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(time);
    osc1.stop(time + 0.12);

    // --- "Dub" Sound (Slightly higher pitch, shorter, after short delay) ---
    const delay = 0.14;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(75, time + delay); // 75Hz
    osc2.frequency.exponentialRampToValueAtTime(0.01, time + delay + 0.08);

    gain2.gain.setValueAtTime(0.4, time + delay);
    gain2.gain.exponentialRampToValueAtTime(0.01, time + delay + 0.08);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(time + delay);
    osc2.stop(time + delay + 0.08);
  }, []);

  // Sound loop scheduler
  useEffect(() => {
    if (!soundOn) {
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
      return;
    }

    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }

    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    nextBeatTimeRef.current = ctx.currentTime;

    const lookahead = 0.1;
    const scheduleInterval = 50; // ms

    const scheduler = () => {
      const beatLength = 60.0 / bpm;
      while (nextBeatTimeRef.current < ctx.currentTime + lookahead) {
        playHeartbeat(nextBeatTimeRef.current);
        nextBeatTimeRef.current += beatLength;
      }
    };

    audioTimerRef.current = window.setInterval(scheduler, scheduleInterval);

    return () => {
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
    };
  }, [soundOn, bpm, playHeartbeat]);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Determine State key based on BPM and current thresholds
  const stateKey = useMemo(() => {
    if (bpm < thresholds.fearMax) return "fear";
    if (bpm < thresholds.sadnessMax) return "sadness";
    if (bpm < thresholds.balanceMax) return "balance";
    if (bpm < thresholds.angerMax) return "anger";
    return "excitement";
  }, [bpm, thresholds]);

  // Safe translations access helper
  const t = useCallback((key: string, defaultVal: string): string => {
    if (!dict) return defaultVal;
    const keys = key.split(".");
    let current: unknown = dict;
    for (const k of keys) {
      if (current && typeof current === "object" && k in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[k];
      } else {
        return defaultVal;
      }
    }
    return typeof current === "string" ? current : defaultVal;
  }, [dict]);

  const activeState = useMemo(() => {
    return {
      name: t(`pulseAnalyzerPage.states.${stateKey}.name`, ""),
      desc: t(`pulseAnalyzerPage.states.${stateKey}.desc`, ""),
      mizac: t(`pulseAnalyzerPage.states.${stateKey}.mizac`, ""),
      makam: t(`pulseAnalyzerPage.states.${stateKey}.makam`, ""),
      gida: t(`pulseAnalyzerPage.states.${stateKey}.gida`, ""),
    };
  }, [stateKey, t]);

  if (!dict) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-heritage border-t-transparent" />
      </div>
    );
  }

  const p = dict.pulseAnalyzerPage;

  return (
    <div className="space-y-12">
      {/* CSS Animation Keyframes for heartbeat */}
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.18); }
          28% { transform: scale(1.04); }
          42% { transform: scale(1.24); }
          70% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat linear infinite;
        }
      `}</style>

      <PageIntro title={p.title} subtitle={p.subtitle} />

      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper/80">
        {p.intro}
      </p>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Side: Controller and Heart Visualizer */}
        <div className="space-y-8 lg:col-span-7">
          <Section id="analizor-kontrol" title={locale === "tr" ? "Ritim Kontrol Paneli" : "Rhythm Control Panel"}>
            <div className="flex flex-col sm:flex-row items-center gap-8 rounded-3xl border border-sand bg-paper/50 p-8 shadow-sm dark:border-paper/10 dark:bg-ink/40">
              
              {/* Pulsing Heart Animation */}
              <div className="flex flex-col items-center justify-center shrink-0 w-40 h-40 rounded-full border border-heritage/20 bg-heritage/5 relative">
                <div 
                  className="animate-heartbeat text-heritage text-6xl drop-shadow-[0_4px_10px_rgba(202,138,4,0.3)]"
                  style={{ animationDuration: `${60 / bpm}s` }}
                >
                  ❤️
                </div>
                <span className="absolute bottom-4 font-mono text-lg font-bold text-ink dark:text-paper">{bpm} BPM</span>
              </div>

              {/* Slider & Value Controls */}
              <div className="flex-1 w-full space-y-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="bpm-slider" className="font-semibold text-ink dark:text-paper">
                    {p.bpmLabel}
                  </label>
                  <input
                    type="number"
                    value={bpm}
                    onChange={(e) => setBpm(Math.max(20, Math.min(220, Number(e.target.value))))}
                    className="w-20 rounded-xl border border-sand bg-white px-3 py-1.5 text-center font-mono font-bold text-ink focus:border-heritage focus:outline-none dark:border-paper/10 dark:bg-ink dark:text-paper"
                    min="20"
                    max="220"
                  />
                </div>

                <input
                  id="bpm-slider"
                  type="range"
                  min="30"
                  max="160"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full accent-heritage cursor-pointer bg-sand/50 h-2 rounded-lg dark:bg-paper/15"
                />

                {/* Sound Rhythm Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-sand/40 dark:border-paper/5">
                  <span className="text-sm font-medium text-ink-muted dark:text-paper/70 flex items-center gap-2">
                    🔊 {p.soundToggle}
                  </span>
                  <button
                    onClick={() => setSoundOn(!soundOn)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      soundOn ? "bg-heritage" : "bg-sand dark:bg-paper/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        soundOn ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>
          </Section>

          {/* Diagnosis & Advice Card */}
          <Section id="teshis-panel" title={p.analysisTitle}>
            <div className="rounded-3xl border border-accent/20 bg-accent/5 p-8 shadow-card dark:border-accent/10 dark:bg-accent/5 space-y-6">
              
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  İlm-i Nabız Bulgusu
                </span>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-paper mt-1">
                  {activeState.name}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted dark:text-paper/80">
                  {activeState.desc}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-accent/10">
                <div className="rounded-2xl border border-sand bg-white/60 p-4 dark:border-paper/5 dark:bg-ink/50 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-heritage/80 dark:text-heritage">
                    {p.mizacLabel}
                  </p>
                  <p className="mt-1 text-base font-semibold text-ink dark:text-paper">{activeState.mizac}</p>
                </div>

                <div className="rounded-2xl border border-sand bg-white/60 p-4 dark:border-paper/5 dark:bg-ink/50 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-clinical">
                    {p.makamLabel}
                  </p>
                  <p className="mt-1 text-base font-semibold text-ink dark:text-paper">{activeState.makam}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-sand bg-white/60 p-5 dark:border-paper/5 dark:bg-ink/50 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  {p.gidaLabel}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted dark:text-paper/80">{activeState.gida}</p>
              </div>

              <p className="text-xs text-ink-muted/50 dark:text-paper/40 italic text-center">
                ⚠️ {p.caution}
              </p>

            </div>
          </Section>
        </div>

        {/* Right Side: Custom Threshold Controls */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-sand bg-gradient-to-br from-paper via-clinical-soft/20 to-sand p-6 shadow-card dark:border-paper/10 dark:from-ink dark:via-clinical/5 dark:to-ink sm:p-8 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-ink dark:text-paper">
                ⚙️ {p.settingsTitle}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted dark:text-paper/60">
                {p.settingsIntro}
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-sand/40 dark:border-paper/5">
              {/* Fear Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink dark:text-paper">{p.fearLabel}</span>
                  <span className="font-mono font-bold text-heritage">&lt; {thresholds.fearMax} BPM</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="75"
                  value={thresholds.fearMax}
                  onChange={(e) => setThresholds({ ...thresholds, fearMax: Number(e.target.value) })}
                  className="w-full accent-heritage h-1.5 rounded-lg bg-sand dark:bg-paper/20 cursor-pointer"
                />
              </div>

              {/* Sadness Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink dark:text-paper">{p.sadnessLabel}</span>
                  <span className="font-mono font-bold text-heritage">{thresholds.fearMax} - {thresholds.sadnessMax} BPM</span>
                </div>
                <input
                  type="range"
                  min={thresholds.fearMax + 1}
                  max="90"
                  value={thresholds.sadnessMax}
                  onChange={(e) => setThresholds({ ...thresholds, sadnessMax: Number(e.target.value) })}
                  className="w-full accent-heritage h-1.5 rounded-lg bg-sand dark:bg-paper/20 cursor-pointer"
                />
              </div>

              {/* Balance Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink dark:text-paper">{p.balanceLabel}</span>
                  <span className="font-mono font-bold text-heritage">{thresholds.sadnessMax} - {thresholds.balanceMax} BPM</span>
                </div>
                <input
                  type="range"
                  min={thresholds.sadnessMax + 1}
                  max="110"
                  value={thresholds.balanceMax}
                  onChange={(e) => setThresholds({ ...thresholds, balanceMax: Number(e.target.value) })}
                  className="w-full accent-heritage h-1.5 rounded-lg bg-sand dark:bg-paper/20 cursor-pointer"
                />
              </div>

              {/* Anger Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink dark:text-paper">{p.angerLabel}</span>
                  <span className="font-mono font-bold text-heritage">{thresholds.balanceMax} - {thresholds.angerMax} BPM</span>
                </div>
                <input
                  type="range"
                  min={thresholds.balanceMax + 1}
                  max="140"
                  value={thresholds.angerMax}
                  onChange={(e) => setThresholds({ ...thresholds, angerMax: Number(e.target.value) })}
                  className="w-full accent-heritage h-1.5 rounded-lg bg-sand dark:bg-paper/20 cursor-pointer"
                />
              </div>

              <div className="rounded-xl border border-sand bg-paper/50 p-4 dark:border-paper/5 dark:bg-ink/40">
                <p className="text-[10px] font-bold text-clinical uppercase">Aşırı Uyarılma / Aşk</p>
                <p className="text-xs font-semibold text-ink-muted dark:text-paper/70 mt-1">
                  {thresholds.angerMax} BPM üzerindeki tüm ritimler aşırı uyarılma mizaç grubuna dahil edilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
