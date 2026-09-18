"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Baby,
  Bone,
  Microscope,
  Eye,
  Smile,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const departments = [
  {
    icon: Heart,
    name: "Tim mạch",
    slug: "tim-mach",
    desc: "Chẩn đoán và điều trị toàn diện bệnh lý tim mạch với công nghệ can thiệp tiên tiến.",
    color: "from-red-500 to-rose-600",
    bgLight: "bg-red-50",
    textColor: "text-red-600",
    services: 24,
    hot: true,
  },
  {
    icon: Brain,
    name: "Thần kinh",
    slug: "than-kinh",
    desc: "Điều trị chuyên sâu các bệnh lý thần kinh trung ương và ngoại biên.",
    color: "from-purple-500 to-violet-600",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
    services: 18,
    hot: false,
  },
  {
    icon: Baby,
    name: "Nhi khoa",
    slug: "nhi-khoa",
    desc: "Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 16 tuổi.",
    color: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    services: 20,
    hot: false,
  },
  {
    icon: Bone,
    name: "Chỉnh hình",
    slug: "chinh-hinh",
    desc: "Phẫu thuật thay khớp, điều trị chấn thương thể thao và bệnh lý xương khớp.",
    color: "from-orange-500 to-amber-600",
    bgLight: "bg-orange-50",
    textColor: "text-orange-600",
    services: 16,
    hot: false,
  },
  {
    icon: Microscope,
    name: "Ung bướu",
    slug: "ung-buou",
    desc: "Liệu pháp điều trị ung thư tiên tiến, bao gồm CAR-T cell và miễn dịch học.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    services: 14,
    hot: true,
  },
  {
    icon: Activity,
    name: "Sản phụ khoa",
    slug: "san-phu-khoa",
    desc: "Chăm sóc sức khỏe sinh sản, theo dõi thai kỳ và phẫu thuật phụ khoa.",
    color: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50",
    textColor: "text-pink-600",
    services: 22,
    hot: false,
  },
  {
    icon: Eye,
    name: "Mắt",
    slug: "mat",
    desc: "Phẫu thuật Lasik, điều trị đục thủy tinh thể và các bệnh lý mắt chuyên sâu.",
    color: "from-cyan-500 to-sky-600",
    bgLight: "bg-cyan-50",
    textColor: "text-cyan-600",
    services: 12,
    hot: false,
  },
  {
    icon: Smile,
    name: "Răng hàm mặt",
    slug: "rang-ham-mat",
    desc: "Dịch vụ nha khoa toàn diện từ tẩy trắng đến phẫu thuật hàm mặt.",
    color: "from-teal-500 to-emerald-500",
    bgLight: "bg-teal-50",
    textColor: "text-teal-600",
    services: 15,
    hot: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DepartmentsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
            Chuyên khoa điều trị
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-5">
            Hệ thống{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              chuyên khoa toàn diện
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            MedCare cung cấp dịch vụ y tế chuyên sâu với 8 chuyên khoa hàng
            đầu, được trang bị thiết bị hiện đại và đội ngũ chuyên gia giàu
            kinh nghiệm.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {departments.map((dept) => (
            <motion.div key={dept.slug} variants={itemVariants}>
              <Link href={`/chuyen-khoa/${dept.slug}`}>
                <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1 h-full relative overflow-hidden">
                  {/* Hot Badge */}
                  {dept.hot && (
                    <span className="absolute top-3 right-3">
                      <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
                        🔥 Hot
                      </Badge>
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <dept.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {dept.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${dept.textColor} ${dept.bgLight} px-2.5 py-1 rounded-full`}>
                      {dept.services} dịch vụ
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${dept.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/chuyen-khoa"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            Xem tất cả chuyên khoa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
