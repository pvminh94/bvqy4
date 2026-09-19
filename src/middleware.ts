import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

const publicAdminPaths = ["/quan-tri/dang-nhap", "/api/admin/auth/login", "/api/admin/auth/logout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths
  if (publicAdminPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check if path needs admin auth
  const isAdminPage = pathname.startsWith("/quan-tri");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token || !verifyToken(token)) {
      if (isAdminApi) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/quan-tri/dang-nhap", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/quan-tri/:path*", "/api/admin/:path*"],
};