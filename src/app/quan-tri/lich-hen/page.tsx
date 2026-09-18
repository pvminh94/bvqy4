"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Calendar, Search, CheckCircle2, XCircle, Clock, Loader2, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  patientEmail: string | null;
  departmentId: number;
  doctorId: number | null;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  reason: string | null;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  cancelled: "Đã hủy",
  completed: "Hoàn thành",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-green-100 text-green-700 border-green-200",
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) setAppointments(data.appointments || []);
    } catch {}
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
        toast({ title: "Thành công", description: `Đã cập nhật trạng thái: ${statusLabels[status]}` });
      }
    } catch {
      toast({ title: "Lỗi", description: "Không thể cập nhật trạng thái", variant: "destructive" });
    }
  };

  const filtered = appointments.filter((a) => {
    const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.patientPhone.includes(search);
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Quản lý lịch hẹn</h1>
            <p className="text-gray-500 text-sm mt-1">Tổng số: {filtered.length} lịch hẹn</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: "all", label: "Tất cả" },
              { key: "pending", label: "Chờ" },
              { key: "confirmed", label: "Xác nhận" },
              { key: "completed", label: "Hoàn thành" },
              { key: "cancelled", label: "Hủy" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterStatus === f.key ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Bệnh nhân</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Liên hệ</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Ngày - Giờ</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Trạng thái</th>
                  <th className="text-right px-4 py-4 text-xs font-bold text-gray-600 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400">Không có lịch hẹn nào</td>
                  </tr>
                ) : (
                  filtered.map((apt, i) => (
                    <motion.tr
                      key={apt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900 text-sm">{apt.patientName}</p>
                        {apt.reason && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{apt.reason}</p>}
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-700">{apt.patientPhone}</p>
                        {apt.patientEmail && <p className="text-xs text-gray-400">{apt.patientEmail}</p>}
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-gray-900">{apt.appointmentDate}</p>
                        <p className="text-xs text-gray-400">{apt.appointmentTime}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[apt.status] || "bg-gray-100 text-gray-600"}`}>
                          {statusLabels[apt.status] || apt.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {apt.status === "pending" && (
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => updateStatus(apt.id, "confirmed")} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Xác nhận">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => updateStatus(apt.id, "cancelled")} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hủy">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {apt.status === "confirmed" && (
                          <button onClick={() => updateStatus(apt.id, "completed")} className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-100 transition-colors">
                            Hoàn thành
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}