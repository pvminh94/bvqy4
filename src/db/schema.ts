import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  date,
  time,
  decimal,
  pgEnum,
  jsonb,
  unique,
} from "drizzle-orm/pg-core";

// ===================== ENUMS =====================
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "admin",
  "editor",
  "moderator",
]);

export const galleryCategoryEnum = pgEnum("gallery_category", [
  "facilities",
  "surgery",
  "events",
  "team",
  "general",
]);

// ===================== SITE SETTINGS =====================
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  type: varchar("type", { length: 50 }).default("text"),
  group: varchar("group", { length: 100 }).default("general"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===================== HOME SECTIONS =====================
export const homeSections = pgTable("home_sections", {
  id: serial("id").primaryKey(),
  sectionKey: varchar("section_key", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 500 }),
  subtitle: text("subtitle"),
  content: text("content"),
  imageUrl: varchar("image_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===================== USERS / ADMIN =====================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("editor"),
  avatar: varchar("avatar", { length: 500 }),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===================== SITE LOGOS =====================
export const siteLogos = pgTable("site_logos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  type: varchar("type", { length: 50 }).default("logo"), // logo, favicon, og_image
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===================== GALLERY =====================
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  description: text("description"),
  category: galleryCategoryEnum("category").default("general"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===================== FAQS =====================
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }),
  order: integer("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===================== DOCTOR SCHEDULE =====================
export const doctorSchedules = pgTable("doctor_schedules", {
  id: serial("id").primaryKey(),
  doctorId: integer("doctor_id")
    .references(() => doctors.id)
    .notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sun, 1=Mon...6=Sat
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===================== BANNERS =====================
export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }),
  subtitle: text("subtitle"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  linkUrl: varchar("link_url", { length: 500 }),
  position: varchar("position", { length: 50 }).default("hero"),
  order: integer("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===================== APPOINTMENT REMINDERS =====================
export const appointmentReminders = pgTable("appointment_reminders", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id")
    .references(() => appointments.id)
    .notNull(),
  type: varchar("type", { length: 50 }).default("sms"),
  sentAt: timestamp("sent_at"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===================== EXISTING TABLES =====================

// Departments
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  imageUrl: varchar("image_url", { length: 500 }),
  metaTitle: varchar("meta_title", { length: 500 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Doctors
export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 100 }),
  slug: varchar("slug", { length: 255 }).unique(),
  specialization: varchar("specialization", { length: 255 }),
  departmentId: integer("department_id").references(() => departments.id),
  bio: text("bio"),
  imageUrl: varchar("image_url", { length: 500 }),
  experience: integer("experience"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("5.00"),
  reviewCount: integer("review_count").default(0),
  isActive: boolean("is_active").default(true),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  education: text("education"),
  achievements: text("achievements"),
  consultationFee: decimal("consultation_fee", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Patients
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }).notNull(),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum("gender"),
  address: text("address"),
  insuranceNumber: varchar("insurance_number", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Appointments
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientName: varchar("patient_name", { length: 255 }).notNull(),
  patientEmail: varchar("patient_email", { length: 255 }),
  patientPhone: varchar("patient_phone", { length: 50 }).notNull(),
  patientDob: date("patient_dob"),
  patientGender: genderEnum("patient_gender"),
  doctorId: integer("doctor_id").references(() => doctors.id),
  departmentId: integer("department_id").references(() => departments.id),
  appointmentDate: date("appointment_date").notNull(),
  appointmentTime: time("appointment_time").notNull(),
  status: appointmentStatusEnum("status").default("pending"),
  reason: text("reason"),
  notes: text("notes"),
  insuranceNumber: varchar("insurance_number", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// News / Blog
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  imageUrl: varchar("image_url", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: text("tags"),
  author: varchar("author", { length: 255 }),
  metaTitle: varchar("meta_title", { length: 500 }),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(true),
  isFeatured: boolean("is_featured").default(false),
  viewCount: integer("view_count").default(0),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  patientName: varchar("patient_name", { length: 255 }).notNull(),
  patientAvatar: varchar("patient_avatar", { length: 500 }),
  rating: integer("rating").default(5),
  content: text("content").notNull(),
  treatmentType: varchar("treatment_type", { length: 255 }),
  isApproved: boolean("is_approved").default(true),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  departmentId: integer("department_id").references(() => departments.id),
  price: decimal("price", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 500 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  repliedAt: timestamp("replied_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===================== TYPES =====================
export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type Doctor = typeof doctors.$inferSelect;
export type NewDoctor = typeof doctors.$inferInsert;
export type Patient = typeof patients.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type Service = typeof services.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type Banner = typeof banners.$inferSelect;
export type Gallery = typeof gallery.$inferSelect;
export type FAQ = typeof faqs.$inferSelect;
export type DoctorSchedule = typeof doctorSchedules.$inferSelect;
export type HomeSection = typeof homeSections.$inferSelect;
export type SiteLogo = typeof siteLogos.$inferSelect;