import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { banners } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const bannerList = await db.select().from(banners).orderBy(banners.order);
    return NextResponse.json({ success: true, banners: bannerList });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, subtitle, imageUrl, linkUrl, position, order } = body;

    const [banner] = await db.insert(banners).values({
      title,
      subtitle,
      imageUrl,
      linkUrl,
      position: position || "hero",
      order: order || 0,
    }).returning();

    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, subtitle, imageUrl, linkUrl, isActive, order } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (linkUrl !== undefined) updateData.linkUrl = linkUrl;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (order !== undefined) updateData.order = order;

    await db.update(banners).set(updateData).where(eq(banners.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}