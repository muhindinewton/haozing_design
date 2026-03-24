'use client';
import { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Building2, BookOpen, DollarSign,
  Calendar, ArrowUpRight, ArrowDownRight, Download
} from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Navbar from '@/components/layout/Navbar';

const METRICS = [
  { label: 'Total Revenue', value: 'KSh 2.4M', change: '+12%', up: true, icon: DollarSign },
  { label: 'Active Bookings', value: '1,284', change: '+8%', up: true, icon: BookOpen },
  { label: 'New Users', value: '342', change: '+24%', up: true, icon: Users },
  { label: 'Properties Listed', value: '856', change: '+5%', up: true, icon: Building2 },
];

const MONTHLY_DATA = [
  { month: 'Jan', revenue: 180, bookings: 120 },
  { month: 'Feb', revenue: 220, bookings: 145 },
  { month: 'Mar', revenue: 280, bookings: 180 },
  { month: 'Apr', revenue: 260, bookings: 165 },
  { month: 'May', revenue: 320, bookings: 210 },
  { month: 'Jun', revenue: 380, bookings: 245 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6m');

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">Analytics</h1>
                <p className="text-stone-500">Platform performance and insights</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="6m">Last 6 months</option>
                  <option value="1y">Last year</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-700 text-white rounded-xl text-sm font-medium hover:bg-brand-800 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {METRICS.map((metric) => (
                <div key={metric.label} className="card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-brand-700" />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${metric.up ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-stone-900">{metric.value}</p>
                  <p className="text-sm text-stone-500">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-stone-900">Revenue Overview</h3>
                  <span className="text-sm text-stone-500">KSh (thousands)</span>
                </div>
                <div className="h-48 flex items-end gap-3">
                  {MONTHLY_DATA.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-brand-200 rounded-t-lg relative group cursor-pointer"
                        style={{ height: `${(d.revenue / 400) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-brand-600 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          KSh {d.revenue}k
                        </div>
                      </div>
                      <span className="text-xs text-stone-500">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bookings Chart */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-stone-900">Booking Trends</h3>
                  <span className="text-sm text-stone-500">Number of bookings</span>
                </div>
                <div className="h-48 flex items-end gap-3">
                  {MONTHLY_DATA.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-secondary-200 rounded-t-lg relative group cursor-pointer"
                        style={{ height: `${(d.bookings / 280) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-secondary-500 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {d.bookings}
                        </div>
                      </div>
                      <span className="text-xs text-stone-500">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Properties */}
            <div className="card p-6">
              <h3 className="font-semibold text-stone-900 mb-4">Top Performing Properties</h3>
              <div className="space-y-3">
                {[
                  { name: 'Diani Beach Villa', bookings: 48, revenue: 'KSh 456K', rating: 4.9 },
                  { name: 'Lamu Old Town House', bookings: 42, revenue: 'KSh 380K', rating: 4.8 },
                  { name: 'Mombasa Penthouse', bookings: 38, revenue: 'KSh 342K', rating: 4.7 },
                ].map((p, i) => (
                  <div key={p.name} className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl">
                    <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-sm font-bold text-brand-700">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-stone-900">{p.name}</p>
                      <p className="text-xs text-stone-500">{p.bookings} bookings</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-stone-900">{p.revenue}</p>
                      <p className="text-xs text-stone-500">★ {p.rating}</p>
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
