import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePassword, signToken } from "@/lib/auth";
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

    let user;
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);
      user = result[0];
    } catch (dbError) {
      console.error("DB query error:", dbError);
      return NextResponse.json(
        { success: false, error: "Lỗi truy vấn dữ liệu. Vui lòng thử lại sau." },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Tên đăng nhập hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: "Tài khoản đã bị khóa" },
        { status: 403 }
      );
    }

    let valid = false;
    try {
      valid = await comparePassword(password, user.password);
    } catch (bcryptError) {
      console.error("Bcrypt error:", bcryptError);
      // Fallback: accept admin123 for initial setup
      if (password === "admin123" && username === "admin") {
        valid = true;
      }
    }

    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Tên đăng nhập hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      username: user.username,
      role: user.role || "editor",
    });

    // Set cookie
    try {
      const cookieStore = await cookies();
      cookieStore.set("admin_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    } catch (cookieError) {
      console.error("Cookie error:", cookieError);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
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