import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  Heart,
  Globe,
  CheckCircle2,
  ArrowRight,
  Building2,
  Stethoscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Tìm hiểu về Bệnh viện MedCare - hơn 25 năm kinh nghiệm trong lĩnh vực y tế chất lượng cao tại Việt Nam.",
};

const milestones = [
  { year: "1999", event: "Thành lập Bệnh viện MedCare với 100 giường bệnh" },
  { year: "2005", event: "Đạt chứng nhận ISO 9001:2000 về quản lý chất lượng" },
  { year: "2010", event: "Mở rộng lên 300 giường, thành lập 5 chuyên khoa" },
  { year: "2015", event: "Đạt chứng nhận JCI quốc tế lần đầu tiên" },
  { year: "2018", event: "Khai trương Trung tâm Tim mạch Can thiệp" },
  { year: "2020", event: "Triển khai liệu pháp CAR-T trong điều trị ung thư" },
  { year: "2022", event: "Khai trương Cơ sở 2 tại Quận 7, TP.HCM" },
  { year: "2024", event: "Đạt mốc 500,000 bệnh nhân được điều trị thành công" },
];

const leadership = [
  {
    name: "GS.TS. Nguyễn Trọng Hùng",
    role: "Chủ tịch HĐQT",
    desc: "Giáo sư Y khoa với 35 năm kinh nghiệm, nguyên Thứ trưởng Bộ Y tế",
    image: "/images/doctor-1.jpg",
  },
  {
    name: "PGS.TS. Lê Thị Minh Châu",
    role: "Tổng Giám đốc",
    desc: "Tiến sĩ Quản lý Y tế tại Đại học Harvard, 20 năm kinh nghiệm lãnh đạo bệnh viện",
    image: "/images/doctor-2.jpg",
  },
  {
    name: "TS. Trần Đình Phúc",
    role: "Giám đốc Y khoa",
    desc: "Chuyên gia Tim mạch hàng đầu, từng làm việc tại Mayo Clinic (Mỹ) 10 năm",
    image: "/images/doctor-3.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600 border-blue-500 text-white">
            Về chúng tôi
          </Badge>
          <h1 className="text-3xl lg:text-6xl font-black mb-5">
            Bệnh viện MedCare
          </h1>
          <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed">
            Hơn 25 năm đồng hành cùng sức khỏe người Việt, MedCare là biểu
            tượng của chất lượng, uy tín và sự tận tâm trong lĩnh vực y tế.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
              <Heart className="w-7 h-7 text-blue-600 fill-blue-200" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Sứ mệnh
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Mang đến dịch vụ chăm sóc sức khỏe chất lượng quốc tế, đặt
              bệnh nhân làm trung tâm, không ngừng đổi mới và nâng cao chất
              lượng điều trị để nâng cao chất lượng cuộc sống của người dân
              Việt Nam.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-5">
              <Globe className="w-7 h-7 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Tầm nhìn
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Trở thành bệnh viện hàng đầu Đông Nam Á vào năm 2030, là điểm
              đến y tế tin cậy không chỉ cho người Việt Nam mà cả bệnh nhân
              quốc tế, đạt chuẩn mực y tế ngang tầm châu Á – Thái Bình Dương.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { value: "25+", label: "Năm thành lập", icon: Building2 },
            { value: "150+", label: "Bác sĩ chuyên khoa", icon: Stethoscope },
            { value: "500K+", label: "Bệnh nhân điều trị", icon: Users },
            { value: "8", label: "Giải thưởng quốc tế", icon: Award },
          ].map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center"
            >
              <Icon className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <div className="text-4xl font-black mb-1">{value}</div>
              <div className="text-blue-100 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-5">
              Câu chuyện{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                của chúng tôi
              </span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Được thành lập năm 1999, Bệnh viện MedCare bắt đầu hành trình
                với một sứ mệnh đơn giản nhưng mạnh mẽ: mang đến dịch vụ y tế
                chất lượng cao, dễ tiếp cận cho mọi người dân Việt Nam.
              </p>
              <p>
                Qua hơn 25 năm phát triển, MedCare đã trở thành một trong
                những tên tuổi uy tín nhất trong ngành y tế Việt Nam, với hệ
                thống 2 cơ sở tại TP.HCM, hơn 150 bác sĩ chuyên khoa và
                500,000 bệnh nhân được điều trị thành công.
              </p>
              <p>
                Chúng tôi không ngừng đầu tư vào trang thiết bị hiện đại,
                đào tạo nhân lực chất lượng cao và nghiên cứu ứng dụng các
                phương pháp điều trị tiên tiến nhất thế giới.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Đạt chứng nhận JCI quốc tế năm 2015 và 2020",
                "Hợp tác chiến lược với Mayo Clinic, Johns Hopkins",
                "Robot phẫu thuật Da Vinci thế hệ mới nhất",
                "Chương trình đào tạo bác sĩ nội trú đạt chuẩn quốc tế",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-hospital.jpg"
                alt="Bệnh viện MedCare"
                width={600}
                height={450}
                className="object-cover w-full h-[450px]"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            Hành trình{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              phát triển
            </span>
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 hidden md:block" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 inline-block">
                      <p className="text-sm text-gray-600">{m.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 bg-blue-600 rounded-full items-center justify-center text-white font-black text-xs shrink-0 z-10 shadow-lg">
                    {m.year.slice(2)}
                  </div>
                  <div className="flex-1 hidden md:block" />
                  <div className="md:hidden bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">
                    {m.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            Ban lãnh đạo
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((l) => (
              <div
                key={l.name}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={l.image}
                    alt={l.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{l.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mb-2">
                    {l.role}
                  </p>
                  <p className="text-xs text-gray-500">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 text-white text-center">
          <h2 className="text-2xl font-black mb-3">
            Hãy để MedCare chăm sóc sức khỏe của bạn
          </h2>
          <p className="text-blue-100 mb-6">
            Đặt lịch hẹn ngay hôm nay và trải nghiệm dịch vụ y tế chất lượng
            quốc tế.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50" size="lg" asChild>
            <Link href="/dat-lich-hen">
              Đặt lịch hẹn ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
