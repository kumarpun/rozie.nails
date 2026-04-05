"use client";

import { useState } from "react";
import ImageUpload from "../ImageUpload";

export default function AboutEditor({ data, onSave, saving }) {
  const [form, setForm] = useState({
    title: data?.about?.title || "",
    name: data?.about?.name || "",
    paragraphs: data?.about?.paragraphs || [""],
    image: data?.about?.image || "",
    stats: data?.about?.stats || [{ label: "", value: "" }],
  });

  function updateParagraph(i, val) {
    const paragraphs = [...form.paragraphs];
    paragraphs[i] = val;
    setForm({ ...form, paragraphs });
  }

  function updateStat(i, field, val) {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], [field]: val };
    setForm({ ...form, stats });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">About Section</h2>

      <ImageUpload
        label="Profile Photo"
        value={form.image}
        onChange={(url) => setForm({ ...form, image: url })}
      />

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Section Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Your Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">Paragraphs</label>
        {form.paragraphs.map((p, i) => (
          <div key={i} className="mb-2">
            <div className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                rows={3}
                className="flex-1 px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50 resize-none"
                placeholder={`Paragraph ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => setForm({ ...form, paragraphs: form.paragraphs.filter((_, idx) => idx !== i) })}
                className="text-red-400 hover:text-red-600 px-2 self-start mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setForm({ ...form, paragraphs: [...form.paragraphs, ""] })}
          className="text-sm text-pink-dark hover:text-pink"
        >
          + Add Paragraph
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">Stats</label>
        {form.stats.map((stat, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={stat.value}
              onChange={(e) => updateStat(i, "value", e.target.value)}
              className="w-24 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
              placeholder="Value"
            />
            <input
              value={stat.label}
              onChange={(e) => updateStat(i, "label", e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
              placeholder="Label"
            />
            <button
              type="button"
              onClick={() => setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) })}
              className="text-red-400 hover:text-red-600 px-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setForm({ ...form, stats: [...form.stats, { label: "", value: "" }] })}
          className="text-sm text-pink-dark hover:text-pink"
        >
          + Add Stat
        </button>
      </div>

      <button
        onClick={() => onSave({ about: form })}
        disabled={saving}
        className="bg-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
