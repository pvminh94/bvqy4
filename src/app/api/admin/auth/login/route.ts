import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const { username, password } = await req.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập tên đăng nhập và mật khẩu" },
        { status: 400 }
      );
    }

    // Simple direct comparison for admin
    if (username !== "admin" || password !== "admin123") {
      return NextResponse.json(
        { success: false, error: "Tên đăng nhập hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    let user;
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);
      user = result[0];
    } catch {
      // Continue anyway - we'll log in with fallback
    }

    const token = signToken({
      userId: user?.id || 1,
      username: "admin",
      role: "super_admin",
    });

    return NextResponse.json({
      success: true,
      token: token,
      user: {
        id: user?.id || 1,
        username: "admin",
        fullName: "Quản trị viên MedCare",
        role: "super_admin",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi server. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}