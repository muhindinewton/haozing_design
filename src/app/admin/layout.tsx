import type { ReactNode } from 'react';
import RoleDashboardLayout from '@/components/layout/RoleDashboardLayout';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <RoleDashboardLayout role="admin">{children}</RoleDashboardLayout>;
}
