"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  isActive: boolean;
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success) setFaqs(data.faqs || []);
    } catch {}
    setLoading(false);
  };

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, category: faq.category || "" });
  };

  const saveEdit = async () => {
    if (!form.question || !form.answer) { toast({ title: "Lỗi", description: "Vui lòng điền đầy đủ", variant: "destructive" }); return; }
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      if (res.ok) {
        await fetchFAQs();
        setEditingId(null);
        toast({ title: "Thành công" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

  const addNew = async () => {
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "Câu hỏi mới", answer: "Nội dung câu trả lời" }),
      });
      if (res.ok) {
        await fetchFAQs();
        toast({ title: "Đã thêm câu hỏi" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  };

  const deleteFaq = async (id: number) => {
    if (!confirm("Xóa câu hỏi này?")) return;
    try {
      await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      setFaqs((prev) => prev.filter((f) => f.id !== id));
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Quản lý câu hỏi</h1>
            <p className="text-gray-500 text-sm mt-1">{faqs.length} câu hỏi</p>
          </div>
          <Button variant="gradient" onClick={addNew}><Plus className="w-4 h-4" />Thêm câu hỏi</Button>
        </div>

        <div className="space-y-3">
          {faqs.length === 0 ? (
            <div className="text-center py-16 text-gray-400">Chưa có câu hỏi nào</div>
          ) : (
            faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {editingId === faq.id ? (
                  <div className="p-5 space-y-3">
                    <Input value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} placeholder="Câu hỏi" />
                    <Textarea value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} placeholder="Câu trả lời" rows={3} />
                    <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Danh mục" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="gradient" onClick={saveEdit}>Lưu</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Hủy</Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <GripVertical className="w-4 h-4 text-gray-300" />
                          <p className="font-semibold text-gray-900">{faq.question}</p>
                        </div>
                        <p className="text-sm text-gray-500 ml-6">{faq.answer}</p>
                        {faq.category && <span className="inline-block mt-2 ml-6 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{faq.category}</span>}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => startEdit(faq)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => deleteFaq(faq.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
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