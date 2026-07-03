// =====================
// ประเภทข้อมูลและค่าคงที่สำหรับหน้าจัดการสต็อก
// =====================

// สถานะสต็อก — คำนวณอัตโนมัติจากตัวเลข ไม่ได้เก็บใน DB
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "hidden";

// สถานะการแสดงผลสินค้า
export type ProductStatus = "active" | "draft" | "archived";

// โมเดลสินค้าหลัก
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  discountPrice: number;
  images: string[];       // URL หรือ base64 (ชั่วคราวก่อนเชื่อม API)
  stock: number;
  reservedStock: number;  // สต็อกที่ถูกจองไว้ (เช่น คำสั่งซื้อที่ยังไม่จัดส่ง)
  status: ProductStatus;
  createdAt: string;      // ISO date string
  updatedAt: string;      // ISO date string
}

// =====================
// ค่าคงที่ที่ใช้ร่วมกันระหว่าง components
// =====================

export const LOW_STOCK_THRESHOLD = 10;

export const CATEGORIES = [
  "Squishies",
  "Plushies",
  "Blind Box",
  "Cute Accessories",
  "Gift Sets",
];

export const SORT_OPTIONS = [
  { value: "name_asc", label: "ชื่อ A → Z" },
  { value: "name_desc", label: "ชื่อ Z → A" },
  { value: "stock_asc", label: "สต็อก น้อย → มาก" },
  { value: "stock_desc", label: "สต็อก มาก → น้อย" },
  { value: "updated_desc", label: "อัปเดตล่าสุด" },
];

// คำนวณสถานะสต็อกจากข้อมูลสินค้า (ไม่ได้เก็บใน localStorage)
export function getStockStatus(p: Product): StockStatus {
  if (p.status !== "active") return "hidden";
  const available = p.stock - p.reservedStock;
  if (available <= 0) return "out_of_stock";
  if (available <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}
