import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import  {parse} from "cookie";

export async function GET(req, { params }) {
  try {
    // Parse cookies from the request header
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.token;  // Assuming the token is stored in the cookie as "token"

    // Check if token exists in cookies
    if (!token) {
      return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
    }

    // Verify the token and extract userId (Assuming you have a utility function to verify JWT token)
    const { userId } = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    let { id }= await params

    // Connect to the database
    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Find the file that matches the id and belongs to the user
    const file = await bucket.find({
      _id: new mongoose.Types.ObjectId(id),
      "metadata.userId": userId,
    }).toArray();

    // Check if file exists and is authorized for download
    if (file.length === 0) {
      return NextResponse.json({ message: "File not found or unauthorized" }, { status: 404 });
    }

    // Stream the file to the client
    const downloadStream = bucket.openDownloadStream(file[0]._id);

    // Set appropriate headers for file download
    const headers = {
      "Content-Type": file[0].metadata.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file[0].filename}"`,
    };

    return new NextResponse(downloadStream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error downloading file:", error); // Log the error for debugging
    return NextResponse.json({
      message: "Error downloading file",
      error: error.message,
    }, { status: 500 });
  }
}




export async function DELETE(req, { params }) {
  try {
    // Parse cookies from the request header
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.token;  // Assuming the token is stored in the cookie as "token"

    // Check if token exists in cookies
    if (!token) {
      return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
    }

    // Verify the token and extract userId (Assuming you have a utility function to verify JWT token)
    const { userId } = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
    
    const { id } = await params;

    // Connect to the database
    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Find the file that matches the id and belongs to the user
    const file = await bucket.find({
      _id: new mongoose.Types.ObjectId(id),
      "metadata.userId": userId,
    }).toArray();

    // Check if file exists and is authorized for deletion
    if (file.length === 0) {
      return NextResponse.json({ message: "File not found or unauthorized" }, { status: 404 });
    }

    // Delete the file
    await bucket.delete(file[0]._id);

    // Return success response
    return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error); // Log the error for debugging
    return NextResponse.json({
      message: "Error deleting file",
      error: error.message,
    }, { status: 500 });
  }
}