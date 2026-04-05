const galleryItems = [
  { color: "from-pink-light to-pink", label: "French Tips", emoji: "💅" },
  { color: "from-gold-light to-gold", label: "Gold Glitter", emoji: "✨" },
  { color: "from-pink to-rose", label: "Floral Art", emoji: "🌸" },
  { color: "from-cream to-pink-light", label: "Nude Elegance", emoji: "🤍" },
  { color: "from-rose to-pink-dark", label: "Bold Red", emoji: "❤️" },
  { color: "from-gold to-gold-light", label: "Gel Shine", emoji: "💫" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-pink-dark font-medium tracking-widest uppercase text-sm mb-2">
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Gallery
          </h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">
            A peek at some of my favorite nail designs. Follow me on social media for more!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-md`}
            >
              <div className="text-center">
                <span className="text-4xl block mb-2">{item.emoji}</span>
                <p className="text-white/90 font-medium text-sm bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-foreground/50 mt-8">
          Replace these placeholders with your real nail photos to showcase your work!
        </p>
      </div>
    </section>
  );
}
