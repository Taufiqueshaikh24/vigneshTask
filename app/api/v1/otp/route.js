import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import TempUser from "@/models/TempUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return NextResponse.json({ error: "User not found or OTP expired" }, { status: 400 });
    }

    // ✅ Check OTP validity
    if (tempUser.otp !== otp || tempUser.otpExpiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // ✅ Move user to `User` collection (WITHOUT otp & otpExpiresAt)
    await User.create({
      name: tempUser.name,
      email: tempUser.email,
      phone: tempUser.phone,
      password: tempUser.password,
      emailVerified: true, // Mark email as verified
    });

    // ❌ Remove from `TempUser`
    await TempUser.deleteOne({ email });

    return NextResponse.json({ message: "OTP verified successfully. You can now log in." }, { status: 200 });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
