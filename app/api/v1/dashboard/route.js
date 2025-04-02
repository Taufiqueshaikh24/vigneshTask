// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import UrlModel from "@/models/shortUrls";

// export async function GET() {
//   await connectToDatabase();
  
//   try {
//     const urls = await UrlModel.find()
//       .select("originalUrl shortCode shortUrl qrCode visitCount createdAt")
//       .sort({ createdAt: -1 }); // Sort by newest first

//     return NextResponse.json(urls, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to fetch URLs" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import UrlModel from "@/models/shortUrls";

export async function GET(req) {
  await connectToDatabase();

  try {
    // Extract query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json({ message: "Invalid pagination values" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    // Fetch paginated results
    const urls = await UrlModel.find()
      .select("originalUrl shortCode shortUrl qrCode visitCount createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalCount = await UrlModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        data: urls,
        currentPage: page,
        totalPages,
        totalCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch URLs" }, { status: 500 });
  }
}
