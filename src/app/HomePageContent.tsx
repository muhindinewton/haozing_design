'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Star, Shield, Zap, TrendingUp, ChevronRight, Play } from 'lucide-react';
import SearchBar from '@/components/guest/SearchBar';
import PropertyCard from '@/components/guest/PropertyCard';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { PROPERTIES } from '@/lib/data';

const CATEGORIES = [
  { label: 'Beach', emoji: '🏖️', q: 'beach' },
  { label: 'Safari', emoji: '🦁', q: 'safari' },
  { label: 'City', emoji: '🌆', q: 'nairobi' },
  { label: 'Mountain', emoji: '⛰️', q: 'mountain' },
  { label: 'Budget', emoji: '💚', q: 'budget' },
  { label: 'Luxury', emoji: '✨', q: 'luxury' },
  { label: 'Family', emoji: '👨‍👩‍👧', q: 'family' },
  { label: 'Tonight', emoji: '🌙', q: 'tonight' },
];

const QUICK_ESCAPES = [
  { label: 'Under KSh 5,000', icon: '💵', budget: 5000 },
  { label: 'Under KSh 10,000', icon: '💰', budget: 10000 },
  { label: 'Under KSh 20,000', icon: '💎', budget: 20000 },
];

export default function HomePageContent({ activeCategory }: { activeCategory: string }) {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!splashDone) {
    return (
      <div className="fixed inset-0 hero-gradient flex flex-col items-center justify-center z-50">
        <div className="animate-bounce-subtle">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 border border-white/20 shadow-2xl">
            <span className="text-4xl">🏠</span>
          </div>
        </div>
        <h1 className="font-display text-5xl font-bold text-white mb-2 animate-fade-in">Haozing</h1>
        <p className="text-white/70 text-lg animate-fade-in delay-200">Find your perfect stay in Kenya</p>
        <div className="mt-12 flex gap-2">
          {[0,1,2].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full bg-white/60 animate-pulse`} style={{ animationDelay: `${i*200}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient text-white py-16 sm:py-20 md:py-28 px-4 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-60 h-60 md:w-80 md:h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 md:w-96 md:h-96 bg-white/5 rounded-full" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm mb-4 md:mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>3,241 verified properties in Kenya</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold mb-3 md:mb-4 leading-tight animate-slide-up">
            Your Perfect<br />
            <span className="text-savanna-400">Kenyan Stay</span><br />
            Awaits
          </h1>
          <p className="text-white/75 text-base md:text-lg md:text-xl mb-6 md:mb-10 max-w-xl mx-auto px-4 md:px-0 animate-slide-up delay-200">
            Curated, verified properties across Kenya. Book with confidence.
          </p>

          <div className="max-w-3xl mx-auto animate-slide-up delay-300">
            <SearchBar />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-xs md:text-sm text-white/70 animate-fade-in delay-400">
            <span className="flex items-center gap-1.5 md:gap-2"><Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400" /> <span className="hidden sm:inline">Verified</span> Properties</span>
            <span className="flex items-center gap-1.5 md:gap-2"><Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary-400" /> <span className="hidden sm:inline">Instant</span> Booking</span>
            <span className="flex items-center gap-1.5 md:gap-2"><Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary-400" /> 4.8★ <span className="hidden sm:inline">Average Rating</span></span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky-below-navbar sticky z-30 border-b border-stone-200/50 bg-white/80 px-4 py-8 backdrop-blur-md transition-[top] duration-300">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.label}
              href={`/search?category=${cat.label.toLowerCase()}`}
              className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl whitespace-nowrap transition-all shrink-0 min-w-[72px] backdrop-blur-sm border shadow-sm hover:shadow-md active:scale-95 md:hover:scale-105 ${
                activeCategory.toLowerCase() === cat.label.toLowerCase()
                  ? 'bg-brand-600 text-white border-brand-600 shadow-lg'
                  : 'bg-white/60 hover:bg-brand-50 text-stone-700 hover:text-brand-700 border-stone-200/60'
              }`}
            >
              <span className="text-xl md:text-2xl">{cat.emoji}</span>
              <span className="text-xs md:text-sm font-medium">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Escapes */}
      <section className="py-8 md:py-10 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 md:mb-6">
          <div>
            <h2 className="section-title">Quick Escapes</h2>
            <p className="text-stone-500 text-sm mt-1">Budget-friendly stays, booked in minutes</p>
          </div>
          <Link href="/search" className="text-brand-700 text-sm font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_ESCAPES.map(q => (
            <Link
              key={q.label}
              href={`/search?maxPrice=${q.budget}`}
              className="card-hover p-6 flex items-center gap-4 group"
            >
              <span className="text-3xl">{q.icon}</span>
              <div>
                <p className="font-semibold text-stone-900 group-hover:text-brand-700 transition-colors">{q.label}</p>
                <p className="text-xs text-stone-500">per night</p>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 ml-auto group-hover:text-brand-700 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* FYP Preview */}
      <section className="py-8 md:py-10 px-4 bg-gradient-to-r from-brand-700 to-brand-800 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <span className="badge bg-white/20 text-white mb-2 md:mb-3 text-xs font-bold uppercase tracking-wide">🔥 New Feature</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-2 md:mb-3">Discover Your Feed</h2>
            <p className="text-white/80 text-sm md:text-base max-w-md">Scroll through stunning property videos and photos. Like, save, and book on the go.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/discover"
              className="flex items-center gap-2 md:gap-3 bg-white text-brand-700 font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl hover:bg-stone-50 transition-all shadow-lg md:shadow-xl text-sm md:text-base"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-brand-700" /> Open Feed
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-10 md:py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6 md:mb-8">
          <div>
            <h2 className="section-title">Featured Stays</h2>
            <p className="text-stone-500 text-sm mt-1">Hand-picked, verified properties</p>
          </div>
          <Link href="/search" className="btn-secondary text-sm py-2 px-4 self-start sm:self-auto">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROPERTIES.slice(0, 8).map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Tonight Deals */}
      <section className="py-8 md:py-10 px-4 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 md:mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">🌙 Tonight's Deals</h2>
              <p className="text-white/95 text-sm mt-1">Same-day discounts. Available now.</p>
            </div>
            <Link href="/search?tag=tonight" className="bg-white/30 hover:bg-white/40 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all self-start sm:self-auto">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROPERTIES.filter(p => p.tag === 'tonight' || p.price < 6000).slice(0, 3).map(p => (
              <Link key={p.id} href={`/property/${p.id}`} className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 rounded-2xl p-4 transition-all group">
                <div className="flex gap-3">
                  <img src={p.images[0]} className="w-20 h-20 rounded-xl object-cover shrink-0" alt={p.title} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-1 mb-1 text-white">{p.title}</h3>
                    <p className="text-white/90 text-xs mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white">KSh {p.price.toLocaleString()}</span>
                        <span className="text-xs text-white/80">/night</span>
                      </div>
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">Available</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title flex items-center gap-2"><TrendingUp className="w-6 h-6 text-brand-700" /> Trending Now</h2>
            <p className="text-stone-500 text-sm mt-1">Most booked properties this week</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES.filter(p => p.tag === 'trending').map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Become a Host CTA */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-stone-900 to-stone-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-600/20 rounded-full translate-x-16 -translate-y-16" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="badge bg-secondary-500/20 text-secondary-400 border border-secondary-500/30 mb-4">For Property Owners</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Start Hosting Today</h2>
              <p className="text-stone-300 max-w-md">Join 1,400+ hosts earning from their properties. Get verified, set your rates, and start receiving bookings.</p>
              <div className="flex gap-6 mt-6">
                <div><p className="font-bold text-2xl text-secondary-400">KSh 45K</p><p className="text-xs text-stone-400">avg. monthly earnings</p></div>
                <div><p className="font-bold text-2xl text-secondary-400">74%</p><p className="text-xs text-stone-400">avg. occupancy rate</p></div>
              </div>
            </div>
            <Link href="/auth/register?role=host" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              Become a Host <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 bg-white border-t border-stone-100">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="section-title mb-3">How Haozing Works</h2>
          <p className="text-stone-500">Simple, safe, and seamless from search to stay</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', icon: '🔍', title: 'Search & Discover', desc: 'Browse verified properties by location, budget, and dates. Use our FYP feed for inspiration.' },
            { step: '02', icon: '📅', title: 'Book Instantly', desc: 'Confirm with instant booking or request approval. Secure payment via M-Pesa or card.' },
            { step: '03', icon: '🏠', title: 'Check In & Stay', desc: 'Get your digital access code. Enjoy your curated stay with 24/7 support.' },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{item.icon}</div>
              <span className="text-xs font-bold text-brand-700 uppercase tracking-widest">{item.step}</span>
              <h3 className="font-display text-xl font-semibold mt-1 mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
