import { NextRequest, NextResponse } from "next/server";

// Simplified auth - direct password comparison
const ADMIN_USER = {
  username: "admin",
  password: "admin123",
  id: 1,
  fullName: "Quản trị viên MedCare",
  role: "super_admin",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body || {};
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập tên đăng nhập và mật khẩu" },
        { status: 400 }
      );
    }

    if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
      return NextResponse.json(
        { success: false, error: "Tên đăng nhập hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // Create a simple base64-encoded token (no bcrypt dependency)
    const payload = JSON.stringify({
      userId: ADMIN_USER.id,
      username: ADMIN_USER.username,
      role: ADMIN_USER.role,
      exp: Date.now() + 86400000, // 24h
    });
    const token = Buffer.from(payload).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: ADMIN_USER.id,
        username: ADMIN_USER.username,
        fullName: ADMIN_USER.fullName,
        role: ADMIN_USER.role,
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