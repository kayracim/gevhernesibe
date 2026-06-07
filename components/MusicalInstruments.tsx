"use client";

import { useState, useRef, useCallback } from "react";
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

// Web Audio API synthesis for each instrument type
function playInstrumentSound(
  audioType: Instrument["audioType"],
  baseFreq: number
) {
  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();

  if (audioType === "wind") {
    // Ney: breathy sine with vibrato
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    lfo.frequency.value = 5;
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.type = "sine";
    osc.frequency.value = baseFreq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.5);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);

    // Add breath noise
    const bufferSize = ctx.sampleRate * 2.5;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = baseFreq * 2;
    noiseFilter.Q.value = 0.5;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.06;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    lfo.start();
    osc.start();
    osc.stop(ctx.currentTime + 2.5);
    lfo.stop(ctx.currentTime + 2.5);
  } else if (audioType === "pluck") {
    // Ud/Kanun: Karplus-Strong pluck
    const playNote = (freq: number, delay: number) => {
      const bufLen = Math.round(ctx.sampleRate / freq);
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = freq * 3;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 2);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(ctx.currentTime + delay);
      src.stop(ctx.currentTime + delay + 2.2);
    };
    playNote(baseFreq, 0);
    playNote(baseFreq * 1.5, 0.6);
    playNote(baseFreq * 2, 1.2);
  } else if (audioType === "string") {
    // Rebap: bowed string (sawtooth with tremolo)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const tremoloLFO = ctx.createOscillator();
    const tremoloGain = ctx.createGain();

    tremoloLFO.frequency.value = 6;
    tremoloGain.gain.value = 0.15;
    tremoloLFO.connect(tremoloGain);
    tremoloGain.connect(gain.gain);

    osc.type = "sawtooth";
    osc.frequency.value = baseFreq;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2000;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.25, ctx.currentTime + 1.8);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    tremoloLFO.start();
    osc.start();
    osc.stop(ctx.currentTime + 2.5);
    tremoloLFO.stop(ctx.currentTime + 2.5);
  } else if (audioType === "drum") {
    // Def/Bendir: low thump + decay
    const playBeat = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, time);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.08);
      gain.gain.setValueAtTime(0.8, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.5);
    };
    const bpm = 90;
    const interval = 60 / bpm;
    for (let i = 0; i < 6; i++) {
      playBeat(ctx.currentTime + i * interval);
    }
  }
}

export function MusicalInstruments({ locale }: { locale: "tr" | "en" }) {
  const [selectedId, setSelectedId] = useState<string>("ney");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = instruments.find((i) => i.id === selectedId) || instruments[0];

  const handlePlay = useCallback(
    (inst: Instrument) => {
      if (playingId === inst.id) return;
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
      setPlayingId(inst.id);
      playInstrumentSound(inst.audioType, inst.baseFreq);
      playTimerRef.current = setTimeout(() => setPlayingId(null), 2800);
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
