'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import PropertyCard from '@/components/guest/PropertyCard';
import { PROPERTIES } from '@/lib/data';
import Link from 'next/link';
import { Plus, Share2, Heart } from 'lucide-react';

const COLLECTIONS = [
  { id: 'c1', name: 'Mombasa Getaway', count: 3, emoji: '🏖️' },
  { id: 'c2', name: 'Business Trips', count: 2, emoji: '💼' },
  { id: 'c3', name: 'Family Vacation', count: 1, emoji: '👨‍👩‍👧' },
];

export default function SavedPage() {
  const [activeCollection, setActiveCollection] = useState('all');

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="page-header">Saved Listings</h1>
            <p className="page-subtitle">Your wishlists and saved properties</p>
          </div>
          <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"><Plus className="w-4 h-4" /> New Collection</button>
        </div>

        {/* Collections */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          <button
            onClick={() => setActiveCollection('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition-all shrink-0 ${activeCollection === 'all' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300'}`}
          >
            <Heart className="w-4 h-4" /> All Saved
          </button>
          {COLLECTIONS.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCollection(c.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition-all shrink-0 ${activeCollection === c.id ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300'}`}
            >
              {c.emoji} {c.name}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeCollection === c.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>{c.count}</span>
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold bg-white border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 transition-all shrink-0">
            <Plus className="w-4 h-4" /> New list
          </button>
        </div>

        {/* Recently viewed */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-stone-900">Recently Viewed</h2>
            <button className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Clear history</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {PROPERTIES.slice(0, 4).map(p => (
              <Link key={p.id} href={`/property/${p.id}`} className="shrink-0 w-48 group">
                <div className="h-28 rounded-xl overflow-hidden mb-2 bg-stone-200">
                  <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={p.title} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'; }} />
                </div>
                <p className="text-xs font-semibold text-stone-900 line-clamp-1 group-hover:text-brand-700 transition-colors">{p.title}</p>
                <p className="text-xs text-stone-500">KSh {p.price.toLocaleString()}/night</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Saved properties */}
        <div>
          <h2 className="font-display text-xl font-semibold text-stone-900 mb-6">Saved Properties</h2>
          {PROPERTIES.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PROPERTIES.slice(0, 6).map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">💔</p>
              <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">Nothing saved yet</h3>
              <p className="text-stone-500 mb-6">Heart properties you love to save them here</p>
              <Link href="/discover" className="btn-primary inline-block">Explore Stays</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
