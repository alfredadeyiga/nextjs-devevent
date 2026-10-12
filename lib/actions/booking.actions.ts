"use server";

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function createBooking({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) {
  try {
    await connectDB();

    await Booking.create({ eventId, email });

    return { success: true };
  } catch (error) {
    console.error("Error creating booking", error);
    return { success: false };
  }
}
