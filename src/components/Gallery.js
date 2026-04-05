"use client";

import { useState, useEffect, useCallback } from "react";

const placeholderColors = [
  "from-pink-light to-pink",
  "from-gold-light to-gold",
  "from-pink to-rose",
  "from-cream to-pink-light",
  "from-rose to-pink-dark",
  "from-gold to-gold-light",
];

const placeholderEmojis = ["💅", "✨", "🌸", "🤍", "❤️", "💫"];

export default function Gallery({ data }) {
  const title = data?.title || "Gallery";
  const subtitle = data?.subtitle || "";
  const items = data?.items || [];
  const [lightbox, setLightbox] = useState(null);

  const close = useCallback(() => setLightbox(null), []);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    const imageItems = items.filter((it) => it.image);
    const currentIdx = imageItems.findIndex((it) => it === items[lightbox]);
    if (currentIdx < imageItems.length - 1) {
      setLightbox(items.indexOf(imageItems[currentIdx + 1]));
    }
  }, [lightbox, items]);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    const imageItems = items.filter((it) => it.image);
    const currentIdx = imageItems.findIndex((it) => it === items[lightbox]);
    if (currentIdx > 0) {
      setLightbox(items.indexOf(imageItems[currentIdx - 1]));
    }
  }, [lightbox, items]);

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

  function openLightbox(i) {
    if (items[i]?.image) setLightbox(i);
  }

  const imageItems = items.filter((it) => it.image);
  const currentImageIdx = lightbox !== null ? imageItems.findIndex((it) => it === items[lightbox]) : -1;
  const hasPrev = currentImageIdx > 0;
  const hasNext = currentImageIdx < imageItems.length - 1;

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
              onClick={() => openLightbox(i)}
              className={`aspect-square rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-md ${
                !item.image ? `bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]}` : ""
              }`}
            >
              {item.image ? (
                <div className="relative w-full h-full group">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
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
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox]?.image && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev arrow */}
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

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[lightbox].image}
              alt={items[lightbox].label}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {items[lightbox].label && (
              <p className="text-white/80 text-center mt-3 text-sm font-medium">
                {items[lightbox].label}
              </p>
            )}
          </div>

          {/* Next arrow */}
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

          {/* Counter */}
          <p className="absolute bottom-4 text-white/50 text-sm">
            {currentImageIdx + 1} / {imageItems.length}
          </p>
        </div>
      )}
    </section>
  );
}
