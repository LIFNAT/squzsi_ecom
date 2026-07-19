"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Trash2, Heart } from "lucide-react";
import Image from "next/image";

type CartItem = {
  id: string;
  name: string;
  sub: string;
  weight: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  emoji: string;
  quantity: number;
  product_name: string
  category: string
  description: string
  promotion: number
  image: string
};

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = JSON.parse(
      localStorage.getItem("cart-items") || "[]"
    );

    setCartItems(cart);
  }, []);

  // จำนวนสินค้าแล้วอัปเดต localStorage
  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? {
          ...item,
          quantity: Math.max(1, item.quantity + delta),
        }
        : item
    );

    setCartItems(updated);
    localStorage.setItem("cart-items", JSON.stringify(updated));
  };

  // ลบสินค้าแล้วอัปเดต localStorage
  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);

    setCartItems(updated);
    localStorage.setItem("cart-items", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (sum, item) =>
      sum +
      (Number(item.promotion)) *
      item.quantity,
    0
  );

  const shippingFee = subtotal > 0 ? 0 : 0;

  const total = subtotal - totalDiscount + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">🛒</span>
        <p className="text-lg font-semibold text-[#1D1D1D] mb-2">
          ตะกร้าของคุณว่างเปล่า
        </p>
        <p className="text-sm text-gray-500 mb-6">
          เลือกสินค้าที่ชอบแล้วเพิ่มลงตะกร้าได้เลย
        </p>
        <button
          onClick={() => router.push("/")}
          className="rounded-2xl bg-pink-500 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
        >
          กลับไปเลือกสินค้า
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-40">
      <div className="mx-auto max-w-4xl px-4 pt-8">
        <div className="mb-6">
          <p className="text-xs font-medium text-[#B08968] tracking-widest uppercase mb-1">
            ตะกร้าสินค้า
          </p>
          <h1 className="text-2xl font-semibold text-[#1D1D1D]">
            รายการสินค้า ({cartItems.length})
          </h1>
        </div>

        {/* รายการสินค้าในตะกร้า */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-[24px] border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-pink-50 flex items-center justify-center">
                <Image
                  src={`${item.image}`}
                  alt=""
                  fill
                  priority={true}
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pink-500">
                        {item.category}
                      </span>
                      <h3 className="mt-1 font-semibold text-[#1D1D1D]">
                        {item.product_name}
                      </h3>
                      <p className="text-xs text-gray-400">รายละเอียดสินค้า : {item.description}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="ลบสินค้า"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-pink-500">
                      ฿{item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {/* ฿{item.originalPrice.toLocaleString()} */}
                    </span>
                  </div>

                  <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="rounded-full p-1.5 text-gray-600 transition hover:bg-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="rounded-full p-1.5 text-gray-600 transition hover:bg-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* สรุปยอด */}
        <div className="mt-6 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-[#1D1D1D]">สรุปคำสั่งซื้อ</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>ราคาสินค้ารวม</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>ส่วนลดรวม</span>
              <span>-฿{totalDiscount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>ค่าจัดส่ง</span>
              <span className="text-green-500">ฟรีค่าจัดส่ง</span>
            </div>
            <div className="my-2 border-t border-dashed border-gray-200" />
            <div className="flex justify-between text-base font-bold text-[#1D1D1D]">
              <span>ยอดรวมสุทธิ</span>
              <span className="text-pink-500">
                ฿{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar สำหรับ checkout */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">ยอดรวมสุทธิ</p>
            <p className="text-xl font-bold text-pink-500">
              ฿{total.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.setItem(
                "checkout-type",
                "cart"
              );
              router.push("/payment");
            }}
            className="flex items-center gap-2 rounded-2xl bg-pink-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
          >
            <ShoppingCart size={18} />
            ดำเนินการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
}