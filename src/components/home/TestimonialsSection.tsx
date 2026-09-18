"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Testimonial } from "@/db/schema";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-700/50 text-blue-200 border border-blue-600/30">
            Đánh giá bệnh nhân
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-5">
            Bệnh nhân nói gì{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              về chúng tôi
            </span>
          </h2>
          <p className="text-lg text-blue-200/70 max-w-2xl mx-auto">
            Hàng nghìn bệnh nhân đã tin tưởng và hài lòng với dịch vụ tại
            MedCare. Đây là những chia sẻ thực tế của họ.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-400/50" />
              </div>

              <p className="text-blue-100 text-sm leading-relaxed mb-5 italic">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {t.patientName}
                    </p>
                    {t.treatmentType && (
                      <p className="text-xs text-blue-300">{t.treatmentType}</p>
                    )}
                  </div>
                </div>
                <div className="text-xs text-blue-400 font-medium bg-blue-800/50 px-2 py-1 rounded-full">
                  ✓ Đã xác minh
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-7 h-7 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <div className="text-5xl font-black text-white mb-2">4.9/5.0</div>
          <p className="text-blue-200">
            Đánh giá trung bình từ{" "}
            <span className="text-white font-bold">10,000+</span> bệnh nhân
          </p>
        </motion.div>
      </div>
    </section>
  );
}
