"use client";

import { useState, useEffect } from "react";

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function BookingsInbox() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  async function fetchBookings() {
    setLoading(true);
    const url = filter ? `/api/bookings?status=${filter}` : "/api/bookings";
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setBookings(data.bookings);
    }
    setLoading(false);
  }

  async function markAsRead(id) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, read: true } : b))
    );
  }

  async function updateStatus(id, status) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
      if (selected?._id === id) setSelected(updated);
    }
  }

  async function deleteBooking(id) {
    if (!confirm("Delete this booking?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    setBookings((prev) => prev.filter((b) => b._id !== id));
    if (selected?._id === id) setSelected(null);
  }

  function openBooking(booking) {
    setSelected(booking);
    setPendingStatus(booking.status);
    if (!booking.read) markAsRead(booking._id);
  }

  async function saveStatus() {
    if (!selected || !pendingStatus || pendingStatus === selected.status) return;
    setSaving(true);
    await updateStatus(selected._id, pendingStatus);
    setSaving(false);
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Booking Inbox</h2>
        <button
          onClick={fetchBookings}
          className="text-sm text-pink-dark hover:text-pink"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["", "new", "confirmed", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === s
                ? "bg-pink text-white"
                : "bg-cream text-foreground/60 hover:bg-pink-light/50"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-foreground/50 text-sm py-8 text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-foreground/50 text-sm py-8 text-center">No bookings yet</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Booking list */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {bookings.map((b) => (
              <div
                key={b._id}
                onClick={() => openBooking(b)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selected?._id === b._id
                    ? "border-pink bg-pink-light/20"
                    : "border-transparent hover:bg-cream/50"
                } ${!b.read ? "bg-blue-50/50" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {!b.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    )}
                    <span className="font-medium text-sm">{b.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <p className="text-xs text-foreground/50 mt-1">{b.service}</p>
                <p className="text-xs text-foreground/40 mt-0.5">
                  {formatDate(b.createdAt)}
                </p>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected ? (
            <div className="bg-cream/30 rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selected.name}</h3>
                  <p className="text-sm text-foreground/50">
                    Submitted {formatDate(selected.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-foreground/40 hover:text-foreground"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-foreground/50 w-16">Phone</span>
                  <a href={`tel:${selected.phone}`} className="text-sm text-pink-dark hover:underline">
                    {selected.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-foreground/50 w-16">Service</span>
                  <span className="text-sm">{selected.service}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-foreground/50 w-16">Date</span>
                  <span className="text-sm">{selected.date}</span>
                </div>
                {selected.message && (
                  <div>
                    <span className="text-xs font-medium text-foreground/50">Message</span>
                    <p className="text-sm mt-1 bg-white p-3 rounded-lg">{selected.message}</p>
                  </div>
                )}
              </div>

              {/* Status actions */}
              <div>
                <p className="text-xs font-medium text-foreground/50 mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {["new", "confirmed", "completed", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPendingStatus(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        pendingStatus === s
                          ? statusColors[s]
                          : "bg-white text-foreground/50 hover:bg-cream"
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={saveStatus}
                  disabled={saving || pendingStatus === selected.status}
                  className="bg-pink text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Status"}
                </button>
                <button
                  onClick={() => deleteBooking(selected._id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-cream/30 rounded-xl p-6 flex items-center justify-center text-foreground/40 text-sm">
              Select a booking to view details
            </div>
          )}
        </div>
      )}
    </div>
  );
}
