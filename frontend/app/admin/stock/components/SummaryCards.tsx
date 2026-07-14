import { propsgetProduct } from "../page";

interface propsSummaryCards {
  response: propsgetProduct[]
}

export default function SummaryCards({ response }: propsSummaryCards) {

  const producttotol = response.length

  const totalCurrentProduct = response.reduce(
    (sum, item) => sum + (item.current_product ?? 0),
    0
  );

  const productex = response.filter(p => (p.current_product ?? 0) < 5).length
  const Out_of_stock = response.filter(p => (p.current_product ?? 0) <= 0).length

  const cards = [
    {
      label: "สินค้าทั้งหมด",
      value: producttotol,
      icon: "🧸",
      color: "bg-pink-50 border-pink-100",
      textColor: "text-pink-500",
    },
    {
      label: "สต็อกรวม",
      value: totalCurrentProduct,
      icon: "📦",
      color: "bg-purple-50 border-purple-100",
      textColor: "text-purple-500",
    },
    {
      label: "สต็อกใกล้หมด",
      value: productex,
      icon: "⚠️",
      color: "bg-yellow-50 border-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      label: "หมดสต็อก",
      value: Out_of_stock,
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
