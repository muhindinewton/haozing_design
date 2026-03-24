'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bell, MessageCircle, Heart, User, Search, Menu, X, Home, MapPin, Compass } from 'lucide-react';
import { NOTIFICATIONS } from '@/lib/data';

export default function Navbar({ role = 'guest' }: { role?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-stone-900">Haozing</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/discover" className="sidebar-link text-stone-600 hover:text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 transition-all">Discover</Link>
          <Link href="/search" className="sidebar-link text-stone-600 hover:text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 transition-all">Search</Link>
          {role === 'guest' && <Link href="/trips" className="sidebar-link text-stone-600 hover:text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 transition-all">My Trips</Link>}
          {role === 'host' && <Link href="/host/dashboard" className="sidebar-link text-stone-600 hover:text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 transition-all">Host Dashboard</Link>}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="p-2 rounded-lg hover:bg-stone-100 transition-all text-stone-600 hidden md:flex">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/saved" className="p-2 rounded-lg hover:bg-stone-100 transition-all text-stone-600 hidden md:flex">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="/messages" className="p-2 rounded-lg hover:bg-stone-100 transition-all text-stone-600 hidden md:flex">
            <MessageCircle className="w-5 h-5" />
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-lg hover:bg-stone-100 transition-all text-stone-600 relative"
            >
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50 animate-slide-up">
                <div className="p-4 border-b border-stone-100">
                  <h3 className="font-display font-semibold text-stone-900">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {NOTIFICATIONS.map(n => (
                    <div className={`p-4 border-b border-stone-50 hover:bg-stone-50 cursor-pointer ${!n.read ? 'bg-brand-50' : ''}`}>
                      <div className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-brand-700' : 'bg-transparent'}`} />
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{n.title}</p>
                          <p className="text-xs text-stone-500 mt-0.5">{n.message}</p>
                          <p className="text-xs text-stone-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/profile" className="flex items-center gap-2 ml-1 px-3 py-2 rounded-xl border border-stone-200 hover:border-stone-300 transition-all">
            <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-brand-700" />
            </div>
            <span className="text-sm font-medium text-stone-700 hidden md:block">Profile</span>
          </Link>

          {/* Mobile menu */}
          <button className="p-2 rounded-lg hover:bg-stone-100 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-1 animate-slide-up">
          <Link href="/discover" className="sidebar-link" onClick={() => setMenuOpen(false)}><Compass className="w-4 h-4" /> Discover</Link>
          <Link href="/search" className="sidebar-link" onClick={() => setMenuOpen(false)}><Search className="w-4 h-4" /> Search</Link>
          <Link href="/trips" className="sidebar-link" onClick={() => setMenuOpen(false)}><MapPin className="w-4 h-4" /> My Trips</Link>
          <Link href="/saved" className="sidebar-link" onClick={() => setMenuOpen(false)}><Heart className="w-4 h-4" /> Saved</Link>
          <Link href="/messages" className="sidebar-link" onClick={() => setMenuOpen(false)}><MessageCircle className="w-4 h-4" /> Messages</Link>
          {role === 'host' && <Link href="/host/dashboard" className="sidebar-link" onClick={() => setMenuOpen(false)}><Home className="w-4 h-4" /> Host Dashboard</Link>}
        </div>
      )}
    </header>
  );
}
