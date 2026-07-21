"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tag, Truck, Gift, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { post } from "@/app/post";

// กำหนด Type ให้ตรงกับข้อมูลที่ส่งมาจาก Hono API
interface Promotion {
  id: number;
  code: string;
  name: string;
  discount: number;
  type: string; // เช่น 'เปอร์เซ็นต์' หรือ 'จำนวนเงิน'
  startDate: string;
  endDate: string;
  status: string;
}

export default function PromoBanner() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ฟังก์ชันดึงข้อมูลโปรโมชันจากหลังบ้าน
  useEffect(() => {
    // เพื่อป้องกันปัญหา Lint เตือนเรื่องการเรียก setState ซิงโครนัส
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${post}/promotion`);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        const activePromos = data.filter((promo: Promotion) => promo.status === "เปิดใช้งาน");
        setPromotions(activePromos);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []); // ทำงานแค่ครั้งเดียวตอนโหลดคอมโพเนนต์

  // ฟังก์ชันช่วยเลือกไอคอนให้เข้ากับคูปองแต่ละแบบ
  const getPromoIcon = (type: string, name: string) => {
    if (name.includes("ส่งฟรี") || type.includes("ขนส่ง")) {
      return <Truck className="w-5 h-5 text-pink-500" />;
    }
    if (name.includes("แถม") || name.includes("แจก")) {
      return <Gift className="w-5 h-5 text-pink-500" />;
    }
    return <Sparkles className="w-5 h-5 text-pink-500" />;
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 px-6 py-12 md:px-12 md:py-14 flex flex-col gap-8 shadow-2xl shadow-pink-300/40">

          {/* Decorative blobs */}
          <div className="absolute top-[-40px] right-[-40px] w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-30px] left-[-30px] w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header ส่วนหัวแบนเนอร์ */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/20 pb-6">
            <div className="text-center md:text-left space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                <Tag className="w-3 h-3" /> SquishyLand Privileges
              </span>
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                รวมโปรโมชันสุดคุ้มเพื่อคุณ 🎉
              </h2>
              <p className="text-pink-50 text-sm max-w-xl">
                เสิร์ฟความน่ารักนุ่มฟูพร้อมโค้ดส่วนลดที่ดีที่สุด ช้อปยังไงก็คุ้ม! กรอกโค้ดได้ที่หน้าชำระเงินเลยคราบบบ
              </p>
            </div>

            <div className="flex-shrink-0 text-center md:text-right">
              <Link
                href="/Home/allitem"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-pink-500 font-extrabold rounded-full shadow-lg hover:bg-pink-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm whitespace-nowrap group"
              >
                ไปหน้าช้อปปิ้ง
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Promotion Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              // หมุนติ้วๆ ตอนรอโหลดข้อมูล
              <div className="col-span-1 md:col-span-3 flex justify-center py-8">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
            ) : promotions.length === 0 ? (
              // กรณีไม่มีโปรโมชันที่เปิดใช้งานเลย
              <div className="col-span-1 md:col-span-3 text-center py-8 text-white font-semibold">
                ช่วงนี้ยังไม่มีโค้ดโปรโมชันเปิดใช้งาน ติดตามโปรเด็ดๆ ได้เร็วๆ นี้จ้า 🧸
              </div>
            ) : (
              // วนลูปการ์ดโปรโมชันจากหลังบ้านจริง
              promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-pink-100/50 shadow-md flex flex-col justify-between gap-4 hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="space-y-3">
                    {/* Icon & Code Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shadow-inner">
                        {getPromoIcon(promo.type, promo.name)}
                      </div>
                      <span className="bg-pink-100 text-pink-600 border border-pink-200 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                        CODE: {promo.code}
                      </span>
                    </div>

                    {/* ข้อมูลโปรโมชัน */}
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-1">
                        {promo.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        ส่วนลด: <span className="text-pink-500 font-bold">{promo.discount}</span> {promo.type === "เปอร์เซ็นต์" ? "%" : "บาท"}
                      </p>
                    </div>
                  </div>

                  {/* วันหมดอายุ */}
                  <div className="border-t border-gray-100 pt-2 text-[11px] text-gray-400">
                    ใช้ได้ถึงวันที่: {new Date(promo.endDate).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}