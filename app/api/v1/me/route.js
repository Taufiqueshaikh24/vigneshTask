import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { ObjectId } from "mongodb";
import { parse } from "cookie";

export async function GET(request) {
  try {
    // ✅ Extract token from cookies using `parse()`
    const cookieHeader = request.headers.get("cookie");
    const cookies = cookieHeader ? parse(cookieHeader) : {};
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // ✅ Connect to MongoDB
    await connectToDatabase();
    const user = await User.findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Return user details
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
