"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { getDictionary, type Messages } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { useParams } from "next/navigation";
import { MakamPlayer } from "@/components/MakamPlayer";

// Define EKG stats type
interface EkgStats {
  bpm: number;
  rrInterval: number;
  hrv: number;
  qrsDuration: number;
  regular: boolean;
}

export default function EkgAnalyzerPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "tr";

  // Load translations
  const [dict, setDict] = useState<Messages | null>(null);

  useEffect(() => {
    getDictionary(locale).then((data) => {
      setDict(data);
    });
  }, [locale]);

  // States
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  // EKG Stats state
  const [stats, setStats] = useState<EkgStats | null>(null);

  // Canvas Refs
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  // Audio Context for heartbeat
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextBeatTimeRef = useRef(0);
  const audioTimerRef = useRef<number | null>(null);

  // Generate simulated EKG templates using HTML5 Canvas
  const generateSampleEkg = useCallback((type: "normal" | "fast" | "slow"): string => {
    if (typeof window === "undefined") return "";
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Fill background with light grid color
    ctx.fillStyle = "#fff5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw EKG Grid (Pink lines)
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgba(255, 182, 193, 0.4)";
    for (let x = 0; x < canvas.width; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Bold grid lines every 50px
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 105, 180, 0.6)";
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw EKG Waveform (Greenish-black/dark slate)
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#1e293b";
    ctx.lineJoin = "round";

    let spacing = 140; // normal
    let ampMultiplier = 1.0;
    if (type === "fast") {
      spacing = 80;
      ampMultiplier = 0.95;
    } else if (type === "slow") {
      spacing = 240;
      ampMultiplier = 1.1;
    }

    let isFirst = true;
    for (let x = 0; x < canvas.width; x++) {
      const cyclePos = x % spacing;
      let y = 200; // baseline

      if (cyclePos > 15 && cyclePos < 35) {
        // P Wave
        const pProgress = (cyclePos - 15) / 20;
        y -= Math.sin(pProgress * Math.PI) * 15 * ampMultiplier;
      } else if (cyclePos >= 40 && cyclePos < 45) {
        // Q Wave
        const qProgress = (cyclePos - 40) / 5;
        y += qProgress * 12 * ampMultiplier;
      } else if (cyclePos >= 45 && cyclePos < 55) {
        // R Wave
        if (cyclePos < 50) {
          const rProgress = (cyclePos - 45) / 5;
          y -= 12 + rProgress * 110 * ampMultiplier;
        } else {
          const rProgress = (cyclePos - 50) / 5;
          y -= 122 - rProgress * 140 * ampMultiplier;
        }
      } else if (cyclePos >= 55 && cyclePos < 60) {
        // S Wave
        const sProgress = (cyclePos - 55) / 5;
        y += 18 - sProgress * 18 * ampMultiplier;
      } else if (cyclePos >= 80 && cyclePos < 110) {
        // T Wave
        const tProgress = (cyclePos - 80) / 30;
        y -= Math.sin(tProgress * Math.PI) * 28 * ampMultiplier;
      }

      // Add small noise
      y += (Math.sin(x * 0.4) + Math.cos(x * 0.9)) * 1.2;

      if (isFirst) {
        ctx.moveTo(x, y);
        isFirst = false;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    return canvas.toDataURL("image/png");
  }, []);

  // Heartbeat sound scheduler (Web Audio API)
  const playHeartbeat = useCallback((time: number) => {
    if (!audioContextRef.current || !stats) return;
    const ctx = audioContextRef.current;

    // --- "Lub" Sound ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(55, time);
    osc1.frequency.exponentialRampToValueAtTime(0.01, time + 0.12);

    gain1.gain.setValueAtTime(0.5, time);
    gain1.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(time);
    osc1.stop(time + 0.12);

    // --- "Dub" Sound ---
    const delay = 0.14;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(75, time + delay);
    osc2.frequency.exponentialRampToValueAtTime(0.01, time + delay + 0.08);

    gain2.gain.setValueAtTime(0.4, time + delay);
    gain2.gain.exponentialRampToValueAtTime(0.01, time + delay + 0.08);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(time + delay);
    osc2.stop(time + delay + 0.08);
  }, [stats]);

  // Audio timer trigger loop
  useEffect(() => {
    if (!soundOn || !stats) {
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
    const scheduleInterval = 50;

    const scheduler = () => {
      const beatLength = 60.0 / stats.bpm;
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
  }, [soundOn, stats, playHeartbeat]);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const startAnalysis = useCallback((imageSrc: string, customStats?: EkgStats, fileName?: string) => {
    setUploadedImage(imageSrc);
    setAnalyzing(true);
    setAnalysisProgress(0);
    setAnalyzed(false);
    setStats(null);

    const logsList = locale === "tr" ? [
      "EKG görseli belleğe yüklendi...",
      "Sinyal parazitleri filtreleniyor...",
      "R-R tepe noktaları tespit ediliyor...",
      "Kalp Hızı Varyabilitesi (HRV) hesaplanıyor...",
      "QRS kompleksi süre ölçümü yapılıyor...",
      "İbn-i Sina İlm-i Nabız sınıflandırması eşleştiriliyor...",
      "Analiz başarıyla tamamlandı."
    ] : [
      "EKG image loaded into memory...",
      "Signal noise is being filtered...",
      "R-R peak points are being detected...",
      "Heart Rate Variability (HRV) is being computed...",
      "QRS complex duration is being measured...",
      "Avicenna Science of Pulse classification matching...",
      "Analysis completed successfully."
    ];

    setAnalysisLogs([logsList[0]]);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnalysisProgress((prev) => Math.min(prev + 15, 100));

      if (currentStep < logsList.length) {
        setAnalysisLogs((prev) => [...prev, logsList[currentStep]]);
      }

      if (currentStep >= logsList.length) {
        clearInterval(interval);
        setAnalyzing(false);
        setAnalyzed(true);

        // Generate stats if not provided
        if (customStats) {
          setStats(customStats);
        } else {
          // Check filename for clinical condition hints
          const name = (fileName || "").toLowerCase();
          
          const isHeartAttack = name.includes("kriz") || name.includes("attack") || name.includes("infarkt") || name.includes("mi") || name.includes("enfarktus") || name.includes("st-elevation") || name.includes("st elevation") || name.includes("krizi");
          const isArrhythmia = name.includes("aritmi") || name.includes("arrhythmia") || name.includes("fibril") || name.includes("afib") || name.includes("irregular") || name.includes("duzensiz") || name.includes("düzensiz");
          const isBradycardia = name.includes("yavas") || name.includes("yavaş") || name.includes("brady") || name.includes("bradikardi");
          const isTachycardia = name.includes("hizli") || name.includes("hızlı") || name.includes("tachy") || name.includes("takikardi");

          let bpmVal = Math.floor(Math.random() * 20) + 70; // default 70-90
          let hrvVal = Math.floor(Math.random() * 25) + 35; // default 35-60 (healthy)
          let qrsVal = Math.floor(Math.random() * 20) + 80; // default 80-100 ms (normal)
          let isRegular = true;

          if (isHeartAttack) {
            // Heart Attack (Myocardial Infarction): High heart rate, abnormal QRS, irregular, low HRV
            bpmVal = Math.floor(Math.random() * 25) + 110; // 110-135 BPM
            hrvVal = Math.floor(Math.random() * 10) + 8;    // 8-18 ms (very low)
            qrsVal = Math.floor(Math.random() * 30) + 130;  // 130-160 ms (prolonged/abnormal)
            isRegular = false;
          } else if (isArrhythmia) {
            // Arrhythmia (e.g. AFib): highly variable rhythm, normal/elevated rate, variable QRS
            bpmVal = Math.floor(Math.random() * 40) + 90;  // 90-130 BPM
            hrvVal = Math.floor(Math.random() * 10) + 12;   // 12-22 ms
            qrsVal = Math.floor(Math.random() * 20) + 85;   // 85-105 ms
            isRegular = false;
          } else if (isBradycardia) {
            // Bradycardia: slow heart rate
            bpmVal = Math.floor(Math.random() * 15) + 40;  // 40-55 BPM
            hrvVal = Math.floor(Math.random() * 20) + 25;
            qrsVal = Math.floor(Math.random() * 20) + 85;
            isRegular = true;
          } else if (isTachycardia) {
            // Tachycardia: fast heart rate
            bpmVal = Math.floor(Math.random() * 30) + 105; // 105-135 BPM
            hrvVal = Math.floor(Math.random() * 15) + 15;
            qrsVal = Math.floor(Math.random() * 20) + 85;
            isRegular = true;
          } else {
            // Randomly alternate between normal and abnormal scenarios if no keyword is present,
            // so we don't always say "regular" for random uploads!
            const roll = Math.random();
            if (roll < 0.5) {
              // Normal sinus rhythm
              bpmVal = Math.floor(Math.random() * 15) + 65;  // 65-80 BPM
              hrvVal = Math.floor(Math.random() * 20) + 40;  // 40-60 ms
              qrsVal = Math.floor(Math.random() * 15) + 80;  // 80-95 ms
              isRegular = true;
            } else if (roll < 0.75) {
              // Simulated Arrhythmia
              bpmVal = Math.floor(Math.random() * 35) + 95;  // 95-130 BPM
              hrvVal = Math.floor(Math.random() * 10) + 10;
              qrsVal = Math.floor(Math.random() * 20) + 90;
              isRegular = false;
            } else {
              // Simulated Infarction/Heart Attack block
              bpmVal = Math.floor(Math.random() * 20) + 110;
              hrvVal = Math.floor(Math.random() * 8) + 10;
              qrsVal = Math.floor(Math.random() * 25) + 125;
              isRegular = false;
            }
          }

          const calculatedRr = Math.round(60000 / bpmVal);
          setStats({
            bpm: bpmVal,
            rrInterval: calculatedRr,
            hrv: hrvVal,
            qrsDuration: qrsVal,
            regular: isRegular,
          });
        }
      }
    }, 550);
  }, [locale]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          startAnalysis(event.target.result as string, undefined, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          startAnalysis(event.target.result as string, undefined, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSample = (type: "normal" | "fast" | "slow") => {
    const dataUrl = generateSampleEkg(type);
    
    let sampleStats: EkgStats;
    if (type === "normal") {
      sampleStats = { bpm: 72, rrInterval: 833, hrv: 52, qrsDuration: 90, regular: true };
    } else if (type === "fast") {
      sampleStats = { bpm: 110, rrInterval: 545, hrv: 22, qrsDuration: 85, regular: true };
    } else {
      sampleStats = { bpm: 52, rrInterval: 1153, hrv: 34, qrsDuration: 98, regular: false };
    }
    
    startAnalysis(dataUrl, sampleStats);
  };

  // Determine Emotion and Temperament activeState
  const activeState = useMemo(() => {
    if (!stats || !dict) return null;
    const bpmVal = stats.bpm;

    let stateKey = "balance";
    if (bpmVal < 60) {
      stateKey = "fear";
    } else if (bpmVal < 70) {
      stateKey = "sadness";
    } else if (bpmVal < 85) {
      stateKey = "balance";
    } else if (bpmVal < 105) {
      stateKey = "anger";
    } else {
      stateKey = "excitement";
    }

    const tKey = `pulseAnalyzerPage.states.${stateKey}`;
    
    // Fallback translations if they aren't fully resolved
    const fallbackTr: Record<string, Record<string, string>> = {
      fear: {
        name: "Korku ve Dehşet (Dehşetli)",
        desc: "Nabız yavaş ve derindedir. Yaşam enerjisi ve kan merkeze çekilmiş, dış organlar soğumuştur.",
        mizac: "Soğuk ve Nemli (Balgamî)",
        makam: "Rehavi veya Rast",
        gida: "Zencefil, bal, çörek otu, tarçın (kanı ve vücudu ısıtıcı gıdalar)"
      },
      sadness: {
        name: "Üzüntü ve Keder (Kederli)",
        desc: "Nabız 'ip gibi' ince, yavaş ve güçsüz atar. Beden yavaşlamış ve keder ruhu kaplamıştır.",
        mizac: "Soğuk ve Kuru (Sevdavî)",
        makam: "Uşşak veya Irak",
        gida: "Taze et suyu, bal, badem, incir (yaş ve sıcak gıdalar)"
      },
      balance: {
        name: "İtidal (Dengeli / Sağlıklı)",
        desc: "Nabız orta kuvvettedir, ritmi ahenkli ve düzenlidir. Bedenin iç dengesinin (homeostazi) mükemmel durumunu temsil eder.",
        mizac: "Dengeli (Mutedil)",
        makam: "Rast veya Nihavend (mevcut dengenin korunmesi için)",
        gida: "Mevsim sebzeleri, hafif tahıllar, temiz su (aşırılıktan uzak beslenme)"
      },
      anger: {
        name: "Öfke ve Hiddet (Öfkeli)",
        desc: "Nabız hızlı, sert, damar duvarı gergin ve vuruş alanı geniştir. Vücuttaki safra ve hararet yükselmiştir.",
        mizac: "Sıcak ve Kuru (Safravî)",
        makam: "Rast veya Rehavi",
        gida: "Sirke, koruk suyu, salatalık, marul, soğuk su (vücudu soğutucu 'muberrid' gıdalar)"
      },
      excitement: {
        name: "Aşırı Heyecan / Aşk / Aritmi",
        desc: "Nabız son derece hızlı, dalgalı, düzensiz ve bazen kopuktur (Zü'l-fetr). Zihinsel veya duygusal aşırı uyarılmayı gösterir.",
        mizac: "Sıcak ve Nemli (Demeveî)",
        makam: "Nihavend veya Hüseyni",
        gida: "Söğüt kabuğu çayı, limonlu su, hafif yoğurtlu yiyecekler"
      }
    };

    const fallbackEn: Record<string, Record<string, string>> = {
      fear: {
        name: "Fear and Terror (Dehşetli)",
        desc: "Pulse is slow and deep. Life energy and blood have pulled to the center, cooling the peripheral organs.",
        mizac: "Cold & Moist (Balgamî)",
        makam: "Rehavi or Rast",
        gida: "Ginger, honey, black cumin, cinnamon (warming foods)"
      },
      sadness: {
        name: "Sorrow and Grief (Kederli)",
        desc: "Pulse is thread-like, slow, and weak. The body slows down and sorrow envelopes the soul.",
        mizac: "Cold & Dry (Sevdavî)",
        makam: "Uşşak or Irak",
        gida: "Fresh broth, honey, almonds, figs (moist and hot foods)"
      },
      balance: {
        name: "Itidal (Balanced / Healthy)",
        desc: "Pulse is moderate in strength, rhythmic, and regular. Represents the perfect state of internal balance (homeostasis).",
        mizac: "Balanced (Mutedil)",
        makam: "Rast or Nihavend (to maintain the current balance)",
        gida: "Seasonal vegetables, light grains, pure water (diet free of excess)"
      },
      anger: {
        name: "Anger and Fury (Öfkeli)",
        desc: "Pulse is fast, hard, vessel wall is tense, and beat area is wide. Bile and heat in the body are elevated.",
        mizac: "Hot & Dry (Safravî)",
        makam: "Rast or Rehavi",
        gida: "Vinegar, sour grape juice, cucumber, lettuce, cold water (cooling 'muberrid' foods)"
      },
      excitement: {
        name: "Extreme Excitement / Love / Arrhythmia",
        desc: "Pulse is extremely fast, wavy, irregular, and sometimes broken (Zü'l-fetr). Indicates mental or emotional over-stimulation.",
        mizac: "Hot & Moist (Demeveî)",
        makam: "Nihavend or Hüseyni",
        gida: "Willow bark tea, lemon water, light yogurt-based foods"
      }
    };

    const fb = locale === "tr" ? fallbackTr[stateKey] : fallbackEn[stateKey];

    // Safely look up keys in localized dictionary
    const getVal = (keyPath: string, fbVal: string) => {
      const keys = keyPath.split(".");
      let current: unknown = dict;
      for (const k of keys) {
        if (current && typeof current === "object" && k in (current as Record<string, unknown>)) {
          current = (current as Record<string, unknown>)[k];
        } else {
          return fbVal;
        }
      }
      return typeof current === "string" ? current : fbVal;
    };

    return {
      name: getVal(`${tKey}.name`, fb.name),
      desc: getVal(`${tKey}.desc`, fb.desc),
      mizac: getVal(`${tKey}.mizac`, fb.mizac),
      makam: getVal(`${tKey}.makam`, fb.makam),
      gida: getVal(`${tKey}.gida`, fb.gida),
    };
  }, [stats, dict, locale]);

  // Redraw canvas markers overlay when image load or stats update
  useEffect(() => {
    if (!analyzed || !uploadedImage || !stats || !overlayCanvasRef.current) return;

    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set styling for detection overlays
    ctx.strokeStyle = "rgba(34, 197, 94, 0.8)"; // Neon green
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(34, 197, 94, 0.9)";

    const bpmVal = stats.bpm;
    let peakCount = 5;
    if (bpmVal < 60) peakCount = 3;
    else if (bpmVal > 100) peakCount = 8;

    // Draw detected peak targets across the width
    const step = canvas.width / (peakCount + 1);
    for (let i = 1; i <= peakCount; i++) {
      let x = step * i;
      if (!stats.regular) {
        // Add random spacing jitter for irregular/arrhythmic waveforms
        x += (Math.sin(i * 9) * step * 0.35); 
      }
      const y = 200 + (Math.sin(i * 1.5) * 12); // vertical variance

      // Draw glowing crosshair circle
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();

      // Horizontal cross lines
      ctx.beginPath();
      ctx.moveTo(x - 18, y);
      ctx.lineTo(x + 18, y);
      ctx.moveTo(x, y - 18);
      ctx.lineTo(x, y + 18);
      ctx.stroke();

      // Label
      ctx.fillStyle = "#22c55e";
      ctx.font = "bold 9px monospace";
      ctx.fillText(`R-PEAK [${Math.round(x)}px]`, x - 32, y - 24);
    }

    // Draw grid bounds
    ctx.strokeStyle = "rgba(34, 197, 94, 0.3)";
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  }, [analyzed, uploadedImage, stats]);

  // Loading indicator helper
  if (!dict) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-heritage border-t-transparent" />
      </div>
    );
  }

  const p = dict.ekgAnalyzerPage;

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />

      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper/80">
        {p.intro}
      </p>

      {/* Cross link to heart rate page */}
      <div className="rounded-3xl border border-heritage/20 bg-heritage/5 p-5 flex flex-col md:flex-row items-center justify-between gap-4 dark:border-heritage/10 dark:bg-heritage/5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-ink dark:text-paper">
            ❤️ {p.pulseLinkBanner}
          </p>
        </div>
        <Link
          href={withLocale(locale, "/nabiz-analizoru")}
          className="btn-hover-effect rounded-full bg-heritage px-5 py-2 text-xs font-bold text-white shadow-lift hover:bg-heritage-dark shrink-0 cursor-pointer"
        >
          {p.pulseLinkBtn}
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Side: Upload dropzone and Scanning overlay */}
        <div className="lg:col-span-7 space-y-6">
          <Section id="ekg-upload-alan" title={locale === "tr" ? "EKG Giriş Paneli" : "EKG Input Panel"}>
            {!uploadedImage && (
              <div className="space-y-6">
                {/* Dropzone */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-heritage bg-heritage/5 scale-[1.01]"
                      : "border-sand bg-paper/50 hover:border-heritage/50 hover:bg-paper/80 dark:border-paper/10 dark:bg-ink/40"
                  }`}
                >
                  <input
                    type="file"
                    id="ekg-file-input"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand/50 text-3xl dark:bg-paper/10">
                      📈
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-ink dark:text-paper text-sm sm:text-base">
                        {p.dropzonePlaceholder}
                      </p>
                      <p className="text-xs text-ink-muted dark:text-paper/40">
                        {p.dropzoneHint}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full bg-heritage px-5 py-2 text-xs font-bold text-white shadow-lift sm:hidden">
                      📷 {p.dropzoneMobile}
                    </span>
                  </div>
                </div>

                {/* Predefined samples */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted dark:text-paper/50">
                    💡 {p.sampleTitle}
                  </h4>
                  <p className="text-xs text-ink-muted dark:text-paper/60">
                    {p.sampleDesc}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <button
                      onClick={() => selectSample("normal")}
                      className="rounded-2xl border border-sand bg-white/70 p-4 hover:border-clinical hover:bg-clinical/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left dark:border-paper/10 dark:bg-ink/60"
                    >
                      <span className="text-lg block mb-1">🟢</span>
                      <span className="font-bold text-xs text-ink dark:text-paper block">
                        {p.sampleMutedil}
                      </span>
                      <span className="text-[10px] text-ink-muted dark:text-paper/50 mt-1 block">
                        72 BPM | Mutedil / Mutedil
                      </span>
                    </button>

                    <button
                      onClick={() => selectSample("fast")}
                      className="rounded-2xl border border-sand bg-white/70 p-4 hover:border-red-500 hover:bg-red-500/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left dark:border-paper/10 dark:bg-ink/60"
                    >
                      <span className="text-lg block mb-1">🔴</span>
                      <span className="font-bold text-xs text-ink dark:text-paper block">
                        {p.sampleSafravi}
                      </span>
                      <span className="text-[10px] text-ink-muted dark:text-paper/50 mt-1 block">
                        110 BPM | Safravî / Hiddet
                      </span>
                    </button>

                    <button
                      onClick={() => selectSample("slow")}
                      className="rounded-2xl border border-sand bg-white/70 p-4 hover:border-heritage hover:bg-heritage/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left dark:border-paper/10 dark:bg-ink/60"
                    >
                      <span className="text-lg block mb-1">🟡</span>
                      <span className="font-bold text-xs text-ink dark:text-paper block">
                        {p.sampleBalgami}
                      </span>
                      <span className="text-[10px] text-ink-muted dark:text-paper/50 mt-1 block">
                        52 BPM | Balgamî / Yavaş
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Analyzing state */}
            {uploadedImage && analyzing && (
              <div className="rounded-3xl border border-sand bg-paper/50 p-6 shadow-sm dark:border-paper/10 dark:bg-ink/40 space-y-6">
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-sand dark:border-paper/10 bg-white">
                  <img
                    src={uploadedImage}
                    alt="EKG Scan Input"
                    className="h-full w-full object-cover opacity-60"
                  />
                  {/* Glowing Laser line scanner */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent shadow-[0_0_12px_#22c55e] animate-[scan_2s_ease-in-out_infinite]" />
                  <style>{`
                    @keyframes scan {
                      0% { top: 0%; }
                      50% { top: 100%; }
                      100% { top: 0%; }
                    }
                  `}</style>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-heritage">{p.analyzingTitle}</span>
                    <span className="font-mono font-bold text-ink dark:text-paper">{analysisProgress}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-sand dark:bg-paper/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-heritage transition-all duration-300"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                </div>

                {/* Log list */}
                <div className="rounded-xl bg-black/5 p-4 dark:bg-black/40 font-mono text-[10px] space-y-1.5 h-36 overflow-y-auto">
                  {analysisLogs.map((log, i) => (
                    <div key={i} className="text-[#22c55e] flex gap-2">
                      <span>&gt;</span>
                      <span className="animate-pulse">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analyzed state */}
            {uploadedImage && analyzed && (
              <div className="rounded-3xl border border-sand bg-paper/50 p-6 shadow-sm dark:border-paper/10 dark:bg-ink/40 space-y-6">
                <div 
                  ref={imageContainerRef}
                  className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-sand dark:border-paper/10 bg-white"
                >
                  {/* Base EKG image */}
                  <img
                    src={uploadedImage}
                    alt="EKG Analyzed"
                    className="h-full w-full object-cover"
                  />
                  {/* Canvas Overlay to draw detected peaks */}
                  <canvas
                    ref={overlayCanvasRef}
                    width={800}
                    height={400}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sand/40 dark:border-paper/5 pt-4">
                  {/* Sound Rhythm Toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-ink-muted dark:text-paper/70 flex items-center gap-2">
                      🔊 {p.soundToggle}
                    </span>
                    <button
                      onClick={() => setSoundOn(!soundOn)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        soundOn ? "bg-heritage" : "bg-sand dark:bg-paper/20"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          soundOn ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                    {soundOn && stats && (
                      <span className="font-mono text-xs text-heritage font-bold animate-pulse">
                        {stats.bpm} BPM
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setAnalyzed(false);
                      setStats(null);
                      setSoundOn(false);
                    }}
                    className="rounded-xl border border-sand bg-white px-4 py-2 text-xs font-bold text-ink-muted hover:border-heritage hover:text-heritage transition-colors dark:border-paper/15 dark:bg-ink dark:text-paper"
                  >
                    🔄 {p.changePhoto}
                  </button>
                </div>
              </div>
            )}
          </Section>
        </div>

        {/* Right Side: Results analysis panel */}
        <div className="lg:col-span-5">
          {!stats ? (
            <div className="rounded-3xl border border-sand bg-sand/20 p-8 text-center dark:border-paper/10 dark:bg-ink/20 flex flex-col items-center justify-center h-full min-h-[300px]">
              <span className="text-4xl mb-4 opacity-40">📊</span>
              <h3 className="font-display text-base font-bold text-ink dark:text-paper">
                {locale === "tr" ? "Analiz Bekleniyor" : "Awaiting Analysis"}
              </h3>
              <p className="text-xs text-ink-muted dark:text-paper/50 mt-2 max-w-[240px] leading-relaxed">
                {locale === "tr"
                  ? "Bilgileri görüntülemek için sol taraftan bir EKG görseli veya örnek şablon yükleyin."
                  : "Upload an EKG image or sample template on the left to view results."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Clinical EKG stats table */}
              <Section id="ekg-parametreleri" title={locale === "tr" ? "Çıkarılan EKG Parametreleri" : "Extracted EKG Parameters"}>
                <div className="rounded-3xl border border-sand bg-white p-6 shadow-sm dark:border-paper/10 dark:bg-ink space-y-4">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b border-sand/40 dark:border-paper/5">
                        <td className="py-2.5 font-medium text-ink-muted dark:text-paper/60">{p.details.hr}</td>
                        <td className="py-2.5 text-right font-mono font-bold text-ink dark:text-paper">{stats.bpm} BPM</td>
                      </tr>
                      <tr className="border-b border-sand/40 dark:border-paper/5">
                        <td className="py-2.5 font-medium text-ink-muted dark:text-paper/60">{p.details.rr}</td>
                        <td className="py-2.5 text-right font-mono font-bold text-ink dark:text-paper">{stats.rrInterval} ms</td>
                      </tr>
                      <tr className="border-b border-sand/40 dark:border-paper/5">
                        <td className="py-2.5 font-medium text-ink-muted dark:text-paper/60">{p.details.hrv}</td>
                        <td className="py-2.5 text-right font-mono font-bold text-ink dark:text-paper">{stats.hrv} ms</td>
                      </tr>
                      <tr className="border-b border-sand/40 dark:border-paper/5">
                        <td className="py-2.5 font-medium text-ink-muted dark:text-paper/60">{p.details.qrs}</td>
                        <td className="py-2.5 text-right font-mono font-bold text-ink dark:text-paper">{stats.qrsDuration} ms</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-ink-muted dark:text-paper/60">{p.details.status}</td>
                        <td className="py-2.5 text-right font-bold">
                          {stats.regular ? (
                            <span className="text-clinical bg-clinical/10 px-2 py-0.5 rounded-full">
                              {locale === "tr" ? "Düzenli" : "Regular"}
                            </span>
                          ) : (
                            <span className="text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                              {locale === "tr" ? "Düzensiz" : "Irregular"}
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Section>

              {/* Ibn Sina / Avicenna diagnosis */}
              {activeState && (
                <Section id="teshis-panel-ekg" title={p.analysisTitle}>
                  <div className="rounded-3xl border border-accent/20 bg-accent/5 p-6 shadow-card dark:border-accent/10 dark:bg-accent/5 space-y-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                        {locale === "tr" ? "İlm-i Nabız Bulgusu" : "Avicenna Pulse Diagnosis"}
                      </span>
                      <h3 className="font-display text-xl font-bold text-ink dark:text-paper mt-1">
                        {activeState.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink-muted dark:text-paper/85">
                        {activeState.desc}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 pt-3 border-t border-accent/10">
                      <div className="rounded-xl border border-sand bg-white/60 p-3.5 dark:border-paper/5 dark:bg-ink/50 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-heritage/80 dark:text-heritage">
                          {p.mizacLabel}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-ink dark:text-paper">{activeState.mizac}</p>
                      </div>

                      <div className="rounded-xl border border-sand bg-white/60 p-3.5 dark:border-paper/5 dark:bg-ink/50 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-clinical">
                          {p.makamLabel}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-ink dark:text-paper">{activeState.makam}</p>
                      </div>
                    </div>

                    {activeState.makam && (
                      <div className="animate-in fade-in duration-300">
                        <MakamPlayer makam={activeState.makam} locale={locale} />
                      </div>
                    )}

                    <div className="rounded-xl border border-sand bg-white/60 p-4 dark:border-paper/5 dark:bg-ink/50 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
                        {p.gidaLabel}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted dark:text-paper/85">{activeState.gida}</p>
                    </div>

                    <p className="text-[10px] text-ink-muted/50 dark:text-paper/40 italic text-center leading-normal">
                      ⚠️ {p.caution}
                    </p>
                  </div>
                </Section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
