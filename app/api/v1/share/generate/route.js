import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import Link from "@/models/Link"; // Importing your Link model
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json({ message: "File ID is required" }, { status: 400 });
    }

    // Connect to GridFS files collection
    const db = mongoose.connection.db;
    const filesCollection = db.collection("uploads.files");

    // Find the file in GridFS
    const file = await filesCollection.findOne({ _id: new mongoose.Types.ObjectId(fileId) });

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    if (!file.metadata || !file.metadata.password) {
      return NextResponse.json({ message: "File must have a password before sharing" }, { status: 400 });
    }

    // Generate a unique shareable link
    const url = crypto.randomBytes(16).toString("hex");

    // Save the link using the Link schema
    const newLink = await Link.create({
      fileId: file._id,
      url,
      accessCount: 0, // Initialize access count
    });

    return NextResponse.json(
      { success: true, url: `/share/${newLink.url}` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error generating share link:", error);
    return NextResponse.json({ message: "Error generating link", error: error.message }, { status: 500 });
  }
}
