export default function About({ data }) {
  const title = data?.title || "Hi, I'm Rozie!";
  const name = data?.name || "Rozie Gurung";
  const paragraphs = data?.paragraphs || [];
  const image = data?.image || "";
  const stats = data?.stats || [];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-pink-light to-gold-light flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-white/60 flex items-center justify-center mb-4">
                    <span className="text-5xl">💅</span>
                  </div>
                  <p className="text-foreground/50 text-sm">{name}</p>
                  <p className="text-foreground/40 text-xs mt-1">Nail Technician</p>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-pink/20 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-pink-dark font-medium tracking-widest uppercase text-sm mb-2">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className={`text-2xl font-bold ${i === 0 ? "text-pink-dark" : i === 1 ? "text-gold" : "text-rose"}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
