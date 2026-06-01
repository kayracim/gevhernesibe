"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Instrument {
  id: string;
  nameTr: string;
  nameAr: string;
  nameEn: string;
  nameArEn: string;
  descriptionTr: string;
  descriptionEn: string;
  x: string; // Hotspot X percentage
  y: string; // Hotspot Y percentage
}

const instruments: Instrument[] = [
  {
    id: "nester",
    nameTr: "Neşter",
    nameAr: "Mişrat (مشرط)",
    nameEn: "Scalpel",
    nameArEn: "Mishrat",
    descriptionTr: "Deri kesileri ve hassas cerrahi müdahaleler için kullanılan son derece keskin bıçak.",
    descriptionEn: "Extremely sharp blade used for skin incisions and precise surgical procedures.",
    x: "20%",
    y: "35%"
  },
  {
    id: "makas",
    nameTr: "Cerrahi Makas",
    nameAr: "Mıkraz (مقراض)",
    nameEn: "Surgical Scissors",
    nameArEn: "Mikraz",
    descriptionTr: "Dokuları kesmek, yara kenarlarını temizlemek ve dikişleri kesmek için kullanılan makas.",
    descriptionEn: "Scissors used for cutting tissues, trimming wound edges, and cutting sutures.",
    x: "50%",
    y: "25%"
  },
  {
    id: "daglama",
    nameTr: "Dağlama Aleti",
    nameAr: "Key / Kavl (كي)",
    nameEn: "Cautery Tool",
    nameArEn: "Kay",
    descriptionTr: "Kanı durdurmak, yaraları dağlamak ve enfeksiyon kapmasını önlemek için ısıtılarak uygulanan metal alet.",
    descriptionEn: "Metal tool heated and applied to stop bleeding, cauterize wounds, and prevent infection.",
    x: "80%",
    y: "40%"
  },
  {
    id: "goz-ignesi",
    nameTr: "Gümüş Göz İğnesi",
    nameAr: "Mihale (مكحلة)",
    nameEn: "Silver Eye Needle",
    nameArEn: "Mihala",
    descriptionTr: "Katarakt ameliyatlarında göz içindeki bulanık tabakayı (ak) kenara itmek için kullanılan çok ince gümüş mil.",
    descriptionEn: "Very thin silver needle/probe used in cataract surgeries to push aside the cloudy layer (cataract).",
    x: "35%",
    y: "65%"
  },
  {
    id: "testere",
    nameTr: "Kemik Testeresi",
    nameAr: "Minşar (منشار)",
    nameEn: "Bone Saw",
    nameArEn: "Minshar",
    descriptionTr: "Kırık ve eziklerde deforme olmuş kemik yapılarını düzeltmek için kullanılan ince dişli cerrahi testere.",
    descriptionEn: "Fine-toothed surgical saw used to correct deformed bone structures in fractures and injuries.",
    x: "65%",
    y: "75%"
  },
  {
    id: "kiskac",
    nameTr: "Dişçi Kıskacı / Kerpeten",
    nameAr: "Kelbeteyn (كلبتين)",
    nameEn: "Dental Forceps / Pliers",
    nameArEn: "Kalbatan",
    descriptionTr: "Ağız içi cerrahisinde kırık kemikleri tutmak ve çürümüş dişleri çekmek için kullanılan kavrayıcı alet.",
    descriptionEn: "Gripping tool used in oral surgery to hold broken bones and extract decayed teeth.",
    x: "15%",
    y: "80%"
  },
  {
    id: "sonda",
    nameTr: "Muayene Mili / Sonda",
    nameAr: "Mil (ميل)",
    nameEn: "Examination Probe",
    nameArEn: "Meel",
    descriptionTr: "Yara derinliğini ölçmek, yabancı cisimleri tespit etmek ve kanal yollarını kontrol etmek için kullanılan yuvarlak uçlu ince çubuk.",
    descriptionEn: "Thin rod with a rounded tip used to measure wound depth, detect foreign bodies, and check tract pathways.",
    x: "48%",
    y: "55%"
  }
];

export function InteractiveInstruments({ locale }: { locale: "tr" | "en" }) {
  const [selectedId, setSelectedId] = useState<string>("nester");

  const selectedItem = instruments.find((i) => i.id === selectedId) || instruments[0];

  return (
    <div className="rounded-3xl border border-sand bg-gradient-to-br from-paper to-sand/40 p-6 shadow-card dark:border-ink/20 dark:from-ink dark:to-ink/50 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        
        {/* Left/Top: Interactive Image with Hotspots */}
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-heritage/70 dark:text-heritage/60">
            {locale === "tr" ? "Müze Sergisi: Selçuklu Cerrahi Aletleri" : "Museum Exhibit: Seljuk Surgical Instruments"}
          </p>
          <div className="relative overflow-hidden rounded-2xl border-4 border-heritage/10 bg-white dark:bg-ink shadow-lg aspect-square sm:aspect-video lg:aspect-square flex items-center justify-center">
            {/* The Original Arabic-written Image */}
            <img
              src="/images/historical/instruments.png"
              alt={locale === "tr" ? "Selçuklu Cerrahi Aletleri" : "Seljuk Surgical Instruments"}
              className="h-full w-full object-contain p-4 opacity-90 transition-opacity dark:opacity-80"
            />
            
            {/* Interactive Pulse Hotspots */}
            {instruments.map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedId(inst.id)}
                style={{ left: inst.x, top: inst.y }}
                className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 hover:scale-125 focus:outline-none z-10`}
                title={locale === "tr" ? inst.nameTr : inst.nameEn}
              >
                {/* Pulse Rings */}
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${selectedId === inst.id ? "bg-heritage" : "bg-clinical"}`}></span>
                <span className={`relative inline-flex h-4 w-4 rounded-full border-2 border-white shadow-sm ${selectedId === inst.id ? "bg-heritage" : "bg-clinical"}`}></span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs italic text-ink-muted dark:text-paper/40">
            {locale === "tr" 
              ? "* Görsel üzerindeki dairelere tıklayarak aletlerin Türkçe anlamlarını ve kullanımlarını keşfedebilirsiniz."
              : "* Click on the circles on the image to discover the Turkish translations and medical uses of the instruments."}
          </p>
        </div>

        {/* Right/Bottom: Tool Details and Translations */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-ink dark:text-paper">
              {locale === "tr" ? "Cerrahi Aletler ve Türkçe Çevirileri" : "Surgical Tools & Translations"}
            </h3>
            <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/60">
              {locale === "tr" 
                ? "Gevher Nesibe Şifahanesinde ameliyatlarda kullanılan cerrahi aletlerin orijinal el yazmalarındaki Arapça isimleri ve Türkçe karşılıkları:"
                : "The Arabic names in original manuscripts and Turkish translations of surgical instruments used in Gevher Nesibe hospital:"}
            </p>
            
            {/* Quick selectors */}
            <div className="flex flex-wrap gap-2 pt-2">
              {instruments.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => setSelectedId(inst.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all shadow-sm border ${
                    selectedId === inst.id
                      ? "bg-heritage text-white border-heritage"
                      : "bg-paper text-ink border-sand hover:border-heritage/30 dark:bg-ink/40 dark:text-paper dark:border-ink/20"
                  }`}
                >
                  {locale === "tr" ? inst.nameTr : inst.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tool Museum Card Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-dashed border-heritage/35 bg-heritage/5 p-6 shadow-sm dark:bg-heritage/10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-heritage/10 pb-3">
                <span className="font-display text-xl font-bold text-heritage dark:text-heritage/90">
                  {locale === "tr" ? selectedItem.nameTr : selectedItem.nameEn}
                </span>
                <span className="text-xs font-medium bg-heritage/10 text-heritage dark:text-heritage/80 px-2.5 py-1 rounded-md">
                  {locale === "tr" ? `Orijinal Adı: ${selectedItem.nameAr}` : `Original Name: ${selectedItem.nameArEn}`}
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-heritage/70 dark:text-heritage/60">
                  {locale === "tr" ? "KULLANIM ALANI & DETAY" : "USAGE AREA & DETAILS"}
                </p>
                <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/80">
                  {locale === "tr" ? selectedItem.descriptionTr : selectedItem.descriptionEn}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
