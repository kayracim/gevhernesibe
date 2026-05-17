const fs = require('fs');

const trData = JSON.parse(fs.readFileSync('messages/tr.json', 'utf8'));
const enData = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const trPulse = {
  "badge": "Selçuklu Tıbbında İleri Teknoloji",
  "title": "Biyometrik Veri ve 'Yalan Makinesi': İlm-i Nabz",
  "lead": "Gevher Nesibe Darüşşifası'nda uygulanan tıp, büyük ölçüde İbn-i Sina’nın tıbbi felsefesine dayanıyordu. Bu sistemde nabız, sadece kalbin atış hızını gösteren basit bir belirti değil; günümüzdeki EKG veya kan tahlili gibi hastanın tüm iç sistemini haritalandıran, yalan makinesi işlevi gören ve kişiselleştirilmiş tedavi sürecini başlatan bir biyometrik veriydi.",
  "tabs": {
    "dataAnalysis": "Çok Boyutlu Veri",
    "lieDetector": "Yalan Makinesi",
    "algorithm": "Tedavi Algoritması"
  },
  "sections": {
    "dataAnalysis": {
      "title": "1. Çok Boyutlu Veri Analizi (İlm-i Nabz)",
      "intro": "Bugün nabız sadece 'hız' üzerinden değerlendirilirken, o dönem hekimleri nabzı 10 farklı parametrede (Genişlik, Kuvvet, Hız, Sükûn Süresi, Dokusu, Doluluk, Isı, Eşitlik, Nizam, Müzikal Ritim) inceliyordu.",
      "points": [
        {
          "t": "Uzunluk, Genişlik ve Derinlik",
          "d": "Nabzın parmaklara vurduğu alan üç boyutlu olarak ölçülür. Atış yüzeysel mi yoksa derine (kemiğe doğru) mi basmak gerekiyor, buna bakılırdı.",
          "icon": "📐"
        },
        {
          "t": "Atışların Eşitliği ve Nizam",
          "d": "Tüm vuruşlar eşitse sistem sağlıklıydı. Biri güçlü, diğeri zayıf vuruyorsa 'Aritmi' (ritim bozukluğu) tespit edilirdi.",
          "icon": "⚖️"
        },
        {
          "t": "Müzikal Ritim (İkâ)",
          "d": "Nabzın 'hareket' ve 'sükûn' sürelerinin müzikal bir ahenge uyup uymadığı kontrol edilirdi. En üst düzey teşhis parametresiydi.",
          "icon": "🎵"
        },
        {
          "t": "Zü'l-fetr (Kopan Nabız)",
          "d": "Atış tam ortasında aniden kesilir, sonra tekrar devam eder. Kalp yetmezliği belirtisi olarak kabul edilirdi.",
          "icon": "💔"
        },
        {
          "t": "Müşerşer (Testere Dişi Nabzı)",
          "d": "Damar çok serttir ve tırtıklı bir yüzeye sürtünüyormuş hissi verir. Akciğer zarı iltihabı teşhisinde kullanılırdı.",
          "icon": "🪚"
        },
        {
          "t": "Nemlî (Karınca Nabzı)",
          "d": "Deri altında yürüyen bir karıncanın ayak sesleri gibi zayıftır. Yaşam enerjisinin tükendiğini gösteren en tehlikeli nabızdı.",
          "icon": "🐜"
        }
      ]
    },
    "lieDetector": {
      "title": "2. Ruhsal Durumun 'Yalan Makinesi'",
      "intro": "Selçuklu tıbbında ruh ve beden bir bütün kabul edilirdi. Hastanın zihnindeki bir düşüncenin veya duygusal travmanın kanın akış hızını anlık olarak değiştirdiği keşfedilmişti.",
      "points": [
        {
          "t": "Sözel Uyaran ve Nabız Tepkisi",
          "d": "Hekim, hastanın bileğini tutarak belirli kelimeler (şehir, şahıs isimleri) fısıldar; duygusal bir tetiklenmede nabızdaki 'Biyometrik Sıçrama'yı (aritmi) ölçerdi.",
          "icon": "🗣️"
        },
        {
          "t": "İbn-i Sina ve 'Aşk' Teşhisi",
          "d": "Yemeden kesilen bir gence mahalle ve isimler sayan İbn-i Sina, belirli bir isimde nabzın hızlanmasıyla hastalığın 'aşk' olduğuna karar vermiştir.",
          "icon": "❤️‍🔥"
        },
        {
          "t": "Öfke ve Hiddet",
          "d": "Vücuttaki hararet yükselir. Nabız son derece hızlı, vuruş alanı geniş ve damar duvarı gergin (sert) bir yapıya bürünür (Yükselen Sıcaklığın İsyanı).",
          "icon": "😡"
        },
        {
          "t": "Korku ve Dehşet",
          "d": "Isı ve kan merkeze çekilir. Nabız aniden zayıflar ve derine kaçar, ritim kaotikleşebilir (Merkeze Kaçış).",
          "icon": "😨"
        },
        {
          "t": "Üzüntü, Keder ve Utanç",
          "d": "Üzüntüde nabız 'ip gibi' yavaş ve güçsüzdür. Utanç anında ise nabız bir hızlanıp bir yavaşlayan dalgalı ve kararsız bir seyir izler.",
          "icon": "😔"
        }
      ]
    },
    "algorithm": {
      "title": "3. Kişiselleştirilmiş Tedavi Algoritması",
      "intro": "Nabız verileri hastanın fiziksel özellikleriyle birleştirilerek hastaya özel 'Mizaç Haritası' çıkarılır ve bu algoritmaya göre tedavi programlanırdı.",
      "points": [
        {
          "t": "Biyometrik Kimlik Oluşturma",
          "d": "Sıcaklık (hareket hızı), Kuruluk (damar sertliği) ve Nemlilik (damar yumuşaklığı) parametreleri üzerinden hastanın mizacı (Sıcak, Soğuk vb.) tespit edilirdi.",
          "icon": "🧬"
        },
        {
          "t": "Yüksek Frekanslı Müdahale (Müzik)",
          "d": "Nabız 'Karınca Yürüyüşü' gibi yavaş ve zayıfsa (Soğuk mizaç), hastayı canlandırmak için Uşşak veya Irak gibi neşeli makamlar çalınırdı.",
          "icon": "🎼"
        },
        {
          "t": "Düşük Frekanslı Müdahale (Müzik)",
          "d": "Nabız 'Testere Dişi' gibi çok sert ve hızlıysa (Sıcak mizaç), damarı gevşetmek ve ateşi düşürmek için Rast veya Rehavi makamları seçilirdi.",
          "icon": "🧘"
        },
        {
          "t": "Soğutucu Gıdalar (Muberrid)",
          "d": "Safravî (Sıcak-Kuru) hastalar için sirke, hıyar, koruk suyu gibi gıdalar reçete edilerek nabızdaki keskin 'testere' etkisi yumuşatılırdı.",
          "icon": "🥒"
        },
        {
          "t": "Isıtıcı Gıdalar (Muhammiz)",
          "d": "Balgamî (Soğuk-Nemli) hastalar için kanı ısıtacak ve harekete geçirecek bal, zencefil ve çörek otu mutfakta bir ilaç gibi kodlanırdı.",
          "icon": "🍯"
        },
        {
          "t": "Algoritmanın Döngüsü (Feedback Loop)",
          "d": "Hekim her sabah nabzı tekrar ölçerek tedaviyi güncellerdi. Nabız dengeye yaklaştıkça makamın süresi ve gıdaların dozu azaltılırdı.",
          "icon": "🔄"
        }
      ]
    }
  },
  "bibliography": [
    "İbn-i Sina, El-Kanun fi't-Tıbb (Tıbbın Kanunu), 1. Kitap - Nabız Bahsi.",
    "Prof. Dr. Ayten Altıntaş ve Prof. Dr. Nil Sarı'nın İslam Tıbbında Nabız makaleleri."
  ]
};

const enPulse = {
  "badge": "Advanced Technology in Seljuk Medicine",
  "title": "Biometric Data and the 'Lie Detector': The Science of Pulse",
  "lead": "The medicine practiced at Gevher Nesibe Darüşşifa was largely based on Avicenna's medical philosophy. In this system, the pulse was not merely a simple symptom showing heart rate; it was a biometric data set mapping the patient's entire internal system, acting as a lie detector, and initiating a personalized treatment process.",
  "tabs": {
    "dataAnalysis": "Multi-dimensional Data",
    "lieDetector": "Lie Detector",
    "algorithm": "Treatment Algorithm"
  },
  "sections": {
    "dataAnalysis": {
      "title": "1. Multi-dimensional Data Analysis (Ilm-i Nabz)",
      "intro": "While today we generally evaluate the pulse only by 'rate', physicians of that era examined the pulse across 10 different parameters (Width, Strength, Speed, Rest, Texture, Fullness, Heat, Equality, Regularity, Musical Rhythm).",
      "points": [
        {
          "t": "Length, Width, and Depth",
          "d": "The area the pulse hit the fingers was measured in 3D. They checked whether the beat was superficial or if it needed deep pressure towards the bone.",
          "icon": "📐"
        },
        {
          "t": "Equality and Regularity of Beats",
          "d": "If all beats were equal, the system was healthy. If one was strong and another weak, an 'Arrhythmia' was detected.",
          "icon": "⚖️"
        },
        {
          "t": "Musical Rhythm",
          "d": "The highest diagnostic parameter. The ratio between 'movement' and 'rest' times was checked against musical harmony.",
          "icon": "🎵"
        },
        {
          "t": "Broken Pulse (Zü'l-fetr)",
          "d": "The beat suddenly stops in the middle, then continues. Accepted as a sign of heart failure.",
          "icon": "💔"
        },
        {
          "t": "Sawtooth Pulse (Müşerşer)",
          "d": "The vessel is very hard and feels like rubbing against a jagged surface. Used in diagnosing pleurisy.",
          "icon": "🪚"
        },
        {
          "t": "Ant Pulse (Nemlî)",
          "d": "Beats are so weak they feel like ant footsteps. The most dangerous pulse indicating depleted life energy.",
          "icon": "🐜"
        }
      ]
    },
    "lieDetector": {
      "title": "2. Pulse as a 'Lie Detector' for the Soul",
      "intro": "In Seljuk medicine, soul and body were a whole. Physicians discovered that a thought or emotional trauma instantly changed blood flow.",
      "points": [
        {
          "t": "Verbal Stimulus and Pulse Reaction",
          "d": "The physician whispered specific words (cities, names) while holding the wrist, measuring the 'Biometric Jump' (arrhythmia) upon emotional trigger.",
          "icon": "🗣️"
        },
        {
          "t": "Avicenna's 'Love' Diagnosis",
          "d": "For a sick young man, Avicenna listed names. A pulse spike at a specific name led him to diagnose the illness as 'love'.",
          "icon": "❤️‍🔥"
        },
        {
          "t": "Anger and Fury",
          "d": "Body heat rises. Pulse becomes extremely fast, wide, and the vessel wall hard (Rebellion of Rising Heat).",
          "icon": "😡"
        },
        {
          "t": "Fear and Terror",
          "d": "Heat and blood pull inward. Pulse suddenly weakens and goes deep; rhythm may become chaotic (Escape to the Center).",
          "icon": "😨"
        },
        {
          "t": "Sorrow, Grief, and Shame",
          "d": "In sorrow, pulse is 'like a thread', slow and weak. In shame, it fluctuates inconsistently like a wave.",
          "icon": "😔"
        }
      ]
    },
    "algorithm": {
      "title": "3. Personalized Treatment Algorithm",
      "intro": "Pulse data combined with physical traits created a personalized 'Temperament Map', which programmed the entire treatment.",
      "points": [
        {
          "t": "Biometric ID Creation",
          "d": "Temperament (Hot, Cold, etc.) was detected via parameters like heat (speed), dryness (vessel hardness), and moisture (softness).",
          "icon": "🧬"
        },
        {
          "t": "High-Frequency Music Therapy",
          "d": "If the pulse was weak/slow (Cold), upbeat makams like Uşşak or Irak were played to stimulate the patient.",
          "icon": "🎼"
        },
        {
          "t": "Low-Frequency Music Therapy",
          "d": "If the pulse was hard/fast (Hot), calming makams like Rast or Rehavi were chosen to relax the vessel and lower fever.",
          "icon": "🧘"
        },
        {
          "t": "Cooling Foods (Muberrid)",
          "d": "For Choleric (Hot-Dry) patients, foods like vinegar, cucumber, and lettuce were prescribed to soften the sharp pulse.",
          "icon": "🥒"
        },
        {
          "t": "Warming Foods (Muhammiz)",
          "d": "For Phlegmatic (Cold-Moist) patients, honey, ginger, and black cumin were coded in the kitchen like medicine.",
          "icon": "🍯"
        },
        {
          "t": "The Feedback Loop",
          "d": "The physician updated the treatment by re-measuring the pulse every morning. Doses were reduced as the pulse approached balance.",
          "icon": "🔄"
        }
      ]
    }
  },
  "bibliography": [
    "Avicenna, The Canon of Medicine (El-Kanun fi't-Tıbb), Book 1 - The Section on Pulse.",
    "Articles on Pulse in Islamic Medicine by Prof. Dr. Ayten Altıntaş and Prof. Dr. Nil Sarı."
  ]
};

trData.pulseScience = trPulse;
enData.pulseScience = enPulse;

fs.writeFileSync('messages/tr.json', JSON.stringify(trData, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(enData, null, 2));
console.log('JSON files updated to enriched summary.');
