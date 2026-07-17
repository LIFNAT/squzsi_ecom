export default function Control() {
  const orders = [
    {
      id: "#ORD-001",
      customer: "Beer",
      total: "฿1,250",
      status: "Pending",
    },
    {
      id: "#ORD-002",
      customer: "John",
      total: "฿890",
      status: "Completed",
    },
    {
      id: "#ORD-003",
      customer: "Emma",
      total: "฿2,100",
      status: "Shipping",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pink-500">
            📦 Order Management
          </h1>
          <p className="text-gray-500 mt-1">
            จัดการคำสั่งซื้อทั้งหมดของร้าน
          </p>
        </div>

        <button className="rounded-xl bg-pink-500 px-5 py-3 text-white font-medium shadow-lg shadow-pink-200 hover:bg-pink-600 transition">
          + New Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="rounded-2xl bg-white border border-pink-100 p-5 shadow-sm">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-500">12</h2>
        </div>

        <div className="rounded-2xl bg-white border border-pink-100 p-5 shadow-sm">
          <p className="text-gray-500">Shipping</p>
          <h2 className="text-3xl font-bold text-blue-500">8</h2>
        </div>

        <div className="rounded-2xl bg-white border border-pink-100 p-5 shadow-sm">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold text-green-500">45</h2>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
        <div className="border-b border-pink-100 bg-pink-50 px-6 py-4">
          <h2 className="font-semibold text-pink-500">
            รายการคำสั่งซื้อ
          </h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-pink-50 transition"
              >
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.total}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Shipping"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}