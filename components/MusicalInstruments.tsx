"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Instrument {
  id: string;
  nameTr: string;
  nameEn: string;
  originTr: string;
  originEn: string;
  descriptionTr: string;
  descriptionEn: string;
  makamTr: string;
  makamEn: string;
  typeTr: string;
  typeEn: string;
  image: string;
  emoji: string;
  // Web Audio synthesis params
  audioType: "wind" | "string" | "drum" | "pluck";
  baseFreq: number;
}

const instruments: Instrument[] = [
  {
    id: "ney",
    nameTr: "Ney",
    nameEn: "Ney (Reed Flute)",
    originTr: "Kamıştan yapılmış üflemeli çalgı",
    originEn: "End-blown flute made of reed cane",
    descriptionTr:
      "Ney, Gevher Nesibe Şifahanesi'nde en çok kullanılan şifa enstrümanıdır. İnsan sesine en yakın tınısıyla ruhsal hastalıklarda ve melankoli tedavisinde birinci sırada kullanılırdı. Mevlana'nın 'Dinle bu ney nasıl şikâyet eder' diye başlayan Mesnevisi'nde de geçen enstrüman, ayrılık ve özlemin simgesidir.",
    descriptionEn:
      "The Ney is the most used healing instrument in Gevher Nesibe Shifahane. With its tone closest to the human voice, it was used primarily in spiritual diseases and melancholy treatment.",
    makamTr: "Rast, Uşşak, Hicaz",
    makamEn: "Rast, Ussak, Hijaz",
    typeTr: "Üflemeli (Nefesli)",
    typeEn: "Aerophone (Wind)",
    image: "/images/ney.png",
    emoji: "🎋",
    audioType: "wind",
    baseFreq: 440,
  },
  {
    id: "ud",
    nameTr: "Ud",
    nameEn: "Ud (Oud)",
    originTr: "Armut biçiminde perdesiz telli çalgı",
    originEn: "Pear-shaped fretless lute",
    descriptionTr:
      "Ud, Arap, Fars ve Türk müzik geleneklerinin ortak hazinesidir. 11 telli bu enstrüman Gevher Nesibe Şifahanesi'nde özellikle kalp hastalıkları ve ruhsal bunalımların tedavisinde çalınırdı. İbn-i Sina da el-Kanun'da müzik tedavisinde ud sesinin kalbi doğrudan etkilediğini yazmıştır.",
    descriptionEn:
      "The Ud is the shared treasure of Arab, Persian and Turkish musical traditions. This 11-string instrument was especially played for heart diseases and spiritual depression in Gevher Nesibe Shifahane.",
    makamTr: "Nihavend, Rast, Segâh",
    makamEn: "Nihavend, Rast, Segah",
    typeTr: "Telli (Mızraplı)",
    typeEn: "Chordophone (Plucked)",
    image: "/images/ud.png",
    emoji: "🪕",
    audioType: "pluck",
    baseFreq: 220,
  },
  {
    id: "rebap",
    nameTr: "Rebap",
    nameEn: "Rebap (Rebab)",
    originTr: "Yaylı telli çalgı, keman atası",
    originEn: "Spike fiddle, ancestor of the violin",
    descriptionTr:
      "Rebap, kemanın atasıdır ve Orta Asya kökenli bir yaylı çalgıdır. Gevher Nesibe'de hastanın yanında saatlerce çalınırdı. Uzun ve titreşimli sesi, özellikle akıl hastalıklarında ve kronik ağrı tedavisinde sinir sistemine doğrudan etki ettiğine inanılırdı.",
    descriptionEn:
      "The Rebap is the ancestor of the violin and a bowed instrument of Central Asian origin. It was played for hours next to patients in Gevher Nesibe, especially for mental illnesses.",
    makamTr: "Uşşak, Hüseyni, Rehavi",
    makamEn: "Ussak, Huseyni, Rehavi",
    typeTr: "Telli (Yaylı)",
    typeEn: "Chordophone (Bowed)",
    image: "/images/rebap.png",
    emoji: "🎻",
    audioType: "string",
    baseFreq: 330,
  },
  {
    id: "kanun",
    nameTr: "Kanun",
    nameEn: "Kanun (Qanun)",
    originTr: "Trapez biçimli 78 telli tezene çalgısı",
    originEn: "Trapezoidal 78-string plucked zither",
    descriptionTr:
      "Kanun, İbn-i Sina'nın bizzat teorize ettiği makam tedavisinin en önemli enstrümanıdır. 78 teli sayesinde çok geniş bir ses aralığına sahiptir ve farklı makamları tam olarak aktarabilir. Şifahanede müzisyenler, hekimin nabız teşhisine göre belirlediği makamı bu enstrümanla çalarlardı.",
    descriptionEn:
      "The Kanun is the most important instrument for the makam therapy that Ibn Sina himself theorized. With its 78 strings, it has a very wide tonal range.",
    makamTr: "Tüm makamlar için uygun",
    makamEn: "Suitable for all makams",
    typeTr: "Telli (Mızraplı)",
    typeEn: "Chordophone (Plucked)",
    image: "/images/kanun.png",
    emoji: "🎼",
    audioType: "pluck",
    baseFreq: 293,
  },
  {
    id: "def",
    nameTr: "Def (Bendir)",
    nameEn: "Def / Bendir (Frame Drum)",
    originTr: "Daire biçimli deri zarflı vurmalı çalgı",
    originEn: "Circular frame drum with animal skin",
    descriptionTr:
      "Def ve Bendir, Gevher Nesibe'de ritim tutmak ve hastanın nabzını müzikle senkronize etmek için kullanılırdı. İbn-i Sina'ya göre ritimsel vuruşlar, kalbin atışını düzenler ve hastanın zihnini dağılan düşüncelerden kurtararak 'tek noktaya' odaklamasını sağlardı. Bu, günümüz meditasyon müziğiyle örtüşen bir yaklaşımdır.",
    descriptionEn:
      "The Def and Bendir were used in Gevher Nesibe to keep rhythm and synchronize the patient's pulse with music. According to Ibn Sina, rhythmic beats regulate the heart's pulse.",
    makamTr: "Ritim düzenleyici (Tüm makamlar)",
    makamEn: "Rhythm regulator (All makams)",
    typeTr: "Vurmalı",
    typeEn: "Percussion",
    image: "/images/def.png",
    emoji: "🥁",
    audioType: "drum",
    baseFreq: 80,
  },
];

// ─── Web Audio Synthesis: realistic instrument timbres ───────────────────────

function getAudioContext(): AudioContext | null {
  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return AudioCtx ? new AudioCtx() : null;
}

/** Karplus-Strong plucked string — very realistic for Ud & Kanun */
function karplusStrong(ctx: AudioContext, freq: number, decay: number, gain: number, startTime: number) {
  const sampleRate = ctx.sampleRate;
  const period = Math.round(sampleRate / freq);
  const bufLen = sampleRate * 3; // 3 seconds buffer
  const buffer = ctx.createBuffer(1, bufLen, sampleRate);
  const data = buffer.getChannelData(0);

  // Seed with white noise for one period
  for (let i = 0; i < period; i++) data[i] = Math.random() * 2 - 1;
  // KS feedback loop
  for (let i = period; i < bufLen; i++) {
    data[i] = decay * 0.5 * (data[i - period] + data[i - period + 1]);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(gain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 2.8);

  // Warm lowpass for body resonance
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(freq * 8, startTime);

  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  source.start(startTime);
  source.stop(startTime + 3);
}

/** NEY — breathy reed flute: filtered noise + sine, vibrato */
function playNey(ctx: AudioContext) {
  const t = ctx.currentTime;
  // Notes: G4, A4, B4, C5 (short characteristic phrase)
  const phrase = [
    { freq: 392.0, dur: 0.7 },
    { freq: 440.0, dur: 0.7 },
    { freq: 493.9, dur: 0.7 },
    { freq: 523.3, dur: 1.2 },
    { freq: 440.0, dur: 0.8 },
    { freq: 392.0, dur: 1.4 },
  ];

  let offset = 0;
  for (const note of phrase) {
    const start = t + offset;
    const dur = note.dur;

    // Sine body
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(note.freq, start);

    // Vibrato
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5.5;
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    oscGain.gain.setValueAtTime(0, start);
    oscGain.gain.linearRampToValueAtTime(0.38, start + 0.18);
    oscGain.gain.setValueAtTime(0.38, start + dur - 0.12);
    oscGain.gain.linearRampToValueAtTime(0, start + dur);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    lfo.start(start); osc.start(start);
    lfo.stop(start + dur); osc.stop(start + dur);

    // Breath noise layer
    const noiseLen = Math.ceil(ctx.sampleRate * dur);
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) nd[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const nf = ctx.createBiquadFilter();
    nf.type = "bandpass"; nf.frequency.value = note.freq * 2; nf.Q.value = 1.5;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, start);
    ng.gain.linearRampToValueAtTime(0.045, start + 0.1);
    ng.gain.linearRampToValueAtTime(0, start + dur);
    noise.connect(nf); nf.connect(ng); ng.connect(ctx.destination);
    noise.start(start); noise.stop(start + dur);

    offset += dur * 0.92; // slight legato overlap
  }
}

/** UD — Karplus-Strong arpeggio chord (G2-D3-A3-D4-G4-A4) */
function playUd(ctx: AudioContext) {
  const t = ctx.currentTime;
  // Open string strum: G2, D3, A3, D4, G4, A4
  const strings = [98.0, 146.8, 220.0, 293.7, 392.0, 440.0];
  strings.forEach((freq, i) => {
    karplusStrong(ctx, freq, 0.998, 0.55, t + i * 0.07);
  });
  // Follow with a simple melodic phrase
  const melody = [
    { freq: 392.0, delay: 0.7 },
    { freq: 440.0, delay: 1.2 },
    { freq: 493.9, delay: 1.7 },
    { freq: 440.0, delay: 2.2 },
    { freq: 392.0, delay: 2.7 },
  ];
  melody.forEach(({ freq, delay }) => {
    karplusStrong(ctx, freq, 0.997, 0.5, t + delay);
  });
}

/** KANUN — Bright zither arpeggio (Karplus-Strong, higher decay) */
function playKanun(ctx: AudioContext) {
  const t = ctx.currentTime;
  // Fast arpeggio across two octaves
  const notes = [293.7, 349.2, 392.0, 440.0, 523.3, 587.3, 659.3, 783.9];
  notes.forEach((freq, i) => {
    karplusStrong(ctx, freq, 0.9995, 0.45, t + i * 0.14);
  });
  // Repeat arpeggio going down
  [...notes].reverse().forEach((freq, i) => {
    karplusStrong(ctx, freq, 0.9993, 0.35, t + 1.3 + i * 0.13);
  });
}



/** Main dispatcher for synthesized instruments */
function playInstrumentSound(instrumentId: string): AudioContext | null {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") ctx.resume();

  switch (instrumentId) {
    case "ney":   playNey(ctx);   break;
    case "ud":    playUd(ctx);    break;
    case "kanun": playKanun(ctx); break;
    default:      playNey(ctx);
  }

  return ctx;
}


export function MusicalInstruments({ locale }: { locale: "tr" | "en" }) {
  const [selectedId, setSelectedId] = useState<string>("ney");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentCtxRef = useRef<AudioContext | null>(null);

  const selected = instruments.find((i) => i.id === selectedId) || instruments[0];

  // Stop playing on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      if (currentCtxRef.current) {
        currentCtxRef.current.close().catch(() => {});
      }
      if (playTimerRef.current) {
        clearTimeout(playTimerRef.current);
      }
    };
  }, []);

  const handlePlay = useCallback(
    (inst: Instrument) => {
      // 1. Stop any currently playing audio or context
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }
      if (currentCtxRef.current) {
        currentCtxRef.current.close().catch(() => {});
        currentCtxRef.current = null;
      }
      if (playTimerRef.current) {
        clearTimeout(playTimerRef.current);
        playTimerRef.current = null;
      }

      // If clicked the currently playing instrument, just stop it and toggle state
      if (playingId === inst.id) {
        setPlayingId(null);
        return;
      }

      setPlayingId(inst.id);

      if (inst.id === "rebap" || inst.id === "def") {
        // Play real MP3 files
        const audio = new Audio(`/images/${inst.id}.mp3`);
        currentAudioRef.current = audio;
        audio.play().catch((err) => console.log("Audio play failed:", err));
        
        audio.onended = () => {
          setPlayingId(null);
          currentAudioRef.current = null;
        };

        // Fallback safety timeout (10 seconds max)
        playTimerRef.current = setTimeout(() => {
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
          setPlayingId(null);
          currentAudioRef.current = null;
        }, 10000);
      } else {
        // Synthesize other instruments (ney, ud, kanun)
        const ctx = playInstrumentSound(inst.id);
        currentCtxRef.current = ctx;

        playTimerRef.current = setTimeout(() => {
          setPlayingId(null);
          if (ctx) {
            ctx.close().catch(() => {});
          }
          currentCtxRef.current = null;
        }, 7500);
      }
    },
    [playingId]
  );

  return (
    <div className="rounded-3xl border border-sand bg-gradient-to-br from-paper via-heritage-soft/10 to-sand p-6 shadow-card dark:border-ink/20 dark:from-ink dark:via-heritage/5 dark:to-ink sm:p-8 space-y-8">
      <div>
        <h3 className="font-display text-2xl font-bold text-ink dark:text-paper">
          {locale === "tr"
            ? "Şifahane'nin Müzik Aletleri"
            : "Healing Instruments of the Shifahane"}
        </h3>
        <p className="mt-2 text-sm text-ink-muted dark:text-paper/60">
          {locale === "tr"
            ? "İbn-i Sina'nın nabız teorisine göre hangi aletlerin hangi hastalıkları iyileştirdiğini keşfedin. 🔊 simgesine tıklayarak enstrüman sesini duyabilirsiniz."
            : "Discover which instruments healed which diseases according to Ibn Sina's pulse theory. Click the 🔊 icon to hear the instrument."}
        </p>
      </div>

      {/* Instrument Selector Grid */}
      <div className="flex flex-wrap gap-3">
        {instruments.map((inst) => (
          <button
            key={inst.id}
            onClick={() => setSelectedId(inst.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all shadow-sm ${
              selectedId === inst.id
                ? "bg-heritage text-white border-heritage"
                : "bg-paper text-ink border-sand hover:border-heritage/40 dark:bg-ink/50 dark:text-paper dark:border-ink/30"
            }`}
          >
            <span>{inst.emoji}</span>
            <span>{locale === "tr" ? inst.nameTr : inst.nameEn}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left: Image */}
        <div className="lg:col-span-5 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl border-2 border-heritage/20 bg-gradient-to-br from-white to-heritage-soft/20 shadow-md dark:from-ink/60 dark:to-heritage/5 flex items-center justify-center"
              style={{ minHeight: 280 }}
            >
              <img
                src={selected.image}
                alt={locale === "tr" ? selected.nameTr : selected.nameEn}
                className="w-full h-64 object-contain p-4 transition-all duration-500"
              />
              {/* Sound play button overlay */}
              <button
                onClick={() => handlePlay(selected)}
                className={`absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lift transition-all duration-300 ${
                  playingId === selected.id
                    ? "bg-heritage border-heritage text-white scale-110 animate-pulse"
                    : "bg-paper/90 border-heritage/40 text-heritage hover:bg-heritage hover:text-white hover:scale-105 dark:bg-ink/80"
                }`}
                title={locale === "tr" ? "Sesi Çal" : "Play Sound"}
              >
                {playingId === selected.id ? (
                  <span className="text-lg">🎵</span>
                ) : (
                  <span className="text-lg">🔊</span>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
          <p className="text-center text-xs italic text-ink-muted dark:text-paper/40">
            {locale === "tr"
              ? "* 🔊 düğmesine basarak enstrüman sesini duyabilirsiniz."
              : "* Press the 🔊 button to hear the instrument sound."}
          </p>
        </div>

        {/* Right: Info Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Title */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selected.emoji}</span>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-ink dark:text-paper">
                      {locale === "tr" ? selected.nameTr : selected.nameEn}
                    </h4>
                    <p className="text-sm text-heritage dark:text-heritage/80 font-medium">
                      {locale === "tr" ? selected.originTr : selected.originEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/80 border-l-2 border-heritage/30 pl-4">
                {locale === "tr" ? selected.descriptionTr : selected.descriptionEn}
              </p>

              {/* Meta badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-sand bg-paper/60 p-3 dark:border-ink/30 dark:bg-ink/40">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-heritage dark:text-heritage/80">
                    {locale === "tr" ? "Enstrüman Türü" : "Instrument Type"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink dark:text-paper">
                    {locale === "tr" ? selected.typeTr : selected.typeEn}
                  </p>
                </div>
                <div className="rounded-xl border border-sand bg-paper/60 p-3 dark:border-ink/30 dark:bg-ink/40">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-clinical dark:text-clinical/80">
                    {locale === "tr" ? "Kullanılan Makamlar" : "Used Makams"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink dark:text-paper">
                    {locale === "tr" ? selected.makamTr : selected.makamEn}
                  </p>
                </div>
              </div>

              {/* Play button inline */}
              <button
                onClick={() => handlePlay(selected)}
                className={`w-full flex items-center justify-center gap-3 rounded-2xl border-2 py-3 px-5 font-semibold text-sm transition-all duration-300 ${
                  playingId === selected.id
                    ? "bg-heritage border-heritage text-white"
                    : "bg-heritage/5 border-heritage/30 text-heritage hover:bg-heritage hover:text-white dark:bg-heritage/10 dark:border-heritage/20"
                }`}
              >
                {playingId === selected.id ? (
                  <>
                    <span className="animate-pulse">🎵</span>
                    {locale === "tr" ? "Çalıyor..." : "Playing..."}
                  </>
                ) : (
                  <>
                    <span>🔊</span>
                    {locale === "tr"
                      ? `${selected.nameTr} sesini duy`
                      : `Hear the ${selected.nameEn}`}
                  </>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
