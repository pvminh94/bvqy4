"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Department {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
}

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", description: "", icon: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/departments");
      const data = await res.json();
      if (data.success) setDepartments(data.departments || []);
    } catch {}
    setLoading(false);
  };

  const startEdit = (dept: Department) => {
    setEditingId(dept.id);
    setForm({ name: dept.name, description: dept.description || "", icon: dept.icon || "" });
  };

  const saveEdit = async () => {
    if (!form.name) { toast({ title: "Lỗi", description: "Tên chuyên khoa không được để trống", variant: "destructive" }); return; }
    try {
      const res = await fetch(`/api/admin/departments/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await fetchDepartments();
        setEditingId(null);
        toast({ title: "Thành công", description: "Đã cập nhật chuyên khoa" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive", description: "Không thể cập nhật" });
    }
  };

  const deleteDept = async (id: number) => {
    if (!confirm("Xóa chuyên khoa này?")) return;
    try {
      await fetch(`/api/admin/departments/${id}`, { method: "DELETE" });
      setDepartments((prev) => prev.filter((d) => d.id !== id));
      toast({ title: "Đã xóa" });
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

  const addNew = async () => {
    const name = prompt("Tên chuyên khoa mới:");
    if (!name) return;
    try {
      const res = await fetch("/api/admin/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        await fetchDepartments();
        toast({ title: "Thành công", description: "Đã thêm chuyên khoa" });
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Quản lý chuyên khoa</h1>
            <p className="text-gray-500 text-sm mt-1">{departments.length} chuyên khoa</p>
          </div>
          <Button variant="gradient" onClick={addNew}><Plus className="w-4 h-4" />Thêm chuyên khoa</Button>
        </div>

        <div className="grid gap-4">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              {editingId === dept.id ? (
                <div className="space-y-3">
                  <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Tên chuyên khoa" />
                  <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Mô tả" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="gradient" onClick={saveEdit}>Lưu</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Hủy</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                      {dept.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{dept.name}</p>
                      <p className="text-xs text-gray-400">slug: {dept.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${dept.isActive ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}>
                      {dept.isActive ? "Hoạt động" : "Ẩn"}
                    </span>
                    <button onClick={() => startEdit(dept)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteDept(dept.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}