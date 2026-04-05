"use client";

import { useState } from "react";

export default function BookingEditor({ data, onSave, saving }) {
  const [form, setForm] = useState({
    title: data?.booking?.title || "",
    subtitle: data?.booking?.subtitle || "",
    phone: data?.booking?.phone || "",
    instagram: data?.booking?.instagram || "",
    instagramUrl: data?.booking?.instagramUrl || "",
    location: data?.booking?.location || "",
    hours: data?.booking?.hours || [{ day: "", time: "" }],
  });

  function updateHour(i, field, val) {
    const hours = [...form.hours];
    hours[i] = { ...hours[i], [field]: val };
    setForm({ ...form, hours });
  }

  function addHour() {
    setForm({ ...form, hours: [...form.hours, { day: "", time: "" }] });
  }

  function removeHour(i) {
    setForm({ ...form, hours: form.hours.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Booking Section</h2>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Section Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Subtitle</label>
        <textarea
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Instagram Handle</label>
          <input
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
            placeholder="@rozie.nails"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Instagram URL</label>
        <input
          value={form.instagramUrl}
          onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
          placeholder="https://instagram.com/rozie.nails"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Location Text</label>
        <input
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">Business Hours</label>
        {form.hours.map((h, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={h.day}
              onChange={(e) => updateHour(i, "day", e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
              placeholder="e.g. Monday - Friday"
            />
            <input
              value={h.time}
              onChange={(e) => updateHour(i, "time", e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
              placeholder="e.g. 9:00 AM - 7:00 PM"
            />
            <button
              type="button"
              onClick={() => removeHour(i)}
              className="text-red-400 hover:text-red-600 px-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addHour}
          className="text-sm text-pink-dark hover:text-pink"
        >
          + Add Hours Row
        </button>
      </div>

      <button
        onClick={() => onSave({ booking: form })}
        disabled={saving}
        className="bg-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
