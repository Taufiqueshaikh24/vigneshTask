// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import mongoose from "mongoose";
// import Link from "@/models/Link"; // Importing your Link model
// import { connectToDatabase } from "@/lib/db";

// export async function POST(req) {
//   try {
//     await connectToDatabase();

//     const { fileId } = await req.json();

//     if (!fileId) {
//       return NextResponse.json({ message: "File ID is required" }, { status: 400 });
//     }

//     // Connect to GridFS files collection
//     const db = mongoose.connection.db;
//     const filesCollection = db.collection("uploads.files");

//     // Find the file in GridFS
//     const file = await filesCollection.findOne({ _id: new mongoose.Types.ObjectId(fileId) });

//     if (!file) {
//       return NextResponse.json({ message: "File not found" }, { status: 404 });
//     }

//     if (!file.metadata || !file.metadata.password) {
//       return NextResponse.json({ message: "File must have a password before sharing" }, { status: 400 });
//     }

//     // Generate a unique shareable link
//     const url = crypto.randomBytes(16).toString("hex");

//     // Save the link using the Link schema
//     const newLink = await Link.create({
//       fileId: file._id,
//       url,
//       accessCount: 0, // Initialize access count
//     });

//     return NextResponse.json(
//       { success: true, url: `/share/${newLink.url}` },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error generating share link:", error);
//     return NextResponse.json({ message: "Error generating link", error: error.message }, { status: 500 });
//   }
// }







import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import Link from "@/models/Link"; // Importing your Link model
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  console.log("✅ API /api/v1/generate has been hit"); // Ensure API is called

  try {
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    const { fileId } = await req.json();

    console.log("🔍 Received fileId:", fileId);

    if (!fileId) {
      console.error("❌ Error: File ID is missing.");
      return NextResponse.json({ message: "File ID is required" }, { status: 400 });
    }

    // Check if fileId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      console.error("❌ Error: Invalid fileId format.");
      return NextResponse.json({ message: "Invalid File ID" }, { status: 400 });
    }

    // Check if a shareable link already exists
    const existingLink = await Link.findOne({ fileId });

    if (existingLink) {
      console.log("✅ Existing link found:", existingLink.url);
      return NextResponse.json(
        { success: true, url: `/share/${existingLink.url}` },
        { status: 200 }
      );
    }

    console.log("⚠️ No existing link found. Checking file in GridFS...");

    // Connect to GridFS files collection
    const db = mongoose.connection.db;
    const filesCollection = db.collection("uploads.files");

    // Find the file in GridFS
    const file = await filesCollection.findOne({ _id: new mongoose.Types.ObjectId(fileId) });

    if (!file) {
      console.error("❌ Error: File not found in GridFS.");
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    if (!file.metadata || !file.metadata.password) {
      console.error("❌ Error: File must have a password before sharing.");
      return NextResponse.json({ message: "File must have a password before sharing" }, { status: 400 });
    }

    console.log("✅ File found in GridFS. Generating shareable link...");

    // Generate a unique shareable link
    const url = crypto.randomBytes(16).toString("hex");

    // Save the new link in the database
    const newLink = await Link.create({
      fileId: file._id,
      url,
      accessCount: 0, // Initialize access count
    });

    console.log("✅ New shareable link created:  http://localhost:3000/access/",newLink.url);

    return NextResponse.json(
      { success: true, url: `/access/${newLink.url}` },
      { status: 201 }
    );

  } catch (error) {
    console.error("🚨 Error generating share link:", error);
    return NextResponse.json(
      { message: "Error generating link", error: error.message },
      { status: 500 }
    );
  }
}







export async function GET(req) {
  try {
    await connectToDatabase();

    // Extract `fileId` from query parameters
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ message: "File ID is required" }, { status: 400 });
    }

    // Find the existing link in the database
    const link = await Link.findOne({ fileId });

    if (!link) {
      return NextResponse.json({ message: "No shareable link found for this file" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, url: `/share/${link.url}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching share link:", error);
    return NextResponse.json({ message: "Error retrieving link", error: error.message }, { status: 500 });
  }
}

