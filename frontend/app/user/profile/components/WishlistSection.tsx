"use client";

import { useState } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  category: string;
}

interface Props {
  items: WishlistItem[];
}

export default function WishlistSection({ items: initial }: Props) {
  const [list, setList] = useState(initial);

  function remove(id: string) {
    setList(list.filter((item) => item.id !== id));
  }

  if (list.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-700">❤️ Wishlist</h2>
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">🫶</div>
          <p className="font-medium">ยังไม่มีสินค้าที่ถูกใจ</p>
          <p className="text-sm mt-1">กดหัวใจบนสินค้าที่ชอบเพื่อบันทึกไว้ที่นี่</p>
          <a
            href="/Home/allitem"
            className="inline-block mt-4 px-6 py-2 bg-pink-400 text-white rounded-full text-sm hover:bg-pink-500 transition-colors"
          >
            ไปช้อปเลย 🛍️
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">❤️ Wishlist</h2>
        <span className="text-sm text-gray-400">{list.length} รายการ</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Product Image */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center h-28 text-5xl">
              {item.emoji}
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-1 flex-1">
              <span className="text-[10px] text-pink-400 bg-pink-50 px-2 py-0.5 rounded-full w-fit">
                {item.category}
              </span>
              <p className="text-sm font-medium text-gray-700 line-clamp-2">{item.name}</p>
              <p className="text-pink-500 font-bold text-sm mt-auto">฿{item.price.toLocaleString()}</p>
            </div>

            {/* Actions */}
            <div className="flex border-t border-pink-50">
              <button className="flex-1 py-2 text-xs text-white bg-pink-400 hover:bg-pink-500 transition-colors font-medium">
                🛒 ใส่ตะกร้า
              </button>
              <button
                onClick={() => remove(item.id)}
                className="px-3 py-2 text-xs text-red-400 hover:bg-red-50 border-l border-pink-100 transition-colors"
                title="ลบออกจาก Wishlist"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
