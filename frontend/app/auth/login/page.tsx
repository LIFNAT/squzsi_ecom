"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../config";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        setMessage(result.message || "เข้าสู่ระบบไม่สำเร็จ");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.data));
      setMessage("เข้าสู่ระบบสำเร็จ");
      router.push("/");
    } catch (error) {
      setMessage("เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-xl border border-pink-100">
        <h1 className="text-2xl font-bold text-pink-600 mb-2">เข้าสู่ระบบ</h1>
        <p className="text-sm text-gray-500 mb-6">ยินดีต้อนรับกลับสู่ SquishyLand</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-pink-200 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-pink-200 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {message ? <p className="text-sm text-pink-600">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white hover:bg-pink-600 disabled:opacity-60"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          ยังไม่มีบัญชี? <a href="/auth/register" className="text-pink-600 font-semibold">สร้างบัญชีใหม่</a>
        </p>
      </div>
    </div>
  );
}
