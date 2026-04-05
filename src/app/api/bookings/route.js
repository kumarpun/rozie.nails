import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

// Public: create a booking
export async function POST(request) {
  await dbConnect();

  const body = await request.json();
  const { name, phone, service, date, message } = body;

  if (!name || !phone || !service || !date) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const booking = await Booking.create({ name, phone, service, date, message });
  return NextResponse.json({ success: true, id: booking._id });
}

// Admin: get all bookings
export async function GET(request) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const filter = status ? { status } : {};
  const bookings = await Booking.find(filter).sort({ createdAt: -1 }).lean();

  const unreadCount = await Booking.countDocuments({ read: false });

  return NextResponse.json({
    bookings: JSON.parse(JSON.stringify(bookings)),
    unreadCount,
  });
}
