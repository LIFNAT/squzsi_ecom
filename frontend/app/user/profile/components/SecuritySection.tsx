"use client";

import { useState } from "react";

export interface LoginHistory {
  id: string;
  date: string;
  device: string;
  location: string;
  current?: boolean;
}

interface Props {
  loginHistory: LoginHistory[];
}

interface Toggles {
  orderUpdates: boolean;
  promotions: boolean;
  wishlistSale: boolean;
}

export default function SecuritySection({ loginHistory }: Props) {
  const [passwords, setPasswords] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState<Toggles>({
    orderUpdates: true,
    promotions: false,
    wishlistSale: true,
  });

  function handleSavePassword() {
    if (!passwords.current || !passwords.newPw || passwords.newPw !== passwords.confirm) return;
    setSaved(true);
    setPasswords({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setSaved(false), 3000);
  }

  function toggle(key: keyof Toggles) {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-700">🔐 ความปลอดภัย</h2>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 flex flex-col gap-3">
        <p className="font-semibold text-gray-700">เปลี่ยนรหัสผ่าน</p>

        {saved && (
          <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
            ✅ เปลี่ยนรหัสผ่านสำเร็จ!
          </div>
        )}

        <div className="flex flex-col gap-2">
          {[
            { field: "current", label: "รหัสผ่านปัจจุบัน" },
            { field: "newPw",   label: "รหัสผ่านใหม่" },
            { field: "confirm", label: "ยืนยันรหัสผ่านใหม่" },
          ].map(({ field, label }) => (
            <div key={field} className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder={label}
                value={passwords[field as keyof typeof passwords]}
                onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 pr-10"
              />
            </div>
          ))}

          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPw}
              onChange={() => setShowPw(!showPw)}
              className="accent-pink-400"
            />
            แสดงรหัสผ่าน
          </label>

          {passwords.newPw && passwords.confirm && passwords.newPw !== passwords.confirm && (
            <p className="text-xs text-red-400">รหัสผ่านใหม่ไม่ตรงกัน</p>
          )}

          <button
            onClick={handleSavePassword}
            className="w-full py-2.5 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition-colors text-sm font-medium mt-1"
          >
            บันทึกรหัสผ่านใหม่
          </button>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-pink-50">
          <p className="font-semibold text-gray-700">ประวัติการเข้าสู่ระบบ</p>
        </div>
        <div className="divide-y divide-pink-50">
          {loginHistory.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{entry.device.includes("Mobile") ? "📱" : "💻"}</span>
                <div>
                  <p className="text-sm text-gray-700 font-medium">{entry.device}</p>
                  <p className="text-xs text-gray-400">{entry.location} · {entry.date}</p>
                </div>
              </div>
              {entry.current && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                  อุปกรณ์นี้
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 flex flex-col gap-4">
        <p className="font-semibold text-gray-700">การแจ้งเตือนทางอีเมล</p>
        {([
          { key: "orderUpdates", label: "อัพเดทสถานะคำสั่งซื้อ",    desc: "รับแจ้งเตือนทุกขั้นตอนของออเดอร์" },
          { key: "promotions",   label: "โปรโมชันและส่วนลด",          desc: "ข่าวสารดีลพิเศษและแคมเปญ" },
          { key: "wishlistSale", label: "สินค้า Wishlist ลดราคา",    desc: "แจ้งเตือนเมื่อสินค้าที่ถูกใจลดราคา" },
        ] as { key: keyof Toggles; label: string; desc: string }[]).map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-700">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            {/* Toggle Switch */}
            <button
              onClick={() => toggle(key)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 ${
                toggles[key] ? "bg-pink-400" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                  toggles[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
