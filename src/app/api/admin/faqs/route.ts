import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const faqList = await db.select().from(faqs).orderBy(faqs.order);
    return NextResponse.json({ success: true, faqs: faqList });
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
    const { question, answer, category } = body;
    if (!question || !answer) {
      return NextResponse.json({ success: false, error: "Thiếu thông tin" }, { status: 400 });
    }
    const maxOrder = await db.select().from(faqs).orderBy(faqs.order).limit(1);
    const nextOrder = maxOrder.length > 0 ? (maxOrder[0].order || 0) + 1 : 0;
    const [faq] = await db.insert(faqs).values({ question, answer, category, order: nextOrder }).returning();
    return NextResponse.json({ success: true, faq });
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
    const { id, question, answer, category, order, isActive } = body;
    if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    const updateData: any = {};
    if (question) updateData.question = question;
    if (answer) updateData.answer = answer;
    if (category !== undefined) updateData.category = category;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;
    await db.update(faqs).set(updateData).where(eq(faqs.id, id));
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
    await db.delete(faqs).where(eq(faqs.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}