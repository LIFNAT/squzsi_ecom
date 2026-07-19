'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      router.replace('/');
      return;
    }

    try {
      const user = JSON.parse(userData);

      if (user.status !== 'แอดมิน') {
        router.replace('/');
        return;
      }

      setLoading(false);

    } catch {
      router.replace('/');
    }
  }, [router]);

  return loading;
}