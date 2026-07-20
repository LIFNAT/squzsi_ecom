"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'motion/react'

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

type FeatureItem = {
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  iconClass: string;
};

import Image from "next/image";
import Link from "next/link";

const featureItems: FeatureItem[] = [
  {
    title: "บรรจุภัณฑ์ปลอดภัย",
    description:
      "เราเข้าใจว่าคุณตั้งตารอของชิ้นนี้แค่ไหน ทุกกล่องจึงถูกแพ็กด้วยความระมัดระวังเป็นพิเศษ ป้องกันการกระแทกและเสียหาย เพื่อให้มั่นใจว่าของถึงมือคุณในสภาพที่สมบูรณ์ที่สุด",
    icon: ShieldCheck,
    iconClass: "text-emerald-500",
  },
  {
    title: "ส่งด่วนทันใจ 3 วัน ",
    description:
      "เราจัดส่งไวภายใน 3 วันทำการ พร้อมส่งเลขแทร็กให้คุณดูได้ตลอดว่าพัสดุเดินทางไปถึงไหนแล้ว ไม่ต้องคอยลุ้นหรือเดาว่าของจะมาถึงเมื่อไหร่",
    icon: Truck,
    iconClass: "text-sky-500",
  },
  {
    title: "คืนสินค้า",
    description:
      "คืนสินค้าได้ภายใน 7 วัน หากคุณไม่พอใจในสินค้าหรือพบปัญหาใด ๆ เราพร้อมรับคืนและคืนเงินให้คุณเต็มจำนวน ไม่มีเงื่อนไขซับซ้อน",
    icon: RotateCcw,
    iconClass: "text-violet-500",
  },
];

export default function AboutItem() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(
    null,
  );


  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/product/getProductById/${id}`,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/product/getproductLimitThree");
        const json = await res.json();

        // ถ้า API ส่งกลับมาเป็น { success: true, data: [...] }
        if (json.success) {
          setProducts(json.data); // เอา data ไปใส่ใน state
        }
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };

    fetchData();
  }, []);

  // เก็บลง local
  const handleBuyNow = () => {
    if (!product) return;

    const checkoutData = {
      id: product.id,
      product_name: product.product_name,
      price: product.price,
      quantity,
      promotion: product.promotion,
      category: product.category,
      total: product.price * quantity,
      image: product.producy_image?.[0],
    };
    // บอก Payment ว่าเป็นซื้อเลย
    localStorage.setItem(
      "checkout-type",
      "product"
    );
    localStorage.setItem(
      "checkout-product",
      JSON.stringify(checkoutData)
    );
    router.push("/payment");
  };

  // เพิ่ม local ลง cat
  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(
      localStorage.getItem("cart-items") || "[]"
    );

    const existingIndex = cart.findIndex(
      (item: any) => item.id === product.id
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        quantity,
        description: product.description,
        category: product.category,
        image: product.producy_image?.[0] || "",
        promotion: product.promotion
      });
    }

    localStorage.setItem("cart-items", JSON.stringify(cart));

    // alert("เพิ่มสินค้าลงตะกร้าแล้ว");
  };

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
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-pink-50">
              <Image
                src={
                  product.producy_image?.[0]
                    ? product.producy_image[0]
                    : "/no-image.png"
                }
                alt={product.product_name}
                fill
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
                <p className="text-gray-400">
                  รายละเอียดสินค้า : <span>{product?.description}</span>
                </p>
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
                    ลด {product.promotion} บาท
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
                <button
                  onClick={handleBuyNow}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
                >
                  ซื้อเลย
                </button>

                {/* ปุ่มเพิ่มลงตะกร้า */}
                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-500 px-4 py-3.5 font-semibold text-gray-500 transition hover:border-pink-600 hover:bg-pink-600 hover:text-white"
                >
                  <ShoppingCart size={18} />
                  เพิ่มลงตะกร้า
                </button>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
                {featureItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setSelectedFeature(item)}
                      className="rounded-2xl border border-gray-100 cursor-pointer bg-gray-50 p-3 text-left transition hover:-translate-y-0.5 hover:border-pink-200 hover:bg-white"
                    >
                      <Icon size={16} className={`mb-2 ${item.iconClass}`} />
                      <div className="font-medium text-gray-700">
                        {item.title}
                      </div>
                    </button>
                  );
                })}
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
                  บรรจุอย่างดีและปลอดภัยพร้อมจัดส่งทันที
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="mt-0.5 text-emerald-500" />
                  เหมาะสำหรับของขวัญและใช้ในชีวิตประจำวัน
                </li>
                {/* เพิ่มอันนี้เข้าไปครับ */}
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="mt-0.5 text-emerald-500" />
                  การันตีคุณภาพสินค้าทุกชิ้น
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
          <div className="grid gap-4 md:grid-cols-4">
            {products.map((e, i) => {
              return (

                <div
                  key={i}
                  className="rounded-[24px] border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-t-2xl ">
                    <Image
                      src={
                        Array.isArray(e.producy_image)
                          ? e.producy_image[0]
                          : typeof e.producy_image === "string"
                            ? e.producy_image
                            : "/mqytoljtgeYfW558jDS-o.jpg"
                      }
                      alt={e.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className='p-3'>
                    <h3 className="font-semibold text-gray-900">{e.product_name || '-'}</h3>
                    <p className="mt-1 text-sm text-gray-500">{e.category || '-'}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-extrabold text-pink-500">
                        ${e.price || '-'}
                      </span>

                      <Link
                        href={`/aboutitem/${e.id}`}
                        className="px-4 py-2 rounded-full text-xs font-bold bg-pink-500 text-white"
                      >
                        ดูสินค้า
                      </Link>
                    </div>
                  </div>
                </div>

              )
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={() => setSelectedFeature(null)}
          >
            <div
              className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-2 text-pink-500">
                {(() => {
                  const Icon = selectedFeature.icon;
                  return <Icon size={18} className={selectedFeature.iconClass} />;
                })()}
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedFeature.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {selectedFeature.description}
              </p>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="mt-4 rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
              >
                ปิด
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
