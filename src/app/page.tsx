export const dynamic = "force-dynamic";

import { db } from "@/db";
import { doctors, testimonials, news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { seedDatabase } from "@/lib/seed";
import { cacheGet, cacheSet, CACHE_KEYS } from "@/lib/redis";
import HeroSection from "@/components/home/HeroSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import DoctorsSection from "@/components/home/DoctorsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsSection from "@/components/home/NewsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CTASection from "@/components/home/CTASection";
import type { Doctor, Testimonial, News } from "@/db/schema";

async function getHomeData() {
  // Try cache first
  const cacheKey = "hospital:home:data";
  const cached = await cacheGet<{
    doctorsList: Doctor[];
    testimonialsList: Testimonial[];
    newsList: News[];
  }>(cacheKey);

  if (cached) return cached;

  // Seed if needed
  await seedDatabase();

  const [doctorsList, testimonialsList, newsList] = await Promise.all([
    db.select().from(doctors).where(eq(doctors.isActive, true)).limit(4),
    db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .limit(6),
    db.select().from(news).where(eq(news.isPublished, true)).limit(6),
  ]);

  const data = { doctorsList, testimonialsList, newsList };
  await cacheSet(cacheKey, data, 300);

  return data;
}

export default async function HomePage() {
  const { doctorsList, testimonialsList, newsList } = await getHomeData();

  return (
    <>
      <HeroSection />
      <DepartmentsSection />
      <WhyUsSection />
      <DoctorsSection doctors={doctorsList} />
      <TestimonialsSection testimonials={testimonialsList} />
      <NewsSection news={newsList} />
      <CTASection />
    </>
  );
}
