import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, slug, excerpt, content, imageUrl, category, author, isPublished, isFeatured } = body;

    const updateData: any = { updatedAt: new Date() };
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (category !== undefined) updateData.category = category;
    if (author !== undefined) updateData.author = author;
    if (isPublished !== undefined) { updateData.isPublished = isPublished; if (isPublished) updateData.publishedAt = new Date(); }
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

    await db.update(news).set(updateData).where(eq(news.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(news).where(eq(news.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}