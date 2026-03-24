'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

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
        <span className="text-sm text-stone-500">Where are you going?</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-2">
      <div className="flex flex-col md:flex-row gap-1">
        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all cursor-text">
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

        <div className="hidden md:block w-px bg-stone-100 my-2" />

        {/* Check-in */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all cursor-pointer">
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

        <div className="hidden md:block w-px bg-stone-100 my-2" />

        {/* Check-out */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all cursor-pointer">
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

        <div className="hidden md:block w-px bg-stone-100 my-2" />

        {/* Guests */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all">
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
          className="bg-brand-700 hover:bg-brand-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <Search className="w-4 h-4" />
          <span className="hidden md:inline">Search</span>
        </button>
      </div>
    </div>
  );
}
