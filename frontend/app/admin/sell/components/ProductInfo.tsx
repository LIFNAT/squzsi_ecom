
import { propsstatetextadd } from "../page";
import { Field, inputClass } from "./Field";

interface propsProductInfo {
  statetextadd: propsstatetextadd
  setstatetextadd: React.Dispatch<React.SetStateAction<propsstatetextadd>>;
}

export default function ProductInfo({ statetextadd, setstatetextadd }: propsProductInfo) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setstatetextadd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const optionProduct = [
    { title: 'Vegetable' },
    { title: 'Snacks & Breads' },
    { title: 'Fruits' },
    { title: 'Cute Accessories' },
  ]

  return (
    <section className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6 flex flex-col gap-5">
      <h2 className="text-base font-extrabold text-gray-700 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-xs">📝</span>
        ข้อมูลสินค้า
      </h2>

      <Field label="ชื่อสินค้า" >
        <input
          type="text"
          name="product_name"
          value={statetextadd.product_name}
          onChange={handleChange} // ใส่ฟังก์ชันดักการเลือก
          placeholder="เช่น Strawberry Cream Squishy"
          className={inputClass()}
        // disabled={disabled}
        />
      </Field>

      <Field label="หมวดหมู่"  >
        <select
          className={inputClass()}
          name="category"
          value={statetextadd.category}
          onChange={handleChange}
        >
          <option value="">เลือกหมวดหมู่...</option>

          {optionProduct.map((e, i) => (
            <option key={i} value={e.title}>
              {e.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="คำอธิบายสินค้า">
        <textarea
          id="product-description"
          name="description"
          value={statetextadd.description} // ผูกค่าเข้ากับ State
          onChange={handleChange} // ใส่ฟังก์ชันดักการเลือก
          rows={4}
          placeholder="อธิบายรายละเอียดสินค้า เนื้อหา ขนาด วัสดุ ฯลฯ"
          className={inputClass()}
        // disabled={disabled}
        />
      </Field>
    </section>
  );
}
