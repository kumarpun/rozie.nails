function Stars({ count }) {
  return (
    <div className="flex gap-1 text-gold">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ data }) {
  const title = data?.title || "What People Say";
  const subtitle = data?.subtitle || "Happy Clients";
  const items = data?.items || [];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-pink-dark font-medium tracking-widest uppercase text-sm mb-2">
            {subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Stars count={t.rating || 5} />
              <p className="text-foreground/70 mt-4 leading-relaxed text-sm">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center text-pink-dark font-bold text-sm">
                  {t.name?.[0] || "?"}
                </div>
                <p className="font-medium text-sm">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
