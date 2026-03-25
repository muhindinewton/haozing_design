import type { ReactNode } from 'react';
import RoleDashboardLayout from '@/components/layout/RoleDashboardLayout';

export default function HostLayout({ children }: { children: ReactNode }) {
  return <RoleDashboardLayout role="host">{children}</RoleDashboardLayout>;
}
