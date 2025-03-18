import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { parse } from "cookie";  // To parse the cookie for JWT token
import { verifyToken } from "@/utils/verifyToken";  // Helper function to verify the JWT

export async function GET(req, { params }) {
  try {
    // Extract the token from cookies using the 'token' key
    const cookies = parse(req.headers.get('cookie') || "");
    const token = cookies.token;  // Ensure you're using 'token' here, not 'auth_token'

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
    const contentType = file[0].metadata.contentType || "application/octet-stream";  // Default to binary
    const responseHeaders = new Headers({
      "Content-Type": contentType,
      "Content-Disposition": "inline",  // Important: This prevents download, showing the file inline
    });

    return new Response(fileStream, { status: 200, headers: responseHeaders });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching file", { status: 500 });
  }
}







// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import File from "@/models/File";
// import mongoose from "mongoose";

// export async function GET(req, { params }) {
//   await connectToDatabase();
  
//   const { id } = await params;
  
//   // Validate the ID
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid File ID" }, { status: 400 });
//   }

//   try {
//     // Find the file by ID
//     const file = await File.findById(id);
    
//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 404 });
//     }

//     // Check file type and set appropriate content headers
//     const contentType = file.file_type; // Assuming file_type is stored (e.g., 'pdf', 'jpg', etc.)
//     let responseHeaders = {
//       "Content-Disposition": `inline; filename="${file.file_name}"`,
//     };

//     // Serve the file based on its type
//     if (contentType === "pdf") {
//       responseHeaders["Content-Type"] = "application/pdf";
//       return new NextResponse(file.file_data, {
//         status: 200,
//         headers: responseHeaders,
//       });
//     }

//     if (contentType === "image/jpeg" || contentType === "image/png") {
//       responseHeaders["Content-Type"] = contentType; // JPEG or PNG
//       return new NextResponse(file.file_data, {
//         status: 200,
//         headers: responseHeaders,
//       });
//     }

//     // You can add more conditions for other file types (e.g., PNG, DOCX)

//     // Default response if file type is unknown
//     return new NextResponse("Unsupported file type", { status: 415 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
