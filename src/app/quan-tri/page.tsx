"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Users,
  Stethoscope,
  Building2,
  FileText,
  MessageSquare,
  Activity,
  TrendingUp,
  Loader2,
  ArrowUpRight,
  Calendar,
  Clock,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";

interface DashboardData {
  stats: {
    totalAppointments: number;
    pendingAppointments: number;
    totalDoctors: number;
    activeDoctors: number;
    totalDepartments: number;
    totalNews: number;
    unreadMessages: number;
    totalPatients: number;
  };
  recentAppointments: any[];
}

const statCards = [
  { key: "totalAppointments", label: "Tổng lịch hẹn", icon: CalendarCheck, color: "from-blue-600 to-blue-700", link: "/quan-tri/lich-hen" },
  { key: "pendingAppointments", label: "Chờ xác nhận", icon: Clock, color: "from-amber-500 to-orange-600", link: "/quan-tri/lich-hen" },
  { key: "activeDoctors", label: "Bác sĩ hoạt động", icon: Stethoscope, color: "from-green-500 to-emerald-600", link: "/quan-tri/bac-si" },
  { key: "totalDepartments", label: "Chuyên khoa", icon: Building2, color: "from-purple-500 to-violet-600", link: "/quan-tri/chuyen-khoa" },
  { key: "totalNews", label: "Bài viết", icon: FileText, color: "from-cyan-500 to-sky-600", link: "/quan-tri/tin-tuc" },
  { key: "unreadMessages", label: "Tin nhắn chưa đọc", icon: MessageSquare, color: "from-rose-500 to-pink-600", link: "/quan-tri/lien-he" },
  { key: "totalPatients", label: "Bệnh nhân", icon: Users, color: "from-teal-500 to-emerald-600", link: "/quan-tri/benh-nhan" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setData(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">Không thể tải dữ liệu</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Tổng quan</h1>
          <p className="text-gray-500 mt-1">Chào mừng trở lại! Hôm nay là một ngày mới tốt đẹp để bắt đầu.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={stat.link}>
                <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-0.5">
                    {data.stats[stat.key as keyof typeof data.stats].toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Appointments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Lịch hẹn gần đây</h2>
              <Link href="/quan-tri/lich-hen" className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                Xem tất cả <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {data.recentAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-400">Chưa có lịch hẹn nào</div>
              ) : (
                data.recentAppointments.slice(0, 6).map((apt: any) => (
                  <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{apt.patientName}</p>
                          <p className="text-xs text-gray-500">{apt.appointmentDate} - {apt.appointmentTime}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        apt.status === "completed" ? "bg-green-100 text-green-700" :
                        apt.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                        apt.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {apt.status === "completed" ? "Hoàn thành" :
                         apt.status === "confirmed" ? "Xác nhận" :
                         apt.status === "cancelled" ? "Hủy" : "Chờ xác nhận"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h2 className="font-bold text-lg mb-2">Truy cập nhanh</h2>
              <p className="text-blue-100 text-sm mb-5">Các chức năng thường dùng</p>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/quan-tri/lich-hen" className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition-colors">
                  <CalendarCheck className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs font-medium">Lịch hẹn</span>
                </Link>
                <Link href="/quan-tri/bac-si" className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition-colors">
                  <Stethoscope className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs font-medium">Bác sĩ</span>
                </Link>
                <Link href="/quan-tri/tin-tuc" className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition-colors">
                  <FileText className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs font-medium">Tin tức</span>
                </Link>
                <Link href="/quan-tri/cai-dat" className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition-colors">
                  <Activity className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs font-medium">Cài đặt</span>
                </Link>
              </div>
            </div>

            {/* Recent Messages Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Phản hồi gần đây
              </h2>
              <p className="text-gray-400 text-sm text-center py-4">
                Có {data.stats.unreadMessages} tin nhắn chưa đọc
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}