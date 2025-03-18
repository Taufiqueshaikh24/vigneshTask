import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Remove the "token" cookie
  response.headers.append(
    "Set-Cookie",
    "token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
  );

  return response;
}
