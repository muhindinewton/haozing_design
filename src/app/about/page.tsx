import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Shield, Star, Users, Home, TrendingUp, CheckCircle, Heart } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Guests', value: '12,000+' },
    { label: 'Verified Properties', value: '1,400+' },
    { label: 'Cities in Kenya', value: '18' },
    { label: 'Host Earnings', value: 'KSh 50M+' },
  ];

  const team = [
    { name: 'Zainab Hassan', role: 'Co-founder & CEO', avatar: '👩🏾‍💼' },
    { name: 'Brian Otieno', role: 'Co-founder & CTO', avatar: '👨🏾‍💻' },
    { name: 'Amina Wanjiru', role: 'Head of Operations', avatar: '👩🏽‍💼' },
    { name: 'James Mwangi', role: 'Head of Growth', avatar: '👨🏿‍💼' },
  ];

  const values = [
    { icon: Shield, title: 'Safety First', desc: 'Every property is inspected and verified before being listed.' },
    { icon: Star, title: 'Quality Standards', desc: 'We maintain high standards so guests always have great stays.' },
    { icon: Heart, title: 'Built for Kenya', desc: 'Designed for Kenyan hospitality — warm, personal, and reliable.' },
    { icon: TrendingUp, title: 'Host Empowerment', desc: 'We help hosts grow their income with smart tools and insights.' },
  ];

  return (
    <div className="min-h-screen bg-surface mobile-bottom-nav-clearance">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Redefining hospitality<br />in <span className="text-savanna-400">Kenya</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Haozing connects guests with unique, verified short-term stays across Kenya — from Nairobi penthouses to Mombasa beach villas.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-display text-4xl font-bold gradient-text">{s.value}</p>
              <p className="text-stone-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-700 text-sm font-bold uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="font-display text-4xl font-bold text-stone-900 mb-4 leading-tight">
                Making every stay feel like home
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-6">
                We started Haozing because we believed Kenyans deserved a platform built specifically for our context — one that understands M-Pesa, our neighborhoods, our hospitality culture, and our guests' real needs.
              </p>
              <p className="text-stone-600 leading-relaxed">
                From rigorous property inspections to real-time safety scores, we've built systems that give guests confidence and give hosts the tools to run professional short-term rental businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
                'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=400',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
              ].map((src, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}>
                  <img src={src} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-700 text-sm font-bold uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="font-display text-3xl font-bold text-stone-900">Our core values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 text-center">
                <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-brand-700" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-700 text-sm font-bold uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="font-display text-3xl font-bold text-stone-900">Simple from start to stay</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: 'Guests', emoji: '🧳', steps: ['Browse & filter verified stays', 'Book instantly or request', 'Pay via M-Pesa securely', 'Check in with your access code'] },
              { role: 'Hosts', emoji: '🏡', steps: ['List your property for free', 'Schedule an inspection', 'Go live & start earning', 'Manage bookings from dashboard'] },
              { role: 'Inspectors', emoji: '🔍', steps: ['Accept inspection assignments', 'Visit the property on-site', 'Complete the digital checklist', 'Submit your report'] },
            ].map(group => (
              <div key={group.role} className="card p-6">
                <div className="text-3xl mb-3">{group.emoji}</div>
                <h3 className="font-display text-xl font-semibold text-stone-900 mb-4">For {group.role}</h3>
                <ul className="space-y-2">
                  {group.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
                      <div className="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center text-[10px] font-bold text-brand-700 shrink-0 mt-0.5">{i + 1}</div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-700 text-sm font-bold uppercase tracking-widest mb-2">The People</p>
            <h2 className="font-display text-3xl font-bold text-stone-900">Meet our team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="card p-6 text-center">
                <div className="text-4xl mb-3">{member.avatar}</div>
                <h4 className="font-semibold text-stone-900">{member.name}</h4>
                <p className="text-sm text-stone-500 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-stone-900 mb-4">Join the Haozing community</h2>
          <p className="text-stone-500 text-lg mb-8">Whether you're looking for your next stay or want to earn from your property, we've got you covered.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/search" className="btn-primary">Find a Stay</Link>
            <Link href="/auth/register" className="btn-secondary">Become a Host</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
