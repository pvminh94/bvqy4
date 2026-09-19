import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Calendar, Eye, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cacheGet, cacheSet, CACHE_KEYS } from "@/lib/redis";
import type { News } from "@/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tin tức sức khỏe",
  description:
    "Cập nhật tin tức sức khỏe, y tế mới nhất từ MedCare. Kiến thức y khoa hữu ích từ đội ngũ bác sĩ chuyên gia.",
};

const categoryColors: Record<string, string> = {
  "Công nghệ y tế": "bg-blue-100 text-blue-700",
  "Sự kiện": "bg-green-100 text-green-700",
  "Y học tiên tiến": "bg-purple-100 text-purple-700",
  "Sức khỏe": "bg-red-100 text-red-700",
  "Tin tức bệnh viện": "bg-orange-100 text-orange-700",
  "Dinh dưỡng": "bg-teal-100 text-teal-700",
};

async function getNews() {
  if (!db) return [];
  const cached = await cacheGet<News[]>(CACHE_KEYS.news);
  if (cached) return cached;

  const data = await db
    .select()
    .from(news)
    .where(eq(news.isPublished, true));

  await cacheSet(CACHE_KEYS.news, data, 300);
  return data;
}

export default async function NewsPage() {
  const newsList = await getNews();
  const featured = newsList[0];
  const rest = newsList.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600 border-blue-500 text-white">
            Tin tức & Sức khỏe
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-black mb-4">
            Tin tức sức khỏe
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Cập nhật kiến thức y tế, sức khỏe từ đội ngũ bác sĩ chuyên khoa
            hàng đầu tại MedCare.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured */}
        {featured && (
          <div className="mb-12">
            <Link href={`/tin-tuc/${featured.slug}`}>
              <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-80 bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center relative overflow-hidden">
                    <div className="text-8xl">📰</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent" />
                    {featured.category && (
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                          categoryColors[featured.category] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        🔥 Nổi bật
                      </span>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    {featured.category && (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                          categoryColors[featured.category] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {featured.category}
                      </span>
                    )}
                    <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featured.createdAt ? formatDate(featured.createdAt) : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {featured.viewCount?.toLocaleString()} lượt xem
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Đọc tiếp
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((item) => (
            <Link key={item.id} href={`/tin-tuc/${item.slug}`}>
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1 h-full">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center relative">
                  <Tag className="w-16 h-16 text-blue-200" />
                  {item.category && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                        categoryColors[item.category] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.createdAt ? formatDate(item.createdAt) : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.viewCount?.toLocaleString()}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
