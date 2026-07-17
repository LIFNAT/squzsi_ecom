"use client";

import Link from "next/link";
import SummaryCards from "./SummaryCards";
import StockToolbar from "./StockToolbar";
import StockTable from "./StockTable";
import QuickEditModal from "./QuickEditModal";
import { useState } from "react";
import { propsgetProduct } from "../page";

interface propsStockPage {
  response: propsgetProduct[]
}

export default function StockPage({ response }: propsStockPage) {

  const [popup, setpopup] = useState({
    QuickEdit: false
  })

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setstatusFilter] = useState('')

  //กรองข้อมูลใน table
  const filteredResponse = (response ?? []).filter((item) => {
    const matchSearch =
      item.product_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      !categoryFilter ||
      item.category === categoryFilter;

    const nearexproductdata =
      !statusFilter ||
      item.status === statusFilter


    return matchSearch && matchCategory && nearexproductdata;
  });

  return (
    <div className="relative min-h-screen bg-[#FFF8FB] py-10 w-full px-4 sm:px-6">
      {/* วงกลมตกแต่งข้างหลัง */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative  px-5">
        {/* ===================== Header ===================== */}
        <div className="mb-8">
          {/* Breadcrumb */}
          

          {/* หัวข้อ + ปุ่มเพิ่มสินค้า */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-sm">
                📦
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-800">จัดการสต็อก</h1>
                <p className="text-sm text-gray-400 mt-0.5">ดูและอัปเดตสต็อกสินค้าทั้งหมด</p>
              </div>
            </div>

            {/* ไปหน้าเพิ่มสินค้า → sell/page.tsx */}
            <Link
              href="/admin/sell"
              className="px-5 py-2.5 rounded-full bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              + เพิ่มสินค้า
            </Link>
          </div>
        </div>

        <SummaryCards
          response={response}
        />

        <div className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6">

          <StockToolbar
            response={response}
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            setstatusFilter={setstatusFilter}
            statusFilter={statusFilter}

          />

          <StockTable
            response={filteredResponse}
          />
        </div>
      </div>


      {popup.QuickEdit && (
        <QuickEditModal

        />
      )}


    </div>
  );
}