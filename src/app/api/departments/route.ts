import { NextResponse } from "next/server";
import { db } from "@/db";
import { departments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheGet, cacheSet, CACHE_KEYS } from "@/lib/redis";

export async function GET() {
  try {
    // Try cache first
    const cached = await cacheGet<typeof departments.$inferSelect[]>(
      CACHE_KEYS.departments
    );
    if (cached) {
      return NextResponse.json({
        success: true,
        departments: cached,
        fromCache: true,
      });
    }

    const data = await db
      .select()
      .from(departments)
      .where(eq(departments.isActive, true));

    // Cache for 10 minutes
    await cacheSet(CACHE_KEYS.departments, data, 600);

    return NextResponse.json({ success: true, departments: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
