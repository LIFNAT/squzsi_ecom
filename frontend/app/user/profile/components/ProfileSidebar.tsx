"use client";

import { useState } from "react";
import AddressSection from "./AddressSection";
import OrdersSection from "./OrdersSection";
import WishlistSection from "./WishlistSection";
import PointsSection from "./PointsSection";
import SecuritySection from "./SecuritySection";

const TABS = [
  { key: "orders", label: "คำสั่งซื้อของฉัน", icon: "" },
  { key: "address", label: "ที่อยู่จัดส่ง", icon: "" },
  { key: "wishlist", label: "Wishlist", icon: "" },
  { key: "points", label: "คะแนนสะสม", icon: "" },
  { key: "security", label: "ความปลอดภัย", icon: "" },
];


export default function ProfileSidebar() {
  const [activeTab, setActiveTab] = useState("orders");

  const TAB_COMPONENTS = {
    orders: <OrdersSection />,
    // address: <AddressSection />,
    // wishlist: <WishlistSection />,
    // points: <PointsSection />,
    // security: <SecuritySection />,
  };


  return (
    <aside className="w-full  shrink-0 grid grid-cols-3 gap-5">

      {/* Profile Card */}
      <div className="flex flex-col gap-4 col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5 flex flex-col items-center text-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center text-4xl shadow-md">
              {/* {user.avatar} */}
            </div>
            <span className={`absolute -bottom-1 -right-1 text-xs px-2 py-0.5 rounded-full font-semibold  border border-white shadow-sm`}>
              {/* {tier.label} */}
            </span>
          </div>

          {/* User Info */}
          {/* {editing ? (
          <div className="w-full flex flex-col gap-2 text-left">
            <input
              className="w-full px-3 py-1.5 text-sm border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400"
              placeholder="ชื่อ"
            />
            <input
              className="w-full px-3 py-1.5 text-sm border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400"
              placeholder="เบอร์โทร"
            />
            <div className="flex gap-2 mt-1">
              <button
          
                className="flex-1 py-1.5 bg-pink-400 text-white text-xs rounded-lg hover:bg-pink-500 transition-colors"
              >
                บันทึก
              </button>
              <button
                className="flex-1 py-1.5 bg-gray-100 text-gray-500 text-xs rounded-lg hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              {/* <p className="font-bold text-gray-700 text-lg">{form.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-400">{form.phone}</p>
              <p className="text-xs text-gray-300 mt-1">สมาชิกตั้งแต่ {user.joinDate}</p> 
            </div>
            <button
  
              className="text-xs text-pink-400 border border-pink-200 px-4 py-1.5 rounded-full hover:bg-pink-50 transition-colors"
            >
              ✏️ แก้ไขโปรไฟล์
            </button>
          </>
        )} */}
        </div>

        {/* Tab Navigation */}
        <div className="p-2 space-y-1 rounded-2xl border-gray-200 border  bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ease-in-out font-medium
        ${activeTab === tab.key
                  ? "bg-pink-400 text-white shadow-md scale-[1.02]"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 col-span-2 border bg-white rounded-2xl border-gray-200 p-3">
        {TAB_COMPONENTS[activeTab as keyof typeof TAB_COMPONENTS]}
      </main>

    </aside>
  );
}
