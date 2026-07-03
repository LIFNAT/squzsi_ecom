import React from "react";
import { FormData, FormErrors } from "./types";
import { Field, inputClass } from "./Field";

// =====================
// ราคาและสต็อก
// =====================

interface PriceStockProps {
  form: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function PriceStock({
  form,
  errors,
  onChange,
  disabled,
}: PriceStockProps) {
  return (
    <section className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6 flex flex-col gap-5">
      <h2 className="text-base font-extrabold text-gray-700 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-xs">💰</span>
        ราคาและสต็อก
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* ราคาปกติ */}
        <Field label="ราคา (บาท)" required error={errors.price}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">
              ฿
            </span>
            <input
              id="product-price"
              type="number"
              name="price"
              value={form.price}
              onChange={onChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`${inputClass(errors.price)} pl-8`}
              disabled={disabled}
            />
          </div>
        </Field>

        {/* ราคาลด */}
        <Field label="ราคาลด (บาท)" hint="ไม่บังคับ">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">
              ฿
            </span>
            <input
              id="product-discount-price"
              type="number"
              name="discountPrice"
              value={form.discountPrice}
              onChange={onChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`${inputClass()} pl-8`}
              disabled={disabled}
            />
          </div>
        </Field>

        {/* จำนวนสต็อก */}
        <Field label="จำนวนสต็อก" required error={errors.stock}>
          <input
            id="product-stock"
            type="number"
            name="stock"
            value={form.stock}
            onChange={onChange}
            placeholder="0"
            min="0"
            className={inputClass(errors.stock)}
            disabled={disabled}
          />
        </Field>
      </div>
    </section>
  );
}
