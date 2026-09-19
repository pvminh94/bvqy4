import { NextResponse } from "next/server";
import { db } from "@/db";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    await seedDatabase();
    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: "Seed failed" }, { status: 500 });
  }
}