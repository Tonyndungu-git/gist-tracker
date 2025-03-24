import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Use a global variable to maintain the connection across hot reloads in development
let cached = global._mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "gist-tracker", // specify DB name if needed
    }).then((mongoose) => {
      console.log("MongoDB Connected");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB Connection Error:", err);
      process.exit(1);
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

global._mongoose = cached;
export default dbConnect;
