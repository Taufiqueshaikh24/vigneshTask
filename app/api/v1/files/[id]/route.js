import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";

export async function GET(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const { userId } = verifyToken(token);

    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    const file = await bucket.find({ _id: new mongoose.Types.ObjectId(params.id), "metadata.userId": userId }).toArray();

    if (!file.length) {
      return NextResponse.json({ message: "File not found or unauthorized" }, { status: 404 });
    }

    const downloadStream = bucket.openDownloadStream(file[0]._id);

    return new Response(downloadStream, {
      headers: {
        "Content-Type": file[0].contentType,
        "Content-Disposition": `attachment; filename="${file[0].filename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Error downloading file", error: error.message }, { status: 500 });
  }
}




export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const { userId } = verifyToken(token);

    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    const file = await bucket.find({ _id: new mongoose.Types.ObjectId(params.id), "metadata.userId": userId }).toArray();

    if (!file.length) {
      return NextResponse.json({ message: "File not found or unauthorized" }, { status: 404 });
    }

    await bucket.delete(file[0]._id);
    return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting file", error: error.message }, { status: 500 });
  }
}