"use client";

import { useState } from "react";

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

interface Props {
  addresses: Address[];
}

const emptyForm = { label: "", name: "", phone: "", address: "" };

export default function AddressSection({ addresses: initial }: Props) {
  const [list, setList] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form, setForm] = useState(emptyForm);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(addr: Address) {
    setEditing(addr);
    setForm({ label: addr.label, name: addr.name, phone: addr.phone, address: addr.address });
    setShowModal(true);
  }

  function saveForm() {
    if (!form.name || !form.address) return;
    if (editing) {
      setList(list.map((a) => a.id === editing.id ? { ...editing, ...form } : a));
    } else {
      setList([...list, { id: Date.now().toString(), ...form, isDefault: false }]);
    }
    setShowModal(false);
  }

  function setDefault(id: string) {
    setList(list.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  function remove(id: string) {
    setList(list.filter((a) => a.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">📍 ที่อยู่จัดส่ง</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-pink-400 text-white text-sm rounded-full hover:bg-pink-500 transition-colors"
        >
          + เพิ่มที่อยู่
        </button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🏠</div>
          <p>ยังไม่มีที่อยู่ที่บันทึกไว้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {list.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white rounded-2xl border p-4 shadow-sm relative flex flex-col gap-2 transition-all duration-200 ${
                addr.isDefault ? "border-pink-300 ring-1 ring-pink-200" : "border-pink-100"
              }`}
            >
              {addr.isDefault && (
                <span className="absolute top-3 right-3 text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-semibold">
                  ค่าเริ่มต้น
                </span>
              )}
              <p className="font-semibold text-gray-700 text-sm">{addr.label || "ที่อยู่"}</p>
              <p className="text-sm text-gray-600">{addr.name} · {addr.phone}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{addr.address}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="text-xs text-pink-400 border border-pink-200 px-3 py-1 rounded-full hover:bg-pink-50 transition-colors"
                  >
                    ตั้งเป็นค่าเริ่มต้น
                  </button>
                )}
                <button
                  onClick={() => openEdit(addr)}
                  className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => remove(addr.id)}
                  className="text-xs text-red-400 border border-red-100 px-3 py-1 rounded-full hover:bg-red-50 transition-colors"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
            <h3 className="font-bold text-gray-700 text-lg">
              {editing ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
            </h3>
            {[
              { field: "label",   placeholder: "ชื่อที่อยู่ (เช่น บ้าน, ที่ทำงาน)" },
              { field: "name",    placeholder: "ชื่อผู้รับ *" },
              { field: "phone",   placeholder: "เบอร์โทรศัพท์ *" },
              { field: "address", placeholder: "ที่อยู่ *", textarea: true },
            ].map(({ field, placeholder, textarea }) =>
              textarea ? (
                <textarea
                  key={field}
                  value={form[field as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 resize-none"
                />
              ) : (
                <input
                  key={field}
                  value={form[field as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 text-sm border border-pink-200 rounded-xl focus:outline-none focus:border-pink-400"
                />
              )
            )}
            <div className="flex gap-2 mt-1">
              <button
                onClick={saveForm}
                className="flex-1 py-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition-colors text-sm font-medium"
              >
                บันทึก
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
