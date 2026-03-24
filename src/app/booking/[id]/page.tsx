'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { BOOKINGS, PROPERTIES } from '@/lib/data';
import { ArrowLeft, Calendar, Users, MapPin, Phone, MessageCircle, Copy, CheckCircle, CreditCard, Shield, ChevronRight, QrCode, Download } from 'lucide-react';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking = BOOKINGS.find(b => b.id === params.id) || BOOKINGS[0];
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'details'|'checkin'|'payment'>('details');

  const copyCode = () => {
    if (booking.accessCode) {
      navigator.clipboard?.writeText(booking.accessCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const statusColors: Record<string, string> = {
    confirmed: 'badge-green',
    pending: 'badge-amber',
    completed: 'badge-gray',
    cancelled: 'badge-red',
  };

  const nights = Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/trips" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> My Trips
          </Link>
          <span className={statusColors[booking.status]}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
        </div>

        {/* Hero card */}
        <div className="card overflow-hidden mb-6">
          <div className="relative h-48">
            <img src={booking.propertyImage} className="w-full h-full object-cover" alt={booking.propertyTitle} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="font-display text-2xl font-bold">{booking.propertyTitle}</h1>
              <p className="text-sm text-white/80 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5" />{booking.location}</p>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1">
              <span className="text-white text-xs font-bold">#{booking.id}</span>
            </div>
          </div>

          {/* Dates bar */}
          <div className="grid grid-cols-3 divide-x divide-stone-100 p-4">
            <div className="px-4 first:pl-0">
              <p className="text-xs text-stone-500 uppercase tracking-wide font-semibold mb-1">Check-in</p>
              <p className="font-bold text-stone-900">{new Date(booking.checkIn).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-xs text-stone-500">From 2:00 PM</p>
            </div>
            <div className="px-4 text-center">
              <p className="text-xs text-stone-500 uppercase tracking-wide font-semibold mb-1">Duration</p>
              <p className="font-bold text-stone-900">{nights} nights</p>
              <p className="text-xs text-stone-500">{booking.guests} guests</p>
            </div>
            <div className="px-4">
              <p className="text-xs text-stone-500 uppercase tracking-wide font-semibold mb-1">Check-out</p>
              <p className="font-bold text-stone-900">{new Date(booking.checkOut).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-xs text-stone-500">By 11:00 AM</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-stone-200 mb-6">
          {(['details', 'checkin', 'payment'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-brand-700 text-brand-700' : 'border-transparent text-stone-500 hover:text-stone-900'}`}>
              {tab === 'checkin' ? 'Check-in' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'details' && (
          <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
            {/* Host contact */}
            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-4">Your Host</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-lg">👤</div>
                <div>
                  <p className="font-semibold">{booking.hostName}</p>
                  <p className="text-sm text-stone-500">{booking.hostPhone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${booking.hostPhone}`} className="flex-1 flex items-center justify-center gap-2 border border-stone-200 rounded-xl py-2.5 text-sm font-semibold hover:bg-stone-50 transition-all">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <Link href="/messages" className="flex-1 flex items-center justify-center gap-2 border border-stone-200 rounded-xl py-2.5 text-sm font-semibold hover:bg-stone-50 transition-all">
                  <MessageCircle className="w-4 h-4" /> Message
                </Link>
                <a href={`https://wa.me/${booking.hostPhone.replace(/[^0-9]/g,'')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-green-600 transition-all">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Cancellation policy */}
            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-4">Cancellation Policy</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className={`badge ${booking.cancellationPolicy === 'flexible' ? 'badge-green' : booking.cancellationPolicy === 'moderate' ? 'badge-amber' : 'badge-red'}`}>
                  {booking.cancellationPolicy.charAt(0).toUpperCase() + booking.cancellationPolicy.slice(1)}
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                {booking.cancellationPolicy === 'flexible'
                  ? 'Free cancellation up to 24 hours before check-in.'
                  : booking.cancellationPolicy === 'moderate'
                  ? 'Free cancellation up to 5 days before check-in. 50% refund after that.'
                  : 'Non-refundable within 14 days of check-in.'}
              </p>
              {booking.status === 'confirmed' && (
                <button className="mt-4 text-sm font-semibold text-red-600 hover:underline">Cancel booking</button>
              )}
            </div>

            {/* Property details */}
            <div className="card p-5 md:col-span-2">
              <h3 className="font-semibold text-stone-900 mb-3">Booking Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div><p className="text-stone-500">Booking ID</p><p className="font-semibold">{booking.id}</p></div>
                <div><p className="text-stone-500">Guests</p><p className="font-semibold">{booking.guests}</p></div>
                <div><p className="text-stone-500">Nights</p><p className="font-semibold">{nights}</p></div>
                <div><p className="text-stone-500">Total</p><p className="font-semibold text-brand-700">KSh {booking.totalAmount.toLocaleString()}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="space-y-4 animate-fade-in">
            {booking.accessCode ? (
              <div className="card p-6 text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-brand-700" />
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-900 mb-1">Your Access Code</h3>
                <p className="text-stone-500 text-sm mb-6">Use this code to access the property</p>
                <div className="bg-stone-50 rounded-2xl p-6 mb-4">
                  <p className="font-mono text-4xl font-bold text-brand-700 tracking-widest">{booking.accessCode}</p>
                </div>
                <button onClick={copyCode} className={`flex items-center gap-2 mx-auto px-6 py-3 rounded-xl font-semibold transition-all text-sm ${codeCopied ? 'bg-emerald-500 text-white' : 'border border-stone-200 text-stone-700 hover:bg-stone-50'}`}>
                  {codeCopied ? <><CheckCircle className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Code</>}
                </button>
              </div>
            ) : (
              <div className="card p-6 text-center">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-2">Access code pending</h3>
                <p className="text-stone-500 text-sm">Your access code will be available 24 hours before check-in.</p>
              </div>
            )}

            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-3">Check-in Instructions</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{booking.checkInInstructions}</p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-3">House Rules</h3>
              <ul className="space-y-2">
                {['No smoking indoors', 'No parties or events', 'Quiet hours: 10 PM – 7 AM', 'Pets not allowed', 'Check-out by 11:00 AM'].map(rule => (
                  <li key={rule} className="flex items-center gap-2 text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full" />{rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-4 animate-fade-in">
            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-4">Payment Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: `KSh ${Math.round(booking.totalAmount / nights / 1.15).toLocaleString()} × ${nights} nights`, value: Math.round(booking.totalAmount * 0.75) },
                  { label: 'Cleaning fee', value: 1500 },
                  { label: 'Service fee', value: Math.round(booking.totalAmount * 0.12) },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-stone-700">
                    <span>{item.label}</span>
                    <span>KSh {item.value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-stone-900 pt-3 border-t border-stone-100 text-base">
                  <span>Total Paid</span>
                  <span className="text-brand-700">KSh {booking.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-5 h-5 text-brand-700" />
                <h3 className="font-semibold text-stone-900">Payment Method</h3>
              </div>
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold text-sm text-stone-900">M-Pesa</p>
                  <p className="text-xs text-stone-500">+254 7XX XXX XXX</p>
                </div>
                <span className="ml-auto badge-green">Paid</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 border border-stone-200 rounded-xl py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-all">
              <Download className="w-4 h-4" /> Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
