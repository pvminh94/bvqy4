"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Phone, ArrowRight, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/db/schema";

interface DoctorsSectionProps {
  doctors: Doctor[];
}

export default function DoctorsSection({ doctors }: DoctorsSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
            Đội ngũ chuyên gia
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-5">
            Bác sĩ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              hàng đầu
            </span>{" "}
            của chúng tôi
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Đội ngũ bác sĩ của MedCare được đào tạo bài bản tại các trường y
            danh tiếng trong và ngoài nước, với nhiều năm kinh nghiệm lâm sàng.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1">
                {/* Doctor Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                  {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-600">
                          {doctor.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Overlay Buttons */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Button size="sm" variant="gradient" asChild>
                      <Link href="/dat-lich-hen">Đặt lịch</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white text-white hover:bg-white/20"
                      asChild
                    >
                      <Link href={`/bac-si/${doctor.id}`}>Xem hồ sơ</Link>
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      {doctor.title && (
                        <Badge variant="secondary" className="text-[10px] mb-1">
                          {doctor.title}
                        </Badge>
                      )}
                      <h3 className="font-bold text-gray-900 text-base leading-tight">
                        {doctor.name}
                      </h3>
                    </div>
                    <Award className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  </div>

                  <p className="text-sm text-blue-600 font-medium mb-3">
                    {doctor.specialization}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">
                        {doctor.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({doctor.reviewCount?.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {doctor.experience} năm KN
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/bac-si">
              Xem tất cả bác sĩ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
