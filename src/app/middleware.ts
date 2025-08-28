import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  
  const publicPaths = ["/", "/login", "/api/auth"];

  // If user tries to access protected page without token then redirect
  if (!token && !publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/profile/:path*"],
};
