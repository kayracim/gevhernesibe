"use client";

import { useState } from "react";
import Image from "next/image";

export function PosterGridPlaceholder({
  title,
  note,
  slotLabel,
  images,
}: {
  title: string;
  note: string;
  slotLabel: string;
  images?: { src: string; alt: string }[];
}) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const slots = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section aria-labelledby="posters-heading" className="space-y-4">
      <div>
        <h2 id="posters-heading" className="font-display text-2xl text-ink dark:text-paper sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/60">{note}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const image = images?.[slot];
          return (
            <div
              key={slot}
              onClick={() => image && setSelectedImage(image)}
              className={`group relative overflow-hidden rounded-2xl border border-sand bg-paper shadow-card transition dark:border-ink/20 dark:bg-ink/50 ${
                image ? "cursor-zoom-in hover:border-heritage/30" : ""
              }`}
            >
              <div className="aspect-[3/4] w-full relative">
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    unoptimized={true}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[length:14px_14px] bg-[linear-gradient(90deg,rgba(12,18,34,0.06)_1px,transparent_1px),linear-gradient(rgba(12,18,34,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)]">
                    <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                      <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink-muted dark:bg-paper/10 dark:text-paper/60">
                        #{slot + 1}
                      </span>
                      <p className="text-xs text-ink-muted dark:text-paper/40">{slotLabel}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-[90vh] w-[90vw]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              unoptimized={true}
              className="object-contain"
              priority
            />
          </div>
          <button 
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
    </section>
  );
}
