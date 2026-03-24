'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users, X, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams({ location, checkIn, checkOut, guests: String(guests) });
    router.push(`/search?${params.toString()}`);
  };

  if (compact) {
    return (
      <button
        onClick={() => router.push('/search')}
        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-stone-200 rounded-full shadow-md hover:shadow-lg transition-all text-left w-full max-w-xs"
      >
        <Search className="w-4 h-4 text-brand-700 shrink-0" />
        <span className="text-sm text-stone-500 truncate">Where are you going?</span>
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Desktop SearchBar */}
      <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-stone-100 p-2">
        <div className="flex gap-1">
          {/* Location */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all cursor-text min-w-0">
            <MapPin className="w-5 h-5 text-brand-700 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-semibold text-stone-500 block">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Mombasa, Nairobi, Diani..."
                className="w-full bg-transparent text-sm font-medium text-stone-900 placeholder-stone-400 outline-none"
              />
            </div>
          </div>

          <div className="w-px bg-stone-100 my-2" />

          {/* Check-in */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all cursor-pointer shrink-0">
            <Calendar className="w-5 h-5 text-brand-700 shrink-0" />
            <div>
              <label className="text-xs font-semibold text-stone-500 block">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="bg-transparent text-sm font-medium text-stone-900 outline-none"
              />
            </div>
          </div>

          <div className="w-px bg-stone-100 my-2" />

          {/* Check-out */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all cursor-pointer shrink-0">
            <Calendar className="w-5 h-5 text-brand-700 shrink-0" />
            <div>
              <label className="text-xs font-semibold text-stone-500 block">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="bg-transparent text-sm font-medium text-stone-900 outline-none"
              />
            </div>
          </div>

          <div className="w-px bg-stone-100 my-2" />

          {/* Guests */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all shrink-0">
            <Users className="w-5 h-5 text-brand-700 shrink-0" />
            <div>
              <label className="text-xs font-semibold text-stone-500 block">Guests</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-5 h-5 bg-stone-200 rounded-full text-xs flex items-center justify-center hover:bg-stone-300">−</button>
                <span className="text-sm font-medium text-stone-900 w-4 text-center">{guests}</span>
                <button onClick={() => setGuests(guests + 1)} className="w-5 h-5 bg-stone-200 rounded-full text-xs flex items-center justify-center hover:bg-stone-300">+</button>
              </div>
            </div>
          </div>

          {/* Search btn */}
          <button
            onClick={handleSearch}
            className="bg-brand-700 hover:bg-brand-800 text-white px-6 lg:px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-sm shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Mobile SearchBar */}
      <div className="md:hidden bg-white rounded-xl shadow-lg border border-stone-100 p-3">
        <div className="flex flex-col gap-2">
          {/* Location Input */}
          <div className="flex items-center gap-3 px-3 py-2.5 bg-stone-50 rounded-lg">
            <MapPin className="w-5 h-5 text-brand-700 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Where to?"
              className="flex-1 bg-transparent text-sm font-medium text-stone-900 placeholder-stone-400 outline-none"
            />
            {location && (
              <button onClick={() => setLocation('')} className="p-1">
                <X className="w-4 h-4 text-stone-400" />
              </button>
            )}
          </div>

          {/* Quick Filters Row */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-stone-50 rounded-lg text-sm font-medium text-stone-700"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={handleSearch}
              className="flex-[2] bg-brand-700 hover:bg-brand-800 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Search className="w-4 h-4" />
              Search Stays
            </button>
          </div>

          {/* Expandable Filters */}
          {showMobileFilters && (
            <div className="flex flex-col gap-2 pt-2 border-t border-stone-100 animate-fade-in">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-500">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="px-3 py-2 bg-stone-50 rounded-lg text-sm outline-none border border-stone-200 focus:border-brand-700"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-stone-500">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="px-3 py-2 bg-stone-50 rounded-lg text-sm outline-none border border-stone-200 focus:border-brand-700"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-stone-50 rounded-lg">
                <span className="text-sm font-medium text-stone-700">Guests</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setGuests(Math.max(1, guests - 1))} 
                    className="w-8 h-8 bg-white rounded-lg border border-stone-200 text-lg flex items-center justify-center active:scale-95"
                  >−</button>
                  <span className="text-sm font-semibold w-4 text-center">{guests}</span>
                  <button 
                    onClick={() => setGuests(guests + 1)} 
                    className="w-8 h-8 bg-white rounded-lg border border-stone-200 text-lg flex items-center justify-center active:scale-95"
                  >+</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

