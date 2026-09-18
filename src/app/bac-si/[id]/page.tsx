"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Calendar, Phone, Mail, GraduationCap, Award, ArrowLeft, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface Doctor {
  id: number;
  name: string;
  title: string | null;
  specialization: string | null;
  departmentId: number | null;
  bio: string | null;
  imageUrl: string | null;
  experience: number | null;
  rating: string | null;
  reviewCount: number | null;
  email: string | null;
  phone: string | null;
  education: string | null;
  consultationFee: string | null;
}

export default function DoctorDetailPage() {
  const params = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/doctors/${params.id}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setDoctor(d.doctor); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Không tìm thấy thông tin bác sĩ</p>
          <Link href="/bac-si" className="text-blue-600 mt-2 inline-block">Quay lại</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link href="/bac-si" className="hover:text-white">Bác sĩ</Link>
            <span>/</span>
            <span className="text-white">{doctor.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  {/* Avatar */}
                  <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-6xl font-black text-white">{doctor.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1">
                    {doctor.title && (
                      <Badge variant="secondary" className="mb-2">{doctor.title}</Badge>
                    )}
                    <h1 className="text-3xl font-black text-gray-900 mb-2">{doctor.name}</h1>
                    <p className="text-lg text-blue-600 font-semibold mb-4">{doctor.specialization}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-900 text-lg">{doctor.rating}</span>
                        <span className="text-gray-400">({doctor.reviewCount?.toLocaleString()} đánh giá)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Award className="w-4 h-4" />
                        {doctor.experience} năm kinh nghiệm
                      </div>
                    </div>

                    {doctor.consultationFee && (
                      <div className="mt-4 bg-blue-50 rounded-xl px-4 py-3 inline-block">
                        <span className="text-sm text-gray-600">Phí khám: </span>
                        <span className="font-bold text-blue-600 text-lg">
                          {Number(doctor.consultationFee).toLocaleString("vi-VN")} ₫
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {doctor.bio && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu</h2>
                    <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                  </div>
                )}

                {/* Education */}
                {doctor.education && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      Học vấn & Đào tạo
                    </h2>
                    <div className="space-y-2">
                      {doctor.education.split("\n").map((line, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/bac-si">
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại danh sách
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-4">
                {doctor.phone && (
                  <a href={`tel:${doctor.phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doctor.phone}</p>
                      <p className="text-xs text-gray-400">Điện thoại</p>
                    </div>
                  </a>
                )}
                {doctor.email && (
                  <a href={`mailto:${doctor.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doctor.email}</p>
                      <p className="text-xs text-gray-400">Email</p>
                    </div>
                  </a>
                )}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white"
            >
              <h3 className="font-bold text-lg mb-2">Đặt lịch khám</h3>
              <p className="text-blue-100 text-sm mb-5">Đặt lịch khám với {doctor.name} ngay hôm nay.</p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold" asChild>
                <Link href="/dat-lich-hen">
                  <Calendar className="w-4 h-4" />
                  Đặt lịch ngay
                </Link>
              </Button>
              <a
                href="tel:1800599920"
                className="mt-3 flex items-center justify-center gap-2 border border-white/30 rounded-xl py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                1800 599 920
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}