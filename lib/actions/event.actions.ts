"use server";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags ?? [] },
    }).lean();

    return JSON.parse(JSON.stringify(similarEvents));
  } catch {
    return [];
  }
}
