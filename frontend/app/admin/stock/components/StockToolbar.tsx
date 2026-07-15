import { propsgetProduct } from "../page";
import { CATEGORIES, nearexproduct, SORT_OPTIONS } from "../types";

interface propsStockTable {
  response: propsgetProduct[];
  search: string;
  setSearch: (value: string) => void;

  categoryFilter: string;
  setCategoryFilter: (value: string) => void;

  statusFilter: string
  setstatusFilter: (value: string) => void;

}

export default function StockToolbar({ response, statusFilter, setstatusFilter, categoryFilter, setCategoryFilter, setSearch, search }: propsStockTable) {
  const selectCls =
    "px-3 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200";

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
      {/* ค้นหาชื่อสินค้า / SKU */},
      <div className="relative flex-1 min-w-[200px]">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          id="stock-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // onChange={(e) => onSearch(e.target.value)}
          placeholder="ค้นหาชื่อสินค้า หรือ SKU..."
          className="w-full pl-9 pr-4 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200"
        />
      </div>

      {/* กรองหมวดหมู่ */}
      <select
        id="stock-filter-category"
        value={statusFilter}
        onChange={(e) => setstatusFilter(e.target.value)}
        className={selectCls}
      >
        <option value="">	สถานะ</option>
        {nearexproduct.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* กรองสถานะสต็อก */}
      <select
        id="stock-filter-category"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className={selectCls}
      >
        <option value="">ทุกหมวดหมู่</option>

        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* เรียงลำดับ */}
      <select
        id="stock-sort"
        // value={sort}
        // onChange={(e) => onSort(e.target.value)}
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
