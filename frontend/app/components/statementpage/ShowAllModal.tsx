"use client";

import { X } from "lucide-react";

interface ModalOrder {
  id?: string | number;
  order_id?: number | string;
  full_name?: string;
  created_at?: string;
  total_price?: number | string;
  state?: string;
}

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const STATUS_STYLES: Record<string, string> = {
  จัดส่งสำเร็จ: "bg-emerald-50 text-emerald-700",
  รอดำเนินการ: "bg-amber-50 text-amber-700",
  ระหว่างขนส่ง: "bg-sky-50 text-sky-700",
  ยกเลิก: "bg-rose-50 text-rose-700",
};

function getStatusClass(status?: string) {
  return STATUS_STYLES[status ?? ""] ?? "bg-gray-50 text-gray-700";
}

function StatusBadge({ status }: { status?: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
        status
      )}`}
    >
      {status || "—"}
    </span>
  );
}

export default function ShowAllModal({
  open,
  onClose,
  orders,
}: {
  open: boolean;
  onClose: () => void;
  orders: ModalOrder[];
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-500">
              Recent Orders
            </p>

            <h2 className="text-lg font-bold text-gray-900">
              รายการคำสั่งซื้อทั้งหมด
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              {orders.length} รายการ
            </span>

            <button
              onClick={onClose}
              className="rounded-full border border-gray-200 p-2 transition hover:bg-pink-50 hover:text-pink-600"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-5">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {orders.length === 0 ? (
              <div className="flex h-60 flex-col items-center justify-center">
                <p className="text-lg font-medium text-gray-600">
                  ยังไม่มีคำสั่งซื้อ
                </p>

                <p className="text-gray-400">
                  รายการคำสั่งซื้อจะแสดงที่นี่
                </p>
              </div>
            ) : (
              <div className="max-h-[650px] overflow-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-white shadow-sm">
                    <tr className="border-b border-gray-100">
                      <th className="px-4 py-3 font-semibold text-gray-500">
                        คำสั่งซื้อ
                      </th>

                      <th className="px-4 py-3 font-semibold text-gray-500">
                        ลูกค้า
                      </th>

                      <th className="px-4 py-3 font-semibold text-gray-500">
                        วันที่
                      </th>

                      <th className="px-4 py-3 font-semibold text-gray-500">
                        ยอดเงิน
                      </th>

                      <th className="px-4 py-3 font-semibold text-gray-500">
                        สถานะ
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id ?? order.order_id}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 font-semibold text-gray-800">
                          #{order.order_id}
                        </td>

                        <td className="px-4 py-4 text-gray-700">
                          {order.full_name || "—"}
                        </td>

                        <td className="px-4 py-4 text-gray-500">
                          {formatDate(order.created_at)}
                        </td>

                        <td className="px-4 py-4 font-semibold text-gray-800">
                          {formatCurrency(order.total_price || 0)}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={order.state} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}