"use client";
import React, { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ Họ tên, Email và Nội dung.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        toast({
          title: "Có lỗi xảy ra",
          description: "Vui lòng thử lại sau.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Lỗi kết nối",
        description: "Không thể gửi tin nhắn. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Gửi thành công!
        </h3>
        <p className="text-gray-500 text-sm">
          Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">
            Họ và tên <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Nguyễn Văn A"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            placeholder="0901234567"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="subject">Chủ đề</Label>
          <Input
            id="subject"
            placeholder="Tư vấn dịch vụ"
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message">
          Nội dung <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Nhập nội dung tin nhắn của bạn..."
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="mt-1.5 min-h-[130px]"
        />
      </div>

      <Button type="submit" variant="gradient" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Gửi tin nhắn
          </>
        )}
      </Button>
    </form>
  );
}
