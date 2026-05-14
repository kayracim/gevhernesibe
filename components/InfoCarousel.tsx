"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  title: string;
  description: string;
  tag: string;
}

export function InfoCarousel({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

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
    <section className="relative h-[400px] w-full overflow-hidden rounded-[2rem] border border-sand bg-ink text-paper shadow-2xl dark:border-ink/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-grain-soft pointer-events-none" />
      
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
          className="absolute inset-0 flex flex-col justify-center px-12 sm:px-20 lg:px-32"
        >
          <span className="mb-4 inline-block w-fit rounded-full border border-heritage/40 bg-heritage/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent-soft">
            {slides[currentIndex].tag}
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl max-w-2xl">
            {slides[currentIndex].title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80 sm:text-xl">
            {slides[currentIndex].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-4 sm:px-8">
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-white backdrop-blur-md transition hover:bg-paper/30 active:scale-95"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-white backdrop-blur-md transition hover:bg-paper/30 active:scale-95"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentIndex ? "w-8 bg-accent" : "w-2 bg-paper/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
