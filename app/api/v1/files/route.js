import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { parse } from "cookie";

export async function GET(req) {
  try {
    // 🔥 Parse cookies from request
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.token; // Assuming JWT is stored as "token" in cookies

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId } = verifyToken(token);

    await connectToDatabase();
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // 🔥 Fetch files only for the authenticated user
    const files = await bucket.find({ "metadata.userId": userId }).toArray();

    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching files", error: error.message }, { status: 500 });
  }
}
