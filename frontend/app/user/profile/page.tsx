"use client";

import { useEffect, useMemo, useState } from "react";
import ProfileSidebar, { TabKey }  from "./components/ProfileSidebar";
import OrdersSection, { Order }    from "./components/OrdersSection";
import AddressSection, { Address } from "./components/AddressSection";
import WishlistSection, { WishlistItem } from "./components/WishlistSection";
import PointsSection, { PointTransaction } from "./components/PointsSection";
import SecuritySection, { LoginHistory }  from "./components/SecuritySection";

// ─── Mock Data ────────────────────────────────────────────────

type LoggedUser = {
  full_name?: string;
  email?: string;
  created_at?: string;
};

const mockUser = {
  name: "น้องมีมี่",
  email: "meemee@squishyland.com",
  phone: "081-234-5678",
  joinDate: "มกราคม 2567",
  points: 820,
  avatar: "🐱",
};

const mockOrders: Order[] = [
  {
    id: "SQ-00142",
    date: "5 ก.ค. 2568",
    total: 890,
    status: "shipping",
    items: [
      { name: "Squishy Strawberry Cake", qty: 1, price: 390, emoji: "🍰" },
      { name: "Mini Bunny Plushie",      qty: 2, price: 250, emoji: "🐰" },
    ],
  },
  {
    id: "SQ-00139",
    date: "28 มิ.ย. 2568",
    total: 550,
    status: "delivered",
    items: [
      { name: "Kawaii Star Squishy",     qty: 1, price: 290, emoji: "⭐" },
      { name: "Pink Cloud Pillow",       qty: 1, price: 260, emoji: "☁️" },
    ],
  },
  {
    id: "SQ-00130",
    date: "10 มิ.ย. 2568",
    total: 1250,
    status: "delivered",
    items: [
      { name: "Blind Box Series 4",      qty: 2, price: 450, emoji: "📦" },
      { name: "Mochi Cat Set",           qty: 1, price: 350, emoji: "🐱" },
    ],
  },
  {
    id: "SQ-00118",
    date: "1 มิ.ย. 2568",
    total: 320,
    status: "cancelled",
    items: [
      { name: "Rainbow Squishy Ball",    qty: 2, price: 160, emoji: "🌈" },
    ],
  },
  {
    id: "SQ-00147",
    date: "7 ก.ค. 2568",
    total: 480,
    status: "pending",
    items: [
      { name: "Cinnamon Roll Squishy",   qty: 1, price: 480, emoji: "🍩" },
    ],
  },
];

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "บ้าน",
    name: "น้องมีมี่",
    phone: "081-234-5678",
    address: "123/4 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "ที่ทำงาน",
    name: "น้องมีมี่",
    phone: "081-234-5678",
    address: "88 อาคารเมธีนิเวศ ชั้น 5 ถ.พระราม 9 แขวงห้วยขวาง กรุงเทพฯ 10310",
    isDefault: false,
  },
];

const mockWishlist: WishlistItem[] = [
  { id: "w1", name: "Giant Avocado Squishy",     price: 590, emoji: "🥑", category: "Squishy" },
  { id: "w2", name: "Sakura Bunny Plushie",      price: 450, emoji: "🐰", category: "Plushie" },
  { id: "w3", name: "Pastel Star Blind Box",     price: 350, emoji: "⭐", category: "Blind Box" },
  { id: "w4", name: "Matcha Donut Squish",       price: 280, emoji: "🍩", category: "Squishy" },
  { id: "w5", name: "Cloud Pillow Kawaii",       price: 720, emoji: "☁️", category: "Pillow" },
];

const mockTransactions: PointTransaction[] = [
  { id: "t1", date: "5 ก.ค. 2568",  description: "สั่งซื้อ #SQ-00142",   points:  89 },
  { id: "t2", date: "28 มิ.ย. 2568", description: "สั่งซื้อ #SQ-00139",  points:  55 },
  { id: "t3", date: "10 มิ.ย. 2568", description: "สั่งซื้อ #SQ-00130",  points: 125 },
  { id: "t4", date: "5 มิ.ย. 2568",  description: "ใช้คะแนนแลกส่วนลด",  points: -100 },
  { id: "t5", date: "1 พ.ค. 2568",   description: "สมัครสมาชิกใหม่",    points: 200 },
  { id: "t6", date: "15 เม.ย. 2568", description: "สั่งซื้อ #SQ-00091",  points:  80 },
];

const mockLoginHistory: LoginHistory[] = [
  { id: "l1", date: "7 ก.ค. 2568, 20:15",  device: "Chrome / Windows 11",  location: "กรุงเทพฯ", current: true  },
  { id: "l2", date: "5 ก.ค. 2568, 18:32",  device: "Mobile Safari / iPhone", location: "กรุงเทพฯ"              },
  { id: "l3", date: "3 ก.ค. 2568, 09:10",  device: "Chrome / Windows 11",  location: "กรุงเทพฯ"               },
  { id: "l4", date: "28 มิ.ย. 2568, 21:05", device: "Mobile Safari / iPhone", location: "เชียงใหม่"            },
];

// ─── Page ────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("orders");
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("user");
    if (!stored) {
      setLoggedUser(null);
      return;
    }

    try {
      setLoggedUser(JSON.parse(stored));
    } catch {
      setLoggedUser(null);
    }
  }, []);

  const profileUser = useMemo(() => ({
    ...mockUser,
    name: loggedUser?.full_name || mockUser.name,
    email: loggedUser?.email || mockUser.email,
    joinDate: loggedUser?.created_at ? new Date(loggedUser.created_at).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) : mockUser.joinDate,
  }), [loggedUser]);

  const SECTIONS: Record<TabKey, React.ReactNode> = {
    orders:   <OrdersSection   orders={mockOrders} />,
    address:  <AddressSection  addresses={mockAddresses} />,
    wishlist: <WishlistSection items={mockWishlist} />,
    points:   <PointsSection   points={profileUser.points} transactions={mockTransactions} />,
    security: <SecuritySection loginHistory={mockLoginHistory} />,
  };

  return (
    <div className="min-h-screen bg-[#FFF8FB] px-4 py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <ProfileSidebar
          user={profileUser}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {SECTIONS[activeTab]}
        </main>

      </div>
    </div>
  );
}