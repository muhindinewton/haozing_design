'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { BOOKINGS } from '@/lib/data';
import { MapPin, Calendar, ChevronRight, Plus } from 'lucide-react';

export default function TripsPage() {
  const [tab, setTab] = useState<'upcoming'|'past'|'cancelled'>('upcoming');

  const upcoming = BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const past = BOOKINGS.filter(b => b.status === 'completed');
  const cancelled = BOOKINGS.filter(b => b.status === 'cancelled');

  const shown = tab === 'upcoming' ? upcoming : tab === 'past' ? past : cancelled;

  const statusColors: Record<string, string> = {
    confirmed: 'badge-green',
    pending: 'badge-amber',
    completed: 'badge-gray',
    cancelled: 'badge-red',
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="page-header">My Trips</h1>
            <p className="page-subtitle">Manage your bookings and stays</p>
          </div>
          <Link href="/search" className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
            <Plus className="w-4 h-4" /> Book a Stay
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 mb-6">
          {[
            { key: 'upcoming', label: 'Upcoming', count: upcoming.length },
            { key: 'past', label: 'Past', count: past.length },
            { key: 'cancelled', label: 'Cancelled', count: cancelled.length },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${tab === t.key ? 'border-brand-700 text-brand-700' : 'border-transparent text-stone-500 hover:text-stone-900'}`}>
              {t.label}
              {t.count > 0 && <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === t.key ? 'bg-brand-100 text-brand-700' : 'bg-stone-100 text-stone-500'}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">No {tab} trips</h3>
            <p className="text-stone-500 mb-6">
              {tab === 'upcoming' ? 'Start planning your next adventure!' : `You have no ${tab} trips yet.`}
            </p>
            {tab === 'upcoming' && <Link href="/search" className="btn-primary inline-block">Explore Stays</Link>}
          </div>
        ) : (
          <div className="space-y-4">
            {shown.map(booking => {
              const nights = Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000);
              return (
                <Link key={booking.id} href={`/booking/${booking.id}`} className="card-hover flex overflow-hidden group">
                  <div className="w-40 h-36 shrink-0 relative overflow-hidden">
                    <img src={booking.propertyImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={booking.propertyTitle} />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-stone-900 group-hover:text-brand-700 transition-colors">{booking.propertyTitle}</h3>
                        <span className={statusColors[booking.status]}>{booking.status}</span>
                      </div>
                      <p className="text-sm text-stone-500 flex items-center gap-1 mb-3"><MapPin className="w-3.5 h-3.5" />{booking.location}</p>
                      <div className="flex items-center gap-4 text-sm text-stone-600">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(booking.checkIn).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} – {new Date(booking.checkOut).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>{nights} nights · {booking.guests} guests</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">KSh {booking.totalAmount.toLocaleString()}</span>
                      <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-brand-700 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
