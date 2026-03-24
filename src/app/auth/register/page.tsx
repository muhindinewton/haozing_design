'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, Home, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<'guest'|'host'>('guest');
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // verification step
    }, 1200);
  };

  const handleVerify = () => {
    router.push(role === 'host' ? '/host/dashboard' : '/discover');
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-5/12 hero-gradient flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-white">Haozing</span>
        </Link>
        <div>
          <h2 className="font-display text-5xl font-bold text-white mb-4 leading-tight">
            Join<br />
            <span className="text-savanna-400">12,000+</span><br />
            happy users
          </h2>
          <div className="space-y-3 mt-8">
            {[
              '✓ Free to sign up',
              '✓ Instant booking available',
              '✓ Verified & safe properties',
              '✓ 24/7 guest support',
            ].map(f => (
              <p key={f} className="text-white/80 text-sm">{f}</p>
            ))}
          </div>
        </div>
        <div className="flex -space-x-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-300 overflow-hidden">
              <img src={`https://images.unsplash.com/photo-153${i}123897727-8f129e1688ce?w=80`} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-white text-xs font-bold">+12k</div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-stone-900">Haozing</span>
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  s < step ? 'bg-brand-700 text-white' :
                  s === step ? 'bg-brand-700 text-white ring-4 ring-brand-100' :
                  'bg-stone-100 text-stone-400'
                }`}>
                  {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                </div>
                <span className={`text-xs font-medium ${s === step ? 'text-stone-900' : 'text-stone-400'}`}>
                  {s === 1 ? 'Account' : s === 2 ? 'Role' : 'Verify'}
                </span>
                {s < 3 && <div className={`flex-1 h-0.5 w-8 ${s < step ? 'bg-brand-700' : 'bg-stone-200'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="mb-6">
                <h1 className="font-display text-3xl font-bold text-stone-900 mb-1">Create account</h1>
                <p className="text-stone-500">Start your journey with Haozing</p>
              </div>

              {/* Google */}
              <button className="w-full flex items-center justify-center gap-3 border border-stone-200 rounded-xl py-3 font-semibold text-stone-700 hover:bg-stone-50 transition-all mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Sign up with Google
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-xs text-stone-400 font-medium">or with email</span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Amina Wanjiru" className="input-field pl-10" />
                  </div>
                </div>
                <div>
                  <label className="label">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" className="input-field pl-10" />
                  </div>
                </div>
                <div>
                  <label className="label">Phone (M-Pesa)</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+254 7XX XXX XXX" className="input-field pl-10" />
                  </div>
                </div>
                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type={show ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Min. 8 characters" className="input-field pl-10 pr-10" />
                    <button onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 rounded border-stone-300" />
                  <span className="text-sm text-stone-600">I agree to the <a href="#" className="text-brand-700 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-brand-700 font-semibold hover:underline">Privacy Policy</a></span>
                </label>
                <button onClick={() => setStep(2)} disabled={!agreed || !form.name || !form.email} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center text-sm text-stone-500 mt-6">
                Already have an account? <Link href="/auth/login" className="font-semibold text-brand-700 hover:underline">Sign in</Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <h1 className="font-display text-3xl font-bold text-stone-900 mb-1">I want to...</h1>
                <p className="text-stone-500">Choose your role on Haozing</p>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  { value: 'guest', icon: '🧳', title: 'Find a Stay', desc: 'Browse & book verified properties across Kenya' },
                  { value: 'host', icon: '🏡', title: 'List My Property', desc: 'Earn by hosting guests on my property' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setRole(opt.value as 'guest'|'host')}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                      role === opt.value ? 'border-brand-700 bg-brand-50' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-3xl">{opt.icon}</span>
                    <div>
                      <p className={`font-bold ${role === opt.value ? 'text-brand-700' : 'text-stone-900'}`}>{opt.title}</p>
                      <p className="text-sm text-stone-500">{opt.desc}</p>
                    </div>
                    {role === opt.value && <div className="ml-auto w-5 h-5 bg-brand-700 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                  </button>
                ))}
              </div>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-brand-700" />
                </div>
                <h1 className="font-display text-3xl font-bold text-stone-900 mb-1">Verify your email</h1>
                <p className="text-stone-500">We sent a 6-digit code to <span className="font-semibold text-stone-900">{form.email || 'your email'}</span></p>
              </div>
              <div className="flex gap-3 justify-center mb-6">
                {[0,1,2,3,4,5].map(i => (
                  <input key={i} type="text" maxLength={1} className="w-12 h-14 text-center text-xl font-bold border-2 border-stone-200 rounded-xl focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20 transition-all" />
                ))}
              </div>
              <button onClick={handleVerify} className="btn-primary w-full flex items-center justify-center gap-2">
                Verify & Continue <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-sm text-stone-500 mt-4">
                Didn't receive it? <button className="font-semibold text-brand-700 hover:underline">Resend code</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
