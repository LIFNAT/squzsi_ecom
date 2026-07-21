"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { Trash2, Heart, ShoppingBag, ArrowLeft } from "lucide-react";

interface Product {
    id: string;
    product_name: string; // ปรับให้ตรงกับ Database
    price: number;
    producy_image: string[] | string; // ปรับให้รองรับอาเรย์รูปภาพจาก Database
    description: string;
    category: string;
}

export default function Like() {
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedItems = localStorage.getItem("wishlist_items");

            if (storedItems) {
                const parsedItems: Product[] = JSON.parse(storedItems);
                setWishlistProducts(parsedItems);
            }
        } catch (error) {
            console.error("Error loading wishlist items:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleRemoveFromWishlist = (id: string, name: string) => {
        Swal.fire({
            title: "ลบออกจากรายการโปรด?",
            text: `คุณต้องการลบ "${name}" ออกจากรายการถูกใจใช่หรือไม่`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ec4899",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "ใช่, ลบเลย",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                const storedItems = localStorage.getItem("wishlist_items");
                if (storedItems) {
                    const items: Product[] = JSON.parse(storedItems);
                    const updatedItems = items.filter((item) => item.id !== id);
                    localStorage.setItem("wishlist_items", JSON.stringify(updatedItems));
                    setWishlistProducts(updatedItems);
                }

                const storedWishlist = localStorage.getItem("wishlist");
                if (storedWishlist) {
                    const ids: string[] = JSON.parse(storedWishlist);
                    const updatedIds = ids.filter((itemKey) => itemKey !== id);
                    localStorage.setItem("wishlist", JSON.stringify(updatedIds));
                }

                Swal.fire({
                    icon: "success",
                    title: "ลบสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-pink-100">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
                            <Heart className="w-6 h-6 fill-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900">สินค้าที่ถูกใจ</h1>
                            <p className="text-sm text-gray-500">รายการสินค้าที่คุณบันทึกไว้ ({wishlistProducts.length} รายการ)</p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-semibold text-pink-500 hover:text-pink-600 bg-pink-50 px-4 py-2 rounded-xl transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        กลับสู่หน้าหลัก
                    </Link>
                </div>

                {/* Content Section */}
                {wishlistProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-pink-50 text-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-10 h-10" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 mb-1">ยังไม่มีสินค้าที่ถูกใจ</h2>
                        <p className="text-sm text-gray-400 mb-6">คุณยังไม่ได้กดถูกใจสินค้าชิ้นไหน ลองเลือกดูสินค้าแล้วกดหัวใจเก็บไว้ได้เลย!</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-lg shadow-pink-200/70 hover:scale-[1.02] transition-all"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            เลือกซื้อสินค้าเลย
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlistProducts.map((product) => {
                            // ดึงรูปภาพแรกจากอาเรย์ producy_image
                            const imageUrl = Array.isArray(product.producy_image)
                                ? product.producy_image[0]
                                : product.producy_image;

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl border border-pink-100/60 shadow-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-lg hover:shadow-pink-100"
                                >
                                    <div>
                                        {/* Product Image */}
                                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                                            <Image
                                                src={imageUrl || "/placeholder.png"}
                                                alt={product.product_name || "Product"}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <button
                                                onClick={() => handleRemoveFromWishlist(product.id, product.product_name)}
                                                className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 shadow-md hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                                                title="ลบออกจากรายการโปรด"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-800 text-base line-clamp-1 mb-1 group-hover:text-pink-600 transition-colors">
                                                {product.product_name}
                                            </h3>
                                            <p className="text-pink-500 font-extrabold text-lg">
                                                ฿{Number(product.price || 0).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 pt-0">
                                        <Link
                                            href={`/aboutitem/${product.id}`}
                                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pink-50 text-pink-600 font-bold text-sm hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-400 hover:text-white transition-all shadow-xs"
                                        >
                                            ดูรายละเอียดสินค้า
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}