"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Save, Loader2, Globe, Palette, Phone, Mail, MapPin, Share2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Setting {
  id: number;
  key: string;
  value: string;
  type: string;
  group: string;
  description: string | null;
}

const groupIcons: Record<string, any> = {
  general: Globe,
  contact: Phone,
  appearance: Palette,
  social: Share2,
};

const groupLabels: Record<string, string> = {
  general: "Cài đặt chung",
  contact: "Thông tin liên hệ",
  appearance: "Giao diện",
  social: "Mạng xã hội",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        const formData: Record<string, string> = {};
        data.settings.forEach((s: Setting) => { formData[s.key] = s.value; });
        setForm(formData);
      }
    } catch {}
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(form)) {
        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
      }
      toast({ title: "Thành công", description: "Đã lưu cài đặt" });
    } catch {
      toast({ title: "Lỗi", description: "Không thể lưu cài đặt", variant: "destructive" });
    }
    setSaving(false);
  };

  const groups = [...new Set(settings.map((s) => s.group))];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Cài đặt hệ thống</h1>
            <p className="text-gray-500 mt-1">Quản lý thông tin cấu hình website</p>
          </div>
          <Button variant="gradient" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Lưu thay đổi
          </Button>
        </div>

        <div className="space-y-6">
          {groups.map((group) => {
            const Icon = groupIcons[group] || Globe;
            const groupSettings = settings.filter((s) => s.group === group);

            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="font-bold text-gray-900">{groupLabels[group] || group}</h2>
                </div>

                <div className="p-5 space-y-5">
                  {groupSettings.map((setting) => (
                    <div key={setting.id}>
                      <Label htmlFor={setting.key} className="text-sm font-semibold text-gray-700">
                        {setting.description || setting.key}
                      </Label>
                      {setting.type === "textarea" ? (
                        <Textarea
                          id={setting.key}
                          value={form[setting.key] || ""}
                          onChange={(e) => setForm((f) => ({ ...f, [setting.key]: e.target.value }))}
                          className="mt-1.5"
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={setting.key}
                          type={setting.key.includes("color") ? "color" : "text"}
                          value={form[setting.key] || ""}
                          onChange={(e) => setForm((f) => ({ ...f, [setting.key]: e.target.value }))}
                          className="mt-1.5"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}