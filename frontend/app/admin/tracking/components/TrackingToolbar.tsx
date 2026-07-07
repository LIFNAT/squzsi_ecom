// =====================
// TrackingToolbar — ค้นหา / กรองสถานะ / เรียงลำดับ
// =====================

interface TrackingToolbarProps {
  search: string;
  statusFilter: string;
  sort: string;
  onSearch: (v: string) => void;
  onStatus: (v: string) => void;
  onSort: (v: string) => void;
}

export default function TrackingToolbar({
  search,
  statusFilter,
  sort,
  onSearch,
  onStatus,
  onSort,
}: TrackingToolbarProps) {
  const selectCls =
    "px-3 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200";

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
      {/* กล่องค้นหาหลัก */}
      <div className="relative flex-1 min-w-[200px]">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          id="tracking-search"
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="ค้นหา Order ID / SKU / ชื่อสินค้า / เลขพัสดุ..."
          className="w-full pl-9 pr-4 py-2 rounded-2xl border border-pink-200 bg-white text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:border-pink-300 transition-all duration-200"
        />
      </div>

      {/* ตัวกรองสถานะจัดส่ง */}
      <select
        id="tracking-filter-status"
        value={statusFilter}
        onChange={(e) => onStatus(e.target.value)}
        className={selectCls}
      >
        <option value="">ทุกสถานะจัดส่ง</option>
        <option value="pending">รอจัดส่ง (Pending)</option>
        <option value="processing">กำลังเตรียมจัดส่ง (Processing)</option>
        <option value="shipped">ระหว่างจัดส่ง (Shipped)</option>
        <option value="delivered">จัดส่งสำเร็จ (Delivered)</option>
        <option value="cancelled">ยกเลิก (Cancelled)</option>
      </select>

      {/* เรียงลำดับข้อมูล */}
      <select
        id="tracking-sort"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className={selectCls}
      >
        <option value="updated_desc">อัปเดตล่าสุด</option>
        <option value="updated_asc">อัปเดตเก่าสุด</option>
        <option value="order_desc">Order ID (ใหม่ &rarr; เก่า)</option>
        <option value="order_asc">Order ID (เก่า &rarr; ใหม่)</option>
      </select>
    </div>
  );
}
