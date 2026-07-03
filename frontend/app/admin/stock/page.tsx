"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Product, StockStatus, getStockStatus } from "./types";
import { loadProducts, saveProducts } from "../productStorage";
import SummaryCards from "./components/SummaryCards";
import StockToolbar from "./components/StockToolbar";
import StockTable from "./components/StockTable";
import QuickEditModal from "./components/QuickEditModal";

// =====================
// หน้าหลัก: Stock Management Page
// ทำหน้าที่เป็น orchestrator — จัดการ state ทั้งหมด
// Components ลูกรับข้อมูลผ่าน props และส่ง callback กลับมา
// =====================

export default function StockPage() {
  // โหลดข้อมูลจาก localStorage เมื่อ mount ครั้งแรก
  const [products, setProducts] = useState<Product[]>(() => loadProducts());

  // =====================
  // Filter / Sort state
  // =====================
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("updated_desc");

  // =====================
  // Modal / Action state
  // =====================
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // =====================
  // ฟังก์ชันจัดการสต็อก
  // ทุก action อัปเดต state และบันทึกลง localStorage พร้อมกัน
  // =====================

  // อัปเดต state + บันทึกลง localStorage (ชั่วคราวก่อนเชื่อม API)
  const updateProducts = (updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated); // → productStorage.ts → localStorage
  };

  // เพิ่ม/ลดสต็อก ±delta (จากปุ่ม +/- ในตาราง)
  const adjustStock = (id: string, delta: number) => {
    updateProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, stock: Math.max(0, p.stock + delta), updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  // ตั้งค่าสต็อกโดยตรง (จาก QuickEditModal)
  const setStock = (id: string, newStock: number) => {
    updateProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, stock: newStock, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  // ลบสินค้า (หลังกดยืนยัน)
  const deleteProduct = (id: string) => {
    updateProducts(products.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  // =====================
  // Filter + Sort (useMemo เพื่อ performance)
  // =====================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // ค้นหาตามชื่อหรือ SKU
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }

    // กรองหมวดหมู่
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // กรองสถานะสต็อก
    if (statusFilter) {
      result = result.filter(
        (p) => getStockStatus(p) === (statusFilter as StockStatus)
      );
    }

    // เรียงลำดับ
    result.sort((a, b) => {
      switch (sort) {
        case "name_asc":   return a.name.localeCompare(b.name, "th");
        case "name_desc":  return b.name.localeCompare(a.name, "th");
        case "stock_asc":  return a.stock - b.stock;
        case "stock_desc": return b.stock - a.stock;
        default:           return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return result;
  }, [products, search, categoryFilter, statusFilter, sort]);

  // =====================
  // Render
  // =====================

  return (
    <div className="relative min-h-screen bg-[#FFF8FB] py-10 px-4 sm:px-6">
      {/* วงกลมตกแต่งข้างหลัง */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ===================== Header ===================== */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-pink-400 transition-colors duration-200">
              หน้าหลัก
            </Link>
            <span>/</span>
            <Link href="/admin" className="hover:text-pink-400 transition-colors duration-200">
              แอดมิน
            </Link>
            <span>/</span>
            <span className="text-pink-400 font-semibold">จัดการสต็อก</span>
          </div>

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

        {/* ===================== Summary Cards ===================== */}
        <SummaryCards products={products} />

        {/* ===================== ตารางสต็อก ===================== */}
        <div className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6">
          <StockToolbar
            search={search}
            category={categoryFilter}
            statusFilter={statusFilter}
            sort={sort}
            onSearch={setSearch}
            onCategory={setCategoryFilter}
            onStatus={setStatusFilter}
            onSort={setSort}
          />

          <StockTable
            products={filteredProducts}
            totalCount={products.length}
            deletingId={deletingId}
            onAdjust={adjustStock}
            onEdit={setEditingProduct}
            onDeleteRequest={setDeletingId}
            onDeleteConfirm={deleteProduct}
            onDeleteCancel={() => setDeletingId(null)}
          />
        </div>
      </div>

      {/* ===================== Quick Edit Modal ===================== */}
      {editingProduct && (
        <QuickEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(id, newStock) => {
            setStock(id, newStock); // → อัปเดต state + localStorage
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}