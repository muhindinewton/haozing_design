'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import PropertyCard from '@/components/guest/PropertyCard';
import { PROPERTIES } from '@/lib/data';
import { Search, SlidersHorizontal, Map, List, X, ChevronDown, Star, Wifi, Car, Waves, Dumbbell, UtensilsCrossed } from 'lucide-react';

const TYPES = ['All', 'Apartment', 'Villa', 'Studio', 'Cottage', 'House'];
const AMENITIES_LIST = ['WiFi', 'Pool', 'Parking', 'Kitchen', 'AC', 'Gym', 'Beach Access'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'list'|'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [type, setType] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [instantOnly, setInstantOnly] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (a: string) => setSelectedAmenities(prev =>
    prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
  );

  const filtered = PROPERTIES.filter(p => {
    if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.location.toLowerCase().includes(query.toLowerCase())) return false;
    if (type !== 'All' && p.type !== type) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    if (instantOnly && !p.instantBook) return false;
    if (selectedAmenities.length && !selectedAmenities.every(a => p.amenities.includes(a))) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Search header */}
      <div className="bg-white border-b border-stone-100 px-4 py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search location, property name..."
              className="input-field pl-10 h-11"
            />
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-field h-11 w-auto pr-8 hidden md:block"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 h-11 px-4 rounded-xl border font-semibold text-sm transition-all ${showFilters ? 'bg-brand-700 text-white border-brand-700' : 'border-stone-200 text-stone-700 hover:border-stone-300'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(type !== 'All' || maxPrice < 30000 || instantOnly || selectedAmenities.length > 0) && (
              <span className="w-5 h-5 bg-savanna-400 text-white rounded-full text-xs flex items-center justify-center font-bold">!</span>
            )}
          </button>

          <div className="flex border border-stone-200 rounded-xl overflow-hidden">
            <button onClick={() => setView('list')} className={`px-3 py-2.5 ${view === 'list' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-50'} transition-all`}><List className="w-4 h-4" /></button>
            <button onClick={() => setView('map')} className={`px-3 py-2.5 ${view === 'map' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-50'} transition-all`}><Map className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="max-w-7xl mx-auto mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-200 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Property type */}
              <div>
                <label className="label">Property Type</label>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map(t => (
                    <button key={t} onClick={() => setType(t)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${type === t ? 'bg-brand-700 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>{t}</button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <label className="label">Price Range (KSh/night)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} className="input-field py-2 text-sm" placeholder="Min" />
                  <span className="text-stone-400">—</span>
                  <input type="number" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="input-field py-2 text-sm" placeholder="Max" />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="label">Min. Rating</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map(r => (
                    <button key={r} onClick={() => setMinRating(r)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${minRating === r ? 'bg-brand-700 text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>
                      {r === 0 ? 'Any' : <><Star className="w-3 h-3 fill-current" />{r}+</>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant book */}
              <div>
                <label className="label">Options</label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={instantOnly} onChange={e => setInstantOnly(e.target.checked)} className="rounded border-stone-300" />
                  <span className="text-sm font-medium text-stone-700">⚡ Instant Book only</span>
                </label>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-4 pt-4 border-t border-stone-200">
              <label className="label">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES_LIST.map(a => (
                  <button key={a} onClick={() => toggleAmenity(a)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${selectedAmenities.includes(a) ? 'bg-brand-700 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>{a}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => { setType('All'); setMinPrice(0); setMaxPrice(30000); setMinRating(0); setInstantOnly(false); setSelectedAmenities([]); }} className="btn-secondary text-sm py-2 px-4">Clear all</button>
              <button onClick={() => setShowFilters(false)} className="btn-primary text-sm py-2 px-4">Show {filtered.length} results</button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-stone-500 text-sm mb-6">
          <span className="font-semibold text-stone-900">{filtered.length}</span> properties found
          {query && <> for <span className="font-semibold text-stone-900">"{query}"</span></>}
        </p>

        {view === 'list' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">No properties found</h3>
                <p className="text-stone-500">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 h-[calc(100vh-250px)]">
            {/* Map */}
            <div className="flex-1 map-placeholder rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                  <Map className="w-10 h-10 text-ocean-700 mx-auto mb-2" />
                  <p className="font-semibold text-stone-900">Interactive Map</p>
                  <p className="text-sm text-stone-500">Shows {filtered.length} properties</p>
                </div>
              </div>
              {/* Price pins */}
              {filtered.slice(0, 5).map((p, i) => (
                <div
                  key={p.id}
                  className="absolute bg-white rounded-full px-3 py-1 shadow-lg text-xs font-bold text-stone-900 border border-stone-200 cursor-pointer hover:bg-brand-700 hover:text-white transition-all z-20"
                  style={{ top: `${20 + i * 12}%`, left: `${15 + i * 15}%` }}
                >
                  KSh {(p.price / 1000).toFixed(0)}K
                </div>
              ))}
            </div>
            {/* List sidebar */}
            <div className="w-80 overflow-y-auto space-y-3">
              {filtered.map(p => (
                <a key={p.id} href={`/property/${p.id}`} className="flex gap-3 card p-3 hover:shadow-md transition-all">
                  <img src={p.images[0]} className="w-20 h-20 rounded-xl object-cover shrink-0" alt={p.title} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200'; }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-stone-900 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-stone-500">{p.location}</p>
                    <div className="flex items-center gap-1 mt-1"><Star className="w-3 h-3 fill-savanna-500 text-savanna-500" /><span className="text-xs font-semibold">{p.rating}</span></div>
                    <p className="text-sm font-bold text-stone-900 mt-1">KSh {p.price.toLocaleString()}<span className="text-xs text-stone-400 font-normal">/night</span></p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
