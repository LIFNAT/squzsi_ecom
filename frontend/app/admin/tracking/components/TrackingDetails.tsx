"use client";

import { useState, useEffect } from "react";
import { TrackingOrder, TrackingStatus } from "../../trackingStorage";
import { propsTracking } from "../page";
import axios from "axios";
import { post } from "@/app/post";

interface TrackingDetailsProps {
  order: propsTracking | null;
  onBack?: () => void;
}

const STEPS = [
  {
    status: "pending",
    label: "รอดำเนินการ",
    icon: "⏳",
  },
  {
    status: "processing",
    label: "ระหว่างขนส่ง",
    icon: "📦",
  },
  {
    status: "shipped",
    label: "จัดส่งสำเร็จ",
    icon: "🚚",
  },
  {
    status: "cancelled",
    label: "ยกเลิก",
    icon: "❌",
  },
];

export default function TrackingDetails({ order, onBack }: TrackingDetailsProps) {
  // ฟอร์มสเตตภายในคอมโพเนนต์
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.state);
    }
  }, [order]);

  // หากไม่มีการเลือกออเดอร์ (Empty State ฝั่งขวา)
  if (!order) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center text-center py-32 px-6 bg-white rounded-3xl border border-pink-50 ">
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

  const changeState = async (newState: string) => {
    if (!order) return;

    try {

      const payload = {
        order_id: order.id ?? order.order_id,
        state: newState
      };

      console.log("ส่งไป:", payload);

      const res = await axios.put(
        `${post}/payment/changestate`,
        payload
      );

      console.log(res.data);

      // เปลี่ยนหน้า UI ทันที
      setSelectedStatus(newState);



    } catch (err: any) {
      console.log(
        "เปลี่ยนสถานะไม่สำเร็จ:",
        err.response?.data || err
      );
    }
  };

  const paymentLabel: Record<string, string> = {
    card: "บัตรเครดิต / เดบิต",
    qr: "พร้อมเพย์ / QR Code",
    cod: "เก็บเงินปลายทาง",
  };

  return (
    <div className="bg-white rounded-3xl border border-pink-50 p-6 flex flex-col gap-6 shadow-sm shadow-pink-100/30">
      {/* ===================== ส่วนหัวของข้อมูลรายละเอียด ===================== */}
      <div className="flex items-center justify-between border-b border-pink-50 pb-4">


        <div className='flex items-center  w-full justify-between'>
          <span className="text-xs text-gray-400 font-semibold block uppercase">ใบจัดส่งสินค้า {order.receipt}</span>
          <p className="p-1 bg-amber-200 text-white rounded-2xl px-3 text-xs">
            {paymentLabel[order.payment_method] || order.payment_method}
          </p>
        </div>



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
          สถานะจัดส่งสินค้า
        </p>

        {(() => {
          const currentIndex = STEPS.findIndex(
            (s) => s.label === selectedStatus
          );

          return (
            <div className="relative flex justify-between items-start w-full px-5">

              {/* เส้นพื้นหลัง */}
              <div className="absolute left-5 right-5 top-5 h-1 bg-gray-200 rounded-full" />

              <div
                className="absolute left-5 top-5 h-1 bg-pink-500 rounded-full transition-all duration-500"
                style={{
                  width: `${currentIndex === 0
                    ? "10%"
                    : `${(currentIndex / (STEPS.length - 1)) * 100}%`
                    }`,
                }}
              />


              {STEPS.map((step, idx) => {

                const isCurrent = idx === currentIndex;
                const isCompleted = idx < currentIndex;

                return (
                  <div
                    onClick={() => {
                      setSelectedStatus(step.label);
                      changeState(step.label);
                    }}
                    key={step.status}
                    className="relative z-10 flex flex-col items-center flex-1"
                  >

                    <div
                      className={`
                w-10 h-10 rounded-full border-2 
                flex items-center justify-center
                text-sm font-bold
                transition-all duration-300

                ${isCurrent
                          ? "bg-pink-500 border-pink-500 text-white scale-110 shadow-lg"
                          : isCompleted
                            ? "bg-pink-100 border-pink-500 text-pink-500"
                            : "bg-white border-gray-300 text-gray-400"
                        }
              `}
                    >
                      {step.icon}
                    </div>


                    <span
                      className={`
                mt-2 text-[11px] font-semibold text-center

                ${isCurrent
                          ? "text-pink-600"
                          : isCompleted
                            ? "text-pink-500"
                            : "text-gray-400"
                        }
              `}
                    >
                      {step.label}
                    </span>

                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* ===================== ข้อมูลพัสดุและลูกค้า ===================== */}
      <div className="grid grid-cols-2 gap-2">
        <div className="border p-3 rounded-2xl border-gray-300">
          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
            ข้อมูลสินค้า
          </span>

          <div className='flex gap-2 items-center'>
            <p className="text-sm font-bold text-gray-400">ชื่อสินค้า : </p>
            <span className="text-gray-600 font-medium">{order.product_name}</span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400">
              จำนวน:
            </p>
            <span className="text-gray-600 font-medium">{order.quantity} ชิ้น</span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400">
              ชิ้นละ :
            </p>
            <span className="text-gray-600 font-medium">{(Number(order.price))}</span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400">
              ส่วนลด :
            </p>
            <span className="text-red-600 font-medium">{(Number(order.promotion)) * (Number(order.quantity))}</span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400">
              ยอดรวม:
            </p>
            <span className="text-green-600 font-bold">{(Number(order.total_price)) - (Number(order.promotion)) * (Number(order.quantity))} บาท</span>
          </div>
        </div>

        {/* ข้อมูลผู้รับ */}
        <div className="border p-3 rounded-2xl border-gray-300">

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block mb-1">
              ผู้รับปลายทาง
            </span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400"> ผู้รับ : </p>
            <span className="text-gray-600 font-medium">{order.full_name}</span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400"> ที่อยู่ผู้รับ : </p>
            <span className="text-gray-600 font-medium">{order.address || '-'}</span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400"> เมล : </p>
            <span className="text-gray-600 font-medium">{order.email}</span>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="text-sm text-gray-400"> เบอร์ติดต่อ : </p>
            <span className="text-gray-600 font-medium">{order.email}</span>
          </div>


        </div>
      </div>
      <button
        onClick={() => changeState(selectedStatus)}
        className="w-full py-3 rounded-full bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/50 active:scale-98 transition-all duration-200 mt-2"
      >
        บันทึกสถานะใหม่
      </button>
    </div>
  );
}
