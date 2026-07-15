"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { propsgetProduct } from "../page";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  // const [selectcategor, setselectcategor] = useState('all')

  // const filterProducts = selectcategor === 'all'
  //   ? respobaw
  //   : respobaw.filter(
  //     (i) => i.category === selectcategor
  //   )

  const filterProducts =
    category === "all"
      ? respobaw
      : respobaw.filter(
        (i) => i.category === category
      );

  console.log("category from URL =", category);
  console.log(
    "categories in DB =",
    respobaw.map((i) => i.category)
  );

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-10 min-h-screen"
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-pink-400 px-8 py-10 md:px-12 md:py-12">
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

      {/* Categories */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-3 mt-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={
              cat.name === "all"
                ? "/Home/allitem"
                : `/Home/allitem?category=${encodeURIComponent(cat.name)}`
            }
            className="bg-white rounded-2xl border cursor-pointer duration-200 border-gray-100 p-4 flex flex-col items-start text-left hover:border-emerald-300 transition-colors"
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
        <Link
          href="/Home/item"
          className="bg-white rounded-2xl border cursor-pointer duration-200 border-gray-100 p-4 flex flex-col items-start text-left hover:border-emerald-300 transition-colors"
        >
          <span className="text-2xl mb-2">🛒</span>
          <span className="text-sm font-semibold text-gray-900">All Items</span>
          <span className="text-xs text-gray-400">ดูสินค้าทั้งหมด</span>
        </Link>
      </div>

      {/* You might need */}
      <div className="flex items-center justify-between mt-10 mb-4 ">
        <h2 className="text-xl font-bold text-gray-900">You might need</h2>
        <Link
          href="/Home/item"
          className="text-sm font-medium text-emerald-600 flex items-center gap-1 hover:text-emerald-700"
        >
          See more
        </Link>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {filterProducts.map((e, i) => {
          return (
            <div key={i}>
              {/* Info */}
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-100/60 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-2 transition-all duration-300 flex flex-col border border-pink-50">

                <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 aspect-square">
                  <img
                    src={e.producy_image?.[0] || "/no-image.png"}
                    alt={e.product_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                  <div className="absolute inset-0 flex justify-end p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 p-2  bg-gray-50 text-gray-300  rounded-full group-hover:bg-pink-400 group-hover:text-white duration-300"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
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
          )
        })}
      </div>
    </motion.div>
  );
}
