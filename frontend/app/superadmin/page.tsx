"use client";

import { useState } from "react";
import Sizebar from "./component/sizebar";
import Superadmincontrol from "./component/superadmincontrol";
import Statement from "../components/statementpage/page";
import { useSuperadmin } from "../hooks/useAdminGuard";
import { Sparkles } from "lucide-react";

export default function Superadmin() {
    const [currentTab, setCurrentTab] = useState("statement"); // ค่าเริ่มต้นแสดงหน้าจัดการผู้ใช้งาน

    const loading = useSuperadmin();

    // ระหว่างเช็คสิทธิ์หรือกำลังดีดออกหน้าแรก ให้แสดงหน้าจอโหลดสวยๆ ป้องกันการกะพริบ
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-pink-200 animate-bounce mb-4">
                    <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-gray-600">กำลังตรวจสอบสิทธิ์การเข้าใช้งาน...</p>
                <p className="text-xs text-gray-400 mt-1">กรุณารอสักครู่ ระบบกำลังพาคุณไปยังหน้าควบคุม</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Sidebar ด้านซ้าย */}
            <Sizebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

            {/* พื้นที่แสดงเนื้อหาด้านขวา */}
            <main className="flex-1 overflow-y-auto">
                {currentTab === "overview" && (
                    <div className="max-w-7xl mx-auto px-6 py-10">
                        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">ภาพรวมรายได้และคำสั่งซื้อ</h1>
                        <p className="text-sm text-gray-500 mb-6">สรุปสถิติยอดขายและรายการคำสั่งซื้อภายในร้าน SquishyLand</p>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center py-20 text-gray-400">
                            (พื้นที่แสดงกราฟและข้อมูลภาพรวมรายได้)
                        </div>
                    </div>
                )}

                {currentTab === "users" && (
                    <Superadmincontrol />
                )}

                {currentTab === "statement" && (
                    <Statement />
                )}
            </main>
        </div>
    );
}