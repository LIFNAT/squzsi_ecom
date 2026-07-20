"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Shield, Edit3, X, Eye, Users, UserCheck, UserX } from "lucide-react";
import Swal from "sweetalert2";

interface UserProfile {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    status: string;
    address: string;
    created_at: string;
}

export default function Superadmincontrol() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // State สำหรับระบบกรองข้อมูล (filter: "all" | "admin" | "customer")
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Modal States
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    // Edit Form State
    const [editForm, setEditForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        status: "",
        password: ""
    });

    // 1. ดึงข้อมูลผู้ใช้ทั้งหมดจาก API หลังบ้าน
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/auth/accountuserprofile");
            const result = await res.json();

            if (result.success) {
                setUsers(result.data);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
            Swal.fire("Error", "ไม่สามารถดึงข้อมูลผู้ใช้งานได้", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // เปิด Modal ดูรายละเอียด
    const handleViewDetails = (user: UserProfile) => {
        setSelectedUser(user);
        setViewModalOpen(true);
    };

    // เปิด Modal แก้ไขข้อมูล
    const handleOpenEdit = (user: UserProfile) => {
        setSelectedUser(user);
        setEditForm({
            full_name: user.full_name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            status: user.status || "ลูกค้า",
            password: ""
        });
        setEditModalOpen(true);
    };

    // ส่งข้อมูลอัปเดตไปที่ API หลังบ้าน
    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        try {
            const res = await fetch(`http://localhost:5000/auth/updateUserProfile/${selectedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });

            const result = await res.json();

            if (result.success) {
                Swal.fire({
                    icon: "success",
                    title: "อัปเดตสำเร็จ!",
                    text: "ข้อมูลผู้ใช้งานและรหัสผ่านถูกอัปเดตเรียบร้อยแล้ว",
                    timer: 1500,
                    showConfirmButton: false
                });
                setEditModalOpen(false);
                fetchUsers();
            } else {
                Swal.fire("Error", result.message || "อัปเดตไม่สำเร็จ", "error");
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error", "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์", "error");
        }
    };

    // คำนวณสถิติ
    const totalUsers = users.length;
    const adminCount = users.filter((u) => u.status === "admin" || u.status === "ผู้ดูแลระบบ" || u.status === "แอดมิน").length;
    const customerCount = users.filter((u) => u.status !== "admin" && u.status !== "ผู้ดูแลระบบ" && u.status !== "แอดมิน").length;

    // กรองข้อมูลผู้ใช้ตามปุ่ม Filter ที่เลือก
    const filteredUsers = users.filter((user) => {
        const isAdmin = user.status === "admin" || user.status === "ผู้ดูแลระบบ" || user.status === "แอดมิน";
        if (filterStatus === "admin") return isAdmin;
        if (filterStatus === "customer") return !isAdmin;
        return true; // "all"
    });

    return (
        <div className=" mx-auto px-6 py-10 min-h-screen bg-gray-50/50">

            {/* Header Title */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Shield className="w-7 h-7 text-pink-500" /> Super Admin Control Panel
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        จัดการและตรวจสอบข้อมูลบัญชีผู้ใช้งานทั้งหมดในระบบ SquishyLand
                    </p>
                </div>
            </div>

            {/* --- GRID 3 ช่อง แสดงสถิติผู้ใช้งาน --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ผู้ใช้งานทั้งหมด</p>
                        <h3 className="text-2xl font-extrabold text-gray-900">{totalUsers} <span className="text-sm font-normal text-gray-500">คน</span></h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ผู้ดูแลระบบ (Admin)</p>
                        <h3 className="text-2xl font-extrabold text-purple-600">{adminCount} <span className="text-sm font-normal text-gray-500">คน</span></h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <UserCheck className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ลูกค้าทั่วไป</p>
                        <h3 className="text-2xl font-extrabold text-blue-600">{customerCount} <span className="text-sm font-normal text-gray-500">คน</span></h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <UserX className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* --- แถบปุ่มกรองข้อมูล (Filter Buttons) --- */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                        filterStatus === "all"
                            ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                            : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                    }`}
                >
                    ทั้งหมด ({totalUsers})
                </button>
                <button
                    onClick={() => setFilterStatus("admin")}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                        filterStatus === "admin"
                            ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                            : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                    }`}
                >
                    ผู้ดูแลระบบ ({adminCount})
                </button>
                <button
                    onClick={() => setFilterStatus("customer")}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                        filterStatus === "customer"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                    }`}
                >
                    ลูกค้าทั่วไป ({customerCount})
                </button>
            </div>

            {/* Users Table Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-pink-50/50 border-b border-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                <th className="py-4 px-6">ID</th>
                                <th className="py-4 px-6">ชื่อ-นามสกุล</th>
                                <th className="py-4 px-6">อีเมล</th>
                                <th className="py-4 px-6">เบอร์โทรศัพท์</th>
                                <th className="py-4 px-6">สถานะ (Status)</th>
                                <th className="py-4 px-6 text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-400">
                                        กำลังโหลดข้อมูล...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-400">
                                        ไม่พบข้อมูลผู้ใช้งานตามเงื่อนไขที่กรอง
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-pink-50/20 transition-colors">
                                        <td className="py-4 px-6 font-mono text-gray-400">#{user.id}</td>
                                        <td className="py-4 px-6 font-bold text-gray-800">{user.full_name}</td>
                                        <td className="py-4 px-6 text-gray-600">{user.email}</td>
                                        <td className="py-4 px-6 text-gray-600">{user.phone || "-"}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                                                user.status === "admin" || user.status === "ผู้ดูแลระบบ" || user.status === "แอดมิน"
                                                    ? "bg-purple-100 text-purple-600"
                                                    : "bg-pink-100 text-pink-600"
                                            }`}>
                                                {user.status || "ลูกค้า"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* ปุ่มดูรายละเอียดทั้งหมด */}
                                                <button
                                                    onClick={() => handleViewDetails(user)}
                                                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors cursor-pointer"
                                                    title="ดูรายละเอียด"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {/* ปุ่มแก้ไขข้อมูล */}
                                                <button
                                                    onClick={() => handleOpenEdit(user)}
                                                    className="p-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-xl transition-colors cursor-pointer"
                                                    title="แก้ไขข้อมูลและรหัสผ่าน"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODAL: VIEW DETAILS --- */}
            {viewModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setViewModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl">
                                {selectedUser.full_name?.charAt(0) || "U"}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">รายละเอียดข้อมูลผู้ใช้</h3>
                                <p className="text-xs text-gray-400 font-mono">ID: #{selectedUser.id}</p>
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-50/70 p-4 rounded-2xl border border-gray-100 text-sm">
                            <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
                                <span className="text-gray-500 flex items-center gap-2"><User className="w-4 h-4 text-pink-500" /> ชื่อ-นามสกุล:</span>
                                <span className="font-semibold text-gray-800">{selectedUser.full_name}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
                                <span className="text-gray-500 flex items-center gap-2"><Mail className="w-4 h-4 text-pink-500" /> อีเมล:</span>
                                <span className="font-semibold text-gray-800">{selectedUser.email}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
                                <span className="text-gray-500 flex items-center gap-2"><Phone className="w-4 h-4 text-pink-500" /> เบอร์โทรศัพท์:</span>
                                <span className="font-semibold text-gray-800">{selectedUser.phone || "ไม่ได้ระบุ"}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
                                <span className="text-gray-500 flex items-center gap-2"><Shield className="w-4 h-4 text-pink-500" /> สถานะสิทธิ์:</span>
                                <span className="font-semibold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full">{selectedUser.status}</span>
                            </div>
                            <div className="flex flex-col gap-1 pb-1">
                                <span className="text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4 text-pink-500" /> ที่อยู่จัดส่ง:</span>
                                <p className="font-medium text-gray-800 pl-6 leading-relaxed">{selectedUser.address || "ยังไม่มีข้อมูลที่อยู่"}</p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 text-xs text-gray-400">
                                <span>วันที่สร้างบัญชี:</span>
                                <span>{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString("th-TH") : "-"}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setViewModalOpen(false)}
                                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full text-sm transition-colors cursor-pointer"
                            >
                                ปิดหน้าต่าง
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL: EDIT USER --- */}
            {editModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setEditModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-pink-500" /> แก้ไขข้อมูลผู้ใช้ #{selectedUser.id}
                        </h3>

                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">ชื่อ-นามสกุล</label>
                                <input
                                    type="text"
                                    value={editForm.full_name}
                                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">อีเมล</label>
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">รหัสผ่านใหม่ (เว้นว่างไว้หากไม่ต้องการเปลี่ยน)</label>
                                <input
                                    type="password"
                                    value={editForm.password}
                                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                    placeholder="กรอกรหัสผ่านใหม่..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">เบอร์โทรศัพท์</label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">ที่อยู่</label>
                                <textarea
                                    rows={2}
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full text-sm transition-colors cursor-pointer"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full text-sm transition-colors cursor-pointer shadow-md shadow-pink-200"
                                >
                                    บันทึกการแก้ไข
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}