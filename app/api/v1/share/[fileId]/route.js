import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import File from "@/models/File";

export async function POST(req, { params }) {
  try {
    const { fileId } = params;
    const { password, color } = await req.json();

    if (!password || !color) {
      return NextResponse.json({ message: "Password and color are required!" }, { status: 400 });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update file with password and color
    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { password: hashedPassword, color },
      { new: true }
    );

    if (!updatedFile) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "File shared successfully with password and color", file: updatedFile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error sharing file", error }, { status: 500 });
  }
}
