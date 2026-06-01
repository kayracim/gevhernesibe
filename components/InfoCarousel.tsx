"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  title: string;
  description: string;
  tag: string;
  image?: string;
}

export function InfoCarousel({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, isLightboxOpen]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      <section className="relative h-[480px] md:h-[450px] w-full overflow-hidden rounded-[2rem] border border-sand bg-ink text-paper shadow-2xl dark:border-ink/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-grain-soft pointer-events-none z-20" />
        
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            {slides[currentIndex]?.image && (
              <div className="absolute inset-0 select-none z-0 bg-ink overflow-hidden group">
                {/* Blurred Background Image to fill the space without cropping artifacts */}
                <img
                  src={slides[currentIndex].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none transition-transform duration-700 group-hover:scale-115"
                />
                
                {/* Sharp Foreground Image (Contained to prevent cropping of statue head/details) */}
                <img
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  className="relative w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Magnifying Glass Overlay on Hover */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white transition-transform duration-300 scale-90 group-hover:scale-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 items-center justify-between px-4 sm:px-8 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-paper/10 bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 active:scale-95 shadow-lg"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-paper/10 bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 active:scale-95 shadow-lg"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === currentIndex ? "w-6 bg-accent" : "w-1.5 bg-paper/30 hover:bg-paper/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && slides[currentIndex]?.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-full max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={slides[currentIndex].image} 
                alt={slides[currentIndex].title} 
                className="max-h-[85vh] max-w-[90vw] md:max-w-4xl object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              <button
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-accent transition-all"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Kapat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
