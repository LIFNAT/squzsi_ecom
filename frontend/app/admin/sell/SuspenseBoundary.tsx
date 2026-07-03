"use client";

import { Suspense } from "react";
import AdminSellPage from "./page";

export default function AdminSellSuspenseBoundary() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8FB] px-4 py-10 text-center text-gray-500">กำลังโหลด...</div>}>
      <AdminSellPage />
    </Suspense>
  );
}
