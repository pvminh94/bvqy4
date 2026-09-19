import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const testimonialList = await db.select().from(testimonials).orderBy(testimonials.createdAt);
    return NextResponse.json({ success: true, testimonials: testimonialList });
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
    const { patientName, rating, content, treatmentType, isApproved, isFeatured } = body;

    if (!patientName || !content) {
      return NextResponse.json({ success: false, error: "Thiếu thông tin" }, { status: 400 });
    }

    const [testimonial] = await db.insert(testimonials).values({
      patientName,
      rating: rating || 5,
      content,
      treatmentType,
      isApproved: isApproved ?? true,
      isFeatured: isFeatured ?? false,
    }).returning();

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { id, isApproved, isFeatured } = body;

    const updateData: any = {};
    if (isApproved !== undefined) updateData.isApproved = isApproved;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

    await db.update(testimonials).set(updateData).where(eq(testimonials.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    await db.delete(testimonials).where(eq(testimonials.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}