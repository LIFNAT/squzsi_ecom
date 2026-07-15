import type { Metadata } from "next";
import { Kanit } from "next/font/google"; // 1. เปลี่ยนจาก Itim เป็น Kanit
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCircles from "./components/FloatingCircles";

// 1. ตั้งค่าฟอนต์
const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: "600",
  display: "swap",
  variable: "--font-itim", // กำหนดตัวแปร CSS สำหรับเรียกใช้
});

export const metadata: Metadata = {
  title: "SquishyLand – Kawaii Squishies, Plushies & Cute Toys",
  description:
    "Shop the cutest squishies, plushies, blind boxes, and kawaii accessories at SquishyLand. Free shipping on orders over $30. Discover your new favourite cute toy today!",
  keywords: [
    "squishies",
    "kawaii",
    "plushies",
    "blind box",
    "cute toys",
    "kawaii accessories",
  ],
  openGraph: {
    title: "SquishyLand – Kawaii Squishies, Plushies & Cute Toys",
    description:
      "Discover adorable squishies and kawaii toys that brighten your day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. นำ class ของฟอนต์มาใส่ที่ html เพื่อให้มีผลทั้งเว็บ
    <html lang="en" className={`h-full antialiased ${kanit.variable} font-sans`}>
      <body className={`min-h-full flex flex-col bg-[#FFF8FB] ${kanit.className}`}>
        <Navbar /> 
        <main className="flex-grow">
          {children}
        </main>
        <FloatingCircles /> 
        <Footer />
      </body>
    </html>
  );
}