import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { token, newPassword, email, passwordColor } = await req.json(); // Destructure passwordColor from the request

    if (!token || !newPassword || !email || !passwordColor) { // Ensure passwordColor is provided
      return NextResponse.json({ message: "Token, email, new password, and color are required." }, { status: 400 });
    }

    // Find user by reset token and email
    const user = await User.findOne({
      email: email, // Match the email
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired reset token." }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password, password color, and remove reset token
    user.password = hashedPassword;
    user.passwordColor = passwordColor; // Set the password color
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful. You can now log in." }, { status: 200 });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
