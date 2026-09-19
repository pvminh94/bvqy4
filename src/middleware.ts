import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware disabled - auth handled client-side via localStorage/token
// This file is kept as a placeholder to avoid build errors
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};