import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import bcrypt from "bcryptjs";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Find file in GridFS
    const file = await db.collection("uploads.files").findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!file) {
      return new Response("File not found", { status: 404 });
    }

    // Check if file requires a password
    // if (file.metadata?.password && (!global.verifiedFiles || !global.verifiedFiles.has(id))) {
    //   return new Response("Unauthorized: Password required", { status: 401 });
    // }

    // Stream the file
    const fileStream = bucket.openDownloadStream(file._id);
    const contentType = file.metadata.contentType || "application/octet-stream";

    // Set headers
    const headers = new Headers({
      "Content-Type": contentType,
    });

    // PDFs should be previewed inline
    if (contentType === "application/pdf") {
      headers.append("Content-Disposition", `inline; filename="${file.filename}"`);
    } else {
      headers.append("Content-Disposition", `attachment; filename="${file.filename}"`);
    }

    return new Response(fileStream, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching file", { status: 500 });
  }
}
