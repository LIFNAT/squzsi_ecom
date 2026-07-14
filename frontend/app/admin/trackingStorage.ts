// =====================
// trackingStorage.ts
// Storage สำหรับระบบติดตามสินค้า (Order Tracking) — จัดเก็บใน localStorage
// ออกแบบให้สามารถแทนที่ด้วยการเรียกใช้ Backend API ได้ง่ายในภายหลัง
// =====================

export type TrackingStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface TrackingOrder {
  id: string;            // รหัสคำสั่งซื้อ (เช่น ORD-2026070501)
  sku: string;           // รหัสสินค้า
  productName: string;   // ชื่อสินค้า
  productImage?: string; // รูปภาพสินค้า (ถ้ามี)
  customerName: string;  // ชื่อลูกค้า
  courier: string;       // ผู้ให้บริการขนส่ง (Flash Express, Kerry Express, etc.)
  trackingNo: string;    // เลขพัสดุ
  status: TrackingStatus;// สถานะปัจจุบัน
  updatedAt: string;     // วันเวลาที่อัปเดตล่าสุด (ISO String)
}

export const TRACKING_STORAGE_KEY = "squzsi_tracking_orders";

// โหลดรายการติดตามสินค้าจาก localStorage
export function loadTrackingOrders(): TrackingOrder[] {
  try {
    const raw = localStorage.getItem(TRACKING_STORAGE_KEY);
    if (!raw) return getMockTrackingOrders();
    const parsed = JSON.parse(raw) as TrackingOrder[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getMockTrackingOrders();
  } catch {
    return getMockTrackingOrders();
  }
}

// บันทึกรายการติดตามสินค้าลง localStorage
export function saveTrackingOrders(orders: TrackingOrder[]): void {
  try {
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    console.error("บันทึกข้อมูลการจัดส่งล้มเหลว");
  }
}

// ชุดข้อมูล Mock Data สำหรับใช้งานครั้งแรกเมื่อไม่มีข้อมูลใน localStorage
function getMockTrackingOrders(): TrackingOrder[] {
  const now = new Date();
  
  const getPastDate = (daysAgo: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString();
  };

  return [
    {
      id: "ORD-2026070501",
      sku: "SQZ-001",
      productName: "Strawberry Cream Squishy",
      customerName: "สมชาย รักดี",
      courier: "Flash Express",
      trackingNo: "TH014278XY9B",
      status: "shipped",
      updatedAt: getPastDate(1),
    },
    {
      id: "ORD-2026070502",
      sku: "PLU-002",
      productName: "Bunny Plushie XL",
      customerName: "กมลวรรณ ใจงาม",
      courier: "Kerry Express",
      trackingNo: "KEX901844005",
      status: "delivered",
      updatedAt: getPastDate(2),
    },
    {
      id: "ORD-2026070503",
      sku: "BLB-003",
      productName: "Mystery Blind Box Vol.3",
      customerName: "อนันต์ ทรัพย์มาก",
      courier: "Thailand Post",
      trackingNo: "ED849920155TH",
      status: "processing",
      updatedAt: getPastDate(0),
    },
    {
      id: "ORD-2026070504",
      sku: "ACC-004",
      productName: "Kawaii Star Hair Clips",
      customerName: "พิมพ์มาดา ดอกแก้ว",
      courier: "",
      trackingNo: "",
      status: "pending",
      updatedAt: getPastDate(3),
    },
    {
      id: "ORD-2026070505",
      sku: "GFT-005",
      productName: "Birthday Surprise Gift Set",
      customerName: "วิชัย เรียนดี",
      courier: "DHL Express",
      trackingNo: "DHL99837711",
      status: "shipped",
      updatedAt: getPastDate(0),
    },
    {
      id: "ORD-2026070506",
      sku: "SQZ-006",
      productName: "Avocado Squishy Toast",
      customerName: "สุดารัตน์ พุ่มพวง",
      courier: "",
      trackingNo: "",
      status: "cancelled",
      updatedAt: getPastDate(4),
    }
  ];
}
