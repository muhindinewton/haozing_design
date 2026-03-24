'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { ChevronLeft, ChevronRight, Plus, Trash2, Zap, TrendingUp } from 'lucide-react';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function HostCalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March
  const [blocked, setBlocked] = useState<Set<string>>(new Set(['2026-3-10','2026-3-11','2026-3-12']));
  const [booked, setBooked] = useState<Set<string>>(new Set(['2026-3-15','2026-3-16','2026-3-17','2026-3-18']));
  const [view, setView] = useState<'month'|'week'>('month');
  const [basePrice, setBasePrice] = useState(8500);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); };

  const key = (d: number) => `${year}-${month+1}-${d}`;
  const toggleBlock = (d: number) => {
    const k = key(d);
    if (booked.has(k)) return;
    setBlocked(prev => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar role="host" />
      <div className="flex max-w-[1400px] mx-auto">
        <DashboardSidebar role="host" />
        <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="page-header">Availability Calendar</h1>
              <p className="page-subtitle">Manage blocked dates and pricing</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary py-2 px-4 text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Block Dates</button>
              <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4" /> AI Pricing</button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Calendar */}
            <div className="flex-1">
              <div className="card p-5">
                {/* Nav */}
                <div className="flex items-center justify-between mb-5">
                  <button onClick={prevMonth} className="w-9 h-9 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-all"><ChevronLeft className="w-5 h-5" /></button>
                  <h3 className="font-display text-xl font-semibold text-stone-900">{MONTHS[month]} {year}</h3>
                  <button onClick={nextMonth} className="w-9 h-9 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-all"><ChevronRight className="w-5 h-5" /></button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map(d => <div key={d} className="text-center text-xs font-bold text-stone-400 py-2">{d}</div>)}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({length: firstDay}).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({length: daysInMonth}).map((_, i) => {
                    const d = i + 1;
                    const k = key(d);
                    const isBooked = booked.has(k);
                    const isBlocked = blocked.has(k);
                    const today = new Date();
                    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
                    return (
                      <button
                        key={d}
                        onClick={() => toggleBlock(d)}
                        className={`relative aspect-square rounded-xl text-sm font-medium flex flex-col items-center justify-center transition-all hover:scale-105 ${
                          isBooked ? 'bg-ocean-700 text-white cursor-default' :
                          isBlocked ? 'bg-stone-700 text-white' :
                          isToday ? 'ring-2 ring-brand-700 text-brand-700 font-bold' :
                          'hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span>{d}</span>
                        {isBooked && <span className="text-[8px] opacity-80 leading-none">Booked</span>}
                        {isBlocked && !isBooked && <span className="text-[8px] opacity-80 leading-none">Blocked</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-5 pt-4 border-t border-stone-100 flex-wrap">
                  {[
                    { color: 'bg-ocean-700', label: 'Booked' },
                    { color: 'bg-stone-700', label: 'Blocked' },
                    { color: 'bg-white ring-2 ring-brand-700', label: 'Today' },
                    { color: 'bg-stone-50', label: 'Available (click to block)' },
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${l.color}`} />
                      <span className="text-xs text-stone-500">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-72 space-y-4">
              {/* Pricing settings */}
              <div className="card p-5">
                <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-brand-700" /> Pricing</h3>
                <div className="space-y-3">
                  <div>
                    <label className="label">Base Nightly Rate</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-semibold">KSh</span>
                      <input type="number" value={basePrice} onChange={e => setBasePrice(Number(e.target.value))} className="input-field pl-12" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Weekend Premium</label>
                    <select className="input-field">
                      <option>+20%</option>
                      <option>+30%</option>
                      <option>+50%</option>
                      <option>No premium</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Minimum Stay</label>
                    <select className="input-field">
                      <option>1 night</option>
                      <option>2 nights</option>
                      <option>3 nights</option>
                      <option>7 nights</option>
                    </select>
                  </div>
                  <button className="btn-primary w-full text-sm py-2.5">Save Pricing</button>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="card p-5 bg-gradient-to-br from-brand-50 to-amber-50 border-brand-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-brand-700" />
                  <h3 className="font-semibold text-stone-900 text-sm">AI Price Suggestion</h3>
                </div>
                <p className="text-2xl font-display font-bold text-brand-700 mb-1">KSh 9,200</p>
                <p className="text-xs text-stone-600 mb-3">Suggested for this weekend based on demand (+8% above your rate)</p>
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary text-xs py-2">Apply</button>
                  <button className="flex-1 btn-secondary text-xs py-2">Ignore</button>
                </div>
              </div>

              {/* Calendar sync */}
              <div className="card p-5">
                <h3 className="font-semibold text-stone-900 mb-3 text-sm">Calendar Sync</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Google Calendar', icon: '📅', connected: true },
                    { label: 'iCal', icon: '🗓️', connected: false },
                    { label: 'Airbnb', icon: '🏠', connected: false },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-sm text-stone-700">{s.icon} {s.label}</span>
                      <button className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all ${s.connected ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                        {s.connected ? '✓ Synced' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
