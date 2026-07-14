"use client";

import { useState, useEffect } from "react";
import { TrackingOrder, TrackingStatus } from "../../trackingStorage";

// =====================
// TrackingDetails — แผงรายละเอียดการจัดส่งฝั่งขวา (Split-View)
// =====================

interface TrackingDetailsProps {
  order: TrackingOrder | null;
  onSave: (updatedOrder: TrackingOrder) => void;
  onBack?: () => void; // ปุ่มย้อนกลับบนมือถือ
}

const STEPS: { status: TrackingStatus; label: string; icon: string; activeColor: string; lineActiveColor: string }[] = [
  { status: "pending", label: "รอจัดส่ง", icon: "⏳", activeColor: "bg-amber-400 border-amber-400 text-white ring-amber-100", lineActiveColor: "bg-amber-400" },
  { status: "processing", label: "เตรียมจัดส่ง", icon: "📦", activeColor: "bg-blue-400 border-blue-400 text-white ring-blue-100", lineActiveColor: "bg-blue-400" },
  { status: "shipped", label: "ระหว่างขนส่ง", icon: "🚚", activeColor: "bg-purple-400 border-purple-400 text-white ring-purple-100", lineActiveColor: "bg-purple-400" },
  { status: "delivered", label: "จัดส่งสำเร็จ", icon: "✅", activeColor: "bg-emerald-400 border-emerald-400 text-white ring-emerald-100", lineActiveColor: "bg-emerald-400" },
  { status: "cancelled", label: "ยกเลิก", icon: "❌", activeColor: "bg-rose-400 border-rose-400 text-white ring-rose-100", lineActiveColor: "bg-rose-400" },
];

const POPULAR_COURIERS = ["Flash Express", "Kerry Express", "Thailand Post", "DHL Express"];

export default function TrackingDetails({ order, onSave, onBack }: TrackingDetailsProps) {
  // ฟอร์มสเตตภายในคอมโพเนนต์
  const [courier, setCourier] = useState("");
  const [trackingNo, setTrackingNo] = useState("");
  const [status, setStatus] = useState<TrackingStatus>("pending");
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  // โหลดข้อมูลออเดอร์ใหม่เข้า State เมื่อออเดอร์ที่เลือกมีการเปลี่ยนแปลง
  useEffect(() => {
    if (order) {
      setCourier(order.courier || "");
      setTrackingNo(order.trackingNo || "");
      setStatus(order.status);
      setShowSavedAlert(false);
    }
  }, [order]);

  // หากไม่มีการเลือกออเดอร์ (Empty State ฝั่งขวา)
  if (!order) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center text-center py-32 px-6 bg-white rounded-3xl border border-pink-50 min-h-[500px]">
        <div className="text-6xl mb-4 animate-bounce">🧸</div>
        <h3 className="font-extrabold text-gray-700 text-lg mb-1">
          ยังไม่ได้เลือกรายการจัดส่ง
        </h3>
        <p className="text-sm text-gray-400 max-w-[280px]">
          กรุณาเลือกหมายเลขคำสั่งซื้อทางด้านซ้าย เพื่อดูข้อมูลและจัดการสถานะจัดส่งสินค้า
        </p>
      </div>
    );
  }

  // หาลำดับขั้นสูงสุดที่ทำงานเสร็จแล้วเพื่อระบายสีเส้น Stepper
  const getStepIndex = (s: TrackingStatus) => STEPS.findIndex((step) => step.status === s);
  const currentStepIndex = getStepIndex(status);

  // ฟังก์ชันกดยืนยันบันทึก
  const handleConfirmSave = () => {
    onSave({
      ...order,
      courier,
      trackingNo,
      status,
      updatedAt: new Date().toISOString(),
    });
    
    // แสดงกล่องแจ้งเตือนความสำเร็จชั่วคราว
    setShowSavedAlert(true);
    setTimeout(() => {
      setShowSavedAlert(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-pink-50 p-6 flex flex-col gap-6 shadow-sm shadow-pink-100/30">
      {/* ===================== ส่วนหัวของข้อมูลรายละเอียด ===================== */}
      <div className="flex items-center justify-between border-b border-pink-50 pb-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500 font-bold text-sm flex items-center justify-center"
            >
              ←
            </button>
          )}
          <div>
            <span className="text-xs text-gray-400 font-semibold block uppercase">ใบจัดส่งสินค้า</span>
            <h2 className="font-extrabold text-xl text-gray-800">{order.id}</h2>
          </div>
        </div>

        <span className="text-xs text-gray-400">
          อัปเดตล่าสุด:{" "}
          <span className="font-semibold text-gray-500">
            {new Date(order.updatedAt).toLocaleDateString("th-TH", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </span>
      </div>

      {/* ===================== อัปเดตข้อมูลสำเร็จ Alert ===================== */}
      {showSavedAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl p-3 text-center text-sm font-semibold animate-fade-in">
          🎉 บันทึกการเปลี่ยนแปลงข้อมูลการจัดส่งสำเร็จแล้ว!
        </div>
      )}

      {/* ===================== Delivery Stepper ===================== */}
      <div className="py-4">
        <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">
          สถานะจัดส่งสินค้า (คลิกเพื่อเปลี่ยน)
        </p>

        <div className="relative flex justify-between items-center w-full px-2 sm:px-6">
          {/* เส้นหลัง Stepper */}
          <div className="absolute left-6 right-6 top-5 h-1 bg-gray-100 -z-10 rounded-full" />
          
          {/* เส้นแสดงความคืบหน้า (มีสี) */}
          <div
            className={`absolute left-6 top-5 h-1 -z-10 rounded-full transition-all duration-300 ${
              status === "cancelled" ? "bg-rose-400" : "bg-pink-400"
            }`}
            style={{
              width: `${(currentStepIndex / (STEPS.length - 1)) * 90}%`,
            }}
          />

          {STEPS.map((step, idx) => {
            const isActive = idx <= currentStepIndex;
            const isExactlyCurrent = step.status === status;
            
            return (
              <button
                key={step.status}
                onClick={() => setStatus(step.status)}
                className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
              >
                {/* วงกลมสเตป */}
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isExactlyCurrent
                      ? `${step.activeColor} ring-4 scale-110 shadow-md`
                      : isActive
                        ? "bg-pink-100 border-pink-400 text-pink-500 scale-100"
                        : "bg-white border-gray-200 text-gray-400 group-hover:border-pink-300 group-hover:text-pink-400"
                  }`}
                >
                  {step.icon}
                </div>
                {/* ข้อความข้างล่าง */}
                <span
                  className={`text-[10px] sm:text-xs font-bold transition-all duration-200 ${
                    isExactlyCurrent
                      ? "text-gray-800 scale-105"
                      : isActive
                        ? "text-pink-500 font-medium"
                        : "text-gray-400 group-hover:text-pink-400"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================== ข้อมูลพัสดุและลูกค้า ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-pink-50/20 border border-pink-50/40 rounded-2xl p-4">
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block mb-1">ข้อมูลสินค้า</span>
          <p className="text-sm font-bold text-gray-800">{order.productName}</p>
          <p className="text-xs text-gray-400 mt-0.5">SKU: <span className="font-mono">{order.sku}</span></p>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block mb-1">ผู้รับปลายทาง</span>
          <p className="text-sm font-bold text-gray-800">{order.customerName}</p>
          <p className="text-xs text-gray-400 mt-0.5">ประเภท: จัดส่งแบบธรรมดา</p>
        </div>
      </div>

      {/* ===================== ฟอร์มกรอกขนส่งและเลขพัสดุ ===================== */}
      <div className="flex flex-col gap-4">
        {/* ขนส่ง */}
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">
            ผู้ให้บริการจัดส่ง (Courier)
          </label>
          <input
            type="text"
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
            placeholder="เช่น Flash Express, Kerry Express..."
            className="w-full px-4 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200"
          />
          {/* ขนส่งยอดนิยม */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {POPULAR_COURIERS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCourier(c)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                  courier === c
                    ? "bg-pink-400 border-pink-400 text-white shadow-sm"
                    : "bg-white border-pink-100 text-gray-500 hover:border-pink-300 hover:text-pink-500"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* เลขพัสดุ */}
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">
            เลขพัสดุ (Tracking Number)
          </label>
          <input
            type="text"
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
            placeholder="ป้อนหมายเลขติดตามพัสดุ..."
            className="w-full px-4 py-2.5 rounded-2xl border border-pink-200 bg-white text-sm font-mono text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200"
          />
        </div>
      </div>

      {/* ===================== ปุ่มคำสั่งย่อย ===================== */}
      <button
        onClick={handleConfirmSave}
        className="w-full py-3 rounded-full bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/50 active:scale-98 transition-all duration-200 mt-2"
      >
        💾 บันทึกข้อมูลการจัดส่ง
      </button>
    </div>
  );
}
