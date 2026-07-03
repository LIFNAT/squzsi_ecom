"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories, products, type Product } from "@/app/data/mockProducts";

function ProductCard({ product }: { product: Product }) {

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col h-full">
      <div className="relative w-full md:h-[200px] h-[300px]">
        <Image src={product.emoji} alt="" fill className="object-cover" />
      </div>
      <div className="text-[15px] font-semibold text-gray-900 leading-snug">
        <h2>{product.name} </h2>
        <span className="font-normal text-gray-500 text-[14px]">
          {product.sub}
        </span>
      </div>
      <div className="text-xs text-gray-400 mt-1 mb-2">{product.weight}</div>
      <div className="text-emerald-600 font-bold text-lg mb-4">
        {product.priceWhole}
        <span className="text-sm align-top">.{product.priceDecimal}$</span>
      </div>

      <div className="mt-auto w-full">
        <Link href={`/aboutitem/${product.id}`} className="block w-full">
          <button
            className="w-full h-10 bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center text-white shadow-sm"
            aria-label={`Buy ${product.name}`}
          >
            <p>ซื้อ</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function AllItem() {
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
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-8">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="bg-white rounded-2xl border cursor-pointer duration-200 border-gray-100 p-4 flex flex-col items-start text-left hover:border-emerald-300 transition-colors"
          >
            <span className="text-2xl mb-2">{cat.emoji}</span>
            <span className="text-sm font-semibold text-gray-900">
              {cat.name}
            </span>
            <span className="text-xs text-gray-400">{cat.sub}</span>
          </button>
        ))}
        <button className="bg-lime-400 hover:bg-lime-300 cursor-pointer transition-colors rounded-2xl flex flex-col items-center justify-center gap-1">
          <ChevronRight className="text-emerald-950" size={20} />
          <span className="text-xs font-semibold text-emerald-950">
            ดูทั้งหมด
          </span>
        </button>
      </div>

      {/* You might need */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <h2 className="text-xl font-bold text-gray-900">You might need</h2>
        <a
          href="#"
          className="text-sm font-medium text-emerald-600 flex items-center gap-1 hover:text-emerald-700"
        >
          See more <ChevronRight size={14} />
        </a>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </motion.div>
  );
}