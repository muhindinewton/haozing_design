import { BOOKINGS } from '@/lib/data';
import BookingDetailClient from './BookingDetailClient';

export function generateStaticParams() {
  return BOOKINGS.map(booking => ({ id: booking.id }));
}

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking = BOOKINGS.find(b => b.id === params.id) || BOOKINGS[0];
  return <BookingDetailClient booking={booking} />;
}