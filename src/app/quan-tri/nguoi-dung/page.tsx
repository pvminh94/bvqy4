"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Shield, Loader2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

const roleColors: Record<string, string> = {
  super_admin: "bg-purple-100 text-purple-700",
  admin: "bg-blue-100 text-blue-700",
  editor: "bg-green-100 text-green-700",
  moderator: "bg-amber-100 text-amber-700",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
    } catch {}
    setLoading(false);
  };

  const toggleActive = async (id: number, current: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !current }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: !current } : u)));
        toast({ title: "Thành công" });
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
        <h1 className="text-2xl font-black text-gray-900 mb-6">Quản lý người dùng</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Người dùng</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Vai trò</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Trạng thái</th>
                <th className="text-left px-4 py-4 text-xs font-bold text-gray-600 uppercase">Đăng nhập cuối</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.fullName}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[user.role] || "bg-gray-100"}`}>
                      {user.role === "super_admin" ? "Super Admin" : user.role === "admin" ? "Admin" : user.role === "editor" ? "Biên tập" : "Điều hành"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleActive(user.id, user.isActive)} className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {user.isActive ? "Hoạt động" : "Khóa"}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString("vi-VN") : "Chưa đăng nhập"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}