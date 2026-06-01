"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";
import type { CaseTag, LocalizedCase } from "@/content/cases";
import { CaseStudyCard } from "@/components/CaseStudyCard";

type FilterKey = "all" | CaseTag;

type ComparisonData = {
  id: CaseTag;
  title: string;
  badge: string;
  videoSrc: string;
  selcuklu: {
    title: string;
    subsections: { subtitle: string; items: string[] }[];
  };
  modern: {
    title: string;
    subsections: { subtitle: string; items: string[] }[];
  };
  conclusion: {
    title: string;
    content?: string[];
    prosCons?: {
      selcukluPros: string[];
      modernPros: string[];
      ideal: string;
    };
    final: string;
  };
};

const comparisonSectionsData: ComparisonData[] = [
  {
    id: "imaging",
    title: "Gevher Nesibe Müzesi ve Modern Tıp: Tarihten Günümüze Ameliyat Teknolojileri",
    badge: "Anatomi / Cerrahi",
    videoSrc: "/images/ilk1.mp4",
    selcuklu: {
      title: "Selçuklu Dönemi (1206 - Gevher Nesibe Şifahanesi)",
      subsections: [
        {
          subtitle: "Kullanılan Araçlar ve Yöntemler",
          items: [
            "El yapımı çelik bistüriler ve neşterler",
            "Kauterizasyon (dağlama) teknikleri",
            "Bitkisel anestezi (afyon, hint keneviri)",
            "Doğal ipliklerle dikiş",
            "Su ve şarap ile sterilizasyon",
            "Gözlem ve tecrübeye dayalı teşhis",
          ],
        },
        {
          subtitle: "Ameliyat Koşulları",
          items: [
            "Doğal ışık altında çalışma",
            "Manuel beceri ve deneyime dayalı teknikler",
            "Sınırlı görüş alanı",
            "Uzun iyileşme süreleri",
            "Yüksek enfeksiyon riski",
          ],
        },
      ],
    },
    modern: {
      title: "Günümüz Modern Tıp (2026)",
      subsections: [
        {
          subtitle: "Kullanılan Araçlar ve Yöntemler",
          items: [
            "Robotik cerrahi sistemler (Da Vinci, Hugo)",
            "Laparoskopik minimal invaziv teknikler",
            "Genel anestezi ve gelişmiş ağrı yönetimi",
            "Sentetik emici dikişler",
            "Steril ameliyathane ortamı ve antibiyotikler",
            "MR, BT, ultrason ile detaylı görüntüleme",
          ],
        },
        {
          subtitle: "Ameliyat Koşulları",
          items: [
            "LED ve fiber optik aydınlatma",
            "Mikroskopik hassasiyet (milimetrik kesiler)",
            "3D görüntüleme ve büyütme sistemleri",
            "Hızlı iyileşme (günübirlik ameliyatlar)",
            "Minimal enfeksiyon riski (%1'in altı)",
          ],
        },
      ],
    },
    conclusion: {
      title: "Ortak Değerler",
      content: [
        "Hastanın iyileşmesi öncelik",
        "Tıbbi etik ve özen",
        "Sürekli öğrenme ve gelişim",
        "İnsan merkezli yaklaşım",
      ],
      final: "Gevher Nesibe, zamanının en ileri tıp kurumuydu ve bugünkü modern tıbbın temellerini attı. 820 yıllık bu yolculuk, tıp biliminin inanılmaz evrimini gösteriyor.",
    },
  },
  {
    id: "lab",
    title: "Gevher Nesibe Müzesi ve Modern Eczacılık: 820 Yıllık Evrim",
    badge: "Eczacılık",
    videoSrc: "/images/ikinci2.mp4",
    selcuklu: {
      title: "Selçuklu Dönemi - Gevher Nesibe Eczanesi (1206)",
      subsections: [
        {
          subtitle: "İlaç Hazırlama Yöntemleri",
          items: [
            "Havan ve dibek: Bitkileri ezme ve toz haline getirme",
            "El ile karıştırma: Malzemeleri birleştirme ve macun yapma",
            "Kaynatma ve damıtma: Şurup ve özütler hazırlama",
            "Kurutma: Bitkileri gölgede veya güneşte kurutma",
            "Süzme ve filtreleme: Bez ve kağıt ile süzme",
          ],
        },
        {
          subtitle: "Kullanılan Malzemeler",
          items: [
            "Şifalı bitkiler: Adaçayı, nane, papatya, kekik, lavanta",
            "Baharatlar: Zencefil, tarçın, karanfil, safran",
            "Reçineler: Sakız, balsam, mür",
            "Mineraller: Kükürt, cıva, altın tozu",
            "Hayvansal ürünler: Bal, balmumu, yağlar",
          ],
        },
        {
          subtitle: "Saklama ve Sunum",
          items: [
            "Cam şişeler: El yapımı renkli cam kavanozlar",
            "Seramik kaplar: Sırlı çömlek ve testiler",
            "Deri torbalar: Kuru bitki ve tozlar için",
            "Etiketleme: El yazısı ile Arapça/Farsça etiketler",
            "Raf ömrü: Günler/haftalar (katkısız)",
          ],
        },
        {
          subtitle: "Eczacı Rolü",
          items: [
            "Bitkibilimci (botanist)",
            "İlaç hazırlayıcı",
            "Danışman ve şifacı",
            "Reçete yorumlayıcı",
            "Kişiye özel karışım hazırlayıcı",
          ],
        },
      ],
    },
    modern: {
      title: "Modern Eczacılık (2026)",
      subsections: [
        {
          subtitle: "İlaç Hazırlama Yöntemleri",
          items: [
            "Otomatik tablet presleri: Saniyede yüzlerce tablet",
            "Aseptik dolum hatları: Steril enjeksiyonlar",
            "Kapsül dolum makineleri: Hassas dozaj kontrolü",
            "Liyofilizasyon: Dondurarak kurutma teknolojisi",
            "Nano-enkapsülasyon: Moleküler düzeyde kaplama",
          ],
        },
        {
          subtitle: "Kullanılan Malzemeler",
          items: [
            "Sentetik aktif maddeler: Laboratuvarda üretilen kimyasallar",
            "Biyoteknolojik ilaçlar: Genetiği değiştirilmiş organizmalardan",
            "Nano-partiküller: Hedefli ilaç taşıma sistemleri",
            "Polimerler: Kontrollü salım için kapsüller",
            "Monoklonal antikorlar: İmmünoterapi ilaçları",
          ],
        },
        {
          subtitle: "Saklama ve Sunum",
          items: [
            "Blister ambalajlar: Alüminyum-plastik koruma",
            "Soğuk zincir: 2-8°C sıcaklık kontrollü depolama",
            "Barkod sistemi: Otomatik takip ve izleme",
            "QR kodlu kutular: Dijital prospektüs erişimi",
            "Raf ömrü: Yıllar (stabilizatörler sayesinde)",
          ],
        },
        {
          subtitle: "Eczacı Rolü",
          items: [
            "İlaç danışmanı",
            "Reçete kontrolü ve etkileşim analizi",
            "Aşı uygulayıcı",
            "Sağlık taraması yapan",
            "Dijital sağlık kayıtları yöneticisi",
          ],
        },
      ],
    },
    conclusion: {
      title: "Sonuç",
      content: [
        "Gevher Nesibe Şifahanesi'nin eczanesi, döneminin en gelişmiş ilaç hazırlama merkeziydi. Bugünkü modern eczacılığın temelleri - kişiye özel tedavi, kalite kontrol, etik değerler - bu tarihi kurumda atılmıştır.",
      ],
      final: "820 yıllık bu yolculuk, eczacılığı havan ve dibekten robotik sistemlere, bitkisel karışımlardan nano-ilaçlara taşımıştır. Ancak temel misyon aynı kalmıştır: İnsanların sağlığına hizmet etmek.",
    },
  },
  {
    id: "care",
    title: "Modern Psikiyatri: 820 Yıllık Ruhsal Sağlık Evrimi",
    badge: "Ruhsal Tedavi",
    videoSrc: "/images/ucuncu3.mp4",
    selcuklu: {
      title: "Selçuklu Dönemi - Gevher Nesibe Şifahanesi (1206)",
      subsections: [
        {
          subtitle: "Tedavi Yöntemleri",
          items: [
            "Müzik Terapisi (Musikî ile Şifa): Ney, ud, rebap, kanun gibi enstrümanlarla canlı müzik. Makam terapisi (Rast: Huzur, Uşşak: Melankoli, Hicaz: Korku). Günde 2-3 saat seanslar.",
            "Su Terapisi (Hidroterapi): Akan su sesleri (havuzlar, çeşmeler, şelaleler), görsel su yansımaları, doğal beyaz gürültü ile zihinsel rahatlama.",
            "Koku Terapisi (Aromaterapi): Gül suyu (sakinleştirici), lavanta (uyku), buhur/tütsü (ortam arındırma), misk ve amber.",
            "Bahçe Terapisi: Yeşil alanlar, çiçek bahçeleri, doğa yürüyüşleri, renk terapisi ve temiz hava.",
            "Konuşma ve Danışmanlık: Hekim ile sohbet, hikaye anlatımı (terapötik öyküler), dini/manevi danışmanlık ve aile görüşmeleri.",
            "Diyet Terapisi: Özel beslenme programları, bitkisel çaylar (melisa, papatya, ıhlamur), hafif yemekler, bal ve şerbetler.",
          ],
        },
        {
          subtitle: "Tedavi Süresi",
          items: [
            "Ortalama yatış: 2-6 hafta",
            "Kronik vakalar: Aylar sürebilir",
            "Günlük rutin: Düzenli program",
          ],
        },
        {
          subtitle: "Hasta Yaklaşımı",
          items: [
            "İnsancıl muamele: Zincir ve şiddet yok",
            "Saygılı davranış: Hasta onuru korunur",
            "Bireysel ilgi: Kişiye özel tedavi planı",
            "Sabır ve şefkat: Anlayışlı yaklaşım",
          ],
        },
      ],
    },
    modern: {
      title: "Modern Psikiyatri (2026)",
      subsections: [
        {
          subtitle: "Tedavi Yöntemleri",
          items: [
            "İlaç Tedavisi (Farmakoterapi): Antidepresanlar (SSRI, SNRI), Antipsikotikler, Anksiyolitikler, Duygudurum düzenleyiciler (Lithium), Uyku ilaçları.",
            "Psikoterapi (Konuşma Terapisi): Bilişsel Davranışçı Terapi (BDT), Psikanaliz, Grup terapisi, Aile terapisi, EMDR (Travma tedavisi).",
            "Beyin Stimülasyon Tedavileri: Elektrokonvülsif Terapi (EKT), Transkraniyal Manyetik Stimülasyon (TMS), Vagus Siniri Stimülasyonu (VNS), Derin Beyin Stimülasyonu (DBS).",
            "Dijital ve Teknolojik Tedaviler: Online terapi, Mobil uygulamalar (meditasyon takibi), Sanal gerçeklik (VR fobi tedavisi), Yapay zeka destekli chatbotlar, Giyilebilir teknoloji.",
            "Hastane Yatış Tedavisi: Akut psikiyatri servisleri (kriz müdahalesi), Kapalı servisler, Gündüz hastanesi, Rehabilitasyon merkezleri.",
            "Tamamlayıcı Tedaviler: Egzersiz programları (yoga, aerobik), Beslenme danışmanlığı (Omega-3), Uyku hijyeni, Mindfulness ve Sanat/Müzik terapisi.",
          ],
        },
        {
          subtitle: "Tedavi Süresi",
          items: [
            "Akut kriz: 1-2 hafta hastane yatışı",
            "İlaç tedavisi: Aylar/yıllar",
            "Psikoterapi: 3-6 ay veya daha uzun",
            "Kronik hastalıklar: Yaşam boyu takip",
          ],
        },
        {
          subtitle: "Hasta Yaklaşımı",
          items: [
            "Biyopsikososyal model: Bütüncül bakış",
            "Hasta hakları: Yasal koruma",
            "Bilgilendirilmiş onam: Tedavi kararlarına katılım",
            "Gizlilik: HIPAA ve veri koruma",
            "Kişiselleştirilmiş tedavi: Genetik ve bireysel faktörler",
          ],
        },
      ],
    },
    conclusion: {
      title: "Sonuç Karşılaştırması",
      prosCons: {
        selcukluPros: [
          "Yan etki yok",
          "Doğal ve holistik",
          "Sosyal ve manevi destek",
          "Saygılı ve şefkatli",
        ],
        modernPros: [
          "Bilimsel kanıt temelli",
          "Ağır hastalıklarda etkili",
          "Standardize ve ölçülebilir",
          "Geniş erişim",
        ],
        ideal: "İdeal tedavi: İkisinin kombinasyonu - modern tıbbın bilimsel gücü + Gevher Nesibe'nin insancıl yaklaşımı = Entegratif psikiyatri",
      },
      final: "820 yıllık bu yolculuk bize gösteriyor ki, ruhsal sağlık tedavisinde teknoloji ve şefkat birlikte yürümelidir.",
    },
  },
];

function ComparisonSection({ data }: { data: ComparisonData }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-sand bg-paper shadow-card dark:border-ink/20 dark:bg-ink/40 mb-12">
      {/* Top Header */}
      <div className="border-b border-sand bg-paper/50 p-6 dark:border-ink/20 dark:bg-ink/60 sm:px-8 sm:py-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-bold text-ink dark:text-paper sm:text-3xl">
          {data.title}
        </h3>
        <span className="rounded-full border border-accent/40 bg-accent-soft/40 px-4 py-1.5 text-xs font-semibold text-ink dark:border-accent/20 dark:bg-accent/20 dark:text-accent-soft">
          {data.badge}
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-12">
        {/* Video Player */}
        <div className="relative overflow-hidden rounded-2xl border border-sand bg-ink/5 shadow-inner dark:border-ink/20 dark:bg-ink/40 aspect-video max-w-4xl mx-auto">
          <video
            src={data.videoSrc}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Comparison Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Selcuklu Column */}
          <div className="rounded-2xl border border-heritage/30 bg-heritage/5 p-6 dark:border-heritage/20 dark:bg-heritage/10 space-y-6">
            <div className="border-b border-heritage/20 pb-4">
              <h4 className="font-display text-xl font-bold text-heritage dark:text-heritage-soft">
                {data.selcuklu.title}
              </h4>
            </div>
            {data.selcuklu.subsections.map((sub, i) => (
              <div key={i} className="space-y-3">
                <h5 className="text-sm font-bold uppercase tracking-wider text-heritage/80 dark:text-heritage-soft/80">
                  {sub.subtitle}
                </h5>
                <ul className="space-y-2 text-sm text-ink-muted dark:text-paper/80">
                  {sub.items.map((item, j) => (
                    <li key={j} className="flex gap-2.5 leading-relaxed">
                      <span className="text-heritage shrink-0 font-bold">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Modern Column */}
          <div className="rounded-2xl border border-clinical/30 bg-clinical/5 p-6 dark:border-clinical/20 dark:bg-clinical/10 space-y-6">
            <div className="border-b border-clinical/20 pb-4">
              <h4 className="font-display text-xl font-bold text-clinical dark:text-clinical-soft">
                {data.modern.title}
              </h4>
            </div>
            {data.modern.subsections.map((sub, i) => (
              <div key={i} className="space-y-3">
                <h5 className="text-sm font-bold uppercase tracking-wider text-clinical/80 dark:text-clinical-soft/80">
                  {sub.subtitle}
                </h5>
                <ul className="space-y-2 text-sm text-ink-muted dark:text-paper/80">
                  {sub.items.map((item, j) => (
                    <li key={j} className="flex gap-2.5 leading-relaxed">
                      <span className="text-clinical shrink-0 font-bold">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion / Summary Box */}
        <div className="rounded-2xl border border-sand bg-paper/80 p-6 dark:border-ink/30 dark:bg-ink/60 shadow-sm space-y-4">
          <h4 className="font-display text-lg font-bold text-ink dark:text-paper">
            {data.conclusion.title}
          </h4>

          {data.conclusion.content && (
            <ul className="grid gap-2 sm:grid-cols-2 text-sm text-ink-muted dark:text-paper/80">
              {data.conclusion.content.map((item, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {data.conclusion.prosCons && (
            <div className="grid gap-6 sm:grid-cols-2 pt-2 border-t border-sand dark:border-ink/20">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-heritage mb-2">Gevher Nesibe&apos;nin Artıları:</p>
                <ul className="space-y-1.5 text-sm text-ink-muted dark:text-paper/80">
                  {data.conclusion.prosCons.selcukluPros.map((pro, i) => (
                    <li key={i} className="flex gap-2 items-center">
                      <span className="text-heritage font-bold">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-clinical mb-2">Modern Psikiyatrinin Artıları:</p>
                <ul className="space-y-1.5 text-sm text-ink-muted dark:text-paper/80">
                  {data.conclusion.prosCons.modernPros.map((pro, i) => (
                    <li key={i} className="flex gap-2 items-center">
                      <span className="text-clinical font-bold">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-sand dark:border-ink/20 font-semibold text-sm text-accent dark:text-accent-soft">
                {data.conclusion.prosCons.ideal}
              </div>
            </div>
          )}

          <p className="text-base font-medium italic text-ink dark:text-paper/90 pt-2 border-t border-sand dark:border-ink/20 leading-relaxed">
            {data.conclusion.final}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyExplorer({
  locale,
  items,
  labels,
  exampleLabel,
}: {
  locale: Locale;
  items: LocalizedCase[];
  labels: {
    all: string;
    imaging: string;
    lab: string;
    care: string;
  };
  exampleLabel: string;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const chips: { key: FilterKey; label: string }[] = [
    { key: "all", label: labels.all },
    { key: "imaging", label: labels.imaging },
    { key: "lab", label: labels.lab },
    { key: "care", label: labels.care },
  ];

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((c) => c.tags.includes(filter));
  }, [filter, items]);

  const activeComparison = useMemo(() => {
    if (filter === "all") return comparisonSectionsData;
    return comparisonSectionsData.filter((c) => c.id === filter);
  }, [filter]);

  return (
    <div className="space-y-12">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={locale === "tr" ? "Hikâye filtreleri" : "Story filters"}
      >
        {chips.map((chip) => {
          const selected = filter === chip.key;
          return (
            <button
              key={chip.key}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(chip.key)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                selected
                  ? "border-ink bg-ink text-paper dark:border-paper dark:bg-paper dark:text-ink shadow-sm"
                  : "border-sand bg-paper text-ink-muted dark:border-ink/20 dark:bg-ink/50 dark:text-paper/70 hover:border-heritage/40 hover:text-ink dark:hover:text-paper"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Comparison Sections */}
      <div className="space-y-12">
        {activeComparison.map((data) => (
          <ComparisonSection key={data.id} data={data} />
        ))}
      </div>

      {/* Case Study Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((item) => (
          <CaseStudyCard key={item.id} item={item} locale={locale} exampleLabel={exampleLabel} />
        ))}
      </div>
    </div>
  );
}
