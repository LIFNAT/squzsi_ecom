"use client";
import { motion } from "motion/react";
import { ChevronRight, Link } from "lucide-react"; // ลบ Plus ออกเพราะเราใช้คำว่า "ซื้อ" แทนแล้ว
import { products } from "@/app/data/mockProducts";

interface Product {
  id: string | number;
  name: string;
  price?: number;
  description?: string;
  image?: string;
  [key: string]: any; 
}

// --- แอนิเมชันสไตล์ Apple ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  },
};

// --- Component: ProductCard ---
function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex flex-col bg-white rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100"
    >
      {/* ส่วนรูปภาพสินค้า */}
      <div className="relative aspect-[4/3] bg-[#F5F5F7] overflow-hidden flex items-center justify-center p-6">
        <img
          src={product.image || "https://placehold.co/400x400/F5F5F7/86868b?text=Product"}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#1d1d1f] shadow-sm">
          แนะนำ
        </div>
      </div>

      {/* ส่วนรายละเอียดสินค้า */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[13px] font-medium text-[#86868b] mt-1.5 line-clamp-2 leading-relaxed">
          {product.description || "รายละเอียดสินค้า..."}
        </p>

        {/* ส่วนราคาและปุ่มกดอัปเดตใหม่ */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          <span className="text-[15px] font-semibold text-[#1d1d1f]">
            {/* นำคำว่าติดต่อสอบถามออก หากไม่มีราคาจะปล่อยว่างไว้ */}
            {product.price ? `฿${product.price.toLocaleString()}` : ""}
          </span>
          
          {/* เปลี่ยนเป็นปุ่ม "ซื้อ" สไตล์ Apple (สีน้ำเงิน) */}
          <button className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-300">
            ซื้อ
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Component ---
export default function Item() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">
            สินค้าทั้งหมด.
          </h2>
          <p className="text-[17px] font-medium text-[#86868b] mt-2">
            เลือกชมสินค้าที่คุณอาจกำลังมองหาอยู่
          </p>
        </div>
        <Link
          href="#"
          className="text-[15px] font-medium text-[#0066cc] hover:text-[#0055ad] flex items-center gap-1 transition-colors group mb-1"
        >
          See more 
          <ChevronRight 
            size={16} 
            className="group-hover:translate-x-1 transition-transform duration-300" 
          />
        </Link>
      </div>

      {/* Grid Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </motion.div>
      
    </div>
  );
}