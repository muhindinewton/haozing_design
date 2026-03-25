'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { User, Mail, Phone, Lock, Globe, Bell, Shield, Trash2, Camera, Check, ChevronRight, LogOut, Star } from 'lucide-react';

export default function ProfilePage() {
  const [tab, setTab] = useState<'info'|'privacy'|'notifications'>('info');
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Brian Otieno',
    email: 'brian@example.com',
    phone: '+254 712 345 678',
    bio: 'Adventure lover and frequent traveler across Kenya.',
    language: 'English',
  });

  return (
    <div className="min-h-screen bg-surface mobile-bottom-nav-clearance">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Profile hero */}
        <div className="card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center text-4xl border-4 border-white shadow-lg">
              👤
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-brand-700 text-white rounded-full flex items-center justify-center shadow-md hover:bg-brand-800 transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-display text-2xl font-bold text-stone-900 mb-0.5">{profile.name}</h1>
            <p className="text-stone-500 text-sm">{profile.email}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
              <span className="verified-badge"><Check className="w-3 h-3" /> Email verified</span>
              <span className="verified-badge"><Check className="w-3 h-3" /> Phone verified</span>
              <span className="badge-amber"><Star className="w-3 h-3" /> 4.9 Guest Rating</span>
            </div>
          </div>
          <button onClick={() => setEditing(!editing)} className={editing ? 'btn-primary py-2 px-4 text-sm' : 'btn-secondary py-2 px-4 text-sm'}>
            {editing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 mb-6">
          {[
            { key: 'info', label: 'Personal Info' },
            { key: 'notifications', label: 'Notifications' },
            { key: 'privacy', label: 'Privacy' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${tab === t.key ? 'border-brand-700 text-brand-700' : 'border-transparent text-stone-500 hover:text-stone-900'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'info' && (
          <div className="space-y-4 animate-fade-in">
            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-4">Account Details</h3>
              <div className="space-y-4">
                {[
                  { label: 'Full Name', key: 'name', icon: User, type: 'text' },
                  { label: 'Email Address', key: 'email', icon: Mail, type: 'email' },
                  { label: 'Phone Number', key: 'phone', icon: Phone, type: 'tel' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="label">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type={field.type}
                        value={profile[field.key as keyof typeof profile]}
                        onChange={e => setProfile({...profile, [field.key]: e.target.value})}
                        disabled={!editing}
                        className={`input-field pl-10 ${!editing ? 'bg-stone-50 cursor-default' : ''}`}
                      />
                    </div>
                  </div>
                ))}
                <div>
                  <label className="label">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={e => setProfile({...profile, bio: e.target.value})}
                    disabled={!editing}
                    rows={3}
                    className={`input-field resize-none ${!editing ? 'bg-stone-50 cursor-default' : ''}`}
                  />
                </div>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-4">Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-stone-400" />
                    <div>
                      <p className="text-sm font-medium text-stone-900">Language</p>
                      <p className="text-xs text-stone-500">English</p>
                    </div>
                  </div>
                  <button className="text-sm text-brand-700 font-semibold hover:underline">Change</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-stone-400" />
                    <div>
                      <p className="text-sm font-medium text-stone-900">Password</p>
                      <p className="text-xs text-stone-500">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button className="text-sm text-brand-700 font-semibold hover:underline">Update</button>
                </div>
              </div>
            </div>

            <div className="card p-5 border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-stone-400" />
                  <p className="text-sm font-medium text-stone-900">Sign Out</p>
                </div>
                <button className="text-sm text-stone-600 font-semibold hover:text-stone-900 transition-colors">Sign out</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="card p-5 animate-fade-in">
            <h3 className="font-semibold text-stone-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Booking confirmations', desc: 'When a booking is confirmed or cancelled', default: true },
                { label: 'Check-in reminders', desc: '24 hours before check-in', default: true },
                { label: 'Promotional offers', desc: 'Deals, discounts, and special offers', default: false },
                { label: 'New messages', desc: 'When you receive a message from a host', default: true },
                { label: 'Review reminders', desc: 'After your stay ends', default: true },
                { label: 'Price alerts', desc: 'When saved property prices drop', default: false },
              ].map((n, i) => (
                <div key={n.label} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-stone-900">{n.label}</p>
                    <p className="text-xs text-stone-500">{n.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={n.default} className="sr-only peer" />
                    <div className="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:bg-brand-700 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'privacy' && (
          <div className="space-y-4 animate-fade-in">
            <div className="card p-5">
              <h3 className="font-semibold text-stone-900 mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                {[
                  { label: 'Profile visibility', desc: 'Who can see your profile', value: 'Public' },
                  { label: 'Show booking history', desc: 'Let hosts see past booking history', value: 'Hosts only' },
                  { label: 'Data sharing', desc: 'Analytics and improvements', value: 'Opted in' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-stone-900">{item.label}</p>
                      <p className="text-xs text-stone-500">{item.desc}</p>
                    </div>
                    <button className="flex items-center gap-1 text-sm text-stone-700 hover:text-brand-700 transition-colors">
                      {item.value} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5 border border-red-100">
              <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Danger Zone</h3>
              <p className="text-sm text-stone-500 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <button className="text-sm font-semibold text-red-600 hover:text-red-700 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
