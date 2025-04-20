'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import { signup } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth-store';

export default function AuthForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter(); // Updated to use next/navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await signup(username, email, password);
      alert('Signup successful. You can now login.');
      router.push('/login'); // Redirect using next/navigation
    } catch (err: any) {
      console.error(err);
      const message = err?.response?.data?.message;
    
      if (Array.isArray(message)) {
        alert(message.join('\n')); // Show all validation errors
      } else {
        alert(message || 'Signup failed'); // Show single message or fallback
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
