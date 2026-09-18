"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Users,
  Award,
  Microscope,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: ShieldCheck,
    title: "Chuẩn quốc tế JCI",
    desc: "Đạt chứng nhận JCI – tiêu chuẩn bệnh viện quốc tế uy tín nhất thế giới.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Clock,
    title: "Phục vụ 24/7",
    desc: "Đội ngũ y tế trực sẵn 24/7, cấp cứu khẩn cấp không nghỉ lễ tết.",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: Microscope,
    title: "Công nghệ tiên tiến",
    desc: "Trang bị hệ thống MRI 3 Tesla, robot phẫu thuật Da Vinci và CT scan đa lát cắt.",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Users,
    title: "150+ Chuyên gia",
    desc: "Đội ngũ bác sĩ đào tạo tại nước ngoài, nhiều giáo sư và tiến sĩ hàng đầu.",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    icon: HeartHandshake,
    title: "Chăm sóc tận tâm",
    desc: "Bệnh nhân được đặt lên hàng đầu, chăm sóc theo tiêu chuẩn 5 sao.",
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    icon: Award,
    title: "Uy tín 25 năm",
    desc: "Hơn 500,000 bệnh nhân tin tưởng, tỷ lệ hài lòng đạt 98%.",
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
];

const achievements = [
  "Top 5 bệnh viện tốt nhất Việt Nam",
  "Giải thưởng Chất lượng Vàng 5 năm liên tiếp",
  "Chứng nhận ISO 9001:2015",
  "Hội viên Hiệp hội Bệnh viện châu Á",
  "Đối tác chiến lược của Mayo Clinic (Mỹ)",
  "Trung tâm đào tạo y khoa quốc gia",
];

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-hospital.jpg"
                alt="Bệnh viện MedCare"
                width={600}
                height={500}
                className="object-cover w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </div>

            {/* Achievement badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="text-4xl font-black text-blue-600 mb-1">98%</div>
                <div className="text-sm text-gray-600 font-medium">Tỷ lệ hài lòng</div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400 text-sm">⭐</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -top-6 -left-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-5 shadow-xl text-white"
            >
              <div className="text-center">
                <div className="text-3xl font-black mb-1">25+</div>
                <div className="text-sm font-medium opacity-90">Năm kinh nghiệm</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
              Tại sao chọn MedCare
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-5">
              Chúng tôi cam kết{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                chất lượng hàng đầu
              </span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Với hơn 25 năm kinh nghiệm, MedCare không ngừng đổi mới và nâng
              cao chất lượng dịch vụ y tế, mang lại sự hài lòng và tin tưởng
              tuyệt đối từ bệnh nhân.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                    <f.icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{f.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h4 className="font-bold text-gray-900 mb-4 text-sm">Thành tích nổi bật</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {achievements.map((a) => (
                  <div key={a} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
