"use client";

import { useState, useEffect, useRef } from "react";

interface MakamPlayerProps {
  makam: string;
  locale: "tr" | "en";
}

// Map makam names to MP3 files
function getMakamAudioSrc(makam: string): string {
  const m = makam.toLowerCase()
    .replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c");

  if (m.includes("rehavi") || m.includes("rehav")) return "/images/rehavi.mp3";
  if (m.includes("nihavend") || m.includes("nihav")) return "/images/nihavent.mp3";
  if (m.includes("ussak") || m.includes("ussak") || m.includes("uşşak")) return "/images/ussak.mp3";
  if (m.includes("irak") || m.includes("iraq")) return "/images/irak.mp3";
  if (m.includes("huseyni") || m.includes("hüseyni")) return "/images/huseyni.mp3";
  // Default: Rast
  return "/images/rast.mp3";
}

export function MakamPlayer({ makam, locale }: MakamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const audioSrc = getMakamAudioSrc(makam);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.preload = "metadata";
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });

    return () => {
      audio.pause();
      audio.src = "";
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [audioSrc]);

  // Progress tracker
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        if (audioRef.current) {
          const ct = audioRef.current.currentTime;
          const dur = audioRef.current.duration || 1;
          setCurrentTime(ct);
          setProgress((ct / dur) * 100);
        }
      }, 200);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    }
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    if (!isFinite(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = (Number(e.target.value) / 100) * (audio.duration || 0);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(Number(e.target.value));
  };

  return (
    <div className="rounded-2xl border border-sand/60 bg-paper/60 p-4 dark:border-paper/5 dark:bg-ink/50 shadow-sm space-y-3">
      <div className="flex items-center gap-4">
        {/* Circular Play Button */}
        <button
          onClick={togglePlay}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
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

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-ink dark:text-paper truncate">
            🎵 {locale === "tr" ? `${makam} Makamı Şifa Ezgisi` : `${makam} Makam Healing Melody`}
          </p>
          <p className="text-[10px] text-ink-muted dark:text-paper/50 mt-0.5">
            {isPlaying
              ? (locale === "tr" ? "Çalıyor..." : "Playing...")
              : (locale === "tr" ? "Gevher Nesibe enstrümanlarıyla" : "With Gevher Nesibe instruments")}
          </p>
        </div>

        {/* Equalizer visualizer bars */}
        <div className="flex items-end gap-0.5 h-6 shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-1 bg-heritage rounded-t-sm transition-all ${isPlaying ? "animate-equalizer" : "h-1"}`}
              style={{ animationDelay: `${i * 0.15}s`, height: isPlaying ? undefined : "4px" }}
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

      {/* Progress Bar + Seek */}
      <div className="space-y-1">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1.5 rounded-full accent-heritage cursor-pointer bg-sand dark:bg-paper/10"
        />
        <div className="flex justify-between text-[9px] text-ink-muted dark:text-paper/40 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
        </div>
      </div>
    </div>
  );
}
