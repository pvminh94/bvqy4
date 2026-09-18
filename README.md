# 🏥 MedCare Hospital – Hệ thống Quản lý Bệnh viện Đa khoa Quốc tế

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL 16" />
  <img src="https://img.shields.io/badge/Redis-7-DC382D?style=flat-square&logo=redis" alt="Redis 7" />
  <img src="https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker" alt="Docker" />
</p>

## 🌟 Tính năng nổi bật

### 🔹 Giao diện Frontend
- **Trang chủ chuyên nghiệp**: Hero section với animation, số liệu thống kê
- **Danh sách chuyên khoa**: 8 chuyên khoa với thiết kế card hiện đại
- **Đội ngũ bác sĩ**: Hiển thị thông tin chi tiết, đánh giá, kinh nghiệm
- **Đặt lịch hẹn**: Form multi-step, chọn ngày/giờ, chuyên khoa, bác sĩ
- **Tin tức sức khỏe**: Bài viết chuyên môn, phân loại theo danh mục
- **Đánh giá bệnh nhân**: Testimonials với rating sao
- **Liên hệ**: Form gửi tin nhắn, thông tin cơ sở
- **Responsive 100%**: Tương thích mọi thiết bị (mobile, tablet, desktop)
- **Animation mượt mà**: Framer Motion cho mọi hiệu ứng

### 🔹 Trang Quản trị (Admin)
- **Dashboard**: Thống kê tổng quan (lịch hẹn, bác sĩ, bệnh nhân, tin tức)
- **Quản lý lịch hẹn**: Xem, xác nhận, hủy, hoàn thành
- **Quản lý bác sĩ**: Thêm, sửa, xóa, kích hoạt/vô hiệu
- **Quản lý chuyên khoa**: Thêm, sửa, xóa
- **Quản lý tin tức**: CRUD bài viết, xuất bản/bản nháp
- **Quản lý dịch vụ**: Danh sách dịch vụ và bảng giá
- **Quản lý đánh giá**: Phê duyệt, xóa feedback bệnh nhân
- **Quản lý người dùng**: Phân quyền admin (super_admin, admin, editor)
- **Quản lý hình ảnh**: Upload/thêm URL hình ảnh gallery
- **Quản lý câu hỏi**: FAQ động
- **Cài đặt hệ thống**: Cấu hình tên site, hotline, địa chỉ, social links
- **Xác thực JWT**: Đăng nhập an toàn với cookie httpOnly

### 🔹 Công nghệ
| Công nghệ | Mục đích |
|-----------|----------|
| **Next.js 16** | Framework React full-stack |
| **React 19** | Thư viện UI |
| **Tailwind CSS v4** | CSS Utility Framework |
| **Framer Motion** | Animation |
| **PostgreSQL 16** | Cơ sở dữ liệu chính |
| **Redis 7** | Cache (ioredis) |
| **Drizzle ORM** | Type-safe database queries |
| **Radix UI** | UI Components (accessible) |
| **Lucide Icons** | Icons |
| **JWT + bcryptjs** | Admin authentication |
| **Zod** | Form validation |
| **Docker** | Container deployment |
| **Nginx** | Reverse proxy + caching |

## 🚀 Quick Start

### Yêu cầu
- Node.js 20+
- Docker & Docker Compose (cho production)

### Cài đặt & Chạy Development

```bash
# Clone repository
git clone https://github.com/pvminh94/bvqy4.git
cd bvqy4

# Cài đặt dependencies
npm install

# Khởi tạo database (cần PostgreSQL chạy cục bộ)
# Tạo database: medcare_db
npm run db:push

# Seed dữ liệu mẫu
npm run db:seed

# Chạy development server
npm run dev
```

### Chạy với Docker (Production)

```bash
# Build và chạy tất cả services
docker compose up -d

# Truy cập:
# - Website: http://localhost
# - Admin: http://localhost/quan-tri
#   - Tài khoản: admin
#   - Mật khẩu: admin123

# Dừng services
docker compose down

# Xóa dữ liệu (bao gồm volumes)
docker compose down -v
```

## 📋 Cấu trúc thư mục

```
src/
├── app/
│   ├── api/
│   │   ├── admin/         # API quản trị (auth, dashboard, CRUD)
│   │   ├── appointments/  # API đặt lịch hẹn
│   │   ├── contact/       # API liên hệ
│   │   ├── departments/   # API chuyên khoa
│   │   ├── doctors/       # API bác sĩ
│   │   └── health/        # API health check
│   ├── quan-tri/          # Trang quản trị
│   │   ├── dang-nhap/     # Đăng nhập
│   │   ├── page.tsx       # Dashboard
│   │   ├── lich-hen/      # Quản lý lịch hẹn
│   │   ├── bac-si/        # Quản lý bác sĩ
│   │   ├── chuyen-khoa/   # Quản lý chuyên khoa
│   │   ├── tin-tuc/       # Quản lý tin tức
│   │   ├── dich-vu/       # Quản lý dịch vụ
│   │   ├── danh-gia/      # Quản lý đánh giá
│   │   ├── nguoi-dung/    # Quản lý người dùng
│   │   ├── hinh-anh/      # Quản lý hình ảnh
│   │   ├── cau-hoi/       # Quản lý FAQ
│   │   ├── lien-he/       # Quản lý liên hệ
│   │   └── cai-dat/       # Cài đặt hệ thống
│   ├── bac-si/            # Trang bác sĩ public
│   ├── chuyen-khoa/       # Trang chuyên khoa public
│   ├── dat-lich-hen/      # Trang đặt lịch hẹn
│   ├── dich-vu/           # Trang dịch vụ
│   ├── gioi-thieu/        # Trang giới thiệu
│   ├── lien-he/           # Trang liên hệ
│   └── tin-tuc/           # Trang tin tức
├── components/
│   ├── admin/             # Component quản trị (AdminLayout)
│   ├── appointment/       # Form đặt lịch hẹn
│   ├── contact/           # Form liên hệ
│   ├── home/              # Component trang chủ
│   ├── layout/            # Navbar, Footer
│   └── ui/                # UI components (shadcn/ui style)
├── db/
│   ├── index.ts           # Kết nối database
│   └── schema.ts          # Schema Drizzle ORM
├── hooks/
│   └── use-toast.ts       # Toast notification hook
└── lib/
    ├── auth.ts            # JWT Auth utilities
    ├── redis.ts           # Redis cache client
    ├── seed.ts            # Seed dữ liệu
    └── utils.ts           # Utility functions
```

## 🔐 Admin Panel

| URL | Mô tả |
|-----|-------|
| `/quan-tri` | Dashboard tổng quan |
| `/quan-tri/dang-nhap` | Đăng nhập admin |
| `/quan-tri/lich-hen` | Quản lý lịch hẹn |
| `/quan-tri/bac-si` | Quản lý bác sĩ |
| `/quan-tri/chuyen-khoa` | Quản lý chuyên khoa |
| `/quan-tri/tin-tuc` | Quản lý tin tức |
| `/quan-tri/dich-vu` | Quản lý dịch vụ |
| `/quan-tri/danh-gia` | Quản lý đánh giá |
| `/quan-tri/nguoi-dung` | Quản lý người dùng |
| `/quan-tri/hinh-anh` | Quản lý hình ảnh |
| `/quan-tri/cau-hoi` | Quản lý FAQ |
| `/quan-tri/lien-he` | Quản lý liên hệ |
| `/quan-tri/cai-dat` | Cài đặt hệ thống |

**Tài khoản mặc định**: `admin` / `admin123`

## ☁️ Deploy lên GitHub & Docker Hub

```bash
# 1. Tạo repository trên GitHub
# 2. Push code
git remote add origin https://github.com/pvminh94/bvqy4.git
git branch -M main
git push -u origin main

# 3. Build Docker image
docker build -t pvminh94/bvqy4:latest .

# 4. Push lên Docker Hub
docker login
docker push pvminh94/bvqy4:latest

# 5. Triển khai với Docker Compose
docker compose up -d
```

## 📄 License

MIT License - Có thể sử dụng và tùy chỉnh tự do.

---

<p align="center">
  <strong>MedCare Hospital</strong> — Chăm sóc sức khỏe tận tâm vì bạn và gia đình ❤️
</p>