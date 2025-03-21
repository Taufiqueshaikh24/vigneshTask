// import { connectToDatabase } from "@/lib/db";
// import mongoose from "mongoose";
// import { GridFSBucket } from "mongodb";
// import bcrypt from "bcryptjs";

// export async function GET(req, { params }) {
//   try {
//     const { id } = await params;

//     await connectToDatabase();
//     const db = mongoose.connection.db;
//     const bucket = new GridFSBucket(db, { bucketName: "uploads" });

//     // Find file in GridFS
//     const file = await db.collection("uploads.files").findOne({ _id: new mongoose.Types.ObjectId(id) });

//     if (!file) {
//       return new Response("File not found", { status: 404 });
//     }

//     // Check if file requires a password
//     // if (file.metadata?.password && (!global.verifiedFiles || !global.verifiedFiles.has(id))) {
//     //   return new Response("Unauthorized: Password required", { status: 401 });
//     // }

//     // Stream the file
//     const fileStream = bucket.openDownloadStream(file._id);
//     const contentType = file.metadata.contentType || "application/octet-stream";

//     // Set headers
//     const headers = new Headers({
//       "Content-Type": contentType,
//     });

//     // PDFs should be previewed inline
//     if (contentType === "application/pdf") {
//       headers.append("Content-Disposition", `inline; filename="${file.filename}"`);
//     } else {
//       headers.append("Content-Disposition", `attachment; filename="${file.filename}"`);
//     }





//     return new Response(fileStream, { status: 200, headers });
//   } catch (error) {
//     console.error(error);
//     return new Response("Error fetching file", { status: 500 });
//   }
// }







import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params; // Extract file ID from params
    console.log(id)

    // ✅ 1. Connect to the database
    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // ✅ 2. Find the file in GridFS
    const file = await db.collection("uploads.files").findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!file) {
      return new Response("File not found", { status: 404 });
    }

    console.log("File found:", file.filename, file.contentType);

    // ✅ 3. Open a download stream
    const fileStream = bucket.openDownloadStream(file._id);
    const contentType = file.contentType || "application/octet-stream";

    // ✅ 4. Set correct headers
    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });

    // PDFs should be previewed inline
    if (contentType === "application/pdf") {
      headers.append("Content-Disposition", `inline; filename="${file.filename}"`);
    } else {
      headers.append("Content-Disposition", `attachment; filename="${file.filename}"`);
    }

    // ✅ 5. Convert stream into a ReadableStream
    return new Response(new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    }), { status: 200, headers });

  } catch (error) {
    console.error("Error fetching file:", error);
    return new Response("Error fetching file", { status: 500 });
  }
}
