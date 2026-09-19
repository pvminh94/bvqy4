import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { departments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, description, icon, isActive, imageUrl } = body;

    const updateData: any = { updatedAt: new Date() };
    if (name) { updateData.name = name; updateData.slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    await db.update(departments).set(updateData).where(eq(departments.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const { id } = await params;
    await db.delete(departments).where(eq(departments.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}