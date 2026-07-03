import React from "react";
import { FormData, FormErrors } from "./types";
import { Field, inputClass } from "./Field";

// =====================
// ค่าคงที่ของหมวดหมู่
// =====================

const CATEGORIES = [
  "Squishies",
  "Plushies",
  "Blind Box",
  "Cute Accessories",
  "Gift Sets",
];

// =====================
// ข้อมูลสินค้าหลัก
// =====================

interface ProductInfoProps {
  form: FormData;
  errors: FormErrors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
}

export default function ProductInfo({
  form,
  errors,
  onChange,
  disabled,
}: ProductInfoProps) {
  return (
    <section className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6 flex flex-col gap-5">
      <h2 className="text-base font-extrabold text-gray-700 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-xs">📝</span>
        ข้อมูลสินค้า
      </h2>

      {/* ชื่อสินค้า */}
      <Field label="ชื่อสินค้า" required error={errors.name}>
        <input
          id="product-name"
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="เช่น Strawberry Cream Squishy"
          className={inputClass(errors.name)}
          disabled={disabled}
        />
      </Field>

      {/* หมวดหมู่ */}
      <Field label="หมวดหมู่" required error={errors.category}>
        <select
          id="product-category"
          name="category"
          value={form.category}
          onChange={onChange}
          className={inputClass(errors.category)}
          disabled={disabled}
        >
          <option value="">เลือกหมวดหมู่...</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Field>

      {/* คำอธิบายสินค้า */}
      <Field label="คำอธิบายสินค้า" required error={errors.description}>
        <textarea
          id="product-description"
          name="description"
          value={form.description}
          onChange={onChange}
          rows={4}
          placeholder="อธิบายรายละเอียดสินค้า เนื้อหา ขนาด วัสดุ ฯลฯ"
          className={`${inputClass(errors.description)} resize-none`}
          disabled={disabled}
        />
      </Field>
    </section>
  );
}
