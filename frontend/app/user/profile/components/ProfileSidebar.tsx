"use client";

import { useState } from "react";

export type TabKey = "orders" | "address" | "wishlist" | "points" | "security";

interface User {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  points: number;
  avatar: string;
}

interface Props {
  user: User;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "orders",   label: "คำสั่งซื้อของฉัน", icon: "📦" },
  { key: "address",  label: "ที่อยู่จัดส่ง",    icon: "📍" },
  { key: "wishlist", label: "Wishlist",          icon: "❤️" },
  { key: "points",   label: "คะแนนสะสม",        icon: "🎁" },
  { key: "security", label: "ความปลอดภัย",      icon: "🔐" },
];

function getTier(points: number) {
  if (points >= 1500) return { label: "💎 VIP",       color: "text-purple-500", bg: "bg-purple-50" };
  if (points >= 500)  return { label: "⭐ Regular",   color: "text-yellow-500", bg: "bg-yellow-50" };
  return              { label: "🌸 New Member",       color: "text-pink-500",   bg: "bg-pink-50"   };
}

export default function ProfileSidebar({ user, activeTab, onTabChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, phone: user.phone });
  const tier = getTier(user.points);

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-4">

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5 flex flex-col items-center text-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center text-4xl shadow-md">
            {user.avatar}
          </div>
          <span className={`absolute -bottom-1 -right-1 text-xs px-2 py-0.5 rounded-full font-semibold ${tier.bg} ${tier.color} border border-white shadow-sm`}>
            {tier.label}
          </span>
        </div>

        {/* User Info */}
        {editing ? (
          <div className="w-full flex flex-col gap-2 text-left">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-1.5 text-sm border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400"
              placeholder="ชื่อ"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-1.5 text-sm border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400"
              placeholder="เบอร์โทร"
            />
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-1.5 bg-pink-400 text-white text-xs rounded-lg hover:bg-pink-500 transition-colors"
              >
                บันทึก
              </button>
              <button
                onClick={() => { setForm({ name: user.name, phone: user.phone }); setEditing(false); }}
                className="flex-1 py-1.5 bg-gray-100 text-gray-500 text-xs rounded-lg hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="font-bold text-gray-700 text-lg">{form.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-400">{form.phone}</p>
              <p className="text-xs text-gray-300 mt-1">สมาชิกตั้งแต่ {user.joinDate}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-pink-400 border border-pink-200 px-4 py-1.5 rounded-full hover:bg-pink-50 transition-colors"
            >
              ✏️ แก้ไขโปรไฟล์
            </button>
          </>
        )}
      </div>

      {/* Tab Navigation */}
      <nav className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 text-left
              ${activeTab === tab.key
                ? "bg-pink-50 text-pink-500 border-l-4 border-pink-400"
                : "text-gray-500 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
