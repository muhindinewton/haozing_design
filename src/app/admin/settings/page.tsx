'use client';
import { useState } from 'react';
import {
  Settings, Bell, Shield, Globe, CreditCard, Mail, User, Lock,
  Save, CheckCircle
} from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Navbar from '@/components/layout/Navbar';

const SETTINGS_TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'payments', label: 'Payments', icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">Settings</h1>
                <p className="text-stone-500">Manage platform configuration</p>
              </div>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-brand-700 text-white hover:bg-brand-800'
                }`}
              >
                {saved ? (
                  <><CheckCircle className="w-4 h-4" /> Saved</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Changes</>
                )}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Tabs */}
              <div className="lg:w-64 shrink-0">
                <nav className="space-y-1">
                  {SETTINGS_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-brand-100 text-brand-700 font-medium'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h3 className="font-semibold text-stone-900 mb-4">Platform Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Platform Name</label>
                          <input type="text" defaultValue="Haozing" className="input-field" />
                        </div>
                        <div>
                          <label className="label">Support Email</label>
                          <input type="email" defaultValue="support@haozing.co.ke" className="input-field" />
                        </div>
                        <div>
                          <label className="label">Default Currency</label>
                          <select className="input-field">
                            <option>Kenyan Shilling (KSh)</option>
                            <option>US Dollar ($)</option>
                            <option>Euro (€)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="card p-6">
                      <h3 className="font-semibold text-stone-900 mb-4">Regional Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Default Language</label>
                          <select className="input-field">
                            <option>English</option>
                            <option>Swahili</option>
                          </select>
                        </div>
                        <div>
                          <label className="label">Timezone</label>
                          <select className="input-field">
                            <option>Africa/Nairobi (EAT)</option>
                            <option>UTC</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="card p-6">
                    <h3 className="font-semibold text-stone-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'New booking alerts', desc: 'Notify when a new booking is made', default: true },
                        { label: 'User registration', desc: 'Notify when a new user signs up', default: true },
                        { label: 'Property submissions', desc: 'Notify when a property is submitted for review', default: true },
                        { label: 'Inspection reports', desc: 'Notify when inspection reports are submitted', default: false },
                        { label: 'Payment confirmations', desc: 'Notify for payment transactions', default: true },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start justify-between py-3 border-b border-stone-100 last:border-0">
                          <div>
                            <p className="font-medium text-stone-900">{item.label}</p>
                            <p className="text-sm text-stone-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                            <div className="w-11 h-6 bg-stone-200 peer-focus:ring-2 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h3 className="font-semibold text-stone-900 mb-4">Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Current Password</label>
                          <input type="password" placeholder="••••••••" className="input-field" />
                        </div>
                        <div>
                          <label className="label">New Password</label>
                          <input type="password" placeholder="Enter new password" className="input-field" />
                        </div>
                        <div>
                          <label className="label">Confirm New Password</label>
                          <input type="password" placeholder="Confirm new password" className="input-field" />
                        </div>
                      </div>
                    </div>

                    <div className="card p-6">
                      <h3 className="font-semibold text-stone-900 mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-stone-900">Enable 2FA</p>
                          <p className="text-sm text-stone-500">Require 2FA for admin access</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-stone-200 peer-focus:ring-2 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600" />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h3 className="font-semibold text-stone-900 mb-4">Payment Methods</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'M-Pesa', status: 'Active', icon: '📱' },
                          { name: 'Bank Transfer', status: 'Active', icon: '🏦' },
                          { name: 'Credit/Debit Card', status: 'Active', icon: '💳' },
                        ].map((method) => (
                          <div key={method.name} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{method.icon}</span>
                              <div>
                                <p className="font-medium text-stone-900">{method.name}</p>
                                <span className="text-xs text-green-600 font-medium">{method.status}</span>
                              </div>
                            </div>
                            <button className="text-sm text-brand-700 font-medium hover:underline">Configure</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="card p-6">
                      <h3 className="font-semibold text-stone-900 mb-4">Commission Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Platform Commission (%)</label>
                          <input type="number" defaultValue="10" className="input-field" />
                        </div>
                        <div>
                          <label className="label">Minimum Payout (KSh)</label>
                          <input type="number" defaultValue="5000" className="input-field" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
