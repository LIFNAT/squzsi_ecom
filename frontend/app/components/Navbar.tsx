"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserProfile = {
  id?: number;
  full_name?: string;
  email?: string;
  created_at?: string;
  status?: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก localStorage
    const loadUser = () => {
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem("user");

      if (!stored) {
        setUser(null);
        return;
      }

      try {
        const userData = JSON.parse(stored);
        setUser(userData);
      } catch {
        setUser(null);
      }
    };

    // 1. โหลดข้อมูลครั้งแรกตอนเปิดหน้าเว็บ
    loadUser();

    // 2. ตรวจจับการเปลี่ยนแปลงจากหน้าต่าง/แท็บอื่น (Storage Event)
    window.addEventListener("storage", loadUser);

    // 3. ตรวจจับการเปลี่ยนแปลงในหน้าเดียวกัน (Custom Event)
    window.addEventListener("userUpdate", loadUser);

    // ล้าง Event listener เมื่อ Component ถูกทำลาย
    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdate", loadUser);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-pink-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🧸</span>
          <span className="text-xl font-bold text-pink-500 tracking-tight group-hover:text-pink-400 transition-colors duration-200">
            SquishyLand
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/">
            <p className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-pink-500 hover:text-white active:scale-95 transition-all duration-500 ">
              หน้าหลัก
            </p>
          </Link>
          <Link href="/Home/allitem">
            <p className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-pink-500 hover:text-white active:scale-95 transition-all duration-500 ">
              ซื้อของ
            </p>
          </Link>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-3">

          <Link href="/like" className="relative p-2 rounded-full text-gray-500 cursor-pointer hover:text-pink-500 hover:bg-pink-50 transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 bg-pink-400 rounded-full"></span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-full text-gray-500 cursor-pointer hover:text-pink-500 hover:bg-pink-50 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13l-1-4m5 4v6m4-6v6" />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 bg-pink-400 rounded-full"></span>
          </Link>

          {/* Login / Profile Button */}
          <Link
            href={
              !user
                ? "/auth/login"
                : user.status === "ผู้ดูแลระบบ"
                  ? "/superadmin" // ถ้าเป็นผู้ดูแลระบบ ไปหน้า superadmin
                  : user.status === "แอดมิน" || user.status === "admin"
                    ? "/admin/stock"
                    : user.status === "ลูกค้า"
                      ? "/user/profile"
                      : "/"
            }
            className="ml-1 px-4 py-2 bg-pink-400 text-white text-sm font-semibold rounded-full hover:bg-pink-500 active:scale-95 transition-all duration-200 shadow-sm shadow-pink-200 max-w-[150px] truncate"
          >
            {user ? user.full_name : "Login"}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {
        menuOpen && (
          <div className="md:hidden bg-white/95 border-t border-pink-100 px-6 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors duration-200">
              หน้าหลัก
            </Link>
            <Link href="/Home/allitem" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors duration-200">
              ซื้อของ
            </Link>
            <div className="flex items-center gap-4 pt-2 border-t border-pink-50">
              <Link
                href={
                  !user
                    ? "/auth/login"
                    : user.status === "แอดมิน"
                      ? "/admin/stock"
                      : user.status === "ลูกค้า"
                        ? "/user/profile"
                        : "/"
                }
                className="px-5 py-2 bg-pink-400 text-white text-sm font-semibold rounded-full hover:bg-pink-500 transition-all duration-200"
              >
                {user ? user.full_name : "Login"}
              </Link>
            </div>
          </div>
        )
      }
    </header >
  );
}