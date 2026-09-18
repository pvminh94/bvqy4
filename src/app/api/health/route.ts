import { NextResponse } from "next/server";
import { db } from "@/db";
import { departments } from "@/db/schema";

export async function GET() {
  try {
    await db.select().from(departments).limit(1);
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "MedCare Hospital",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", error: "Database connection failed" },
      { status: 500 }
    );
  }
}
