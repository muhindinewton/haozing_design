'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email'|'code'|'newpw'|'done'>('email');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState('');

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/auth/login" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>

        {step === 'email' && (
          <div className="animate-fade-in">
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-brand-700" />
            </div>
            <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">Forgot password?</h1>
            <p className="text-stone-500 mb-8">No worries! Enter your email and we'll send a reset code.</p>
            <div className="space-y-4">
              <div>
                <label className="label">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input-field" />
              </div>
              <button onClick={() => setStep('code')} className="btn-primary w-full flex items-center justify-center gap-2">
                Send Reset Code <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'code' && (
          <div className="animate-fade-in">
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-brand-700" />
            </div>
            <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">Check your email</h1>
            <p className="text-stone-500 mb-8">We sent a 6-digit code to <span className="font-semibold text-stone-900">{email}</span></p>
            <div className="flex gap-2 justify-center mb-6">
              {[0,1,2,3,4,5].map(i => (
                <input key={i} type="text" maxLength={1} className="w-11 h-13 text-center text-lg font-bold border-2 border-stone-200 rounded-xl focus:border-brand-700 focus:outline-none transition-all" />
              ))}
            </div>
            <button onClick={() => setStep('newpw')} className="btn-primary w-full flex items-center justify-center gap-2">
              Verify Code <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-sm text-stone-500 mt-4">
              Didn't receive it? <button onClick={() => {}} className="font-semibold text-brand-700 hover:underline">Resend</button>
            </p>
          </div>
        )}

        {step === 'newpw' && (
          <div className="animate-fade-in">
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="w-7 h-7 text-brand-700" />
            </div>
            <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">New password</h1>
            <p className="text-stone-500 mb-8">Create a strong password for your account.</p>
            <div className="space-y-4">
              <div>
                <label className="label">New password</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 8 characters" className="input-field pr-10" />
                  <button onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="label">Confirm password</label>
                <input type="password" placeholder="Re-enter password" className="input-field" />
              </div>
              <button onClick={() => setStep('done')} className="btn-primary w-full flex items-center justify-center gap-2">
                Reset Password <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="animate-fade-in text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">Password reset!</h1>
            <p className="text-stone-500 mb-8">Your password has been successfully updated.</p>
            <Link href="/auth/login" className="btn-primary inline-flex items-center gap-2">
              Back to login <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
