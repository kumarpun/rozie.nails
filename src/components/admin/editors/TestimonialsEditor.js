"use client";

import { useState } from "react";

export default function TestimonialsEditor({ data, onSave, saving }) {
  const [form, setForm] = useState({
    title: data?.testimonials?.title || "",
    subtitle: data?.testimonials?.subtitle || "",
    items: data?.testimonials?.items || [],
  });

  function updateItem(i, field, val) {
    const items = [...form.items];
    items[i] = { ...items[i], [field]: val };
    setForm({ ...form, items });
  }

  function addItem() {
    setForm({
      ...form,
      items: [...form.items, { name: "", text: "", rating: 5 }],
    });
  }

  function removeItem(i) {
    setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Testimonials Section</h2>

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
        <input
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">Reviews</label>
        {form.items.map((item, i) => (
          <div key={i} className="p-4 bg-cream/50 rounded-xl mb-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground/50">Review {i + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="flex gap-3">
              <input
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
                placeholder="Client name"
              />
              <select
                value={item.rating}
                onChange={(e) => updateItem(i, "rating", parseInt(e.target.value))}
                className="w-20 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={item.text}
              onChange={(e) => updateItem(i, "text", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50 resize-none"
              placeholder="Review text"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-pink-dark hover:text-pink"
        >
          + Add Review
        </button>
      </div>

      <button
        onClick={() => onSave({ testimonials: form })}
        disabled={saving}
        className="bg-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
