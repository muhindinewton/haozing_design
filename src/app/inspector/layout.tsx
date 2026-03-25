import type { ReactNode } from 'react';
import RoleDashboardLayout from '@/components/layout/RoleDashboardLayout';

export default function InspectorLayout({ children }: { children: ReactNode }) {
  return <RoleDashboardLayout role="inspector">{children}</RoleDashboardLayout>;
}
