import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Link from "@/models/Link"; // Your Link model
import { connectToDatabase } from "@/lib/db";

export async function GET(req) {
  try {
    await connectToDatabase();

    // Extract fileId from the query parameters
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    console.log("Received fileId:", fileId);

    if (!fileId) {
      console.error("❌ Error: File ID is missing.");
      return NextResponse.json({ message: "File ID is required" }, { status: 400 });
    }

    // Check if fileId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      console.error("❌ Error: Invalid fileId format.");
      return NextResponse.json({ message: "Invalid File ID" }, { status: 400 });
    }

    // Convert fileId to ObjectId for MongoDB query
    const objectId = new mongoose.Types.ObjectId(fileId);

    // Check if a link already exists for the file
    const existingLink = await Link.findOne({ fileId: objectId });

    if (existingLink) {
      console.log("✅ Link found:", existingLink.url);
      return NextResponse.json(
        { success: true, url: `/access/${existingLink.url}` },
        { status: 200 }
      );
    }

    console.log("❌ No link found for this file.");
    return NextResponse.json({ success: false, message: "No link found" }, { status: 404 });
  } catch (error) {
    console.error("🚨 Error fetching share link:", error);
    return NextResponse.json({ message: "Error fetching link", error: error.message }, { status: 500 });
  }
}
