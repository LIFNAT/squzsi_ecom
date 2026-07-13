import React from "react";
import { ProductStatus } from "./types";
import { Field, inputClass } from "./Field";

interface StatusOption {
  value: ProductStatus;
  label: string;
  color: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "active",
    label: "Active",
    color: "bg-green-100 text-green-600 border-green-200",
  },
  {
    value: "draft",
    label: "Draft",
    color: "bg-yellow-100 text-yellow-600 border-yellow-200",
  },
  {
    value: "archived",
    label: "Archived",
    color: "bg-gray-100 text-gray-500 border-gray-200",
  },
];

// =====================
// สถานะสินค้าและแท็ก
// =====================


export default function ProductStatusTags() {
  return (
    <section className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6 flex flex-col gap-4">
      <h2 className="text-base font-extrabold text-gray-700 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-xs">🏷️</span>
        สถานะและแท็ก
      </h2>

      {/* เลือกสถานะ */}
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-2">
          สถานะสินค้า <span className="text-pink-400">*</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {STATUS_OPTIONS.map(({ value, label, color }) => (
            <button
              key={value}
              type="button"
              // onClick={() => onStatusChange(value)}
              // disabled={disabled}
              className={`px-4 py-2 rounded-full text-sm shadow-sm scale-105 border-gray-200 text-gray-400 bg-gray-50 hover:border-pink-300 hover:text-pink-400 font-semibold border-2 transition-all duration-200 active:scale-95`}
            >
              {value === "active" && "🟢 "}
              {value === "draft" && "🟡 "}
              {value === "archived" && "⚫ "}
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
