'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }

    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => signIn('google', { callbackUrl: '/dashboard' });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full max-w-sm mx-auto">
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded bg-[#2E3E54] placeholder:text-[white] text-[white] cursor-pointer"
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded bg-[#2E3E54] placeholder:text-[white] text-[white] cursor-pointer"
        required
      />
      <button
        type="submit"
        className="bg-[#5B769C] text-white p-2 rounded cursor-pointer"
        disabled={isSubmitting}
      >
        Sign In
      </button>

      <button
        type="button"
        className="flex justify-center text-center align-center text-white p-2 rounded cursor-pointer border border-2-#597692"
        onClick={handleGoogleLogin}
      >
    <span className='mr-3 mt-1 flex align-center justify-center'><FcGoogle /></span>Google
      </button>
    </form>
  );
}
