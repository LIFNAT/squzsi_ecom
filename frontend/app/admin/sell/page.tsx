"use client";

import { useState, useRef, useCallback , useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// นำเข้าคอมโพเนนต์ย่อยและประเภทข้อมูล
import { FormData, FormErrors, ProductStatus } from "./components/types";
import ProductInfo from "./components/ProductInfo";
import PriceStock from "./components/PriceStock";
import ImageUpload from "./components/ImageUpload";
import ProductStatusTags from "./components/ProductStatusTags";
// นำเข้า storage functions ที่ใช้ร่วมกับ stock page
import { loadProducts, saveProducts, generateId, generateSku } from "../productStorage";
import { Product } from "../stock/types";
import { useSearchParams } from "next/navigation";





// =====================
// ค่าเริ่มต้นของฟอร์ม
// =====================

const INITIAL_FORM: FormData = {
  name: "",
  category: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  status: "draft",
  tags: "",
};

// =====================
// หน้าหลัก (Admin Product Create Page)
// =====================

export default function AdminSellPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  
  useEffect(() => {
  if (productId) {
    const products = loadProducts();
    const existingProduct = products.find(p => p.id === productId);
    
    if (existingProduct) {
      // 1. นำข้อมูลเก่าไปเซ็ตที่ State 'form'
      setForm({
        name: existingProduct.name,
        category: existingProduct.category,
        description: existingProduct.description,
        price: existingProduct.price.toString(), // แปลงเป็น String เพราะ input รับค่า String
        discountPrice: existingProduct.discountPrice ? existingProduct.discountPrice.toString() : "",
        stock: existingProduct.stock.toString(),
        status: existingProduct.status as ProductStatus, // ต้อง cast ให้ตรงกับ Type
        tags: existingProduct.tags || "",
      });

      // 2. นำรูปภาพเก่า (base64) ไปใส่ใน State 'imagePreviews'
      // (สมมติว่า existingProduct.images เป็น Array ของ base64 strings)
      if (existingProduct.images) {
        setImagePreviews(existingProduct.images);
        // (ถ้าต้องการให้แก้ไขรูปได้ใหม่ ต้องแปลง base64 กลับเป็น File Object
        // แต่นั่นจะซับซ้อนไปหน่อย เบื้องต้นแสดงรูปได้ก่อน)
      }
    } else {
      // ถ้าไม่พบสินค้า ให้ Redirect กลับ หรือ Reset Form
      router.push("/admin/sell");
    }
  }
}, [productId, router]);

  // =====================
  // จัดการการเปลี่ยนแปลงฟอร์ม
  // =====================

  // อัพเดตฟอร์มเมื่อมีการพิมพ์
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // ลบข้อผิดพลาดออกเมื่อผู้ใช้เริ่มป้อนข้อมูลใหม่
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // จัดการเปลี่ยนสถานะของสินค้า
  const handleStatusChange = (status: ProductStatus) => {
    setForm((prev) => ({ ...prev, status }));
  };

  // =====================
  // จัดการรูปภาพ
  // =====================

  // เพิ่มไฟล์รูปภาพและจัดเก็บ preview url
  const addImages = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/"),
      );
      if (validFiles.length === 0) return;

      // จำกัดจำนวนรูปภาพไม่เกิน 5 รูป
      const remaining = 5 - imagePreviews.length;
      const toAdd = validFiles.slice(0, remaining);

      const newPreviews = toAdd.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...toAdd]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      // ลบข้อผิดพลาดเมื่อผู้ใช้อัพโหลดรูปภาพแล้ว
      setErrors((prev) => ({ ...prev, images: undefined }));
    },
    [imagePreviews.length],
  );

  // ลบรูปภาพที่เลือก
  const removeImage = (index: number) => {
    const targetPreview = imagePreviews[index];

    if (targetPreview.startsWith("blob:")) {
      setImages((prev) => {
        let fileIndex = 0;
        for (let i = 0; i < index; i++) {
          if (imagePreviews[i].startsWith("blob:")) {
            fileIndex++;
          }
        }
        return prev.filter((_, i) => i !== fileIndex);
      });
    }

    URL.revokeObjectURL(targetPreview);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // การลากไฟล์เข้ามาวาง
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // การลากไฟล์ออกจากโซน
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // วางไฟล์ที่ลากลงมา
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addImages(e.dataTransfer.files);
  };

  // =====================
  // การตรวจสอบข้อมูล (Validation)
  // =====================

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "กรุณากรอกชื่อสินค้า";
    if (!form.category) newErrors.category = "กรุณาเลือกหมวดหมู่";
    if (!form.description.trim())
      newErrors.description = "กรุณากรอกคำอธิบายสินค้า";
    if (!form.price || parseFloat(form.price) <= 0)
      newErrors.price = "กรุณากรอกราคาที่ถูกต้อง";
    if (!form.stock || parseInt(form.stock) < 0)
      newErrors.stock = "กรุณากรอกจำนวนสต็อก";
    if (imagePreviews.length === 0)
      newErrors.images = "กรุณาอัพโหลดรูปภาพอย่างน้อย 1 รูป";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =====================
  // การบันทึกฟอร์มสินค้า
  // =====================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // 1. แยกดึงเอาเฉพาะรูปภาพเดิมที่เริ่มด้วย "data:" (เพราะเป็น base64 อยู่แล้ว) จาก imagePreviews
      const existingBase64s = imagePreviews.filter((src) => src.startsWith("data:"));

      // 2. แปลงเฉพาะรูปภาพที่อัพโหลดใหม่ (images) ให้กลายเป็น base64
      const newImageBase64s = await Promise.all(
        images.map(
          (file) =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            })
        )
      );

      // 3. รวมรูปภาพทั้งหมดเข้าด้วยกัน
      const finalImages = [...existingBase64s, ...newImageBase64s];

      const now = new Date().toISOString();
      const existing = loadProducts();

      if (productId) {
        // --- กรณีที่ 1: เป็นการแก้ไขสินค้าเดิม ---
        const updatedProducts = existing.map((p) => {
          if (p.id === productId) {
            return {
              ...p,
              name: form.name.trim(),
              category: form.category,
              description: form.description.trim(),
              price: parseFloat(form.price),
              discountPrice: form.discountPrice ? parseFloat(form.discountPrice) : 0,
              images: finalImages, // อัปเดตรูปทั้งหมดลงไป
              stock: parseInt(form.stock) || 0,
              status: form.status,
              updatedAt: now,
            };
          }
          return p;
        });
        saveProducts(updatedProducts);
      } else {
        // --- กรณีที่ 2: เป็นการเพิ่มสินค้าใหม่ ---
        const newProduct: Product = {
          id: generateId(),
          name: form.name.trim(),
          sku: generateSku(form.name),
          category: form.category,
          description: form.description.trim(),
          price: parseFloat(form.price),
          discountPrice: form.discountPrice ? parseFloat(form.discountPrice) : 0,
          images: finalImages,
          stock: parseInt(form.stock) || 0,
          reservedStock: 0,
          status: form.status,
          createdAt: now,
          updatedAt: now,
        };
        saveProducts([...existing, newProduct]);
      }

      // กลับไปหน้าจัดการสต็อกหลังบันทึกสำเร็จ
      router.push("/admin/stock");
    } catch (error) {
      console.error("บันทึกสินค้าไม่สำเร็จ:", error);
      setIsLoading(false);
    }
  };

  // =====================
  // การแสดงผลหน้าจอ (Render)
  // =====================

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
              {productId ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-sm">
              🧸
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">
                {productId ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่"}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {productId
                  ? "แก้ไขรายละเอียดข้อมูลสินค้าที่ต้องการปรับปรุง"
                  : "กรอกข้อมูลสินค้าที่ต้องการเพิ่มเข้าร้าน"}
              </p>
            </div>
          </div>
        </div>

        {/* isLoading banner — แสดงขณะกำลังบันทึกและ redirect */}
        {isLoading && (
          <div className="mb-6 flex items-center gap-3 px-5 py-3.5 bg-pink-50 border border-pink-200 rounded-2xl text-pink-600 text-sm font-semibold animate-fade-in-up">
            <span className="text-lg">⏳</span>
            กำลังบันทึกสินค้า...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-5">
            {/* ส่วนที่ 1: ข้อมูลสินค้า */}
            <ProductInfo
              form={form}
              errors={errors}
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* ส่วนที่ 2: ราคาและสต็อก */}
            <PriceStock
              form={form}
              errors={errors}
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* ส่วนที่ 3: อัพโหลดรูปภาพ */}
            <ImageUpload
              images={images}
              imagePreviews={imagePreviews}
              errors={errors}
              isDragging={isDragging}
              disabled={isLoading}
              fileInputRef={fileInputRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileChange={(e) => addImages(e.target.files)}
              onRemoveImage={removeImage}
            />

            {/* ส่วนที่ 4: สถานะสินค้าและแท็ก */}
            <ProductStatusTags
              status={form.status}
              tags={form.tags}
              onChange={handleChange}
              onStatusChange={handleStatusChange}
              disabled={isLoading}
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
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    {/* Spinner */}
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    กำลังบันทึก...
                  </span>
                ) : (
                  productId ? "💾 บันทึกการแก้ไข" : "💾 บันทึกสินค้า"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
