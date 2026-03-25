'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { DISCOVER_FEED, PROPERTIES, REVIEWS, type DiscoverFeedMedia } from '@/lib/data';
import { ArrowLeft, Bath, Bed, Check, ChevronLeft, ChevronRight, Heart, Home, Images, MapPin, MessageCircle, Phone, Play, Share2, Shield, Star, Users, X, Zap } from 'lucide-react';

const IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';
type Property = (typeof PROPERTIES)[number];

function buildPropertyMedia(property: Property): DiscoverFeedMedia[] {
  const images = property.images.map((src, index) => ({ id: `${property.id}-image-${index}`, type: 'image' as const, src, alt: `${property.title} photo ${index + 1}` }));
  const seen = new Set<string>();
  const videos = DISCOVER_FEED
    .filter((post) => post.property.id === property.id)
    .flatMap((post) => post.media)
    .filter((media) => {
      if (media.type !== 'video' || seen.has(media.src)) return false;
      seen.add(media.src);
      return true;
    })
    .map((media, index) => ({ ...media, id: `${property.id}-video-${index}` }));

  return [...images, ...videos];
}

function Thumb({ media, active, poster, onClick }: { media: DiscoverFeedMedia; active: boolean; poster: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border bg-stone-200 transition-all sm:h-24 sm:w-36 ${active ? 'border-brand-700 ring-2 ring-brand-700/15' : 'border-stone-200'}`}>
      {media.type === 'video' ? (
        <>
          <img src={media.poster ?? poster} alt={media.alt} className="h-full w-full object-cover" onError={(event) => { (event.target as HTMLImageElement).src = IMAGE_FALLBACK; }} />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <Play className="h-3 w-3 fill-white" />
            {media.duration ?? 'Clip'}
          </span>
        </>
      ) : (
        <img src={media.src} alt={media.alt} className="h-full w-full object-cover" onError={(event) => { (event.target as HTMLImageElement).src = IMAGE_FALLBACK; }} />
      )}
    </button>
  );
}

export default function PropertyDetailClient({ property }: { property: Property }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [liked, setLiked] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'reviews' | 'location' | 'utilities'>('overview');

  const propertyMedia = buildPropertyMedia(property);
  const activeMedia = propertyMedia[imgIdx] ?? propertyMedia[0];
  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000) : 3;
  const cleaningFee = 1500;
  const serviceFee = Math.round(property.price * nights * 0.12);
  const total = property.price * nights + cleaningFee + serviceFee;

  useEffect(() => { setImgIdx(0); }, [property.id]);
  useEffect(() => {
    if (propertyMedia.length <= 1 || showGallery) return;
    const intervalId = window.setInterval(() => setImgIdx((current) => (current + 1) % propertyMedia.length), 4500);
    return () => window.clearInterval(intervalId);
  }, [propertyMedia.length, showGallery]);

  function prevMedia() { setImgIdx((current) => (current - 1 + propertyMedia.length) % propertyMedia.length); }
  function nextMedia() { setImgIdx((current) => (current + 1) % propertyMedia.length); }

  const summaryCards = [
    { label: 'Bedrooms', value: property.beds, icon: Bed },
    { label: 'Bathrooms', value: property.baths, icon: Bath },
    { label: 'Max Guests', value: property.guests, icon: Users },
    { label: 'Property Type', value: property.type, icon: Home },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <button onClick={() => setShowGallery(false)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"><X className="h-5 w-5" /></button>
          {propertyMedia.length > 1 && <button onClick={prevMedia} className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/14 text-white shadow-lg backdrop-blur-md transition hover:bg-white/24"><ChevronLeft className="h-5 w-5" /></button>}
          {activeMedia?.type === 'video' ? (
            <video key={activeMedia.id} src={activeMedia.src} poster={activeMedia.poster ?? property.images[0]} className="max-h-[78vh] max-w-full object-contain" controls autoPlay muted loop playsInline />
          ) : (
            <img src={activeMedia?.src ?? property.images[0]} className="max-h-[78vh] max-w-full object-contain" alt={activeMedia?.alt ?? property.title} onError={(event) => { (event.target as HTMLImageElement).src = IMAGE_FALLBACK; }} />
          )}
          {propertyMedia.length > 1 && <button onClick={nextMedia} className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/14 text-white shadow-lg backdrop-blur-md transition hover:bg-white/24"><ChevronRight className="h-5 w-5" /></button>}
          <div className="absolute bottom-4 left-1/2 flex w-[min(92vw,56rem)] -translate-x-1/2 gap-3 overflow-x-auto rounded-2xl bg-white/10 p-3 backdrop-blur-md scrollbar-hide">
            {propertyMedia.map((media, index) => <Thumb key={media.id} media={media} active={index === imgIdx} poster={property.images[0]} onClick={() => setImgIdx(index)} />)}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/search" className="flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Back to search</span></Link>
          <div className="flex gap-2">
            <button onClick={() => setLiked(!liked)} className="flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2 text-sm font-medium transition-all active:scale-95 hover:border-stone-300 md:px-4"><Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} /><span className="hidden sm:inline">Save</span></button>
            <button className="flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2 text-sm font-medium transition-all active:scale-95 hover:border-stone-300 md:px-4"><Share2 className="h-4 w-4" /><span className="hidden sm:inline">Share</span></button>
          </div>
        </div>

        <div className="mb-4 md:mb-5">
          <div className="mb-2 flex flex-wrap items-center gap-1.5 md:gap-2">
            {property.verified && <span className="verified-badge text-[10px] md:text-xs"><Shield className="h-3 w-3" /> Verified</span>}
            {property.instantBook && <span className="badge-blue text-[10px] md:text-xs"><Zap className="h-3 w-3" /> Instant</span>}
            <span className="badge-gray text-[10px] md:text-xs">{property.type}</span>
          </div>
          <h1 className="mb-2 font-display text-xl font-bold text-stone-900 sm:text-2xl md:text-4xl">{property.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 md:gap-4 md:text-sm">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-brand-700 md:h-4 md:w-4" />{property.location}</span>
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-savanna-500 text-savanna-500 md:h-4 md:w-4" /><strong>{property.rating}</strong> ({property.reviewCount} reviews)</span>
            <span className="hidden sm:inline"><Bed className="mr-1 inline h-3.5 w-3.5 md:h-4 md:w-4" />{property.beds} beds</span>
            <span className="hidden sm:inline"><Bath className="mr-1 inline h-3.5 w-3.5 md:h-4 md:w-4" />{property.baths} baths</span>
            <span className="hidden sm:inline"><Users className="mr-1 inline h-3.5 w-3.5 md:h-4 md:w-4" />{property.guests} guests</span>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="relative overflow-hidden rounded-[28px] bg-stone-950 shadow-xl">
            <div className="aspect-[16/10] cursor-pointer sm:aspect-[16/9] lg:aspect-[16/8]" onClick={() => setShowGallery(true)}>
              {activeMedia?.type === 'video' ? (
                <video key={activeMedia.id} src={activeMedia.src} poster={activeMedia.poster ?? property.images[0]} className="h-full w-full object-cover" autoPlay muted loop playsInline />
              ) : (
                <img src={activeMedia?.src ?? property.images[0]} className="h-full w-full object-cover" alt={activeMedia?.alt ?? property.title} onError={(event) => { (event.target as HTMLImageElement).src = IMAGE_FALLBACK; }} />
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"><Images className="h-3.5 w-3.5" />{imgIdx + 1} / {propertyMedia.length}</span>
              {activeMedia?.type === 'video' && <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"><Play className="h-3.5 w-3.5 fill-white" />{activeMedia.duration ?? 'Video'}</span>}
            </div>
            {propertyMedia.length > 1 && (
              <>
                <button onClick={(event) => { event.stopPropagation(); prevMedia(); }} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/14 text-white shadow-lg backdrop-blur-md transition hover:bg-white/24"><ChevronLeft className="h-5 w-5" /></button>
                <button onClick={(event) => { event.stopPropagation(); nextMedia(); }} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/14 text-white shadow-lg backdrop-blur-md transition hover:bg-white/24"><ChevronRight className="h-5 w-5" /></button>
              </>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/65">Media Gallery</p>
                <p className="mt-1 text-sm font-semibold text-white/95">{activeMedia?.type === 'video' ? 'Video tour' : 'Photo preview'}</p>
              </div>
              <button onClick={(event) => { event.stopPropagation(); setShowGallery(true); }} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-stone-100">Open gallery</button>
            </div>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {propertyMedia.map((media, index) => <Thumb key={media.id} media={media} active={index === imgIdx} poster={property.images[0]} onClick={() => setImgIdx(index)} />)}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="order-2 min-w-0 flex-1 lg:order-1">
            <div className="card mb-4 flex items-center gap-3 p-3 md:mb-6 md:gap-4 md:p-4">
              <img src={property.hostAvatar} className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12" alt={property.hostName} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-stone-900 md:text-base">Hosted by {property.hostName}</p>
                <p className="text-xs text-stone-500">Superhost | 3 years hosting</p>
              </div>
              <div className="flex gap-1.5 md:gap-2">
                <a href={`tel:${property.hostId}`} className="rounded-lg border border-stone-200 p-2 text-stone-600 transition-all hover:bg-stone-50 md:px-3 md:py-2"><Phone className="h-4 w-4" /></a>
                <Link href="/messages" className="hidden items-center gap-2 rounded-lg border border-stone-200 p-2 text-stone-600 transition-all hover:bg-stone-50 sm:flex md:px-3 md:py-2"><MessageCircle className="h-4 w-4" /><span className="text-sm font-medium">Message</span></Link>
              </div>
            </div>

            <div className="card mb-4 p-4 lg:hidden">
              <div className="mb-3 flex items-baseline gap-2"><span className="font-display text-2xl font-bold text-stone-900 md:text-3xl">KSh {property.price.toLocaleString()}</span><span className="text-sm text-stone-500">/ night</span></div>
              <Link href={`/booking/${property.id}`} className="btn-primary mb-2 block w-full py-2.5 text-center text-sm md:py-3 md:text-base">Reserve Now</Link>
              <p className="text-center text-xs text-stone-400">You won't be charged yet</p>
            </div>

            <div className="mb-4 flex gap-0.5 overflow-x-auto border-b border-stone-200 scrollbar-hide md:mb-6 md:gap-1">
              {(['overview', 'amenities', 'reviews', 'location', 'utilities'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-xs font-semibold capitalize transition-all md:px-4 md:py-2.5 md:text-sm ${activeTab === tab ? 'border-brand-700 text-brand-700' : 'border-transparent text-stone-500 hover:text-stone-900'}`}>{tab}</button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <p className="mb-6 leading-relaxed text-stone-700">{property.description}</p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {summaryCards.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-stone-50 p-4 text-center">
                      <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm"><item.icon className="h-5 w-5" /></div>
                      <p className="font-bold text-stone-900">{item.value}</p>
                      <p className="text-xs text-stone-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && <div className="animate-fade-in grid grid-cols-2 gap-3 sm:grid-cols-3">{property.amenities.map((amenity) => <div key={amenity} className="flex items-center gap-2 rounded-xl bg-stone-50 p-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100"><Check className="h-4 w-4 text-brand-700" /></div><span className="text-sm font-medium text-stone-700">{amenity}</span></div>)}</div>}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in space-y-5">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="border-b border-stone-100 pb-5">
                    <div className="mb-3 flex items-center gap-3">
                      <img src={review.guestAvatar} className="h-10 w-10 rounded-full object-cover" alt={review.guestName} />
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{review.guestName}</p>
                        <p className="text-xs text-stone-400">{review.date}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">{[1, 2, 3, 4, 5].map((index) => <Star key={index} className={`h-3.5 w-3.5 ${index <= review.rating ? 'fill-savanna-500 text-savanna-500' : 'text-stone-300'}`} />)}</div>
                    </div>
                    <p className="text-sm leading-relaxed text-stone-700">{review.comment}</p>
                    {review.hostResponse && <div className="mt-3 border-l-2 border-stone-200 pl-4"><p className="mb-1 text-xs font-semibold text-stone-500">Response from host</p><p className="text-sm text-stone-600">{review.hostResponse}</p></div>}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="animate-fade-in">
                <div className="map-placeholder relative mb-4 flex h-64 items-center justify-center rounded-2xl">
                  <div className="absolute inset-0 z-10 flex items-center justify-center"><div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-lg"><MapPin className="h-5 w-5 text-brand-700" /><span className="text-sm font-semibold">{property.location}</span></div></div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[{ label: 'Hospital', dist: '1.2 km' }, { label: 'Police Station', dist: '800 m' }, { label: 'Supermarket', dist: '400 m' }, { label: 'Restaurant', dist: '200 m' }, { label: 'Airport', dist: '15 km' }, { label: 'Beach', dist: property.amenities.includes('Beach Access') ? '0 m' : '2 km' }].map((item) => <div key={item.label} className="rounded-xl bg-stone-50 p-3"><p className="text-xs font-semibold text-stone-900">{item.label}</p><p className="mt-1 text-xs text-stone-500">{item.dist}</p></div>)}
                </div>
              </div>
            )}

            {activeTab === 'utilities' && <div className="animate-fade-in grid grid-cols-2 gap-4">{[{ label: 'WiFi', value: property.wifiSpeed }, { label: 'Electricity', value: property.electricity }, { label: 'Water', value: property.water }, { label: 'Backup Power', value: 'Generator available' }].map((item) => <div key={item.label} className="card p-4"><p className="text-sm font-semibold text-stone-900">{item.label}</p><p className="mt-0.5 text-xs text-stone-500">{item.value}</p><span className="badge-green mt-2 inline-block text-xs">available</span></div>)}</div>}
          </div>

          <div className="order-1 hidden shrink-0 lg:order-2 lg:block lg:w-96">
            <div className="card sticky top-20 p-4 md:p-5">
              <div className="mb-4 flex items-baseline gap-2 md:mb-5"><span className="font-display text-2xl font-bold text-stone-900 md:text-3xl">KSh {property.price.toLocaleString()}</span><span className="text-sm text-stone-500">/ night</span></div>
              <div className="mb-3 grid grid-cols-2 gap-1 overflow-hidden rounded-xl border border-stone-200">
                <div className="border-r border-stone-200 p-2.5 md:p-3"><label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-stone-500 md:text-xs">Check-in</label><input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="w-full bg-transparent text-xs font-medium text-stone-900 outline-none md:text-sm" /></div>
                <div className="p-2.5 md:p-3"><label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-stone-500 md:text-xs">Check-out</label><input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="w-full bg-transparent text-xs font-medium text-stone-900 outline-none md:text-sm" /></div>
              </div>
              <div className="mb-3 rounded-xl border border-stone-200 p-2.5 md:mb-4 md:p-3">
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-stone-500 md:mb-2 md:text-xs">Guests</label>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium md:text-sm">{guests} guest{guests > 1 ? 's' : ''}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 text-sm font-bold text-stone-700 transition-all hover:border-stone-400 md:h-7 md:w-7">-</button>
                    <span className="w-3 text-center text-sm font-semibold md:w-4">{guests}</span>
                    <button onClick={() => setGuests(Math.min(property.guests, guests + 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 text-sm font-bold text-stone-700 transition-all hover:border-stone-400 md:h-7 md:w-7">+</button>
                  </div>
                </div>
              </div>
              <Link href={`/booking/${property.id}`} className="btn-primary mb-2 block w-full py-2.5 text-center text-sm md:mb-3 md:py-3 md:text-base">Reserve Now</Link>
              <p className="mb-3 text-center text-[10px] text-stone-400 md:mb-4 md:text-xs">You won't be charged yet</p>
              <div className="space-y-1.5 border-t border-stone-100 pt-3 text-xs md:space-y-2 md:pt-4 md:text-sm">
                <div className="flex justify-between text-stone-700"><span>KSh {property.price.toLocaleString()} x {nights} nights</span><span>KSh {(property.price * nights).toLocaleString()}</span></div>
                <div className="flex justify-between text-stone-700"><span>Cleaning fee</span><span>KSh {cleaningFee.toLocaleString()}</span></div>
                <div className="flex justify-between text-stone-700"><span>Service fee</span><span>KSh {serviceFee.toLocaleString()}</span></div>
                <div className="flex justify-between border-t border-stone-100 pt-2 font-bold text-stone-900"><span>Total</span><span>KSh {total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
