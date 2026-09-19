import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const serviceList = await db.select().from(services).orderBy(services.name);
    return NextResponse.json({ success: true, services: serviceList });
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
    const { name, description, icon, departmentId, price, isActive } = body;

    if (!name || !departmentId) {
      return NextResponse.json({ success: false, error: "Thiếu thông tin" }, { status: 400 });
    }

    const [service] = await db.insert(services).values({
      name,
      description,
      icon,
      departmentId: parseInt(departmentId),
      price,
      isActive: isActive ?? true,
    }).returning();

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}