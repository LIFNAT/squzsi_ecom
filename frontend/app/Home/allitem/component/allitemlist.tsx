"use client";

import { motion } from 'motion/react'
import { useState } from "react";
import { ShoppingCart, Plus, Minus, ChevronRight } from "lucide-react";
import Image from "next/image";

type Category = {
  name: string;
  sub: string;
  emoji: string;
};

type Product = {
  id: string;
  name: string;
  sub: string;
  weight: string;
  priceWhole: string;
  priceDecimal: string;
  emoji: string;
};

const categories: Category[] = [
  { name: "Vegetable", sub: "Local market", emoji: "🥦" },
  { name: "Snacks & Breads", sub: "Sri-khen chimney", emoji: "🥖" },
  { name: "Fruits", sub: "Central line", emoji: "🍎" },
  { name: "Chicken legs", sub: "Imported Meat", emoji: "🍗" },
  { name: "Milk & Dairy", sub: "Preserved food", emoji: "🥛" },
];

const products: Product[] = [
  { id: "beetroot", name: "Beetroot", sub: "(Local shop)", weight: "500 gm.", priceWhole: "17", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "avocado", name: "Italian Avocado", sub: "(Local shop)", weight: "500 gm.", priceWhole: "12", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "naan", name: "Szam amm", sub: "(Process food)", weight: "500 gm.", priceWhole: "14", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "beef", name: "Beef Mixed", sub: "(Cut Bone)", weight: "600 gm.", priceWhole: "16", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "sprite", name: "Cold drinks", sub: "(Sprite)", weight: "500 gm.", priceWhole: "18", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "plant-hunter", name: "Plant Hunter", sub: "(Frozen pack)", weight: "500 gm.", priceWhole: "20", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "carrot", name: "Deshi Gajor", sub: "(Local Carrot)", weight: "500 gm.", priceWhole: "19", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "cucumber", name: "Deshi Shosha", sub: "(Local Cucumber)", weight: "500 gm.", priceWhole: "04", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "chips", name: "Lays chips", sub: "(Bacon)", weight: "500 gm.", priceWhole: "21", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
  { id: "cabbage", name: "Badhakopi", sub: "(Local Cabbage)", weight: "500 gm.", priceWhole: "09", priceDecimal: "29", emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp" },
];

function ProductCard({ product }: { product: Product }) {

  const [qty, setQty] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col">
      <div className='relative w-full md:h-[200px] h-[300px]'>
        <Image
        src={product.emoji}
        alt=''
        fill
        className='object-cover'
        />
      </div>
      <div className="text-[15px] font-semibold text-gray-900 leading-snug">
        <h2>{product.name}{" "}</h2>
        <span className="font-normal text-gray-500 text-[14px]">{product.sub}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1 mb-2">{product.weight}</div>
      <div className="text-emerald-600 font-bold text-lg mb-3">
        {product.priceWhole}
        <span className="text-sm align-top">.{product.priceDecimal}$</span>
      </div>

      <div className='p-2 text-center bg-green-500 text-white rounded-2xl cursor-pointer hover:scale-105 duration-200 *:'>
        <p>สัง่ซื้อสินค้า</p>
      </div>

      {/* {qty === 0 ? (
        <button
          onClick={() => setQty(1)}
          className="mt-auto w-full h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={16} />
        </button>
      ) : (
        <div className="mt-auto w-full h-9 rounded-lg bg-emerald-600 flex items-center justify-between px-3 text-white">
          <button
            onClick={() => setQty((q) => Math.max(0, q - 1))}
            aria-label="Decrease quantity"
            className="hover:opacity-80"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="hover:opacity-80"
          >
            <Plus size={16} />
          </button>
        </div>
      )} */}
    </div>
  );
}

export default function AllItem() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-10  min-h-screen">
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
          <button className="bg-pink-200 cursor-pointer hover:bg-pink-100 hover:scale-150 duration-200 transition-all  text-emerald-950 font-semibold px-5 py-2.5 rounded-full text-sm">
            ซื้อเลย
          </button>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] md:text-[160px] select-none opacity-90">
          <Image src="https://api.candypop.lt/media/image/7e/00/0c1b78279a40fea6180b6ee00dcd.png" alt="SquishyLand logo" width={120} height={120} />
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