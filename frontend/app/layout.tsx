import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCircles from "./components/FloatingCircles";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FFF8FB]">
        <Navbar /> {children} <FloatingCircles /> <Footer />
      </body>
    </html>
  );
}
