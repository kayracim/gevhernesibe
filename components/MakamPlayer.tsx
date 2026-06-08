"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface MakamPlayerProps {
  makam: string;
  locale: "tr" | "en";
}

interface Note {
  freq: number;
  duration: number; // in milliseconds
  isPluckAccompany?: boolean; // if true, play Ud pluck alongside Ney flute
  pluckFreq?: number;
}

export function MakamPlayer({ makam, locale }: MakamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentNoteName, setCurrentNoteName] = useState("");

  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);
  const startTimeRef = useRef(0);

  // Normalize makam name to find matching sequence
  const normalizedMakam = makam.toLowerCase();

  // Define traditional notes for each makam
  const getMelody = useCallback((): Note[] => {
    // Rast: G4, A4, B4(flat-1/4), C5, D5, E5(flat-1/4), F#5, G5
    const rastNotes: Note[] = [
      { freq: 392.00, duration: 800, isPluckAccompany: true, pluckFreq: 196.00 }, // Sol
      { freq: 440.00, duration: 800 }, // La
      { freq: 482.00, duration: 800, isPluckAccompany: true, pluckFreq: 241.00 }, // Si (slightly flat)
      { freq: 523.25, duration: 1200 }, // Do
      { freq: 587.33, duration: 800, isPluckAccompany: true, pluckFreq: 293.66 }, // Re
      { freq: 645.00, duration: 800 }, // Mi (slightly flat)
      { freq: 739.99, duration: 800, isPluckAccompany: true, pluckFreq: 369.99 }, // Fa#
      { freq: 783.99, duration: 1600, isPluckAccompany: true, pluckFreq: 392.00 }, // Sol
      { freq: 587.33, duration: 800 }, // Re
      { freq: 482.00, duration: 800, isPluckAccompany: true, pluckFreq: 241.00 }, // Si
      { freq: 392.00, duration: 1600, isPluckAccompany: true, pluckFreq: 196.00 }, // Sol
    ];

    // Nihavend: G4, A4, Bb4, C5, D5, Eb5, F5, G5
    const nihavendNotes: Note[] = [
      { freq: 392.00, duration: 800, isPluckAccompany: true, pluckFreq: 196.00 }, // Sol
      { freq: 466.16, duration: 800 }, // Si b
      { freq: 523.25, duration: 800, isPluckAccompany: true, pluckFreq: 261.63 }, // Do
      { freq: 587.33, duration: 1200 }, // Re
      { freq: 659.25, duration: 800, isPluckAccompany: true, pluckFreq: 329.63 }, // Mi b
      { freq: 587.33, duration: 800 }, // Re
      { freq: 523.25, duration: 800, isPluckAccompany: true, pluckFreq: 261.63 }, // Do
      { freq: 466.16, duration: 800 }, // Si b
      { freq: 392.00, duration: 1600, isPluckAccompany: true, pluckFreq: 196.00 }, // Sol
    ];

    // Uşşak: D4, E4(flat-1/4), F4, G4, A4, Bb4, C5, D5
    const ussakNotes: Note[] = [
      { freq: 293.66, duration: 800, isPluckAccompany: true, pluckFreq: 146.83 }, // Re
      { freq: 320.00, duration: 800 }, // Mi (flat)
      { freq: 349.23, duration: 800, isPluckAccompany: true, pluckFreq: 174.61 }, // Fa
      { freq: 392.00, duration: 1200 }, // Sol
      { freq: 440.00, duration: 800, isPluckAccompany: true, pluckFreq: 220.00 }, // La
      { freq: 392.00, duration: 800 }, // Sol
      { freq: 349.23, duration: 800, isPluckAccompany: true, pluckFreq: 174.61 }, // Fa
      { freq: 320.00, duration: 800 }, // Mi
      { freq: 293.66, duration: 1600, isPluckAccompany: true, pluckFreq: 146.83 }, // Re
    ];

    // Rehavi: G4, C5, B4, A4, G4, A4, B4, G4
    const rehaviNotes: Note[] = [
      { freq: 392.00, duration: 800, isPluckAccompany: true, pluckFreq: 196.00 }, // Sol
      { freq: 523.25, duration: 800 }, // Do
      { freq: 482.00, duration: 800, isPluckAccompany: true, pluckFreq: 241.00 }, // Si
      { freq: 440.00, duration: 1200 }, // La
      { freq: 392.00, duration: 800, isPluckAccompany: true, pluckFreq: 196.00 }, // Sol
      { freq: 440.00, duration: 800 }, // La
      { freq: 482.00, duration: 800, isPluckAccompany: true, pluckFreq: 241.00 }, // Si
      { freq: 392.00, duration: 1600, isPluckAccompany: true, pluckFreq: 196.00 }, // Sol
    ];

    if (normalizedMakam.includes("nihavend")) return nihavendNotes;
    if (normalizedMakam.includes("uşşak") || normalizedMakam.includes("ussak") || normalizedMakam.includes("irak")) return ussakNotes;
    if (normalizedMakam.includes("rehavi")) return rehaviNotes;
    return rastNotes; // Default/Rast
  }, [normalizedMakam]);

  const getNoteName = (freq: number): string => {
    if (freq === 392.00) return "Sol / Rast";
    if (freq === 440.00) return "La / Dügâh";
    if (freq === 466.16) return "Si♭ / Kürdî";
    if (freq === 482.00) return "Si / Segâh";
    if (freq === 523.25) return "Do / Çârgâh";
    if (freq === 587.33) return "Re / Neva";
    if (freq === 645.00) return "Mi / Hüseyni";
    if (freq === 659.25) return "Mi♭ / Hisar";
    if (freq === 739.99) return "Fa# / Eviç";
    if (freq === 783.99) return "Sol / Gerdaniye";
    if (freq === 293.66) return "Re / Yegâh";
    if (freq === 320.00) return "Mi / Uşşak";
    if (freq === 349.23) return "Fa / Acem";
    return "";
  };

  // Synthesize Ney wind flute note
  const playNeyNote = useCallback((ctx: AudioContext, freq: number, durationMs: number) => {
    const time = ctx.currentTime;
    const duration = durationMs / 1000;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    // 1. Gentle pitch vibrato
    lfo.frequency.value = 5.2; // 5.2Hz vibrato
    lfoGain.gain.value = 3.5; // pitch shift deviation
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // 2. Volume envelope for breathing (Slow attack and release)
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.35, time + 0.15); // soft attack
    gain.gain.setValueAtTime(0.35, time + duration - 0.15);
    gain.gain.linearRampToValueAtTime(0, time + duration); // soft release

    // 3. Breath noise simulation (Filtered white noise)
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(freq * 1.8, time);
    noiseFilter.Q.setValueAtTime(1.2, time);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, time);
    noiseGain.gain.linearRampToValueAtTime(0.04, time + 0.1);
    noiseGain.gain.setValueAtTime(0.04, time + duration - 0.1);
    noiseGain.gain.linearRampToValueAtTime(0, time + duration);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(gain);
    gain.connect(ctx.destination);

    lfo.start(time);
    osc.start(time);
    noise.start(time);

    lfo.stop(time + duration);
    osc.stop(time + duration);
    noise.stop(time + duration);
  }, []);

  // Synthesize Ud plucked string note
  const playUdNote = useCallback((ctx: AudioContext, freq: number, durationMs: number) => {
    const time = ctx.currentTime;
    const duration = durationMs / 1000;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Warm triangle + sine subharmonics
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, time);

    // Warm acoustic lowpass filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(700, time);

    // String pluck volume envelope (Fast attack, long decay)
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.25, time + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + Math.min(duration, 1.6));

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.value = 0.3;

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(time);
    osc2.start(time);

    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }, []);

  const stopAudio = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentNoteName("");
  }, []);

  const playNextNote = useCallback(() => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const melody = getMelody();
    const index = noteIndexRef.current;
    const currentNote = melody[index];

    // Play instruments
    playNeyNote(ctx, currentNote.freq, currentNote.duration);
    if (currentNote.isPluckAccompany && currentNote.pluckFreq) {
      // Pluck Ud note 20ms offset to sound natural
      setTimeout(() => {
        if (isPlaying && audioContextRef.current) {
          playUdNote(audioContextRef.current, currentNote.pluckFreq!, currentNote.duration);
        }
      }, 20);
    }

    setCurrentNoteName(getNoteName(currentNote.freq));

    // Update Progress
    const totalMelodyDuration = melody.reduce((acc, curr) => acc + curr.duration, 0);
    const playedDuration = melody.slice(0, index).reduce((acc, curr) => acc + curr.duration, 0);
    
    // Animate progress smoothly
    let currentNoteProgress = 0;
    const noteSteps = 10;
    const stepInterval = currentNote.duration / noteSteps;
    const progressTimer = setInterval(() => {
      currentNoteProgress += stepInterval;
      const totalPlayed = playedDuration + currentNoteProgress;
      setProgress(Math.min((totalPlayed / totalMelodyDuration) * 100, 100));
    }, stepInterval);

    // Schedule next note
    timerRef.current = window.setTimeout(() => {
      clearInterval(progressTimer);
      noteIndexRef.current = (index + 1) % melody.length;
      playNextNote();
    }, currentNote.duration);
  }, [getMelody, playNeyNote, playUdNote, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }
      noteIndexRef.current = 0;
      startTimeRef.current = Date.now();
      setIsPlaying(true);
    }
  };

  // Trigger playNextNote when state changes to playing
  useEffect(() => {
    if (isPlaying) {
      playNextNote();
    } else {
      stopAudio();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, playNextNote, stopAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAudio]);

  return (
    <div className="rounded-2xl border border-sand/60 bg-paper/60 p-4 dark:border-paper/5 dark:bg-ink/50 shadow-sm space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Circular Play Button */}
          <button
            onClick={togglePlay}
            className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              isPlaying
                ? "bg-heritage border-heritage text-white animate-pulse"
                : "bg-paper/90 border-heritage/40 text-heritage hover:bg-heritage hover:text-white dark:bg-ink"
            }`}
            title={isPlaying ? (locale === "tr" ? "Durdur" : "Pause") : (locale === "tr" ? "Dinle" : "Play")}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="4" height="16" />
                <rect x="16" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <div>
            <p className="text-xs font-bold text-ink dark:text-paper">
              🎵 {locale === "tr" ? `${makam} Makamı Şifa Ezgisi` : `${makam} Makam Healing Melody`}
            </p>
            <p className="text-[10px] text-ink-muted dark:text-paper/50 mt-0.5">
              {isPlaying 
                ? (locale === "tr" ? `Sentezlenen Perde: ${currentNoteName}` : `Synthesized: ${currentNoteName}`)
                : (locale === "tr" ? "Şifa enstrümanları (Ney & Ud) sentezlenir" : "Healing instruments (Ney & Oud) synthesized")
              }
            </p>
          </div>
        </div>

        {/* Ekolayzer visualizer bars */}
        <div className="flex items-end gap-0.5 h-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-1 bg-heritage rounded-t-sm transition-all ${
                isPlaying 
                  ? "animate-equalizer" 
                  : "h-1"
              }`}
              style={{
                animationDelay: `${i * 0.15}s`,
                height: isPlaying ? undefined : "4px"
              }}
            />
          ))}
          <style>{`
            @keyframes equalizer {
              0% { height: 4px; }
              50% { height: 24px; }
              100% { height: 4px; }
            }
            .animate-equalizer {
              animation: equalizer 0.8s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full bg-sand dark:bg-paper/10 h-1 rounded-full overflow-hidden">
          <div
            className="h-full bg-heritage transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-ink-muted dark:text-paper/40 font-mono">
          <span>00:00</span>
          <span>{isPlaying ? (locale === "tr" ? "Çalıyor..." : "Playing...") : (locale === "tr" ? "Ezgi Hazır" : "Ready")}</span>
        </div>
      </div>
    </div>
  );
}
