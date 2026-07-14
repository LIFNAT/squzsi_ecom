"use client";

import { useState } from "react";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  emoji: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "confirmed" | "packing" | "shipping" | "delivered" | "cancelled";
  items: OrderItem[];
}

interface Props {
  orders: Order[];
}

const STEPS = ["สั่งแล้ว", "ยืนยัน", "เตรียมพัสดุ", "กำลังส่ง", "ส่งถึงแล้ว"];
const STATUS_STEP: Record<string, number> = {
  pending: 0, confirmed: 1, packing: 2, shipping: 3, delivered: 4,
};
const STATUS_LABEL: Record<string, string> = {
  pending: "รอยืนยัน", confirmed: "ยืนยันแล้ว", packing: "เตรียมพัสดุ",
  shipping: "กำลังจัดส่ง", delivered: "ส่งถึงแล้ว", cancelled: "ยกเลิก",
};
const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-600",
  confirmed: "bg-blue-100 text-blue-600",
  packing: "bg-orange-100 text-orange-600",
  shipping: "bg-indigo-100 text-indigo-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-500",
};

const FILTER_TABS = [
  { key: "all", label: "ทั้งหมด" },
  { key: "active", label: "กำลังดำเนินการ" },
  { key: "shipping", label: "กำลังจัดส่ง" },
  { key: "delivered", label: "สำเร็จ" },
  { key: "cancelled", label: "ยกเลิก" },
];

function filterOrders(orders: Order[], key: string) {
  if (key === "all") return orders;
  if (key === "active") return orders.filter((o) => ["pending", "confirmed", "packing"].includes(o.status));
  return orders.filter((o) => o.status === key);
}

function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const step = STATUS_STEP[order.status] ?? -1;

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-pink-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">#{order.id}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[order.status]}`}>
            {STATUS_LABEL[order.status]}
          </span>
        </div>
        <span className="text-xs text-gray-400">{order.date}</span>
      </div>

      {/* Items Preview */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {order.items.slice(0, 3).map((item, i) => (
            <div key={i} className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-xl border border-pink-100">
              {item.emoji}
            </div>
          ))}
          {order.items.length > 3 && (
            <span className="text-xs text-gray-400">+{order.items.length - 3} อื่นๆ</span>
          )}
        </div>
        <span className="font-bold text-pink-500 text-sm">฿{order.total.toLocaleString()}</span>
      </div>

      {/* Progress Bar (not for cancelled) */}
      {order.status !== "cancelled" && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1">
            {STEPS.map((label, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-pink-400" : "bg-pink-100"}`} />
                <span className={`text-[9px] text-center ${i === step ? "text-pink-500 font-semibold" : "text-gray-300"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-pink-50 bg-pink-50/30">
        {order.status === "delivered" && (
          <button className="text-xs px-3 py-1.5 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors">
            ✍️ เขียนรีวิว
          </button>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-xs px-3 py-1.5 border border-pink-200 text-pink-500 rounded-full hover:bg-pink-50 transition-colors"
        >
          {open ? "ซ่อนรายละเอียด ▲" : "ดูรายละเอียด ▼"}
        </button>
      </div>

      {/* Accordion Detail */}
      {open && (
        <div className="px-4 py-3 bg-gray-50 border-t border-pink-100 flex flex-col gap-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-gray-600">{item.name}</span>
                <span className="text-gray-400">×{item.qty}</span>
              </div>
              <span className="text-gray-700 font-medium">฿{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-pink-100 pt-2 flex justify-between text-sm font-semibold">
            <span>รวมทั้งหมด</span>
            <span className="text-pink-500">฿{order.total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersSection({ orders }: Props) {
  const [filter, setFilter] = useState("all");
  const filtered = filterOrders(orders, filter);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-700">📦 คำสั่งซื้อของฉัน</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200
              ${filter === tab.key
                ? "bg-pink-400 text-white border-pink-400"
                : "border-pink-200 text-gray-500 hover:border-pink-300 hover:text-pink-400"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Order List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📭</div>
          <p>ไม่มีคำสั่งซื้อในหมวดนี้</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </div>
  );
}
