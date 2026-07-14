import { propsstatetextadd } from "../page";
import { Field, inputClass } from "./Field";

interface propsPriceStock {
  statetextadd: propsstatetextadd
  setstatetextadd: React.Dispatch<React.SetStateAction<propsstatetextadd>>;
}
export default function PriceStock({ statetextadd, setstatetextadd }: propsPriceStock) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setstatetextadd(prve => ({
      ...prve,
      [name]: value
    }))
  }

  return (
    <section className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6 flex flex-col gap-5">
      <h2 className="text-base font-extrabold text-gray-700 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-xs">💰</span>
        ราคาและสต็อก
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* ราคาปกติ */}
        <Field label="ราคา (บาท)" >
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">
              ฿
            </span>
            <input
              type="number"
              placeholder="0.00"
              name="price"
              value={statetextadd.price || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`${inputClass()} pl-8`}
            />
          </div>
        </Field>

        {/* ราคาลด */}
        <Field label="ราคาลด (บาท)" hint="ไม่บังคับ">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">
              ฿
            </span>
            <input
              type="number"
              name="promotion"
              value={statetextadd.promotion || ''}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`${inputClass()} pl-8`}
            />
          </div>
        </Field>

        {/* จำนวนสต็อก */}
        <Field label="จำนวนสต็อก" >
          <input
            type="number"
            name="current_product"
            value={statetextadd.current_product || ""}
            onChange={handleChange}
            placeholder="0"
            min="0"
            className={`${inputClass()} pl-8`}
          />
        </Field>
      </div>
    </section>
  );
}
