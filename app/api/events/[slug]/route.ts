import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type EventParams = {
  params: Promise<{ slug?: string }>;
};

const isValidSlug = (value: string): boolean =>
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

export async function GET(
  _request: NextRequest,
  context: EventParams,
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await context.params;
    const normalizedSlug = typeof slug === "string" ? slug.trim().toLowerCase() : "";

    // Reject missing or malformed route parameters early to avoid unnecessary DB work.
    if (!normalizedSlug) {
      return NextResponse.json(
        { message: "Event slug is required." },
        { status: 400 },
      );
    }

    if (!isValidSlug(normalizedSlug)) {
      return NextResponse.json(
        {
          message:
            "Invalid event slug. Use a URL-safe value such as 'design-summit-2026'.",
        },
        { status: 400 },
      );
    }

    // Query the event by its unique slug and return the record as plain JSON.
    const event = await Event.findOne({ slug: normalizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${normalizedSlug}" was not found.` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully.",
        event,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Failed to fetch event by slug:", error);

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while fetching the event.";

    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}
