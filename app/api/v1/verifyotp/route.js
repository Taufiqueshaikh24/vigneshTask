import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import LoginOTP from "@/models/LoginOtp";
import User from "@/models/User";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";


export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, otp } = await req.json();

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the OTP in the database
    const loginOtp = await LoginOTP.findOne({
      userId: user._id,
      otp,
      otpExpiresAt: { $gt: new Date() }, // Ensure OTP is not expired
      used: false, // Ensure OTP is not already used
    });

    if (!loginOtp) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // Mark OTP as used
    await LoginOTP.updateOne({ _id: loginOtp._id }, { used: true });

    // Generate JWT token
     // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d", // Token valid for 7 days
        });
    
        // Serialize the cookie
        const cookie = serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // HTTPS only in production
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        });
    
        // Set cookie in response headers
        const response = NextResponse.json({ message: "Login successful", token });
        response.headers.set("Set-Cookie", cookie);
        return response
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ message: "Error verifying OTP" }, { status: 500 });
  }
}
