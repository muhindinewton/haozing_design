'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, Calendar, BookOpen, MessageSquare,
  Settings, Users, Shield, ClipboardList, BarChart3, Home, DollarSign,
  Search, FileText, Bell, Star, MapPin, Layers, CheckSquare, ChevronRight
} from 'lucide-react';

const HOST_LINKS = [
  { label: 'Overview', href: '/host/dashboard', icon: LayoutDashboard },
  { label: 'My Properties', href: '/host/properties', icon: Building2 },
  { label: 'Bookings', href: '/host/bookings', icon: BookOpen },
  { label: 'Calendar', href: '/host/calendar', icon: Calendar },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
  { label: 'Earnings', href: '/host/dashboard', icon: DollarSign },
  { label: 'Settings', href: '/profile', icon: Settings },
];

const INSPECTOR_LINKS = [
  { label: 'Dashboard', href: '/inspector/dashboard', icon: LayoutDashboard },
  { label: 'Pending Queue', href: '/inspector/dashboard', icon: ClipboardList },
  { label: 'Inspection History', href: '/inspector/history', icon: FileText },
  { label: 'Schedule', href: '/inspector/schedule', icon: Calendar },
];

const ADMIN_LINKS = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Properties', href: '/admin/properties', icon: Building2 },
  { label: 'Bookings', href: '/admin/bookings', icon: BookOpen },
  { label: 'Inspections', href: '/admin/inspections', icon: ClipboardList },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const ROLE_META: Record<string, { title: string; color: string; links: typeof HOST_LINKS }> = {
  host: { title: 'Host Portal', color: 'brand', links: HOST_LINKS },
  inspector: { title: 'Inspector Portal', color: 'ocean', links: INSPECTOR_LINKS },
  admin: { title: 'Admin Panel', color: 'stone', links: ADMIN_LINKS },
};

export default function DashboardSidebar({ role }: { role: 'host' | 'inspector' | 'admin' }) {
  const pathname = usePathname();
  const meta = ROLE_META[role];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col h-[calc(100vh-64px)] sticky top-16 border-r border-stone-100 bg-white pt-6 pb-8 overflow-y-auto">
      <div className="px-4 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
          role === 'host' ? 'bg-brand-100 text-brand-700' :
          role === 'inspector' ? 'bg-ocean-100 text-ocean-700' :
          'bg-stone-100 text-stone-700'
        }`}>
          {role === 'host' ? <Building2 className="w-3 h-3" /> :
           role === 'inspector' ? <Shield className="w-3 h-3" /> :
           <Layers className="w-3 h-3" />}
          {meta.title}
        </div>
      </div>

      <nav className="px-3 flex-1">
        <ul className="space-y-0.5">
          {meta.links.map(link => {
            const active = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={active ? 'sidebar-link-active' : 'sidebar-link'}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {active && <ChevronRight className="w-3 h-3 ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 mt-6 pt-4 border-t border-stone-100">
        <Link href="/" className="sidebar-link">
          <Home className="w-4 h-4" />
          Back to App
        </Link>
      </div>
    </aside>
  );
}
