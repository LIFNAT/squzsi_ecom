"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { post } from "@/app/post";
import Image from "next/image";

interface Order {
  order_id: number;
  quantity: number;
  price: string;
  total_price: string;
  payment_method: string;
  created_at: string;
  state: string;
  receipt: string;

  user_id: number;
  full_name: string;
  email: string;
  address: string | null;

  product_id: string;
  product_name: string;
  category: string;

  producy_image: string[];
  promotion: string;
}

const stateoders = [
  { title: "คำสั่งซื้อทั้งหมด", value: "คำสั่งซื้อทั้งหมด" },
  { title: "รอดำเนินการ", value: "รอดำเนินการ" },
  { title: "ระหว่างขนส่ง", value: "shipping" },
  { title: "จัดส่งสำเร็จ", value: "delivered" },
  { title: "ยกเลิก", value: "cancelled" },
];

export default function OrdersSection() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("คำสั่งซื้อทั้งหมด");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        if (!user?.id) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${post}/payment/orders/user/${user.id}`
        );

        setOrders(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>กำลังโหลด...</div>;
  }

  const filteredOrders =
    selectedState === "คำสั่งซื้อทั้งหมด"
      ? orders
      : orders.filter(
        (order) => order.state === selectedState
      );

  const paymentLabel: Record<string, string> = {
    card: "บัตรเครดิต / เดบิต",
    qr: "พร้อมเพย์ / QR Code",
    cod: "เก็บเงินปลายทาง",
  };

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">
        📦 คำสั่งซื้อของฉัน
      </h2>

      <div className="flex gap-2 pb-4">
        {stateoders.map((e, i) => {
          return (
            <div
              className="border p-2 rounded-2xl bg-white border-pink-300 text-gray-600 text-sm"
              key={i}
              onClick={() => setSelectedState(e.title)}
            >
              <button>
                {e.title}
              </button>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-4 max-h-[700px] overflow-y-auto pr-2">
        {filteredOrders.length === 0 ? (
          <p>ไม่พบคำสั่งซื้อ</p>
        ) : (
          filteredOrders.map((order: any) => (
            <div
              key={order.order_id}
              className="border bg-white rounded-2xl text-sm border-gray-200 shadow p-3"
            >
              <div className="border-b mb-2 pb-2 border-gray-300 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <p>{order.receipt}</p>
                  <p className="p-1 bg-pink-400 text-white rounded-2xl px-3 text-xs">{order.state}</p>
                </div>
                <div>
                  <p className="p-1 bg-amber-200 text-white rounded-2xl px-3 text-xs">
                    {paymentLabel[order.payment_method] || order.payment_method}
                  </p>
                </div>
              </div>

              <div className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* ฝั่งซ้าย: ข้อมูลสินค้า */}
                  <div className="flex gap-4">
                    <div className='relative w-35 h-35 overflow-hidden rounded-2xl'>
                      <Image
                        src={order.producy_image[0]}
                        alt={order.product_name}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-[14px] gap-1.5">
                      <h3 className="font-bold text-gray-800 text-base mb-1">{order.product_name}</h3>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">{order.category}</p>
                      <div className=" space-y-1">
                        <div className="flex gap-2">
                          <span className="text-gray-400">ราคา/ชิ้น:</span>
                          <span className="font-medium">{Number(order.price).toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-400">จำนวน:</span>
                          <span className="font-medium">{order.quantity} ชิ้น</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-400">ส่วนลด:</span>
                          <p className="text-red-500">{(Number(order.promotion)) * (Number(order.quantity))}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-green-600 font-bold">ยอดสุทธิ:</span>
                          <span className="text-green-600 font-bold">
                            {(
                              Number(order.total_price) -
                              Number(order.promotion) * Number(order.quantity)
                            ).toLocaleString()} บาท
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ฝั่งขวา: ข้อมูลผู้สั่งซื้อ */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      ข้อมูลผู้สั่งซื้อ
                    </h4>
                    <div className="text-[13px] text-gray-600 space-y-2">
                      <div className="flex gap-2">
                        <span className="text-gray-400">ชื่อ:</span>
                        <span className="font-medium">{order.full_name || "-"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-400">อีเมล:</span>
                        <span className="font-medium">{order.email}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-400 text-xs">ที่อยู่การจัดส่ง:</span>
                        <p className="text-gray-800 ">
                          {order.address || '-'}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}