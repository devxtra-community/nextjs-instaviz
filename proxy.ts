import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/admin/login");

  if (!isAdminRoute) return NextResponse.next();
  if (isLoginPage) return NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("adminRefreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (accessToken) {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );

      const { payload } = await jwtVerify(accessToken, secret);

      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      return NextResponse.next(); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
