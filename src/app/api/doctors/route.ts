import { NextResponse } from "next/server";
import { db } from "@/db";
import { doctors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheGet, cacheSet, CACHE_KEYS } from "@/lib/redis";

export async function GET() {
  try {
    const cached = await cacheGet<typeof doctors.$inferSelect[]>(
      CACHE_KEYS.doctors
    );
    if (cached) {
      return NextResponse.json({
        success: true,
        doctors: cached,
        fromCache: true,
      });
    }

    const data = await db
      .select()
      .from(doctors)
      .where(eq(doctors.isActive, true));

    await cacheSet(CACHE_KEYS.doctors, data, 600);

    return NextResponse.json({ success: true, doctors: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
