"use client";
import { useState } from 'react';
import { propsgetProduct } from "../page"; // ตรวจสอบ path ให้ตรงกับที่เก็บไฟล์
import { post } from '@/app/post';
import PopupEdit from "./popupedit"; // ตรวจสอบ path ของ EditModal

interface StockTableProps {
  response: propsgetProduct[];
}

export default function StockTable({ response }: StockTableProps) {
  // 1. State สำหรับเก็บข้อมูลสินค้าที่ถูกเลือกมาแก้ไข
  const [editingProduct, setEditingProduct] = useState<propsgetProduct | null>(null);

  // 2. ฟังก์ชันอัปเดตข้อมูลจริง (ยิง API ไปที่ Backend)
  const handleUpdate = async (updatedData: propsgetProduct) => {
    try {
      const res = await fetch(`${post}/product/update-product/${updatedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert("บันทึกข้อมูลสำเร็จ!");
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full min-w-[1000px] text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-400 border-b border-gray-100">
            <th className="pb-3 pr-4 w-12">รูป</th>
            <th className="pb-3 pl-3">ชื่อสินค้า</th>
            <th className="pb-3 pr-4">หมวดหมู่</th>
            <th className="pb-3 pr-4 text-right">ราคา</th>
            <th className="pb-3 pr-4 text-center">สต็อก</th>
            <th className="pb-3 pr-4">สถานะ</th>
            <th className="pb-3 pr-4 text-center">วันที่สร้าง</th>
            <th className="pb-3 text-right">จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {response
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((item) => {
              const stock = Number(item.current_product ?? 0);
              return (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4">
                    <img 
                      src={item.producy_image?.[0] || "/placeholder.png"} 
                      alt={item.product_name} 
                      className="w-10 h-10 object-cover rounded-lg shadow-sm" 
                    />
                  </td>
                  <td className="py-3 pl-3 font-medium text-gray-700">{item.product_name || "-"}</td>
                  <td className="py-3 pr-4 text-gray-600">{item.category || "-"}</td>
                  <td className="py-3 pr-4 text-right text-gray-700">{Number(item.price ?? 0).toLocaleString()}</td>
                  <td className="py-3 pr-4 text-center font-medium">{stock.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-gray-600">{item.status || "พร้อมจัดส่ง"}</td>
                  <td className="py-3 pr-4 text-center text-gray-400">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString("th-TH") : "-"}
                  </td>
                  <td className="py-3 text-right">
                    <button 
                      onClick={() => setEditingProduct(item)} // เปิด Modal
                      className="px-4 py-2 bg-pink-400 rounded-xl text-xs text-white hover:bg-pink-500 transition-all shadow-sm"
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* 3. เรียกใช้ EditModal */}
      <PopupEdit
        isOpen={!!editingProduct} 
        onClose={() => setEditingProduct(null)} 
        product={editingProduct} 
        onSave={handleUpdate} // ส่งฟังก์ชันไปทำงานที่ Backend
      />
    </div>
  );
}