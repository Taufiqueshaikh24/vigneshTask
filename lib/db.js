import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ Missing MONGODB_URI in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error; // Ensure it propagates and stops execution
  }
}
