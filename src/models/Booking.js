import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "confirmed", "completed", "cancelled"],
      default: "new",
      index: true,
    },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

BookingSchema.index({ createdAt: -1 });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
