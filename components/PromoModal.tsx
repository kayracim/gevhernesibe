"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "/images/poster3.png",
  "/images/GORSEL2.jpeg",
  "/images/GORSEL3.png",
];

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if promo modal has already been shown in this session
    const hasModalShown = sessionStorage.getItem("promo_modal_shown");
    if (hasModalShown) {
      setIsOpen(false);
      return;
    }

    // Check if preloader has already been shown in this session
    const hasPreloaderShown = sessionStorage.getItem("preloader_shown");
    // If preloader is running, wait 2.6s for it to finish. Otherwise, show modal quickly after 300ms.
    const delay = hasPreloaderShown ? 300 : 2600;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("promo_modal_shown", "true");
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  // Autoplay functionality: switches slide every 6 seconds, pauses when hovered
  useEffect(() => {
    if (!isOpen || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isOpen, isHovered, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
        >
          {/* Backdrop Clickable Area */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
            title="Kapatmak için tıklayın"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex items-center justify-center max-w-[90vw] max-h-[80vh] select-none"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all hover:bg-heritage hover:scale-110 active:scale-95 sm:-right-12 sm:-top-12 sm:h-12 sm:w-12 sm:bg-black/30 sm:hover:bg-white/10"
              aria-label="Kapat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Sharp foreground image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={IMAGES[currentIndex]}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                alt={`Afiş ${currentIndex + 1}`}
                className="w-auto h-auto max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </AnimatePresence>

            {/* Navigation Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 md:-left-14 top-1/2 -translate-y-1/2 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/75 hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Önceki Görsel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 md:-right-14 top-1/2 -translate-y-1/2 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/75 hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Sonraki Görsel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Slide Indicators (Dots) */}
            <div className="absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-1.5 bg-black/35 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
              {IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    index === currentIndex ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Görsel ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

