"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { post } from "@/app/post";

export default function AddressSection() {

  // React ธรรมดา
  // const user = JSON.parse(
  //   localStorage.getItem("user") || "{}"
  // );

  // Next.js
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const [address, setAddress] = useState(user.address || "");
  const [loading, setLoading] = useState(false);

  const handleSaveAddress = async () => {

    if (!address.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกที่อยู่",
        confirmButtonColor: "#ec4899",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${post}/auth/updateUserProfile/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        Swal.fire({
          icon: "error",
          title: "บันทึกไม่สำเร็จ",
          text: data.message,
          confirmButtonColor: "#ec4899",
        });
        return;
      }

      // update localStorage
      const newUser = {
        ...user,
        address: data.data.address,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(newUser)
      );


      Swal.fire({
        icon: "success",
        title: "บันทึกที่อยู่สำเร็จ",
        confirmButtonColor: "#ec4899",
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อ server ได้",
        confirmButtonColor: "#ec4899",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">

      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">
          📍 ที่อยู่จัดส่ง
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          ใช้สำหรับจัดส่งสินค้า
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ที่อยู่
        </label>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="บ้านเลขที่ ถนน แขวง เขต จังหวัด รหัสไปรษณีย์"
          rows={5}
          className="
          w-full
          rounded-xl
          border
          border-pink-200
          px-4
          py-3
          text-sm
          outline-none
          resize-none
          focus:ring-2
          focus:ring-pink-400
          "
        />
      </div>


      <button
        onClick={handleSaveAddress}
        disabled={loading}
        className="
        mt-5
        w-full
        rounded-xl
        bg-pink-500
        py-3
        text-white
        font-semibold
        hover:bg-pink-600
        disabled:opacity-50
        "
      >
        {loading ? "กำลังบันทึก..." : "บันทึกที่อยู่"}
      </button>

    </div>
  );
}