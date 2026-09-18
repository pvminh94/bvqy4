import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

const adminPaths = ["/quan-tri"];
const apiAdminPaths = ["/api/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path needs admin auth
  const isAdminPage = adminPaths.some((p) => pathname.startsWith(p));
  const isAdminApi = apiAdminPaths.some((p) => pathname.startsWith(p));

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