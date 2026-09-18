"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Phone, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-3xl overflow-hidden relative"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-5">
                <Clock className="w-4 h-4" />
                Đặt lịch nhanh trong 60 giây
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 max-w-xl">
                Sẵn sàng chăm sóc sức khỏe của bạn ngay hôm nay?
              </h2>
              <p className="text-blue-100 text-lg max-w-xl">
                Đặt lịch hẹn trực tuyến dễ dàng, nhận xác nhận ngay qua SMS.
                Không cần xếp hàng chờ đợi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <Button
                size="xl"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl font-bold"
                asChild
              >
                <Link href="/dat-lich-hen">
                  <Calendar className="w-5 h-5" />
                  Đặt lịch hẹn ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/20 hover:text-white hover:border-white"
                asChild
              >
                <a href="tel:1800599920">
                  <Phone className="w-5 h-5" />
                  Gọi 1800 599 920
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
