import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "MedCare – Bệnh viện Đa khoa Quốc tế",
    template: "%s | MedCare Hospital",
  },
  description:
    "Bệnh viện MedCare – Chăm sóc sức khỏe toàn diện với đội ngũ bác sĩ hàng đầu, trang thiết bị hiện đại. Đặt lịch hẹn trực tuyến 24/7.",
  keywords: [
    "bệnh viện",
    "khám bệnh",
    "đặt lịch khám",
    "bác sĩ",
    "y tế",
    "medcare",
    "sức khỏe",
  ],
  openGraph: {
    title: "MedCare – Bệnh viện Đa khoa Quốc tế",
    description: "Chăm sóc sức khỏe tận tâm vì bạn và gia đình",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
