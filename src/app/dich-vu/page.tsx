import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { services, departments } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Stethoscope,
  Calendar,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dịch vụ & Báo giá",
  description:
    "Danh sách dịch vụ y tế tại MedCare với bảng giá minh bạch, rõ ràng.",
};

export default async function ServicesPage() {
  const [serviceList, deptList] = await Promise.all([
    db.select().from(services).where(eq(services.isActive, true)),
    db.select().from(departments).where(eq(departments.isActive, true)),
  ]);

  const deptMap = new Map(deptList.map((d) => [d.id, d.name]));

  const highlights = [
    "Bảng giá niêm yết công khai, không phụ thu",
    "Hỗ trợ bảo hiểm y tế và bảo hiểm sức khỏe",
    "Thanh toán tiện lợi: tiền mặt, thẻ, chuyển khoản",
    "Hoàn tiền 100% nếu không hài lòng",
    "Giảm 20% cho bệnh nhân khám lần 2 trở đi",
    "Miễn phí tư vấn online với bác sĩ",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600 border-blue-500 text-white">
            Dịch vụ y tế
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-black mb-4">
            Dịch vụ & Báo giá
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Bảng giá dịch vụ minh bạch, rõ ràng. Hỗ trợ đầy đủ bảo hiểm y tế.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Highlights */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-10 border border-blue-100">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">
            ✅ Cam kết của chúng tôi
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-sm text-gray-700">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services by Department */}
        {deptList.map((dept) => {
          const deptServices = serviceList.filter((s) => s.departmentId === dept.id);
          if (deptServices.length === 0) return null;
          return (
            <div key={dept.id} className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                Khoa {dept.name}
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">
                          Tên dịch vụ
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-700 hidden md:table-cell">
                          Mô tả
                        </th>
                        <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">
                          Giá (VNĐ)
                        </th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">
                          Đặt lịch
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {deptServices.map((s) => (
                        <tr key={s.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900 text-sm">
                              {s.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <span className="text-sm text-gray-500">
                              {s.description}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-bold text-blue-600 text-sm">
                              {s.price
                                ? Number(s.price).toLocaleString("vi-VN") + " ₫"
                                : "Liên hệ"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Button size="sm" variant="gradient" asChild>
                              <Link href="/dat-lich-hen">
                                <Calendar className="w-3.5 h-3.5" />
                                Đặt lịch
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center mt-10">
          <h2 className="text-2xl font-black mb-3">
            Cần tư vấn về dịch vụ?
          </h2>
          <p className="text-blue-100 mb-6">
            Gọi ngay để được tư vấn miễn phí và đặt lịch hẹn.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50" size="lg" asChild>
              <Link href="/dat-lich-hen">
                <Calendar className="w-4 h-4" />
                Đặt lịch hẹn
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white/10 hover:text-white hover:border-white"
              asChild
            >
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
