'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { BOOKINGS } from '@/lib/data';
import { Search, AlertTriangle, DollarSign, RefreshCw, Eye } from 'lucide-react';

export default function AdminBookingsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const all = [...BOOKINGS, ...BOOKINGS.map((b, i) => ({ ...b, id: `BK00${4+i}`, status: i === 0 ? 'dispute' : b.status }))];
  const shown = all.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search && !b.id.includes(search) && !b.propertyTitle.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statCards = [
    { label: 'Total Bookings', value: '28,934', color: 'brand' },
    { label: 'This Month', value: '1,872', color: 'emerald' },
    { label: 'Open Disputes', value: '12', color: 'red' },
    { label: 'Pending Payouts', value: 'KSh 1.2M', color: 'amber' },
  ];

  const statusBadge: Record<string, string> = {
    confirmed: 'badge-green',
    pending: 'badge-amber',
    completed: 'badge-gray',
    cancelled: 'badge-red',
    dispute: 'badge-red',
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="flex max-w-[1400px] mx-auto">
        <DashboardSidebar role="admin" />
        <main className="flex-1 min-w-0 px-6 py-8">
          <div className="mb-6">
            <h1 className="page-header">Bookings & Payments</h1>
            <p className="page-subtitle">Monitor all platform bookings and transactions</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map(s => (
              <div key={s.label} className="stat-card text-center">
                <p className={`font-display text-2xl font-bold ${s.color === 'brand' ? 'text-brand-700' : s.color === 'emerald' ? 'text-emerald-600' : s.color === 'red' ? 'text-red-600' : 'text-amber-600'}`}>{s.value}</p>
                <p className="text-xs text-stone-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search booking ID or property..." className="input-field pl-9 py-2 text-sm w-72" />
            </div>
            {['all', 'confirmed', 'pending', 'completed', 'dispute'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-2 rounded-xl font-semibold capitalize transition-all ${filter === f ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>{f}</button>
            ))}
          </div>

          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  {['Booking ID', 'Property', 'Dates', 'Guests', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((b, i) => {
                  const nights = Math.ceil((new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / 86400000);
                  return (
                    <tr key={b.id + i} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-stone-600">{b.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-stone-900 max-w-[180px] truncate">{b.propertyTitle}</p>
                        <p className="text-xs text-stone-500">{b.location}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-stone-600">
                        {new Date(b.checkIn).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} → {new Date(b.checkOut).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                        <p className="text-stone-400">{nights} nights</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-stone-700">{b.guests}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-stone-900">KSh {b.totalAmount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={(statusBadge as Record<string, string>)[b.status] || 'badge-gray'}>{b.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="w-8 h-8 rounded-lg hover:bg-stone-100 text-stone-500 flex items-center justify-center" title="View"><Eye className="w-3.5 h-3.5" /></button>
                          {b.status === 'dispute' && (
                            <>
                              <button className="w-8 h-8 rounded-lg hover:bg-amber-50 text-amber-600 flex items-center justify-center" title="Resolve Dispute"><AlertTriangle className="w-3.5 h-3.5" /></button>
                              <button className="w-8 h-8 rounded-lg hover:bg-blue-50 text-blue-600 flex items-center justify-center" title="Process Refund"><RefreshCw className="w-3.5 h-3.5" /></button>
                            </>
                          )}
                          {b.status === 'confirmed' && (
                            <button className="w-8 h-8 rounded-lg hover:bg-green-50 text-green-600 flex items-center justify-center" title="Process Payout"><DollarSign className="w-3.5 h-3.5" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
