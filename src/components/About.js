export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-pink-light to-gold-light flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-white/60 flex items-center justify-center mb-4">
                  <span className="text-5xl">💅</span>
                </div>
                <p className="text-foreground/50 text-sm">Rozie Gurung</p>
                <p className="text-foreground/40 text-xs mt-1">Nail Technician</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-pink/20 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-pink-dark font-medium tracking-widest uppercase text-sm mb-2">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Hi, I&apos;m Rozie!
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                I&apos;m a passionate nail technician who believes everyone deserves
                beautiful nails without breaking the bank. I operate from my cozy
                home studio, which means lower overhead and better prices for you!
              </p>
              <p>
                I take pride in providing a clean, relaxing, and personal experience
                for each of my clients. When you visit, it&apos;s all about you
                &mdash; no rushing, no distractions, just quality nail care.
              </p>
              <p>
                Whether you want a simple, elegant manicure or a bold nail art
                design, I&apos;m here to make your nails look amazing.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl font-bold text-pink-dark">100%</p>
                <p className="text-xs text-foreground/50 mt-1">Hygienic Tools</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl font-bold text-gold">Home</p>
                <p className="text-xs text-foreground/50 mt-1">Cozy Studio</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl font-bold text-rose">Best</p>
                <p className="text-xs text-foreground/50 mt-1">Prices in Town</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
