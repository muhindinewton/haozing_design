'use client';
import { useState } from 'react';
import { PROPERTIES } from '@/lib/data';
import { Search, CheckCircle, XCircle, Eye, ClipboardList, Shield, MapPin, Star, Flag } from 'lucide-react';

export default function AdminPropertiesPage() {
  const [tab, setTab] = useState<'all'|'pending'|'flagged'>('all');
  const [search, setSearch] = useState('');

  const properties = [
    ...PROPERTIES,
    { ...PROPERTIES[0], id: 'p-pending-1', title: 'Coast Studio Apartment', verified: false, tag: undefined },
    { ...PROPERTIES[1], id: 'p-pending-2', title: 'Kilifi Creek House', verified: false, tag: undefined },
  ];

  // FIXED: Remove type error in filter logic
  const filtered = properties.filter(p => {
    if (tab === 'pending' && p.verified) return false;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const shown = tab === 'all' ? PROPERTIES.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase())) :
                tab === 'pending' ? properties.filter(p => !p.verified && (!search || p.title.toLowerCase().includes(search.toLowerCase()))) :
                PROPERTIES.slice(0, 1);

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="page-header">Listing Management</h1>
              <p className="page-subtitle">Review, approve and moderate property listings</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-stone-200 mb-6">
            {[
              { key: 'all', label: 'All Listings', count: PROPERTIES.length },
              { key: 'pending', label: 'Pending Review', count: 2 },
              { key: 'flagged', label: 'Flagged', count: 1 },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${tab === t.key ? 'border-brand-700 text-brand-700 bg-white' : 'border-transparent text-stone-500 bg-stone-50'}`}> 
                {t.label}
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === t.key ? 'bg-brand-100 text-brand-700' : 'bg-stone-100 text-stone-500'}`}>{t.count}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..." className="input-field pl-9 py-2 text-sm" />
            </div>
          </div>

          <div className="space-y-4">
            {(tab === 'pending' ? properties.filter(p => !p.verified) : tab === 'flagged' ? PROPERTIES.slice(0, 1) : PROPERTIES).map(p => (
              <div key={p.id} className="card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-40 h-32 sm:h-auto overflow-hidden shrink-0 relative">
                    <img src={p.images[0]} className="w-full h-full object-cover" alt={p.title} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-929b6383306e?auto=format&fit=crop&w=400&q=80'; }} />
                    {tab === 'flagged' && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Flag className="w-3 h-3" /> Flagged
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}> 
                            <Shield className="w-3 h-3 inline mr-0.5" />{p.verified ? 'Verified' : 'Pending'}
                          </span>
                          <span className="badge-gray text-xs">{p.type}</span>
                        </div>
                        <h3 className="font-semibold text-stone-900">{p.title}</h3>
                        <p className="text-sm text-stone-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {p.rating > 0 && <div className="flex items-center gap-1 justify-end mb-1"><Star className="w-4 h-4 fill-savanna-500 text-savanna-500" /><span className="text-sm font-bold">{p.rating}</span></div>}
                        <p className="font-bold text-stone-900">KSh {p.price.toLocaleString()}<span className="text-xs text-stone-400 font-normal">/night</span></p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <button className="flex items-center gap-1.5 btn-secondary text-xs py-1.5 px-3">
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </button>
                      {!p.verified && (
                        <>
                          <button className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-1.5 px-3 rounded-lg font-semibold transition-all">
                            <CheckCircle className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-3 rounded-lg font-semibold transition-all">
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                          <button className="flex items-center gap-1.5 bg-ocean-700 hover:bg-ocean-800 text-white text-xs py-1.5 px-3 rounded-lg font-semibold transition-all">
                            <ClipboardList className="w-3.5 h-3.5" /> Assign Inspector
                          </button>
                        </>
                      )}
                      {tab === 'flagged' && (
                        <>
                          <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-3 rounded-lg font-semibold transition-all">
                            <XCircle className="w-3.5 h-3.5" /> Remove Listing
                          </button>
                          <button className="flex items-center gap-1.5 btn-secondary text-xs py-1.5 px-3">
                            Dismiss Flag
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </main>
  );
}
