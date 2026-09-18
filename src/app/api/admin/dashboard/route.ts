import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointments, doctors, departments, news, contactMessages, patients } from "@/db/schema";
import { eq, sql, and, gte } from "drizzle-orm";

export async function GET() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalAppointments,
      pendingAppointments,
      totalDoctors,
      activeDoctors,
      totalDepartments,
      totalNews,
      unreadMessages,
      totalPatients,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(appointments),
      db.select({ count: sql<number>`count(*)` }).from(appointments).where(eq(appointments.status, "pending")),
      db.select({ count: sql<number>`count(*)` }).from(doctors),
      db.select({ count: sql<number>`count(*)` }).from(doctors).where(eq(doctors.isActive, true)),
      db.select({ count: sql<number>`count(*)` }).from(departments).where(eq(departments.isActive, true)),
      db.select({ count: sql<number>`count(*)` }).from(news).where(eq(news.isPublished, true)),
      db.select({ count: sql<number>`count(*)` }).from(contactMessages).where(eq(contactMessages.isRead, false)),
      db.select({ count: sql<number>`count(*)` }).from(patients),
    ]);

    // Recent appointments
    const recentAppointments = await db
      .select()
      .from(appointments)
      .orderBy(appointments.createdAt)
      .limit(10);

    // Appointments by status
    const appointmentsByStatus = {
      pending: pendingAppointments[0].count,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    return NextResponse.json({
      success: true,
      stats: {
        totalAppointments: totalAppointments[0].count,
        pendingAppointments: pendingAppointments[0].count,
        totalDoctors: totalDoctors[0].count,
        activeDoctors: activeDoctors[0].count,
        totalDepartments: totalDepartments[0].count,
        totalNews: totalNews[0].count,
        unreadMessages: unreadMessages[0].count,
        totalPatients: totalPatients[0].count,
      },
      recentAppointments,
      appointmentsByStatus,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}