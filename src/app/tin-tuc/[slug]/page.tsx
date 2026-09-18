import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Calendar, Eye, ArrowLeft, Share2, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [article] = await db
    .select()
    .from(news)
    .where(eq(news.slug, slug))
    .limit(1);

  if (!article) return { title: "Bài viết không tìm thấy" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  const [article] = await db
    .select()
    .from(news)
    .where(eq(news.slug, slug))
    .limit(1);

  if (!article) notFound();

  const relatedNews = await db
    .select()
    .from(news)
    .where(eq(news.isPublished, true))
    .limit(3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors">
            Tin tức
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">
            {article.title}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Featured Image placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <div className="text-8xl">📰</div>
              </div>

              <div className="p-8">
                {article.category && (
                  <Badge variant="secondary" className="mb-4">
                    <Tag className="w-3 h-3 mr-1" />
                    {article.category}
                  </Badge>
                )}
                <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {article.createdAt ? formatDate(article.createdAt) : ""}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {article.viewCount?.toLocaleString()} lượt xem
                  </span>
                  {article.author && (
                    <span className="font-medium text-gray-700">
                      Tác giả: {article.author}
                    </span>
                  )}
                </div>

                {article.excerpt && (
                  <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6 italic border-l-4 border-blue-500 pl-4">
                    {article.excerpt}
                  </p>
                )}

                <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                  {article.content?.split("\n").map((p, i) => (
                    <p key={i} className="mb-4">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Share */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-700">
                    Chia sẻ:
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (typeof navigator !== "undefined") {
                        navigator.share?.({ title: article.title, url: window.location.href });
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/tin-tuc">
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại danh sách
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
              <div className="space-y-4">
                {relatedNews
                  .filter((n) => n.slug !== slug)
                  .slice(0, 3)
                  .map((n) => (
                    <Link key={n.id} href={`/tin-tuc/${n.slug}`}>
                      <div className="flex gap-3 group">
                        <div className="w-16 h-16 shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                          <Tag className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {n.createdAt ? formatDate(n.createdAt) : ""}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Cần tư vấn y tế?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Đặt lịch khám với bác sĩ chuyên khoa ngay hôm nay.
              </p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/dat-lich-hen">Đặt lịch hẹn</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
