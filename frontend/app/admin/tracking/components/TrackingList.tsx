'use client'

import { useState, useEffect } from "react";
import { propsTracking } from "../page";

interface propsTrackingList {
  respodaw: propsTracking[];
  onSelect: (order: propsTracking) => void;
}

export default function TrackingList({ respodaw, onSelect }: propsTrackingList) {

  const [oders, setoders] = useState(respodaw)
  const [search, setsearch] = useState('')
  const [status, setStatus] = useState("ทั้งหมด");

  useEffect(() => {
    setoders(respodaw);
  }, [respodaw]);

  const statusOptions = [
    "ทั้งหมด",
    "รอดำเนินการ",
    "ระหว่างขนส่ง",
    "จัดส่งสำเร็จ",
  ];

  const keyword = search.toLowerCase();

  const filteroders = oders.filter((order) => {
    const matchSearch =
      (order.full_name ?? "").toLowerCase().includes(keyword) ||
      (order.address ?? "").toLowerCase().includes(keyword) ||
      (order.state ?? "").toLowerCase().includes(keyword) ||
      (order.receipt ?? "").toLowerCase().includes(keyword) ||
      (order.email ?? "").toLowerCase().includes(keyword);

    const matchStatus =
      status === "ทั้งหมด" || order.state === status;

    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-2.5 max-h-[600px] overflow-y-auto pr-1">

      <div className="grid grid-cols-2 gap-3">
        <div className="border relative p-2 rounded-[10px] overflow-auto border-gray-300">
          <span className="absolute ">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            type="text"
            placeholder="ค้นหา"
            className=" w-full pl-6 outline-none"
          />

        </div>

        <section className="border p-2 rounded-[10px] outline-none overflow-auto w-full border-gray-300">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full outline-none"
          >
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item === "ทั้งหมด" ? "คำสั่งซื้อทั้งหมด" : item}
              </option>
            ))}
          </select>
        </section>

      </div>
      <div className="border-t border-pink-50/60 pt-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          รายการพัสดุ ()
        </p>

        <div>
          {filteroders.map((e, i) => {
            return (
              <div
                key={i}
                onClick={() => onSelect(e)}
                className="border my-2 border-gray-300 shadow hover:shadow-lg cursor-pointer duration-300 transition-all px-4 pt-5 rounded-2xl"
              >
                <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                  <p className="text-sm">เลขที่ใบเสร็จ : <span className="text-pink-600">{e.receipt || '-'}</span></p>
                  <p className="text-[12px] bg-gray-100 p-1 rounded-2xl px-2">{e.state}</p>
                </div>

                <div className="flex flex-col gap-3 pt-2 border-b border-gray-300">
                  <span className="text-sm text-gray-500">ชื่อผู้รับ : <span className="text-black">{e.full_name || '-'}</span></span>
                  <span className="text-sm text-gray-500">เบอร์ติดต่อ : <span className="text-black">{e?.numberphone || '-'}</span></span>
                  <span className="text-sm text-gray-500">ที่อยู่จัดส่ง : <span className="text-black">{e.address || '-'}</span></span>
                  <span className="text-sm pb-2 text-gray-500">เมล : <span className="text-black">{e.email || '-'}</span></span>
                </div>

                <div className="flex items-center justify-between py-2 text-sm">
                  <p className="">วันที่จัดส่ง</p>
                  <p>{e.created_at}</p>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div >
  );
}
