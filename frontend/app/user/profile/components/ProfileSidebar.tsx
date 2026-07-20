"use client";

import { useEffect, useState } from "react";
import AddressSection from "./AddressSection";
import OrdersSection from "./OrdersSection";
import WishlistSection from "./WishlistSection";
import PointsSection from "./PointsSection";
import SecuritySection from "./SecuritySection";

interface User {
  id: number;
  full_name: string;
  email: string;
  address: string;
  status: string;
  created_at: string;
}

const TABS = [
  { key: "orders", label: "คำสั่งซื้อของฉัน", icon: "" },
  { key: "address", label: "ที่อยู่จัดส่ง", icon: "" },
];

export default function ProfileSidebar() {
  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const TAB_COMPONENTS = {
    orders: <OrdersSection />,
    address: <AddressSection />,
    // wishlist: <WishlistSection />,
    // points: <PointsSection />,
    // security: <SecuritySection />,
  };

  return (
    <aside className="w-full  shrink-0 grid grid-cols-3 gap-5">
      {/* Profile Card */}
      <div className="flex flex-col gap-4 col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-pink-100">
              {user?.full_name?.charAt(0).toUpperCase() || "U"}
            </div>

            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-semibold shadow-md">
              {user?.status || "สมาชิก"}
            </span>
          </div>

          {/* User Info */}
          <div className="mt-6 w-full space-y-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {user?.full_name}
              </h2>

              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <div className="bg-pink-50 rounded-xl p-3 text-left border border-pink-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">รหัสสมาชิก</span>
                <span className="font-semibold text-gray-700">#{user?.id}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">สถานะ</span>
                <span className="font-semibold text-pink-500">
                  {user?.status}
                </span>
              </div>

              <div className="text-sm flex justify-between">
                <p className="text-gray-500 mb-1">ที่อยู่</p>
                <p className="text-gray-700 break-words">{user?.address}</p>
              </div>
            </div>

            <div className="text-xs text-gray-400">
              สมัครเมื่อ{" "}
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="p-2 space-y-1 rounded-2xl border-gray-200 border  bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ease-in-out font-medium
        ${
          activeTab === tab.key
            ? "bg-pink-400 text-white shadow-md scale-[1.02]"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 col-span-2 ">
        {TAB_COMPONENTS[activeTab as keyof typeof TAB_COMPONENTS]}
      </main>
    </aside>
  );
}
