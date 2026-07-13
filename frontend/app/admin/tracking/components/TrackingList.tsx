import { TrackingOrder, TrackingStatus } from "../../trackingStorage";

// =====================
// TrackingList — แผงแสดงรายการออเดอร์ทั้งหมดฝั่งซ้าย (Split-View)
// =====================

interface TrackingListProps {
  orders: TrackingOrder[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const STATUS_MAP: Record<TrackingStatus, { label: string; bg: string; text: string }> = {
  pending: { label: "รอจัดส่ง", bg: "bg-amber-50", text: "text-amber-600" },
  processing: { label: "เตรียมส่ง", bg: "bg-blue-50", text: "text-blue-600" },
  shipped: { label: "ส่งแล้ว", bg: "bg-purple-50", text: "text-purple-600" },
  delivered: { label: "สำเร็จ", bg: "bg-emerald-50", text: "text-emerald-600" },
  cancelled: { label: "ยกเลิก", bg: "bg-rose-50", text: "text-rose-500" },
};

export default function TrackingList({ orders, selectedId, onSelect }: TrackingListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-pink-50">
        <div className="text-4xl mb-2">🔍</div>
        <p className="font-semibold text-gray-700 text-sm">ไม่พบคำสั่งซื้อ</p>
        <p className="text-xs text-gray-400">ลองเปลี่ยนเงื่อนไขค้นหา</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 max-h-[600px] overflow-y-auto pr-1">
      {orders.map((order) => {
        const isSelected = order.id === selectedId;
        const statusInfo = STATUS_MAP[order.status] || {
          label: order.status,
          bg: "bg-gray-50",
          text: "text-gray-600",
        };

        return (
          <button
            key={order.id}
            onClick={() => onSelect(order.id)}
            className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-pink-100/40 border-pink-400 shadow-sm shadow-pink-100"
                : "bg-white border-pink-50 hover:border-pink-200 hover:bg-pink-50/10"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-sm text-pink-500">{order.id}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border border-transparent ${statusInfo.bg} ${statusInfo.text}`}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-gray-700 truncate">
                {order.customerName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {order.productName}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-pink-50/50 text-[10px] text-gray-400">
              <span className="font-mono">{order.sku}</span>
              <span>
                {new Date(order.updatedAt).toLocaleDateString("th-TH", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
