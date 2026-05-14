import type { Locale } from "@/lib/locale";

export type CaseTag = "imaging" | "lab" | "care";

export type LocalizedCase = {
  id: string;
  tags: CaseTag[];
  tr: {
    title: string;
    problem: string;
    process: string;
    solution: string;
    outcome: string;
  };
  en: {
    title: string;
    problem: string;
    process: string;
    solution: string;
    outcome: string;
  };
};

export const cases: LocalizedCase[] = [
  {
    id: "melotherapy-rast",
    tags: ["care"],
    tr: {
      title: "Müzik ve Su Sesiyle Ruhsal Arınma",
      problem:
        "Ağır melankoli ve uykusuzluk çeken bir hasta, toplumsal hayattan kopmuş ve derin bir huzursuzluk içindeydi.",
      process:
        "Hekimbaşı, hastayı su sesinin en net duyulduğu odaya yerleştirdi ve gün batımında Rast makamı icra edilmesini emretti.",
      solution:
        "Suyun ritmik sesiyle birleşen ney ve tanbur tınıları, hastanın zihnindeki karmaşayı dindirmek için kullanıldı.",
      outcome:
        "Hastanın uyku düzeni düzeldi, kaygı seviyesi azaldı ve birkaç hafta içinde sosyal hayata geri dönecek gücü buldu.",
    },
    en: {
      title: "Spiritual Purification with Music and Water",
      problem:
        "A patient suffering from severe melancholy and insomnia was detached from social life and in deep restlessness.",
      process:
        "The head physician placed the patient in a room where the sound of water was clearest and ordered the Rast mode to be performed at sunset.",
      solution:
        "The sounds of ney and tanbur, combined with the rhythmic sound of water, were used to calm the chaos in the patient's mind.",
      outcome:
        "The patient's sleep pattern improved, anxiety levels decreased, and within a few weeks, they found the strength to return to social life.",
    },
  },
  {
    id: "anatomy-medrese",
    tags: ["imaging", "care"],
    tr: {
      title: "Gıyasiye’de Anatomi ve Gözlem Dersi",
      problem:
        "Tıp öğrencilerinin, insan anatomisini sadece kitaplardan öğrenmesi klinik beceriler için yetersiz kalıyordu.",
      process:
        "Gıyasiye Medresesi'nin büyük eyvanında, İbn-i Sina'nın 'El-Kanun fi't-Tıbb' eseri eşliğinde uygulamalı gözlem seansları düzenlendi.",
      solution:
        "Hekimler, hastalar üzerindeki klinik bulguları öğrencilere göstererek teorik bilgiyi pratik tecrübeyle birleştirdi.",
      outcome:
        "Dönemin en yetkin hekimleri yetişti ve Selçuklu tıp ekolü tüm dünyaya yayıldı.",
    },
    en: {
      title: "Anatomy and Observation Lesson at Gıyasiye",
      problem:
        "Medical students learning human anatomy only from books was insufficient for clinical skills.",
      process:
        "Practical observation sessions were organized in the large iwan of the Gıyasiye Medrese, accompanied by Avicenna's 'The Canon of Medicine'.",
      solution:
        "Physicians showed students clinical findings on patients, combining theoretical knowledge with practical experience.",
      outcome:
        "The most competent physicians of the period were trained, and the Seljuk medical school spread throughout the world.",
    },
  },
  {
    id: "herbal-apothecary",
    tags: ["lab"],
    tr: {
      title: "Eczanede Hazırlanan Bitkisel Şifa",
      problem:
        "Kayseri'nin sert kış aylarında göğüs ağrısı ve nefes darlığı çeken hastaların sayısında artış yaşandı.",
      process:
        "Şifahane eczanesinde (Daru'l-Akar) Erciyes'ten toplanan ballıbaba, kekik ve meyan kökü karışımları özel bir havanla dövüldü.",
      solution:
        "Ölçülü dozlarda hazırlanan bitkisel şuruplar ve macunlar, hastaların solunum yollarını rahatlatmak için reçete edildi.",
      outcome:
        "Salgın riskinin önüne geçildi ve geleneksel farmakoloji kayıtları bir sonraki nesillere aktarıldı.",
    },
    en: {
      title: "Herbal Healing Prepared in the Apothecary",
      problem:
        "During the harsh winters of Kayseri, there was an increase in the number of patients with chest pain and shortness of breath.",
      process:
        "In the hospital apothecary (Daru'l-Akar), mixtures of dead-nettle, thyme, and licorice root collected from Erciyes were ground in a special mortar.",
      solution:
        "Herbal syrups and pastes prepared in measured doses were prescribed to relieve the patients' respiratory tracts.",
      outcome:
        "The risk of an epidemic was prevented, and traditional pharmacological records were passed on to the next generations.",
    },
  },
  {
    id: "cataract-surgery",
    tags: ["imaging"],
    tr: {
      title: "Hassas Cerrahi: Katarakt Ameliyatı",
      problem:
        "Gözlerine 'ak inen' (katarakt) yaşlı bir hasta, tamamen görme yetisini kaybetmek üzereydi.",
      process:
        "Cerrahlar, Selçuklu metal işçiliğiyle üretilen çok ince gümüş iğneler kullanarak operasyon kararı aldı.",
      solution:
        "Göz içindeki bulanık tabaka, 'itme yöntemi' ile kenara çekilerek hastanın ışığı görmesi sağlandı.",
      outcome:
        "Başarılı operasyon sonrası hastanın görme yetisi büyük oranda geri döndü; bu, dönemin cerrahi başarısının bir simgesi oldu.",
    },
    en: {
      title: "Precision Surgery: Cataract Operation",
      problem:
        "An elderly patient with 'white water' (cataract) in their eyes was about to lose their vision completely.",
      process:
        "Surgeons decided to operate using very thin silver needles produced with Seljuk metalwork.",
      solution:
        "The cloudy layer inside the eye was moved aside using the 'pushing method', allowing the patient to see light.",
      outcome:
        "After the successful operation, the patient's vision largely returned; this became a symbol of the surgical success of the era.",
    },
  },
];


export function getCaseCopy(caseItem: LocalizedCase, locale: Locale) {
  return caseItem[locale];
}
