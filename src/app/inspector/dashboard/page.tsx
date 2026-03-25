'use client';
import { useState } from 'react';
import { INSPECTIONS, INSPECTION_CHECKLIST } from '@/lib/data';
import { MapPin, Calendar, Phone, CheckCircle, XCircle, Clock, ChevronRight, Camera, FileText, X, Check } from 'lucide-react';

export default function InspectorDashboardPage() {
  const [activeInspection, setActiveInspection] = useState<string | null>(null);
  const [checklist, setChecklist] = useState(INSPECTION_CHECKLIST.map(c => ({
    ...c, items: c.items.map(i => ({ ...i, status: null as 'pass' | 'fail' | null }))
  })));
  const [notes, setNotes] = useState('');

  const inspection = activeInspection ? INSPECTIONS.find(i => i.id === activeInspection) : null;

  const updateItem = (catIdx: number, itemIdx: number, status: 'pass' | 'fail') => {
    setChecklist(prev => {
      const n = [...prev];
      n[catIdx] = { ...n[catIdx], items: [...n[catIdx].items] };
      n[catIdx].items[itemIdx] = { ...n[catIdx].items[itemIdx], status };
      return n;
    });
  };

  const totalItems = checklist.flatMap(c => c.items).length;
  const passed = checklist.flatMap(c => c.items).filter(i => i.status === 'pass').length;
  const failed = checklist.flatMap(c => c.items).filter(i => i.status === 'fail').length;
  const progress = Math.round(((passed + failed) / totalItems) * 100);

  const priorityColor = (p: string) => ({ high: 'badge-red', medium: 'badge-amber', low: 'badge-gray' }[p] || 'badge-gray');

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          {!activeInspection ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="page-header">Inspector Dashboard</h1>
                  <p className="page-subtitle">Your assigned inspection queue</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Pending', value: INSPECTIONS.filter(i => i.status === 'pending').length, color: 'amber', icon: Clock },
                  { label: 'Completed', value: INSPECTIONS.filter(i => i.status === 'completed').length, color: 'emerald', icon: CheckCircle },
                  { label: 'This Month', value: 8, color: 'brand', icon: FileText },
                ].map(s => (
                  <div key={s.label} className="stat-card flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color === 'amber' ? 'bg-amber-100' : s.color === 'emerald' ? 'bg-emerald-100' : 'bg-brand-100'}`}>
                      <s.icon className={`w-6 h-6 ${s.color === 'amber' ? 'text-amber-600' : s.color === 'emerald' ? 'text-emerald-600' : 'text-brand-700'}`} />
                    </div>
                    <div>
                      <p className="font-display text-3xl font-bold text-stone-900">{s.value}</p>
                      <p className="text-xs text-stone-500">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inspections list */}
              <h2 className="font-semibold text-stone-900 mb-4">Inspection Queue</h2>
              <div className="space-y-4">
                {INSPECTIONS.map(insp => (
                  <div key={insp.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={priorityColor(insp.priority)}>{insp.priority} priority</span>
                          <span className={insp.status === 'completed' ? 'badge-green' : 'badge-amber'}>{insp.status}</span>
                          {insp.result && <span className={insp.result === 'passed' ? 'badge-green' : 'badge-red'}>{insp.result}</span>}
                        </div>
                        <h3 className="font-semibold text-stone-900 text-lg">{insp.propertyTitle}</h3>
                        <p className="text-sm text-stone-500 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" />{insp.propertyAddress}</p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-stone-600">
                          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-stone-400" />{insp.scheduledDate} at {insp.scheduledTime}</span>
                          <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-stone-400" />Host: {insp.hostName} · {insp.hostPhone}</span>
                        </div>
                      </div>
                      {insp.status === 'pending' && (
                        <button onClick={() => setActiveInspection(insp.id)} className="btn-primary text-sm py-2 px-4 flex items-center gap-2 shrink-0">
                          Start <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                      {insp.status === 'completed' && (
                        <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2 shrink-0">
                          <FileText className="w-4 h-4" /> View Report
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Active Inspection Checklist */
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <button onClick={() => setActiveInspection(null)} className="text-sm text-stone-500 hover:text-stone-900 mb-2 flex items-center gap-1 transition-colors">
                    ← Back to queue
                  </button>
                  <h1 className="page-header">{inspection?.propertyTitle}</h1>
                  <p className="page-subtitle">{inspection?.propertyAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-500 mb-1">Progress</p>
                  <p className="font-bold text-2xl text-stone-900">{progress}%</p>
                  <div className="w-32 bg-stone-200 rounded-full h-2 mt-1">
                    <div className="bg-brand-700 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="stat-card text-center bg-emerald-50 border-emerald-100">
                  <p className="font-bold text-2xl text-emerald-600">{passed}</p>
                  <p className="text-xs text-emerald-700 font-medium">Passed</p>
                </div>
                <div className="stat-card text-center bg-red-50 border-red-100">
                  <p className="font-bold text-2xl text-red-600">{failed}</p>
                  <p className="text-xs text-red-700 font-medium">Failed</p>
                </div>
                <div className="stat-card text-center">
                  <p className="font-bold text-2xl text-stone-500">{totalItems - passed - failed}</p>
                  <p className="text-xs text-stone-500">Remaining</p>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-6">
                {checklist.map((category, catIdx) => (
                  <div key={category.category} className="card p-5">
                    <h3 className="font-semibold text-stone-900 mb-4">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <div key={item.id} className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all ${item.status === 'pass' ? 'bg-emerald-50' : item.status === 'fail' ? 'bg-red-50' : 'bg-stone-50'}`}>
                          <span className="text-sm text-stone-700 flex-1">{item.label}</span>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => updateItem(catIdx, itemIdx, 'pass')}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${item.status === 'pass' ? 'bg-emerald-500 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-emerald-400 hover:text-emerald-600'}`}
                            >
                              <Check className="w-3.5 h-3.5" /> Pass
                            </button>
                            <button
                              onClick={() => updateItem(catIdx, itemIdx, 'fail')}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${item.status === 'fail' ? 'bg-red-500 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-red-400 hover:text-red-600'}`}
                            >
                              <X className="w-3.5 h-3.5" /> Fail
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="card p-5 mt-6">
                <h3 className="font-semibold text-stone-900 mb-3">Inspector Notes</h3>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add any additional observations, concerns, or recommendations..."
                  className="input-field resize-none"
                />
              </div>

              {/* Photo upload */}
              <div className="card p-5 mt-4">
                <h3 className="font-semibold text-stone-900 mb-3">Photo Evidence</h3>
                <button className="border-2 border-dashed border-stone-300 rounded-xl p-6 w-full flex items-center justify-center gap-3 text-stone-500 hover:border-brand-700 hover:text-brand-700 transition-colors">
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-medium">Add inspection photos</span>
                </button>
              </div>

              {/* Submit */}
              <div className="flex gap-3 mt-6">
                <button onClick={() => setActiveInspection(null)} className="btn-secondary flex-1">Save Draft</button>
                <button
                  onClick={() => setActiveInspection(null)}
                  className={`flex-1 flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all ${failed === 0 && passed === totalItems ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                  {failed === 0 && passed === totalItems ? <><CheckCircle className="w-4 h-4" /> Submit: PASS</> : <><FileText className="w-4 h-4" /> Submit Report</>}
                </button>
              </div>
            </div>
          )}
    </main>
  );
}
