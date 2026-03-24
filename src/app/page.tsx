'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import HomePageContent from './HomePageContent';

function HomePageWithSearchParams() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  return <HomePageContent activeCategory={activeCategory} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageContent activeCategory="" />}>
      <HomePageWithSearchParams />
    </Suspense>
  );
}
