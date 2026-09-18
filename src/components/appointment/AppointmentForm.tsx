"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Department {
  id: number;
  name: string;
  slug: string;
}

interface Doctor {
  id: number;
  name: string;
  specialization: string | null;
  departmentId: number | null;
}

interface AppointmentFormProps {
  departments: Department[];
  doctors: Doctor[];
}

const timeSlots = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const steps = [
  { id: 1, title: "Thông tin cá nhân", icon: User },
  { id: 2, title: "Chọn lịch hẹn", icon: Calendar },
  { id: 3, title: "Xác nhận", icon: CheckCircle2 },
];

export default function AppointmentForm({
  departments,
  doctors,
}: AppointmentFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientDob: "",
    patientGender: "",
    departmentId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    insuranceNumber: "",
  });

  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    if (form.departmentId) {
      const deptId = parseInt(form.departmentId);
      setFilteredDoctors(
        doctors.filter((d) => d.departmentId === deptId)
      );
      setForm((f) => ({ ...f, doctorId: "" }));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [form.departmentId, doctors]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!form.patientName || !form.patientPhone) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền họ tên và số điện thoại.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.departmentId || !form.appointmentDate || !form.appointmentTime) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng chọn chuyên khoa, ngày và giờ khám.",
        variant: "destructive",
      });
      return false;
    }
    // Check date is not in past
    const selectedDate = new Date(form.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast({
        title: "Ngày không hợp lệ",
        description: "Vui lòng chọn ngày hẹn từ hôm nay trở đi.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          departmentId: form.departmentId ? parseInt(form.departmentId) : null,
          doctorId: form.doctorId ? parseInt(form.doctorId) : null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        toast({
          title: "Có lỗi xảy ra",
          description: data.error || "Vui lòng thử lại sau.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Lỗi kết nối",
        description: "Không thể kết nối đến server. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-black text-gray-900 mb-3">
          Đặt lịch thành công!
        </h2>
        <p className="text-gray-500 mb-2">
          Cảm ơn{" "}
          <strong className="text-gray-900">{form.patientName}</strong>!
        </p>
        <p className="text-gray-500 mb-8">
          Chúng tôi sẽ liên hệ xác nhận lịch hẹn qua số{" "}
          <strong className="text-blue-600">{form.patientPhone}</strong> trong
          vòng 30 phút.
        </p>
        <div className="bg-blue-50 rounded-2xl p-6 max-w-sm mx-auto mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Ngày khám:</span>
              <span className="font-semibold text-gray-900">
                {new Intl.DateTimeFormat("vi-VN").format(
                  new Date(form.appointmentDate)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Giờ khám:</span>
              <span className="font-semibold text-gray-900">
                {form.appointmentTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Chuyên khoa:</span>
              <span className="font-semibold text-gray-900">
                {departments.find((d) => d.id === parseInt(form.departmentId))
                  ?.name || ""}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="gradient"
          onClick={() => {
            setSuccess(false);
            setStep(1);
            setForm({
              patientName: "",
              patientEmail: "",
              patientPhone: "",
              patientDob: "",
              patientGender: "",
              departmentId: "",
              doctorId: "",
              appointmentDate: "",
              appointmentTime: "",
              reason: "",
              insuranceNumber: "",
            });
          }}
        >
          Đặt lịch mới
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Steps Progress */}
      <div className="flex items-center justify-center mb-10">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  backgroundColor: step >= s.id ? "#2563eb" : step === s.id - 1 ? "#eff6ff" : "#f3f4f6",
                  color: step >= s.id ? "#ffffff" : "#9ca3af",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm"
              >
                {step > s.id ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
              </motion.div>
              <span
                className={`text-xs mt-1.5 font-medium hidden sm:block ${
                  step >= s.id ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-gray-200 max-w-16">
                <motion.div
                  animate={{ width: step > s.id ? "100%" : "0%" }}
                  className="h-full bg-blue-600 transition-all duration-500"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Thông tin bệnh nhân
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="patientName">
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="patientName"
                placeholder="Nguyễn Văn A"
                value={form.patientName}
                onChange={(e) => handleChange("patientName", e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="patientPhone">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="patientPhone"
                  placeholder="0901234567"
                  value={form.patientPhone}
                  onChange={(e) => handleChange("patientPhone", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="patientEmail">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="patientEmail"
                  type="email"
                  placeholder="email@example.com"
                  value={form.patientEmail}
                  onChange={(e) => handleChange("patientEmail", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="patientDob">Ngày sinh</Label>
              <Input
                id="patientDob"
                type="date"
                value={form.patientDob}
                onChange={(e) => handleChange("patientDob", e.target.value)}
                className="mt-1.5"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <Label>Giới tính</Label>
              <Select
                value={form.patientGender}
                onValueChange={(v) => handleChange("patientGender", v)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="insuranceNumber">Số BHYT (nếu có)</Label>
              <Input
                id="insuranceNumber"
                placeholder="DN12345678900"
                value={form.insuranceNumber}
                onChange={(e) =>
                  handleChange("insuranceNumber", e.target.value)
                }
                className="mt-1.5"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Appointment Details */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Thông tin lịch hẹn
          </h3>

          <div>
            <Label>
              Chuyên khoa <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.departmentId}
              onValueChange={(v) => handleChange("departmentId", v)}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Chọn chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d.id} value={String(d.id)}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Bác sĩ (không bắt buộc)</Label>
            <Select
              value={form.doctorId}
              onValueChange={(v) => handleChange("doctorId", v)}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Chọn bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Bất kỳ bác sĩ nào</SelectItem>
                {filteredDoctors.map((d) => (
                  <SelectItem key={d.id} value={String(d.id)}>
                    {d.name} – {d.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appointmentDate">
                Ngày khám <span className="text-red-500">*</span>
              </Label>
              <Input
                id="appointmentDate"
                type="date"
                value={form.appointmentDate}
                onChange={(e) =>
                  handleChange("appointmentDate", e.target.value)
                }
                className="mt-1.5"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <Label>
                Giờ khám <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.appointmentTime}
                onValueChange={(v) => handleChange("appointmentTime", v)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Chọn giờ" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {t}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="reason">Lý do khám / Triệu chứng</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Textarea
                id="reason"
                placeholder="Mô tả triệu chứng hoặc lý do cần khám..."
                value={form.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                className="pl-10 min-h-[100px]"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Xác nhận thông tin
          </h3>

          <div className="bg-blue-50 rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Họ và tên</p>
                <p className="font-semibold text-gray-900">{form.patientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Số điện thoại</p>
                <p className="font-semibold text-gray-900">{form.patientPhone}</p>
              </div>
              {form.patientEmail && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">{form.patientEmail}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 mb-1">Giới tính</p>
                <p className="font-semibold text-gray-900">
                  {form.patientGender === "male"
                    ? "Nam"
                    : form.patientGender === "female"
                    ? "Nữ"
                    : form.patientGender || "—"}
                </p>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Chuyên khoa</p>
                <p className="font-semibold text-gray-900">
                  {departments.find((d) => d.id === parseInt(form.departmentId))
                    ?.name || "—"}
                </p>
              </div>
              {form.doctorId && form.doctorId !== "any" && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bác sĩ</p>
                  <p className="font-semibold text-gray-900">
                    {doctors.find((d) => d.id === parseInt(form.doctorId))
                      ?.name || "—"}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 mb-1">Ngày khám</p>
                <p className="font-semibold text-gray-900">
                  {form.appointmentDate
                    ? new Intl.DateTimeFormat("vi-VN").format(
                        new Date(form.appointmentDate)
                      )
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Giờ khám</p>
                <p className="font-semibold text-gray-900">
                  {form.appointmentTime || "—"}
                </p>
              </div>
            </div>

            {form.reason && (
              <div className="border-t border-blue-200 pt-4">
                <p className="text-xs text-gray-500 mb-1">Lý do khám</p>
                <p className="text-sm text-gray-900">{form.reason}</p>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            <p className="font-semibold mb-1">📋 Lưu ý trước khi đến khám:</p>
            <ul className="space-y-1 text-yellow-700 list-disc list-inside">
              <li>Mang theo CMND/CCCD và thẻ BHYT (nếu có)</li>
              <li>Đến trước giờ hẹn 15 phút để làm thủ tục</li>
              <li>Mang theo kết quả xét nghiệm cũ nếu có</li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        {step > 1 ? (
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={loading}
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </Button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <Button variant="gradient" onClick={handleNext}>
            Tiếp theo
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="gradient"
            onClick={handleSubmit}
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Xác nhận đặt lịch
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
