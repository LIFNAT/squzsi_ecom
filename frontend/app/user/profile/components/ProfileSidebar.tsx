"use client";

import { useEffect, useState } from "react";
import AddressSection from "./AddressSection";
import OrdersSection from "./OrdersSection";
import Profileeidt from "./profileeidt";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  full_name: string;
  email: string;
  address: string;
  status: string;
  created_at: string;
  phone: string
}

const TABS = [
  { key: "orders", label: "คำสั่งซื้อของฉัน", icon: "" },
  { key: "address", label: "ที่อยู่จัดส่ง", icon: "" },
  { key: "profileeidt", label: "เเก้ไขโปรโฟล์", icon: "" },
  { key: "out", label: "ออกระบบ", icon: "" },
];

export default function ProfileSidebar() {
  const [activeTab, setActiveTab] = useState("orders");
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user");

      if (data) {
        return JSON.parse(data);
      }
    }

    return null;
  });

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      router.replace("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(data);
      // อนุญาตให้เข้าได้เฉพาะลูกค้าเท่านั้น (หากเป็น แอดมิน หรือสถานะอื่น จะถูกบังคับเปลี่ยนเส้นทาง)
      if (parsedUser.status !== "ลูกค้า") {
        router.replace("/");
      }
    } catch {
      router.replace("/");
    }
  }, [router]);

  // 🛠️ ฟังก์ชันจัดการการคลิก Tab รวมถึงระบบออกระบบ (Logout)
  const handleTabClick = async (key: string) => {
    if (key === "out") {
      const result = await Swal.fire({
        title: "คุณต้องการออกจากระบบใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec4899",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "ใช่, ออกจากระบบ",
        cancelButtonText: "ยกเลิก"
      });

      if (result.isConfirmed) {
        // ล้างข้อมูลใน localStorage
        localStorage.clear();

        window.location.replace("/");
      }
      return;
    }

    setActiveTab(key);
  };

  const TAB_COMPONENTS = {
    orders: <OrdersSection />,
    address: <AddressSection />,
    profileeidt: <Profileeidt />
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
                <span className="text-gray-500">เมล</span>
                <span className="font-semibold text-pink-500">
                  {user?.email}
                </span>
              </div>

              <div className="text-sm flex justify-between">
                <p className="text-gray-500 mb-1">เบอร์ติดต่อ</p>
                <p className="text-gray-700 break-words">{user?.phone}</p>
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
        <div className="p-2 space-y-1 rounded-2xl border-gray-200 border bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)} // 👈 เปลี่ยนมาใช้ฟังก์ชัน handleTabClick ตัวใหม่
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ease-in-out font-medium
        ${activeTab === tab.key
                  ? "bg-pink-400 text-white shadow-md scale-[1.02]"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                } ${tab.key === 'out' ? 'hover:bg-red-50 hover:text-red-500' : ''}`} // 💡 เพิ่มสีแดงจางๆ ตอนชี้ปุ่มออกระบบ
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
