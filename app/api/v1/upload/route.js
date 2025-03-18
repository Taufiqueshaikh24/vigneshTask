// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import multer from "multer";
// import { GridFSBucket } from "mongodb";
// import { Readable } from "stream";
// import { promisify } from "util";

// // Multer setup (store file in memory)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const uploadMiddleware = promisify(upload.single("file"));

// export const config = {
//   api: {
//     bodyParser: false, // ✅ Must be false for handling streams
//   },
// };

// export async function POST(req) {
//   try {
//     await uploadMiddleware(req); // ✅ Manually handle file upload
//     const { file } = req;
    
//     if (!file) {
//       return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
//     }

//     await connectToDatabase();
//     const db = global.mongoClient.db();
//     const bucket = new GridFSBucket(db, { bucketName: "uploads" });

//     // Convert file buffer to a readable stream
//     const readableStream = new Readable();
//     readableStream.push(file.buffer);
//     readableStream.push(null);

//     const uploadStream = bucket.openUploadStream(file.originalname, {
//       contentType: file.mimetype,
//     });

//     readableStream.pipe(uploadStream);

//     return NextResponse.json({ message: "File uploaded successfully" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error uploading file", error }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";

export const config = {
  api: {
    bodyParser: false, // Required for large file uploads
  },
};

export async function POST(req) {
  try {
    // Extract token from cookies
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    // Parse cookies manually to extract token
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("="))
    );
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token found in cookies" }, { status: 401 });
    }

    console.log("Extracted Token:", token); // Debugging

    // Verify Token and Get User ID
    const { userId } = verifyToken(token);
    console.log("User ID:", userId);

    // Connect to the database
    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Extract file from request
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Convert file to a readable stream
    const readableStream = new Readable();
    readableStream.push(Buffer.from(await file.arrayBuffer()));
    readableStream.push(null);

    // Upload file to GridFS with user metadata
    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type,
      metadata: { userId },
    });

    readableStream.pipe(uploadStream);

    return NextResponse.json(
      { message: "File uploaded successfully", fileId: uploadStream.id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Upload Error:", error.message);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
