"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingBag, Tag, FileText, Sparkles, LogOut } from "lucide-react";
import Swal from "sweetalert2";

export default function Sizebar() {
  const pathname = usePathname();

  const data = [
    { title: "จัดการสต็อก", link: "/admin/stock", icon: Package },
    { title: "การสั่งซื้อ", link: "/admin/Ordering", icon: ShoppingBag },
    // { title: "บัญชี", link: "/admin/account", icon: Users },
    { title: "โปรโมชั่น", link: "/admin/promotion", icon: Tag },
    { title: "รายการ", link: "/admin/statement", icon: FileText },
    { title: "ออกระบบ", link: "#", icon: LogOut, isLogout: true },
  ];

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
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
      localStorage.clear();
      window.location.replace("/");
    }
  };

  return (
    <aside className="w-64 sticky top-0 h-screen border-r border-pink-100 bg-gradient-to-b from-pink-50/80 via-white to-pink-50/30 flex flex-col justify-between shadow-sm">

      {/* ส่วนหัว Sidebar */}
      <div>
        <div className="p-6 pb-4 flex items-center gap-3 border-b border-pink-100/60 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-gray-900 text-base tracking-wide">SquishyLand</h1>
            <p className="text-xs text-pink-500 font-semibold">Admin</p>
          </div>
        </div>

        {/* รายการเมนู */}
        <div className="px-3 space-y-1.5">
          <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">เมนูการจัดการ</p>
          {data.map((e, i) => {
            const Icon = e.icon;
            const isActive = pathname === e.link;

            if (e.isLogout) {
              return (
                <button
                  key={i}
                  onClick={handleLogout}
                  className="
                    w-full
                    text-[14px]
                    flex
                    items-center
                    gap-3.5
                    px-4
                    py-3
                    rounded-2xl
                    font-semibold
                    text-gray-600
                    transition-all
                    duration-200
                    hover:bg-rose-50
                    hover:text-rose-600
                    active:scale-[0.98]
                    cursor-pointer
                    group
                  "
                >
                  <Icon className="w-5 h-5 text-rose-400 group-hover:text-rose-500 transition-colors duration-200" />
                  <span>{e.title}</span>
                </button>
              );
            }

            return (
              <Link
                href={e.link!}
                key={i}
                className={`
                  w-full
                  text-[14px]
                  flex
                  items-center
                  gap-3.5
                  px-4
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-200
                  active:scale-[0.98]
                  cursor-pointer
                  group
                  ${isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-200/70 scale-[1.02]"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-400 hover:text-white hover:shadow-lg hover:shadow-pink-200/70"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-white" : "text-pink-400 group-hover:text-white"
                    }`}
                />
                <span>{e.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}