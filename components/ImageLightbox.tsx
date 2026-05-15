"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="group relative cursor-zoom-in overflow-hidden rounded-2xl border-4 border-accent/20 shadow-xl"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
            Büyütmek için tıklayın
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-full max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={src} 
                alt={alt} 
                className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
              />
              <button
                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
