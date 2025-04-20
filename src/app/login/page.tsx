// pages/login.tsx
'use client'; // if using app router

import { useState } from 'react';
import { login } from '@/services/auth.service';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import { useAuthStore } from '@/store/auth-store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await login(email, password);
      setToken(access_token);
      router.push('/dashboard');
    } catch (err: any) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </form>
  );
}
