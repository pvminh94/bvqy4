import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ với MedCare để được tư vấn và hỗ trợ.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Địa chỉ",
    lines: [
      "Cơ sở 1: 123 Đường Lê Lợi, Quận 1, TP.HCM",
      "Cơ sở 2: 456 Đường Nguyễn Văn Linh, Quận 7, TP.HCM",
    ],
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Phone,
    title: "Điện thoại",
    lines: [
      "Hotline: 1800 599 920 (Miễn phí)",
      "Cấp cứu: 115",
      "Đặt lịch: (028) 3999 9000",
    ],
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@medcare.vn", "datlich@medcare.vn", "hotro@medcare.vn"],
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    lines: [
      "Thứ 2 – Thứ 6: 7:00 – 17:00",
      "Thứ 7: 7:00 – 12:00",
      "Chủ nhật: 7:00 – 11:00",
    ],
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600 border-blue-500 text-white">
            Liên hệ với chúng tôi
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-black mb-4">
            Chúng tôi luôn lắng nghe
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Hãy liên hệ nếu bạn cần tư vấn, hỗ trợ hoặc có bất kỳ câu hỏi
            nào về dịch vụ y tế của chúng tôi.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Info Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map(({ icon: Icon, title, lines, color, iconColor }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
              <div className="space-y-1.5">
                {lines.map((l) => (
                  <p key={l} className="text-sm text-gray-600">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Gửi tin nhắn
                </h2>
                <p className="text-sm text-gray-500">
                  Chúng tôi sẽ phản hồi trong vòng 24 giờ
                </p>
              </div>
            </div>
            <ContactForm />
          </div>

          {/* Map placeholder */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-80 lg:h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Bản đồ Google Maps</p>
                <p className="text-sm text-gray-400 mt-1">
                  123 Đường Lê Lợi, Quận 1, TP.HCM
                </p>
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                🚨 Cấp cứu 24/7
              </h3>
              <p className="text-red-700 text-sm mb-4">
                Trong trường hợp khẩn cấp, đừng chờ đợi. Hãy gọi ngay:
              </p>
              <div className="space-y-2">
                <a
                  href="tel:115"
                  className="block bg-red-600 text-white text-center font-bold py-3 rounded-xl hover:bg-red-700 transition-colors"
                >
                  📞 Gọi 115 – Cấp cứu quốc gia
                </a>
                <a
                  href="tel:1800599920"
                  className="block bg-white text-red-600 border border-red-300 text-center font-bold py-3 rounded-xl hover:bg-red-50 transition-colors"
                >
                  📞 1800 599 920 – Hotline MedCare
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
