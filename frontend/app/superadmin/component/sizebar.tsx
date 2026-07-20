"use client";

import {  Users, TrendingUp, Sparkles, LogOut } from "lucide-react";
import Swal from "sweetalert2";

interface SizebarProps {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
}

export default function Sizebar({ currentTab, setCurrentTab }: SizebarProps) {

    const menuItems = [
        {
            id: "statement",
            label: "ภาพรวมรายได้และคำสั่งซื้อ",
            icon: TrendingUp,
        },
        {
            id: "users",
            label: "จัดการผู้ใช้งาน",
            icon: Users,
        },
        {
            id: "out",
            label: "จัดการผู้ใช้งาน",
            icon: LogOut,
        },
    ];


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

        setCurrentTab(key);
    };

    return (
        <aside className="w-64  sticky top-0 h-screen bg-gradient-to-b from-pink-50/70 via-white to-pink-50/30 border-r border-pink-100/60 p-6 flex flex-col justify-between shadow-sm">
            <div>
                {/* Logo / Brand */}
                <div className="flex items-center gap-3 mb-10 px-2 pb-6 border-b border-pink-100/60">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-extrabold text-gray-900 tracking-wide">SquishyLand</h2>
                        <p className="text-xs text-pink-500 font-bold uppercase tracking-wider">Superadmin</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">เมนูหลัก</p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`w-full group flex items-center pl-3 gap-2 py-3 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer ${isActive && item.id !== "out"
                                    ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-200/70 scale-[1.02]"
                                    : "text-gray-600 hover:bg-pink-50/70 hover:text-pink-600"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 transition-colors duration-200 ${isActive && item.id !== "out" ? "text-white" : "text-pink-400 group-hover:text-pink-500"
                                    }`} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
            {/* Footer / Info */}
        </aside>
    );
}