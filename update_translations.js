const fs = require('fs');
const tr = JSON.parse(fs.readFileSync('messages/tr.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

// Add `extra` field to each point in TR
const trExtra = {
  dataAnalysis: [
    "Bu üç boyutlu ölçüm, günümüzdeki EKG cihazının elektrik sinyallerini okuma mantığıyla birebir aynıdır. Hekim, parmak uçlarını farklı baskı kademelerinde kullanarak her eksendeki veriyi ayrı ayrı kayıt ederdi.",
    "Nabzın düzenli düzensizliği (Nizamlı İhtilaf) bedenin hastalıkla savaştığının; tamamen kaotik olması ise (Nizamsız İhtilaf) kritik tehlikenin işaretiydi. Modern tıpta buna 'aritmi sınıflandırması' denir.",
    "İbn-i Sina'ya göre sağlıklı bir çocuğun nabzı Hicaz makamına, gençlerinki Rast'a, yaşlılarınki ise yavaş bir Rehavi'ye benzerdi. Ritim bozulduğunda o ritmi geri kazandıracak makam reçete edilirdi.",
    "Kalp kasının kasılma döngüsünün ortasındaki bu ani kesinti, günümüzde 'intermitent kalp bloğu' olarak tanımlanır. O dönem hekimleri bunu 'pnomat'ın (yaşam ruhunun) geçici olarak tükenmesi şeklinde yorumlardı.",
    "Damar duvarının sertliği (Sulb nabız), İbn-i Sina'nın Kanun'unda akciğer zarı iltihabının (plörezi) ayırt edici tanı ölçütü olarak ayrıntılı biçimde tanımlanmıştır. Hekim basınçlı bir atışla bu özelliği test ederdi.",
    "Bu nabız türü, Kanun'da 'ölüm habercisi' olarak özellikle vurgulanır. Yaşam enerjisinin merkeze çekilip dış organlara gitmediğini gösterir; modern tıptaki septik şok tablosuna benzer."
  ],
  lieDetector: [
    "Hekim bu yöntemi uygulamadan önce hastayı sakinleştirerek 'temel nabız' hattını (baseline) belirlerdi. Duygusal tetikleyici kelimelerde bu hatın üzerindeki sıçramalar kayıt edilirdi; tıpkı modern poligraf cihazının GSR (galvanik deri yanıtı) ölçümü gibi.",
    "Bu vaka, tıp tarihinin en erken belgelenmiş psikosomatik teşhis örneklerinden biridir. İbn-i Sina teşhisi koyduktan sonra ailesiyle görüşerek nikâhı mümkün kılmış ve genç hızla iyileşmiştir. Olayı 'El-Kanun fi't-Tıbb'da bizzat aktarır.",
    "Safra sıvısının (Safra humoru) vücutta ani artışı olarak yorumlanan öfke durumu, hekimler tarafından 'Sıcak ve Kuru' mizacın geçici alevlenmesi kabul edilirdi. Tedavide soğutucu makamlar ve gıdalar derhal uygulanırdı.",
    "Korku anında beyin ve kalp çevresindeki kan damarlarının büzülmesi sonucu oluşan bu nabız değişikliği, modern tıpta 'sempatik sinir sistemi aktivasyonu' olarak tanımlanır. Hekimler bu durumu, bedenin 'kalaya çekilmesi' metaforuyla ifade ederdi.",
    "Utanç ve üzüntü duyguları Selçuklu tıbbında 'Soğuk ve Nemli' balgam humorunu artıran duygular olarak sınıflandırılırdı. Tedavide bu humoru dengelemek için hareketli ve neşeli makamlar reçete edilir, ağır yiyeceklerden kaçınılırdı."
  ],
  algorithm: [
    "Mizaç haritasının çıkarılması bir kez yapılıp bırakılan statik bir işlem değildi. Hekim hastanın yanına her sabah uğrayarak nabzı yeniden ölçer ve algoritmayı güncel duruma göre yeniden kalibre ederdi.",
    "Makam seçiminde 'Zıtlıklar İlkesi' esas alınırdı: Soğuk mizaçlıya sıcak makam, sıcak mizaçlıya soğuk makam. Bu, günümüzde psikoakustik araştırmalarla da desteklenen bir prensiptir; bazı frekanslar gerçekten nabzı ve solunum hızını etkiler.",
    "Uşşak makamı, deney hayvanları üzerinde yapılan modern araştırmalarda da kalp atış hızını artırdığı gözlemlenen bir makamdır. Rast makamı ise sedasyon etkisiyle bilinen bir frekans aralığına karşılık gelir.",
    "Mutfak-ı Şerif'in menüsü her gün değişmezdi; hastanın sabah nabzı ölçümüne göre o günkü yemek 'reçetesi' belirlenir ve özel olarak hazırlanırdı. Bu, günümüzün kişiselleştirilmiş beslenme (precision nutrition) anlayışıyla örtüşür.",
    "Isıtıcı gıdaların seçiminde de bilimsel bir arka plan mevcuttu: Zencefil modern tıpta da anti-enflamatuar ve dolaşım açıcı özellikleriyle bilinir. Bal ise doğal bir prebiyotiktir. Selçuklu hekimleri bu etkileri gözlemsel verilerle keşfetmişti.",
    "Feedback döngüsünün sonunda nabız 'İtidal' (denge) noktasına ulaştıysa hasta 'şifa bulmuş' kabul edilir ve yoğun tedavi kademeli azaltılırdı. Bu döngü haftalar, hatta aylar sürebilirdi."
  ]
};

const enExtra = {
  dataAnalysis: [
    "This 3D measurement is identical in logic to how a modern ECG reads electrical signals. The physician used fingertip pressure at different depths to record data on each axis separately.",
    "Regular irregularity (Nizamlı İhtilaf) meant the body was fighting illness; completely chaotic beats (Nizamsız İhtilaf) signaled critical danger. Modern medicine calls this 'arrhythmia classification'.",
    "According to Avicenna, a healthy child's pulse resembled Hicaz makam, a youth's resembled Rast, and an elder's resembled a slow Rehavi. When rhythm broke, the corrective makam was prescribed.",
    "This mid-cycle interruption in cardiac contraction is today defined as 'intermittent heart block'. Physicians of the era interpreted it as the temporary depletion of the 'pneuma' (life spirit).",
    "The hardness of the vessel wall (Sulb pulse) is described in Avicenna's Canon as the distinguishing diagnostic criterion for pleurisy. The physician tested this with a pressurized beat.",
    "This pulse type is specifically highlighted in the Canon as a 'harbinger of death'. It shows life energy withdrawing to the core, leaving peripheral organs unserved — similar to modern septic shock."
  ],
  lieDetector: [
    "Before applying this method, the physician calmed the patient to establish a 'baseline pulse'. Spikes above this baseline at emotional trigger words were recorded — exactly like a modern polygraph's GSR measurement.",
    "This case is one of the earliest documented psychosomatic diagnoses in medical history. After diagnosis, Avicenna facilitated the marriage and the young man quickly recovered. He recounts it himself in the Canon.",
    "The sudden increase of bile humor interpreted as anger was classified as a temporary flare of 'Hot and Dry' temperament. Cooling makams and foods were immediately applied as treatment.",
    "The constriction of vessels around the brain and heart during fear is defined in modern medicine as 'sympathetic nervous system activation'. Physicians metaphorically described it as the body 'retreating to the castle'.",
    "Shame and grief were classified as emotions increasing 'Cold and Moist' phlegm humor. Treatment involved lively makams to balance this humor and avoidance of heavy foods."
  ],
  algorithm: [
    "Creating the temperament map was not a one-time static process. The physician visited each morning to re-measure the pulse and recalibrate the algorithm according to the current state.",
    "The 'Principle of Opposites' guided makam selection: hot makam for cold temperament, cold makam for hot. Modern psychoacoustic research supports this; certain frequencies genuinely affect pulse and breathing rate.",
    "Uşşak makam has been observed in modern animal studies to increase heart rate. Rast makam corresponds to a frequency range known for sedative effects.",
    "The Mutfak-ı Şerif menu changed daily; each morning's pulse reading determined that day's food 'prescription', specially prepared for the patient. This parallels today's precision nutrition approach.",
    "The warming foods had scientific backing: ginger is known in modern medicine for anti-inflammatory and circulatory properties; honey is a natural prebiotic. Seljuk physicians discovered these effects through observational data.",
    "When the pulse reached 'Itidal' (balance) at the end of the feedback loop, the patient was considered healed and intensive treatment was gradually reduced. This cycle could last weeks or months."
  ]
};

// Patch the sections
['dataAnalysis', 'lieDetector', 'algorithm'].forEach(section => {
  tr.pulseScience.sections[section].points.forEach((p, i) => {
    p.extra = trExtra[section][i] || '';
  });
  en.pulseScience.sections[section].points.forEach((p, i) => {
    p.extra = enExtra[section][i] || '';
  });
});

fs.writeFileSync('messages/tr.json', JSON.stringify(tr, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
console.log('Extra fields added.');
