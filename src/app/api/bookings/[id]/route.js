import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

// Admin: update booking status or mark as read
export async function PATCH(request, { params }) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  const body = await request.json();

  const booking = await Booking.findByIdAndUpdate(id, body, { new: true });
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(JSON.parse(JSON.stringify(booking)));
}

// Admin: delete a booking
export async function DELETE(request, { params }) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  await Booking.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
