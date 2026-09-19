import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { cacheFlushPattern } from "@/lib/redis";
import { z } from "zod";

const appointmentSchema = z.object({
  patientName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  patientEmail: z.string().email().optional().or(z.literal("")),
  patientPhone: z.string().min(10, "Số điện thoại không hợp lệ"),
  patientDob: z.string().optional().or(z.literal("")),
  patientGender: z.enum(["male", "female", "other"]).optional(),
  departmentId: z.number().int().positive(),
  doctorId: z.number().int().positive().optional().nullable(),
  appointmentDate: z.string().min(1, "Vui lòng chọn ngày khám"),
  appointmentTime: z.string().min(1, "Vui lòng chọn giờ khám"),
  reason: z.string().optional().or(z.literal("")),
  insuranceNumber: z.string().optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const body = await req.json();

    // Clean up empty strings
    const cleaned = {
      ...body,
      patientEmail: body.patientEmail || undefined,
      patientDob: body.patientDob || undefined,
      patientGender: body.patientGender || undefined,
      doctorId: body.doctorId && body.doctorId !== "any" ? body.doctorId : null,
      reason: body.reason || undefined,
      insuranceNumber: body.insuranceNumber || undefined,
    };

    const parsed = appointmentSchema.safeParse(cleaned);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [appointment] = await db
      .insert(appointments)
      .values({
        patientName: data.patientName,
        patientEmail: data.patientEmail || null,
        patientPhone: data.patientPhone,
        patientDob: data.patientDob || null,
        patientGender: data.patientGender || null,
        departmentId: data.departmentId,
        doctorId: data.doctorId || null,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        reason: data.reason || null,
        insuranceNumber: data.insuranceNumber || null,
        status: "pending",
      })
      .returning();

    // Invalidate cache
    await cacheFlushPattern("hospital:appointments*");

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!db) {
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
  }
  try {
    const allAppointments = await db
      .select()
      .from(appointments)
      .orderBy(appointments.createdAt)
      .limit(100);

    return NextResponse.json({ success: true, appointments: allAppointments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}