import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    // ✅ Extract userId from params
    const { userId } = params;
    console.log("Extracted userId:", userId);

    // ✅ Extract cookies properly
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader?.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No Token" }, { status: 401 });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // ✅ Ensure userId from token matches requested userId
    if (decoded.userId !== userId) {
      return NextResponse.json({ error: "Forbidden: Invalid User" }, { status: 403 });
    }

    // ✅ Connect to MongoDB
    const { db } = await connectToDatabase();

    // ✅ Convert userId to ObjectId
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Return user details (excluding sensitive data)
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
