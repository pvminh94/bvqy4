import type { Metadata } from "next";
import { db } from "@/db";
import { departments, doctors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Calendar, Clock, Phone, MapPin, CheckCircle2, Database } from "lucide-react";

function DatabaseError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md">
        <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Không thể kết nối</h2>
        <p className="text-gray-500">Vui lòng thử lại sau.</p>
      </div>
    </div>
  );
}

import AppointmentForm from "@/components/appointment/AppointmentForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đặt lịch hẹn",
  description:
    "Đặt lịch khám bệnh trực tuyến tại MedCare. Nhanh chóng, tiện lợi, không cần xếp hàng.",
};

const benefits = [
  { icon: CheckCircle2, text: "Xác nhận lịch hẹn trong 30 phút" },
  { icon: Clock, text: "Không phải xếp hàng chờ đợi" },
  { icon: Phone, text: "Nhắc lịch qua SMS miễn phí" },
  { icon: MapPin, text: "Hướng dẫn đường đến bệnh viện" },
];

export default async function AppointmentPage() {
  if (!db) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Dịch vụ tạm thời không khả dụng.</p>
          <p className="text-gray-400 mt-2">Vui lòng gọi hotline <a href="tel:1800599920" className="text-blue-600 font-bold">1800 599 920</a> để đặt lịch hẹn.</p>
        </div>
      </div>
    );
  }
  const [deptList, doctorList] = await Promise.all([
    db.select().from(departments).where(eq(departments.isActive, true)),
    db.select().from(doctors).where(eq(doctors.isActive, true)),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/50 rounded-full px-4 py-2 text-sm text-blue-200 mb-4">
            <Calendar className="w-4 h-4" />
            Đặt lịch nhanh trong 60 giây
          </div>
          <h1 className="text-3xl lg:text-5xl font-black mb-4">
            Đặt lịch hẹn khám bệnh
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Đặt lịch khám trực tuyến dễ dàng. Chúng tôi sẽ xác nhận lịch hẹn
            và nhắc nhở bạn trước ngày khám.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <AppointmentForm departments={deptList} doctors={doctorList} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                🎯 Ưu điểm đặt lịch online
              </h3>
              <div className="space-y-3">
                {benefits.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-3">📞 Cần hỗ trợ?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Gọi ngay đường dây hỗ trợ đặt lịch để được nhân viên hỗ trợ
                trực tiếp.
              </p>
              <a
                href="tel:1800599920"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors w-full justify-center"
              >
                <Phone className="w-4 h-4" />
                1800 599 920 (Miễn phí)
              </a>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                🕐 Giờ tiếp nhận lịch hẹn
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Thứ 2 – Thứ 6", time: "07:00 – 17:00" },
                  { day: "Thứ 7", time: "07:00 – 12:00" },
                  { day: "Chủ nhật", time: "07:00 – 11:00" },
                  { day: "Cấp cứu", time: "24/7 – Luôn sẵn sàng", emergency: true },
                ].map(({ day, time, emergency }) => (
                  <div
                    key={day}
                    className={`flex justify-between items-center py-2 border-b border-gray-50 last:border-0 ${
                      emergency ? "text-red-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    <span>{day}</span>
                    <span className="font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                📍 Địa chỉ bệnh viện
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-800">Cơ sở 1:</p>
                  <p>123 Đường Lê Lợi, Quận 1, TP.HCM</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Cơ sở 2:</p>
                  <p>456 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
