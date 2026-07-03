import { Product, getStockStatus } from "../types";

// =====================
// Summary Cards — 4 การ์ดสรุปสต็อกที่หัวหน้า
// คำนวณใหม่ทุกครั้งที่ products เปลี่ยน
// =====================

export default function SummaryCards({ products }: { products: Product[] }) {
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(
    (p) => getStockStatus(p) === "low_stock"
  ).length;
  const outOfStockCount = products.filter(
    (p) => getStockStatus(p) === "out_of_stock"
  ).length;

  const cards = [
    {
      label: "สินค้าทั้งหมด",
      value: products.length,
      icon: "🧸",
      color: "bg-pink-50 border-pink-100",
      textColor: "text-pink-500",
    },
    {
      label: "สต็อกรวม",
      value: totalStock.toLocaleString(),
      icon: "📦",
      color: "bg-purple-50 border-purple-100",
      textColor: "text-purple-500",
    },
    {
      label: "สต็อกใกล้หมด",
      value: lowStockCount,
      icon: "⚠️",
      color: "bg-yellow-50 border-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      label: "หมดสต็อก",
      value: outOfStockCount,
      icon: "❌",
      color: "bg-red-50 border-red-100",
      textColor: "text-red-500",
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
