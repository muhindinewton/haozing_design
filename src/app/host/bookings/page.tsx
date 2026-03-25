'use client';
import { useState } from 'react';
import { BOOKINGS } from '@/lib/data';
import { CheckCircle, XCircle, Clock, MessageCircle, Phone, Calendar, Users, MapPin, Filter, Search } from 'lucide-react';

export default function HostBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const all = [
    ...BOOKINGS,
    { ...BOOKINGS[0], id: 'BK004', status: 'pending', propertyTitle: 'Nyali Beach Villa', checkIn: '2026-04-20', checkOut: '2026-04-23', guests: 3, totalAmount: 36000, hostName: 'Guest', hostPhone: '+254', accessCode: null, checkInInstructions: '', cancellationPolicy: 'moderate', propertyImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400', location: 'Nyali, Mombasa' },
  ];

  const filtered = all.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search && !b.propertyTitle.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: all.length,
    pending: all.filter(b => b.status === 'pending').length,
    confirmed: all.filter(b => b.status === 'confirmed').length,
    completed: all.filter(b => b.status === 'completed').length,
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      confirmed: 'badge-green',
      pending: 'badge-amber',
      completed: 'badge-gray',
      cancelled: 'badge-red',
    };
    return map[s] || 'badge-gray';
  };

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="page-header">Booking Manager</h1>
              <p className="page-subtitle">Review and manage guest bookings</p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {Object.entries(counts).map(([key, count]) => (
              <button key={key} onClick={() => setFilter(key)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${filter === key ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>
                {key} <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${filter === key ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>{count}</span>
              </button>
            ))}
            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="input-field pl-9 py-2 text-sm w-48" />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map(b => {
              const nights = Math.ceil((new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / 86400000);
              return (
                <div key={b.id} className="card overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-36 h-32 sm:h-auto shrink-0 overflow-hidden">
                      <img src={b.propertyImage} className="w-full h-full object-cover" alt={b.propertyTitle} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'; }} />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-stone-400">{b.id}</span>
                            <span className={statusBadge(b.status)}>{b.status}</span>
                          </div>
                          <h3 className="font-semibold text-stone-900">{b.propertyTitle}</h3>
                          <p className="text-sm text-stone-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{b.location}</p>
                        </div>
                        <p className="font-bold text-lg text-stone-900 shrink-0">KSh {b.totalAmount.toLocaleString()}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-stone-600 mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-stone-400" />{new Date(b.checkIn).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} → {new Date(b.checkOut).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}</span>
                        <span>{nights} nights</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-stone-400" />{b.guests} guests</span>
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-stone-400" />{b.hostPhone}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <a href={`/messages`} className="flex items-center gap-2 btn-secondary text-xs py-1.5 px-3">
                          <MessageCircle className="w-3.5 h-3.5" /> Message Guest
                        </a>
                        {b.status === 'pending' && (
                          <>
                            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-1.5 px-3 rounded-lg font-semibold transition-all">
                              <CheckCircle className="w-3.5 h-3.5" /> Accept
                            </button>
                            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-3 rounded-lg font-semibold transition-all">
                              <XCircle className="w-3.5 h-3.5" /> Decline
                            </button>
                          </>
                        )}
                        {b.status === 'confirmed' && (
                          <button className="flex items-center gap-2 btn-secondary text-xs py-1.5 px-3">
                            <Calendar className="w-3.5 h-3.5" /> Check-in prep
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
    </main>
  );
}
