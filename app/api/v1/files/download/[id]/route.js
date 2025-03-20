import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    // ✅ Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response("Invalid file ID", { status: 400 });
    }

    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Find the file
    const file = await db.collection("uploads.files").findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!file) {
      return new Response("File not found", { status: 404 });
    }

    // Stream the file for download
    const fileStream = bucket.openDownloadStream(file._id);
    const contentType = file.metadata?.contentType || "application/octet-stream";

    // Set headers
    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    });

    return new Response(fileStream, { status: 200, headers });
  } catch (error) {
    console.error("Error downloading file:", error);
    return new Response("Error downloading file", { status: 500 });
  }
}
