import { INSPECTIONS } from '@/lib/data';
import InspectionDetailClient from './InspectionDetailClient';

export function generateStaticParams() {
  return INSPECTIONS.map(inspection => ({ id: inspection.id }));
}

export default function InspectionDetailPage({ params }: { params: { id: string } }) {
  const inspection = INSPECTIONS.find(i => i.id === params.id) || INSPECTIONS[0];
  return <InspectionDetailClient inspection={inspection} />;
}
