const fs = require('fs');

const trData = JSON.parse(fs.readFileSync('messages/tr.json', 'utf8'));
const enData = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const trPulse = {
  "badge": "Selçuklu Tıbbında İleri Teknoloji",
  "title": "Biyometrik Veri ve 'Yalan Makinesi': İlm-i Nabz",
  "lead": "Gevher Nesibe Darüşşifası'nda uygulanan tıp, büyük ölçüde İbn-i Sina’nın tıbbi felsefesine dayanıyordu. Bu sistemde nabız, sadece kalbin atış hızını gösteren basit bir belirti değil; günümüzdeki EKG (Elektrokardiyografi) veya bir kan tahlili gibi hastanın tüm iç sistemini haritalandıran bir biyometrik veriydi. Selçuklu hekimlerinin nabızdaki ritim bozukluklarını (aritmi) nasıl bir veri tabanı gibi okuduklarını şu şekilde açıklayabiliriz:",
  "tabs": {
    "dataAnalysis": "Çok Boyutlu Veri",
    "lieDetector": "Yalan Makinesi",
    "algorithm": "Tedavi Algoritması"
  },
  "sections": {
    "dataAnalysis": {
      "title": "1. Çok Boyutlu Veri Analizi (İlm-i Nabz)",
      "intro": "Bugün biz nabzı genellikle sadece 'hız' (dakikadaki atım sayısı) üzerinden değerlendirirken, o dönemdeki hekimler nabzı 10 farklı parametrede inceliyordu. Bu parametreler şunlardı:",
      "points": [
        {
          "t": "1. Damarın Genişleme Miktarı (Miktar / Hacim)",
          "d": "Hekim, nabzın parmaklara vurduğu alanın boyutunu üç boyutlu olarak ölçerdi:",
          "subPoints": [
            "Uzunluk: Nabız atışı damar boyunca uzun mu yoksa kısa bir alanda mı hissediliyor?",
            "Genişlik: Damar enine doğru ne kadar genişliyor? (Geniş veya Dar)",
            "Derinlik: Atış yüzeyden mi hissediliyor, yoksa derine (kemiğe doğru) mi basmak gerekiyor? (Yüzeysel veya Derin)"
          ]
        },
        {
          "t": "2. Vuruşun Kuvveti (Kuvvet-i Vurûd)",
          "d": "Damarın genişlerken hekimin parmaklarına yaptığı basıncın şiddetidir.",
          "subPoints": [
            "Kavî (Güçlü) Nabız: Organların ve yaşam enerjisinin kuvvetli olduğunu gösterir.",
            "Zayıf Nabız: Hastalığın vücudu yorduğunu ve iç organların enerjisinin düştüğünü işaret eder."
          ]
        },
        {
          "t": "3. Hareketin Hızı (Zaman-ı Hareket)",
          "d": "İki atım arasındaki süre değil, damarın 'genişleme eylemini' ne kadar hızlı yaptığıdır.",
          "subPoints": [
            "Seri (Hızlı) Nabız: Vücudun bir iltihapla veya ateşle savaştığına, bedende 'sıcaklığın' arttığına işarettir.",
            "Batî (Yavaş) Nabız: Sindirim zorluğuna, vücutta soğukluğun (balgam mizacının) hakim olduğuna yorulur."
          ]
        },
        {
          "t": "4. Sükûn Süresi / Aralık (Zaman-ı Sükûn)",
          "d": "Birinci atımın bitişi ile ikinci atımın başlaması arasında geçen dinlenme (bekleme) süresidir. Günümüzdeki 'nabız sıklığı' kavramına en yakın olanıdır.",
          "subPoints": [
            "Mütevatir (Sık): Dinlenme süresi çok kısadır.",
            "Mütefavit (Seyrek): Atımlar arasındaki bekleme süresi uzundur."
          ]
        },
        {
          "t": "5. Damar Duvarının Dokusu (Kıvam-ı Damar)",
          "d": "Hekim parmağıyla damarın elastikiyetini ve fiziksel yapısını incelerdi.",
          "subPoints": [
            "Sulb (Sert) Damar: Vücutta kuruluk olduğuna, sinirsel gerginliğe veya yaşlılığa delalettir.",
            "Leyyin (Yumuşak) Damar: Vücuttaki nem oranının yüksek olduğunu (ödem veya balgam artışı) gösterir."
          ]
        },
        {
          "t": "6. Damarın Doluluğu (İmtila)",
          "d": "Damarın içinden geçen kan ve 'yaşam ruhu' (pnomat) miktarının hissiyatıdır.",
          "subPoints": [
            "Memlu (Dolu): Damarın içinin sıvı ile tam dolu olduğu hissedilir. Kan fazlalığına işaret eder, genellikle hacamat veya sülük önerilirdi.",
            "Hâlî (Boş): Damar sönük bir hortum gibi hissedilir. Aşırı kan kaybı veya anemi belirtisidir."
          ]
        },
        {
          "t": "7. Bölgesel Isı (Mizaç)",
          "d": "Hekimin nabzı tuttuğu bölgedeki deriden hissettiği sıcaklık veya soğukluktur. Hastanın genel mizacının (Sıcak/Soğuk) en hızlı tespit edildiği yerdir.",
          "subPoints": []
        },
        {
          "t": "8. Atışların Eşitliği (Müsavat ve İhtilaf)",
          "d": "Peş peşe gelen atımların birbirinin kopyası olup olmamasıdır.",
          "subPoints": [
            "Müsâvi (Eşit): Tüm vuruşlar aynı güçte, aynı hızda ve aynı hacimdeyse sistem sağlıklıdır.",
            "Muhtelif (Farklı/Eşitsiz): Biri güçlü, diğeri zayıf, bir sonraki hızlı vuruyorsa ortada bir 'Aritmi' (ritim bozukluğu) vardır."
          ]
        },
        {
          "t": "9. Düzensizliğin Düzeni (Nizam)",
          "d": "Eğer nabız eşitsiz (aritmi) ise hekim bu bozukluğun bir matematiği olup olmadığına bakardı.",
          "subPoints": [
            "Nizamlı İhtilaf (Düzenli Düzensizlik): Örneğin; nabız her üç atımda bir zayıflıyor ve bu periyodik olarak tekrar ediyorsa, bedenin bu hastalıkla savaşmak için bir savunma algoritması geliştirdiği kabul edilirdi.",
            "Nizamsız İhtilaf (Düzensiz Düzensizlik): Atımlar tamamen kaotikse (biri hızlı, beşi yavaş, ikisi güçlü, üçü zayıf), bu durum merkezi sinir sisteminin veya kalbin iflas etmek üzere olduğunun en büyük habercisiydi."
          ]
        },
        {
          "t": "10. Müzikal Ritim (Vezn / İkâ)",
          "d": "En üst düzey teşhis parametresidir. Nabzın 'hareket' (atım) ve 'sükûn' (dinlenme) süreleri arasındaki orantının, müzikal bir ahenge uyup uymadığı kontrol edilirdi. İbn-i Sina, bebeklerin, gençlerin ve yaşlıların nabzının kendi yaş dönemlerine ait ayrı bir müzikal notasının olduğunu savunurdu. Ritim bozulduğunda, Gevher Nesibe'deki hekimler hastaya o ritmi geri kazandıracak makamda müzik (meloterapi) dinletirlerdi.",
          "subPoints": []
        },
        {
          "t": "Mürekkep (Birleşik) Nabız Türleri",
          "d": "Hekimler bu 10 parametreyi harmanlayarak, bazı özel hastalıklara isimler verirlerdi. Projeni çok güçlendirecek üç meşhur nabız teşhisi şöyledir:",
          "subPoints": [
            "Zü'l-fetr (Kopan Nabız): Atış tam ortasında aniden kesilir, sonra tekrar devam eder. Kalp yetmezliği belirtisidir.",
            "Müşerşer (Testere Dişi Nabzı): Damar çok serttir, nabız hem hızlı hem sık atar ama vururken damar içinde tırtıklı bir yüzeye sürtünüyormuş hissi verir. Akciğer zarı iltihabı (plörezi) teşhisinde kullanılırdı.",
            "Nemlî (Karınca Nabzı): Atımlar o kadar küçük, sık ve zayıftır ki deri altında yürüyen bir karıncanın ayak sesleri gibi hissedilir. Bu, yaşam enerjisinin tükendiğini ve ölümün yaklaştığını gösteren en tehlikeli nabızdı."
          ]
        }
      ]
    },
    "lieDetector": {
      "title": "2. Ruhsal Durumun 'Yalan Makinesi' Olarak Nabız",
      "intro": "Selçuklu tıbbında ruh ve beden bir bütün kabul edilirdi. Hekimler, zihindeki bir düşüncenin veya kalpteki bir duygunun damarlardaki kanın akış hızını ve ritmini anlık olarak değiştirdiğini keşfetmişlerdi. Bu, günümüzdeki yalan makinelerinin temel çalışma prensibi olan 'stres anındaki fizyolojik değişimler' mantığıyla birebir aynıdır.",
      "points": [
        {
          "t": "1. Uygulama Metodu: Sözel Uyaran ve Nabız Tepkisi",
          "d": "Gevher Nesibe'deki bir hekim, hastanın ruhsal bir sırrını veya hastalığının duygusal kaynağını çözmek için şu adımları izlerdi:",
          "subPoints": [
            "Temas ve Güven: Hekim, hastanın bileğini tutarak nabız parametrelerini (hız, kuvvet, doluluk) stabilize ederdi. Bu esnada hasta ile sıradan bir sohbete başlanırdı.",
            "Sözel Uyaran (Kelime Çağrışımı): Hekim, hastanın hayatındaki kritik noktalarla ilgili kelimeler fısıldamaya başlardı. Bunlar şehir isimleri, mahalle isimleri, şahıs isimleri veya belirli olaylar olabilirdi.",
            "Biyometrik Sıçrama (Aritmi tespiti): Hasta, kendisi için duygusal bir anlam ifade eden bir kelimeyi duyduğunda, bilinci bunu saklamaya çalışsa bile nabzı 'yalan söyleyemezdi.' Duygusal bir heyecan veya korku anında nabızda anlık bir hızlanma, vuruşta bir sertleşme veya ritimde geçici bir duraksama (aritmi) meydana gelirdi."
          ]
        },
        {
          "t": "2. İbn-i Sina ve 'Aşk' Teşhisi (Klasik Vaka Analizi)",
          "d": "Bu yöntemin tıp tarihindeki en meşhur örneği, Gevher Nesibe'deki hekimlerin de rehberi olan İbn-i Sina’ya aittir. Yemezden içmezden kesilen ve hastalığına teşhis konulamayan bir genç için şu yöntemi uygulamıştır:",
          "subPoints": [
            "Yöntem: Gencin elini tutan İbn-i Sina, bölgedeki tüm mahalle isimlerini saydırır. Bir mahalle ismi geçtiğinde gencin nabzı hızlanır.",
            "Detaylandırma: Ardından o mahalledeki sokak isimlerini, sonra da o sokaktaki ev sahiplerinin isimlerini saydırır.",
            "Teşhis: Belirli bir isimde nabız 'karınca yürüyüşü' gibi hızlanıp vuruş şiddeti arttığında, İbn-i Sina teşhisini koyar: 'Bu gencin hastalığı fizyolojik değil, falancanın kızına olan aşkıdır.'"
          ]
        },
        {
          "t": "3. Duygu ve Nabız Parametresi Eşleşmeleri",
          "d": "Hekimler, nabzın karakterine göre hangi duygunun yaşandığını şu 'kodlarla' okurdu:",
          "subPoints": [
            "Öfke ve Hiddet: 'Yükselen Sıcaklığın İsyanı' - Vücuttaki 'hararet' aniden yükselir. Nabız son derece hızlı, vuruş alanı geniş ve damar duvarı gergin (sert) bir yapıdadır.",
            "Korku ve Dehşet: 'Merkeze Kaçış' - Vücut ısısı merkeze çekilir. Nabız aniden zayıflar ve derine kaçar, ritim kaotikleşebilir.",
            "Üzüntü ve Keder: 'Yavaşlayan Yaşam Enerjisi' - Ruhun enerjisinin sönmeye başladığı bu durumda nabız yavaş (batî), vuruş gücü düşük ve incedir.",
            "Utanç ve Mahcubiyet: 'Kararsız Dalgalanma' - Nabız tek bir çizgide ilerlemez; bir hızlanıp bir yavaşlayan dalgalı bir seyir izler.",
            "Neşe ve Sevinç: 'Dengeli Genişleme' - Nabız yumuşak bir dokuda, dolgun ve ritmik bir akıştadır. Atımlar arası mesafeler eşittir."
          ]
        }
      ]
    },
    "algorithm": {
      "title": "3. Kişiselleştirilmiş Tedavi Algoritması (Mizaç Tespiti)",
      "intro": "Hekimler, nabızdaki ritim bozukluklarını (aritmi) doğadaki hareketlere benzeterek hastanın biyometrik kimliğini tanımlarlardı. Bu tanımlar, doğrudan hastanın mizaç profilini (Sıcak, Soğuk, Kuru, Nemli) ortaya koyardı:",
      "points": [
        {
          "t": "1. Mizaç Kodlamaları",
          "d": "",
          "subPoints": [
            "Nemlî (Karınca Yürüyüşü) Nabız: Aşırı Soğuk ve Nemli (Balgamî) olarak kodlanır. Vücut ısısının düştüğünü gösterir.",
            "Müşerşer (Testere Dişi) Nabız: Aşırı Sıcak ve Kuru (Safravî) profiliyle eşleşir. Yüksek enfeksiyon raporlar.",
            "Gazalî (Ceylan) Nabız: Kuruluk etkisinin arttığını gösteren, bir güçlü bir zayıf vuruşlu kimlik verisidir."
          ]
        },
        {
          "t": "2. Mizaç Profili ve Biyometrik Kimlik Oluşturma",
          "d": "Hekim, nabız verilerini fiziksel özelliklerle birleştirerek 'Mizaç Haritası' çıkarırdı:",
          "subPoints": [
            "Sıcaklık: Hareketin hızı ve vuruşun şiddetiyle ölçülür.",
            "Kuruluk: Damar duvarının sertliği ve vuruşun keskinliğiyle ölçülür.",
            "Nemlilik: Damarın yumuşaklığı ve dolgunluğuyla ölçülür."
          ]
        },
        {
          "t": "3. Tedavinin Programlanması: Müzik ve Makam Frekansı",
          "d": "Oluşturulan biyometrik kimlik, hastanenin müzik heyetine 'reçete' olarak gönderilirdi (Zıtlıklar İlkesi):",
          "subPoints": [
            "Yüksek Frekanslı Müdahale: Nabız zayıf ve yavaşsa (Soğuk mizaç), hızlandırmak için Uşşak veya Irak gibi neşeli makamlar çalınırdı.",
            "Düşük Frekanslı Müdahale: Nabız sert ve hızlıysa (Sıcak mizaç), damarı gevşetmek için Rast veya Rehavi gibi sakinleştirici makamlar seçilirdi."
          ]
        },
        {
          "t": "4. Mutfak Kodlaması: Isıtıcı ve Soğutucu Gıdalar",
          "d": "Algoritmanın son aşaması Mutfak-ı Şerif'te gerçekleşir, yemekler mizaç kimliğine göre kodlanırdı:",
          "subPoints": [
            "Soğutucu (Muberrid) Kodlama: Safravî (Sıcak-Kuru) hastalar için sirke, hıyar, koruk suyu, marul.",
            "Isıtıcı (Muhammiz) Kodlama: Balgamî (Soğuk-Nemli) hastalar için bal, zencefil, çörek otu, kuzu eti."
          ]
        },
        {
          "t": "5. Algoritmanın Döngüsü (Feedback Loop)",
          "d": "Bu süreç statik değildir. Hekim her sabah hastanın nabzını tekrar ölçerek 'Biyometrik Kimlik Güncellemesi' yapardı. Eğer nabız 'İtidal' (Denge) noktasına yaklaşmışsa, tedavinin dozu azaltılırdı.",
          "subPoints": []
        }
      ]
    }
  },
  "bibliography": [
    "İbn-i Sina, El-Kanun fi't-Tıbb (Tıbbın Kanunu), 1. Kitap - Nabız Bahsi.",
    "Prof. Dr. Ayten Altıntaş ve Prof. Dr. Nil Sarı'nın İslam ve Osmanlı tıp tarihi üzerine makaleleri."
  ]
};

const enPulse = {
  "badge": "Advanced Technology in Seljuk Medicine",
  "title": "Biometric Data and the 'Lie Detector': The Science of Pulse",
  "lead": "The medicine practiced at Gevher Nesibe Darüşşifa was largely based on Avicenna's medical philosophy. In this system, the pulse was not merely a simple symptom showing heart rate; it was a biometric data set mapping the patient's entire internal system, akin to today's ECG or a blood test.\nWe can explain how Seljuk physicians read arrhythmias as a database:",
  "tabs": {
    "dataAnalysis": "Multi-dimensional Data",
    "lieDetector": "Lie Detector",
    "algorithm": "Treatment Algorithm"
  },
  "sections": {
    "dataAnalysis": {
      "title": "1. Multi-dimensional Data Analysis (Ilm-i Nabz)",
      "intro": "While today we generally evaluate the pulse only by 'rate', physicians of that era examined the pulse across 10 different parameters:",
      "points": [
        {
          "t": "1. Amount of Vessel Expansion (Volume)",
          "d": "The physician measured the 3D area the pulse hit the fingers:",
          "subPoints": [
            "Length: Is the beat felt along a long or short area of the vessel?",
            "Width: How wide does the vessel expand? (Wide or Narrow)",
            "Depth: Is it felt on the surface, or does one need to press deep (towards the bone)? (Superficial or Deep)"
          ]
        },
        {
          "t": "2. Strength of the Beat",
          "d": "The pressure intensity the expanding vessel exerts on the fingers.",
          "subPoints": [
            "Strong Pulse: Indicates strong organs and life energy.",
            "Weak Pulse: Indicates the illness has exhausted the body and organ energy has dropped."
          ]
        },
        {
          "t": "3. Speed of Movement",
          "d": "Not the time between two beats, but how fast the 'expansion action' happens.",
          "subPoints": [
            "Fast Pulse: Indicates the body fighting inflammation/fever; rising 'heat'.",
            "Slow Pulse: Indicates digestive difficulties or dominance of 'cold' (phlegmatic humor)."
          ]
        },
        {
          "t": "4. Rest Duration / Interval",
          "d": "The resting time between the end of the first beat and the start of the second.",
          "subPoints": [
            "Frequent: Rest time is very short.",
            "Infrequent: Wait time between beats is long."
          ]
        },
        {
          "t": "5. Texture of the Vessel Wall",
          "d": "The physician examined the elasticity and physical structure.",
          "subPoints": [
            "Hard Vessel: Indicates dryness in the body, nervous tension, or old age.",
            "Soft Vessel: Indicates high moisture (edema or increased phlegm)."
          ]
        },
        {
          "t": "6. Fullness of the Vessel",
          "d": "The feeling of the amount of blood and 'life spirit' passing through.",
          "subPoints": [
            "Full: Feels completely filled with fluid. Indicates excess blood; cupping or leeches were advised.",
            "Empty: Feels like a deflated hose. Sign of severe blood loss or anemia."
          ]
        },
        {
          "t": "7. Regional Temperature (Temperament)",
          "d": "The temperature felt from the skin where the pulse is taken. The fastest place to detect the overall temperament (Hot/Cold).",
          "subPoints": []
        },
        {
          "t": "8. Equality of Beats",
          "d": "Whether successive beats are identical.",
          "subPoints": [
            "Equal: If all beats have the same strength, speed, and volume, the system is healthy.",
            "Unequal/Different: If one is strong, next is weak, then fast, there is an 'Arrhythmia'."
          ]
        },
        {
          "t": "9. Order of Irregularity",
          "d": "If the pulse is unequal, they checked if there was a mathematical pattern.",
          "subPoints": [
            "Regular Irregularity: e.g., weakening every third beat periodically means the body developed a defense algorithm.",
            "Irregular Irregularity: Chaotic beats mean the central nervous system or heart is about to fail."
          ]
        },
        {
          "t": "10. Musical Rhythm",
          "d": "The highest diagnostic parameter. The ratio between 'movement' and 'rest' times was checked against musical harmony. Avicenna argued different ages had their own musical notes. If broken, melotherapy (music therapy) was applied.",
          "subPoints": []
        },
        {
          "t": "Composite Pulse Types",
          "d": "Physicians blended these 10 parameters to name specific illnesses. Three famous diagnoses:",
          "subPoints": [
            "Broken Pulse: The beat suddenly stops in the middle, then continues. Sign of heart failure.",
            "Sawtooth Pulse: Vessel is hard, fast, and feels like rubbing against a jagged surface. Used for pleurisy.",
            "Ant Pulse: Beats are so small and weak they feel like ant footsteps. The most dangerous pulse indicating impending death."
          ]
        }
      ]
    },
    "lieDetector": {
      "title": "2. Pulse as a 'Lie Detector' for the Soul",
      "intro": "In Seljuk medicine, soul and body were a whole. Physicians discovered that thoughts or emotions instantly changed blood flow. This is identical to the 'physiological changes under stress' logic of modern lie detectors.",
      "points": [
        {
          "t": "1. Application Method: Verbal Stimulus and Pulse Reaction",
          "d": "To solve an emotional trauma, a physician would:",
          "subPoints": [
            "Contact & Trust: Stabilize pulse parameters by holding the wrist during normal conversation.",
            "Verbal Stimulus: Whisper words related to critical life points (cities, names).",
            "Biometric Jump: If a word held emotional meaning, the pulse 'could not lie', showing an instant spike or arrhythmia."
          ]
        },
        {
          "t": "2. Avicenna's Diagnosis of 'Love'",
          "d": "The most famous historical example:",
          "subPoints": [
            "Method: Avicenna held a bedridden young man's hand and listed neighborhood names.",
            "Detailing: Then street names, then homeowner names.",
            "Diagnosis: At a specific name, the pulse spiked 'like an ant', leading Avicenna to diagnose the illness as love for that person's daughter."
          ]
        },
        {
          "t": "3. Emotion and Pulse Parameter Pairings",
          "d": "How emotions were read as 'codes':",
          "subPoints": [
            "Anger: 'Rebellion of Rising Heat' - Pulse becomes extremely fast, wide, and the vessel wall hard (like a tense bow).",
            "Fear: 'Escape to the Center' - Blood pulls inward. Pulse suddenly weakens and goes deep; rhythm may become chaotic.",
            "Sorrow: 'Slowing Life Energy' - Pulse is slow, weak, and thin like a thread (economic mode).",
            "Shame: 'Unstable Fluctuation' - Pulse fluctuates inconsistently in speed and strength.",
            "Joy: 'Balanced Expansion' - Pulse is soft, full, and rhythmic with equal intervals."
          ]
        }
      ]
    },
    "algorithm": {
      "title": "3. Personalized Treatment Algorithm (Temperament Detection)",
      "intro": "By comparing arrhythmias to movements in nature, they defined a biometric identity, directly revealing the temperament profile (Hot, Cold, Dry, Moist):",
      "points": [
        {
          "t": "1. Temperament Codings",
          "d": "",
          "subPoints": [
            "Ant Pulse: Coded as Extreme Cold & Moist (Phlegmatic). Indicates dropped body heat.",
            "Sawtooth Pulse: Matched with Extreme Hot & Dry (Choleric). Reports high infection.",
            "Gazelle Pulse: One strong, one weak beat showing increased 'Dryness'."
          ]
        },
        {
          "t": "2. Temperament Profile & Biometric ID",
          "d": "Physical traits combined with pulse created a 'Temperament Map':",
          "subPoints": [
            "Heat: Measured by speed and strength of beat.",
            "Dryness: Measured by vessel hardness and beat sharpness.",
            "Moisture: Measured by vessel softness and fullness."
          ]
        },
        {
          "t": "3. Treatment Programming: Music and Frequency",
          "d": "The ID became a prescription for the music committee (Principle of Opposites):",
          "subPoints": [
            "High-Frequency Intervention: For slow/weak pulse (Cold), upbeat makams like Uşşak were played to stimulate flow.",
            "Low-Frequency Intervention: For hard/fast pulse (Hot), calming makams like Rast were chosen to relax vessels."
          ]
        },
        {
          "t": "4. Culinary Coding: Warming and Cooling Foods",
          "d": "The final stage was in the kitchen, coding food as medicine:",
          "subPoints": [
            "Cooling (Muberrid): Vinegar, cucumber, lettuce for Choleric (Hot) patients.",
            "Warming (Muhammiz): Honey, ginger, lamb meat for Phlegmatic (Cold) patients."
          ]
        },
        {
          "t": "5. The Feedback Loop",
          "d": "Dynamic process. Pulse was re-measured every morning to update the Biometric ID. If approaching 'Balance', treatment doses were reduced.",
          "subPoints": []
        }
      ]
    }
  },
  "bibliography": [
    "Avicenna, The Canon of Medicine (El-Kanun fi't-Tıbb), Book 1 - The Section on Pulse.",
    "Articles on Islamic and Ottoman medical history by Prof. Dr. Ayten Altıntaş and Prof. Dr. Nil Sarı."
  ]
};

trData.pulseScience = trPulse;
enData.pulseScience = enPulse;

fs.writeFileSync('messages/tr.json', JSON.stringify(trData, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(enData, null, 2));
console.log('JSON files updated.');
