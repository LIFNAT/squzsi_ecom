import { TrackingOrder } from "../../trackingStorage";

// =====================
// TrackingSummary — การ์ดแสดงผลสรุปสถานะการติดตามสินค้า
// =====================

export default function TrackingSummary({ orders }: { orders: TrackingOrder[] }) {
  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  const cards = [
    {
      label: "คำสั่งซื้อทั้งหมด",
      value: totalCount,
      icon: "📋",
      color: "bg-pink-50 border-pink-100",
      textColor: "text-pink-500",
    },
    {
      label: "รอดำเนินการ / จัดส่ง",
      value: pendingCount,
      icon: "⏳",
      color: "bg-yellow-50 border-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      label: "ระหว่างขนส่ง",
      value: shippedCount,
      icon: "🚚",
      color: "bg-purple-50 border-purple-100",
      textColor: "text-purple-500",
    },
    {
      label: "จัดส่งสำเร็จ",
      value: deliveredCount,
      icon: "✅",
      color: "bg-green-50 border-green-100",
      textColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-3xl border p-5 flex flex-col gap-2 ${card.color}`}
        >
          <span className="text-2xl">{card.icon}</span>
          <p className={`text-2xl font-extrabold ${card.textColor}`}>
            {card.value}
          </p>
          <p className="text-xs text-gray-500 font-medium">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
