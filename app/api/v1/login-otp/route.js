import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import LoginOTP from "@/models/LoginOtp";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // OTP expires in 2 minutes
    console.log("This is the Login OTP:", otp);

    // Check if OTP entry already exists
    const existingOTP = await LoginOTP.findOne({ userId: user._id });

    if (existingOTP) {
      // Update the existing OTP entry
      existingOTP.otp = otp;
      existingOTP.otpExpiresAt = otpExpiresAt;
      existingOTP.used = false; // Reset used flag
      await existingOTP.save();
    } else {
      // Create a new OTP entry
      await LoginOTP.create({
        userId: user._id,
        otp,
        otpExpiresAt,
        used: false,
      });
    }

    // Send OTP via email
    await sendEmail(user.email, "login", user.name , otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ message: "Error sending OTP" }, { status: 500 });
  }
}
