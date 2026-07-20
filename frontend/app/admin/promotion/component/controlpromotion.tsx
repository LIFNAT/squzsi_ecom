
"use client";

import { post } from "@/app/post";
import { useEffect, useState } from "react";

interface Promotion {
    id: number;
    code: string;
    name: string;
    discount: number;
    type: "บาท" | "%";
    startDate: string;
    endDate: string;
    status: "เปิดใช้งาน" | "ปิดใช้งาน"; // ปรับให้ตรงกับ UI
}

export default function Controlpromotion() {

    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [editId, setEditId] = useState<number | null>(null);

    // 1. เพิ่ม status เป็นค่าเริ่มต้นใน form state
    const [form, setForm] = useState({
        code: "",
        name: "",
        discount: 0,
        type: "บาท",
        status: "เปิดใช้งาน",
        startDate: "",
        endDate: ""
    });

    const getPromotions = async () => {
        try {
            const res = await fetch(`${post}/promotion`);
            const data = await res.json();
            setPromotions(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (err) {
            console.log(err);
            setPromotions([]);
        }
    };

    useEffect(() => {
        getPromotions();
    }, []);

    const addPromotion = async () => {
        try {
            const res = await fetch(`${post}/promotion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error("เพิ่มโปรโมชั่นไม่สำเร็จ");
            }

            await getPromotions();
            clearForm();
        } catch (err) {
            console.log(err);
        }
    };

    const deletePromotion = async (id: number) => {
        try {
            await fetch(`${post}/promotion/${id}`, {
                method: "DELETE"
            });
            await getPromotions();
        } catch (err) {
            console.log(err);
        }
    };

    // 2. เพิ่ม item.status เข้าไปในฟอร์มตอนกดแก้ไข
    const editPromotion = (item: Promotion) => {
        setEditId(item.id);
        setForm({
            code: item.code,
            name: item.name,
            discount: item.discount,
            type: item.type,
            status: item.status || "เปิดใช้งาน", // ดึงค่าสเตตัสมาใส่ใน Form
            startDate: item.startDate,
            endDate: item.endDate
        });
    };

    const updatePromotion = async () => {
        try {
            await fetch(`${post}/promotion/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            await getPromotions();
            clearForm();
        } catch (err) {
            console.log(err);
        }
    };

    // 3. รีเซ็ตกลับเป็น "เปิดใช้งาน" ตอนเคลียร์ฟอร์ม
    const clearForm = () => {
        setEditId(null);
        setForm({
            code: "",
            name: "",
            discount: 0,
            type: "บาท",
            status: "เปิดใช้งาน",
            startDate: "",
            endDate: ""
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-sm text-gray-700">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>🎟️</span> จัดการโปรโมชั่น
                </h1>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
                <h2 className="text-base font-semibold text-gray-800 mb-4">
                    {editId ? "⚡ แก้ไขโปรโมชั่น" : "✨ เพิ่มโปรโมชั่นใหม่"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 items-end">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">รหัสโปรโมชั่น</label>
                        <input
                            type="text"
                            placeholder="เช่น SALE50"
                            value={form.code}
                            onChange={(e) => setForm({ ...form, code: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อโปรโมชั่น</label>
                        <input
                            type="text"
                            placeholder="รายละเอียด"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">ส่วนลด</label>
                        <input
                            type="number"
                            placeholder="ตัวเลข"
                            value={form.discount}
                            onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">รูปแบบ</label>
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        >
                            <option value="บาท">ลดเป็นบาท</option>
                            <option value="%">ลดเป็น %</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">สถานะ</label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        >
                            <option value="เปิดใช้งาน">เปิดใช้งาน</option>
                            <option value="ปิดใช้งาน">ปิดใช้งาน</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">วันเริ่มทำงาน</label>
                        <input
                            type="date"
                            value={form.startDate}
                            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">วันหมดอายุ</label>
                        <input
                            type="date"
                            value={form.endDate}
                            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                    {editId && (
                        <button
                            onClick={clearForm}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-xl transition-colors"
                        >
                            ยกเลิก
                        </button>
                    )}
                    <button
                        onClick={editId ? updatePromotion : addPromotion}
                        className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl shadow-sm shadow-pink-100 transition-colors"
                    >
                        {editId ? "บันทึกการแก้ไข" : "เพิ่มโปรโมชั่น"}
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-base font-semibold text-gray-800">📋 รายการโปรโมชั่นทั้งหมด</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="p-3 pl-5">รหัส</th>
                                <th className="p-3">ชื่อโปรโมชั่น</th>
                                <th className="p-3 text-center">ส่วนลด</th>
                                <th className="p-3 text-center">ระยะเวลาใช้งาน</th>
                                <th className="p-3 text-center">สถานะ</th>
                                <th className="p-3 pr-5 text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {promotions.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                                    <td className="p-3 pl-5 font-mono font-bold text-pink-600">
                                        {item.code}
                                    </td>
                                    <td className="p-3 font-medium text-gray-900">
                                        {item.name}
                                    </td>
                                    <td className="p-3 text-center font-semibold text-gray-800">
                                        {item.discount} {item.type}
                                    </td>
                                    <td className="p-3 text-center text-xs text-gray-500 leading-relaxed">
                                        <span className="text-gray-700">{item.startDate}</span>
                                        <span className="mx-1 text-gray-400">→</span>
                                        <span className="text-gray-700">{item.endDate}</span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === "เปิดใช้งาน"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-gray-100 text-gray-600 border-gray-200"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === "เปิดใช้งาน" ? "bg-green-500" : "bg-gray-400"
                                                }`}></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-3 pr-5 text-right space-x-1">
                                        <button
                                            onClick={() => editPromotion(item)}
                                            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-blue-600 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => deletePromotion(item.id)}
                                            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-red-600 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

