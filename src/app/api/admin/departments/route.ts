import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { departments } from "@/db/schema";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, icon } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "Thiếu tên chuyên khoa" }, { status: 400 });
    }

    const slug = slugify(name);
    const [dept] = await db.insert(departments).values({
      name,
      slug,
      description,
      icon,
    }).returning();

    return NextResponse.json({ success: true, department: dept });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}