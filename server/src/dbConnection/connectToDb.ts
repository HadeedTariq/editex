import mongoose from 'mongoose';

// Global cache object to persist connections across serverless invocations
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDb(uri: string) {
  if (cached.conn) {
    return cached.conn; // Reuse existing connection
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    console.log('Connected to MongoDB');
  } catch (err) {
    cached.promise = null;
    console.error('Database connection error:', err);
    throw err; // Let the serverless function handle the failure cleanly
  }

  return cached.conn;
}
