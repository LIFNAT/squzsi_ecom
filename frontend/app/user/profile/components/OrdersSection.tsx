"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { post } from "@/app/post";

export default function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">
        คำสั่งซื้อของฉัน
      </h2>

      {orders.length === 0 ? (
        <p>ไม่พบคำสั่งซื้อ</p>
      ) : (
        orders.map((order: any) => (
          <div
            key={order.order_id}
            className="border p-4 rounded-xl mb-3"
          >
            <p>Order #{order.order_id}</p>
            <p>{order.product_name}</p>
            <p>จำนวน {order.quantity}</p>
            <p>฿{order.total_price}</p>
            <p>{order.state}</p>
          </div>
        ))
      )}
    </div>
  );
}