import Link from "next/link";
import { Product, getStockStatus, LOW_STOCK_THRESHOLD } from "../types";
import StockStatusBadge from "./StockStatusBadge";

// =====================
// StockTable — ตารางแสดงรายการสินค้าและสต็อก
// รับ products ที่ filter+sort แล้วจาก page.tsx
// =====================

interface StockTableProps {
  products: Product[];        // filtered + sorted แล้ว
  totalCount: number;         // จำนวนทั้งหมดก่อน filter (เพื่อแสดง "N จาก M")
  deletingId: string | null;
  // Callbacks → ส่งคำสั่งทั้งหมดขึ้นไปยัง page.tsx ซึ่งจัดการ state + localStorage
  onAdjust: (id: string, delta: number) => void;
  onEdit: (product: Product) => void;
  onDeleteRequest: (id: string) => void;
  onDeleteConfirm: (id: string) => void;
  onDeleteCancel: () => void;
}

export default function StockTable({
  products,
  totalCount,
  deletingId,
  onAdjust,
  onEdit,
  onDeleteRequest,
  onDeleteConfirm,
  onDeleteCancel,
}: StockTableProps) {
  // กรณีไม่มีผลลัพธ์
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <div className="text-5xl mb-3">🔍</div>
        <p className="font-semibold">ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
        <p className="text-sm mt-1">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[800px] text-sm">
          {/* ===================== หัวตาราง ===================== */}
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-400 border-b border-pink-50">
              <th className="pb-3 pr-4 w-12">รูป</th>
              <th className="pb-3 pr-4">ชื่อสินค้า / SKU</th>
              <th className="pb-3 pr-4">หมวดหมู่</th>
              <th className="pb-3 pr-4 text-right">ราคา</th>
              <th className="pb-3 pr-4 text-center">สต็อก</th>
              <th className="pb-3 pr-4 text-center">จอง</th>
              <th className="pb-3 pr-4 text-center">คงเหลือ</th>
              <th className="pb-3 pr-4">สถานะ</th>
              <th className="pb-3 pr-4">อัปเดตล่าสุด</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* ===================== แถวข้อมูล ===================== */}
          <tbody className="divide-y divide-pink-50">
            {products.map((product) => {
              const stockStatus = getStockStatus(product);
              const available = product.stock - product.reservedStock;
              const isConfirmingDelete = deletingId === product.id;

              return (
                <tr
                  key={product.id}
                  className="hover:bg-pink-50/40 transition-colors duration-150 group"
                >
                  {/* รูปสินค้า */}
                  <td className="py-4 pr-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-lg overflow-hidden flex-shrink-0">
                      {product.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "🧸"
                      )}
                    </div>
                  </td>

                  {/* ชื่อสินค้า + SKU */}
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-gray-700 truncate max-w-[200px]">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{product.sku}</p>
                  </td>

                  {/* หมวดหมู่ */}
                  <td className="py-4 pr-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-500 text-xs font-semibold border border-purple-100">
                      {product.category}
                    </span>
                  </td>

                  {/* ราคา */}
                  <td className="py-4 pr-4 text-right">
                    <p className="font-bold text-gray-700">
                      ฿{product.price.toLocaleString()}
                    </p>
                    {product.discountPrice > 0 && (
                      <p className="text-xs text-pink-400 mt-0.5">
                        ลด ฿{product.discountPrice.toLocaleString()}
                      </p>
                    )}
                  </td>

                  {/* ===================== Stock Actions: ±1 ===================== */}
                  <td className="py-4 pr-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* ปุ่ม -1 → onAdjust(id, -1) → page.tsx อัปเดต state + localStorage */}
                      <button
                        onClick={() => onAdjust(product.id, -1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 flex items-center justify-center text-xs font-bold transition-all duration-150 active:scale-90"
                        title="ลด 1"
                      >
                        −
                      </button>
                      <span className="font-bold text-gray-700 min-w-[32px] text-center">
                        {product.stock}
                      </span>
                      {/* ปุ่ม +1 → onAdjust(id, +1) → page.tsx อัปเดต state + localStorage */}
                      <button
                        onClick={() => onAdjust(product.id, 1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-600 flex items-center justify-center text-xs font-bold transition-all duration-150 active:scale-90"
                        title="เพิ่ม 1"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* สต็อกที่จองไว้ */}
                  <td className="py-4 pr-4 text-center text-gray-500">
                    {product.reservedStock}
                  </td>

                  {/* สต็อกคงเหลือ (มีสี) */}
                  <td className="py-4 pr-4 text-center">
                    <span
                      className={`font-bold ${
                        available <= 0
                          ? "text-red-500"
                          : available <= LOW_STOCK_THRESHOLD
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {available}
                    </span>
                  </td>

                  {/* สถานะสต็อก */}
                  <td className="py-4 pr-4">
                    <StockStatusBadge status={stockStatus} />
                  </td>

                  {/* วันที่อัปเดตล่าสุด */}
                  <td className="py-4 pr-4 text-xs text-gray-400 whitespace-nowrap">
                    {new Date(product.updatedAt).toLocaleDateString("th-TH", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* ===================== Stock Actions: Delete / Edit ===================== */}
                  <td className="py-4 text-right">
                    {isConfirmingDelete ? (
                      // ยืนยันการลบ (inline) → onDeleteConfirm → page.tsx ลบ + บันทึก localStorage
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-red-400 font-semibold">
                          ลบแน่ใจ?
                        </span>
                        <button
                          onClick={() => onDeleteConfirm(product.id)}
                          className="px-3 py-1 rounded-full bg-red-400 text-white text-xs font-bold hover:bg-red-500 active:scale-95 transition-all"
                        >
                          ลบ
                        </button>
                        <button
                          onClick={onDeleteCancel}
                          className="px-3 py-1 rounded-full border border-gray-200 text-gray-500 text-xs hover:bg-gray-50 active:scale-95 transition-all"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    ) : (
                      // Action buttons — แสดงเมื่อ hover บนแถว
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        {/* ✏️ เปิด QuickEditModal */}
                        <button
                          onClick={() => onEdit(product)}
                          className="w-8 h-8 rounded-full hover:bg-pink-100 text-gray-400 hover:text-pink-500 flex items-center justify-center transition-all duration-150"
                          title="แก้ไขสต็อก"
                        >
                          ✏️
                        </button>
                        {/* 📝 ไปหน้าแก้ไขสินค้า (sell page) */}
                        <Link
                          href={`/admin/sell?id=${product.id}`}
                          className="w-8 h-8 rounded-full hover:bg-blue-100 text-gray-400 hover:text-blue-500 flex items-center justify-center transition-all duration-150"
                          title="แก้ไขสินค้า"
                        >
                          📝
                        </Link>
                        {/* 🗑️ ขอยืนยันการลบ */}
                        <button
                          onClick={() => onDeleteRequest(product.id)}
                          className="w-8 h-8 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all duration-150"
                          title="ลบสินค้า"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* จำนวนผลลัพธ์ */}
      <p className="text-xs text-gray-400 mt-4 text-right">
        แสดง {products.length} จาก {totalCount} รายการ
      </p>
    </>
  );
}
