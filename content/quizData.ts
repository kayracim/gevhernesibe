export interface WordQuestion {
  id: string;
  word: string;
  hint: string;
}

export interface MatchPair {
  term: string;
  definition: string;
}

export interface QuizData {
  kelimeBulmaca: WordQuestion[];
  eslestirmeBulmacasi: {
    title: string;
    description: string;
    pairs: MatchPair[];
  }[];
}

export const quizData: Record<"tr" | "en", QuizData> = {
  tr: {
    kelimeBulmaca: [
      {
        id: "sultan",
        word: "SULTAN",
        hint: "Gevher Nesibe'nin unvanı."
      },
      {
        id: "vasiyet",
        word: "VASİYET",
        hint: "Şifahanenin kurulmasını sağlayan son istek."
      },
      {
        id: "medrese",
        word: "MEDRESE",
        hint: "Tıp eğitimi verilen okul bölümü."
      },
      {
        id: "hastane",
        word: "HASTANE",
        hint: "Şifahanenin bugünkü karşılığı."
      },
      {
        id: "nabiz",
        word: "NABIZ",
        hint: "Biyometrik ölçüm yapılan damar atışı."
      },
      {
        id: "ney",
        word: "NEY",
        hint: "Ruhsal tedavide üflenen şifalı çalgı."
      },
      {
        id: "muzik",
        word: "MÜZİK",
        hint: "Makamlarla yapılan şifalı terapi."
      },
      {
        id: "ilac",
        word: "İLAÇ",
        hint: "Eczanede bitkilerle hazırlanan kür."
      },
      {
        id: "goz",
        word: "GÖZ",
        hint: "Gümüş iğneyle katarakt ameliyatı yapılan organ."
      },
      {
        id: "erciyes",
        word: "ERCİYES",
        hint: "Şifalı bitkilerin toplandığı dağ."
      },
      {
        id: "sirius",
        word: "SİRİUS",
        hint: "STEM projesini yapan okul takımının adı."
      }
    ],
    eslestirmeBulmacasi: [
      {
        title: "Külliye Yapıları",
        description: "Bölümleri kısa tanımlarıyla eşleştirin.",
        pairs: [
          { term: "Şifahane", definition: "Hastane bölümü" },
          { term: "Medrese", definition: "Tıp okulu" },
          { term: "Eczane", definition: "İlaç hazırlanan yer" },
          { term: "Türbe", definition: "Anıt mezar" },
          { term: "Külliye", definition: "Yapılar topluluğu" }
        ]
      },
      {
        title: "Şifa Yöntemleri",
        description: "Tedavi yöntemlerini eşleştirin.",
        pairs: [
          { term: "Müzik", definition: "Ruhsal tedavi aracı" },
          { term: "Su Sesi", definition: "Dinlendirici ses tedavisi" },
          { term: "Makam", definition: "Şifalı müzik tonu" },
          { term: "Bitkiler", definition: "Doğal ilaç kaynağı" },
          { term: "Cerrahi", definition: "Ameliyat yöntemi" }
        ]
      },
      {
        title: "Teşhis ve Nabız",
        description: "Nabız teşhisi kavramlarını eşleştirin.",
        pairs: [
          { term: "İlm-i Nabz", definition: "Damar atışı analizi" },
          { term: "Karınca", definition: "Çok zayıf nabız türü" },
          { term: "Testere", definition: "Çok sert nabız türü" },
          { term: "Aşk", definition: "Nabızla ölçülen duygu" },
          { term: "Mizaç", definition: "Vücut yapısı ve karakteri" }
        ]
      }
    ]
  },
  en: {
    kelimeBulmaca: [
      {
        id: "sultan",
        word: "SULTAN",
        hint: "The title of Gevher Nesibe."
      },
      {
        id: "vasiyet",
        word: "WILL",
        hint: "The final request to build the hospital."
      },
      {
        id: "medrese",
        word: "MADRASAH",
        hint: "The school where medicine was taught."
      },
      {
        id: "hastane",
        word: "HOSPITAL",
        hint: "The modern equivalent of Sifahane."
      },
      {
        id: "nabiz",
        word: "PULSE",
        hint: "The arterial beat used for diagnosis."
      },
      {
        id: "ney",
        word: "NEY",
        hint: "The wind instrument played for therapy."
      },
      {
        id: "muzik",
        word: "MUSIC",
        hint: "The melodic therapy done with maqams."
      },
      {
        id: "ilac",
        word: "CURE",
        hint: "The herbal mixture prepared in the apothecary."
      },
      {
        id: "goz",
        word: "EYE",
        hint: "The organ operated on using silver needles."
      },
      {
        id: "erciyes",
        word: "ERCIYES",
        hint: "The mountain where herbs were gathered."
      },
      {
        id: "sirius",
        word: "SIRIUS",
        hint: "The name of the STEM project team."
      }
    ],
    eslestirmeBulmacasi: [
      {
        title: "Complex Sections",
        description: "Match the sections of the complex with short descriptions.",
        pairs: [
          { term: "Sifahane", definition: "Hospital section" },
          { term: "Madrasah", definition: "Medical school" },
          { term: "Apothecary", definition: "Place where medicines are made" },
          { term: "Tomb", definition: "Monumental grave" },
          { term: "Complex", definition: "Group of buildings" }
        ]
      },
      {
        title: "Healing Methods",
        description: "Match the treatment methods.",
        pairs: [
          { term: "Music", definition: "Mental therapy tool" },
          { term: "Water", definition: "Relaxing sound therapy" },
          { term: "Maqam", definition: "Healing musical tone" },
          { term: "Herbs", definition: "Natural source of medicine" },
          { term: "Surgery", definition: "Operation method" }
        ]
      },
      {
        title: "Diagnosis & Pulse",
        description: "Match pulse diagnosis concepts.",
        pairs: [
          { term: "Pulse Science", definition: "Analysis of arterial beat" },
          { term: "Ant", definition: "Very weak pulse type" },
          { term: "Sawtooth", definition: "Very hard pulse type" },
          { term: "Love", definition: "Emotion diagnosed via pulse" },
          { term: "Temperament", definition: "Body constitution" }
        ]
      }
    ]
  }
};
