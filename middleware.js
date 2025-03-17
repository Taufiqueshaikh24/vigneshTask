import { NextResponse } from "next/server";

// Middleware function
export async function middleware(req) {
    const { nextUrl, cookies } = req;
    const pathname = nextUrl.pathname;

    // Get the token from cookies
    const token = cookies.get("token")?.value;

    // Define routes
    const authRoutes = ["/login", "/register", "/verify", "/forgotpassword", "/resetpassword"];

    // 🚀 If user has a token, prevent access to login/signup pages and redirect to the root route
    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/login", "/register", "/verify", "/forgotpassword", "/resetpassword"],
};
