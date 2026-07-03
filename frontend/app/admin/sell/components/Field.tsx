import React from "react";

// =====================
// ส่วนประกอบย่อย: Field wrapper
// =====================

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({
  label,
  required,
  error,
  hint,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-gray-600">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

// =====================
// CSS class ที่ใช้ซ้ำสำหรับ Input/Select/Textarea
// =====================

export const inputClass = (hasError?: string) =>
  `w-full px-4 py-2.5 rounded-2xl border text-sm text-gray-700 placeholder-gray-300
   bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400
   transition-all duration-200 ${
     hasError
       ? "border-red-300 bg-red-50/30"
       : "border-pink-200 hover:border-pink-300"
   }`;
