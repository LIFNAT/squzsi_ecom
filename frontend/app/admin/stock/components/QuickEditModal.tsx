"use client";

import { useState } from "react";
import { Product } from "../types";

// =====================
// QuickEditModal — Modal แก้ไขสต็อกแบบรวดเร็ว
// รองรับ 3 modes: ตั้งค่า / เพิ่ม / ลด
// =====================

type EditMode = "set" | "increase" | "decrease";

export default function QuickEditModal() {
  const [mode, setMode] = useState<EditMode>("set");
  const [amount, setAmount] = useState("");

  // คำนวณ preview สต็อกใหม่ก่อนยืนยัน
 

  const tabCls = (active: boolean) =>
    `flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
      active
        ? "bg-pink-400 text-white shadow-sm"
        : "text-gray-500 hover:text-pink-400"
    }`;

  return (
    // Overlay — คลิกนอก Modal เพื่อปิด
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      // onClick={onClose}
    >
      {/* กล่อง Modal */}
      <div
        className="bg-white rounded-3xl shadow-xl shadow-pink-200/30 border border-pink-100 p-6 w-full max-w-sm animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* หัวข้อ */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-extrabold text-gray-800 text-base">
              แก้ไขสต็อก
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">
              {/* {product.name} */}
            </p>
          </div>
          <button
            // onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-500 hover:text-pink-500 flex items-center justify-center transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* สต็อกปัจจุบัน */}
        <div className="bg-pink-50 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">สต็อกปัจจุบัน</span>
          <span className="font-extrabold text-pink-500 text-lg">
            {/* {product.stock} */}
          </span>
        </div>

        {/* แท็บเลือก mode */}
        <div className="flex gap-1 bg-gray-100 rounded-full p-1 mb-4">
          <button className={tabCls(mode === "set")} onClick={() => setMode("set")}>
            ตั้งค่า
          </button>
          <button
            className={tabCls(mode === "increase")}
            onClick={() => setMode("increase")}
          >
            + เพิ่ม
          </button>
          <button
            className={tabCls(mode === "decrease")}
            onClick={() => setMode("decrease")}
          >
            - ลด
          </button>
        </div>

        {/* Input จำนวน */}
        <input
          id="quick-edit-amount"
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={
            mode === "set"
              ? "ป้อนจำนวนสต็อกใหม่"
              : mode === "increase"
                ? "ป้อนจำนวนที่ต้องการเพิ่ม"
                : "ป้อนจำนวนที่ต้องการลด"
          }
          className="w-full px-4 py-2.5 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200 mb-3"
          autoFocus
        />

        {/* Preview ผลลัพธ์ */}
        {amount !== "" && (
          <div className="text-xs text-center text-gray-500 mb-4">
            สต็อกใหม่จะเป็น:{" "}
            {/* <span className="font-bold text-pink-500">{previewStock()}</span> */}
          </div>
        )}

        {/* ปุ่มยืนยัน / ยกเลิก */}
        <div className="flex gap-3">
          <button
            // onClick={onClose}
            className="flex-1 py-2.5 rounded-full border-2 border-pink-200 text-pink-500 font-semibold text-sm hover:bg-pink-50 hover:border-pink-400 active:scale-95 transition-all duration-200"
          >
            ยกเลิก
          </button>
          <button
            // onClick={handleConfirm}
            disabled={amount === ""}
            className="flex-1 py-2.5 rounded-full bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
