"use client";
import { post } from "@/app/post";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type PaymentMethodId = "qr" | "card" | "cod";

interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  desc: string;
}

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>("qr");
  const [checkoutData, setCheckoutData] = useState<any>(null);

  // States สำหรับระบบคูปองส่วนลด
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null); // เก็บข้อมูลคูปองที่ใช้สำเร็จ

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ราคาสินค้ารวม (หักส่วนลดปกติของสินค้าแล้ว)
  const sumpriceitme =
    checkoutData?.items?.reduce(
      (sum: number, item: any) =>
        sum +
        (Number(item.price) - Number(item.promotion || 0)) *
        Number(item.quantity),
      0,
    ) || 0;

  // คำนวณส่วนลดจากคูปองเพิ่มเติม
  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "%") {
      return (sumpriceitme * Number(appliedCoupon.discount)) / 100;
    }
    return Number(appliedCoupon.discount); // กรณีเป็น "บาท"
  };

  const couponDiscount = getCouponDiscount();

  // ยอดชำระสุทธิหลังหักคูปอง (ต้องไม่ต่ำกว่า 0)
  const finalTotalPrice = Math.max(0, sumpriceitme - couponDiscount);

  useEffect(() => {
    const checkoutProduct = localStorage.getItem("checkout-product");
    const cartItems = localStorage.getItem("cart-items");
    const type = localStorage.getItem("checkout-type");

    // ซื้อเลย
    if (type === "product" && checkoutProduct) {
      const product = JSON.parse(checkoutProduct);
      setCheckoutData({
        type: "product",
        items: [product],
      });
      return;
    }

    // จากตะกร้า
    if (type === "cart" && cartItems) {
      const cart = JSON.parse(cartItems);
      setCheckoutData({
        type: "cart",
        items: cart,
      });
      return;
    }
  }, []);

  // ฟังก์ชันตรวจสอบและใช้งานคูปอง
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกรหัสคูปอง",
        confirmButtonColor: "#ec4899",
      });
      return;
    }

    try {
      // ดึงข้อมูลคูปองจากหลังบ้าน (หรือเปลี่ยนเป็นตรวจสอบใน Client ชั่วคราวได้)
      const res = await fetch(`${post}/promotion/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.id) {
        // เช็กวันหมดอายุเบื้องต้น (ถ้าหลังบ้านไม่ได้เช็กให้)
        if (data.status === "ปิดใช้งาน") {
          throw new Error("คูปองนี้ถูกปิดใช้งานแล้ว");
        }

        setAppliedCoupon(data); // เก็บข้อมูลลง state
        Swal.fire({
          icon: "success",
          title: "ใช้คูปองสำเร็จ ",
          text: `ลดเพิ่ม ${data.discount} ${data.type}`,
          confirmButtonColor: "#ec4899",
        });
      } else {
        throw new Error(data.message || "ไม่พบรหัสคูปองนี้");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ใช้คูปองไม่สำเร็จ",
        text: err.message || "รหัสคูปองไม่ถูกต้องหรือหมดอายุ",
        confirmButtonColor: "#ec4899",
      });
    }
  };

  // ฟังก์ชันยกเลิกคูปอง
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handleCheckout = async () => {
    if (!checkoutData || !checkoutData.items) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลสินค้า",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: "#ec4899",
      });
      return;
    }

    // ตรวจสอบ stock
    const isOutOfStock = checkoutData.items.some(
      (item: any) => item.quantity > item.stock,
    );

    if (isOutOfStock) {
      Swal.fire({
        icon: "error",
        title: "สินค้าไม่เพียงพอ",
        text: "ขออภัยครับ สินค้าบางรายการหมดหรือมีจำนวนไม่เพียงพอ",
        confirmButtonColor: "#ec4899",
      });
      return;
    }

    // ตรวจสอบที่อยู่จัดส่ง
    if (!user.address || user.address.trim() === "") {
      const result = await Swal.fire({
        icon: "warning",
        title: "ยังไม่มีที่อยู่จัดส่ง",
        text: "กรุณากรอกที่อยู่ก่อนทำรายการสั่งซื้อ",
        confirmButtonColor: "#ec4899",
        confirmButtonText: "ไปกรอกที่อยู่",
      });

      if (result.isConfirmed) {
        window.location.href = "/user/profile";
      }
      return;
    }

    try {
      const res = await fetch(`${post}/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          items: checkoutData.items.map((item: any) => ({
            product_id: item.id,
            quantity: item.quantity,
            promotion: Number(item.promotion) || 0,
            price: Number(item.price),
            total_price:
              (Number(item.price) - Number(item.promotion || 0)) *
              Number(item.quantity),
          })),
          payment_method: selectedMethod,
          coupon_id: appliedCoupon ? appliedCoupon.id : null, // ส่ง id คูปองไปที่ backend
          coupon_discount: couponDiscount, // ส่งจำนวนเงินที่ลดจากคูปองไปบันทึก
          final_total_price: finalTotalPrice, // ราคาสุดท้ายหลังหักทุกอย่าง
        }),
      });

      const data = await res.json();

      if (!data.success) {
        const result = await Swal.fire({
          icon: "error",
          title: "ไม่สามารถสั่งซื้อได้",
          text: data.message || "เกิดข้อผิดพลาดในการทำรายการ",
          confirmButtonColor: "#ec4899",
        });

        if (result.isConfirmed) {
          window.location.href = "/";
        }
        return;
      }

      // สั่งซื้อสำเร็จ เคลียร์ข้อมูลที่ checkout ออก
      localStorage.removeItem("checkout-product");
      localStorage.removeItem("checkout-type");

      const result = await Swal.fire({
        icon: "success",
        title: "สั่งซื้อสำเร็จ ",
        text: "สร้างคำสั่งซื้อเรียบร้อยแล้ว",
        confirmButtonColor: "#ec4899",
      });

      if (result.isConfirmed) {
        window.location.href = "/user/profile";
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับระบบได้",
        confirmButtonColor: "#ec4899",
      });
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "/auth/login";
      return;
    }
    const user = JSON.parse(userData);
    if (!user.id) {
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
      return;
    }
  }, []);

  const methods: PaymentMethod[] = [
    { id: "qr", label: "พร้อมเพย์ / QR Code", desc: "สแกนจ่ายผ่านแอปธนาคาร" },
    { id: "card", label: "บัตรเครดิต / เดบิต", desc: "Visa, Mastercard, JCB" },
    { id: "cod", label: "เก็บเงินปลายทาง", desc: "ชำระเงินสดเมื่อได้รับสินค้า" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-28">
      <div className="bg-[#EE2C6A] px-4 py-4">
        <h1 className="text-white font-semibold text-base">ชำระเงิน</h1>
      </div>

      <div className="max-w-2xl mx-auto px-3 pt-3 space-y-3">
        {/* สรุปสินค้า */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <span className="text-sm font-medium text-[#767676] flex-shrink-0">รายการสินค้า</span>
            <div className="text-xs text-[#1D1D1D] font-medium text-right max-w-[70%]">
              {checkoutData?.items?.map((item: any) => (
                <div key={item.id} className="truncate">{item.product_name}</div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-[#767676]">หมวดหมู่สินค้า</span>
            <div className="text-xs text-[#1D1D1D] font-medium">
              {checkoutData?.items?.map((item: any) => (
                <div key={item.id}>{item.category}</div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-[#767676]">จำนวนสินค้า</span>
            <span className="text-xs text-[#EE2C6A] font-medium">
              {checkoutData?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0} ชิ้น
            </span>
          </div>

          <div className="flex justify-between items-center text-sm mb-1.5">
            <span className="text-[#767676]">ส่วนลดสินค้า</span>
            <div className="text-[#1D1D1D]">
              {checkoutData?.items?.map((item: any) => (
                <div key={item.id}>
                  {(Number(item.promotion || 0) * Number(item.quantity)).toLocaleString()} บาท
                </div>
              ))}
            </div>
          </div>

          {/* แสดงแถวลดเพิ่มเมื่อมีคูปองทำงาน */}
          {appliedCoupon && (
            <div className="flex justify-between items-center text-sm mb-1.5 text-pink-600 font-medium">
              <span>ส่วนลดคูปอง ({appliedCoupon.code})</span>
              <span>-{couponDiscount.toLocaleString()} บาท</span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm mb-1.5">
            <span className="text-[#767676]">ราคาสินค้ารวม</span>
            <span className="text-[#1D1D1D]">
              {finalTotalPrice.toLocaleString()} บาท
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-[#767676]">ค่าจัดส่ง</span>
            <span className="text-[#00B14F] font-medium">ฟรีค่าจัดส่ง</span>
          </div>
        </div>

        {/* 🎫 ช่องกรอกคูปองส่วนลดที่เพิ่มเข้ามาใหม่ */}
        <div className="bg-white rounded-lg p-4">
          <label className="text-sm font-medium text-[#1D1D1D] block mb-2">
            คูปองส่วนลด
          </label>

          {!appliedCoupon ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="กรอกรหัสคูปอง เช่น SALE50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-[#EE2C6A] text-sm uppercase"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-[#EE2C6A] hover:bg-[#D4235C] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                ยืนยัน
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-pink-50 border border-pink-200 p-2.5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#EE2C6A] bg-white border border-pink-300 px-2 py-0.5 rounded shadow-sm">
                  {appliedCoupon.code}
                </span>
                <span className="text-xs text-gray-600">
                  ลดเพิ่ม {appliedCoupon.discount} {appliedCoupon.type} สำเร็จแล้ว
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-xs text-gray-400 hover:text-red-500 underline font-medium"
              >
                ยกเลิกใช้
              </button>
            </div>
          )}
        </div>

        {/* วิธีชำระเงิน */}
        <div className="bg-white rounded-lg p-4">
          <span className="text-sm font-medium text-[#1D1D1D] block mb-3">เลือกวิธีชำระเงิน</span>
          <div className="space-y-2">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${selectedMethod === m.id ? "border-[#EE2C6A] bg-[#FFF0F5]" : "border-[#EAEAEA] bg-white"
                  }`}
              >
                <span className={`flex-shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${selectedMethod === m.id ? "border-[#EE2C6A]" : "border-[#C4C4C4]"
                  }`}>
                  {selectedMethod === m.id && <span className="w-[9px] h-[9px] rounded-full bg-[#EE2C6A]" />}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-[#1D1D1D]">{m.label}</span>
                  <span className="block text-xs text-[#909090] mt-0.5">{m.desc}</span>
                </span>
              </button>
            ))}
          </div>

          {selectedMethod === "qr" && (
            <div className="mt-4 rounded-lg bg-[#FAFAFA] border border-[#EFEFEF] p-4 flex flex-col items-center">
              <div className="w-32 h-32 bg-white border border-[#EAEAEA] rounded flex items-center justify-center mb-2">
                <span className="text-[#C4C4C4] text-xs font-mono">QR CODE</span>
              </div>
              <p className="text-xs text-[#909090]">สแกนภายใน 15 นาที เพื่อยืนยันคำสั่งซื้อ</p>
            </div>
          )}

          {selectedMethod === "card" && (
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

          {selectedMethod === "cod" && (
            <div className="mt-4 rounded-lg bg-[#FAFAFA] border border-[#EFEFEF] p-3">
              <p className="text-xs text-[#767676]">เตรียมเงินสดให้พอดี พนักงานจัดส่งไม่รับเงินทอน</p>
            </div>
          )}
        </div>
      </div>

      {/* แถบสรุปยอดด้านล่าง (sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAEAEA] px-4 py-3 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] text-[#909090]">ยอดชำระทั้งหมด</span>
            <span className="block text-lg font-bold text-[#EE2C6A]">
              ฿{finalTotalPrice.toLocaleString()}
            </span>
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