import mongoose, { type Mongoose } from "mongoose";

/*
  Load the connection string from environment variables.
  In a Next.js app this is typically set in `.env.local` or a deployment environment.
*/
const MONGODB_URI = process.env.MONGODB_URI as string;

/*
  Cache the connection so the app reuses a single Mongoose instance across requests
  and avoids creating duplicate connections during local development hot reloads.
*/
type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  // Use a global variable to persist the cache across module reloads in development.
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis.mongooseCache = cached;

/*
  Establish and reuse a MongoDB connection.
  If the connection already exists, return it immediately.
  Otherwise, create the connection and store it in the cache for future calls.
*/
async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
      );
    }

    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise so the next call can retry if the connection fails.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
