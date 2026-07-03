"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

// ข้อมูลสินค้าครบทุกตัวจากหน้าแรก
const products = [
  {
    id: "beetroot",
    name: "Beetroot",
    sub: "(Local shop)",
    weight: "500 gm.",
    priceWhole: "17",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "บีตรูตสดใหม่จากสวนท้องถิ่น คัดสรรคุณภาพอย่างดี ปลอดสารเคมี 100% เหมาะสำหรับนำไปทำน้ำผักผลไม้สกัดเย็น หรือประกอบอาหารเพื่อสุขภาพ"
  },
  {
    id: "avocado",
    name: "Italian Avocado",
    sub: "(Local shop)",
    weight: "500 gm.",
    priceWhole: "12",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "อโวคาโดนำเข้าจากอิตาลี เนื้อเนียนนุ่ม หอมมัน อุดมไปด้วยไขมันดีและวิตามินที่มีประโยชน์ต่อร่างกาย"
  },
  {
    id: "naan",
    name: "Szam amm",
    sub: "(Process food)",
    weight: "500 gm.",
    priceWhole: "14",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "แป้งนานเนื้อนุ่ม อบสดใหม่สไตล์ดั้งเดิม ทานคู่กับแกงหรือเมนูโปรดได้อย่างลงตัว"
  },
  {
    id: "beef",
    name: "Beef Mixed",
    sub: "(Cut Bone)",
    weight: "600 gm.",
    priceWhole: "16",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "เนื้อวัวผสมส่วนกระดูก คัดสรรเนื้อส่วนที่ดี เหมาะสำหรับนำไปตุ๋นทำซุปเข้มข้นหรือสตูว์"
  },
  {
    id: "sprite",
    name: "Cold drinks",
    sub: "(Sprite)",
    weight: "500 gm.",
    priceWhole: "18",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "เครื่องดื่มอัดลมเย็นชื่นใจ รสมะนาวสุดซ่า ช่วยเติมความสดชื่นและดับกระหายได้ทุกช่วงเวลา"
  },
  {
    id: "plant-hunter",
    name: "Plant Hunter",
    sub: "(Frozen pack)",
    weight: "500 gm.",
    priceWhole: "20",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "อาหารแพลนต์เบสแช่แข็งสำเร็จรูป โปรตีนจากพืชคุณภาพสูง ปลอดภัยและดีต่อสุขภาพ"
  },
  {
    id: "carrot",
    name: "Deshi Gajor",
    sub: "(Local Carrot)",
    weight: "500 gm.",
    priceWhole: "19",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "แครอทท้องถิ่นสดหวาน เนื้อกรอบ อุดมไปด้วยเบต้าแคโรทีนและสารอาหารที่มีประโยชน์"
  },
  {
    id: "cucumber",
    name: "Deshi Shosha",
    sub: "(Local Cucumber)",
    weight: "500 gm.",
    priceWhole: "04",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "แตงกวาท้องถิ่นสดฉ่ำน้ำ เนื้อกรอบอร่อย ทานสดเป็นเครื่องเคียงหรือใส่ในสลัดผัก"
  },
  {
    id: "chips",
    name: "Lays chips",
    sub: "(Bacon)",
    weight: "500 gm.",
    priceWhole: "21",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "มันฝรั่งทอดกรอบแผ่นเรียบรสเบคอน หอมกรุ่นกลิ่นรมควัน อร่อยเข้มข้นเต็มรสชาติ"
  },
  {
    id: "cabbage",
    name: "Badhakopi",
    sub: "(Local Cabbage)",
    weight: "500 gm.",
    priceWhole: "09",
    priceDecimal: "29",
    emoji: "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description: "กะหล่ำปลีสดหัวแน่นจากสวน ปลูกแบบธรรมชาติ หวานกรอบ เหมาะสำหรับผัดหรือทานสด"
  },
];

export default function AboutItem() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  // ค้นหาสินค้าตาม ID ที่ส่งมาจาก URL
  const product = products.find((p) => p.id === productId);

  // ถ้าหาสินค้าไม่เจอ ให้แสดงหน้าจอแจ้งเตือนไม่พบสินค้า แทนหน้าขาว
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">ไม่พบข้อมูลสินค้านี้</h2>
        <p className="text-sm text-gray-400 mb-6">ลิงก์อาจไม่ถูกต้องหรือไม่มีสินค้าชิ้นนี้ในระบบ</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-emerald-600 text-white font-medium text-sm rounded-full hover:bg-emerald-700 transition-colors shadow-sm"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen bg-gray-50">
      {/* ปุ่มย้อนกลับ */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors font-medium"
      >
        <ChevronLeft size={20} />
        ย้อนกลับ
      </button>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-8 items-start">
        {/* ฝั่งซ้าย: รูปภาพสินค้า */}
        <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <Image
            src={product.emoji}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ฝั่งขวา: รายละเอียดสินค้า */}
        <div className="flex flex-col h-full justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              {product.sub}
            </span>
            
            <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-1">
              {product.name}
            </h1>
            
            <p className="text-sm text-gray-400 mb-4">น้ำหนักสุทธิ: {product.weight}</p>

            {/* ราคา */}
            <div className="text-3xl font-black text-emerald-600 mb-6 flex items-start">
              <span>{product.priceWhole}</span>
              <span className="text-lg font-bold">.{product.priceDecimal}$</span>
            </div>

            <hr className="border-gray-100 my-4" />

            {/* คำอธิบายสินค้า */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">รายละเอียดสินค้า</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description || "ราคาเป็นมิตร และปลอดภัย ไม่มีสารเคมี สินค้าคุณภาพคัดเกรดพิเศษจาก SquishyLand เริ่ดมากกกกกกกกกกกก"}
              </p>
            </div>

            {/* ข้อมูลการรับประกันย่อยๆ */}
            <div className="space-y-2.5 mb-8">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>ปลอดภัย 100% ผ่านการตรวจสารเคมีตกค้าง</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Truck size={16} className="text-emerald-500" />
                <span>จัดส่งด่วนภายใน 1-2 วันทำการ</span>
              </div>
            </div>
          </div>

          {/* ปุ่ม Action */}
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-100">
            <ShoppingCart size={18} />
            เพิ่มลงตะกร้าสินค้า
          </button>
        </div>
      </div>
    </div>
  );
}