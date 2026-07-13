"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { loadTrackingOrders, saveTrackingOrders, TrackingOrder } from "../trackingStorage";

// นำเข้าคอมโพเนนต์ที่แยกตามหลักการดีไซน์แบบ Modular
import TrackingSummary from "./components/TrackingSummary";
import TrackingToolbar from "./components/TrackingToolbar";
import TrackingList from "./components/TrackingList";
import TrackingDetails from "./components/TrackingDetails";

// =====================
// หน้าหลัก: Order Tracking Management Page (Split-View Layout)
// บริหารจัดการและแก้ไขเลขพัสดุในหน้าจอเดียว
// =====================

export default function OrderTrackingPage() {
  const [orders, setOrders] = useState<TrackingOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // สเตตสำหรับการกรอง ค้นหา และเรียงลำดับ
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("updated_desc");

  // สเตตคำสั่งซื้อที่เลือกแสดงรายละเอียด
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // ควบคุมการแสดงผลฝั่งรายละเอียดบนมือถือ
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  // โหลดข้อมูลจาก localStorage พร้อมดีเลย์สำหรับการแสดง Loading State
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = loadTrackingOrders();
      setOrders(data);
      // เลือกออเดอร์แรกเป็นค่าเริ่มต้นบนหน้าจอ Desktop
      if (data.length > 0) {
        setSelectedOrderId(data[0].id);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // บันทึกการเปลี่ยนแปลงข้อมูลคำสั่งซื้อและลงถาวรใน localStorage
  const handleSaveOrder = (updated: TrackingOrder) => {
    const nextOrders = orders.map((o) => (o.id === updated.id ? updated : o));
    setOrders(nextOrders);
    saveTrackingOrders(nextOrders);
  };

  // กรอง เสิร์ช และจัดเรียงคำสั่งซื้อ
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // ค้นหา SKU / Product / Tracking / Order ID / Customer
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.sku.toLowerCase().includes(q) ||
          o.productName.toLowerCase().includes(q) ||
          o.trackingNo.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q)
      );
    }

    // ฟิลเตอร์สถานะ
    if (statusFilter) {
      result = result.filter((o) => o.status === statusFilter);
    }

    // เรียงตามเวลาอัปเดตล่าสุด / รหัสสั่งซื้อ
    result.sort((a, b) => {
      const timeA = new Date(a.updatedAt).getTime();
      const timeB = new Date(b.updatedAt).getTime();

      switch (sort) {
        case "updated_asc":
          return timeA - timeB;
        case "order_desc":
          return b.id.localeCompare(a.id);
        case "order_asc":
          return a.id.localeCompare(b.id);
        case "updated_desc":
        default:
          return timeB - timeA;
      }
    });

    return result;
  }, [orders, search, statusFilter, sort]);

  // หาตัวชี้ของออเดอร์ที่ถูกเลือกในปัจจุบัน
  const currentSelectedOrder = useMemo(() => {
    return orders.find((o) => o.id === selectedOrderId) || null;
  }, [orders, selectedOrderId]);

  // การตอบสนองเมื่อผู้ใช้กดยกเลือกรายละเอียดในมือถือ
  const handleBackToList = () => {
    setIsMobileDetailOpen(false);
  };

  // การตอบสนองเมื่อกดเลือกออเดอร์จากฝั่งซ้าย
  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id);
    setIsMobileDetailOpen(true); // สลับหน้าไปฝั่งรายละเอียดทันทีหากแสดงบนมือถือ
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8FB] py-10 px-4 sm:px-6">
      {/* วงกลมพาสเทลตกแต่งข้างหลัง */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ===================== ส่วนนำทาง (Breadcrumbs) ===================== */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-pink-400 transition-colors duration-200">
              หน้าหลัก
            </Link>
            <span>/</span>
            <span className="text-gray-400">แอดมิน</span>
            <span>/</span>
            <span className="text-pink-400 font-semibold">ติดตามสินค้า</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-sm">
              🚚
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">ติดตามสถานะจัดส่ง</h1>
              <p className="text-sm text-gray-400 mt-0.5">ระบบจัดการและติดตามสถานะพัสดุแบบสองหน้าต่าง (Split-View)</p>
            </div>
          </div>
        </div>

        {/* ===================== การ์ดสรุปจำนวนรายการจัดส่ง ===================== */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/50 border border-pink-50/50 rounded-3xl p-5 h-28 animate-pulse flex flex-col justify-between">
                <div className="h-6 w-6 bg-pink-100 rounded-full" />
                <div className="h-6 w-16 bg-pink-100 rounded-md" />
                <div className="h-3 w-24 bg-pink-100 rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <TrackingSummary orders={orders} />
        )}

        {/* ===================== โครงสร้าง Split-View Layout ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* ฝั่งซ้าย: แถบตัวกรองและรายการคำสั่งซื้อ */}
          <div className={`${isMobileDetailOpen ? "hidden md:block" : "block"} md:col-span-1 flex flex-col gap-4 bg-white rounded-3xl border border-pink-50 p-5 shadow-sm shadow-pink-100/40`}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              คำค้นหา & ตัวคัดกรอง
            </p>
            <TrackingToolbar
              search={search}
              statusFilter={statusFilter}
              sort={sort}
              onSearch={setSearch}
              onStatus={setStatusFilter}
              onSort={setSort}
            />

            <div className="border-t border-pink-50/60 pt-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                รายการพัสดุ ({filteredOrders.length})
              </p>

              {isLoading ? (
                <div className="flex flex-col gap-2.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 h-24 animate-pulse flex flex-col gap-2">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                      <div className="h-4 w-full bg-gray-200 rounded" />
                      <div className="h-3 w-12 bg-gray-200 rounded mt-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <TrackingList
                  orders={filteredOrders}
                  selectedId={selectedOrderId}
                  onSelect={handleSelectOrder}
                />
              )}
            </div>
          </div>

          {/* ฝั่งขวา: รายละเอียดการจัดส่งพัสดุ */}
          <div className={`${isMobileDetailOpen ? "block" : "hidden md:block"} md:col-span-2`}>
            {isLoading ? (
              <div className="bg-white rounded-3xl border border-pink-50 p-6 min-h-[500px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-pink-400/20 border-t-pink-400 rounded-full animate-spin" />
                  <p className="text-sm font-semibold text-gray-400">กำลังเตรียมหน้าต่างรายละเอียด...</p>
                </div>
              </div>
            ) : (
              <TrackingDetails
                order={currentSelectedOrder}
                onSave={handleSaveOrder}
                onBack={handleBackToList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}