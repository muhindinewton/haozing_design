'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { USERS } from '@/lib/data';
import { Search, Filter, MoreVertical, CheckCircle, Ban, Trash2, Eye, UserPlus, ChevronDown } from 'lucide-react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = USERS.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const roleBadge = (role: string) => {
    const map: Record<string, string> = { guest: 'badge-blue', host: 'badge-orange', inspector: 'badge-amber', admin: 'badge-red' };
    return map[role] || 'badge-gray';
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="flex max-w-[1400px] mx-auto">
        <DashboardSidebar role="admin" />
        <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="page-header">User Management</h1>
              <p className="page-subtitle">{USERS.length} users on the platform</p>
            </div>
            <button className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
              <UserPlus className="w-4 h-4" /> Invite User
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="input-field pl-9 py-2 text-sm w-64" />
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="input-field py-2 text-sm w-auto pr-8">
              <option value="all">All Roles</option>
              <option value="guest">Guests</option>
              <option value="host">Hosts</option>
              <option value="inspector">Inspectors</option>
              <option value="admin">Admins</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field py-2 text-sm w-auto pr-8">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Table */}
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  {['User', 'Role', 'Bookings / Properties', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} className={`border-b border-stone-50 hover:bg-stone-50 transition-colors ${i % 2 === 0 ? '' : 'bg-stone-50/50'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-brand-200 to-ocean-200 rounded-full flex items-center justify-center text-xs font-bold text-stone-700 shrink-0">
                          {u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{u.name}</p>
                          <p className="text-xs text-stone-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={roleBadge(u.role) + ' capitalize'}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      {u.role === 'host' ? `${u.properties} properties` : u.role === 'guest' ? `${u.bookings} bookings` : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">
                      {new Date(u.joined).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="w-8 h-8 rounded-lg hover:bg-stone-100 text-stone-500 flex items-center justify-center transition-all" title="View"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-lg hover:bg-amber-50 text-stone-500 hover:text-amber-600 flex items-center justify-center transition-all" title={u.status === 'active' ? 'Suspend' : 'Activate'}><Ban className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 flex items-center justify-center transition-all" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-stone-500">No users match your filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
