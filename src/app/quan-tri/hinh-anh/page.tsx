"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Plus, Trash2, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface GalleryItem {
  id: number;
  title: string | null;
  imageUrl: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success) setItems(data.items || []);
    } catch {}
    setLoading(false);
  };

  const addItem = async () => {
    if (!newUrl) { toast({ title: "Lỗi", description: "Vui lòng nhập URL hình ảnh", variant: "destructive" }); return; }
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: newUrl, title: newTitle }),
      });
      if (res.ok) {
        await fetchItems();
        setNewUrl("");
        setNewTitle("");
        toast({ title: "Thành công", description: "Đã thêm hình ảnh" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Xóa hình ảnh này?")) return;
    try {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast({ title: "Đã xóa" });
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
        <h1 className="text-2xl font-black text-gray-900 mb-6">Quản lý hình ảnh</h1>

        {/* Add Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">Thêm hình ảnh mới</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="URL hình ảnh" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="flex-1" />
            <Input placeholder="Tiêu đề (không bắt buộc)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="flex-1" />
            <Button variant="gradient" onClick={addItem}><Plus className="w-4 h-4" />Thêm</Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400">Chưa có hình ảnh nào</div>
          ) : (
            items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden aspect-square"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-blue-200" />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => deleteItem(item.id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium truncate">{item.title}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}