'use client';
import { useState } from 'react';
import { ADMIN_STATS } from '@/lib/data';
import { TrendingUp, TrendingDown, DollarSign, Users, Building2, BookOpen, MapPin, BarChart3, PieChart, Activity, Download, ArrowUpRight } from 'lucide-react';

const MONTHLY_REVENUE = [2.1, 2.4, 2.0, 2.8, 2.5, 3.1, 2.7, 3.4, 2.9, 3.6, 3.1, 3.24];
const MONTHLY_BOOKINGS = [820, 940, 780, 1100, 980, 1250, 1050, 1380, 1100, 1450, 1240, 1872];
const MONTHLY_USERS = [310, 420, 280, 510, 390, 620, 480, 730, 560, 810, 680, 920];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const TOP_REGIONS = [
  { name: 'Mombasa (Nyali, Bamburi, Shanzu)', bookings: 8420, revenue: 14200000, pct: 35 },
  { name: 'Kilifi County (Watamu, Malindi)', bookings: 5810, revenue: 9800000, pct: 24 },
  { name: 'Kwale (Diani, Tiwi, Msambweni)', bookings: 4930, revenue: 8100000, pct: 20 },
  { name: 'Lamu Island & Archipelago', bookings: 2340, revenue: 4900000, pct: 10 },
  { name: 'Malindi Town', bookings: 1880, revenue: 3100000, pct: 8 },
  { name: 'Other Coastal Areas', bookings: 750, revenue: 980000, pct: 3 },
];

const PROPERTY_TYPE_SPLIT = [
  { type: 'Villa', pct: 34, color: 'bg-brand-700' },
  { type: 'Apartment', pct: 27, color: 'bg-ocean-700' },
  { type: 'Cottage', pct: 18, color: 'bg-amber-500' },
  { type: 'Studio', pct: 13, color: 'bg-emerald-500' },
  { type: 'House', pct: 8, color: 'bg-stone-400' },
];

const TOP_PROPERTIES = [
  { name: 'Tiwi Beach Luxury Villa', location: 'Tiwi, Kwale', bookings: 31, revenue: 558000, rating: 4.95 },
  { name: 'Lamu Stone Town Retreat', location: 'Lamu Island', bookings: 72, revenue: 706000, rating: 4.95 },
  { name: 'Diani Beach Cottage', location: 'Diani, Kwale', bookings: 64, revenue: 461000, rating: 4.95 },
  { name: 'Msambweni Beach Villa', location: 'Msambweni, Kwale', bookings: 55, revenue: 660000, rating: 4.9 },
  { name: 'Luxury Ocean View Suite', location: 'Nyali, Mombasa', bookings: 127, revenue: 1080000, rating: 4.9 },
];

export default function AdminAnalyticsPage() {
  const [metric, setMetric] = useState<'revenue' | 'bookings' | 'users'>('revenue');

  const chartData = metric === 'revenue' ? MONTHLY_REVENUE : metric === 'bookings' ? MONTHLY_BOOKINGS : MONTHLY_USERS;
  const maxVal = Math.max(...chartData);
  const fmtVal = (v: number) => metric === 'revenue' ? `KSh ${v.toFixed(1)}M` : v.toLocaleString();

  const kpis = [
    { label: 'Total Revenue', value: `KSh ${(ADMIN_STATS.totalRevenue / 1000000).toFixed(1)}M`, change: '+14%', up: true, icon: DollarSign, color: 'brand' },
    { label: 'Total Bookings', value: ADMIN_STATS.totalBookings.toLocaleString(), change: '+6%', up: true, icon: BookOpen, color: 'ocean' },
    { label: 'Active Listings', value: ADMIN_STATS.activeListings.toLocaleString(), change: '+12%', up: true, icon: Building2, color: 'emerald' },
    { label: 'Total Users', value: ADMIN_STATS.totalUsers.toLocaleString(), change: '+8%', up: true, icon: Users, color: 'amber' },
  ];

  const colorMap: Record<string, { bg: string; text: string }> = {
    brand: { bg: 'bg-brand-100', text: 'text-brand-700' },
    ocean: { bg: 'bg-ocean-100', text: 'text-ocean-700' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
  };

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-stone-900">Platform Analytics</h1>
              <p className="text-stone-500 mt-1">Kenyan Coast · All-time performance data</p>
            </div>
            <div className="flex gap-2">
              <select className="input-field py-2 text-sm w-auto pr-8">
                <option>All Time</option>
                <option>This Year</option>
                <option>Last 6 Months</option>
                <option>This Month</option>
              </select>
              <button className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map(k => (
              <div key={k.label} className="stat-card">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[k.color].bg}`}>
                    <k.icon className={`w-5 h-5 ${colorMap[k.color].text}`} />
                  </div>
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {k.change}
                  </span>
                </div>
                <p className="font-display text-2xl font-bold text-stone-900">{k.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{k.label}</p>
              </div>
            ))}
          </div>

          {/* Main chart */}
          <div className="card p-5 mb-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-700" />
                <h3 className="font-semibold text-stone-900">Monthly Trend — 2026</h3>
              </div>
              <div className="flex gap-2">
                {(['revenue', 'bookings', 'users'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`text-sm px-3 py-1.5 rounded-lg font-semibold transition-all capitalize ${metric === m ? 'bg-brand-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-48 flex items-end gap-1.5">
              {chartData.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[9px] text-stone-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{fmtVal(v)}</span>
                  <div
                    className={`w-full rounded-t-lg transition-all cursor-pointer hover:brightness-90 ${i === 11 ? 'bg-brand-700' : 'bg-brand-200'}`}
                    style={{ height: `${(v / maxVal) * 100}%` }}
                  />
                  <span className="text-[10px] text-stone-400">{MONTHS_SHORT[i]}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100 text-sm text-stone-600">
              <span>
                YTD Total:{' '}
                <strong className="text-stone-900">
                  {metric === 'revenue'
                    ? `KSh ${chartData.reduce((a, b) => a + b, 0).toFixed(1)}M`
                    : chartData.reduce((a, b) => a + b, 0).toLocaleString()}
                </strong>
              </span>
              <span className="badge-green text-xs">↑ 14% YoY</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Top regions */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-brand-700" />
                <h3 className="font-semibold text-stone-900">Bookings by Coastal Region</h3>
              </div>
              <div className="space-y-3">
                {TOP_REGIONS.map(r => (
                  <div key={r.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-stone-700 truncate flex-1 mr-3">{r.name}</span>
                      <span className="text-xs text-stone-500 shrink-0">{r.bookings.toLocaleString()} · KSh {(r.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-700 rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property type split */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-5">
                <PieChart className="w-5 h-5 text-brand-700" />
                <h3 className="font-semibold text-stone-900">Listings by Property Type</h3>
              </div>
              <div className="space-y-3">
                {PROPERTY_TYPE_SPLIT.map(t => (
                  <div key={t.type} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${t.color}`} />
                    <span className="text-sm text-stone-700 flex-1">{t.type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-stone-600 w-8 text-right">{t.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="font-display text-2xl font-bold text-stone-900">{ADMIN_STATS.activeListings.toLocaleString()}</p>
                  <p className="text-xs text-stone-500">Active Listings</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-amber-600">{ADMIN_STATS.pendingListings}</p>
                  <p className="text-xs text-stone-500">Awaiting Review</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top performing properties */}
          <div className="card p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900">Top Performing Properties</h3>
              <a href="/admin/properties" className="text-sm text-brand-700 font-semibold hover:underline flex items-center gap-1">View all <ArrowUpRight className="w-3 h-3" /></a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 rounded-xl">
                    {['#', 'Property', 'Location', 'Bookings', 'Revenue', 'Rating'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-bold text-stone-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOP_PROPERTIES.map((p, i) => (
                    <tr key={p.name} className="border-t border-stone-50 hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-bold text-stone-400">#{i + 1}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-stone-900">{p.name}</td>
                      <td className="px-4 py-3 text-sm text-stone-500">{p.location}</td>
                      <td className="px-4 py-3 text-sm text-stone-700 font-medium">{p.bookings}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-stone-900">KSh {p.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold text-amber-600">★ {p.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform health row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Platform Uptime', value: `${ADMIN_STATS.platformHealth}%`, icon: Activity, color: 'emerald', note: 'Last 30 days' },
              { label: 'Avg. Booking Value', value: `KSh ${Math.round(ADMIN_STATS.totalRevenue / ADMIN_STATS.totalBookings).toLocaleString()}`, icon: DollarSign, color: 'brand', note: 'Per booking' },
              { label: 'Host-to-Guest Ratio', value: `1 : ${Math.round(ADMIN_STATS.totalGuests / ADMIN_STATS.totalHosts)}`, icon: Users, color: 'ocean', note: 'Platform-wide' },
              { label: 'Open Disputes', value: ADMIN_STATS.pendingDisputes, icon: TrendingDown, color: 'red', note: 'Needs resolution' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color === 'emerald' ? 'bg-emerald-100' : s.color === 'brand' ? 'bg-brand-100' : s.color === 'ocean' ? 'bg-ocean-100' : 'bg-red-100'}`}>
                  <s.icon className={`w-5 h-5 ${s.color === 'emerald' ? 'text-emerald-600' : s.color === 'brand' ? 'text-brand-700' : s.color === 'ocean' ? 'text-ocean-700' : 'text-red-600'}`} />
                </div>
                <p className="font-display text-2xl font-bold text-stone-900">{s.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
                <p className="text-xs text-stone-400 mt-1">{s.note}</p>
              </div>
            ))}
          </div>
    </main>
  );
}
