"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MuseumHotspot {
  id: string;
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  x: string;
  y: string;
}

interface MuseumSpace {
  id: string;
  titleTr: string;
  titleEn: string;
  image: string;
  descriptionTr: string;
  descriptionEn: string;
  hotspots: MuseumHotspot[];
}

const museumSpaces: MuseumSpace[] = [
  {
    id: "tac-kapi",
    titleTr: "Şifahane Taç Kapısı",
    titleEn: "Monumental Entrance Portal",
    image: "/images/historical/img_1.png",
    descriptionTr: "Selçuklu taş işçiliğinin şaheseri olan ve külliyeye girişi sağlayan abidevi anıtsal kapı.",
    descriptionEn: "The monumental entrance portal serving as the main entry, a masterpiece of Seljuk stonework.",
    hotspots: [
      {
        id: "mukarnas",
        nameTr: "Mukarnas Detayları",
        nameEn: "Muqarnas Stonework",
        descriptionTr: "Kapının üst kısmında yer alan, Selçuklu mimarisinin simgesi olan geometrik üç boyutlu taş sarkıtlar.",
        descriptionEn: "Geometrical three-dimensional stalactite stonework at the top, a signature of Seljuk architecture.",
        x: "50%",
        y: "22%"
      },
      {
        id: "kitabe",
        nameTr: "Vakıf Kitabesi",
        nameEn: "Foundation Inscription",
        descriptionTr: "Gıyaseddin Keyhüsrev'in kız kardeşi Gevher Nesibe Sultan adına yaptırdığı şifahanenin kuruluşunu ve amacını belgeleyen yazıt.",
        descriptionEn: "Historical inscription documenting the establishment and purpose of the hospital by Kaykhusraw I in honor of his sister Gevher Nesibe Sultan.",
        x: "50%",
        y: "45%"
      },
      {
        id: "yilan",
        nameTr: "Şifa Sembolü (Çift Yılan)",
        nameEn: "Healing Symbol (Double Snake)",
        descriptionTr: "Kapı kenarlarındaki taş kabartmalarda yer alan, Selçuklu tıbbını ve eczacılığını simgeleyen birbirine sarılı çift yılan rölyefi.",
        descriptionEn: "Relief of intertwined double snakes carved on the side borders, symbolizing Seljuk medicine and pharmacy.",
        x: "20%",
        y: "65%"
      }
    ]
  },
  {
    id: "ic-avlu",
    titleTr: "Şifahiye Avlusu",
    titleEn: "Hospital Courtyard",
    image: "/images/historical/img_2.png",
    descriptionTr: "Ortasında havuzu bulunan, dört eyvanlı planıyla hastaların açık havada dinlendiği külliye avlusu.",
    descriptionEn: "The four-iwan plan courtyard with a central pool where patients relaxed in the open air.",
    hotspots: [
      {
        id: "buyuk-eyvan",
        nameTr: "Büyük Eyvan (Açık Hava Sınıfı)",
        nameEn: "Grand Iwan (Outdoor Classroom)",
        descriptionTr: "Medresede tıp teorik derslerinin ve hekimlerin ortak bilimsel tartışmalarının yapıldığı büyük tonozlu eyvan.",
        descriptionEn: "The large vaulted iwan used for theoretical medical lectures and clinical discussions among physicians.",
        x: "50%",
        y: "38%"
      },
      {
        id: "sifa-odasi",
        nameTr: "Şifa Hücreleri (Hasta Odaları)",
        nameEn: "Healing Chambers (Patient Rooms)",
        descriptionTr: "Akıl ve ruh sağlığı hastalarının kaldığı, pencereleri su sesini dinlemeleri için iç avluya açılan tonozlu odalar.",
        descriptionEn: "Vaulted chambers for psychiatric patients with windows opening to the courtyard to listen to the sound of healing water.",
        x: "15%",
        y: "62%"
      },
      {
        id: "tas-sutunlar",
        nameTr: "Geometrik Taş Sütunlar",
        nameEn: "Geometric Stone Pillars",
        descriptionTr: "Külliyenin revaklarını taşıyan, Selçuklu geometrisini yansıtan zengin taş oymalı sütun başlıkları.",
        descriptionEn: "Ornate stone-carved pillar capitals holding the arcades, reflecting Seljuk geometric brilliance.",
        x: "82%",
        y: "70%"
      },
      {
        id: "havuz",
        nameTr: "Merkezi Şifa Havuzu",
        nameEn: "Central Healing Pool",
        descriptionTr: "Ortada yer alan havuzdan yayılan su sesinin akustik koridorlar sayesinde odalara kadar ulaşması sağlanıyordu.",
        descriptionEn: "The sound of water splashing from the central pool echoed through acoustic channels to soothe patients in their rooms.",
        x: "50%",
        y: "85%"
      }
    ]
  },
  {
    id: "akustik-koridor",
    titleTr: "Akustik ve Şifa Koridorları",
    titleEn: "Acoustic Healing Corridors",
    image: "/images/historical/img_3.png",
    descriptionTr: "Ney ve su sesinin külliyedeki tüm odalara homojen bir şekilde yayılmasını sağlayan deha ürünü tünel yapıları.",
    descriptionEn: "Genius vaulted tunnel structures designed to amplify and distribute ney and water sounds to all chambers.",
    hotspots: [
      {
        id: "akustik-tonoz",
        nameTr: "Ses Dağılım Tonozu",
        nameEn: "Sound Distribution Vault",
        descriptionTr: "Selçuklu mimarlarının tasarladığı, sesin çınlamasını engelleyerek yumuşak bir eko oluşturmasını sağlayan akustik tavan.",
        descriptionEn: "Specially engineered Seljuk vaulted ceiling that prevented harsh reverberations and created a soothing acoustic echo.",
        x: "50%",
        y: "22%"
      },
      {
        id: "kandil-nisleri",
        nameTr: "Aydınlatma Nişleri",
        nameEn: "Lighting Niches",
        descriptionTr: "Geceleri kandiller yerleştirilerek koridorları aydınlatan, aynı zamanda sesi soğuran gözenekli taş oyuklar.",
        descriptionEn: "Niches used for oil lamps to illuminate the corridors, also functioning as acoustic traps to absorb excessive noise.",
        x: "15%",
        y: "48%"
      },
      {
        id: "su-kanali",
        nameTr: "Zemin Su Kanalları",
        nameEn: "Ground Water Channels",
        descriptionTr: "Şırıltı çıkartarak akan suyun hastaların kaygı seviyelerini dindirdiği, zemin boyunca uzanan şifalı su kanalları.",
        descriptionEn: "Stone water channels running along the floor, generating a gentle babbling sound that lowered patient anxiety.",
        x: "50%",
        y: "85%"
      }
    ]
  }
];

export function InteractiveMuseum({ locale }: { locale: "tr" | "en" }) {
  const [activeSpaceId, setActiveSpaceId] = useState<string>("ic-avlu");
  const [activeHotspotId, setActiveHotspotId] = useState<string>("buyuk-eyvan");

  const currentSpace = museumSpaces.find((s) => s.id === activeSpaceId) || museumSpaces[1];
  
  // Auto-select first hotspot of the new space when switched
  const handleSpaceChange = (id: string) => {
    setActiveSpaceId(id);
    const space = museumSpaces.find((s) => s.id === id);
    if (space && space.hotspots.length > 0) {
      setActiveHotspotId(space.hotspots[0].id);
    }
  };

  const currentHotspot = currentSpace.hotspots.find((h) => h.id === activeHotspotId) || currentSpace.hotspots[0];

  return (
    <div className="rounded-3xl border border-sand bg-gradient-to-br from-paper via-sand/20 to-paper p-6 shadow-card dark:border-ink/20 dark:from-ink dark:via-ink/40 dark:to-ink sm:p-8 space-y-8">
      
      {/* Space Selectors at the Top */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-sand pb-6 dark:border-ink/20">
        <div>
          <h3 className="font-display text-2xl font-bold text-ink dark:text-paper">
            {locale === "tr" ? "Gevher Nesibe Müzesi İnteraktif Keşif Turu" : "Gevher Nesibe Museum Interactive Tour"}
          </h3>
          <p className="text-sm text-ink-muted dark:text-paper/60 mt-1">
            {locale === "tr" ? "Tarihi müzenin (Çifte Medrese) odalarını ve mimari harikalarını keşfedin." : "Explore the rooms and architectural marvels of the historic Double Madrasah."}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 shrink-0">
          {museumSpaces.map((space) => (
            <button
              key={space.id}
              onClick={() => handleSpaceChange(space.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all shadow-sm border ${
                activeSpaceId === space.id
                  ? "bg-clinical text-white border-clinical"
                  : "bg-paper text-ink border-sand hover:border-clinical/30 dark:bg-ink/60 dark:text-paper dark:border-ink/30"
              }`}
            >
              {locale === "tr" ? space.titleTr : space.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        
        {/* Left: Interactive Image with dynamic Hotspots */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden rounded-2xl border-4 border-sand bg-ink shadow-lg aspect-square sm:aspect-video lg:aspect-square flex items-center justify-center dark:border-ink/20">
            <img
              src={currentSpace.image}
              alt={locale === "tr" ? currentSpace.titleTr : currentSpace.titleEn}
              className="h-full w-full object-cover transition-all duration-500"
            />
            
            {/* Dark overlay to make hotspots pop beautifully */}
            <div className="absolute inset-0 bg-black/10 select-none pointer-events-none" />

            {/* Dynamic hotspots for current space */}
            <AnimatePresence>
              {currentSpace.hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspotId(hotspot.id)}
                  style={{ left: hotspot.x, top: hotspot.y }}
                  className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 hover:scale-125 focus:outline-none z-10"
                >
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${activeHotspotId === hotspot.id ? "bg-accent" : "bg-clinical"}`}></span>
                  <span className={`relative inline-flex h-5 w-5 rounded-full border-2 border-white shadow-lift transition-colors duration-300 ${activeHotspotId === hotspot.id ? "bg-accent" : "bg-clinical"}`}></span>
                </button>
              ))}
            </AnimatePresence>
          </div>
          <p className="text-center text-xs italic text-ink-muted dark:text-paper/40">
            {locale === "tr"
              ? "* Fotoğraf üzerindeki parlayan halkalara tıklayarak tarihi detayları öğrenebilirsiniz."
              : "* Click on the glowing rings on the photo to discover the historical details."}
          </p>
        </div>

        {/* Right: Space & Hotspot Information Card */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          
          {/* Space General Info */}
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-clinical bg-clinical/10 px-2.5 py-1 rounded-md">
              {locale === "tr" ? "AKTİF BÖLÜM" : "ACTIVE SPACE"}
            </span>
            <h4 className="font-display text-2xl font-bold text-ink dark:text-paper">
              {locale === "tr" ? currentSpace.titleTr : currentSpace.titleEn}
            </h4>
            <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/60 border-l-2 border-clinical/30 pl-3">
              {locale === "tr" ? currentSpace.descriptionTr : currentSpace.descriptionEn}
            </p>
          </div>

          {/* Hotspot details (Animate when clicked) */}
          <AnimatePresence mode="wait">
            {currentHotspot && (
              <motion.div
                key={currentHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-dashed border-accent/35 bg-accent/5 p-6 shadow-sm dark:bg-accent/10"
              >
                <div className="flex flex-wrap items-baseline gap-2 border-b border-accent/10 pb-3">
                  <span className="font-display text-lg font-bold text-accent dark:text-accent-soft">
                    {locale === "tr" ? currentHotspot.nameTr : currentHotspot.nameEn}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent/70 dark:text-accent/60">
                    {locale === "tr" ? "MÜZE ESERİ / DETAY BİLGİSİ" : "EXHIBIT DETAIL / DETAILS"}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/80">
                    {locale === "tr" ? currentHotspot.descriptionTr : currentHotspot.descriptionEn}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick list selector for hotspots */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-ink-muted dark:text-paper/40 uppercase tracking-wider">
              {locale === "tr" ? "BU BÖLÜMDEKİ DETAYLAR" : "DETAILS IN THIS SECTION"}
            </p>
            <div className="flex flex-wrap gap-2">
              {currentSpace.hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspotId(hotspot.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all shadow-sm border ${
                    activeHotspotId === hotspot.id
                      ? "bg-accent text-white border-accent"
                      : "bg-paper text-ink border-sand hover:border-accent/30 dark:bg-ink/60 dark:text-paper dark:border-ink/20"
                  }`}
                >
                  {locale === "tr" ? hotspot.nameTr : hotspot.nameEn}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
