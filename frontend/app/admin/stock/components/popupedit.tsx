"use client";
import { useState, useEffect, useRef } from "react";
import { propsgetProduct } from "../page";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: propsgetProduct | null;
  onSave: (data: propsgetProduct) => void;
}

export default function PopupEdit({ isOpen, onClose, product, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<propsgetProduct | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({ ...product, producy_image: product.producy_image || [] });
    }
  }, [product]);

  if (!isOpen || !formData) return null;

  // จำลองการอัปโหลดไฟล์ (สร้าง URL ชั่วคราว)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && targetIndex !== null) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      setFormData(prev => {
        if (!prev) return null;
        const newImages = [...(prev.producy_image || [])];
        newImages[targetIndex] = newUrl;
        return { ...prev, producy_image: newImages };
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      const newImages = (prev.producy_image || []).filter((_, i) => i !== indexToRemove);
      return { ...prev, producy_image: newImages };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-6 text-gray-800">แก้ไขสินค้า</h2>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">ชื่อสินค้า</label>
            <input value={formData.product_name || ""} onChange={(e) => setFormData(prev => ({ ...prev!, product_name: e.target.value }))} className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">ราคา</label>
              <input type="number" value={formData.price || 0} onChange={(e) => setFormData(prev => ({ ...prev!, price: Number(e.target.value) }))} className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">สต็อก</label>
              <input type="number" value={formData.current_product || 0} onChange={(e) => setFormData(prev => ({ ...prev!, current_product: Number(e.target.value) }))} className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">หมวดหมู่</label>
              <input value={formData.category || ""} onChange={(e) => setFormData(prev => ({ ...prev!, category: e.target.value }))} className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">สถานะ</label>
              <select value={formData.status || "พร้อมจัดส่ง"} onChange={(e) => setFormData(prev => ({ ...prev!, status: e.target.value }))} className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl">
                <option value="พร้อมจัดส่ง">พร้อมจัดส่ง</option>
                <option value="สินค้าหมด">สินค้าหมด</option>
                <option value="รอเติมสต็อก">รอเติมสต็อก</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">
              โปรโมชั่น
            </label>
            <input
              type="number"
              value={formData.promotion || 0}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  promotion: Number(e.target.value),
                }))
              }
              className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl"
            />
          </div>


          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">
              รายละเอียดสินค้า
            </label>
            <textarea
              rows={4}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  description: e.target.value,
                }))
              }
              className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl resize-none"
            />
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-gray-400 uppercase mb-3 block">รูปภาพสินค้า</label>
            <div className="space-y-3">
              {(formData.producy_image || []).map((url, index) => (
                <div key={index} className="flex gap-4 items-center bg-gray-50 p-2 rounded-xl border">
                  <img src={url} className="w-16 h-16 object-cover rounded-lg border bg-white" />
                  <div className="flex-1 flex gap-2">
                    <button onClick={() => { setTargetIndex(index); fileInputRef.current?.click(); }} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg">เปลี่ยน</button>
                    <button onClick={() => removeImage(index)} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg">ลบ</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-500 hover:bg-gray-100 rounded-xl">ยกเลิก</button>
          <button onClick={() => { onSave(formData); onClose(); }} className="px-6 py-2.5 bg-pink-400 text-white rounded-xl shadow-lg hover:bg-pink-500">บันทึกข้อมูล</button>
        </div>
      </div>
    </div>
  );
}