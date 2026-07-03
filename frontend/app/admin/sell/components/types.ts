// =====================
// ประเภทข้อมูลและประเภททั่วไป
// =====================

// สถานะของสินค้า
export type ProductStatus = "active" | "draft" | "archived";

// ข้อมูลฟอร์มสินค้า
export interface FormData {
  name: string;
  category: string;
  description: string;
  price: string;
  discountPrice: string;
  stock: string;
  status: ProductStatus;
  tags: string;
}

// ข้อผิดพลาดของฟอร์ม
export interface FormErrors {
  name?: string;
  category?: string;
  description?: string;
  price?: string;
  stock?: string;
  images?: string;
}
