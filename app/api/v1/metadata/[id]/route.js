// backend: app/api/v1/files/metadata/[id]/route.js
import { connectToDatabase } from "@/lib/db"; // Utility to handle DB connection
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    let { id } = await params; 

    // Find the file
    const file = await bucket.find({
      _id: new mongoose.Types.ObjectId(id),
    }).toArray();

    if (file.length === 0) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    // Return file metadata (like contentType, size, etc.)
    return NextResponse.json({
      fileType: file[0].metadata.contentType.split("/")[0], // Simplified file type (e.g., image, text, pdf)
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching file metadata", error: error.message }, { status: 500 });
  }
}
