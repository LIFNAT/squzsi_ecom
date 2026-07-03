// =====================
// productStorage.ts
// Storage สินค้า — ใช้ร่วมกันระหว่าง sell และ stock page
// เปลี่ยนเป็น API ได้ในอนาคต โดยแก้เฉพาะไฟล์นี้
// =====================

import { Product } from "./stock/types";

export const STORAGE_KEY = "squzsi_products";

// โหลดสินค้าจาก localStorage → คืนค่า Product[] ให้ UI (ยังไม่มี API)
export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getMockProducts();
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getMockProducts();
  } catch {
    return getMockProducts();
  }
}

// บันทึกสินค้าลง localStorage → เก็บชั่วคราวก่อนเชื่อม API
export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    console.error("บันทึกข้อมูลสต็อกไม่สำเร็จ");
  }
}

// สร้าง ID อย่างง่าย (เปลี่ยนเป็น UUID จาก backend เมื่อเชื่อม API)
export function generateId(): string {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// สร้าง SKU จากชื่อสินค้า (backend อาจ generate เองในอนาคต)
export function generateSku(name: string): string {
  const prefix = name.replace(/\s+/g, "").slice(0, 3).toUpperCase() || "PRD";
  const num = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${num}`;
}

// =====================
// Seed Data — โหลดเมื่อ localStorage ว่างเปล่า
// =====================

function getMockProducts(): Product[] {
  const now = new Date().toISOString();
  return [
    {
      id: "p1",
      name: "Strawberry Cream Squishy",
      sku: "SQZ-001",
      category: "Squishies",
      description: "สกุชชี่สตรอว์เบอร์รี่นุ่มหอม",
      price: 299,
      discountPrice: 249,
      images: [],
      stock: 45,
      reservedStock: 5,
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "p2",
      name: "Bunny Plushie XL",
      sku: "PLU-002",
      category: "Plushies",
      description: "ตุ๊กตากระต่ายนุ่มใหญ่",
      price: 599,
      discountPrice: 0,
      images: [],
      stock: 8,
      reservedStock: 2,
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "p3",
      name: "Mystery Blind Box Vol.3",
      sku: "BLB-003",
      category: "Blind Box",
      description: "กล่องสุ่มสินค้า Limited Edition",
      price: 399,
      discountPrice: 0,
      images: [],
      stock: 0,
      reservedStock: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "p4",
      name: "Kawaii Star Hair Clips",
      sku: "ACC-004",
      category: "Cute Accessories",
      description: "กิ๊บติดผมดาวน่ารัก",
      price: 149,
      discountPrice: 99,
      images: [],
      stock: 3,
      reservedStock: 1,
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "p5",
      name: "Birthday Surprise Gift Set",
      sku: "GFT-005",
      category: "Gift Sets",
      description: "เซ็ตของขวัญวันเกิดสุดน่ารัก",
      price: 899,
      discountPrice: 799,
      images: [],
      stock: 20,
      reservedStock: 3,
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "p6",
      name: "Avocado Squishy Toast",
      sku: "SQZ-006",
      category: "Squishies",
      description: "สกุชชี่อโวคาโดขนมปัง",
      price: 259,
      discountPrice: 0,
      images: [],
      stock: 15,
      reservedStock: 0,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    },
  ];
}
