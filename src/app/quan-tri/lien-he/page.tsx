"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Phone, Calendar, CheckCheck, Trash2, Loader2, Eye } from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) setMessages(data.messages || []);
    } catch {}
    setLoading(false);
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: "PUT" });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch {}
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Xóa tin nhắn này?")) return;
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMsg?.id === id) setSelectedMsg(null);
    } catch {}
  };

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("vi-VN", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
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
        <h1 className="text-2xl font-black text-gray-900 mb-6">Tin nhắn liên hệ</h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {messages.length === 0 ? (
                <div className="p-10 text-center text-gray-400">Chưa có tin nhắn nào</div>
              ) : (
                messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${!msg.isRead ? "bg-blue-50/50" : ""}`}
                    onClick={() => { setSelectedMsg(msg); if (!msg.isRead) markAsRead(msg.id); }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!msg.isRead ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{msg.name}</p>
                          <p className="text-xs text-gray-500">{msg.subject || "(Không có tiêu đề)"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!msg.isRead && <span className="w-2 h-2 bg-blue-600 rounded-full" />}
                        <span className="text-xs text-gray-400">{formatDate(msg.createdAt)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {selectedMsg ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg text-gray-900">Chi tiết tin nhắn</h2>
                  <button onClick={() => deleteMessage(selectedMsg.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{selectedMsg.email}</span>
                  </div>
                  {selectedMsg.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{selectedMsg.phone}</span>
                    </div>
                  )}
                  {selectedMsg.subject && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">Chủ đề</p>
                      <p className="font-semibold text-gray-900 text-sm">{selectedMsg.subject}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Nội dung</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedMsg.message}</p>
                  </div>
                  <p className="text-xs text-gray-400">Gửi lúc: {formatDate(selectedMsg.createdAt)}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 text-gray-400">
                <MessageSquare className="w-16 h-16 mb-4" />
                <p className="font-medium">Chọn tin nhắn để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}