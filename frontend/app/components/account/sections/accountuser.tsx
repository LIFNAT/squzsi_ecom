'use client'

import { propsaccount } from "@/app/admin/account/page"
import Image from "next/image"
import Editaccount from "../popup/editaccount"
import { useState } from "react"
import { AnimatePresence } from "motion/react"

interface psopsAccountuser {
    respodaw: propsaccount[]
}

export default function Accountuser({ respodaw }: psopsAccountuser) {

    const [popupEditaccount, setpopupEditaccount] = useState(false)
    const [selectedUser, setSelectedUser] = useState<propsaccount | null>(null)
    const [users, setUsers] = useState(respodaw)
    const [search, setsearch] = useState('')

    // searchuser
    const filteredUser = users.filter((user) =>
        user.full_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.address.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="bg-white h-1000 rounded-2xl  px-10 py-4 border  border-gray-200 ">
            <div className="flex  sm:flex-row gap-3 mb-5 flex-wrap">
                <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        🔍
                    </span>
                    <input
                        id="stock-search"
                        type="text"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        placeholder="ค้นหาชื่อลูกค้า"
                        className="w-full pl-9 pr-4 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200"
                    />
                </div>
                <select
                    id="stock-filter-category"
                    className="px-3 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200"
                >
                    <option value="">	สถานะ</option>
                    {/* {nearexproduct.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))} */}
                </select>
            </div>
            <table className="w-full min-w-[1000px] text-sm">
                <thead>
                    <tr className="text-left text-xs font-semibold text-gray-400 border-b border-gray-100">
                        <th className="pb-3 pr-4 w-12">รูป</th>
                        <th className="pb-3 pl-3">ชื่อ</th>
                        <th className="pb-3 pr-4">email</th>
                        <th className="pb-3 pr-4  w-100 ">ที่อยุ่</th>
                        <th className="pb-3 pr-4  ">สิทธ์</th>
                        <th className="pb-3 text-right">จัดการ</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUser.map((e, i) => {
                        return (
                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="py-3 pr-4">
                                    <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                        <Image
                                            src="/mqytoljtgeYfW558jDS-o.jpg"
                                            alt={e.email}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>

                                <td className="pb-3 pl-3">{e.full_name}</td>
                                <td className="pb-3 pr-4 ">{e.email}</td>
                                <td className="pb-3 pr-4 text-left">{e.address || '-'}</td>
                                <th className="pb-3 pr-4  text-left">{e.stauts}</th>
                                <td className="py-3 text-right">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(e)
                                            setpopupEditaccount(true)
                                        }}
                                        className="px-4 py-2 bg-pink-400 rounded-xl text-xs text-white hover:bg-pink-500 transition-all shadow-sm"
                                    >
                                        แก้ไข
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <AnimatePresence>
                {
                    popupEditaccount && selectedUser && (
                        <Editaccount
                            user={selectedUser}
                            onClose={() => setpopupEditaccount(false)}
                            onUpdate={(updatedUser) => {
                                setUsers(prev =>
                                    prev.map(user =>
                                        user.id === updatedUser.id
                                            ? updatedUser
                                            : user
                                    )
                                )
                            }}
                        />
                    )
                }
            </AnimatePresence>
        </div>
    )
}