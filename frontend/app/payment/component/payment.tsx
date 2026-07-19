"use client";
import { post } from '@/app/post';
import React, { useEffect, useState } from 'react';

type PaymentMethodId = 'qr' | 'card' | 'cod';

interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  desc: string;
}

export default function Payment() {

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('qr');
  const [checkoutData, setCheckoutData] = useState<any>(null);

  //เเปลงชิ้น * เงิน
  const sumpriceitme =
    checkoutData?.items?.reduce(
      (sum: number, item: any) =>
        sum + Number(item.price) * item.quantity,
      0
    ) || 0;

  useEffect(() => {

    const checkoutProduct = localStorage.getItem("checkout-product");
    const cartItems = localStorage.getItem("cart-items");

    const type = localStorage.getItem("checkout-type");


    // ซื้อเลย
    if (type === "product" && checkoutProduct) {

      const product = JSON.parse(checkoutProduct);

      setCheckoutData({
        type: "product",
        items: [product]
      });

      return;
    }


    // จากตะกร้า
    if (type === "cart" && cartItems) {

      const cart = JSON.parse(cartItems);

      setCheckoutData({
        type: "cart",
        items: cart
      });

      return;
    }


  }, []);

const handleCheckout = async () => {

  if (!checkoutData) {
    console.log("ไม่มีข้อมูลสินค้า");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("USER:", user);

  try {
    const res = await fetch(
      `${post}/payment/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_id: user.id,

          items: checkoutData.items.map((item:any)=>({
            product_id:item.id,
            quantity:item.quantity
          })),

          payment_method:selectedMethod
        })
      }
    );

    const data = await res.json();

    console.log("response:", data);

  } catch(err){
    console.error(err);
  }
};

  const methods: PaymentMethod[] = [
    { id: 'qr', label: 'พร้อมเพย์ / QR Code', desc: 'สแกนจ่ายผ่านแอปธนาคาร' },
    { id: 'card', label: 'บัตรเครดิต / เดบิต', desc: 'Visa, Mastercard, JCB' },
    { id: 'cod', label: 'เก็บเงินปลายทาง', desc: 'ชำระเงินสดเมื่อได้รับสินค้า' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-28">

      {/* แถบหัวเรื่อง */}
      <div className="bg-[#EE2C6A] px-4 py-4">
        <h1 className="text-white font-semibold text-base">ชำระเงิน</h1>
      </div>

      <div className="max-w-2xl mx-auto px-3 pt-3 space-y-3">

        {/* สรุปสินค้า */}
        <div className="bg-white rounded-lg p-4">

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-[#767676]">
              รายการสินค้า
            </span>

            <span className="text-xs text-[#1D1D1D] font-medium">
              {checkoutData?.items?.map((item: any) => (
                <div key={item.id}>
                  {item.product_name}
                </div>
              ))}
            </span>
          </div>


          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-[#767676]">
              หมวดหมู่สินค้า
            </span>

            <span className="text-xs text-[#1D1D1D] font-medium">
              {checkoutData?.items?.map((item: any) => (
                <div key={item.id}>
                  {item.category}
                </div>
              ))}
            </span>
          </div>


          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-[#767676]">
              จำนวนสินค้า
            </span>

            <span className="text-xs text-[#EE2C6A] font-medium">
              {
                checkoutData?.items?.reduce(
                  (sum: number, item: any) => sum + item.quantity,
                  0
                ) || 0
              } ชิ้น
            </span>
          </div>


          <div className="flex justify-between items-center text-sm mb-1.5">
            <span className="text-[#767676]">
              ราคาสินค้ารวม
            </span>

            <span className="text-[#1D1D1D]">
              {sumpriceitme.toLocaleString()}
            </span>
          </div>


          <div className="flex justify-between items-center text-sm">
            <span className="text-[#767676]">
              ค่าจัดส่ง
            </span>

            <span className="text-[#00B14F] font-medium">
              ฟรีค่าจัดส่ง
            </span>
          </div>

        </div>

        {/* วิธีชำระเงิน */}
        <div className="bg-white rounded-lg p-4">
          <span className="text-sm font-medium text-[#1D1D1D] block mb-3">เลือกวิธีชำระเงิน</span>
          <div className="space-y-2">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${selectedMethod === m.id
                  ? 'border-[#EE2C6A] bg-[#FFF0F5]'
                  : 'border-[#EAEAEA] bg-white'
                  }`}
              >
                <span
                  className={`flex-shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${selectedMethod === m.id ? 'border-[#EE2C6A]' : 'border-[#C4C4C4]'
                    }`}
                >
                  {selectedMethod === m.id && (
                    <span className="w-[9px] h-[9px] rounded-full bg-[#EE2C6A]" />
                  )}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-[#1D1D1D]">{m.label}</span>
                  <span className="block text-xs text-[#909090] mt-0.5">{m.desc}</span>
                </span>
              </button>
            ))}
          </div>

          {/* รายละเอียดเพิ่มเติมตามวิธีที่เลือก */}
          {selectedMethod === 'qr' && (
            <div className="mt-4 rounded-lg bg-[#FAFAFA] border border-[#EFEFEF] p-4 flex flex-col items-center">
              <div className="w-32 h-32 bg-white border border-[#EAEAEA] rounded flex items-center justify-center mb-2">
                <span className="text-[#C4C4C4] text-xs font-mono">QR CODE</span>
              </div>
              <p className="text-xs text-[#909090]">สแกนภายใน 15 นาที เพื่อยืนยันคำสั่งซื้อ</p>
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="mt-4 space-y-2.5">
              <input
                type="text"
                placeholder="หมายเลขบัตร"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#EAEAEA] focus:outline-none focus:border-[#EE2C6A] text-sm placeholder:text-[#C4C4C4]"
              />
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#EAEAEA] focus:outline-none focus:border-[#EE2C6A] text-sm placeholder:text-[#C4C4C4]"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#EAEAEA] focus:outline-none focus:border-[#EE2C6A] text-sm placeholder:text-[#C4C4C4]"
                />
              </div>
            </div>
          )}

          {selectedMethod === 'cod' && (
            <div className="mt-4 rounded-lg bg-[#FAFAFA] border border-[#EFEFEF] p-3">
              <p className="text-xs text-[#767676]">เตรียมเงินสดให้พอดี พนักงานจัดส่งไม่รับเงินทอน</p>
            </div>
          )}
        </div>

        {/* คูปองส่วนลด */}
      </div>

      {/* แถบสรุปยอดด้านล่าง (sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAEAEA] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] text-[#909090]">ยอดชำระทั้งหมด</span>
            <span className="block text-lg font-bold text-[#EE2C6A]">฿590.00</span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-[#EE2C6A] hover:bg-[#D4235C] text-white text-sm font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ยืนยันคำสั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
}