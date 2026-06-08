"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { PageIntro } from "@/components/PageIntro";
import type { Locale } from "@/lib/locale";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  src: string;
  titleTr: string;
  titleEn: string;
  descTr: string;
  descEn: string;
  category: "poster" | "architecture" | "instrument" | "history";
}

const GALLERY_ITEMS: GalleryItem[] = [
  // posters
  {
    src: "/images/Afiscimm1.jpeg",
    titleTr: "Gevher Nesibe Tanıtım Afişi I",
    titleEn: "Gevher Nesibe Promotional Poster I",
    descTr: "Şifahanenin ve medresenin genel yapısını ve ruhunu yansıtan modern afiş çalışması.",
    descEn: "A modern poster reflecting the general structure and spirit of the hospital and madrasah.",
    category: "poster",
  },
  {
    src: "/images/Afiscimm2.jpeg",
    titleTr: "Gevher Nesibe Tanıtım Afişi II",
    titleEn: "Gevher Nesibe Promotional Poster II",
    descTr: "Tıp medresesi ve şifahane tarihine ışık tutan tasarım.",
    descEn: "A design shedding light on the history of the medical school and hospital.",
    category: "poster",
  },
  {
    src: "/images/Afiscimm3.jpeg",
    titleTr: "Gevher Nesibe Tanıtım Afişi III",
    titleEn: "Gevher Nesibe Promotional Poster III",
    descTr: "Müzik ve su sesiyle tedavi yöntemlerini betimleyen afiş.",
    descEn: "A poster depicting treatment methods with music and water sound.",
    category: "poster",
  },
  {
    src: "/images/Afiscimm4.jpeg",
    titleTr: "Gevher Nesibe Tanıtım Afişi IV",
    titleEn: "Gevher Nesibe Promotional Poster IV",
    descTr: "Şifahanedeki astronomi, tıp ve bilimin birlikteliğini vurgulayan çalışma.",
    descEn: "A work highlighting the togetherness of astronomy, medicine, and science in the hospital.",
    category: "poster",
  },
  {
    src: "/images/poster1.png",
    titleTr: "Müze Etkinlik Afişi - Gevher Nesibe",
    titleEn: "Museum Event Poster - Gevher Nesibe",
    descTr: "Şifahanenin Selçuklu mirasını ve tıp tarihini anlatan sergi afişi.",
    descEn: "Exhibition poster explaining the Seljuk heritage of the hospital and history of medicine.",
    category: "poster",
  },
  {
    src: "/images/poster2.png",
    titleTr: "Geçmişten Günümüze Tıp Sergisi",
    titleEn: "History of Medicine Exhibition",
    descTr: "Tıp eğitiminin tarihsel gelişimini konu alan sergileme tasarımı.",
    descEn: "Showcase design focusing on the historical development of medical education.",
    category: "poster",
  },
  {
    src: "/images/poster3.png",
    titleTr: "Selçuklu Şifa Kültürü Tanıtımı",
    titleEn: "Introduction to Seljuk Healing Culture",
    descTr: "Müzik, su ve koku ile yapılan geleneksel tedavileri konu alan görsel tasarım.",
    descEn: "Visual design focusing on traditional treatments using music, water, and aroma.",
    category: "poster",
  },

  // architecture
  {
    src: "/images/GEBO1.jpeg",
    titleTr: "Medrese Avlusu ve Taç Kapı",
    titleEn: "Madrasah Courtyard and Portal",
    descTr: "Gevher Nesibe Medresesi'nin Selçuklu taş işçiliğiyle bezeli anıtsal giriş kapısı ve avlusu.",
    descEn: "The monumental entrance portal and courtyard of Gevher Nesibe Madrasah decorated with Seljuk stonework.",
    category: "architecture",
  },
  {
    src: "/images/GEBO2.jpeg",
    titleTr: "Şifahane Eyvanı",
    titleEn: "Hospital Iwan",
    descTr: "Müzik ve su sesinin yankılanarak odalara ulaştığı havuzlu ana eyvanın görünümü.",
    descEn: "View of the main iwan with a pool where music and water sounds resonated to reach the patient rooms.",
    category: "architecture",
  },
  {
    src: "/images/GEBO3.jpeg",
    titleTr: "Medrese Hücreleri",
    titleEn: "Madrasah Rooms",
    descTr: "Tıp öğrencilerinin eğitim gördüğü ve konakladığı tonozlu medrese odaları.",
    descEn: "Vaulted madrasah rooms where medical students studied and resided.",
    category: "architecture",
  },
  {
    src: "/images/GEBO4.jpeg",
    titleTr: "Kümbet (Gevher Nesibe Türbesi)",
    titleEn: "Tomb of Gevher Nesibe",
    descTr: "Şifahanenin banisi olan Selçuklu Prensesi Gevher Nesibe Sultan'ın kabrinin bulunduğu kümbet yapısı.",
    descEn: "The dome structure containing the tomb of Seljuk Princess Gevher Nesibe Sultan, the founder of the hospital.",
    category: "architecture",
  },
  {
    src: "/images/GEBO5.jpeg",
    titleTr: "Medrese Genel Panoraması",
    titleEn: "General Panorama of the Madrasah",
    descTr: "Çifte Medrese mimarisinin iki ana yapısının birleşimini gösteren geniş açılı görünüm.",
    descEn: "Wide-angle view showing the union of the two main structures of the Double Madrasah architecture.",
    category: "architecture",
  },
  {
    src: "/images/historical/architecture.png",
    titleTr: "Selçuklu Mimari Çizimi",
    titleEn: "Seljuk Architectural Plan",
    descTr: "Medresenin çifte plan yapısını gösteren tarihsel rölöve ve mimari yerleşim şeması.",
    descEn: "Historical survey and architectural layout schema showing the double-plan structure of the madrasah.",
    category: "architecture",
  },

  // instruments
  {
    src: "/images/ney.png",
    titleTr: "Ney (Kamış Flüt)",
    titleEn: "Ney (Reed Flute)",
    descTr: "Nefesli çalgıların şahı olan, insan sesine yakın tınısıyla bilinen tedavi enstrümanı.",
    descEn: "The king of wind instruments, known for its human-voice-like timbre used in healing.",
    category: "instrument",
  },
  {
    src: "/images/ud.png",
    titleTr: "Ud (Oud)",
    titleEn: "Ud (Oud)",
    descTr: "Geleneksel mızraplı çalgı, İbn-i Sina'ya göre kalp ritmini düzenleyen temel şifa sazı.",
    descEn: "Traditional plucked string instrument, the main healing instrument that regulates heart rhythm according to Ibn Sina.",
    category: "instrument",
  },
  {
    src: "/images/rebap.png",
    titleTr: "Rebap (Yaylı Saz)",
    titleEn: "Rebap (Bowed Lute)",
    descTr: "Orta Asya kökenli, uzun titreşimli sesiyle akıl hastalıklarının tedavisinde kullanılan yaylı enstrüman.",
    descEn: "Bowed instrument of Central Asian origin used in treating mental illnesses with its long, vibrating sound.",
    category: "instrument",
  },
  {
    src: "/images/kanun.png",
    titleTr: "Kanun (Zither)",
    titleEn: "Kanun (Qanun)",
    descTr: "Geniş ses aralığı ile hekimin nabza göre belirlediği makamları en hassas şekilde icra eden 78 telli enstrüman.",
    descEn: "78-string instrument executing makams determined by the doctor's pulse analysis in the most precise way with its wide scale.",
    category: "instrument",
  },
  {
    src: "/images/def.png",
    titleTr: "Def / Bendir",
    titleEn: "Def / Bendir (Frame Drum)",
    descTr: "Vurmalı çalgı, hastanın nabzını müzikle senkronize etmek ve ritim terapisi uygulamak için kullanılır.",
    descEn: "Percussion instrument used to synchronize the patient's pulse with music and apply rhythm therapy.",
    category: "instrument",
  },
  {
    src: "/images/historical/instruments.png",
    titleTr: "Tarihsel Müzik Aletleri Tasviri",
    titleEn: "Historical Musical Instruments Illustration",
    descTr: "Minyatürlerde yer alan Selçuklu ve Osmanlı dönemi müzisyenlerinin kullandığı enstrümanların çizimleri.",
    descEn: "Drawings of instruments used by Seljuk and Ottoman musicians depicted in miniatures.",
    category: "instrument",
  },

  // history
  {
    src: "/images/GEV1.jpeg",
    titleTr: "Selçuklu Hekimleri Minyatürü",
    titleEn: "Miniature of Seljuk Physicians",
    descTr: "Dönemin tıp kitaplarında yer alan, hekimlerin hastayı muayene edişini ve ilaç hazırlamasını gösteren çizim.",
    descEn: "Drawing in medical books of the period showing physicians examining patients and preparing medicine.",
    category: "history",
  },
  {
    src: "/images/GEV2.jpeg",
    titleTr: "Gevher Nesibe Sultan Vasiyeti",
    titleEn: "Will of Gevher Nesibe Sultan",
    descTr: "Prensesin abisi Gıyaseddin Keyhüsrev'e kendi adına bir tıp medresesi ve şifahane yapılması vasiyetini temsil eden sahne.",
    descEn: "Scene representing the Princess's will to her brother Ghiyath al-Din Keyhusrev to build a medical school and hospital in her name.",
    category: "history",
  },
  {
    src: "/images/GEV3.jpeg",
    titleTr: "İbn-i Sina ve Tıp Eğitimi",
    titleEn: "Ibn Sina and Medical Education",
    descTr: "Büyük hekim İbn-i Sina'nın öğrencilerine nabız teşhisi ve anatomi üzerine ders verişini betimleyen görsel.",
    descEn: "Visual depicting the great physician Ibn Sina teaching his students on pulse diagnosis and anatomy.",
    category: "history",
  },
  {
    src: "/images/GEV4.jpeg",
    titleTr: "Şifahane Eczanesi (Şerbet hane)",
    titleEn: "Hospital Pharmacy (Sherbet House)",
    descTr: "Geleneksel bitkisel ilaçların, şurupların ve şifalı macunların hazırlandığı eczane bölümü tasviri.",
    descEn: "Depiction of the pharmacy section where traditional herbal medicines, syrups, and healing pastes were prepared.",
    category: "history",
  },
  {
    src: "/images/GEV5.jpeg",
    titleTr: "Müzikle Tedavi Sahnesi",
    titleEn: "Music Therapy Scene",
    descTr: "Hastaların havuz başında müzisyen heyeti eşliğinde dinlenerek huzur bulduğu tedavi anı.",
    descEn: "Treatment moment where patients rested and found peace by the pool accompanied by a committee of musicians.",
    category: "history",
  },
  {
    src: "/images/GEV6.jpeg",
    titleTr: "Selçuklu Tıp Diploması",
    titleEn: "Seljuk Medical Diploma (Icazetname)",
    descTr: "Medreseden mezun olan hekimlerin mesleklerini icra edebilmeleri için aldıkları Selçuklu dönemi icazetnamesi.",
    descEn: "Seljuk period diploma received by physicians graduating from the madrasah to practice their profession.",
    category: "history",
  },
  {
    src: "/images/GORSEL2.jpeg",
    titleTr: "Tıp Medresesi Kitabesi",
    titleEn: "Medical School Inscription",
    descTr: "Şifahane duvarında yer alan ve yapının tarihini belgeleyen Selçuklu sülüs hatlı taş kitabe.",
    descEn: "Stone inscription with Seljuk Thuluth calligraphy on the hospital wall documenting the building's history.",
    category: "history",
  },
  {
    src: "/images/GORSEL3.png",
    titleTr: "Müze Sergileme Alanı",
    titleEn: "Museum Exhibition Area",
    descTr: "Selçuklu Uygarlığı Müzesi'ndeki arkeolojik tıp aletleri ve tarihi eserlerin modern sergileme alanı.",
    descEn: "Modern exhibition area of archaeological medical tools and historical artifacts in the Museum of Seljuk Civilization.",
    category: "history",
  },
  {
    src: "/images/tarihsel.png",
    titleTr: "Selçuklu Arması ve Çift Başlı Kartal",
    titleEn: "Seljuk Coat of Arms & Double-Headed Eagle",
    descTr: "Şifahane mimarisinde ve Selçuklu devletinde gücü, koruyuculuğu ve bilgeliği temsil eden çift başlı kartal motifi.",
    descEn: "Double-headed eagle motif representing power, guardianship, and wisdom in the hospital architecture and the Seljuk state.",
    category: "history",
  },
  {
    src: "/images/historical/img_1.png",
    titleTr: "Cerrahi Müdahaleler Çizimi",
    titleEn: "Surgical Interventions Illustration",
    descTr: "Sabuncuoğlu Şerefeddin'in Cerrahiyyetü'l-Haniyye adlı eserinde yer alan cerrahi operasyon teknikleri.",
    descEn: "Surgical operation techniques depicted in Sabuncuoglu Serefeddin's work Cerrahiyyetü'l-Haniyye.",
    category: "history",
  },
  {
    src: "/images/historical/img_2.png",
    titleTr: "Antik Cerrahi Aletler",
    titleEn: "Ancient Surgical Tools",
    descTr: "Şifahanede kullanılan neşterler, pensler ve dağlama aletlerinin çizimsel gösterimi.",
    descEn: "Illustrative representation of scalpels, forceps, and cautery tools used in the hospital.",
    category: "history",
  },
  {
    src: "/images/historical/img_3.png",
    titleTr: "İlaç Yapım Kazanı ve Havanlar",
    titleEn: "Medicine Making Cauldron and Mortars",
    descTr: "Şifalı bitkilerin dövülerek ilaç haline getirildiği havanlar ve kaynatma kapları.",
    descEn: "Mortars and boiling pots where healing herbs were crushed and made into medicine.",
    category: "history",
  },
  {
    src: "/images/historical/miniature.png",
    titleTr: "Selçuklu Günlük Yaşam Minyatürü",
    titleEn: "Seljuk Daily Life Miniature",
    descTr: "Dönemin sosyal yaşantısını, giyim tarzını ve kültürel ortamını yansıtan detaylı minyatür sahnesi.",
    descEn: "Detailed miniature scene reflecting the social life, dressing style, and cultural environment of the period.",
    category: "history",
  },
];

export default function GalleryPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "tr";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => [
    { id: "all", tr: "Tüm Görseller", en: "All Images" },
    { id: "poster", tr: "Afişler & Tasarımlar", en: "Posters & Designs" },
    { id: "architecture", tr: "Şifahane & Mimari", en: "Hospital & Architecture" },
    { id: "instrument", tr: "Müzik Aletleri", en: "Musical Instruments" },
    { id: "history", tr: "Tarihi Minyatür & Belgeler", en: "Historical Miniatures & Docs" }
  ], []);

  // Filter items
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      
      const title = locale === "tr" ? item.titleTr : item.titleEn;
      const desc = locale === "tr" ? item.descTr : item.descEn;
      const matchesSearch =
        searchQuery.trim() === "" ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, locale]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [lightboxIndex, filteredItems.length]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <div className="space-y-12">
      <PageIntro
        title={locale === "tr" ? "Fotoğraf & Tasarım Galerisi" : "Photo & Design Gallery"}
        subtitle={
          locale === "tr"
            ? "Gevher Nesibe Şifahanesi ve Medresesi'ne ait tarihi görseller, mimari detaylar, sergi afişleri ve STEM tıp araçları."
            : "Historical images, architectural details, exhibition posters, and STEM medical tools of Gevher Nesibe."
        }
      />

      {/* Controls: Category Tabs & Search Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-sand pb-6 dark:border-ink/20">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setLightboxIndex(null); // Reset lightbox references since filtered list changes
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-heritage text-white shadow-sm"
                  : "bg-sand/40 text-ink-muted hover:bg-sand hover:text-ink dark:bg-ink/50 dark:text-paper/70 dark:hover:bg-ink/80"
              }`}
            >
              {locale === "tr" ? cat.tr : cat.en}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLightboxIndex(null);
            }}
            placeholder={locale === "tr" ? "Görsellerde ara..." : "Search images..."}
            className="w-full rounded-full border border-sand bg-paper/60 px-5 py-2.5 pl-10 text-sm text-ink outline-none transition focus:border-heritage dark:border-ink/30 dark:bg-ink/40 dark:text-paper"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted/60 dark:text-paper/40 pointer-events-none">
            🔍
          </span>
        </div>
      </div>

      {/* Masonry-like Grid Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-ink-muted dark:text-paper/50">
          <span className="text-4xl block mb-3">🖼️</span>
          {locale === "tr" ? "Aramanıza uygun bir görsel bulunamadı." : "No images found matching your search."}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const title = locale === "tr" ? item.titleTr : item.titleEn;
              const desc = locale === "tr" ? item.descTr : item.descEn;

              return (
                <motion.div
                  layout
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-sand bg-paper shadow-sm transition-all duration-300 hover:shadow-lift dark:border-ink/20 dark:bg-ink/40"
                >
                  {/* Image wrapper */}
                  <div className="aspect-[4/3] overflow-hidden bg-sand/20 dark:bg-black/20 flex items-center justify-center relative">
                    <img
                      src={item.src}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                      <span className="rounded-full bg-paper/90 px-4 py-2 text-xs font-semibold text-ink shadow dark:bg-ink/90 dark:text-paper flex items-center gap-1.5">
                        <span>🔍</span>
                        {locale === "tr" ? "Büyüt" : "Zoom"}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 space-y-1">
                    <span className="inline-block rounded bg-heritage/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-heritage uppercase dark:bg-heritage/20">
                      {item.category === "poster"
                        ? locale === "tr" ? "Tasarım" : "Design"
                        : item.category === "architecture"
                        ? locale === "tr" ? "Mimari" : "Architecture"
                        : item.category === "instrument"
                        ? locale === "tr" ? "Çalgı" : "Instrument"
                        : locale === "tr" ? "Tarih" : "History"}
                    </span>
                    <h3 className="font-display text-sm font-bold text-ink dark:text-paper line-clamp-1 group-hover:text-heritage transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-ink-muted dark:text-paper/60 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 md:p-8"
          >
            {/* Close Button */}
            <div className="flex justify-end z-50">
              <button
                onClick={() => setLightboxIndex(null)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition active:scale-95 text-xl font-bold"
                aria-label="Close Lightbox"
              >
                ✕
              </button>
            </div>

            {/* Main Area: Image and Navigation */}
            <div className="flex-1 flex items-center justify-between gap-4 max-w-5xl mx-auto w-full relative">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition active:scale-95 text-2xl font-bold"
                aria-label="Previous Image"
              >
                ‹
              </button>

              {/* Central Image Container */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <img
                  src={filteredItems[lightboxIndex].src}
                  alt={
                    locale === "tr"
                      ? filteredItems[lightboxIndex].titleTr
                      : filteredItems[lightboxIndex].titleEn
                  }
                  className="max-h-[60vh] md:max-h-[70vh] max-w-full object-contain rounded-lg shadow-lift bg-white/5"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition active:scale-95 text-2xl font-bold"
                aria-label="Next Image"
              >
                ›
              </button>
            </div>

            {/* Bottom Panel: Info and Mobile Navigation */}
            <div className="max-w-3xl mx-auto w-full text-center space-y-4 pb-4 md:pb-0">
              {/* Image Info */}
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white md:text-2xl font-display">
                  {locale === "tr"
                    ? filteredItems[lightboxIndex].titleTr
                    : filteredItems[lightboxIndex].titleEn
                  }
                </h2>
                <p className="text-sm text-paper/70 dark:text-paper/50 leading-relaxed">
                  {locale === "tr"
                    ? filteredItems[lightboxIndex].descTr
                    : filteredItems[lightboxIndex].descEn
                  }
                </p>
              </div>

              {/* Direct Download Button */}
              <div className="flex justify-center">
                <a
                  href={filteredItems[lightboxIndex].src}
                  download={filteredItems[lightboxIndex].src.split("/").pop()}
                  className="inline-flex items-center gap-2 rounded-full bg-heritage px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-heritage-dark transition active:scale-95"
                >
                  📥 {locale === "tr" ? "Görseli İndir" : "Download Image"}
                </a>
              </div>

              {/* Mobile Swipe / Arrow Helpers */}
              <div className="flex justify-center gap-6 md:hidden">
                <button
                  onClick={handlePrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-xl font-bold"
                >
                  ‹
                </button>
                <span className="text-white/60 text-sm flex items-center font-semibold">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <button
                  onClick={handleNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-xl font-bold"
                >
                  ›
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
