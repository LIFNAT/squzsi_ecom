"use client";

import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { propsgetProduct } from "../page";
import { useState } from "react";

interface propsProductCard {
  respobaw: propsgetProduct[];
  category: string;
}

export const categories = [
  { name: "all", emoji: "🛍️", sub: 'รายการทั้งหมด' },
  { name: "Vegetable", sub: "Local market", emoji: "🥦" },
  { name: "Snacks & Breads", sub: "Sri-khen chimney", emoji: "🥖" },
  { name: "Fruits", sub: "Central line", emoji: "🍎" },
  { name: "Chicken legs", sub: "Imported Meat", emoji: "🍗" },
  { name: "Milk & Dairy", sub: "Preserved food", emoji: "🥛" },
];

export default function AllItem({ respobaw, category }: propsProductCard) {
  //  1. สร้าง State สำหรับเก็บคำค้นหา
  const [searchQuery, setSearchQuery] = useState<string>("");

  // โหลดข้อมูล Wishlist จาก localStorage ผ่าน Lazy Initializer
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // ฟังก์ชันกดหัวใจ (สลับสถานะ บันทึก/ลบ ออกจาก localStorage และอัปเดต State ทันที)
  const toggleWishlist = (product: propsgetProduct) => {
    let updatedWishlist: number[];
    const isExist = wishlist.includes(product.id);

    if (isExist) {
      updatedWishlist = wishlist.filter((id) => id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product.id];

      if (typeof window !== "undefined") {
        try {
          const savedProducts = localStorage.getItem("wishlist_items");
          const currentProducts: propsgetProduct[] = savedProducts ? JSON.parse(savedProducts) : [];
          if (!currentProducts.some((p) => p.id === product.id)) {
            localStorage.setItem("wishlist_items", JSON.stringify([...currentProducts, product]));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    setWishlist(updatedWishlist);
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  //  2. กรองสินค้าตามหมวดหมู่ (Category) และคำค้นหา (Search Query) พร้อมกัน
  const filterProducts = respobaw.filter((item) => {
    // เช็คหมวดหมู่
    const matchesCategory = category === "all" || item.category === category;

    // เช็คชื่อสินค้าหรือรายละเอียดที่ตรงกับคำค้นหา (ไม่สนตัวA-Zพิมพ์เล็กพิมพ์ใหญ่)
    const matchesSearch =
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-10 min-h-screen"
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-pink-400 px-8 py-10 md:px-12 md:py-12 mb-8">
        <div className="relative z-10 max-w-md">
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
            SquishyLand
            <br />
            เริ่ดมากกกกกกกกกกกก
          </h1>
          <p className="text-emerald-100/80 text-sm mb-6 max-w-xs">
            ราคาเป็นมิตร และปลอดภัย ไม่มีสารเคมี
          </p>
          <button className="bg-pink-200 cursor-pointer hover:bg-pink-100 hover:scale-110 duration-200 transition-all text-emerald-950 font-semibold px-5 py-2.5 rounded-full text-sm">
            ซื้อเลย
          </button>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] md:text-[160px] select-none opacity-90">
          <Image
            src="https://api.candypop.lt/media/image/7e/00/0c1b78279a40fea6180b6ee00dcd.png"
            alt="SquishyLand logo"
            width={120}
            height={120}
          />
        </div>
      </div>

      {/*  Search Bar Component */}
      <div className="relative mb-8 w-100">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาสินค้า ชื่อ หรือรายละเอียด..."
          className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-6 grid-cols-3 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={
              cat.name === "all"
                ? "/Home/allitem"
                : `/Home/allitem?category=${encodeURIComponent(cat.name)}`
            }
            className="bg-white rounded-2xl border cursor-pointer duration-200 border-gray-100 p-4 flex flex-col items-start text-left hover:border-emerald-300 transition-colors shadow-sm"
          >
            <span className="text-2xl mb-2">{cat.emoji}</span>
            <span className="text-sm font-semibold text-gray-900">
              {cat.name}
            </span>
            <span className="text-xs text-gray-400">
              {cat.sub}
            </span>
          </Link>
        ))}
      </div>

      {/* You might need / Results Header */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {searchQuery ? `ผลการค้นหา "${searchQuery}"` : "You might need"}
        </h2>
        <span className="text-xs text-gray-400">
          พบสินค้าทั้งหมด {filterProducts.length} ชิ้น
        </span>
      </div>

      {/* Product List Grid */}
      {filterProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm mt-4">
          <p className="text-gray-400 text-base">ไม่พบสินค้าที่คุณกำลังค้นหา</p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs font-bold text-pink-500 bg-pink-50 px-4 py-2 rounded-full hover:bg-pink-100 transition-colors cursor-pointer"
          >
            ล้างคำค้นหา
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
          {filterProducts.map((e, i) => {
            const isLiked = wishlist.includes(e.id);

            return (
              <div key={i}>
                {/* Info */}
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-100/60 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col border border-pink-50">

                  <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 aspect-square">
                    <img
                      src={e.producy_image?.[0] || "/no-image.png"}
                      alt={e.product_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                    <div className="absolute inset-0 flex justify-end p-3 pointer-events-none">
                      <button
                        onClick={() => toggleWishlist(e)}
                        className="cursor-pointer focus:outline-none pointer-events-auto h-fit"
                        aria-label="Wishlist button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-9 h-9 p-2 rounded-full duration-300 shadow-sm transition-all transform active:scale-75 ${isLiked
                              ? "bg-pink-500 text-white scale-110"
                              : "bg-white/80 backdrop-blur-sm text-gray-400 hover:text-pink-500"
                            }`}
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="font-bold text-gray-700 text-base leading-snug group-hover:text-pink-500 transition-colors duration-200">
                      {e.product_name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      หมวดหมู่: {e.category}
                    </p>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      รายละเอียด : {e.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-extrabold text-pink-500">
                        ${e.price}
                      </span>

                      <Link
                        href={`/aboutitem/${e.id}`}
                        className="px-4 py-2 rounded-full text-xs font-bold bg-pink-500 text-white hover:bg-pink-600 cursor-pointer transition-all duration-300 active:scale-95"
                      >
                        ดูสินค้า
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}