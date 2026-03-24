'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Globe, Home, Users, Compass, Shield, Star, ChevronLeft } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

const SLIDES = [
  {
    id: 0,
    title: 'Welcome to Haozing',
    subtitle: 'Kenya\'s curated short-stay platform',
    content: 'language',
  },
  {
    id: 1,
    title: 'What brings you here?',
    subtitle: 'Choose your path',
    content: 'role',
  },
  {
    id: 2,
    title: 'Discover Amazing Stays',
    subtitle: 'Verified properties across Kenya',
    emoji: '🔍',
    features: [
      { icon: <Compass className="w-5 h-5" />, label: 'FYP Discovery Feed', desc: 'TikTok-style property browsing' },
      { icon: <Shield className="w-5 h-5" />, label: 'Verified Properties', desc: 'Every property inspected' },
      { icon: <Star className="w-5 h-5" />, label: 'Real Reviews', desc: 'Honest guest feedback' },
    ],
    content: 'features',
  },
  {
    id: 3,
    title: 'You\'re All Set!',
    subtitle: 'Start exploring Kenya\'s best stays',
    emoji: '🎉',
    content: 'final',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('en');
  const [role, setRole] = useState('');

  const next = () => {
    if (step < SLIDES.length - 1) setStep(step + 1);
    else router.push('/auth/register');
  };

  const skip = () => router.push('/discover');

  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
        ) : <div />}
        <button onClick={skip} className="text-white/60 text-sm hover:text-white transition-colors">Skip</button>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 justify-center py-4">
        {SLIDES.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'bg-white w-8' : i < step ? 'bg-white/60 w-4' : 'bg-white/30 w-4'}`} />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full">
        <div className="text-center mb-8">
          {SLIDES[step].emoji && <div className="text-6xl mb-4">{SLIDES[step].emoji}</div>}
          <h1 className="font-display text-4xl font-bold text-white mb-2">{SLIDES[step].title}</h1>
          <p className="text-white/70 text-lg">{SLIDES[step].subtitle}</p>
        </div>

        {/* Language selection */}
        {SLIDES[step].content === 'language' && (
          <div className="grid grid-cols-2 gap-3 w-full mb-8">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  lang === l.code ? 'border-white bg-white/20 text-white' : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <span className="text-2xl">{l.flag}</span>
                <span className="font-semibold">{l.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Role selection */}
        {SLIDES[step].content === 'role' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
            <button
              onClick={() => setRole('guest')}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                role === 'guest' ? 'border-white bg-white/20 text-white' : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <Users className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">I'm a Guest</h3>
              <p className="text-sm opacity-80">Looking for amazing stays across Kenya</p>
            </button>
            <button
              onClick={() => setRole('host')}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                role === 'host' ? 'border-white bg-white/20 text-white' : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <Home className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">I'm a Host</h3>
              <p className="text-sm opacity-80">List my property and earn from it</p>
            </button>
          </div>
        )}

        {/* Features */}
        {SLIDES[step].content === 'features' && SLIDES[step].features && (
          <div className="w-full space-y-3 mb-8">
            {SLIDES[step].features!.map((f, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-4 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">{f.icon}</div>
                <div>
                  <p className="font-semibold">{f.label}</p>
                  <p className="text-sm text-white/70">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Final */}
        {SLIDES[step].content === 'final' && (
          <div className="w-full space-y-3 mb-8">
            {[
              { label: 'Create your account', action: 'Register now', href: '/auth/register' },
              { label: 'Already have an account?', action: 'Log in', href: '/auth/login' },
              { label: 'Just browsing', action: 'Explore', href: '/discover' },
            ].map((item, i) => (
              <a key={i} href={item.href} className="flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-white transition-all">
                <span>{item.label}</span>
                <span className="font-semibold text-savanna-400 flex items-center gap-1">{item.action} <ArrowRight className="w-4 h-4" /></span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Bottom button */}
      {SLIDES[step].content !== 'final' && (
        <div className="px-6 pb-10">
          <button
            onClick={next}
            className="w-full max-w-lg mx-auto flex items-center justify-center gap-2 bg-white text-brand-700 font-bold py-4 rounded-2xl hover:bg-stone-50 transition-all shadow-xl"
          >
            Continue <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
