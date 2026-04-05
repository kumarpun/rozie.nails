"use client";

import { useState } from "react";

const serviceOptions = [
  "Classic Manicure - $25",
  "Gel Manicure - $35",
  "Classic Pedicure - $30",
  "Gel Pedicure - $40",
  "Nail Art - From $10",
  "Mani + Pedi Combo - $50",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-pink-dark font-medium tracking-widest uppercase text-sm mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Book an Appointment
          </h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">
            Ready for beautiful nails? Fill out the form below or contact me directly. I&apos;ll get back to you as soon as possible!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="bg-cream/50 rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <span className="text-5xl block mb-4">🎉</span>
                <h3 className="text-2xl font-bold text-pink-dark mb-2">
                  Thank You!
                </h3>
                <p className="text-foreground/60">
                  I&apos;ll get back to you shortly to confirm your appointment.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-gold hover:text-gold underline"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    Service
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink transition-colors resize-none"
                    placeholder="Any special requests or questions..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink text-white py-3 rounded-xl font-medium text-lg hover:bg-pink-dark transition-colors shadow-lg shadow-pink/20"
                >
                  Request Appointment
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Me Directly</h3>
              <div className="space-y-4">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 text-foreground/70 hover:text-pink-dark transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-pink-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-sm">(555) 123-4567</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-foreground/70 hover:text-pink-dark transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-pink-dark" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Instagram</p>
                    <p className="text-sm">@rozie.nails</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-foreground/70">
                  <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-pink-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-sm">Home Studio (address shared upon booking)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold-light/50 rounded-2xl p-6">
              <h4 className="font-semibold text-foreground mb-2">Hours</h4>
              <div className="space-y-1 text-sm text-foreground/70">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">By Appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
