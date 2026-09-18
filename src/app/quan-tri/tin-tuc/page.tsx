"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (data.success) setNews(data.news || []);
    } catch {}
    setLoading(false);
  };

  const togglePublish = async (id: number, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (res.ok) {
        setNews((prev) => prev.map((n) => (n.id === id ? { ...n, isPublished: !current } : n)));
        toast({ title: "Thành công" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

  const deleteNews = async (id: number) => {
    if (!confirm("Xóa bài viết này?")) return;
    try {
      await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      setNews((prev) => prev.filter((n) => n.id !== id));
      toast({ title: "Đã xóa" });
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("vi-VN");

  const filtered = news.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));

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
            <h1 className="text-2xl font-black text-gray-900">Quản lý tin tức</h1>
            <p className="text-gray-500 text-sm mt-1">{filtered.length} bài viết</p>
          </div>
          <Button variant="gradient" asChild>
            <Link href="/quan-tri/tin-tuc/them-moi"><Plus className="w-4 h-4" />Thêm bài viết</Link>
          </Button>
        </div>

        <div className="relative max-w-xs mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Tìm bài viết..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Tiêu đề</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Danh mục</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Lượt xem</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Ngày</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Trạng thái</th>
                  <th className="text-right px-4 py-4 text-xs font-bold text-gray-600 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item, i) => (
                  <motion.tr key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.title}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{item.category || "—"}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{item.viewCount.toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => togglePublish(item.id, item.isPublished)} className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.isPublished ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}>
                        {item.isPublished ? "Đã xuất bản" : "Bản nháp"}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/quan-tri/tin-tuc/${item.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></Link>
                        <button onClick={() => deleteNews(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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