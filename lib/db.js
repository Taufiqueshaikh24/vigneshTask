import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ Missing MONGO_URI in environment variables");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("✅ Using existing MongoDB connection");
      return mongoose.connection; // Return the active connection
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully!");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error; // Ensure it propagates and stops execution
  }
}
