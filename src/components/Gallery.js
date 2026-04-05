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
    </section>
  );
}
