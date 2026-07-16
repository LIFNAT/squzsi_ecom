"use client";
import Link from "next/link";
import ProductInfo from "./components/ProductInfo";
import PriceStock from "./components/PriceStock";
import ImageUpload from "./components/ImageUpload";
import { useState } from "react";
import axios from 'axios'
import { post } from "@/app/post";

export interface propsstatetextadd {
  product_name: string
  category: string
  description: string
  price: number
  promotion: number
  current_product: number
  producy_image: {
    thumbnail: string
    gallery: string[]
  }
}

export default function AdminSellPage() {

  const [imageFile, setImageFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const [statetextadd, setstatetextadd] = useState<propsstatetextadd>({
    product_name: '',
    category: '',
    description: '',
    price: 0,
    promotion: 0,
    current_product: 0,
    producy_image: {
      thumbnail: "",
      gallery: []
    }
  })

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("product_name", statetextadd.product_name);
      formData.append("category", statetextadd.category);
      formData.append("description", statetextadd.description);
      formData.append("price", String(statetextadd.price));
      formData.append("promotion", String(statetextadd.promotion));
      formData.append(
        "current_product",
        String(statetextadd.current_product)
      );

      imageFile.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post(
        `${post}/addproduct`,
        formData
      );

      setstatetextadd({
        product_name: "",
        category: "",
        description: "",
        price: 0,
        promotion: 0,
        current_product: 0,
        producy_image: {
          thumbnail: "",
          gallery: [],
        },
      });

      setImageFile([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8FB] py-10 px-4 sm:px-6">
      {/* วงกลมตกแต่งข้างหลัง */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* ส่วนหัวข้อและ Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Link
              href="/"
              className="hover:text-pink-400 transition-colors duration-200"
            >
              หน้าหลัก
            </Link>
            <span>/</span>
            <Link
              href="/admin"
              className="hover:text-pink-400 transition-colors duration-200"
            >
              แอดมิน
            </Link>
            <span>/</span>
            <Link
              href="/admin/stock"
              className="hover:text-pink-400 transition-colors duration-200"
            >
              จัดการสต็อก
            </Link>
            <span>/</span>
            <span className="text-pink-400 font-semibold">
              {/* {productId ? "แก้ไขสินค้า" : "เพิ่มสินค้า"} */}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-sm">
              🧸
            </div>
            <div>
            </div>
          </div>
        </div>


        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-5">

            <ProductInfo
              statetextadd={statetextadd}
              setstatetextadd={setstatetextadd}
            />
            <PriceStock
              statetextadd={statetextadd}
              setstatetextadd={setstatetextadd}
            />
            <ImageUpload
              statetextadd={statetextadd}
              setstatetextadd={setstatetextadd}
              imageFiles={imageFile}
              setImageFiles={setImageFile}
            />
            {/* ส่วนควบคุม: ปุ่มยกเลิกและบันทึก */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pb-4">
              <Link
                href="/admin/stock"
                className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-pink-200 text-pink-500 font-semibold text-sm text-center hover:bg-pink-50 hover:border-pink-400 active:scale-95 transition-all duration-200"
              >
                ยกเลิก
              </Link>

              {/* ปุ่มบันทึก */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200"
              >
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
