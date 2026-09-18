"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Eye, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { News } from "@/db/schema";

interface NewsSectionProps {
  news: News[];
}

const categoryColors: Record<string, string> = {
  "Công nghệ y tế": "bg-blue-100 text-blue-700",
  "Sự kiện": "bg-green-100 text-green-700",
  "Y học tiên tiến": "bg-purple-100 text-purple-700",
  "Sức khỏe": "bg-red-100 text-red-700",
  "Tin tức bệnh viện": "bg-orange-100 text-orange-700",
  "Dinh dưỡng": "bg-teal-100 text-teal-700",
};

export default function NewsSection({ news }: NewsSectionProps) {
  const featuredNews = news[0];
  const otherNews = news.slice(1, 5);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <Badge variant="secondary" className="mb-3 px-4 py-1.5 text-sm">
              Tin tức & Sự kiện
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
              Tin tức sức khỏe{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                mới nhất
              </span>
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/tin-tuc">
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured News */}
          {featuredNews && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Link href={`/tin-tuc/${featuredNews.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                  <div className="relative h-64 bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-80 flex items-center justify-center">
                      <div className="text-center text-white px-8">
                        <div className="text-6xl mb-4">📰</div>
                        <p className="text-lg font-semibold opacity-90">Tin nổi bật</p>
                      </div>
                    </div>
                    {featuredNews.category && (
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[featuredNews.category] || "bg-gray-100 text-gray-700"}`}>
                        {featuredNews.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {featuredNews.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredNews.createdAt
                          ? formatDate(featuredNews.createdAt)
                          : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {featuredNews.viewCount?.toLocaleString()} lượt xem
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Other News */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {otherNews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/tin-tuc/${item.slug}`}>
                  <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex gap-4">
                    <div className="w-16 h-16 shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                      <Tag className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {item.category && (
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                          {item.category}
                        </span>
                      )}
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {item.createdAt ? formatDate(item.createdAt) : ""}
                        <span>·</span>
                        <Eye className="w-3 h-3" />
                        {item.viewCount?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
