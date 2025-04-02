// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import UrlModel from "@/models/shortUrls";

// export async function GET(req, { params }) {
//   await connectToDatabase();

//   console.log("Params received:", params); // Debugging log

//   const { shortcode } = await params;
//   if (!shortcode) {
//     console.log("❌ Shortcode missing in request");
//     return NextResponse.json({ message: "Shortcode not found in request" }, { status: 400 });
//   }

//   try {
//     const urlData = await UrlModel.findOne({ shortCode: shortcode });
    
//     console.log("🔍 Database result:", urlData); // Debugging log

//     if (!urlData) {
//       console.log("❌ Short URL not found in DB");
//       return NextResponse.json({ message: "Short URL not found" }, { status: 404 });
//     }

//     urlData.visitCount++;
//     await urlData.save();

//     console.log("✅ Redirecting to:", urlData.originalUrl); // Debugging log
//     return NextResponse.redirect(urlData.originalUrl);
//   } catch (error) {
//     console.error("🔥 Server error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";
import UrlModel from "@/models/shortUrls";


export async function GET(req, { params }) {
  await connectToDatabase();


  const { shortcode } = await params;
  console.log("🔍 Searching DB for shortcode:", shortcode);

  try {
    // Find and update visit count in one step
    const urlData = await UrlModel.findOneAndUpdate(
      { shortCode: shortcode },
      { $inc: { visits: 1 } }, // ✅ Increment visitCount
      { new: true } // ✅ Return the updated document
    );

    if (!urlData) {
      console.log("❌ Short URL not found in DB");
      return NextResponse.json({ message: "Short URL not found" }, { status: 404 });
    }

    console.log("✅ Visit count updated:", urlData.visits);
    console.log("🚀 Redirecting to:", urlData.originalUrl);

    return NextResponse.redirect(urlData.originalUrl, 302);
  } catch (error) {
    console.error("🔥 Server error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
