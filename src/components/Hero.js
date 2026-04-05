export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-light via-cream to-gold-light pt-16">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
          Welcome to
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          <span className="text-pink-dark">Rozie</span>{" "}
          <span className="text-gold">Nails</span>
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-4">
          Professional nail care from a cozy home studio. Beautiful nails,
          affordable prices, and a relaxing experience you&apos;ll love.
        </p>
        <p className="text-base text-foreground/50 mb-8">
          by <span className="font-semibold text-foreground/70">Rozie Gurung</span>
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

        {/* Quick info badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-foreground/70 shadow-sm">
            Home-Based Studio
          </span>
          <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-foreground/70 shadow-sm">
            Affordable Prices
          </span>
          <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-foreground/70 shadow-sm">
            Hygienic & Safe
          </span>
        </div>
      </div>
    </section>
  );
}
