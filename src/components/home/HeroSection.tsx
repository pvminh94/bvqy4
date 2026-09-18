"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Calendar,
  Award,
  Users,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "25+", label: "Năm kinh nghiệm", icon: Award },
  { value: "150+", label: "Bác sĩ chuyên khoa", icon: Stethoscope },
  { value: "500K+", label: "Bệnh nhân đã khám", icon: Users },
  { value: "98%", label: "Hài lòng bệnh nhân", icon: Star },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/hero-hospital.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-transparent" />
        {/* Animated circles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-40 w-64 h-64 bg-cyan-400 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-sm border border-blue-600/30 rounded-full px-4 py-2 text-sm text-blue-200 mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Bệnh viện đạt chuẩn JCI quốc tế
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6"
            >
              Chăm sóc sức khỏe{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                tận tâm
              </span>
              <br />
              vì bạn và gia đình
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-blue-100/80 leading-relaxed mb-8 max-w-xl"
            >
              MedCare – Hơn 25 năm uy tín trong lĩnh vực y tế, với đội ngũ
              chuyên gia hàng đầu và trang thiết bị hiện đại nhất, chúng tôi
              cam kết mang lại dịch vụ chăm sóc sức khỏe chất lượng quốc tế.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button size="xl" variant="gradient" asChild>
                <Link href="/dat-lich-hen">
                  <Calendar className="w-5 h-5" />
                  Đặt lịch hẹn ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50"
                asChild
              >
                <a href="tel:1800599920">
                  <Phone className="w-5 h-5" />
                  1800 599 920
                </a>
              </Button>
            </motion.div>

            {/* Emergency Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 max-w-fit"
            >
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm text-red-200 font-medium">
                Cấp cứu 24/7 — Hotline:{" "}
                <a href="tel:115" className="text-red-300 font-bold hover:text-white">
                  115
                </a>
              </span>
            </motion.div>
          </div>

          {/* Right - Image + Floating Cards */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src="/images/hero-hospital.jpg"
                  alt="MedCare Hospital"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -left-10 top-20 bg-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 max-w-[200px]"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">JCI Accredited</p>
                  <p className="text-xs text-gray-500">Chuẩn quốc tế</p>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-8 bottom-24 bg-white rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="font-bold text-gray-900 text-sm">500,000+</p>
                <p className="text-xs text-gray-500">Bệnh nhân tin tưởng</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/15 transition-colors"
            >
              <stat.icon className="w-7 h-7 text-blue-300 mx-auto mb-3" />
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
