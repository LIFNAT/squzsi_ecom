import { propsgetProduct } from "../page";

interface propsStockTable {
  response: propsgetProduct[];
}

export default function StockTable({ response }: propsStockTable) {
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full min-w-[800px] text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-400 border-b border-pink-50">
            <th className="pb-3 pr-4 w-12">รูป</th>
            <th className="pb-3 pl-3">ชื่อสินค้า / SKU</th>
            <th className="pb-3 pr-4">หมวดหมู่</th>
            <th className="pb-3 pr-4 text-right">ราคา</th>
            <th className="pb-3 pr-4 text-center">สต็อก</th>
            <th className="pb-3 pr-4 text-center">จอง</th>
            <th className="pb-3 pr-4 text-center">คงเหลือ</th>
            <th className="pb-3 pr-4">สถานะ</th>
            <th className="pb-3 pr-4 text-center">อัปเดตล่าสุด</th>
            <th className="pb-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {response.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          ).map((item) => {

            const stock = Number(item.current_product ?? 0);

            return (
              <tr
                key={item.id}
                className="border-b border-pink-50 hover:bg-gray-50"
              >
                <td className="py-2 pr-4">
                  <img
                    src={item.producy_image?.[0] || "/no-image.png"}
                    alt={item.product_name || "product"}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                </td>

                <td className="py-2  pl-3">
                  <div className="font-medium">
                    {item.product_name || "-"}
                  </div>
                </td>

                <td className="py-2 pr-4">
                  {item.category || "-"}
                </td>

                <td className="py-2 pr-4 text-right">
                  {Number(item.price ?? 0).toLocaleString()}
                </td>

                <td className="py-2 pr-4 text-center">
                  {stock.toLocaleString()}
                </td>

                <td className="py-2 pr-4 text-center">
                  -
                </td>

                <td className="py-2 pr-4 text-center">
                  -
                </td>

                <td className="py-2 pr-4">
                  {item?.status || "พร้อมจัดส่ง"}
                </td>

                <td className="py-2 pr-4 text-center">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString("th-TH")
                    : "-"}
                </td>

                <td className="py-2 text-right">
                  <button className="px-4 py-2 bg-pink-400 rounded-2xl text-xs   text-white">
                    แก้ไข
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}