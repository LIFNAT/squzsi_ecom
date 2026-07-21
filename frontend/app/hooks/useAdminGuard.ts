'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminGuard() {
  const router = useRouter();

  // ตรวจสอบสิทธิ์ตั้งแต่ตอนประกาศ State ครั้งแรก (Lazy Initial State)
  const [loading, setLoading] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.replace('/');
        return true; // ปล่อยให้ loading ค้างไว้ระหว่าง redirect
      }

      const user = JSON.parse(userData);
      if (user.status !== 'แอดมิน') {
        router.replace('/');
        return true;
      }

      // ถ้าผ่านเงื่อนไขทั้งหมด แปลว่าโหลดเสร็จและเป็นแอดมินตัวจริง ไม่ต้องแสดงสถานะโหลด
      return false;
    } catch {
      router.replace('/');
      return true;
    }
  });

  return loading;
}

export function useSuperadmin() {
  const router = useRouter();

  // ตรวจสอบสิทธิ์ตั้งแต่ตอนประกาศ State ครั้งแรก (Lazy Initial State)
  const [loading, setLoading] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.replace('/');
        return true;
      }

      const user = JSON.parse(userData);

      // ตรวจสอบสิทธิ์เฉพาะแอดมิน รองรับทั้งภาษาไทยและอังกฤษ (แอดมิน, admin, ผู้ดูแลระบบ)
      const allowedRoles = ['ผู้ดูแลระบบ'];
      if (!allowedRoles.includes(user.status)) {
        router.replace('/');
        return true;
      }

      // ผ่านเงื่อนไขแอดมิน ปิดสถานะโหลด
      return false;
    } catch {
      router.replace('/');
      return true;
    }
  });

  return loading;
}