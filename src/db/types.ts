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
} from "drizzle-orm/pg-core";

// ===================== ENUMS =====================
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending", "confirmed", "cancelled", "completed",
]);

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const userRoleEnum = pgEnum("user_role", [
  "super_admin", "admin", "editor", "moderator",
]);

export const galleryCategoryEnum = pgEnum("gallery_category", [
  "facilities", "surgery", "events", "team", "general",
]);

// ... rest of schema imported from the main schema
// This file is intentionally kept minimal - full schema in db/schema.ts
export type Department = typeof import("./schema").departments.$inferSelect;