import { propsaccount } from "@/app/admin/account/page"

interface propsSCoremanagement {
    respodaw: propsaccount[]
}

export default function Scoremanagement({ respodaw }: propsSCoremanagement) {

    const toteluserprofile = respodaw.length
    const toteladminprfile = respodaw.filter(
        (user) => user.stauts === 'แอดมิน'
    ).length

    const managemen = [
        { title: 'บัญชีทั้งหมด', value: toteluserprofile, color: 'text-pink-500' },
        { title: 'เเอดมิน', value: toteladminprfile, color: 'text-sky-400' },
    ]

    return (
        <div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-sm">
                    👤
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-800">User Management</h1>
                    <p className="text-sm text-gray-400 mt-0.5">จัดการบัญชีผู้ใช้งานทั้งหมด</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-10">
                {managemen.map((e, i) => {
                    return (
                        <div
                            key={i}
                            className="border p-3 rounded-[15px] bg-white border-gray-200"
                        >
                            <p className="text-gray-500 ">{e.title}</p>
                            <p className={`${e.color} text-[18px] font-semibold`}>{e.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}