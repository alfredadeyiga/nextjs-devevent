import mongoose, { Schema, type Document, type Model } from "mongoose";
import Event from "./event.model";

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/*
  Booking schema keeps the event reference and the guest email together.
  Timestamps are enabled automatically so we capture booking creation and updates.
*/
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event reference is required."],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      validate: {
        validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please provide a valid email address.",
      },
    },
  },
  {
    timestamps: true,
  },
);

/*
  Before saving, confirm the referenced event exists.
  This prevents invalid bookings from being stored.
*/
bookingSchema.pre("save", async function () {
  if (!this.eventId) {
    throw new Error("Event reference is required.");
  }

  const eventExists = await Event.exists({ _id: this.eventId });

  if (!eventExists) {
    throw new Error("The referenced event does not exist.");
  }
});

bookingSchema.index({ eventId: 1 });

bookingSchema.index({ eventId: 1, createdAt: -1 });

bookingSchema.index({ email: 1 });

bookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: "unique_event_email" },
);

const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
