"use client";
import { post } from "@/app/post"; // มั่นใจว่า path ตรงกับที่เก็บไฟล์ post
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Profileedit() {
    // ดึงค่าเริ่มต้นจาก localStorage
    const [form, setForm] = useState(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                return {
                    full_name: user.full_name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    address: user.address || ""
                };
            }
        }
        return {
            full_name: "",
            email: "",
            phone: "",
            address: ""
        };
    });

    const handleSave = async () => {
        if (!form.full_name.trim() || !form.email.trim()) {
            Swal.fire({
                icon: "warning",
                title: "ข้อมูลไม่ครบถ้วน",
                text: "กรุณากรอกชื่อและอีเมลด้วยครับ",
                confirmButtonColor: "#ec4899",
            });
            return;
        }

        try {
            const userData = localStorage.getItem("user");
            const currentUser = userData ? JSON.parse(userData) : {};

            if (!currentUser.id) {
                throw new Error("ไม่พบ User ID");
            }

            // 📝 แก้ไข URL จากเดิม /auth/${id} ➔ เป็น /auth/updateUserProfile/${id} ให้ตรงกับหลังบ้าน
            const res = await fetch(`${post}/auth/updateUserProfile/${currentUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    full_name: form.full_name.trim(),
                    email: form.email.trim(),
                    phone: form.phone ? form.phone.trim() : "",
                    address: form.address ? form.address.trim() : "",
                    status: currentUser.status || "ลูกค้า" // ส่งสถานะปัจจุบันของ User ไป
                })
            });

            const resultData = await res.json();

            if (!res.ok || !resultData.success) {
                throw new Error(resultData.message || "อัปเดตข้อมูลไม่สำเร็จ");
            }

            // เซฟทับ localStorage ด้วยข้อมูลชุดใหม่ที่ได้มาจากฐานข้อมูล Supabase
            const updatedUser = {
                ...currentUser,
                ...resultData.data
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));

            await Swal.fire({
                icon: "success",
                title: "บันทึกข้อมูลสำเร็จ 🎉",
                text: "ข้อมูลส่วนตัวของคุณถูกอัปเดตลงระบบแล้ว",
                confirmButtonColor: "#ec4899",
            });

            window.location.href = "/user/profile";

        } catch (err: any) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: err.message || "ไม่สามารถบันทึกข้อมูลได้",
                confirmButtonColor: "#ec4899",
            });
        }
    };

    const handleCancel = () => {
        window.location.href = "/user/profile";
    };

    return (
        <div className="min-h-screen bg-gray-50 text-sm text-gray-700 pb-12">
            {/* Header */}
            <div className="bg-[#EE2C6A] px-4 py-4 mb-6 shadow-sm">
                <div className="max-w-xl mx-auto flex items-center gap-2">
                    <button
                        onClick={handleCancel}
                        className="text-white hover:opacity-80 transition-opacity"
                    >
                        ←
                    </button>
                    <h1 className="text-white font-semibold text-base">แก้ไขข้อมูลส่วนตัว</h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">

                    {/* Avatar */}
                    <div className="flex flex-col items-center border-b border-gray-100 pb-4">
                        <div className="w-20 h-20 rounded-full bg-pink-100 border-2 border-pink-200 flex items-center justify-center text-2xl mb-2 text-pink-500 font-bold">
                            {form.full_name ? form.full_name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <p className="text-xs text-gray-400">บัญชีผู้ใช้งานของคุณ</p>
                    </div>

                    {/* ช่องกรอก ชื่อ-นามสกุล */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อ - นามสกุล</label>
                        <input
                            type="text"
                            placeholder="กรอกชื่อ-นามสกุลของคุณ"
                            value={form.full_name}
                            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>

                    {/* ช่องกรอก อีเมล */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">อีเมล</label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>

                    {/* ช่องกรอก เบอร์โทรศัพท์ */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">เบอร์โทรศัพท์</label>
                        <input
                            type="number"
                            maxLength={10}
                            placeholder="เช่น 0891234567"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>

                    {/* ช่องกรอก ที่อยู่จัดส่ง */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">ที่อยู่สำหรับจัดส่งสินค้า</label>
                        <textarea
                            rows={3}
                            placeholder="กรอกที่อยู่ บ้านเลขที่ ซอย ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none resize-none leading-relaxed"
                        />
                    </div>

                    {/* ปุ่มกด */}
                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-xl transition-colors"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-6 py-2.5 bg-[#EE2C6A] hover:bg-[#D4235C] text-white font-medium rounded-xl shadow-sm transition-colors"
                        >
                            บันทึกข้อมูล
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}