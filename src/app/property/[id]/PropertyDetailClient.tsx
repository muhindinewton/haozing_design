'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { PROPERTIES, REVIEWS } from '@/lib/data';
import { MapPin, Star, Shield, Users, Bed, Bath, Heart, Share2, ArrowLeft, ChevronLeft, ChevronRight, Check, Zap, Phone, MessageCircle } from 'lucide-react';

export default function PropertyDetailClient({ property }: { property: typeof PROPERTIES[0] }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [liked, setLiked] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview'|'amenities'|'reviews'|'location'|'utilities'>('overview');

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000) : 3;
  const cleaningFee = 1500;
  const serviceFee = Math.round(property.price * nights * 0.12);
  const total = property.price * nights + cleaningFee + serviceFee;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Gallery - fullscreen modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button onClick={() => setShowGallery(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 z-10">✕</button>
          <button onClick={() => setImgIdx(Math.max(0, imgIdx - 1))} className="absolute left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 z-10"><ChevronLeft className="w-5 h-5" /></button>
          <img src={property.images[imgIdx]} className="max-h-screen max-w-full object-contain" alt="" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'; }} />
          <button onClick={() => setImgIdx(Math.min(property.images.length - 1, imgIdx + 1))} className="absolute right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 z-10"><ChevronRight className="w-5 h-5" /></button>
          <div className="absolute bottom-4 flex gap-2">
            {property.images.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white w-5' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Back + actions */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/search" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to search</span>
          </Link>
          <div className="flex gap-2">
            <button onClick={() => setLiked(!liked)} className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-xl border border-stone-200 hover:border-stone-300 text-sm font-medium transition-all active:scale-95">
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} /> <span className="hidden sm:inline">Save</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-xl border border-stone-200 hover:border-stone-300 text-sm font-medium transition-all active:scale-95">
              <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4 md:mb-5">
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2">
            {property.verified && <span className="verified-badge text-[10px] md:text-xs"><Shield className="w-3 h-3" /> Verified</span>}
            {property.instantBook && <span className="badge-blue text-[10px] md:text-xs"><Zap className="w-3 h-3" /> Instant</span>}
            <span className="badge-gray text-[10px] md:text-xs">{property.type}</span>
          </div>
          <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-stone-900 mb-2">{property.title}</h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-stone-600">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-700" />{property.location}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-savanna-500 text-savanna-500" /><strong>{property.rating}</strong> ({property.reviewCount} reviews)</span>
            <span className="hidden sm:inline"><Bed className="w-3.5 h-3.5 md:w-4 md:h-4 inline mr-1" />{property.beds} beds</span>
            <span className="hidden sm:inline"><Bath className="w-3.5 h-3.5 md:w-4 md:h-4 inline mr-1" />{property.baths} baths</span>
            <span className="hidden sm:inline"><Users className="w-3.5 h-3.5 md:w-4 md:h-4 inline mr-1" />{property.guests} guests</span>
          </div>
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-4 gap-1.5 md:gap-2 rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 h-48 sm:h-64 md:h-80 lg:h-96">
          <div className="col-span-2 row-span-2 cursor-pointer" onClick={() => setShowGallery(true)}>
            <img src={property.images[0]} className="w-full h-full object-cover hover:brightness-95 transition-all" alt={property.title} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'; }} />
          </div>
          {property.images.slice(1, 4).map((img, i) => (
            <div key={i} className="cursor-pointer relative overflow-hidden" onClick={() => { setImgIdx(i+1); setShowGallery(true); }}>
              <img src={img} className="w-full h-full object-cover hover:brightness-95 transition-all" alt="" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'; }} />
              {i === 2 && property.images.length > 4 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+{property.images.length - 4} more</span>
                </div>
              )}
            </div>
          ))}
          {property.images.length < 4 && Array.from({length: 4 - property.images.length}).map((_, i) => (
            <div key={`empty-${i}`} className="bg-stone-200" />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {/* Host info */}
            <div className="flex items-center gap-3 md:gap-4 card p-3 md:p-4 mb-4 md:mb-6">
              <img src={property.hostAvatar} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" alt={property.hostName} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base text-stone-900 truncate">Hosted by {property.hostName}</p>
                <p className="text-xs text-stone-500">Superhost · 3 years hosting</p>
              </div>
              <div className="flex gap-1.5 md:gap-2">
                <a href={`tel:${property.hostId}`} className="p-2 md:py-2 md:px-3 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all"><Phone className="w-4 h-4" /></a>
                <Link href="/messages" className="p-2 md:py-2 md:px-3 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all hidden sm:flex items-center gap-2"><MessageCircle className="w-4 h-4" /> <span className="text-sm font-medium">Message</span></Link>
              </div>
            </div>

            {/* Mobile Booking Card */}
            <div className="lg:hidden card p-4 mb-4 order-1">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display text-2xl md:text-3xl font-bold text-stone-900">KSh {property.price.toLocaleString()}</span>
                <span className="text-stone-500 text-sm">/ night</span>
              </div>
              <Link href={`/booking/${property.id}`} className="btn-primary w-full block text-center mb-2 text-sm md:text-base py-2.5 md:py-3">Reserve Now</Link>
              <p className="text-xs text-stone-400 text-center">You won't be charged yet</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 md:gap-1 border-b border-stone-200 mb-4 md:mb-6 overflow-x-auto scrollbar-hide">
              {(['overview', 'amenities', 'reviews', 'location', 'utilities'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-semibold capitalize whitespace-nowrap transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-brand-700 text-brand-700' : 'border-transparent text-stone-500 hover:text-stone-900'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <p className="text-stone-700 leading-relaxed mb-6">{property.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Bedrooms', value: property.beds, icon: '🛏️' },
                    { label: 'Bathrooms', value: property.baths, icon: '🚿' },
                    { label: 'Max Guests', value: property.guests, icon: '👥' },
                    { label: 'Property Type', value: property.type, icon: '🏠' },
                  ].map(item => (
                    <div key={item.label} className="bg-stone-50 rounded-2xl p-4 text-center">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <p className="font-bold text-stone-900">{item.value}</p>
                      <p className="text-xs text-stone-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl">
                      <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                        <Check className="w-4 h-4 text-brand-700" />
                      </div>
                      <span className="text-sm font-medium text-stone-700">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center gap-6 p-4 bg-stone-50 rounded-2xl">
                  <div className="text-center">
                    <p className="font-display text-5xl font-bold text-stone-900">{property.rating}</p>
                    <div className="flex gap-0.5 justify-center my-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(property.rating) ? 'fill-savanna-500 text-savanna-500' : 'text-stone-300'}`} />)}
                    </div>
                    <p className="text-xs text-stone-500">{property.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {['Cleanliness', 'Location', 'Value', 'Communication'].map((cat, i) => (
                      <div key={cat} className="flex items-center gap-3">
                        <span className="text-xs text-stone-500 w-24">{cat}</span>
                        <div className="flex-1 bg-stone-200 rounded-full h-1.5">
                          <div className="bg-stone-900 h-1.5 rounded-full" style={{ width: `${[95, 90, 85, 92][i]}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-stone-900">{[4.9, 4.8, 4.7, 4.85][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {REVIEWS.map(review => (
                  <div key={review.id} className="border-b border-stone-100 pb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.guestAvatar} className="w-10 h-10 rounded-full object-cover" alt={review.guestName} />
                      <div>
                        <p className="font-semibold text-stone-900 text-sm">{review.guestName}</p>
                        <p className="text-xs text-stone-400">{review.date}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className={`w-3.5 h-3.5 ${i <= review.rating ? 'fill-savanna-500 text-savanna-500' : 'text-stone-300'}`} />)}
                      </div>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{review.comment}</p>
                    {review.hostResponse && (
                      <div className="mt-3 pl-4 border-l-2 border-stone-200">
                        <p className="text-xs font-semibold text-stone-500 mb-1">Response from host</p>
                        <p className="text-sm text-stone-600">{review.hostResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="animate-fade-in">
                <div className="map-placeholder rounded-2xl h-64 mb-4 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-brand-700" />
                      <span className="text-sm font-semibold">{property.location}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Hospital', dist: '1.2 km', icon: '🏥' },
                    { label: 'Police Station', dist: '800 m', icon: '👮' },
                    { label: 'Supermarket', dist: '400 m', icon: '🛒' },
                    { label: 'Restaurant', dist: '200 m', icon: '🍽️' },
                    { label: 'Airport', dist: '15 km', icon: '✈️' },
                    { label: 'Beach', dist: property.amenities.includes('Beach Access') ? '0 m' : '2 km', icon: '🏖️' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-stone-900">{item.label}</p>
                        <p className="text-xs text-stone-500">{item.dist}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-sm text-stone-900">Safety Score</span>
                    <span className="ml-auto font-bold text-emerald-600 text-lg">{property.safetyScore}/10</span>
                  </div>
                  <div className="bg-stone-200 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${property.safetyScore * 10}%` }} /></div>
                </div>
              </div>
            )}

            {activeTab === 'utilities' && (
              <div className="animate-fade-in grid grid-cols-2 gap-4">
                {[
                  { label: 'WiFi', value: property.wifiSpeed, icon: '📶', status: 'good' },
                  { label: 'Electricity', value: property.electricity, icon: '⚡', status: 'good' },
                  { label: 'Water', value: property.water, icon: '💧', status: 'good' },
                  { label: 'Backup Power', value: 'Generator available', icon: '🔋', status: 'available' },
                ].map(item => (
                  <div key={item.label} className="card p-4">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="font-semibold text-stone-900 text-sm">{item.label}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{item.value}</p>
                    <span className="mt-2 inline-block badge-green text-xs">✓ {item.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking card - Desktop */}
          <div className="hidden lg:block lg:w-96 shrink-0 order-1 lg:order-2">
            <div className="card p-4 md:p-5 sticky top-20">
              <div className="flex items-baseline gap-2 mb-4 md:mb-5">
                <span className="font-display text-2xl md:text-3xl font-bold text-stone-900">KSh {property.price.toLocaleString()}</span>
                <span className="text-stone-500 text-sm">/ night</span>
              </div>

              {/* Date picker */}
              <div className="grid grid-cols-2 gap-1 border border-stone-200 rounded-xl overflow-hidden mb-3">
                <div className="p-2.5 md:p-3 border-r border-stone-200">
                  <label className="text-[10px] md:text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">Check-in</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full text-xs md:text-sm font-medium text-stone-900 bg-transparent outline-none" />
                </div>
                <div className="p-2.5 md:p-3">
                  <label className="text-[10px] md:text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">Check-out</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full text-xs md:text-sm font-medium text-stone-900 bg-transparent outline-none" />
                </div>
              </div>

              <div className="border border-stone-200 rounded-xl p-2.5 md:p-3 mb-3 md:mb-4">
                <label className="text-[10px] md:text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1.5 md:mb-2">Guests</label>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-medium">{guests} guest{guests > 1 ? 's' : ''}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-stone-200 text-stone-700 flex items-center justify-center font-bold hover:border-stone-400 transition-all text-sm">−</button>
                    <span className="w-3 md:w-4 text-center font-semibold text-sm">{guests}</span>
                    <button onClick={() => setGuests(Math.min(property.guests, guests + 1))} className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-stone-200 text-stone-700 flex items-center justify-center font-bold hover:border-stone-400 transition-all text-sm">+</button>
                  </div>
                </div>
              </div>

              <Link href={`/booking/${property.id}`} className="btn-primary w-full block text-center mb-2 md:mb-3 text-sm md:text-base py-2.5 md:py-3">Reserve Now</Link>
              <p className="text-[10px] md:text-xs text-stone-400 text-center mb-3 md:mb-4">You won't be charged yet</p>

              {/* Price breakdown */}
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm border-t border-stone-100 pt-3 md:pt-4">
                <div className="flex justify-between text-stone-700">
                  <span>KSh {property.price.toLocaleString()} × {nights} nights</span>
                  <span>KSh {(property.price * nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Cleaning fee</span>
                  <span>KSh {cleaningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Service fee</span>
                  <span>KSh {serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Total</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
