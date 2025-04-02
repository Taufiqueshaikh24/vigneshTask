import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import UrlModel from "@/models/shortUrls";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  await connectToDatabase(); // Ensure DB connection

  const { originalUrl } = await req.json();
  if (!originalUrl) {
    return NextResponse.json({ message: "Original URL is required" }, { status: 400 });
  }

  try {
    // Generate a unique short code
    const shortCode = nanoid(6);
    const shortUrl = `${process.env.DOMAIN_NAME}/${shortCode}`; // Use correct env variable

    // Generate QR code for the short URL
    const qrCode = await QRCode.toDataURL(shortUrl);

    // Save to database
    const newUrl = await UrlModel.create({
      originalUrl,
      shortCode,
      shortUrl,
      qrCode,
      visitCount: 0,
    });

    return NextResponse.json(newUrl, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
