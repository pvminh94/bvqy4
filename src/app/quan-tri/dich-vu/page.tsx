"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string | null;
  departmentId: number;
  price: string | null;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((d) => { if (d.success) setServices(d.services || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

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
            <h1 className="text-2xl font-black text-gray-900">Quản lý dịch vụ</h1>
            <p className="text-gray-500 text-sm mt-1">{filtered.length} dịch vụ</p>
          </div>
          <Button variant="gradient" asChild>
            <Link href="/quan-tri/dich-vu/them-moi"><Plus className="w-4 h-4" />Thêm dịch vụ</Link>
          </Button>
        </div>

        <div className="relative max-w-xs mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Tìm dịch vụ..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Dịch vụ</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Mô tả</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Giá</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Trạng thái</th>
                  <th className="text-right px-4 py-4 text-xs font-bold text-gray-600 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-12 text-gray-400">Không có dịch vụ nào</td></tr>
                ) : (
                  filtered.map((svc, i) => (
                    <motion.tr key={svc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4"><p className="font-semibold text-gray-900 text-sm">{svc.name}</p></td>
                      <td className="px-4 py-4 text-sm text-gray-500 line-clamp-1">{svc.description || "—"}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-blue-600">{svc.price ? Number(svc.price).toLocaleString("vi-VN") + " ₫" : "Liên hệ"}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${svc.isActive ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}>
                          {svc.isActive ? "Hoạt động" : "Ẩn"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
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