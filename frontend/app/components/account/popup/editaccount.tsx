'use client'
import axios from "axios"
import { propsaccount } from "@/app/admin/account/page"
import { useState } from "react"
import { post } from "@/app/post"
import { motion } from 'motion/react'

interface EditaccountProps {
    user: propsaccount
    onClose: () => void
    onUpdate: (user: propsaccount) => void
}

export default function Editaccount({
    user,
    onClose,
    onUpdate
}: EditaccountProps) {

    const [formData, setFormData] = useState({
        full_name: user.full_name,
        email: user.email,
        status: user.stauts,
        address: user.address || "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await axios.put(
                `${post}/auth/updateUserProfile/${user.id}`,
                formData
            )

            if (res.data.success) {
                onUpdate(res.data.data)
                onClose()
            }
        } catch (err) {
            console.error(err)
            alert("เกิดข้อผิดพลาด")
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center'>

            <div
                onClick={onClose}
                className="fixed inset-0"
            />

            <div className="w-150 h-150 bg-white rounded-2xl p-5 z-50">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">แก้ไขข้อมูลส่วนตัว</h2>
                    <p className="text-gray-500 text-sm">ปรับปรุงรายละเอียดบัญชีของคุณ</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 mt-5">
                        <label className="text-sm font-semibold text-gray-600">ชื่อ-นามสกุล</label>
                        <input
                            defaultValue={user.full_name}
                            onChange={(e) =>
                                setFormData({ ...formData, full_name: e.target.value })
                            }
                            type="text"
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition" placeholder="กรอกชื่อของคุณ" />
                    </div>

                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-semibold text-gray-600">อีเมล</label>
                        <input
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            } defaultValue={user.email}
                            type="text"
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition" placeholder="กรอกชื่ออีเมล" />
                    </div>

                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-semibold text-gray-600">สิทธ์</label>
                        <select
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value
                                })
                            }
                            className="border border-gray-300 text-sm font-semibold text-gray-600 rounded-2xl p-3 px-2 focus:outline-none focus:ring-2 focus:ring-pink-500 duration-200 transition">
                            <option value="ลูกค้า">ลูกค้า</option>
                            <option value="แอดมิน">แอดมิน</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-semibold text-gray-600">ที่อยู่</label>
                        <textarea
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    address: e.target.value
                                })
                            }}
                            defaultValue={user.address}
                            rows={4}
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"></textarea>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={onClose}
                            type="button" className="flex-1 py-3 cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition">
                            ยกเลิก
                        </button>
                        <button type="submit" className="flex-1 py-3 cursor-pointer rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-medium transition shadow-md shadow-blue-200">
                            บันทึกข้อมูล
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    )
}