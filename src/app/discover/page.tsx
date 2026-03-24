'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Share2, Bookmark, MapPin, Star, ArrowRight, Home, Search, Compass, User, MessageCircle, X, Zap } from 'lucide-react';
import { PROPERTIES } from '@/lib/data';

export default function DiscoverPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [showInfo, setShowInfo] = useState(false);

  const current = PROPERTIES[currentIdx % PROPERTIES.length];

  const handleLike = () => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(current.id) ? next.delete(current.id) : next.add(current.id);
      return next;
    });
  };

  const handleSave = () => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(current.id) ? next.delete(current.id) : next.add(current.id);
      return next;
    });
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Full-screen card */}
      <div className="flex-1 relative">
        {/* Background image */}
        <img
          src={`${current.images[0]}&auto=format&fit=crop&w=800`}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'; }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">Haozing</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">🔥 Trending</button>
            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">🌙 Tonight</button>
          </div>
        </div>

        {/* Side actions */}
        <div className="absolute right-4 bottom-36 flex flex-col gap-5 items-center z-10">
          <button onClick={handleLike} className="flex flex-col items-center gap-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 transition-all active:scale-90 ${liked.has(current.id) ? 'bg-red-500' : 'bg-white/20'}`}>
              <Heart className={`w-6 h-6 ${liked.has(current.id) ? 'fill-white text-white' : 'text-white'}`} />
            </div>
            <span className="text-white text-xs font-semibold">{liked.has(current.id) ? '1' : '0'}</span>
          </button>

          <button onClick={handleSave} className="flex flex-col items-center gap-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 transition-all active:scale-90 ${saved.has(current.id) ? 'bg-brand-700' : 'bg-white/20'}`}>
              <Bookmark className={`w-6 h-6 ${saved.has(current.id) ? 'fill-white text-white' : 'text-white'}`} />
            </div>
            <span className="text-white text-xs font-semibold">Save</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 active:scale-90">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs font-semibold">Share</span>
          </button>

          <button onClick={() => setShowInfo(!showInfo)} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 active:scale-90">
              <span className="text-white font-bold text-lg">i</span>
            </div>
            <span className="text-white text-xs font-semibold">Info</span>
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-10">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              {current.verified && <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">✓ Verified</span>}
              {current.instantBook && <span className="text-xs font-bold text-blue-400 bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 rounded-full"><Zap className="w-2.5 h-2.5 inline" /> Instant</span>}
            </div>
            <h2 className="text-white font-bold text-2xl font-display leading-tight">{current.title}</h2>
            <div className="flex items-center gap-3 text-white/80 text-sm mt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{current.location}</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-savanna-400 text-savanna-400" />{current.rating} ({current.reviewCount})</span>
            </div>
            <p className="text-white/70 text-sm mt-1.5 line-clamp-2">{current.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <span className="text-white font-bold text-2xl">KSh {current.price.toLocaleString()}</span>
              <span className="text-white/60 text-sm">/night</span>
            </div>
            <Link href={`/property/${current.id}`} className="bg-white text-brand-700 font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-stone-50 transition-all">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Swipe hint */}
          <p className="text-white/40 text-xs text-center mt-3">Swipe up for next · {currentIdx + 1}/{PROPERTIES.length}</p>
        </div>

        {/* Swipe overlay buttons */}
        <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} className="absolute left-0 inset-y-0 w-12 z-10" />
        <button onClick={() => setCurrentIdx((currentIdx + 1) % PROPERTIES.length)} className="absolute right-0 inset-y-0 w-12 z-10" />

        {/* Info panel */}
        {showInfo && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col justify-end p-5">
            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold">{current.title}</h3>
                <button onClick={() => setShowInfo(false)} className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'WiFi', value: current.wifiSpeed },
                  { label: 'Electricity', value: current.electricity },
                  { label: 'Water', value: current.water },
                  { label: 'Safety Score', value: `${current.safetyScore}/10` },
                ].map(item => (
                  <div key={item.label} className="bg-stone-50 rounded-xl p-3">
                    <p className="text-xs text-stone-500">{item.label}</p>
                    <p className="text-sm font-semibold text-stone-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {current.amenities.map(a => (
                  <span key={a} className="badge-gray text-xs">{a}</span>
                ))}
              </div>
              <Link href={`/property/${current.id}`} className="btn-primary w-full text-center block">View Full Details</Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="bg-black border-t border-white/10 flex items-center justify-around py-3 px-6">
        {[
          { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/' },
          { icon: <Search className="w-5 h-5" />, label: 'Search', href: '/search' },
          { icon: <Compass className="w-5 h-5" />, label: 'Discover', href: '/discover', active: true },
          { icon: <Bookmark className="w-5 h-5" />, label: 'Saved', href: '/saved' },
          { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/profile' },
        ].map(item => (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 transition-colors ${item.active ? 'text-brand-400' : 'text-white/50 hover:text-white'}`}>
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
