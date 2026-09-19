"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  Stethoscope,
  Building2,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Heart,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Shield,
  Image,
  HelpCircle,
  Star,
} from "lucide-react";

const sidebarItems = [
  { href: "/quan-tri", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/quan-tri/lich-hen", label: "Lịch hẹn", icon: CalendarCheck },
  { href: "/quan-tri/bac-si", label: "Bác sĩ", icon: Stethoscope },
  { href: "/quan-tri/chuyen-khoa", label: "Chuyên khoa", icon: Building2 },
  { href: "/quan-tri/dich-vu", label: "Dịch vụ", icon: Shield },
  { href: "/quan-tri/tin-tuc", label: "Tin tức", icon: FileText },
  { href: "/quan-tri/danh-gia", label: "Đánh giá", icon: Star },
  { href: "/quan-tri/lien-he", label: "Liên hệ", icon: MessageSquare },
  { href: "/quan-tri/nguoi-dung", label: "Người dùng", icon: Users },
  { href: "/quan-tri/hinh-anh", label: "Hình ảnh", icon: Image },
  { href: "/quan-tri/cau-hoi", label: "FAQ", icon: HelpCircle },
  { href: "/quan-tri/cai-dat", label: "Cài đặt", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    // Check token from localStorage
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/quan-tri/dang-nhap");
      return;
    }
    // Get user info from localStorage
    try {
      const userData = localStorage.getItem("admin_user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch {}
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/quan-tri/dang-nhap");
  };

  const roleLabels: Record<string, string> = {
    super_admin: "Quản trị cao cấp",
    admin: "Quản trị viên",
    editor: "Biên tập viên",
    moderator: "Điều hành viên",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/quan-tri" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-bold text-gray-900 hidden sm:block">
                Med<span className="text-blue-600">Care</span> Admin
              </span>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              target="_blank"
            >
              Xem trang
            </Link>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {user.fullName.charAt(0)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{user.fullName}</p>
                    <p className="text-[10px] text-gray-400">{roleLabels[user.role] || user.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? "left-0" : "-left-64 lg:left-0"
          }`}
        >
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/quan-tri" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}