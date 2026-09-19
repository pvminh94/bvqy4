import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { gallery } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const items = await db.select().from(gallery).orderBy(gallery.createdAt);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { title, imageUrl, description, category } = body;
    if (!imageUrl) {
      return NextResponse.json({ success: false, error: "Thiếu URL hình ảnh" }, { status: 400 });
    }
    const [item] = await db.insert(gallery).values({
      title, imageUrl, description, category: category || "general",
    }).returning();
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}