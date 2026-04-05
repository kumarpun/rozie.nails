"use client";

import { useState, useEffect } from "react";
import HeroEditor from "./editors/HeroEditor";
import AboutEditor from "./editors/AboutEditor";
import ServicesEditor from "./editors/ServicesEditor";
import GalleryEditor from "./editors/GalleryEditor";
import TestimonialsEditor from "./editors/TestimonialsEditor";
import BookingEditor from "./editors/BookingEditor";
import BookingsInbox from "./editors/BookingsInbox";

const tabs = [
  { id: "inbox", label: "Inbox" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Reviews" },
  { id: "booking", label: "Booking Info" },
];

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("inbox");
  const [unreadCount, setUnreadCount] = useState(0);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    const [contentRes, bookingsRes] = await Promise.all([
      fetch("/api/content"),
      fetch("/api/bookings"),
    ]);
    const data = await contentRes.json();
    const mapped = {};
    data.forEach((d) => {
      mapped[d.section] = d;
    });
    setContent(mapped);

    if (bookingsRes.ok) {
      const bData = await bookingsRes.json();
      setUnreadCount(bData.unreadCount || 0);
    }
    setLoading(false);
  }

  async function saveSection(section, data) {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, ...data }),
    });

    if (res.ok) {
      const updated = await res.json();
      setContent((prev) => ({ ...prev, [section]: updated }));
      setMessage("Saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving. Please try again.");
    }
    setSaving(false);
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    onLogout();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-foreground/50">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            <span className="text-pink-dark">Rozie</span>{" "}
            <span className="text-gold">Nails</span>{" "}
            <span className="text-foreground/40 font-normal text-sm">Admin</span>
          </h1>
          <div className="flex items-center gap-4">
            {message && (
              <span className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>
                {message}
              </span>
            )}
            <a
              href="/"
              target="_blank"
              className="text-sm text-foreground/50 hover:text-pink-dark transition-colors"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-foreground/50 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "bg-pink text-white"
                  : "bg-white text-foreground/60 hover:bg-pink-light/50"
              }`}
            >
              {tab.label}
              {tab.id === "inbox" && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {activeTab === "inbox" && (
            <BookingsInbox />
          )}
          {activeTab === "hero" && (
            <HeroEditor data={content.hero} onSave={(d) => saveSection("hero", d)} saving={saving} />
          )}
          {activeTab === "about" && (
            <AboutEditor data={content.about} onSave={(d) => saveSection("about", d)} saving={saving} />
          )}
          {activeTab === "services" && (
            <ServicesEditor data={content.services} onSave={(d) => saveSection("services", d)} saving={saving} />
          )}
          {activeTab === "gallery" && (
            <GalleryEditor data={content.gallery} onSave={(d) => saveSection("gallery", d)} saving={saving} />
          )}
          {activeTab === "testimonials" && (
            <TestimonialsEditor data={content.testimonials} onSave={(d) => saveSection("testimonials", d)} saving={saving} />
          )}
          {activeTab === "booking" && (
            <BookingEditor data={content.booking} onSave={(d) => saveSection("booking", d)} saving={saving} />
          )}
        </div>
      </div>
    </div>
  );
}
