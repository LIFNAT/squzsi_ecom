"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  Package,
  ReceiptText,
  TrendingUp,
} from "lucide-react";
import { post } from "@/app/post";
import ShowAllModal from "./ShowAllModal";

interface OrderRecord {
  order_id: number;
  quantity: number;
  price: number;
  total_price: number;
  payment_method: string;
  created_at: string;
  user_id: number;
  full_name: string;
  email: string;
  product_id: string;
  product_name: string;
  category: string;
  state: string;
  receipt: string;
  address: string;
  id: string;
  promotion: number;
}

type FetchStatus = "loading" | "error" | "ready";

async function getOrders(): Promise<OrderRecord[]> {
  const res = await fetch(`${post}/payment/getorders`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Request failed ${res.status}`);
  }

  const data = await res.json();
  return Array.isArray(data?.data) ? data.data : [];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

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

function getStatusClass(status: string) {
  return STATUS_STYLES[status] ?? "bg-gray-50 text-gray-700";
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(status)}`}
    >
      {status || "—"}
    </span>
  );
}

function OrdersTable({
  orders,
  dense = false,
}: {
  orders: OrderRecord[];
  dense?: boolean;
}) {
  const cellPad = dense ? "px-3 py-2.5" : "px-4 py-3";

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 px-4 py-16 text-center">
        <p className="text-sm font-medium text-gray-600">ยังไม่มีคำสั่งซื้อ</p>
        <p className="text-sm text-gray-400">
          รายการจะแสดงที่นี่เมื่อมีออเดอร์เข้ามา
        </p>
      </div>
    );
  }

  return (
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className={`${cellPad} font-medium text-gray-400`}>คำสั่งซื้อ</th>
          <th className={`${cellPad} font-medium text-gray-400`}>ลูกค้า</th>
          <th className={`${cellPad} font-medium text-gray-400`}>วันที่</th>
          <th className={`${cellPad} font-medium text-gray-400`}>ยอดเงิน</th>
          <th className={`${cellPad} font-medium text-gray-400`}>สถานะ</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.id ?? order.order_id}
            className="border-b border-gray-50 last:border-0"
          >
            <td className={`${cellPad} font-medium text-gray-800`}>
              #{order.order_id}
            </td>
            <td className={`${cellPad} text-gray-600`}>
              {order.full_name || "—"}
            </td>
            <td className={`${cellPad} text-gray-500`}>
              {formatDate(order.created_at)}
            </td>
            <td className={`${cellPad} font-medium text-gray-800`}>
              {formatCurrency(
                Number(order.total_price || 0) -
                  Number(order.quantity || 0) * Number(order.promotion || 0),
              )}
            </td>
            <td className={cellPad}>
              <StatusBadge status={order.state} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SummaryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="h-8 w-8 animate-pulse rounded-xl bg-gray-100" />
      <div className="mt-4 h-3 w-20 animate-pulse rounded bg-gray-100" />
      <div className="mt-3 h-5 w-24 animate-pulse rounded bg-gray-100" />
    </div>
  );
}

export default function Statement() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [showAllModal, setShowAllModal] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadOrders = async () => {
      setStatus("loading");
      try {
        const data = await getOrders();
        if (!mounted) return;
        setOrders(data);
        setStatus("ready");
      } catch (error) {
        console.error("FETCH STATEMENT ERROR:", error);
        if (mounted) setStatus("error");
      }
    };

    loadOrders();

    return () => {
      mounted = false;
    };
  }, []);

  // Lock body scroll and allow Esc to close while the modal is open.
  useEffect(() => {
    if (!showAllModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowAllModal(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showAllModal]);

  const summary = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, item) =>
        sum +
        (Number(item.total_price || 0) -
          Number(item.quantity || 0) * Number(item.promotion || 0)),
      0,
    );

    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (item) => item.state === "จัดส่งสำเร็จ",
    ).length;
    const pendingOrders = orders.filter(
      (item) => item.state === "รอดำเนินการ",
    ).length;
    const canceledOrders = orders.filter(
      (item) => item.state === "ยกเลิก",
    ).length;
    const estimatedProfit = totalRevenue * 0.2;

    const sortedOrders = [...orders].sort(
      (a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at)),
    );

    const recentOrders = sortedOrders;

    const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));

      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const label = normalizedDate.toLocaleDateString("th-TH", {
        weekday: "short",
      });
      const dayCount = orders.filter((item) => {
        if (!item.created_at) return false;
        const createdAt = new Date(item.created_at);
        createdAt.setHours(0, 0, 0, 0);
        return createdAt.getTime() === normalizedDate.getTime();
      }).length;

      return { label, value: dayCount };
    });

    const maxValue = Math.max(1, ...lastSevenDays.map((item) => item.value));
    const performance = lastSevenDays.map((item) => ({
      ...item,
      percentage: Math.round((item.value / maxValue) * 100),
    }));

    return {
      totalRevenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      canceledOrders,
      estimatedProfit,
      recentOrders,
      allOrders: sortedOrders,
      performance,
    };
  }, [orders]);

  const summaryCards = [
    {
      title: "รายได้รวม",
      value: formatCurrency(summary.totalRevenue),
      change: `${summary.completedOrders} สำเร็จ`,
      icon: ReceiptText,
      accent: "bg-pink-50 text-pink-600",
    },
    {
      title: "คำสั่งซื้อทั้งหมด",
      value: summary.totalOrders.toString(),
      change: `${summary.pendingOrders} รอดำเนินการ`,
      icon: Package,
      accent: "bg-purple-50 text-purple-600",
    },
    {
      title: "ชำระเงินแล้ว",
      value: summary.completedOrders.toString(),
      change: `${summary.canceledOrders} ยกเลิก`,
      icon: CreditCard,
      accent: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "กำไรประมาณการ",
      value: formatCurrency(summary.estimatedProfit),
      change: "20%",
      icon: TrendingUp,
      accent: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="h-screen overflow-hidden bg-pink-50/40 p-4 md:p-8">
      <div className="mx-auto flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-500">
              Statement
            </p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              ภาพรวมรายได้และคำสั่งซื้อ
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-500">
            <CalendarDays size={16} className="text-pink-500" />
            <span>
              {status === "loading" && "กำลังโหลดข้อมูล..."}
              {status === "error" && "โหลดข้อมูลไม่สำเร็จ"}
              {status === "ready" && "อัปเดตจากข้อมูลจริง"}
            </span>
          </div>
        </div>

        {status === "error" ? (
          <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-3xl border border-rose-100 bg-rose-50/40 text-center">
            <p className="text-sm font-medium text-rose-700">
              ไม่สามารถดึงข้อมูลคำสั่งซื้อได้
            </p>
            <p className="max-w-sm text-sm text-rose-500">
              ตรวจสอบการเชื่อมต่อ backend แล้วลองใหม่อีกครั้ง
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-1 rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              ลองใหม่
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {status === "loading"
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SummaryCardSkeleton key={i} />
                  ))
                : summaryCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.title}
                        className="rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-pink-100 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      >
                        <div
                          className={`inline-flex rounded-xl p-2 ${card.accent}`}
                        >
                          <Icon size={18} />
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                          {card.title}
                        </p>
                        <div className="mt-1.5 flex items-end justify-between gap-2">
                          <p className="text-xl font-bold text-gray-900">
                            {card.value}
                          </p>
                          <span className="rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">
                            {card.change}
                          </span>
                        </div>
                      </div>
                    );
                  })}
            </div>

            <div className="mt-6 grid flex-1 gap-6 overflow-hidden xl:grid-cols-[1.3fr_0.7fr]">
              <div className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-gray-100">
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/60 px-4 py-4">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      รายการคำสั่งซื้อล่าสุด
                    </h2>
                    <p className="text-sm text-gray-500">
                      ดึงจากข้อมูลออเดอร์จริงในระบบ
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllModal(true)}
                    disabled={status === "loading"}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-pink-200 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ดูทั้งหมด
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  {status === "loading" ? (
                    <div className="space-y-3 p-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-10 animate-pulse rounded-lg bg-gray-50"
                        />
                      ))}
                    </div>
                  ) : (
                    <OrdersTable orders={summary.recentOrders} />
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      ความเคลื่อนไหว
                    </p>
                    <h2 className="text-xl font-bold text-gray-900">
                      7 วันที่ผ่านมา
                    </h2>
                  </div>
                  <div className="rounded-full bg-pink-50 p-2 text-pink-500">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  {status === "loading"
                    ? Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-6 animate-pulse rounded-lg bg-gray-50"
                        />
                      ))
                    : summary.performance.map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex items-center justify-between text-sm text-gray-600">
                            <span>{item.label}</span>
                            <span className="font-medium text-gray-900">
                              {item.value} รายการ
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-gray-50">
                            <div
                              className="h-1.5 rounded-full bg-pink-500 transition-all"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ShowAllModal
        open={showAllModal}
        onClose={() => setShowAllModal(false)}
        orders={summary.allOrders}
      />
    </div>
  );
}
