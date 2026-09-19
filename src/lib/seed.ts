import { db } from "@/db";
import {
  departments,
  doctors,
  testimonials,
  news,
  services,
  siteSettings,
  homeSections,
  banners,
  faqs,
  users,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  if (!db) {
    console.log("Database not available, skipping seed");
    return;
  }

  try {
    // Check if already seeded
    const existingDepts = await db.select().from(departments).limit(1);
    if (existingDepts.length > 0) return;

    // Seed Site Settings
    await db.insert(siteSettings).values([
      { key: "site_name", value: "MedCare", type: "text", group: "general", description: "Tên website" },
      { key: "site_description", value: "Bệnh viện Đa khoa Quốc tế", type: "text", group: "general" },
      { key: "hotline", value: "1800 599 920", type: "text", group: "contact" },
      { key: "emergency_phone", value: "115", type: "text", group: "contact" },
      { key: "email", value: "info@medcare.vn", type: "text", group: "contact" },
      { key: "address_1", value: "123 Đường Lê Lợi, Quận 1, TP.HCM", type: "text", group: "contact" },
      { key: "address_2", value: "456 Đường Nguyễn Văn Linh, Quận 7, TP.HCM", type: "text", group: "contact" },
      { key: "working_hours", value: "Thứ 2 - Thứ 7: 7:00 - 17:00 | CN: 7:00 - 12:00", type: "text", group: "general" },
      { key: "primary_color", value: "#2563eb", type: "text", group: "appearance" },
      { key: "facebook_url", value: "https://facebook.com/medcare", type: "text", group: "social" },
      { key: "youtube_url", value: "https://youtube.com/@medcare", type: "text", group: "social" },
      { key: "instagram_url", value: "https://instagram.com/medcare", type: "text", group: "social" },
      { key: "footer_about", value: "Bệnh viện MedCare – Nơi hội tụ đội ngũ chuyên gia y tế hàng đầu.", type: "textarea", group: "general" },
    ]);

    // Seed Home Sections
    await db.insert(homeSections).values([
      { sectionKey: "hero_title", title: "Chăm sóc sức khỏe tận tâm vì bạn và gia đình", isActive: true, order: 1 },
      { sectionKey: "hero_subtitle", title: "MedCare – Hơn 25 năm uy tín trong lĩnh vực y tế", isActive: true, order: 2 },
      { sectionKey: "hero_description", title: "Giới thiệu", content: "MedCare – Hơn 25 năm uy tín trong lĩnh vực y tế, với đội ngũ chuyên gia hàng đầu và trang thiết bị hiện đại nhất, chúng tôi cam kết mang lại dịch vụ chăm sóc sức khỏe chất lượng quốc tế.", isActive: true, order: 3 },
    ]);

    // Seed banners
    await db.insert(banners).values([
      { title: "Chăm sóc sức khỏe toàn diện", subtitle: "Với đội ngũ bác sĩ hàng đầu", imageUrl: "/images/banner-1.jpg", position: "hero", order: 1 },
      { title: "Công nghệ y tế tiên tiến", subtitle: "Trang thiết bị hiện đại nhất", imageUrl: "/images/banner-2.jpg", position: "hero", order: 2 },
    ]);

    // Seed Departments
    const deptData = await db
      .insert(departments)
      .values([
        { name: "Tim mạch", slug: "tim-mach", description: "Chuyên khoa tim mạch với đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại nhất.", icon: "Heart" },
        { name: "Thần kinh", slug: "than-kinh", description: "Chẩn đoán và điều trị các bệnh lý thần kinh trung ương và ngoại biên.", icon: "Brain" },
        { name: "Nhi khoa", slug: "nhi-khoa", description: "Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 16 tuổi.", icon: "Baby" },
        { name: "Chỉnh hình", slug: "chinh-hinh", description: "Điều trị các bệnh lý xương khớp, phẫu thuật chỉnh hình tiên tiến.", icon: "Bone" },
        { name: "Ung bướu", slug: "ung-buou", description: "Chẩn đoán và điều trị ung thư với công nghệ tiên tiến nhất.", icon: "Microscope" },
        { name: "Sản phụ khoa", slug: "san-phu-khoa", description: "Chăm sóc sức khỏe sinh sản, thai sản và phụ khoa toàn diện.", icon: "Baby" },
        { name: "Mắt", slug: "mat", description: "Khám và điều trị các bệnh lý về mắt với công nghệ laser hiện đại.", icon: "Eye" },
        { name: "Răng hàm mặt", slug: "rang-ham-mat", description: "Dịch vụ nha khoa toàn diện từ phòng ngừa đến điều trị chuyên sâu.", icon: "Smile" },
      ])
      .returning();

    // Seed Doctors
    await db.insert(doctors).values([
      {
        name: "GS.TS. Nguyễn Văn Minh",
        title: "Giáo sư, Tiến sĩ",
        slug: "nguyen-van-minh",
        specialization: "Tim mạch can thiệp",
        departmentId: deptData[0].id,
        bio: "Giáo sư Nguyễn Văn Minh có hơn 25 năm kinh nghiệm trong lĩnh vực tim mạch can thiệp.",
        experience: 25,
        rating: "4.95",
        reviewCount: 1250,
        email: "nguyenvanminh@medcare.vn",
        phone: "0901234567",
        education: "Tiến sĩ Y khoa - Đại học Paris, Pháp\nBằng Chuyên khoa II Tim mạch - ĐH Y Hà Nội",
        consultationFee: "500000",
      },
      {
        name: "PGS.TS. Trần Thị Lan",
        title: "Phó Giáo sư, Tiến sĩ",
        slug: "tran-thi-lan",
        specialization: "Thần kinh học lâm sàng",
        departmentId: deptData[1].id,
        bio: "Phó Giáo sư Trần Thị Lan là chuyên gia hàng đầu về thần kinh học lâm sàng.",
        experience: 20,
        rating: "4.90",
        reviewCount: 980,
        email: "tranthilan@medcare.vn",
        phone: "0912345678",
        education: "Tiến sĩ Thần kinh học - ĐH Tokyo, Nhật Bản\nBác sĩ Nội trú Thần kinh - ĐH Y TP.HCM",
        consultationFee: "400000",
      },
      {
        name: "TS. Lê Hoàng Nam",
        title: "Tiến sĩ",
        slug: "le-hoang-nam",
        specialization: "Phẫu thuật chỉnh hình",
        departmentId: deptData[3].id,
        bio: "Tiến sĩ Lê Hoàng Nam chuyên về phẫu thuật thay khớp.",
        experience: 15,
        rating: "4.88",
        reviewCount: 756,
        email: "lehoangnam@medcare.vn",
        phone: "0923456789",
        education: "Tiến sĩ Chỉnh hình - ĐH Melbourne, Úc\nThạc sĩ Y khoa - ĐH Y Dược Hà Nội",
        consultationFee: "600000",
      },
      {
        name: "ThS.BS. Phạm Thị Thu Hà",
        title: "Thạc sĩ, Bác sĩ",
        slug: "pham-thi-thu-ha",
        specialization: "Nhi khoa tổng quát",
        departmentId: deptData[2].id,
        bio: "Bác sĩ Phạm Thị Thu Hà có 12 năm kinh nghiệm chăm sóc sức khỏe trẻ em.",
        experience: 12,
        rating: "4.92",
        reviewCount: 632,
        email: "phamthithuha@medcare.vn",
        phone: "0934567890",
        education: "Thạc sĩ Nhi khoa - ĐH Y TP.HCM\nBác sĩ Đa khoa - ĐH Y Dược Cần Thơ",
        consultationFee: "300000",
      },
    ]);

    // Seed Testimonials
    await db.insert(testimonials).values([
      { patientName: "Nguyễn Thị Hồng", rating: 5, content: "Dịch vụ tại MedCare thực sự xuất sắc.", treatmentType: "Phẫu thuật tim", isFeatured: true },
      { patientName: "Trần Văn Đức", rating: 5, content: "Quy trình đặt lịch hẹn rất nhanh chóng và tiện lợi.", treatmentType: "Khám tim mạch", isFeatured: true },
      { patientName: "Lê Thị Mai", rating: 5, content: "Con tôi được chăm sóc rất tốt tại khoa Nhi.", treatmentType: "Điều trị nhi khoa" },
      { patientName: "Phạm Minh Tuấn", rating: 5, content: "Kỹ thuật viên siêu âm rất chuyên nghiệp.", treatmentType: "Chẩn đoán hình ảnh" },
      { patientName: "Hoàng Thị Linh", rating: 5, content: "Sau nhiều năm đau đầu gối, tôi đã được phẫu thuật thay khớp tại MedCare.", treatmentType: "Phẫu thuật chỉnh hình", isFeatured: true },
      { patientName: "Vũ Quốc Hùng", rating: 5, content: "Dịch vụ khám và điều trị thần kinh tại đây rất chuyên nghiệp.", treatmentType: "Điều trị thần kinh" },
    ]);

    // Seed News
    await db.insert(news).values([
      { title: "MedCare đưa vào sử dụng hệ thống MRI 3 Tesla hiện đại nhất", slug: "medcare-mri-3-tesla", excerpt: "Bệnh viện MedCare vừa đưa vào hoạt động hệ thống MRI 3 Tesla thế hệ mới.", content: "Bệnh viện MedCare vừa chính thức đưa vào hoạt động hệ thống chụp cộng hưởng từ MRI 3 Tesla thế hệ mới nhất từ Siemens Healthineers.", category: "Công nghệ y tế", author: "Ban biên tập MedCare", viewCount: 1250, isFeatured: true, publishedAt: new Date() },
      { title: "Hội thảo quốc tế về Tim mạch can thiệp tại MedCare 2024", slug: "hoi-thao-tim-mach-2024", excerpt: "MedCare tổ chức thành công hội thảo quốc tế về tim mạch.", content: "Hội thảo quốc tế về Tim mạch can thiệp đã diễn ra thành công tốt đẹp.", category: "Sự kiện", author: "Phòng truyền thông", viewCount: 980, isFeatured: true, publishedAt: new Date() },
      { title: "Phương pháp điều trị ung thư mới: Liệu pháp miễn dịch tế bào CAR-T", slug: "lieu-phap-car-t", excerpt: "MedCare triển khai thành công liệu pháp CAR-T trong điều trị ung thư.", content: "Liệu pháp CAR-T là một bước đột phá trong y học.", category: "Y học tiên tiến", author: "GS.TS. Nguyễn Văn Minh", viewCount: 2150, publishedAt: new Date() },
      { title: "Lời khuyên của bác sĩ: Phòng ngừa đột quỵ não mùa lạnh", slug: "phong-ngua-dot-quy-mua-lanh", excerpt: "Thời tiết lạnh làm tăng nguy cơ đột quỵ.", content: "Theo số liệu thống kê, tỷ lệ đột quỵ tăng 30% trong các tháng mùa đông.", category: "Sức khỏe", author: "PGS.TS. Trần Thị Lan", viewCount: 3200, publishedAt: new Date() },
      { title: "MedCare khai trương cơ sở 2 tại TP.HCM", slug: "medcare-co-so-2-hcm", excerpt: "MedCare khai trương cơ sở 2 tại Quận 7.", content: "MedCare khai trương cơ sở 2 tại Quận 7, TP.HCM.", category: "Tin tức bệnh viện", author: "Ban truyền thông", viewCount: 1890, publishedAt: new Date() },
      { title: "Chế độ dinh dưỡng cho bệnh nhân tiểu đường type 2", slug: "dinh-duong-tieu-duong-type-2", excerpt: "Chế độ ăn uống đóng vai trò then chốt trong kiểm soát đường huyết.", content: "Tiểu đường type 2 đang ảnh hưởng đến hàng triệu người Việt Nam.", category: "Dinh dưỡng", author: "BS. Dinh dưỡng MedCare", viewCount: 4100, publishedAt: new Date() },
    ]);

    // Seed Services
    const deptIds = deptData.map((d) => d.id);
    await db.insert(services).values([
      { name: "Khám tim mạch tổng quát", description: "Khám và tư vấn sức khỏe tim mạch toàn diện", departmentId: deptIds[0], price: "350000" },
      { name: "Siêu âm tim", description: "Siêu âm tim 2D/3D với thiết bị hiện đại", departmentId: deptIds[0], price: "500000" },
      { name: "Điện tâm đồ (ECG)", description: "Ghi điện tâm đồ 12 đạo trình", departmentId: deptIds[0], price: "120000" },
      { name: "Khám thần kinh", description: "Khám và chẩn đoán các bệnh lý thần kinh", departmentId: deptIds[1], price: "350000" },
      { name: "Chụp MRI não", description: "Chụp cộng hưởng từ não 3 Tesla", departmentId: deptIds[1], price: "2500000" },
      { name: "Khám nhi tổng quát", description: "Khám sức khỏe toàn diện cho trẻ em", departmentId: deptIds[2], price: "200000" },
      { name: "Tiêm chủng trẻ em", description: "Dịch vụ tiêm chủng đầy đủ cho trẻ", departmentId: deptIds[2], price: "150000" },
      { name: "Phẫu thuật nội soi khớp", description: "Phẫu thuật nội soi khớp gối, vai tối thiểu xâm lấn", departmentId: deptIds[3], price: "15000000" },
    ]);

    // Seed Admin User
    try {
      const hashedPassword = await bcrypt.hash("admin123", 12);
      await db.insert(users).values({
        username: "admin",
        email: "admin@medcare.vn",
        password: hashedPassword,
        fullName: "Quản trị viên MedCare",
        role: "super_admin",
        isActive: true,
      });
    } catch {
      console.log("Admin user may already exist");
    }

    // Seed FAQs
    await db.insert(faqs).values([
      { question: "Làm thế nào để đặt lịch hẹn khám bệnh?", answer: "Quý khách có thể đặt lịch hẹn trực tuyến qua website MedCare hoặc gọi hotline 1800 599 920.", category: "Đặt lịch hẹn", order: 1 },
      { question: "Bệnh viện có nhận bảo hiểm y tế không?", answer: "MedCare có liên kết với hầu hết các công ty bảo hiểm y tế lớn tại Việt Nam.", category: "Bảo hiểm", order: 2 },
      { question: "Giờ khám bệnh của MedCare như thế nào?", answer: "Thứ 2 đến Thứ 7: 7:00-17:00 và Chủ Nhật: 7:00-12:00. Cấp cứu 24/7.", category: "Giờ làm việc", order: 3 },
      { question: "Chi phí khám bệnh tại MedCare là bao nhiêu?", answer: "Chi phí khám phụ thuộc vào chuyên khoa và dịch vụ cụ thể. Bảng giá niêm yết công khai.", category: "Chi phí", order: 4 },
      { question: "Có thể hủy lịch hẹn đã đặt không?", answer: "Quý khách có thể hủy lịch hẹn qua website hoặc gọi hotline trước 24 giờ.", category: "Đặt lịch hẹn", order: 5 },
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seed error:", error);
  }
}