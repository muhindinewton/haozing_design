'use client';
import { useState } from 'react';
import { ADMIN_STATS, USERS } from '@/lib/data';
import { TrendingUp, TrendingDown, Users, Building2, BookOpen, DollarSign, Shield, AlertTriangle, CheckCircle, XCircle, Activity, ChevronRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<'overview'|'pending'>('overview');

  const statCards = [
    { label: 'Total Users', value: ADMIN_STATS.totalUsers.toLocaleString(), icon: Users, color: 'ocean', change: '+8%', up: true },
    { label: 'Active Listings', value: ADMIN_STATS.activeListings.toLocaleString(), icon: Building2, color: 'brand', change: '+12%', up: true },
    { label: 'Total Bookings', value: ADMIN_STATS.totalBookings.toLocaleString(), icon: BookOpen, color: 'emerald', change: '+6%', up: true },
    { label: 'Platform Revenue', value: `KSh ${(ADMIN_STATS.monthRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'amber', change: '+14%', up: true },
    { label: 'Platform Health', value: `${ADMIN_STATS.platformHealth}%`, icon: Activity, color: 'emerald', change: '+0.2%', up: true },
    { label: 'Open Disputes', value: ADMIN_STATS.pendingDisputes, icon: AlertTriangle, color: 'red', change: '-3', up: false },
    { label: 'Pending Listings', value: ADMIN_STATS.pendingListings, icon: Shield, color: 'amber', change: '', up: true },
    { label: 'Total Hosts', value: ADMIN_STATS.totalHosts.toLocaleString(), icon: Building2, color: 'brand', change: '+5%', up: true },
  ];

  const colorClass = (color: string, type: 'bg' | 'text') => {
    const map: Record<string, Record<string, string>> = {
      ocean: { bg: 'bg-ocean-100', text: 'text-ocean-700' },
      brand: { bg: 'bg-brand-100', text: 'text-brand-700' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
    };
    return map[color]?.[type] || 'bg-stone-100 text-stone-700';
  };

  const PENDING_LISTINGS = [
    { id: 'pl1', title: 'Coast Studio Apartment', host: 'Amina Wanjiru', location: 'Mombasa', submitted: '2 days ago', type: 'Studio' },
    { id: 'pl2', title: 'Kilifi Creek House', host: 'Robert Mwangi', location: 'Kilifi', submitted: '1 day ago', type: 'House' },
    { id: 'pl3', title: 'Lavington 2BR', host: 'Patricia Kamau', location: 'Nairobi', submitted: '5 hrs ago', type: 'Apartment' },
  ];

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-stone-900">Platform Overview</h1>
              <p className="text-stone-500 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                All systems operational · {new Date().toLocaleDateString('en-KE', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map(s => (
              <div key={s.label} className="stat-card">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass(s.color, 'bg')}`}>
                    <s.icon className={`w-5 h-5 ${colorClass(s.color, 'text')}`} />
                  </div>
                  {s.change && (
                    <span className={`text-xs font-bold flex items-center gap-0.5 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                      {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {s.change}
                    </span>
                  )}
                </div>
                <p className="font-display text-2xl font-bold text-stone-900">{s.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Revenue bar chart */}
          <div className="card p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900">Monthly Revenue (KSh)</h3>
              <span className="badge-green text-xs">↑ 14% YoY</span>
            </div>
            <div className="h-40 flex items-end gap-2">
              {[2.1, 2.4, 2.0, 2.8, 2.5, 3.1, 2.7, 3.4, 2.9, 3.6, 3.1, 3.24].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-full rounded-t-lg hover:brightness-90 transition-all cursor-pointer ${i === 11 ? 'bg-brand-700' : 'bg-brand-200'}`} style={{ height: `${(v / 3.6) * 100}%` }} />
                  <span className="text-[10px] text-stone-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Pending listings */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900">Pending Listings</h3>
                <a href="/admin/properties" className="text-sm text-brand-700 font-semibold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></a>
              </div>
              <div className="space-y-3">
                {PENDING_LISTINGS.map(pl => (
                  <div key={pl.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">{pl.title}</p>
                      <p className="text-xs text-stone-500">{pl.host} · {pl.location} · {pl.submitted}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-200 transition-all">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-all">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent users */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900">Recent Users</h3>
                <a href="/admin/users" className="text-sm text-brand-700 font-semibold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></a>
              </div>
              <div className="space-y-3">
                {USERS.slice(0, 5).map(u => (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center text-sm font-bold text-stone-600 shrink-0">
                      {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">{u.name}</p>
                      <p className="text-xs text-stone-500">{u.role} · joined {new Date(u.joined).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{u.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
    </main>
  );
}
