export default function Hero({ data }) {
  const title = data?.title || "Rozie Nails";
  const subtitle = data?.subtitle || "Professional nail care from a cozy home studio.";
  const tagline = data?.tagline || "by Rozie Gurung";
  const badges = data?.badges || ["Home-Based Studio", "Affordable Prices", "Hygienic & Safe"];

  // Split title into two colored parts (first word pink, rest gold)
  const words = title.split(" ");
  const first = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-light via-cream to-gold-light pt-16">
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
          Welcome to
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          <span className="text-pink-dark">{first}</span>{" "}
          <span className="text-gold">{rest}</span>
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-4">
          {subtitle}
        </p>
        <p className="text-base text-foreground/50 mb-8">
          {tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#booking"
            className="bg-pink text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-dark transition-colors shadow-lg shadow-pink/30"
          >
            Book an Appointment
          </a>
          <a
            href="#services"
            className="border-2 border-gold text-gold px-8 py-3 rounded-full text-lg font-medium hover:bg-gold hover:text-white transition-colors"
          >
            View Services
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-foreground/70 shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
