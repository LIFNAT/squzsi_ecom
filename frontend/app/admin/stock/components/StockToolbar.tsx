import { CATEGORIES, SORT_OPTIONS } from "../types";

// =====================
// StockToolbar — ค้นหา / กรองหมวดหมู่ / กรองสถานะ / เรียงลำดับ
// =====================

interface StockToolbarProps {
  search: string;
  category: string;
  statusFilter: string;
  sort: string;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
  onStatus: (v: string) => void;
  onSort: (v: string) => void;
}

export default function StockToolbar({
  search,
  category,
  statusFilter,
  sort,
  onSearch,
  onCategory,
  onStatus,
  onSort,
}: StockToolbarProps) {
  const selectCls =
    "px-3 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200";

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
      {/* ค้นหาชื่อสินค้า / SKU */}
      <div className="relative flex-1 min-w-[200px]">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          id="stock-search"
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="ค้นหาชื่อสินค้า หรือ SKU..."
          className="w-full pl-9 pr-4 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200"
        />
      </div>

      {/* กรองหมวดหมู่ */}
      <select
        id="stock-filter-category"
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className={selectCls}
      >
        <option value="">ทุกหมวดหมู่</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* กรองสถานะสต็อก */}
      <select
        id="stock-filter-status"
        value={statusFilter}
        onChange={(e) => onStatus(e.target.value)}
        className={selectCls}
      >
        <option value="">ทุกสถานะ</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
        <option value="hidden">Hidden</option>
      </select>

      {/* เรียงลำดับ */}
      <select
        id="stock-sort"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className={selectCls}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
