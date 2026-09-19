import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { doctors, departments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Star, Award, Phone, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cacheGet, cacheSet, CACHE_KEYS } from "@/lib/redis";
import type { Doctor } from "@/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đội ngũ bác sĩ",
  description:
    "Gặp gỡ đội ngũ bác sĩ chuyên khoa hàng đầu của MedCare. Hơn 150 chuyên gia y tế giàu kinh nghiệm.",
};

async function getDoctors() {
  if (!db) return [];
  const cached = await cacheGet<Doctor[]>(CACHE_KEYS.doctors);
  if (cached) return cached;

  const data = await db
    .select()
    .from(doctors)
    .where(eq(doctors.isActive, true));

  await cacheSet(CACHE_KEYS.doctors, data, 600);
  return data;
}

async function getDepartments() {
  if (!db) return [];
  const cached = await cacheGet<{ id: number; name: string }[]>(
    CACHE_KEYS.departments
  );
  if (cached) return cached;
  return db.select({ id: departments.id, name: departments.name }).from(departments);
}

export default async function DoctorsPage() {
  const [doctorList, deptList] = await Promise.all([getDoctors(), getDepartments()]);

  const deptMap = new Map(deptList.map((d) => [d.id, d.name]));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600 text-white border-blue-500">
            Đội ngũ chuyên gia
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-black mb-4">
            Bác sĩ của chúng tôi
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Đội ngũ hơn 150 bác sĩ chuyên khoa được đào tạo bài bản, tận tâm
            chăm sóc sức khỏe của bạn.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctorList.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1"
            >
              {/* Doctor Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                {doctor.imageUrl ? (
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-600">
                        {doctor.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Button size="sm" variant="gradient" asChild>
                    <Link href="/dat-lich-hen">Đặt lịch</Link>
                  </Button>
                </div>
              </div>

              <div className="p-5">
                {doctor.title && (
                  <Badge variant="secondary" className="text-[10px] mb-1">
                    {doctor.title}
                  </Badge>
                )}
                <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-1">
                  {doctor.specialization}
                </p>
                {doctor.departmentId && deptMap.get(doctor.departmentId) && (
                  <p className="text-xs text-gray-400 mb-3">
                    {deptMap.get(doctor.departmentId)}
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">
                      {doctor.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({doctor.reviewCount?.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Award className="w-3.5 h-3.5" />
                    {doctor.experience} năm
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-50 rounded-3xl p-8 text-center border border-blue-100">
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Không tìm thấy bác sĩ phù hợp?
          </h2>
          <p className="text-gray-500 mb-6">
            Gọi cho chúng tôi để được tư vấn và kết nối với bác sĩ phù hợp nhất.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/dat-lich-hen">
                Đặt lịch hẹn
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:1800599920">
                <Phone className="w-4 h-4" />
                1800 599 920
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
