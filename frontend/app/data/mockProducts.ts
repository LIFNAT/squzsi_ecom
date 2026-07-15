export type CategoryItem = {
  name: string;
  sub: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  sub: string;
  weight: string;
  priceWhole: string;
  emoji: string;
  description: string;
  category: string;
};

export const categories: CategoryItem[] = [
  { name: "Vegetable", sub: "Local market", emoji: "🥦" },
  { name: "Snacks & Breads", sub: "Sri-khen chimney", emoji: "🥖" },
  { name: "Fruits", sub: "Central line", emoji: "🍎" },
  { name: "Chicken legs", sub: "Imported Meat", emoji: "🍗" },
  { name: "Milk & Dairy", sub: "Preserved food", emoji: "🥛" },
];

export const products: Product[] = [
  {
    id: "beetroot",
    name: "Beetroot",
    sub: "(Local shop)",
    weight: "500 gm.",
    priceWhole: "17",
    
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "บีตรูตสดใหม่จากสวนท้องถิ่น คัดสรรคุณภาพอย่างดี ปลอดสารเคมี 100% เหมาะสำหรับทำน้ำผักและประกอบอาหารเพื่อสุขภาพ",
    category: "Vegetable",
  },
  {
    id: "avocado",
    name: "Italian Avocado",
    sub: "(Local shop)",
    weight: "500 gm.",
    priceWhole: "12",
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "อโวคาโดนำเข้าจากอิตาลี เนื้อเนียนนุ่ม หอมมัน อุดมไปด้วยไขมันดีและวิตามินที่มีประโยชน์ต่อร่างกาย",
    category: "Fruits",
  },
  {
    id: "naan",
    name: "Szam amm",
    sub: "(Process food)",
    weight: "500 gm.",
    priceWhole: "14",
   
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "แป้งนานเนื้อนุ่ม อบสดใหม่สไตล์ดั้งเดิม ทานคู่กับแกงหรือเมนูโปรดได้อย่างลงตัว",
    category: "Snacks & Breads",
  },
  {
    id: "beef",
    name: "Beef Mixed",
    sub: "(Cut Bone)",
    weight: "600 gm.",
    priceWhole: "16",
    
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "เนื้อวัวผสมส่วนกระดูก คัดสรรเนื้อส่วนที่ดี เหมาะสำหรับตุ๋นทำซุปหรือสตูว์",
    category: "Chicken legs",
  },
  {
    id: "sprite",
    name: "Cold drinks",
    sub: "(Sprite)",
    weight: "500 gm.",
    priceWhole: "18",
   
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "เครื่องดื่มอัดลมเย็นชื่นใจ รสมะนาวสุดซ่า ช่วยเติมความสดชื่นและดับกระหายได้ทุกช่วงเวลา",
    category: "Milk & Dairy",
  },
  {
    id: "plant-hunter",
    name: "Plant Hunter",
    sub: "(Frozen pack)",
    weight: "500 gm.",
    priceWhole: "20",
    
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "อาหารแพลนต์เบสแช่แข็งสำเร็จรูป โปรตีนจากพืชคุณภาพสูง ปลอดภัยและดีต่อสุขภาพ",
    category: "Vegetable",
  },
  {
    id: "carrot",
    name: "Deshi Gajor",
    sub: "(Local Carrot)",
    weight: "500 gm.",
    priceWhole: "19",
    
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "แครอทท้องถิ่นสดหวาน เนื้อกรอบ อุดมไปด้วยเบต้าแคโรทีนและสารอาหารที่มีประโยชน์",
    category: "Vegetable",
  },
  {
    id: "cucumber",
    name: "Deshi Shosha",
    sub: "(Local Cucumber)",
    weight: "500 gm.",
    priceWhole: "04",
    
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "แตงกวาท้องถิ่นสดฉ่ำน้ำ เนื้อกรอบอร่อย ทานสดเป็นเครื่องเคียงหรือใส่ในสลัดผัก",
    category: "Vegetable",
  },
  {
    id: "chips",
    name: "Lays chips",
    sub: "(Bacon)",
    weight: "500 gm.",
    priceWhole: "21",
    
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "มันฝรั่งทอดกรอบแผ่นเรียบรสเบคอน หอมกรุ่นกลิ่นรมควัน อร่อยเข้มข้นเต็มรสชาติ",
    category: "Snacks & Breads",
  },
  {
    id: "cabbage",
    name: "Badhakopi",
    sub: "(Local Cabbage)",
    weight: "500 gm.",
    priceWhole: "09",
    
    emoji:
      "https://yfpbrdnvnrfggyocnqqa.supabase.co/storage/v1/object/public/productSquishy/tcet.webp",
    description:
      "กะหล่ำปลีสดหัวแน่นจากสวน ปลูกแบบธรรมชาติ หวานกรอบ เหมาะสำหรับผัดหรือทานสด",
    category: "Vegetable",
  },
];

export function getProductById(productId: string | string[] | undefined) {
  if (typeof productId !== "string") {
    return undefined;
  }

  return products.find((product) => product.id === productId);
}
