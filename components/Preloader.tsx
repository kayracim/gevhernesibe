"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if preloader has already been shown in this session
    const hasShown = sessionStorage.getItem("preloader_shown");
    if (hasShown) {
      setIsVisible(false);
      return;
    }

    // Lock scroll and force top position
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Set timeout to hide preloader
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("preloader_shown", "true");
      document.body.style.overflow = "unset";
    }, 2500); // 2.5 seconds duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper dark:bg-ink"
        >
          {/* Grain Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-grain-soft opacity-40"></div>
          
          {/* Background Decorative Element */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute h-[500px] w-[500px] rounded-full bg-heritage-soft blur-[100px] dark:bg-heritage/20"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo/Icon Animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-heritage shadow-lift">
                <span className="font-display text-4xl font-bold text-white">G</span>
                <motion.div 
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute inset-0 rounded-2xl border-2 border-white/20"
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-paper sm:text-4xl">
                Gevher Nesibe
              </h1>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-heritage italic">
                SIRIUS PROJECT
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mt-12 h-0.5 w-48 overflow-hidden rounded-full bg-sand dark:bg-paper/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut",
                  repeat: 0
                }}
                className="h-full w-full bg-heritage"
              />
            </div>
          </div>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-10 text-[10px] font-medium uppercase tracking-widest text-ink-muted dark:text-paper/40"
          >
            Köklerden Geleceğe Kültür Köprüsü
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
