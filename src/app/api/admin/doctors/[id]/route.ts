import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { doctors } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, title, specialization, departmentId, bio, experience, rating, email, phone, education, isActive, consultationFee, imageUrl } = body;

    const updateData: any = { updatedAt: new Date() };
    if (name) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (specialization !== undefined) updateData.specialization = specialization;
    if (departmentId) updateData.departmentId = parseInt(departmentId);
    if (bio !== undefined) updateData.bio = bio;
    if (experience) updateData.experience = parseInt(experience);
    if (rating) updateData.rating = rating;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (education !== undefined) updateData.education = education;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (consultationFee) updateData.consultationFee = consultationFee;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    await db.update(doctors).set(updateData).where(eq(doctors.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(doctors).where(eq(doctors.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}