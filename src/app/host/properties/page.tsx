'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { HOST_PROPERTIES } from '@/lib/data';
import { Plus, Edit, Trash2, Eye, Pause, Play, Copy, MoreVertical, Star, TrendingUp, Shield, Upload, ChevronRight, X } from 'lucide-react';

export default function HostPropertiesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');

  const PROPERTY_TYPES = [
    { value: 'apartment', label: 'Apartment', emoji: '🏢' },
    { value: 'villa', label: 'Villa', emoji: '🏡' },
    { value: 'studio', label: 'Studio', emoji: '🏠' },
    { value: 'cottage', label: 'Cottage', emoji: '🛖' },
    { value: 'house', label: 'House', emoji: '🏘️' },
    { value: 'hotel', label: 'Hotel Room', emoji: '🏨' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar role="host" />
      <div className="flex max-w-[1400px] mx-auto">
        <DashboardSidebar role="host" />
        <main className="flex-1 min-w-0 px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="page-header">My Properties</h1>
              <p className="page-subtitle">Manage and monitor all your listings</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Property
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Properties', value: HOST_PROPERTIES.length, color: 'brand' },
              { label: 'Active Listings', value: HOST_PROPERTIES.filter(p => p.status === 'active').length, color: 'emerald' },
              { label: 'Pending Verification', value: HOST_PROPERTIES.filter(p => p.verificationStatus !== 'verified').length, color: 'amber' },
            ].map(s => (
              <div key={s.label} className="stat-card text-center">
                <p className={`font-display text-3xl font-bold ${s.color === 'brand' ? 'text-brand-700' : s.color === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`}>{s.value}</p>
                <p className="text-xs text-stone-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Properties list */}
          <div className="space-y-4">
            {HOST_PROPERTIES.map(p => (
              <div key={p.id} className="card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-40 sm:h-auto relative overflow-hidden">
                    <img src={p.image} className="w-full h-full object-cover" alt={p.title} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'; }} />
                    <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full ${p.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-stone-500 text-white'}`}>
                      {p.status === 'active' ? '● Live' : '⏸ Paused'}
                    </div>
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-stone-900 text-lg">{p.title}</h3>
                        <p className="text-sm text-stone-500">{p.location} · {p.type}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`badge ${p.verificationStatus === 'verified' ? 'badge-green' : 'badge-amber'}`}>
                            <Shield className="w-3 h-3" />
                            {p.verificationStatus === 'verified' ? 'Verified' : 'Pending verification'}
                          </span>
                          {p.avgRating > 0 && (
                            <span className="badge-amber"><Star className="w-3 h-3 fill-current" />{p.avgRating}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 transition-all" title="View listing">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 transition-all" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 transition-all" title={p.status === 'active' ? 'Pause' : 'Activate'}>
                          {p.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 transition-all" title="Duplicate">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-stone-100">
                      <div>
                        <p className="text-xs text-stone-400">Monthly Earnings</p>
                        <p className="font-bold text-stone-900">KSh {p.earnings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-400">Bookings (month)</p>
                        <p className="font-bold text-stone-900">{p.bookingsThisMonth}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href="/host/calendar" className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Pricing
                        </Link>
                        <Link href="/host/calendar" className="btn-secondary text-xs py-1.5 px-3">
                          Calendar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900">Add New Property</h2>
                <p className="text-stone-500 text-sm">Step {step} of 4</p>
              </div>
              <button onClick={() => { setShowAddModal(false); setStep(1); }} className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {[1,2,3,4].map(s => (
                  <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-brand-700' : 'bg-stone-100'}`} />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg mb-4">What type of property?</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {PROPERTY_TYPES.map(t => (
                      <button key={t.value} onClick={() => setPropertyType(t.value)} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${propertyType === t.value ? 'border-brand-700 bg-brand-50' : 'border-stone-200 hover:border-stone-300'}`}>
                        <span className="text-2xl">{t.emoji}</span>
                        <span className="text-sm font-semibold text-stone-700">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-stone-900 text-lg mb-4">Property Details</h3>
                  <div>
                    <label className="label">Property Name / Title</label>
                    <input type="text" placeholder="e.g. Luxury Nyali Ocean View Apartment" className="input-field" />
                  </div>
                  <div>
                    <label className="label">Address</label>
                    <input type="text" placeholder="Street address" className="input-field mb-2" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="City" className="input-field" />
                      <input type="text" placeholder="County" className="input-field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Bedrooms', icon: '🛏️' },
                      { label: 'Bathrooms', icon: '🚿' },
                      { label: 'Max Guests', icon: '👥' },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="label">{f.icon} {f.label}</label>
                        <input type="number" min="1" defaultValue="1" className="input-field" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg mb-4">Upload Photos & Videos</h3>
                  <div className="border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center hover:border-brand-700 transition-colors cursor-pointer mb-4">
                    <Upload className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                    <p className="font-semibold text-stone-700">Drop files here or click to upload</p>
                    <p className="text-sm text-stone-500 mt-1">JPG, PNG, MP4 — Max 50MB per file</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="aspect-square bg-stone-100 rounded-xl flex items-center justify-center text-stone-400">
                        <Plus className="w-6 h-6" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-stone-900 text-lg mb-4">Pricing & Availability</h3>
                  <div>
                    <label className="label">Base Nightly Rate (KSh)</label>
                    <input type="number" placeholder="e.g. 8500" className="input-field" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Cleaning Fee (KSh)</label>
                      <input type="number" placeholder="e.g. 1500" className="input-field" />
                    </div>
                    <div>
                      <label className="label">Security Deposit (KSh)</label>
                      <input type="number" placeholder="e.g. 5000" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Minimum Stay (nights)</label>
                    <input type="number" min="1" defaultValue="1" className="input-field" />
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm text-amber-800 font-medium">⚠️ Your property will require an inspection before going live. An inspector will be assigned within 2-3 business days.</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-8">
                {step > 1 && <button onClick={() => setStep(step - 1)} className="btn-secondary flex-1">Back</button>}
                <button
                  onClick={() => step < 4 ? setStep(step + 1) : setShowAddModal(false)}
                  className="btn-primary flex-1"
                >
                  {step === 4 ? 'Submit Property' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
