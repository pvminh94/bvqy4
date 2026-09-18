"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Star, CheckCircle2, XCircle, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: number;
  patientName: string;
  rating: number;
  content: string;
  treatmentType: string | null;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((d) => { if (d.success) setTestimonials(d.testimonials || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleApproval = async (id: number, current: boolean) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved: !current }),
      });
      if (res.ok) {
        setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, isApproved: !current } : t)));
        toast({ title: "Thành công" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm("Xóa đánh giá này?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        toast({ title: "Đã xóa" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

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
        <h1 className="text-2xl font-black text-gray-900 mb-6">Quản lý đánh giá</h1>

        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <div className="text-center py-16 text-gray-400">Chưa có đánh giá nào</div>
          ) : (
            testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.patientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.patientName}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleApproval(t.id, t.isApproved)}
                      className={`p-1.5 rounded-lg transition-colors ${t.isApproved ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}
                      title={t.isApproved ? "Ẩn đánh giá" : "Phê duyệt"}
                    >
                      {t.isApproved ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </button>
                    <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">"{t.content}"</p>
                {t.treatmentType && <p className="text-xs text-blue-600 font-medium">{t.treatmentType}</p>}
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span>Ngày: {new Date(t.createdAt).toLocaleDateString("vi-VN")}</span>
                  <span className={`px-2 py-0.5 rounded-full ${t.isApproved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    {t.isApproved ? "Đã duyệt" : "Chờ duyệt"}
                  </span>
                  {t.isFeatured && <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">Nổi bật</span>}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}