import { NextResponse } from "next/server";
import Link from "@/models/Link"; // Importing your Link model
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all shared files with access count
    const links = await Link.find({}, "fileId url accessCount").lean();

    return NextResponse.json({ success: true, links }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching shared links:", error);
    return NextResponse.json({ message: "Error fetching links", error: error.message }, { status: 500 });
  }
}
