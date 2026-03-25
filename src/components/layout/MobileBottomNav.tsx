'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, Compass, Home, LayoutDashboard, Search, User } from 'lucide-react';
import type { NavbarRole } from './Navbar';

type MobileBottomNavItem = {
  href: string;
  icon: typeof Home;
  label: string;
  match: string[];
};

function getItems(role: NavbarRole): MobileBottomNavItem[] {
  const centerItem =
    role === 'guest'
      ? { href: '/discover', icon: Compass, label: 'Discover', match: ['/discover'] }
      : role === 'host'
        ? { href: '/host/dashboard', icon: LayoutDashboard, label: 'Host', match: ['/host'] }
        : role === 'admin'
          ? { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Admin', match: ['/admin'] }
          : { href: '/inspector/dashboard', icon: LayoutDashboard, label: 'Inspect', match: ['/inspector'] };

  return [
    { href: '/', icon: Home, label: 'Home', match: ['/'] },
    { href: '/search', icon: Search, label: 'Search', match: ['/search'] },
    centerItem,
    { href: '/saved', icon: Bookmark, label: 'Saved', match: ['/saved'] },
    { href: '/profile', icon: User, label: 'Profile', match: ['/profile'] },
  ];
}

function isActive(pathname: string, item: MobileBottomNavItem) {
  if (item.href === '/') {
    return pathname === '/';
  }

  return item.match.some((match) => pathname.startsWith(match));
}

export default function MobileBottomNav({
  role,
  variant = 'light',
}: {
  role?: NavbarRole;
  variant?: 'light' | 'dark';
}) {
  const pathname = usePathname();
  const items = getItems(role ?? 'guest');

  const shellClass =
    variant === 'dark'
      ? 'border-white/10 bg-black/55'
      : 'border-stone-200 bg-white/92 shadow-lg';
  const activeClass =
    variant === 'dark' ? 'text-brand-400' : 'text-brand-700';
  const idleClass =
    variant === 'dark' ? 'text-white/50 hover:text-white' : 'text-stone-400 hover:text-stone-700';

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className={`bg-gradient-to-t ${variant === 'dark' ? 'from-black via-black/70' : 'from-white via-white/70'} to-transparent px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-10`}>
        <div className="pointer-events-auto mx-auto flex max-w-lg items-center justify-around rounded-[28px] border px-4 py-3 backdrop-blur-xl">
          <div className={`absolute inset-0 rounded-[28px] ${shellClass}`} />
          {items.map((item) => {
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative z-10 flex flex-col items-center gap-1 transition-colors ${
                  active ? activeClass : idleClass
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
