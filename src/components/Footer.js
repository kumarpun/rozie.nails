export default function Footer() {
  return (
    <footer className="bg-foreground text-white/70 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xl font-bold">
              <span className="text-pink">Rozie</span>{" "}
              <span className="text-gold-light">Nails</span>
            </p>
            <p className="text-sm mt-1 text-white/50">
              Beautiful nails, affordable prices
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#services" className="text-sm hover:text-pink transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm hover:text-pink transition-colors">
              About
            </a>
            <a href="#gallery" className="text-sm hover:text-pink transition-colors">
              Gallery
            </a>
            <a href="#booking" className="text-sm hover:text-pink transition-colors">
              Book
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Rozie Nails by Rozie Gurung. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
