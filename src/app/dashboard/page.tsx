// pages/dashboard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import { useAuthStore } from '@/store/auth-store';
import DashBoard from '@/components/dashboard';

export default function Home() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  return token ? (
    <div>
      <h1>Welcome to your dashboard 🎉</h1>
      <div><DashBoard /></div>
    </div>
  ) : null;
}
