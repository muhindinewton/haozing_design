import { PROPERTIES } from '@/lib/data';
import PropertyDetailClient from './PropertyDetailClient';

export function generateStaticParams() {
  return PROPERTIES.map(property => ({ id: property.id }));
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = PROPERTIES.find(p => p.id === params.id) || PROPERTIES[0];
  return <PropertyDetailClient property={property} />;
}
