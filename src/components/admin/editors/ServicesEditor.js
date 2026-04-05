"use client";

import { useState } from "react";

const iconOptions = ["sparkles", "paint", "heart", "fire", "palette", "gift"];

export default function ServicesEditor({ data, onSave, saving }) {
  const [form, setForm] = useState({
    title: data?.services?.title || "",
    subtitle: data?.services?.subtitle || "",
    note: data?.services?.note || "",
    items: data?.services?.items || [],
  });

  function updateItem(i, field, val) {
    const items = [...form.items];
    items[i] = { ...items[i], [field]: val };
    setForm({ ...form, items });
  }

  function addItem() {
    setForm({
      ...form,
      items: [
        ...form.items,
        { title: "", price: "", duration: "", description: "", icon: "sparkles" },
      ],
    });
  }

  function removeItem(i) {
    setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Services Section</h2>

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
        <label className="block text-sm font-medium text-foreground/70 mb-2">Services</label>
        {form.items.map((item, i) => (
          <div key={i} className="p-4 bg-cream/50 rounded-xl mb-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground/50">Service {i + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={item.title}
                onChange={(e) => updateItem(i, "title", e.target.value)}
                className="px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
                placeholder="Service name"
              />
              <div className="flex gap-2">
                <input
                  value={item.price}
                  onChange={(e) => updateItem(i, "price", e.target.value)}
                  className="w-24 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
                  placeholder="Price"
                />
                <input
                  value={item.duration}
                  onChange={(e) => updateItem(i, "duration", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
                  placeholder="Duration"
                />
              </div>
            </div>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50 resize-none"
              placeholder="Description"
            />
            <select
              value={item.icon}
              onChange={(e) => updateItem(i, "icon", e.target.value)}
              className="px-3 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
            >
              {iconOptions.map((ic) => (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-pink-dark hover:text-pink"
        >
          + Add Service
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Footer Note</label>
        <input
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-pink/50"
        />
      </div>

      <button
        onClick={() => onSave({ services: form })}
        disabled={saving}
        className="bg-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
