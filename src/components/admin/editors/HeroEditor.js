"use client";

import { useState } from "react";

export default function HeroEditor({ data, onSave, saving }) {
  const [form, setForm] = useState({
    title: data?.hero?.title || "",
    subtitle: data?.hero?.subtitle || "",
    tagline: data?.hero?.tagline || "",
    badges: data?.hero?.badges || ["", "", ""],
  });

  function updateBadge(i, val) {
    const badges = [...form.badges];
    badges[i] = val;
    setForm({ ...form, badges });
  }

  function addBadge() {
    setForm({ ...form, badges: [...form.badges, ""] });
  }

  function removeBadge(i) {
    setForm({ ...form, badges: form.badges.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hero Section</h2>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Title</label>
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
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Tagline</label>
        <input
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">Badges</label>
        {form.badges.map((badge, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={badge}
              onChange={(e) => updateBadge(i, e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
              placeholder={`Badge ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeBadge(i)}
              className="text-red-400 hover:text-red-600 px-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addBadge}
          className="text-sm text-pink-dark hover:text-pink"
        >
          + Add Badge
        </button>
      </div>

      <button
        onClick={() => onSave({ hero: form })}
        disabled={saving}
        className="bg-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
