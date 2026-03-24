'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { HOST_STATS, HOST_PROPERTIES, BOOKINGS } from '@/lib/data';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Star, Building2, MessageSquare, Bell, Plus, ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function HostDashboardPage() {
  const [period, setPeriod] = useState<'week'|'month'|'year'>('month');

  const revenue = period === 'week' ? HOST_STATS.weekRevenue : period === 'month' ? HOST_STATS.monthRevenue : HOST_STATS.totalRevenue;
  const bookings = period === 'week' ? 4 : period === 'month' ? HOST_STATS.monthBookings : HOST_STATS.totalBookings;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar role="host" />
      <div className="flex max-w-[1400px] mx-auto">
        <DashboardSidebar role="host" />

        <main className="flex-1 min-w-0 px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-stone-900">Welcome back, Amina! 👋</h1>
              <p className="text-stone-500 mt-1">Here's what's happening with your properties</p>
            </div>
            <div className="flex gap-2">
              <Link href="/host/properties" className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4" /> My Properties
              </Link>
              <Link href="/host/properties" className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Property
              </Link>
            </div>
          </div>

          {/* Alerts */}
          {HOST_STATS.pendingBookings > 0 && (
            <div className="mb-6 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800 font-medium">You have <strong>{HOST_STATS.pendingBookings} pending booking requests</strong> waiting for your response.</p>
              <Link href="/host/bookings" className="ml-auto text-sm font-semibold text-amber-700 hover:underline whitespace-nowrap">Review now →</Link>
            </div>
          )}

          {/* Period selector */}
          <div className="flex items-center gap-2 mb-6">
            {(['week', 'month', 'year'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`text-sm px-4 py-2 rounded-xl font-semibold transition-all capitalize ${period === p ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>
                This {p}
              </button>
            ))}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Revenue', value: `KSh ${revenue.toLocaleString()}`, icon: DollarSign, color: 'brand', change: '+12%', up: true },
              { label: 'Bookings', value: bookings, icon: Calendar, color: 'ocean', change: '+8%', up: true },
              { label: 'Occupancy', value: `${HOST_STATS.occupancyRate}%`, icon: TrendingUp, color: 'emerald', change: '+3%', up: true },
              { label: 'Avg. Rate', value: `KSh ${HOST_STATS.avgNightlyRate.toLocaleString()}`, icon: Star, color: 'amber', change: '-2%', up: false },
            ].map(stat => (
              <div key={stat.label} className="stat-card">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    stat.color === 'brand' ? 'bg-brand-100' :
                    stat.color === 'ocean' ? 'bg-ocean-100' :
                    stat.color === 'emerald' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === 'brand' ? 'text-brand-700' :
                      stat.color === 'ocean' ? 'text-ocean-700' :
                      stat.color === 'emerald' ? 'text-emerald-700' : 'text-amber-700'
                    }`} />
                  </div>
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="font-display text-2xl font-bold text-stone-900">{stat.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Revenue chart placeholder */}
          <div className="card p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900">Revenue Overview</h3>
              <span className="badge-green text-xs">↑ 12% vs last {period}</span>
            </div>
            <div className="h-40 flex items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].slice(0, period === 'week' ? 7 : 12).map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-brand-100 rounded-t-lg hover:bg-brand-200 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-stone-400">{period === 'week' ? ['M','T','W','T','F','S','S'][i] : `${i+1}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Properties */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900">My Properties</h3>
                <Link href="/host/properties" className="text-sm text-brand-700 font-semibold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></Link>
              </div>
              <div className="space-y-3">
                {HOST_PROPERTIES.map(p => (
                  <div key={p.id} className="flex items-center gap-3">
                    <img src={p.image} className="w-14 h-14 rounded-xl object-cover shrink-0" alt={p.title} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200'; }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">{p.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>{p.status}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.verificationStatus}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-stone-900">KSh {p.earnings.toLocaleString()}</p>
                      <p className="text-xs text-stone-400">{p.bookingsThisMonth} bookings</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent bookings */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900">Recent Bookings</h3>
                <Link href="/host/bookings" className="text-sm text-brand-700 font-semibold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></Link>
              </div>
              <div className="space-y-3">
                {BOOKINGS.map(b => (
                  <div key={b.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${b.status === 'confirmed' ? 'bg-emerald-100' : b.status === 'pending' ? 'bg-amber-100' : 'bg-stone-100'}`}>
                      {b.status === 'confirmed' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : b.status === 'pending' ? <Clock className="w-4 h-4 text-amber-600" /> : <CheckCircle className="w-4 h-4 text-stone-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-900 truncate">{b.propertyTitle}</p>
                      <p className="text-xs text-stone-500">{new Date(b.checkIn).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} – {new Date(b.checkOut).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-stone-900">KSh {b.totalAmount.toLocaleString()}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-500'}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
