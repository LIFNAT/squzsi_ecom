import React from "react";
import { FormErrors } from "./types";

// =====================
// อัพโหลดรูปภาพ
// =====================

interface ImageUploadProps {
  images: File[];
  imagePreviews: string[];
  errors: FormErrors;
  isDragging: boolean;
  disabled?: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export default function ImageUpload({
  images,
  imagePreviews,
  errors,
  isDragging,
  disabled,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  onRemoveImage,
}: ImageUploadProps) {
  return (
    <section className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6 flex flex-col gap-5">
      <h2 className="text-base font-extrabold text-gray-700 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-xs">📸</span>
        รูปภาพสินค้า
        <span className="ml-auto text-xs font-normal text-gray-400">
          {imagePreviews.length}/5 รูป
        </span>
      </h2>

      {/* Area สำหรับ Drag & Drop */}
      {imagePreviews.length < 5 && (
        <div
          role="button"
          tabIndex={0}
          aria-label="อัพโหลดรูปภาพ"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              fileInputRef.current?.click();
            }
          }}
          className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-pink-400 bg-pink-50 scale-[1.01]"
              : errors.images
              ? "border-red-300 bg-red-50/20"
              : "border-pink-200 bg-pink-50/40 hover:border-pink-400 hover:bg-pink-50"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl shadow-sm">
            🖼️
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600">
              {isDragging ? "วางรูปภาพที่นี่..." : "ลากรูปภาพมาวาง หรือคลิกเพื่อเลือก"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, WEBP ขนาดไม่เกิน 5MB (สูงสุด 5 รูป)
            </p>
          </div>
          {/* Input file แบบซ่อน */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileChange}
            disabled={disabled}
          />
        </div>
      )}

      {/* ข้อผิดพลาดของรูปภาพ */}
      {errors.images && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠️</span> {errors.images}
        </p>
      )}

      {/* การพรีวิวรูปภาพ */}
      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {imagePreviews.map((src, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-pink-100 shadow-sm"
            >
              <img
                src={src}
                alt={`รูปภาพที่ ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* ปุ่มลบรูปภาพพรีวิว */}
              <button
                type="button"
                onClick={() => !disabled && onRemoveImage(index)}
                aria-label={`ลบรูปภาพที่ ${index + 1}`}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                disabled={disabled}
              >
                <span className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-xs text-red-400 font-bold shadow">
                  ✕
                </span>
              </button>
              {/* ป้ายกำกับรูปภาพหลัก */}
              {index === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-400 text-white shadow-sm">
                  หลัก
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
