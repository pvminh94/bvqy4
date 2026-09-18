import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Chuyên khoa",
  description:
    "Khám phá các chuyên khoa y tế tại MedCare với đội ngũ bác sĩ hàng đầu và trang thiết bị hiện đại.",
};

const departments = [
  {
    icon: Heart,
    name: "Tim mạch",
    slug: "tim-mach",
    desc: "Chẩn đoán và điều trị toàn diện bệnh lý tim mạch với công nghệ can thiệp tiên tiến nhất. Đội ngũ gồm các giáo sư, tiến sĩ đầu ngành.",
    color: "from-red-500 to-rose-600",
    services: ["Siêu âm tim", "Điện tâm đồ", "Catheter tim", "Nong mạch vành"],
    doctors: 18,
  },
  {
    icon: Brain,
    name: "Thần kinh",
    slug: "than-kinh",
    desc: "Điều trị chuyên sâu các bệnh lý thần kinh với hệ thống MRI 3 Tesla và đội ngũ chuyên gia hàng đầu.",
    color: "from-purple-500 to-violet-600",
    services: ["Chụp MRI não", "Điện não đồ", "Điều trị đột quỵ", "Phẫu thuật thần kinh"],
    doctors: 12,
  },
  {
    icon: Baby,
    name: "Nhi khoa",
    slug: "nhi-khoa",
    desc: "Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 16 tuổi với môi trường thân thiện.",
    color: "from-green-500 to-emerald-600",
    services: ["Khám sức khỏe", "Tiêm chủng", "Điều trị bệnh", "Dinh dưỡng nhi"],
    doctors: 15,
  },
  {
    icon: Bone,
    name: "Chỉnh hình",
    slug: "chinh-hinh",
    desc: "Phẫu thuật thay khớp, điều trị chấn thương thể thao với robot phẫu thuật hiện đại.",
    color: "from-orange-500 to-amber-600",
    services: ["Thay khớp gối", "Nội soi khớp", "Chấn thương thể thao", "Loãng xương"],
    doctors: 10,
  },
  {
    icon: Microscope,
    name: "Ung bướu",
    slug: "ung-buou",
    desc: "Liệu pháp điều trị ung thư tiên tiến, bao gồm CAR-T cell và miễn dịch học.",
    color: "from-blue-500 to-indigo-600",
    services: ["Hóa trị", "Xạ trị", "Liệu pháp nhắm đích", "CAR-T cell"],
    doctors: 14,
  },
  {
    icon: Activity,
    name: "Sản phụ khoa",
    slug: "san-phu-khoa",
    desc: "Chăm sóc sức khỏe sinh sản, theo dõi thai kỳ và phẫu thuật phụ khoa an toàn.",
    color: "from-pink-500 to-rose-500",
    services: ["Khám thai", "Siêu âm 4D", "Sinh thường/mổ", "Điều trị vô sinh"],
    doctors: 20,
  },
  {
    icon: Eye,
    name: "Mắt",
    slug: "mat",
    desc: "Phẫu thuật Lasik, điều trị đục thủy tinh thể với công nghệ laser femtosecond.",
    color: "from-cyan-500 to-sky-600",
    services: ["Phẫu thuật Lasik", "Đục thủy tinh thể", "Glôcôm", "Võng mạc"],
    doctors: 8,
  },
  {
    icon: Smile,
    name: "Răng hàm mặt",
    slug: "rang-ham-mat",
    desc: "Dịch vụ nha khoa toàn diện từ tẩy trắng đến cấy ghép implant và phẫu thuật hàm mặt.",
    color: "from-teal-500 to-emerald-500",
    services: ["Cấy ghép Implant", "Niềng răng", "Tẩy trắng", "Nhổ răng khôn"],
    doctors: 11,
  },
];

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600 border-blue-500 text-white">
            Hệ thống chuyên khoa
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-black mb-4">
            Chuyên khoa điều trị
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            8 chuyên khoa hàng đầu với đội ngũ hơn 150 bác sĩ chuyên khoa
            giàu kinh nghiệm trong và ngoài nước.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <Link key={dept.slug} href={`/chuyen-khoa/${dept.slug}`}>
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1 p-6">
                <div className="flex items-start gap-5">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {dept.name}
                      </h2>
                      <span className="text-xs text-gray-500">
                        {dept.doctors} bác sĩ
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {dept.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dept.services.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-blue-600 font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
