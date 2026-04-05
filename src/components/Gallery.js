"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

const placeholderColors = [
  "from-pink-light to-pink",
  "from-gold-light to-gold",
  "from-pink to-rose",
  "from-cream to-pink-light",
  "from-rose to-pink-dark",
  "from-gold to-gold-light",
];

const placeholderEmojis = ["💅", "✨", "🌸", "🤍", "❤️", "💫"];

export default function Gallery({ data, limit, showViewAll = false }) {
  const title = data?.title || "Gallery";
  const subtitle = data?.subtitle || "";
  const allItems = data?.items || [];
  const items = limit ? allItems.slice(0, limit) : allItems;
  const [lightbox, setLightbox] = useState(null);

  const imageItems = useMemo(
    () => items.reduce((acc, item, i) => (item.image ? [...acc, i] : acc), []),
    [items]
  );

  const currentNavIdx = useMemo(
    () => (lightbox !== null ? imageItems.indexOf(lightbox) : -1),
    [lightbox, imageItems]
  );

  const close = useCallback(() => setLightbox(null), []);
  const goNext = useCallback(() => {
    if (currentNavIdx < imageItems.length - 1) setLightbox(imageItems[currentNavIdx + 1]);
  }, [currentNavIdx, imageItems]);
  const goPrev = useCallback(() => {
    if (currentNavIdx > 0) setLightbox(imageItems[currentNavIdx - 1]);
  }, [currentNavIdx, imageItems]);

  useEffect(() => {
    if (lightbox === null) return;

    function handleKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, close, goNext, goPrev]);

  const hasPrev = currentNavIdx > 0;
  const hasNext = currentNavIdx < imageItems.length - 1;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-pink-dark font-medium tracking-widest uppercase text-sm mb-2">
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-foreground/60 mt-4 max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => item.image && setLightbox(i)}
              className={`aspect-square rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-md ${
                !item.image ? `bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]}` : ""
              }`}
            >
              {item.image ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={item.image}
                    alt={item.label || "Nail design"}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end justify-center pb-4">
                    <p className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {item.label}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-4xl block mb-2">
                    {placeholderEmojis[i % placeholderEmojis.length]}
                  </span>
                  <p className="text-white/90 font-medium text-sm bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    {item.label}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-10">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 bg-pink text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-dark transition-colors shadow-lg shadow-pink/30"
            >
              View All Gallery
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox]?.image && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 text-white/70 hover:text-white z-10"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className="max-w-4xl max-h-[85vh] px-12" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[lightbox].image}
              alt={items[lightbox].label || "Nail design"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {items[lightbox].label && (
              <p className="text-white/80 text-center mt-3 text-sm font-medium">
                {items[lightbox].label}
              </p>
            )}
          </div>

          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 text-white/70 hover:text-white z-10"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <p className="absolute bottom-4 text-white/50 text-sm">
            {currentNavIdx + 1} / {imageItems.length}
          </p>
        </div>
      )}
    </section>
  );
}
