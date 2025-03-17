import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found. Please sign up first." }, { status: 404 });
    }

    return NextResponse.json({ passwordColor: user.passwordColor }, { status: 200 });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
