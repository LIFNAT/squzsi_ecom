"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BadgeCheck,
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

interface Product {
  id: string;
  product_name: string;
  category: string;
  description: string;
  price: number;
  promotion: number;
  current_product: number;
  producy_image: string[];
}

import Image from "next/image";
import Link from "next/link";
import { getProductById, products } from "@/app/data/mockProducts";

export default function AboutItem() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/product/getProductById/${id}`
        );

        const data = await res.json();

        if (data.success || data.suess) {
          setProduct(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);


  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          ไม่พบข้อมูลสินค้านี้
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          ลิงก์อาจไม่ถูกต้องหรือไม่มีสินค้าชิ้นนี้ในระบบ
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-pink-500 text-white font-medium text-sm rounded-full hover:bg-pink-600 transition-colors shadow-sm"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#fffaf5_100%)] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-pink-300 hover:text-pink-500"
        >
          <ChevronLeft size={18} />
          ย้อนกลับ
        </button>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-pink-100 bg-white p-4 shadow-[0_20px_60px_rgba(249,115,22,0.12)]">
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-pink-50">
              <Image
                src={product.producy_image[0]}
                alt={product.product_name}
                fill
                className="object-cover"
                priority
              />
              <button className="absolute right-4 top-4 rounded-full border border-white/80 bg-white/90 p-2 text-pink-500 shadow-sm backdrop-blur">
                <Heart size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-pink-400 px-3 py-1 text-xs font-semibold text-white">
                  {product.category}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  พร้อมส่ง
                </span>
              </div>

              <h1 className="text-3xl font-black text-gray-900">
                {product?.product_name}
              </h1>
              <div>
                <p className='text-gray-400'>รายละเอียดสินค้า : <span>{product?.description}</span></p>
              </div>
              {/* <div className="mt-4 flex items-center gap-2 text-sm text-amber-500">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
                <span className="ml-1 font-semibold text-gray-600">
                  4.8 · 1.2k รีวิว
                </span>
              </div> */}

              <div className="mt-6 rounded-2xl bg-pink-50 p-4">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-pink-500">
                    ฿{product.price}
                  </span>
                  <span className="mb-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-pink-500 shadow-sm">
                    ลด {product.promotion}%
                  </span>
                </div>
                {/* <p className="mt-2 text-sm text-gray-600">
                  ราคานี้มีส่วนลดพิเศษสำหรับลูกค้าใหม่
                </p> */}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="rounded-full p-2 text-gray-600 transition hover:bg-white"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-10 text-center text-sm font-semibold text-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="rounded-full p-2 text-gray-600 transition hover:bg-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">เลือกจำนวนสินค้า</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {/* ปุ่มซื้อเลย */}
                <Link href="/payment" className="w-full">
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600">
                    ซื้อเลย
                  </button>
                </Link>

                {/* ปุ่มเพิ่มลงตะกร้า */}
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-500 px-4 py-3.5 font-semibold text-gray-500 transition hover:border-pink-600 hover:bg-pink-600 hover:text-white">
                  <ShoppingCart size={18} />
                  เพิ่มลงตะกร้า
                </button>
              </div>


              <div className="mt-6 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  <ShieldCheck size={16} className="mb-2 text-emerald-500" />
                  ปลอดภัย 100%
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  <Truck size={16} className="mb-2 text-sky-500" />
                  ส่งไวภายใน 1 วัน
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  <RotateCcw size={16} className="mb-2 text-violet-500" />
                  คืนสินค้าได้
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-pink-500">
                <Sparkles size={18} />
                <h2 className="text-lg font-semibold text-gray-900">
                  สิ่งที่คุณจะได้รับ
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="mt-0.5 text-emerald-500" />
                  {product.description}
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="mt-0.5 text-emerald-500" />
                  บรรจุอย่างดีและปลอดภัยพร้อมจัดส่งทันที
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="mt-0.5 text-emerald-500" />
                  เหมาะสำหรับของขวัญและใช้ในชีวิตประจำวัน
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                รายละเอียดสินค้า
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                ข้อมูลเพิ่มเติมเพื่อช่วยตัดสินใจซื้อของคุณ
              </p>
            </div>
            <div className="rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-pink-500">
              {product.category}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl bg-gray-50 p-5">
              <h3 className="mb-2 font-semibold text-gray-900">คำอธิบาย</h3>
              <p className="text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            </div>
            <div className="rounded-2xl border border-pink-100 bg-pink-50/70 p-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                ข้อดีของสินค้า
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} className="text-pink-500" />
                  คุณภาพคัดสรรจากแหล่งที่น่าเชื่อถือ
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} className="text-pink-500" />
                  ออกแบบให้ใช้งานง่ายและสะดวก
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} className="text-pink-500" />
                  เหมาะกับทั้งการใช้งานส่วนตัวและของขวัญ
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              สินค้าที่คุณอาจชอบ
            </h2>
            <span className="text-sm text-gray-500">แนะนำจากร้าน</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/aboutitem/${item.id}`}
                className="rounded-[24px] border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gray-50">
                  <Image
                    src={item.emoji}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
                <div className="mt-3 text-lg font-black text-pink-500">
                  ฿{item.priceWhole}.{item.priceDecimal}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
