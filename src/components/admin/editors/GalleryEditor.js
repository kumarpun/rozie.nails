"use client";

import { useState } from "react";
import ImageUpload from "../ImageUpload";

export default function GalleryEditor({ data, onSave, saving }) {
  const [form, setForm] = useState({
    title: data?.gallery?.title || "",
    subtitle: data?.gallery?.subtitle || "",
    items: data?.gallery?.items || [],
  });

  function updateItem(i, field, val) {
    const items = [...form.items];
    items[i] = { ...items[i], [field]: val };
    setForm({ ...form, items });
  }

  function addItem() {
    setForm({
      ...form,
      items: [...form.items, { image: "", label: "" }],
    });
  }

  function removeItem(i) {
    setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gallery Section</h2>

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
        <label className="block text-sm font-medium text-foreground/70 mb-2">Gallery Items</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {form.items.map((item, i) => (
            <div key={i} className="p-4 bg-cream/50 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground/50">Item {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
              <ImageUpload
                label="Photo"
                value={item.image}
                onChange={(url) => updateItem(i, "image", url)}
              />
              <input
                value={item.label}
                onChange={(e) => updateItem(i, "label", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
                placeholder="Label (e.g. French Tips)"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-pink-dark hover:text-pink mt-3"
        >
          + Add Gallery Item
        </button>
      </div>

      <button
        onClick={() => onSave({ gallery: form })}
        disabled={saving}
        className="bg-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
