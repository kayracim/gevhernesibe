"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GameDownloadWidget({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isIOS: false,
    isInApp: false,
    originUrl: "https://gevhernesibe-8b017.web.app"
  });

  // Helper to trigger direct APK download without navigation
  const triggerApkDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = "/app-debug.bin";
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gevher-nesibe-mobil-oyun.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const isIOS = /iPad|iPhone|iPod/i.test(ua) && !("MSStream" in window);
      const isInApp = /Instagram|FBAN|FBAV|WhatsApp|Telegram/i.test(ua);
      setDeviceInfo({
        isMobile,
        isIOS,
        isInApp,
        originUrl: window.location.origin
      });
    }
  }, []);


  const tr = {
    title: "Gevher Nesibe Mobil Oyunu",
    subtitle: "3D Eğitim ve Şifahane Keşif Oyunu",
    desktopScan: "Telefonunuzla taratarak indirin",
    clickToDownload: "Oyunu İndir (.APK)",
    clickToDownloadDesc: "İndirmek için tıklayın veya QR kodu taratın",
    iosWarning: "⚠️ Apple iOS (iPhone/iPad) cihazlar güvenlik nedeniyle dışarıdan indirilen .APK dosyalarını desteklemez. Oyunu oynamak için lütfen bir Android cihaz kullanın.",
    inAppWarning: "📱 Instagram, WhatsApp veya Facebook tarayıcısı içerisindesiniz. Bu uygulamalar dosya indirmeyi engelleyebilir. Lütfen sağ üstteki üç noktaya (⋮) basıp 'Tarayıcıda Aç' (Chrome / Safari) seçeneğini seçin.",
    guideTitle: "Kurulum Adımları (Android)",
    step1: "1. Dosyayı İndirin",
    step1Desc: "Yukarıdaki butona tıklayarak 'app-debug.apk' dosyasını indirin.",
    step2: "2. Dosyayı Açın",
    step2Desc: "İndirme bittiğinde bildirim panelinden veya Dosya Yöneticinizden (İndirilenler klasöründen) dosyaya dokunun.",
    step3: "3. Kurulumu Tamamlayın",
    step3Desc: "Telefonunuz 'Bilinmeyen Kaynaklar' uyarısı verirse ayarlardan tarayıcınıza yükleme izni verin ve yükle deyin.",
    close: "Kapat",
    tag: "Mobil Oyun",
    buttonText: "Mobil\nOyunumuz"
  };

  const en = {
    title: "Gevher Nesibe Mobile Game",
    subtitle: "3D Educational & Hospital Discovery Game",
    desktopScan: "Scan with your phone to download",
    clickToDownload: "Download Game (.APK)",
    clickToDownloadDesc: "Click to download or scan the QR code",
    iosWarning: "⚠️ Apple iOS (iPhone/iPad) devices do not support external .APK files due to security restrictions. Please use an Android device to play.",
    inAppWarning: "📱 You are inside an In-App browser (Instagram, WhatsApp, Facebook). These apps might block downloads. Please click the three dots (⋮) in the top-right and select 'Open in Browser' (Chrome / Safari).",
    guideTitle: "Installation Guide (Android)",
    step1: "1. Download File",
    step1Desc: "Click the button above to download the 'app-debug.apk' file.",
    step2: "2. Open File",
    step2Desc: "When finished, tap the file in your notification panel or your File Manager's Downloads folder.",
    step3: "3. Install & Complete",
    step3Desc: "If your phone gives an 'Unknown Sources' warning, grant installation permission for your browser and click install.",
    close: "Close",
    tag: "Mobile Game",
    buttonText: "Our\nMobile Game"
  };

  const t = locale === "tr" ? tr : en;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* QR Code and Download Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-72 sm:w-80 rounded-3xl border border-sand bg-paper/95 p-5 shadow-lift backdrop-blur-md dark:border-ink/20 dark:bg-ink/95 pointer-events-auto max-h-[80vh] overflow-y-auto scrollbar-hide text-ink dark:text-paper"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-sand/40 dark:border-ink/10">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-heritage dark:text-heritage-soft uppercase tracking-wider font-sans">
                  {t.tag}
                </span>
                <h4 className="font-display text-sm font-bold mt-0.5">
                  {t.title}
                </h4>
                <p className="text-[10px] text-ink-muted dark:text-paper/60">
                  {t.subtitle}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink-muted hover:text-ink dark:text-paper/60 dark:hover:text-paper transition-colors p-1.5 rounded-full hover:bg-sand/30 dark:hover:bg-paper/10 shrink-0 cursor-pointer"
                aria-label={t.close}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* In-App Browser Warning */}
            {deviceInfo.isInApp && (
              <div className="mb-4 rounded-xl bg-accent/10 border border-accent/20 p-3 text-[11px] leading-relaxed text-ink-muted dark:text-paper/90">
                {t.inAppWarning}
              </div>
            )}

            {/* iOS device warning */}
            {deviceInfo.isIOS ? (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs leading-relaxed text-red-700 dark:text-red-300 font-medium">
                {t.iosWarning}
              </div>
            ) : (
              <div className="space-y-4">
                {/* QR Code and direct button */}
                <div className="flex flex-col items-center gap-3">
                  {/* Original QR Code Image from public/images/qr_code.png */}
                  <a
                    href="/app-debug.bin"
                    download="gevher-nesibe-mobil-oyun.apk"
                    onClick={triggerApkDownload}
                    className="block overflow-hidden rounded-2xl border border-sand bg-white p-2 dark:border-ink/20 shadow-inner transition-all duration-300 hover:border-heritage hover:scale-102 cursor-pointer w-36 h-36 relative group"
                    title={t.clickToDownload}
                  >
                    <img
                      src="/images/qr_code.png"
                      alt="QR Code"
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-heritage/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </a>

                  <p className="text-[10px] text-ink-muted dark:text-paper/50 font-medium text-center max-w-[200px]">
                    {deviceInfo.isMobile ? t.clickToDownloadDesc : t.desktopScan}
                  </p>

                  <a
                    href="/app-debug.bin"
                    download="gevher-nesibe-mobil-oyun.apk"
                    onClick={triggerApkDownload}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-heritage px-4 py-2.5 text-xs font-semibold text-white shadow-lift hover:bg-heritage-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer pointer-events-auto"
                  >
                    <span>🎮</span>
                    <span>{t.clickToDownload}</span>
                  </a>
                </div>

                {/* Installation Guide */}
                <div className="mt-4 border-t border-sand/40 dark:border-ink/10 pt-4">
                  <h5 className="text-[11px] font-bold text-heritage dark:text-heritage-soft uppercase tracking-wider mb-2 font-sans">
                    {t.guideTitle}
                  </h5>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-heritage/10 text-heritage dark:bg-heritage/20 dark:text-heritage-soft text-[10px] font-bold">
                        1
                      </div>
                      <div className="leading-tight">
                        <p className="font-semibold text-ink dark:text-paper">{t.step1}</p>
                        <p className="text-[10px] text-ink-muted dark:text-paper/50 mt-0.5">{t.step1Desc}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-heritage/10 text-heritage dark:bg-heritage/20 dark:text-heritage-soft text-[10px] font-bold">
                        2
                      </div>
                      <div className="leading-tight">
                        <p className="font-semibold text-ink dark:text-paper">{t.step2}</p>
                        <p className="text-[10px] text-ink-muted dark:text-paper/50 mt-0.5">{t.step2Desc}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-heritage/10 text-heritage dark:bg-heritage/20 dark:text-heritage-soft text-[10px] font-bold">
                        3
                      </div>
                      <div className="leading-tight">
                        <p className="font-semibold text-ink dark:text-paper">{t.step3}</p>
                        <p className="text-[10px] text-ink-muted dark:text-paper/50 mt-0.5">{t.step3Desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button: SQUARE and HIGHLY VISIBLE */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-sand/40 bg-heritage text-white shadow-lift flex flex-col items-center justify-center cursor-pointer hover:bg-heritage-dark hover:border-accent/40 transition-all duration-300 z-50 pointer-events-auto group px-1 text-center"
        title={t.title}
      >
        <span className="text-lg sm:text-xl transition-transform duration-300 group-hover:rotate-12 animate-pulse">🎮</span>
        <span className="text-[8px] sm:text-[9px] font-bold mt-0.5 tracking-wide uppercase leading-tight whitespace-pre-line">
          {t.buttonText}
        </span>
      </motion.button>
    </div>
  );
}
