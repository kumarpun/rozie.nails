"use client";

import { useState } from "react";

export default function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.url) {
      onChange(data.url);
    }
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-foreground/70 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-3">
        {value && (
          <img
            src={value}
            alt="preview"
            className="w-16 h-16 rounded-lg object-cover border"
          />
        )}
        <label className="cursor-pointer bg-cream hover:bg-pink-light/50 text-foreground/70 text-sm px-4 py-2 rounded-lg border border-foreground/10 transition-colors">
          {uploading ? "Uploading..." : value ? "Change" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-red-400 text-sm hover:text-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
