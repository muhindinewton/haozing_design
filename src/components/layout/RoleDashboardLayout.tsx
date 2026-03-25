import type { ReactNode } from 'react';
import Navbar, { type NavbarRole } from './Navbar';
import DashboardSidebar from './DashboardSidebar';

export type DashboardRole = Extract<NavbarRole, 'admin' | 'host' | 'inspector'>;

export default function RoleDashboardLayout({
  children,
  role,
}: {
  children: ReactNode;
  role: DashboardRole;
}) {
  return (
    <div className="min-h-screen bg-surface mobile-bottom-nav-clearance">
      <Navbar role={role} />
      <div className="flex max-w-[1400px] mx-auto">
        <DashboardSidebar role={role} />
        {children}
      </div>
    </div>
  );
}
