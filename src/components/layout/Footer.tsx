import React from "react";
import Link from "next/link";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Share2,
  PlayCircle,
  Camera,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white block leading-tight">
                  Med<span className="text-blue-400">Care</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                  Bệnh viện đa khoa
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Bệnh viện MedCare – Nơi hội tụ đội ngũ chuyên gia y tế hàng đầu,
              trang thiết bị hiện đại, cam kết mang lại chất lượng chăm sóc sức
              khỏe tốt nhất cho người dân Việt Nam.
            </p>
            <div className="flex gap-3">
              {[
              { Icon: Share2, href: "#", label: "Facebook" },
              { Icon: PlayCircle, href: "#", label: "Youtube" },
              { Icon: Camera, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Liên kết nhanh</h3>
            <ul className="space-y-3">
              {[
                { href: "/gioi-thieu", label: "Giới thiệu bệnh viện" },
                { href: "/chuyen-khoa", label: "Chuyên khoa" },
                { href: "/bac-si", label: "Đội ngũ bác sĩ" },
                { href: "/dich-vu", label: "Dịch vụ & Báo giá" },
                { href: "/dat-lich-hen", label: "Đặt lịch hẹn" },
                { href: "/tin-tuc", label: "Tin tức sức khỏe" },
                { href: "/tuyen-dung", label: "Tuyển dụng" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chuyên khoa */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Chuyên khoa</h3>
            <ul className="space-y-3">
              {[
                { href: "/chuyen-khoa/tim-mach", label: "Tim mạch" },
                { href: "/chuyen-khoa/than-kinh", label: "Thần kinh" },
                { href: "/chuyen-khoa/nhi-khoa", label: "Nhi khoa" },
                { href: "/chuyen-khoa/chinh-hinh", label: "Chỉnh hình" },
                { href: "/chuyen-khoa/ung-buou", label: "Ung bướu" },
                { href: "/chuyen-khoa/san-phu-khoa", label: "Sản phụ khoa" },
                { href: "/chuyen-khoa/mat", label: "Mắt" },
                { href: "/chuyen-khoa/rang-ham-mat", label: "Răng hàm mặt" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Thông tin liên hệ</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p className="font-medium text-gray-300">Cơ sở 1:</p>
                  <p>123 Đường Lê Lợi, Quận 1, TP.HCM</p>
                  <p className="font-medium text-gray-300 mt-2">Cơ sở 2:</p>
                  <p>456 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-sm text-gray-400">
                  <a href="tel:1800599920" className="hover:text-blue-400 transition-colors font-medium text-gray-300">
                    1800 599 920
                  </a>
                  <span className="text-gray-500"> (Miễn phí)</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href="mailto:info@medcare.vn"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  info@medcare.vn
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p>Thứ 2 – Thứ 7: 7:00 – 17:00</p>
                  <p>Chủ nhật: 7:00 – 12:00</p>
                  <p className="text-blue-400 font-medium">Cấp cứu: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MedCare Hospital. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-5 text-sm text-gray-500">
            <Link href="/chinh-sach-bao-mat" className="hover:text-gray-300 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan" className="hover:text-gray-300 transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link href="/sitemap" className="hover:text-gray-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
