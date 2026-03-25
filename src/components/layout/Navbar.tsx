'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, MessageCircle, Heart, User, Search, Home } from 'lucide-react';
import { NOTIFICATIONS } from '@/lib/data';
import MobileBottomNav from './MobileBottomNav';

export type NavbarRole = 'guest' | 'host' | 'admin' | 'inspector';

export default function Navbar({ role = 'guest' }: { role?: NavbarRole }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--mobile-navbar-offset',
      mobileHeaderHidden && !notifOpen ? '0px' : '4rem'
    );

    return () => {
      root.style.setProperty('--mobile-navbar-offset', '0px');
    };
  }, [mobileHeaderHidden, notifOpen]);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY <= 24) {
        setMobileHeaderHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 96 && !notifOpen) {
        setMobileHeaderHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setMobileHeaderHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [notifOpen]);

  return (
    <>
      <header className={`sticky top-0 z-50 border-b border-stone-100 bg-white/90 shadow-sm backdrop-blur-md transition-transform duration-300 md:translate-y-0 ${
        mobileHeaderHidden ? '-translate-y-full' : 'translate-y-0'
      }`}>
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
            {role === 'admin' && <Link href="/admin/dashboard" className="sidebar-link text-stone-600 hover:text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 transition-all">Admin Dashboard</Link>}
            {role === 'inspector' && <Link href="/inspector/dashboard" className="sidebar-link text-stone-600 hover:text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 transition-all">Inspector Dashboard</Link>}
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
                <>
                  <button
                    aria-label="Close notifications"
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
                    onClick={() => setNotifOpen(false)}
                  />
                  <div className="fixed inset-x-4 top-[calc(env(safe-area-inset-top)+4.5rem)] z-50 overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-2xl md:absolute md:inset-x-auto md:right-0 md:top-12 md:w-80 md:rounded-2xl">
                    <div className="flex items-center justify-between border-b border-stone-100 px-4 py-4">
                      <h3 className="font-display font-semibold text-stone-900">Notifications</h3>
                      <button
                        onClick={() => setNotifOpen(false)}
                        className="rounded-full px-2 py-1 text-xs font-semibold text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 md:hidden"
                      >
                        Close
                      </button>
                    </div>
                    <div className="max-h-[min(26rem,calc(100vh-7rem-env(safe-area-inset-bottom)))] overflow-y-auto md:max-h-80">
                      {NOTIFICATIONS.map((n, index) => (
                        <div
                          key={`${n.title}-${n.time}-${index}`}
                          className={`border-b border-stone-50 p-4 hover:bg-stone-50 ${!n.read ? 'bg-brand-50' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!n.read ? 'bg-brand-700' : 'bg-transparent'}`} />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-stone-900">{n.title}</p>
                              <p className="mt-0.5 text-xs leading-6 text-stone-500">{n.message}</p>
                              <p className="mt-1 text-xs text-stone-400">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link href="/profile" className="flex items-center gap-2 ml-1 px-3 py-2 rounded-xl border border-stone-200 hover:border-stone-300 transition-all">
              <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-brand-700" />
              </div>
              <span className="text-sm font-medium text-stone-700 hidden md:block">Profile</span>
            </Link>

          </div>
        </div>
      </header>
      <MobileBottomNav role={role} />
    </>
  );
}
