import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { departments, doctors } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Star, Phone, Calendar, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!db) return { title: "Chuyên khoa không tìm thấy" };
  const [dept] = await db
    .select()
    .from(departments)
    .where(eq(departments.slug, slug))
    .limit(1);

  if (!dept) return { title: "Chuyên khoa không tìm thấy" };
  return {
    title: `Chuyên khoa ${dept.name}`,
    description: dept.description ?? undefined,
  };
}

export default async function DepartmentDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!db) notFound();

  const [dept] = await db
    .select()
    .from(departments)
    .where(eq(departments.slug, slug))
    .limit(1);

  if (!dept) notFound();

  const deptDoctors = await db
    .select()
    .from(doctors)
    .where(eq(doctors.departmentId, dept.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/chuyen-khoa" className="hover:text-white transition-colors">
              Chuyên khoa
            </Link>
            <span>/</span>
            <span className="text-white">{dept.name}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black mb-4">
            Khoa {dept.name}
          </h1>
          {dept.description && (
            <p className="text-blue-100 text-lg max-w-2xl">{dept.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Doctors */}
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Bác sĩ khoa {dept.name}
            </h2>

            {deptDoctors.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <p className="text-gray-400">Chưa có thông tin bác sĩ</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {deptDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="relative h-56 bg-gradient-to-br from-blue-50 to-cyan-50">
                      {doctor.imageUrl ? (
                        <Image
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center">
                            <span className="text-2xl font-bold text-blue-600">
                              {doctor.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {doctor.title && (
                        <Badge variant="secondary" className="text-[10px] mb-1">
                          {doctor.title}
                        </Badge>
                      )}
                      <h3 className="font-bold text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mb-3">
                        {doctor.specialization}
                      </p>
                      {doctor.bio && (
                        <p className="text-xs text-gray-500 line-clamp-3 mb-3">
                          {doctor.bio}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-bold">{doctor.rating}</span>
                        </div>
                        <Button size="sm" variant="gradient" asChild>
                          <Link href="/dat-lich-hen">Đặt lịch</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Đặt lịch khám</h3>
              <p className="text-blue-100 text-sm mb-5">
                Đặt lịch khám tại Khoa {dept.name} ngay hôm nay.
              </p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/dat-lich-hen">
                  <Calendar className="w-4 h-4" />
                  Đặt lịch ngay
                </Link>
              </Button>
              <a
                href="tel:1800599920"
                className="mt-3 flex items-center justify-center gap-2 border border-white/30 rounded-xl py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                1800 599 920
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Dịch vụ nổi bật
              </h3>
              <div className="space-y-2">
                {[
                  "Khám và tư vấn chuyên khoa",
                  "Chẩn đoán hình ảnh hiện đại",
                  "Xét nghiệm chuyên sâu",
                  "Điều trị nội trú & ngoại trú",
                  "Theo dõi sau điều trị",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Chuyên khoa khác</h3>
              <div className="space-y-2">
                {[
                  { name: "Tim mạch", slug: "tim-mach" },
                  { name: "Thần kinh", slug: "than-kinh" },
                  { name: "Nhi khoa", slug: "nhi-khoa" },
                  { name: "Chỉnh hình", slug: "chinh-hinh" },
                ].filter((d) => d.slug !== slug).map((d) => (
                  <Link
                    key={d.slug}
                    href={`/chuyen-khoa/${d.slug}`}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {d.name}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
