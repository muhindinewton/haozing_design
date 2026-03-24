'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { INSPECTIONS, INSPECTION_CHECKLIST } from '@/lib/data';
import { ArrowLeft, MapPin, Calendar, Phone, Camera, Check, X, FileText, CheckCircle } from 'lucide-react';

export default function InspectionDetailPage({ params }: { params: { id: string } }) {
  const inspection = INSPECTIONS.find(i => i.id === params.id) || INSPECTIONS[0];
  const [checklist, setChecklist] = useState(INSPECTION_CHECKLIST.map(c => ({
    ...c,
    items: c.items.map(i => ({ ...i, status: null as 'pass' | 'fail' | null }))
  })));
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const updateItem = (catIdx: number, itemIdx: number, status: 'pass' | 'fail') => {
    setChecklist(prev => {
      const n = [...prev];
      n[catIdx] = { ...n[catIdx], items: [...n[catIdx].items] };
      n[catIdx].items[itemIdx] = { ...n[catIdx].items[itemIdx], status };
      return n;
    });
  };

  const allItems = checklist.flatMap(c => c.items);
  const passed = allItems.filter(i => i.status === 'pass').length;
  const failed = allItems.filter(i => i.status === 'fail').length;
  const total = allItems.length;
  const progress = Math.round(((passed + failed) / total) * 100);
  const allDone = passed + failed === total;

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${failed === 0 ? 'bg-emerald-100' : 'bg-red-100'}`}>
            {failed === 0 ? <CheckCircle className="w-10 h-10 text-emerald-600" /> : <X className="w-10 h-10 text-red-600" />}
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
            Inspection {failed === 0 ? 'Passed' : 'Report Submitted'}
          </h1>
          <p className="text-stone-500 mb-2">{passed}/{total} items passed · {failed} issues found</p>
          <p className="text-stone-400 text-sm mb-8">Your report has been submitted. The host will be notified.</p>
          <Link href="/inspector/dashboard" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/inspector/dashboard" className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to queue
        </Link>

        {/* Property info */}
        <div className="card p-5 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-stone-900">{inspection.propertyTitle}</h1>
              <p className="text-stone-500 flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" />{inspection.propertyAddress}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-stone-600">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-stone-400" />{inspection.scheduledDate} at {inspection.scheduledTime}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-stone-400" />{inspection.hostName} · {inspection.hostPhone}</span>
              </div>
            </div>
            {/* Progress */}
            <div className="text-right">
              <p className="text-xs text-stone-500 mb-1">Completion</p>
              <p className="font-bold text-2xl text-stone-900">{progress}%</p>
              <div className="w-28 bg-stone-200 rounded-full h-2 mt-1 ml-auto">
                <div className={`h-2 rounded-full transition-all ${failed > 0 ? 'bg-red-500' : 'bg-brand-700'}`} style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Score bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card text-center bg-emerald-50 border-emerald-100">
            <p className="font-bold text-2xl text-emerald-600">{passed}</p>
            <p className="text-xs text-emerald-600 font-medium">Passed</p>
          </div>
          <div className="stat-card text-center bg-red-50 border-red-100">
            <p className="font-bold text-2xl text-red-600">{failed}</p>
            <p className="text-xs text-red-600 font-medium">Failed</p>
          </div>
          <div className="stat-card text-center">
            <p className="font-bold text-2xl text-stone-400">{total - passed - failed}</p>
            <p className="text-xs text-stone-400 font-medium">Remaining</p>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-5 mb-6">
          {checklist.map((category, catIdx) => {
            const catPassed = category.items.filter(i => i.status === 'pass').length;
            const catTotal = category.items.length;
            return (
              <div key={category.category} className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-stone-900">{category.category}</h3>
                  <span className="text-xs text-stone-400 font-medium">{catPassed}/{catTotal} done</span>
                </div>
                <div className="space-y-2.5">
                  {category.items.map((item, itemIdx) => (
                    <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${item.status === 'pass' ? 'bg-emerald-50 border border-emerald-100' : item.status === 'fail' ? 'bg-red-50 border border-red-100' : 'bg-stone-50 border border-transparent'}`}>
                      <span className="text-sm text-stone-700 flex-1 leading-snug">{item.label}</span>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => updateItem(catIdx, itemIdx, 'pass')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${item.status === 'pass' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white border border-stone-200 text-stone-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                        >
                          <Check className="w-3 h-3" /> Pass
                        </button>
                        <button
                          onClick={() => updateItem(catIdx, itemIdx, 'fail')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${item.status === 'fail' ? 'bg-red-500 text-white shadow-sm' : 'bg-white border border-stone-200 text-stone-500 hover:border-red-400 hover:text-red-600 hover:bg-red-50'}`}
                        >
                          <X className="w-3 h-3" /> Fail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes */}
        <div className="card p-5 mb-4">
          <label className="label">Inspector Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            placeholder="Add observations, recommendations, or issues not covered in the checklist..."
            className="input-field resize-none"
          />
        </div>

        {/* Photos */}
        <div className="card p-5 mb-6">
          <label className="label">Photo Evidence</label>
          <button className="border-2 border-dashed border-stone-200 rounded-xl p-5 w-full flex items-center justify-center gap-3 text-stone-400 hover:border-brand-400 hover:text-brand-600 transition-all">
            <Camera className="w-5 h-5" />
            <span className="text-sm font-medium">Tap to add photos</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {/* save draft */}}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" /> Save Draft
          </button>
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allDone}
            className={`flex-1 flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${allDone && failed === 0 ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : allDone ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-stone-300 text-stone-500 cursor-not-allowed'}`}
          >
            <CheckCircle className="w-4 h-4" />
            {!allDone ? `Complete checklist (${total - passed - failed} left)` : failed === 0 ? 'Submit: PASS' : 'Submit Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
