import { StockStatus } from "../types";

// =====================
// Badge แสดงสถานะสต็อก — ใช้ใน StockTable
// =====================

const STATUS_MAP: Record<StockStatus, { label: string; cls: string }> = {
  in_stock: {
    label: "In Stock",
    cls: "bg-green-100 text-green-600 border-green-200",
  },
  low_stock: {
    label: "Low Stock",
    cls: "bg-yellow-100 text-yellow-600 border-yellow-200",
  },
  out_of_stock: {
    label: "Out of Stock",
    cls: "bg-red-100 text-red-500 border-red-200",
  },
  hidden: {
    label: "Hidden",
    cls: "bg-gray-100 text-gray-400 border-gray-200",
  },
};

export default function StockStatusBadge({ status }: { status: StockStatus }) {
  const { label, cls } = STATUS_MAP[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}
    >
      {label}
    </span>
  );
}
