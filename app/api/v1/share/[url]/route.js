// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";
// import File from "@/models/File";

// export async function POST(req, { params }) {
//   try {
//     const { fileId } = params;
//     const { password, color } = await req.json();

//     if (!password || !color) {
//       return NextResponse.json({ message: "Password and color are required!" }, { status: 400 });
//     }

//     // Hash password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Update file with password and color
//     const updatedFile = await File.findByIdAndUpdate(
//       fileId,
//       { password: hashedPassword, color },
//       { new: true }
//     );

//     if (!updatedFile) {
//       return NextResponse.json({ message: "File not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "File shared successfully with password and color", file: updatedFile }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error sharing file", error }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Link from "@/models/Link";
import File from "@/models/File";
import { connectToDatabase } from "@/lib/db";

export async function POST(req, { params }) {
  
  try {
    await connectToDatabase();

    
    const { url } = params;
    const { password } = await req.json();

    const link = await Link.findOne({ url });
    if (!link) {
      return NextResponse.json({ message: "Invalid or expired link" }, { status: 404 });
    }

    const file = await File.findById(link.fileId);
    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    if (file.password) {
      const isMatch = await bcrypt.compare(password, file.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
      }
    }

    // Increment access count
    link.accessCount += 1;
    await link.save();

    return NextResponse.json(
      { success: true, filename: file.filename, fileId: file._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error accessing file", error }, { status: 500 });
  }
}
