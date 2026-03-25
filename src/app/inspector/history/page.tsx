'use client';
import { useState } from 'react';
import { INSPECTIONS } from '@/lib/data';
import { Search, CheckCircle, XCircle, MapPin, Calendar, Phone, FileText, Download, Filter } from 'lucide-react';

const COMPLETED = INSPECTIONS.filter(i => i.status === 'completed');

// Extend with extra mock history entries
const ALL_HISTORY = [
  ...COMPLETED,
  {
    id: 'INS008',
    propertyId: '4',
    propertyTitle: 'Diani Beach Cottage',
    propertyAddress: 'Diani Beach Road, Kwale',
    hostName: 'Sarah Omondi',
    hostPhone: '+254 711 001 002',
    scheduledDate: '2026-03-10',
    scheduledTime: '10:30 AM',
    status: 'completed',
    priority: 'medium',
    inspectorName: 'James Odhiambo',
    notes: 'Lovely beachfront cottage. Garden and BBQ area as described. Minor: garden hose needs replacement. Host informed.',
    result: 'passed',
    lat: -4.3219,
    lng: 39.5678,
  },
  {
    id: 'INS009',
    propertyId: '6',
    propertyTitle: 'Bamburi Beach Apartment',
    propertyAddress: 'Bamburi North, Mombasa',
    hostName: 'Aisha Ali',
    hostPhone: '+254 722 334 556',
    scheduledDate: '2026-03-08',
    scheduledTime: '11:00 AM',
    status: 'completed',
    priority: 'high',
    inspectorName: 'Grace Mutua',
    notes: 'Pool area not matching photos — tiles cracked on east wall. Safety concern raised. Host given 14 days to repair.',
    result: 'failed',
    lat: -3.98,
    lng: 39.72,
  },
  {
    id: 'INS010',
    propertyId: '9',
    propertyTitle: 'Vipingo Ridge Studio',
    propertyAddress: 'Vipingo Ridge Estate, Kilifi',
    hostName: 'Achieng Mwangi',
    hostPhone: '+254 700 445 667',
    scheduledDate: '2026-03-05',
    scheduledTime: '9:00 AM',
    status: 'completed',
    priority: 'low',
    inspectorName: 'Naomi Adhiambo',
    notes: 'Studio is clean, modern and matches listing fully. Golf view as advertised. All utilities pass.',
    result: 'passed',
    lat: -3.8,
    lng: 39.75,
  },
  {
    id: 'INS011',
    propertyId: '10',
    propertyTitle: 'Msambweni Beach Villa',
    propertyAddress: 'Msambweni Beach Road, Kwale',
    hostName: 'Emily Kadzo',
    hostPhone: '+254 722 334 455',
    scheduledDate: '2026-02-20',
    scheduledTime: '2:00 PM',
    status: 'completed',
    priority: 'high',
    inspectorName: 'James Odhiambo',
    notes: 'Outstanding villa. Private pool, fully stocked kitchen, ocean view verified. 5-star ready.',
    result: 'passed',
    lat: -4.47,
    lng: 39.47,
  },
];

export default function InspectorHistoryPage() {
  const [search, setSearch] = useState('');
  const [resultFilter, setResultFilter] = useState<'all'|'passed'|'failed'>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = ALL_HISTORY.filter(i => {
    if (resultFilter !== 'all' && i.result !== resultFilter) return false;
    if (search && !i.propertyTitle.toLowerCase().includes(search.toLowerCase()) && !i.propertyAddress.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedInsp = ALL_HISTORY.find(i => i.id === selected);

  const passCount = ALL_HISTORY.filter(i => i.result === 'passed').length;
  const failCount = ALL_HISTORY.filter(i => i.result === 'failed').length;

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="page-header">Inspection History</h1>
              <p className="page-subtitle">All completed inspections and reports</p>
            </div>
            <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Completed', value: ALL_HISTORY.length, color: 'brand', icon: FileText },
              { label: 'Passed', value: passCount, color: 'emerald', icon: CheckCircle },
              { label: 'Failed / Issues', value: failCount, color: 'red', icon: XCircle },
            ].map(s => (
              <div key={s.label} className="stat-card flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color === 'brand' ? 'bg-brand-100' : s.color === 'emerald' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  <s.icon className={`w-6 h-6 ${s.color === 'brand' ? 'text-brand-700' : s.color === 'emerald' ? 'text-emerald-600' : 'text-red-600'}`} />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-stone-900">{s.value}</p>
                  <p className="text-xs text-stone-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search property or location..."
                className="input-field pl-9 py-2 text-sm w-72"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'passed', 'failed'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setResultFilter(r)}
                  className={`text-sm px-4 py-2 rounded-xl font-semibold transition-all capitalize ${resultFilter === r ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}
                >
                  {r === 'all' ? 'All Results' : r}
                </button>
              ))}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-6">
            {/* List */}
            <div className="flex-1 space-y-3">
              {filtered.map(insp => (
                <button
                  key={insp.id}
                  onClick={() => setSelected(insp.id === selected ? null : insp.id)}
                  className={`w-full text-left card p-5 transition-all hover:shadow-md ${selected === insp.id ? 'ring-2 ring-brand-700' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${insp.result === 'passed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                          {insp.result === 'passed' ? '✓ Passed' : '✕ Failed'}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">{insp.id}</span>
                      </div>
                      <h3 className="font-semibold text-stone-900">{insp.propertyTitle}</h3>
                      <p className="text-sm text-stone-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {insp.propertyAddress}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-stone-700">{insp.scheduledDate}</p>
                      <p className="text-xs text-stone-400">{insp.inspectorName}</p>
                    </div>
                  </div>
                  {insp.notes && (
                    <p className="text-xs text-stone-500 mt-3 bg-stone-50 rounded-lg p-2 line-clamp-2">{insp.notes}</p>
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="card p-12 text-center text-stone-500">No inspections match your filters</div>
              )}
            </div>

            {/* Detail panel */}
            {selectedInsp && (
              <div className="w-80 shrink-0 space-y-4">
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-stone-900">Report Detail</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${selectedInsp.result === 'passed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                      {selectedInsp.result?.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide mb-1">Property</p>
                      <p className="font-semibold text-stone-900">{selectedInsp.propertyTitle}</p>
                      <p className="text-stone-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedInsp.propertyAddress}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100">
                      <div>
                        <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide mb-1">Date</p>
                        <p className="text-stone-700 flex items-center gap-1"><Calendar className="w-3 h-3" />{selectedInsp.scheduledDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide mb-1">Inspector</p>
                        <p className="text-stone-700">{selectedInsp.inspectorName}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-stone-100">
                      <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide mb-1">Host Contact</p>
                      <p className="text-stone-700">{selectedInsp.hostName}</p>
                      <p className="text-stone-500 flex items-center gap-1"><Phone className="w-3 h-3" />{selectedInsp.hostPhone}</p>
                    </div>
                    {selectedInsp.notes && (
                      <div className="pt-2 border-t border-stone-100">
                        <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide mb-1">Inspector Notes</p>
                        <p className="text-stone-700 text-xs leading-relaxed">{selectedInsp.notes}</p>
                      </div>
                    )}
                  </div>
                  <button className="btn-secondary w-full text-sm mt-4 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                </div>
              </div>
            )}
          </div>
    </main>
  );
}
