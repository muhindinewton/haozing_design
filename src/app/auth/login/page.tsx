'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Home, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'guest'|'host'|'inspector'|'admin'>('guest');

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'host') router.push('/host/dashboard');
      else if (role === 'inspector') router.push('/inspector/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
      else router.push('/discover');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left panel – decorative */}
      <div className="hidden lg:flex w-1/2 hero-gradient flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-white">Haozing</span>
        </Link>

        <div>
          <h2 className="font-display text-5xl font-bold text-white mb-4 leading-tight">
            Welcome<br />back to<br />
            <span className="text-savanna-400">Kenya's best</span><br />
            stays
          </h2>
          <p className="text-white/70 text-lg">Your perfect getaway is just a few clicks away.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['🏖️ Beach', '🦁 Safari', '🌆 City'].map(l => (
            <div key={l} className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center text-white font-medium text-sm">{l}</div>
          ))}
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-stone-900">Haozing</span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-stone-900 mb-1">Sign in</h1>
            <p className="text-stone-500">Welcome back! Please enter your details.</p>
          </div>

          {/* Demo role switcher */}
          <div className="mb-6 p-3 bg-savanna-50 border border-savanna-200 rounded-xl">
            <p className="text-xs font-semibold text-savanna-700 mb-2">Demo: Sign in as</p>
            <div className="flex flex-wrap gap-2">
              {(['guest', 'host', 'inspector', 'admin'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${role === r ? 'bg-savanna-500 text-white' : 'bg-white border border-savanna-200 text-savanna-700'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Google OAuth */}
          <button className="w-full flex items-center justify-center gap-3 border border-stone-200 rounded-xl py-3 font-semibold text-stone-700 hover:bg-stone-50 transition-all mb-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                />
                <button onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-stone-300" />
                <span className="text-sm text-stone-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm font-semibold text-brand-700 hover:underline">Forgot password?</Link>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-stone-500 mt-6">
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-semibold text-brand-700 hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
