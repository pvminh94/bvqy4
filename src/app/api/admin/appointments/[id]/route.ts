import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes } = body;

    const updateData: any = { updatedAt: new Date() };
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    await db.update(appointments).set(updateData).where(eq(appointments.id, parseInt(id)));
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
    await db.delete(appointments).where(eq(appointments.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}