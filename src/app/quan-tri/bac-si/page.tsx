"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Star, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Doctor {
  id: number;
  name: string;
  title: string | null;
  specialization: string | null;
  experience: number | null;
  rating: string | null;
  isActive: boolean;
}

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      if (data.success) setDoctors(data.doctors || []);
    } catch {}
    setLoading(false);
  };

  const toggleActive = async (id: number, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) {
        setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, isActive: !current } : d)));
        toast({ title: "Thành công", description: `Đã ${!current ? "kích hoạt" : "vô hiệu hóa"} bác sĩ` });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive", description: "Không thể cập nhật" });
    }
  };

  const deleteDoctor = async (id: number) => {
    if (!confirm("Xóa bác sĩ này?")) return;
    try {
      await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
      setDoctors((prev) => prev.filter((d) => d.id !== id));
      toast({ title: "Đã xóa" });
    } catch {
      toast({ title: "Lỗi", variant: "destructive", description: "Không thể xóa" });
    }
  };

  const filtered = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

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
            <h1 className="text-2xl font-black text-gray-900">Quản lý bác sĩ</h1>
            <p className="text-gray-500 text-sm mt-1">{filtered.length} bác sĩ</p>
          </div>
          <Button variant="gradient" asChild>
            <Link href="/quan-tri/bac-si/them-moi">
              <Plus className="w-4 h-4" />
              Thêm bác sĩ
            </Link>
          </Button>
        </div>

        <div className="relative max-w-xs mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Tìm bác sĩ..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Bác sĩ</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Chuyên khoa</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Kinh nghiệm</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Đánh giá</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Trạng thái</th>
                  <th className="text-right px-4 py-4 text-xs font-bold text-gray-600 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((doc, i) => (
                  <motion.tr key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                          {doc.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                          {doc.title && <p className="text-xs text-gray-400">{doc.title}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{doc.specialization || "—"}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{doc.experience || 0} năm</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{doc.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleActive(doc.id, doc.isActive)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          doc.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {doc.isActive ? "Hoạt động" : "Ẩn"}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/quan-tri/bac-si/${doc.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => deleteDoctor(doc.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}