"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
        >
          {/* Backdrop Clickable Area */}
          <div 
            className="absolute inset-0" 
            onClick={() => setIsOpen(false)}
            title="Kapatmak için tıklayın"
          />

          {/* Modal Container - No background color, no fixed aspect ratio, fits image exactly */}
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex items-center justify-center max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-heritage hover:scale-110 sm:-right-12 sm:-top-12 sm:h-12 sm:w-12 sm:bg-transparent sm:backdrop-blur-none sm:hover:bg-white/10 sm:hover:scale-125"
              aria-label="Kapat"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
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

            {/* Image - Intrinsic sizing fitting within viewport limits */}
            <img
              src="/images/poster3.png"
              alt="Karşılama Afişi"
              className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl sm:rounded-3xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
