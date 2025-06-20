import mongoose from "mongoose";
// uri from env
const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  // throwing not found error
  throw new Error("plese define mongouri in env varialbe");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.connect(MONGODB_URI).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
