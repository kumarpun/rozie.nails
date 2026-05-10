"use client";

import { useState, useRef } from "react";
import ImageUpload from "../ImageUpload";

export default function GalleryEditor({ data, onSave, saving }) {
  const [form, setForm] = useState({
    title: data?.gallery?.title || "",
    subtitle: data?.gallery?.subtitle || "",
    items: (data?.gallery?.items || []).map((item, i) => ({
      ...item,
      order: item.order ?? i,
      featured: item.featured ?? false,
    })),
  });

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  function updateItem(i, field, val) {
    const items = [...form.items];
    items[i] = { ...items[i], [field]: val };
    setForm({ ...form, items });
  }

  function addItem() {
    setForm({
      ...form,
      items: [...form.items, { image: "", label: "", order: form.items.length, featured: false }],
    });
  }

  function removeItem(i) {
    const items = form.items.filter((_, idx) => idx !== i).map((item, idx) => ({
      ...item,
      order: idx,
    }));
    setForm({ ...form, items });
  }

  function moveItem(from, to) {
    if (to < 0 || to >= form.items.length) return;
    const items = [...form.items];
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    const reordered = items.map((item, idx) => ({ ...item, order: idx }));
    setForm({ ...form, items: reordered });
  }

  function handleDragStart(i) {
    dragItem.current = i;
  }

  function handleDragEnter(i) {
    dragOverItem.current = i;
  }

  function handleDragEnd() {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      moveItem(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  }

  function handleSave() {
    const itemsWithOrder = form.items.map((item, idx) => ({
      ...item,
      order: idx,
    }));
    onSave({ gallery: { ...form, items: itemsWithOrder } });
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
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground/70">Gallery Items</label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-foreground/50">
              Featured: {form.items.filter(i => i.featured).length}/6
            </span>
            <p className="text-xs text-foreground/40">Drag to reorder or use arrows</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {form.items.map((item, i) => (
            <div
              key={i}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragEnter={() => handleDragEnter(i)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className="p-4 bg-cream/50 rounded-xl space-y-3 border-2 border-transparent hover:border-pink/20 cursor-grab active:cursor-grabbing transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-foreground/30 cursor-grab">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-foreground/50">#{i + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(i, i - 1)}
                    disabled={i === 0}
                    className="p-1 text-foreground/40 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(i, i + 1)}
                    disabled={i === form.items.length - 1}
                    className="p-1 text-foreground/40 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="text-red-400 hover:text-red-600 text-sm ml-2"
                  >
                    Remove
                  </button>
                </div>
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.featured}
                  onChange={(e) => updateItem(i, "featured", e.target.checked)}
                  className="w-4 h-4 rounded border-foreground/20 text-pink focus:ring-pink/50"
                />
                <span className="text-sm text-foreground/60">Show on Homepage</span>
              </label>
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
        onClick={handleSave}
        disabled={saving}
        className="bg-pink-dark text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-pink transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
