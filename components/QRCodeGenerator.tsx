"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function QRCodeGenerator({ locale }: { locale: "tr" | "en" }) {
  const [url, setUrl] = useState("https://gevhernesibe.web.app");
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState("#1a1a1a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.href = svgUrl;
    a.download = "qr-code.svg";
    a.click();
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div className="rounded-3xl border border-sand bg-gradient-to-br from-paper via-heritage-soft/10 to-sand p-6 shadow-card dark:border-ink/20 dark:from-ink dark:via-heritage/5 dark:to-ink sm:p-8 space-y-6">
      <div>
        <h3 className="font-display text-xl font-bold text-ink dark:text-paper flex items-center gap-2">
          📱 {locale === "tr" ? "QR Kod Oluşturucu" : "QR Code Generator"}
        </h3>
        <p className="mt-1 text-sm text-ink-muted dark:text-paper/60">
          {locale === "tr"
            ? "Bir URL veya metin girerek anında QR kod oluşturun ve indirin."
            : "Enter a URL or text to instantly generate and download a QR code."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          {/* URL Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-heritage">
              {locale === "tr" ? "URL veya Metin" : "URL or Text"}
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm text-ink focus:border-heritage focus:outline-none focus:ring-2 focus:ring-heritage/20 dark:border-paper/10 dark:bg-ink/60 dark:text-paper"
            />
          </div>

          {/* Size */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-clinical">
                {locale === "tr" ? "Boyut" : "Size"}
              </label>
              <span className="text-xs font-mono text-ink-muted dark:text-paper/50">{size}×{size}px</span>
            </div>
            <input
              type="range"
              min={100}
              max={400}
              step={10}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-heritage h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-muted dark:text-paper/50">
                {locale === "tr" ? "Ön Renk" : "Foreground"}
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-sand bg-white px-3 py-2 dark:border-paper/10 dark:bg-ink/60">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent" />
                <span className="text-xs font-mono text-ink-muted dark:text-paper/60">{fgColor}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-muted dark:text-paper/50">
                {locale === "tr" ? "Arka Plan" : "Background"}
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-sand bg-white px-3 py-2 dark:border-paper/10 dark:bg-ink/60">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent" />
                <span className="text-xs font-mono text-ink-muted dark:text-paper/60">{bgColor}</span>
              </div>
            </div>
          </div>

          {/* Error Correction Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink-muted dark:text-paper/50">
              {locale === "tr" ? "Hata Düzeltme" : "Error Correction"}
            </label>
            <div className="flex gap-2">
              {(["L", "M", "Q", "H"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`flex-1 rounded-lg border py-1.5 text-xs font-bold transition-all ${
                    level === l
                      ? "bg-heritage border-heritage text-white"
                      : "border-sand text-ink-muted hover:border-heritage/40 dark:border-paper/10 dark:text-paper/60"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full rounded-xl bg-heritage px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-heritage/90 transition-all"
          >
            ⬇️ {locale === "tr" ? "SVG Olarak İndir" : "Download as SVG"}
          </button>
        </div>

        {/* QR Preview */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className="rounded-2xl border-2 border-sand/60 p-4 shadow-md dark:border-paper/5"
            style={{ backgroundColor: bgColor }}
          >
            {url.trim() ? (
              <QRCodeSVG
                id="qr-code-svg"
                value={url}
                size={Math.min(size, 240)}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                includeMargin={false}
              />
            ) : (
              <div
                style={{ width: Math.min(size, 240), height: Math.min(size, 240) }}
                className="flex items-center justify-center rounded-xl border-2 border-dashed border-sand text-sm text-ink-muted dark:border-paper/10 dark:text-paper/30"
              >
                {locale === "tr" ? "URL girin..." : "Enter a URL..."}
              </div>
            )}
          </div>
          <p className="text-center text-[10px] text-ink-muted dark:text-paper/40">
            {locale === "tr" ? "Önizleme · Gerçek boyut indirme ile elde edilir" : "Preview · Download for full size"}
          </p>
        </div>
      </div>
    </div>
  );
}
