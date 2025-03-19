// import { connectToDatabase } from "@/lib/db";
// import mongoose from "mongoose";
// import { GridFSBucket } from "mongodb";
// import { parse } from "cookie";  // To parse the cookie for JWT token
// import { verifyToken } from "@/utils/verifyToken";  // Helper function to verify the JWT

// export async function GET(req, { params }) {
//   try {
//     // Extract the token from cookies using the 'token' key
//     const cookies = parse(req.headers.get('cookie') || "");
//     const token = cookies.token;  // Ensure you're using 'token' here, not 'auth_token'

//     if (!token) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // Verify the token to extract the userId
//     const { userId } = verifyToken(token);

//     // Connect to the database
//     await connectToDatabase();
//     const db = mongoose.connection.db;
//     const bucket = new GridFSBucket(db, { bucketName: "uploads" });

//     // Extract the fileId from params
//     const { id } = await params;

//     // Find the file from GridFS that belongs to the user
//     const file = await bucket
//       .find({ _id: new mongoose.Types.ObjectId(id), "metadata.userId": userId })
//       .toArray();

//     if (!file.length) {
//       return new Response("File not found or unauthorized", { status: 404 });
//     }

//     // Set headers to allow inline preview (without triggering download)
//     const fileStream = bucket.openDownloadStream(file[0]._id);
//     const contentType = file[0].metadata.contentType || "application/octet-stream";  // Default to binary
//     const responseHeaders = new Headers({
//       "Content-Type": contentType,
//       "Content-Disposition": "inline",  // Important: This prevents download, showing the file inline
//     });

//     return new Response(fileStream, { status: 200, headers: responseHeaders });
//   } catch (error) {
//     console.error(error);
//     return new Response("Error fetching file", { status: 500 });
//   }
// }













import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { parse } from "cookie";  // To parse the cookie for JWT token
import { verifyToken } from "@/utils/verifyToken";  // Helper function to verify the JWT

export async function GET(req, { params }) {
  try {
    // Extract the token from cookies using the 'token' key
    const cookies = parse(req.headers.get('cookie') || "");
    const token = cookies.token;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Verify the token to extract the userId
    const { userId } = verifyToken(token);

    // Connect to the database
    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Extract the fileId from params
    const { id } = await params;

    // Find the file from GridFS that belongs to the user
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(id), "metadata.userId": userId })
      .toArray();

    if (!file.length) {
      return new Response("File not found or unauthorized", { status: 404 });
    }

    // Set headers to allow inline preview (without triggering download)
    const fileStream = bucket.openDownloadStream(file[0]._id);
    const contentType = file[0].contentType || "application/octet-stream"; // Ensure correct content type
    const headers = new Headers({
      "Content-Type": contentType,
    });

    // ✅ Only set "inline" disposition for PDFs
    if (contentType === "application/pdf") {
      headers.append("Content-Disposition", `inline; filename="${file[0].filename}"`);
    } else {
      headers.append("Content-Disposition", `attachment; filename="${file[0].filename}"`);
    }

    return new Response(fileStream, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching file", { status: 500 });
  }
}
