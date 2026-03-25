'use client';
import { useState } from 'react';
import { INSPECTIONS, INSPECTOR_STATS } from '@/lib/data';
import { MapPin, Clock, Phone, Calendar, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Navigation } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const SCHEDULE_ITEMS = INSPECTIONS.map(i => ({
  ...i,
  dateKey: i.scheduledDate,
}));

export default function InspectorSchedulePage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const dateKey = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const getInspForDate = (d: number) => SCHEDULE_ITEMS.filter(i => i.dateKey === dateKey(d));

  const selectedInspections = selectedDate
    ? SCHEDULE_ITEMS.filter(i => i.dateKey === selectedDate)
    : SCHEDULE_ITEMS.filter(i => i.status === 'pending').slice(0, 3);

  const upcoming = SCHEDULE_ITEMS.filter(i => i.status === 'pending')
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));

  const priorityColor = (p: string) => ({
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-stone-100 text-stone-600',
  }[p] || 'bg-stone-100 text-stone-600');

  return (
    <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="page-header">My Schedule</h1>
              <p className="page-subtitle">Upcoming inspections and availability</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600 bg-white border border-stone-200 rounded-xl px-4 py-2">
              <Navigation className="w-4 h-4 text-brand-700" />
              <span><strong className="text-stone-900">{INSPECTOR_STATS.scheduledThisWeek}</strong> inspections this week</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Scheduled This Week', value: INSPECTOR_STATS.scheduledThisWeek, color: 'brand', icon: Calendar },
              { label: 'Pending Assignment', value: INSPECTOR_STATS.pendingInspections, color: 'amber', icon: Clock },
              { label: 'Completed This Month', value: INSPECTOR_STATS.completedThisMonth, color: 'emerald', icon: CheckCircle },
            ].map(s => (
              <div key={s.label} className="stat-card flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color === 'brand' ? 'bg-brand-100' : s.color === 'amber' ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                  <s.icon className={`w-6 h-6 ${s.color === 'brand' ? 'text-brand-700' : s.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-stone-900">{s.value}</p>
                  <p className="text-xs text-stone-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="card p-5">
                <div className="flex items-center justify-between mb-5">
                  <button onClick={prevMonth} className="w-9 h-9 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-display text-xl font-semibold text-stone-900">{MONTHS[month]} {year}</h3>
                  <button onClick={nextMonth} className="w-9 h-9 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map(d => <div key={d} className="text-center text-xs font-bold text-stone-400 py-2">{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d = i + 1;
                    const k = dateKey(d);
                    const insp = getInspForDate(d);
                    const today = new Date();
                    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
                    const isSelected = selectedDate === k;
                    const hasPending = insp.some(x => x.status === 'pending');
                    const hasCompleted = insp.some(x => x.status === 'completed');

                    return (
                      <button
                        key={d}
                        onClick={() => setSelectedDate(k === selectedDate ? null : k)}
                        className={`relative aspect-square rounded-xl text-sm font-medium flex flex-col items-center justify-center transition-all hover:scale-105 ${
                          isSelected ? 'bg-brand-700 text-white' :
                          isToday ? 'ring-2 ring-brand-700 text-brand-700 font-bold' :
                          'hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span>{d}</span>
                        {insp.length > 0 && (
                          <div className="flex gap-0.5 mt-0.5">
                            {hasPending && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-amber-500'}`} />}
                            {hasCompleted && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`} />}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4 mt-5 pt-4 border-t border-stone-100">
                  {[
                    { color: 'bg-amber-500', label: 'Pending inspection' },
                    { color: 'bg-emerald-500', label: 'Completed' },
                    { color: 'ring-2 ring-brand-700 bg-white', label: 'Today' },
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${l.color}`} />
                      <span className="text-xs text-stone-500">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — selected day or upcoming */}
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-stone-900 mb-4">
                  {selectedDate ? `Inspections — ${selectedDate}` : 'Upcoming Inspections'}
                </h3>
                {(selectedDate ? selectedInspections : upcoming).length === 0 ? (
                  <p className="text-sm text-stone-500 py-4 text-center">No inspections on this date</p>
                ) : (
                  <div className="space-y-4">
                    {(selectedDate ? selectedInspections : upcoming).map(insp => (
                      <div key={insp.id} className="border border-stone-100 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColor(insp.priority)}`}>
                            {insp.priority}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${insp.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {insp.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-stone-900">{insp.propertyTitle}</p>
                        <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {insp.propertyAddress}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-stone-600">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{insp.scheduledTime}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{insp.hostPhone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Availability toggle */}
              <div className="card p-5">
                <h3 className="font-semibold text-stone-900 mb-3">Availability</h3>
                <div className="space-y-3">
                  {['Mon–Fri (9 AM–6 PM)', 'Saturday (9 AM–1 PM)', 'Sunday'].map((day, i) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm text-stone-700">{day}</span>
                      <button className={`relative w-10 h-5 rounded-full transition-colors ${i < 2 ? 'bg-brand-700' : 'bg-stone-200'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${i < 2 ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </main>
  );
}
