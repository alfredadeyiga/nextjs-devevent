import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/*
  Generate a URL-safe slug from the title.
  This keeps the slug readable, lowercase, and safe for routing.
*/
const createSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120) || "event";

/*
  Normalize an incoming date string to a standard ISO date.
  This keeps the stored value consistent across the app.
*/
const normalizeDate = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error("Date is required.");
  }

  const parsed = new Date(trimmed);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return parsed.toISOString().split("T")[0];
};

/*
  Normalize the time to a consistent format such as "09:30 AM".
  This avoids storing mixed formats like "9:30am" and "09:30 AM".
*/
const normalizeTime = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error("Time is required.");
  }

  const match24 = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    const hours = Number(match24[1]);
    const minutes = match24[2];
    const period = hours >= 12 ? "PM" : "AM";
    const normalizedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${normalizedHours}:${minutes} ${period}`;
  }

  const match12 = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match12) {
    const hours = Number(match12[1]);
    const minutes = match12[2];
    const period = (match12[3] ?? "AM").toUpperCase();
    const normalizedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${normalizedHours}:${minutes} ${period}`;
  }

  throw new Error(`Invalid time format: ${value}`);
};

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Title cannot be empty.",
      },
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Description cannot be empty.",
      },
    },
    overview: {
      type: String,
      required: [true, "Overview is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Overview cannot be empty.",
      },
    },
    image: {
      type: String,
      required: [true, "Image URL is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Image URL cannot be empty.",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Location cannot be empty.",
      },
    },
    date: {
      type: String,
      required: [true, "Date is required."],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Time is required."],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, "Mode is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Mode cannot be empty.",
      },
    },
    audience: {
      type: String,
      required: [true, "Audience is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Audience cannot be empty.",
      },
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required."],
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every(
            (item) => typeof item === "string" && item.trim().length > 0,
          ),
        message: "Agenda must contain at least one non-empty item.",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required."],
      trim: true,
      validate: {
        validator: (value: string) => value.trim().length > 0,
        message: "Organizer cannot be empty.",
      },
    },
    tags: {
      type: [String],
      required: [true, "Tags are required."],
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every(
            (item) => typeof item === "string" && item.trim().length > 0,
          ),
        message: "Tags must contain at least one non-empty item.",
      },
    },
  },
  {
    timestamps: true,
  },
);

/*
  Only create or rewrite the slug if the title changed.
  We also normalize date and time before saving to keep the record consistent.
*/
eventSchema.pre("save", async function (this: mongoose.Document & IEvent) {
  const title = typeof this.title === "string" ? this.title.trim() : "";

  if (!title) {
    throw new Error("Title is required.");
  }

  if (this.isModified("title") || !this.slug) {
    this.slug = createSlug(title);
  }

  if (!this.date) {
    throw new Error("Date is required.");
  }

  if (!this.time) {
    throw new Error("Time is required.");
  }

  this.date = normalizeDate(String(this.date));
  this.time = normalizeTime(String(this.time));
});

eventSchema.index({ slug: 1 }, { unique: true });

const Event: Model<IEvent> =
  (mongoose.models.Event as Model<IEvent>) ||
  mongoose.model<IEvent>("Event", eventSchema);

export default Event;
