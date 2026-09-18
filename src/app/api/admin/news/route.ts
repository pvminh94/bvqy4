import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const newsList = await db.select().from(news).orderBy(news.createdAt);
    return NextResponse.json({ success: true, news: newsList });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, imageUrl, category, author, isPublished } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const [article] = await db.insert(news).values({
      title,
      slug,
      excerpt,
      content,
      imageUrl,
      category,
      author,
      isPublished: isPublished ?? true,
      publishedAt: isPublished ? new Date() : null,
    }).returning();

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}