'use clinet'

import { propsTracking } from "../page";

interface propsTrackingSummary {
  respodaw: propsTracking[]
}

export default function TrackingSummary({ respodaw }: propsTrackingSummary) {


  const totaloders = respodaw.length;
  const pending = respodaw.filter(e => (e.state === 'รอดำเนินการ')).length
  const totalDuringTransport = respodaw.filter(e => (e.state === 'ระหว่างขนส่ง')).length
  const deliverySuccessful = respodaw.filter(e => (e.state === 'จัดส่งสำเร็จ')).length

  const cards = [
    {
      label: "คำสั่งซื้อทั้งหมด",
      value: totaloders,
      icon: "📋",
      color: "bg-pink-50 border-pink-100",
      textColor: "text-pink-500",
    },
    {
      label: "รอดำเนินการ",
      value: pending,
      icon: "⏳",
      color: "bg-yellow-50 border-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      label: "ระหว่างขนส่ง",
      value: totalDuringTransport,
      icon: "🚚",
      color: "bg-purple-50 border-purple-100",
      textColor: "text-purple-500",
    },
    {
      label: "จัดส่งสำเร็จ",
      value: deliverySuccessful,
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
