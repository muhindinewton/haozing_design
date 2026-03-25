'use client';
import { useState } from 'react';
import { INSPECTIONS, USERS } from '@/lib/data';
import { Search, ClipboardList, CheckCircle, Clock, XCircle, Star, MapPin, Calendar, UserCheck, ChevronRight } from 'lucide-react';

const INSPECTORS = USERS.filter(u => u.role === 'inspector');

export default function AdminInspectionsPage() {
  const [filter, setFilter] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);
  const [selectedInspector, setSelectedInspector] = useState('');

  const shown = INSPECTIONS.filter(i => filter === 'all' || i.status === filter);

  const priorityColor: Record<string, string> = {
    high: 'badge-red',
    medium: 'badge-amber',
    low: 'badge-gray',
  };

  const resultColor: Record<string, string> = {
    passed: 'badge-green',
    failed: 'badge-red',
    pending: 'badge-amber',
  };

  const statCards = [
    { label: 'Total Inspections', value: INSPECTIONS.length, color: 'brand' },
    { label: 'Pending', value: INSPECTIONS.filter(i => i.status === 'pending').length, color: 'amber' },
    { label: 'Completed', value: INSPECTIONS.filter(i => i.status === 'completed').length, color: 'emerald' },
    { label: 'Inspectors Active', value: INSPECTORS.length, color: 'ocean' },
  ];

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="page-header">Inspection Management</h1>
              <p className="page-subtitle">Assign inspectors and track property verifications</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map(s => (
              <div key={s.label} className="stat-card text-center">
                <p className={`font-display text-3xl font-bold ${s.color === 'brand' ? 'text-brand-700' : s.color === 'amber' ? 'text-amber-600' : s.color === 'emerald' ? 'text-emerald-600' : 'text-ocean-700'}`}>{s.value}</p>
                <p className="text-xs text-stone-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Inspections list */}
            <div className="flex-1">
              {/* Filter tabs */}
              <div className="flex gap-1 mb-4 overflow-x-auto">
                {['all', 'pending', 'in_progress', 'completed'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all capitalize ${filter === f ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {shown.map(insp => (
                  <div key={insp.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className={priorityColor[insp.priority]}>{insp.priority} priority</span>
                          <span className={insp.status === 'completed' ? 'badge-green' : 'badge-amber'}>{insp.status}</span>
                          {insp.result && <span className={resultColor[insp.result] || 'badge-gray'}>{insp.result}</span>}
                        </div>
                        <h3 className="font-semibold text-stone-900">{insp.propertyTitle}</h3>
                        <p className="text-sm text-stone-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5" />{insp.propertyAddress}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-stone-500 mt-2">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{insp.scheduledDate} · {insp.scheduledTime}</span>
                          <span>Host: {insp.hostName}</span>
                          {insp.inspectorName && <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-brand-700 mr-0.5" />{insp.inspectorName}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        {insp.status !== 'completed' && (
                          <button onClick={() => setShowAssignModal(insp.id)} className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5" /> {insp.inspectorName ? 'Reassign' : 'Assign'}
                          </button>
                        )}
                        {insp.status === 'completed' && (
                          <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                            <ClipboardList className="w-3.5 h-3.5" /> Report
                          </button>
                        )}
                      </div>
                    </div>

                    {insp.notes && (
                      <div className="mt-3 pt-3 border-t border-stone-100">
                        <p className="text-xs text-stone-500 font-medium mb-1">Inspector Notes:</p>
                        <p className="text-xs text-stone-700">{insp.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inspector performance sidebar */}
            <div className="lg:w-72 space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-stone-900 mb-4">Inspector Performance</h3>
                <div className="space-y-4">
                  {[
                    { name: 'James Odhiambo', completions: 23, rating: 4.9, pending: 2 },
                    { name: 'Grace Mutua', completions: 18, rating: 4.7, pending: 1 },
                    { name: 'Peter Kariuki', completions: 31, rating: 4.8, pending: 3 },
                  ].map(inspector => (
                    <div key={inspector.name} className="p-3 bg-stone-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-ocean-100 rounded-full flex items-center justify-center text-xs font-bold text-ocean-700 shrink-0">
                          {inspector.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-stone-900 truncate">{inspector.name}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <p className="font-bold text-stone-900">{inspector.completions}</p>
                          <p className="text-stone-400">Done</p>
                        </div>
                        <div>
                          <p className="font-bold text-amber-600">{inspector.pending}</p>
                          <p className="text-stone-400">Pending</p>
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 flex items-center justify-center gap-0.5"><Star className="w-3 h-3 fill-savanna-500 text-savanna-500" />{inspector.rating}</p>
                          <p className="text-stone-400">Rating</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

      {/* Assign Inspector Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 animate-slide-up">
            <h3 className="font-display text-xl font-bold text-stone-900 mb-4">Assign Inspector</h3>
            <div className="space-y-2 mb-5">
              {INSPECTORS.concat([
                { id: 'insp1', name: 'James Odhiambo', role: 'inspector', email: '', status: 'active', joined: '', bookings: 0, properties: 0 },
                { id: 'insp2', name: 'Grace Mutua', role: 'inspector', email: '', status: 'active', joined: '', bookings: 0, properties: 0 },
              ] as typeof INSPECTORS).filter((i, idx, arr) => arr.findIndex(j => j.name === i.name) === idx).map(inspector => (
                <label key={inspector.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedInspector === inspector.id ? 'border-brand-700 bg-brand-50' : 'border-stone-100 hover:border-stone-200'}`}>
                  <input type="radio" name="inspector" value={inspector.id} checked={selectedInspector === inspector.id} onChange={e => setSelectedInspector(e.target.value)} className="sr-only" />
                  <div className="w-9 h-9 bg-ocean-100 rounded-full flex items-center justify-center text-xs font-bold text-ocean-700 shrink-0">
                    {inspector.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{inspector.name}</p>
                    <p className="text-xs text-stone-500">Available</p>
                  </div>
                  {selectedInspector === inspector.id && <CheckCircle className="w-5 h-5 text-brand-700 ml-auto" />}
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAssignModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => { setShowAssignModal(null); setSelectedInspector(''); }} className="btn-primary flex-1">Assign</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
